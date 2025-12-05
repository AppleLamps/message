import { ChevronLeft, Video } from "lucide-react";
import avatarImage from "@assets/generated_images/a_professional_yet_friendly_ai_assistant_avatar.png";

export function Header() {
  return (
    <header className="flex items-center justify-between px-2 pt-12 pb-2 bg-white/95 backdrop-blur-sm border-b border-ios-separator sticky top-0 z-10">
      <button className="flex items-center text-ios-blue hover:opacity-70 transition-opacity">
        <ChevronLeft className="w-8 h-8 -mr-1" strokeWidth={2} />
        <span className="text-[17px] font-normal">20</span>
      </button>

      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 mb-0.5 flex items-center justify-center">
          <img 
            src={avatarImage} 
            alt="AI Assistant" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center gap-0.5">
          <span className="text-[13px] font-normal text-black">AI Assistant</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
        </div>
      </div>

      <button className="p-2 text-ios-blue hover:opacity-70 transition-opacity">
        <Video className="w-7 h-7" strokeWidth={1.5} />
      </button>
    </header>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}
