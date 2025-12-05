import { useState, useRef, useEffect } from "react";
import { ArrowUp, Plus, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
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
    <div className="sticky bottom-0 w-full bg-ios-system-gray-6/80 backdrop-blur-xl border-t border-ios-separator pb-safe pt-2 px-3 z-20">
      <div className="flex items-end gap-3 pb-2">
        <button className="mb-1.5 text-ios-system-gray-2 hover:text-ios-blue transition-colors p-1 rounded-full shrink-0">
          <Plus className="w-7 h-7" strokeWidth={2.5} />
        </button>

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="iMessage"
            rows={1}
            disabled={disabled}
            className="w-full bg-transparent border border-ios-separator/50 rounded-[18px] px-4 py-2 pr-10 text-[17px] leading-6 resize-none focus:outline-none focus:border-ios-separator max-h-[120px] bg-white"
          />
          
          {message.trim().length > 0 ? (
             <button 
             onClick={handleSend}
             disabled={!message.trim() || disabled}
             className={cn(
               "absolute right-1 bottom-1 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200",
               "bg-ios-blue text-white shadow-sm active:scale-90"
             )}
           >
             <ArrowUp className="w-5 h-5 font-bold" strokeWidth={3} />
           </button>
          ) : (
            <button 
              className="absolute right-2 bottom-2 text-ios-muted-foreground hover:text-ios-blue transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
