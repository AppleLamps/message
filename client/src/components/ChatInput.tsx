import { useState, useRef, useEffect } from "react";
import { Plus, Mic, Send } from "lucide-react";

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
    const trimmed = message.trim();
    if (trimmed) {
      onSend(trimmed);
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

  const canSend = message.trim().length > 0;

  return (
    <div className="sticky bottom-0 w-full border-t border-[hsl(var(--ios-separator))] bg-white/90 backdrop-blur-xl pb-safe z-20">
      <div className="flex items-end gap-2 px-3 py-3">
        <button
          type="button"
          className="mb-1 w-9 h-9 rounded-full flex items-center justify-center text-ios-blue bg-white border border-[hsl(var(--ios-separator))] shadow-sm hover:bg-gray-100 transition-colors shrink-0"
          aria-label="Add more"
        >
          <Plus className="w-7 h-7" strokeWidth={1.5} />
        </button>

        <div className="flex-1 rounded-full bg-[hsl(var(--ios-system-gray-2))] border border-[hsl(var(--ios-separator))] overflow-hidden">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="iMessage"
            rows={1}
            disabled={disabled}
            className="w-full px-3 py-2 text-[17px] leading-[22px] resize-none focus:outline-none bg-transparent min-h-[22px] max-h-[120px] placeholder:text-gray-500"
          />
        </div>

        {!canSend ? (
          <button
            type="button"
            className="mb-1 w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors shrink-0"
            aria-label="Voice message"
            disabled={disabled}
          >
            <Mic className="w-6 h-6" strokeWidth={1.5} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSend}
            disabled={disabled}
            className="mb-1 w-10 h-10 rounded-full flex items-center justify-center bg-ios-blue text-white shadow-[0_4px_12px_rgba(0,122,255,0.32)] hover:brightness-110 active:translate-y-[1px] transition-all shrink-0 disabled:opacity-70"
            aria-label="Send"
          >
            <Send className="w-5 h-5" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
