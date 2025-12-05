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
        "flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "relative px-3 py-[6px] max-w-[78%] md:max-w-[68%] text-[17px] leading-[22px] whitespace-pre-wrap",
          "rounded-[18px]",
          isUser
            ? "bg-ios-blue text-white shadow-[0_1px_0_rgba(0,122,255,0.28)]"
            : "bg-ios-gray text-black shadow-[0_1px_0_rgba(0,0,0,0.08)]",
          showTail && isUser && "bubble-user",
          showTail && !isUser && "bubble-other"
        )}
      >
        {content}
      </div>
    </motion.div>
  );
}
