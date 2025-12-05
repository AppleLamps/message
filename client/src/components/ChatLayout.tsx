import { ReactNode } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-[100dvh] bg-ios-system-gray overflow-hidden relative">
      {children}
    </div>
  );
}
