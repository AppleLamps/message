import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Heart, ThumbsUp, ThumbsDown, HelpCircle, AlertCircle } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  showTail?: boolean;
}

// Check if message is only emojis (1-3 chars usually, but simplistic check for now)
const isEmojiOnly = (text: string) => {
  // Basic emoji regex pattern (simplified)
  const emojiRegex = /^[\p{Emoji}\s]+$/u;
  return emojiRegex.test(text) && text.length < 10;
};

export function MessageBubble({ content, isUser, timestamp, showTail = true }: MessageBubbleProps) {
  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState<React.ReactNode | null>(null);
  const isEmoji = isEmojiOnly(content);

  const handleDoubleTap = () => {
    setShowReactions(!showReactions);
  };

  const addReaction = (icon: React.ReactNode) => {
    setReaction(icon);
    setShowReactions(false);
  };

  return (
    <div className={cn("relative group z-10", isUser ? "ml-auto" : "mr-auto")}>
      
      {/* Reaction Menu */}
      <AnimatePresence>
        {showReactions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: -45 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={cn(
              "absolute -top-2 z-50 flex gap-1 bg-white rounded-full shadow-xl p-2 border border-gray-100",
              isUser ? "right-0" : "left-0"
            )}
          >
            <button onClick={() => addReaction(<Heart className="w-4 h-4 fill-pink-500 text-pink-500" />)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Heart className="w-5 h-5 text-gray-600" /></button>
            <button onClick={() => addReaction(<ThumbsUp className="w-4 h-4 fill-gray-500 text-gray-500" />)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ThumbsUp className="w-5 h-5 text-gray-600" /></button>
            <button onClick={() => addReaction(<ThumbsDown className="w-4 h-4 fill-gray-500 text-gray-500" />)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ThumbsDown className="w-5 h-5 text-gray-600" /></button>
            <button onClick={() => addReaction(<span className="text-sm font-bold text-gray-600">HA</span>)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><span className="text-sm font-bold text-gray-600">HA</span></button>
            <button onClick={() => addReaction(<AlertCircle className="w-4 h-4 text-gray-600" />)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><AlertCircle className="w-5 h-5 text-gray-600" /></button>
            <button onClick={() => addReaction(<HelpCircle className="w-4 h-4 text-gray-600" />)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><HelpCircle className="w-5 h-5 text-gray-600" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onDoubleClick={handleDoubleTap}
        className={cn(
          "w-full flex mb-1 cursor-pointer select-none",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={cn(
            "relative max-w-[70%] leading-snug break-words shadow-sm transition-all",
            isEmoji 
              ? "bg-transparent shadow-none text-[40px] p-0" 
              : "px-4 py-2 text-[17px]",
            // iOS Radius standard is ~18px
            !isEmoji && "rounded-[18px]",
            !isEmoji && isUser 
              ? "bg-ios-blue text-white origin-bottom-right" 
              : !isEmoji && "bg-ios-gray text-black origin-bottom-left",
            // Tail logic styling
            !isEmoji && showTail && isUser && "bubble-tail-right rounded-br-sm",
            !isEmoji && showTail && !isUser && "bubble-tail-left rounded-bl-sm"
          )}
        >
          {content}

          {/* Reaction Badge */}
          {reaction && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cn(
                "absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-100 z-10",
                isUser ? "-left-2 right-auto" : "-right-2 left-auto"
              )}
            >
              {reaction}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
