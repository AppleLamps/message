import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex justify-start w-full mb-2 px-1">
      <div className="bg-ios-gray rounded-[18px] rounded-bl-sm px-4 py-3 flex items-center gap-1 w-fit bubble-tail-left">
        <motion.div
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
}
