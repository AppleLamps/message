import { ReactNode } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-[100dvh] bg-[hsl(var(--ios-system-gray-6))] overflow-hidden relative text-[#0a0a0a]">
      {children}
    </div>
  );
}
