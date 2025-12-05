import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex justify-start w-full">
      <div className="bg-ios-gray rounded-[18px] px-4 py-3 flex items-center gap-[3px] bubble-other">
        <motion.div
          className="w-[8px] h-[8px] bg-gray-400 rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-[8px] h-[8px] bg-gray-400 rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-[8px] h-[8px] bg-gray-400 rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
}
