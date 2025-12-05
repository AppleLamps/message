import { useState, useRef, useEffect } from "react";
import { ChatLayout } from "@/components/ChatLayout";
import { Header } from "@/components/Header";
import { ChatInput } from "@/components/ChatInput";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import avatarImage from "@assets/generated_images/a_professional_yet_friendly_ai_assistant_avatar.png";
import { format, isSameDay, isYesterday } from "date-fns";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "0",
    content: "Hey there! 👋",
    isUser: true,
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    status: 'read'
  },
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000),
    status: 'read'
  }
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle read receipts
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        setMessages(prev => prev.map(m => 
          (m.isUser && m.status === 'delivered') ? { ...m, status: 'read' } : m
        ));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
      status: 'delivered'
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate AI response
    setIsTyping(true);
    
    // Random delay between 1-3 seconds
    const delay = 1000 + Math.random() * 2000;
    
    setTimeout(() => {
      const aiResponses = [
        "That's interesting! Tell me more.",
        "I can certainly help with that.",
        "Here's what I found about that topic...",
        "Could you clarify what you mean?",
        "I'm designed to assist with tasks like this.",
        "Let me think about that for a second.",
        `I understand you said: "${content}"`,
        "👍",
        "Haha that's funny!",
        "Absolutely."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isUser: false,
        timestamp: new Date(),
        status: 'sent'
      };
      
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMessage]);
    }, delay);
  };

  // Group messages by date
  const getMessageDateGroup = (date: Date) => {
    if (isSameDay(date, new Date())) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "EEEE, MMM d");
  };

  return (
    <ChatLayout>
      <Header />
      
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.map((msg, index) => {
          const isLastInGroup = 
            index === messages.length - 1 || 
            messages[index + 1].isUser !== msg.isUser;

          const showDateHeader = index === 0 || !isSameDay(messages[index - 1].timestamp, msg.timestamp);
          const dateGroup = getMessageDateGroup(msg.timestamp);
          const timeString = format(msg.timestamp, "h:mm a");
            
          return (
            <div key={msg.id} className="flex flex-col">
              {/* Date Header */}
              {showDateHeader && (
                 <div className="text-center py-4 mb-2">
                  <span className="text-[11px] font-medium text-gray-400">
                    {dateGroup} {timeString}
                  </span>
                </div>
              )}

              <div className={msg.isUser ? "ml-auto" : "mr-auto"}>
                <MessageBubble 
                  content={msg.content}
                  isUser={msg.isUser}
                  timestamp={msg.timestamp}
                  showTail={isLastInGroup}
                />
                {/* Delivered/Read status for last user message */}
                {msg.isUser && index === messages.length - 1 && !isTyping && (
                  <div className="text-[11px] font-medium text-ios-gray-500 text-right pr-1 -mt-1 mb-4 opacity-60 transition-opacity">
                    {msg.status === 'read' ? 'Read' : 'Delivered'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex items-end gap-2 mb-2 mt-2 ml-1">
             <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 shrink-0 mb-1">
                <img 
                  src={avatarImage} 
                  alt="AI" 
                  className="w-full h-full object-cover"
                />
              </div>
             <TypingIndicator />
          </div>
        )}
        
        <div ref={messagesEndRef} className="h-4" />
      </div>
      
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </ChatLayout>
  );
}
