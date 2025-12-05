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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn(
        "w-full flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "relative px-3 py-[6px] max-w-[75%] text-[17px] leading-[22px] break-words",
          "rounded-[18px]",
          isUser 
            ? "bg-ios-blue text-white" 
            : "bg-ios-gray text-black",
          showTail && isUser && "bubble-user",
          showTail && !isUser && "bubble-other"
        )}
      >
        {content}
      </div>
    </motion.div>
  );
}
