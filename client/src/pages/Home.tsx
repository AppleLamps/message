import { useRef, useEffect } from "react";
import { ChatLayout } from "@/components/ChatLayout";
import { Header } from "@/components/Header";
import { ChatInput } from "@/components/ChatInput";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import avatarImage from "@assets/generated_images/a_professional_yet_friendly_ai_assistant_avatar.png";
import { format, isSameDay, isYesterday } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string | Date;
}

async function fetchMessages(): Promise<Message[]> {
  const response = await fetch('/api/messages');
  if (!response.ok) throw new Error('Failed to fetch messages');
  return response.json();
}

async function sendMessage(content: string): Promise<{ userMessage: Message; aiMessage: Message }> {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, isUser: true }),
  });
  if (!response.ok) throw new Error('Failed to send message');
  return response.json();
}

export default function Home() {
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
  });

  const sendMutation = useMutation({
    mutationFn: sendMessage,
    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: ['messages'] });
      const previousMessages = queryClient.getQueryData<Message[]>(['messages']);
      
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        content,
        isUser: true,
        timestamp: new Date().toISOString(),
      };
      
      queryClient.setQueryData<Message[]>(['messages'], (old = []) => [...old, optimisticMessage]);
      return { previousMessages };
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Message[]>(['messages'], (old = []) => {
        const withoutTemp = old.filter(m => !m.id.startsWith('temp-'));
        return [...withoutTemp, data.userMessage, data.aiMessage];
      });
    },
    onError: (err, content, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages'], context.previousMessages);
      }
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sendMutation.isPending]);

  const handleSend = (content: string) => {
    sendMutation.mutate(content);
  };

  const getMessageDateGroup = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isSameDay(dateObj, new Date())) return "Today";
    if (isYesterday(dateObj)) return "Yesterday";
    return format(dateObj, "MMM d, yyyy");
  };

  const getTimeString = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, "h:mm a");
  };

  if (isLoading) {
    return (
      <ChatLayout>
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-400 text-[15px]">Loading...</div>
        </div>
        <ChatInput onSend={handleSend} disabled={true} />
      </ChatLayout>
    );
  }

  return (
    <ChatLayout>
      <Header />
      
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300 mx-auto mb-3">
              <img 
                src={avatarImage} 
                alt="AI" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-400 text-[15px]">Start a conversation</p>
          </div>
        )}

        {messages.map((msg, index) => {
          const isLastInGroup = 
            index === messages.length - 1 || 
            messages[index + 1].isUser !== msg.isUser;

          const msgDate = typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp;
          const prevMsgDate = index > 0 
            ? (typeof messages[index - 1].timestamp === 'string' 
                ? new Date(messages[index - 1].timestamp) 
                : messages[index - 1].timestamp)
            : null;

          const showDateHeader = index === 0 || !prevMsgDate || !isSameDay(prevMsgDate, msgDate);
          const dateGroup = getMessageDateGroup(msgDate);
          const timeString = getTimeString(msgDate);
          
          const isLastUserMessage = msg.isUser && (
            index === messages.length - 1 || 
            !messages.slice(index + 1).some(m => m.isUser)
          );
            
          return (
            <div key={msg.id} className="flex flex-col">
              {showDateHeader && (
                <div className="text-center py-3">
                  <span className="text-[12px] text-gray-500">
                    iMessage
                  </span>
                  <br />
                  <span className="text-[12px] text-gray-500">
                    {dateGroup} at {timeString}
                  </span>
                </div>
              )}

              <div className={`mb-[2px] ${msg.isUser ? "ml-auto" : "mr-auto"}`}>
                <MessageBubble 
                  content={msg.content}
                  isUser={msg.isUser}
                  timestamp={msgDate}
                  showTail={isLastInGroup}
                />
              </div>
              
              {isLastUserMessage && !sendMutation.isPending && isLastInGroup && (
                <div className="text-[11px] text-gray-500 text-right pr-1 mt-1 mb-2">
                  Read {timeString}
                </div>
              )}
            </div>
          );
        })}
        
        {sendMutation.isPending && (
          <div className="mb-2 mt-1">
            <TypingIndicator />
          </div>
        )}
        
        <div ref={messagesEndRef} className="h-2" />
      </div>
      
      <ChatInput onSend={handleSend} disabled={sendMutation.isPending} />
    </ChatLayout>
  );
}
