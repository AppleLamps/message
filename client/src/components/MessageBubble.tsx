import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  showTail?: boolean;
}

export function MessageBubble({ content, isUser, timestamp, showTail = true }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "w-full flex mb-1",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "relative px-4 py-2 max-w-[70%] text-[17px] leading-snug break-words shadow-sm",
          // iOS Radius standard is ~18px
          "rounded-[18px]",
          isUser 
            ? "bg-ios-blue text-white origin-bottom-right" 
            : "bg-ios-gray text-black origin-bottom-left",
          // Tail logic styling
          showTail && isUser && "bubble-tail-right rounded-br-sm",
          showTail && !isUser && "bubble-tail-left rounded-bl-sm"
        )}
      >
        {content}
      </div>
      
      {/* Hidden delivery status area could go here */}
    </motion.div>
  );
}
