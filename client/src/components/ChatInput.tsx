import { useState, useRef, useEffect } from "react";
import { Plus, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "22px";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "22px";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-white border-t border-ios-separator pb-safe z-20">
      <div className="flex items-end gap-2 px-2 py-2">
        <button 
          className="mb-1 w-8 h-8 rounded-full flex items-center justify-center text-ios-blue hover:bg-gray-100 transition-colors shrink-0"
        >
          <Plus className="w-7 h-7" strokeWidth={1.5} />
        </button>

        <div className="flex-1 border border-gray-300 rounded-[20px] bg-white overflow-hidden">
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-3 py-1.5 text-[17px] text-gray-400 placeholder:text-gray-400 border-b border-gray-200 focus:outline-none bg-transparent"
            disabled
          />
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="iMessage"
              rows={1}
              disabled={disabled}
              className="w-full px-3 py-1.5 text-[17px] leading-[22px] resize-none focus:outline-none bg-transparent min-h-[22px] max-h-[100px]"
            />
          </div>
        </div>

        <button 
          className="mb-1 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors shrink-0"
        >
          <Mic className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
