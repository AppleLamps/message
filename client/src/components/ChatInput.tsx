import { useState, useRef, useEffect } from "react";
import { ArrowUp, Plus, Mic, Camera, AppWindow } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(true); // Simulate hidden app drawer state
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
    <div className="sticky bottom-0 w-full bg-ios-system-gray-6/80 backdrop-blur-xl border-t border-ios-separator pb-safe pt-2 px-4 z-20">
      <div className="flex items-end gap-3 pb-2">
        
        {/* Left Actions (Camera, Apps) */}
        <div className="flex items-center gap-3 mb-2.5 shrink-0 transition-all duration-300">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "text-ios-system-gray-2 bg-ios-system-gray-2/10 hover:bg-ios-system-gray-2/20 transition-colors rounded-full p-1.5",
              isExpanded ? "rotate-45" : "rotate-0"
            )}
          >
            <Plus className="w-5 h-5 text-gray-400" strokeWidth={2.5} />
          </button>
          
          {/* Simulated App Drawer Icons (Collapsible) */}
          <div className={cn(
            "flex items-center gap-4 overflow-hidden transition-all duration-300 origin-left",
            isExpanded ? "w-auto opacity-100 scale-100" : "w-0 opacity-0 scale-0"
          )}>
             <button className="text-gray-400 hover:text-ios-blue transition-colors">
               <AppWindow className="w-6 h-6" />
             </button>
             <button className="text-gray-400 hover:text-ios-blue transition-colors">
               <Camera className="w-6 h-6" />
             </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="iMessage"
            rows={1}
            disabled={disabled}
            className="w-full bg-white border border-ios-separator/50 rounded-[18px] px-4 py-2 pr-10 text-[17px] leading-6 resize-none focus:outline-none focus:border-ios-separator max-h-[120px]"
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
              className="absolute right-2 bottom-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
