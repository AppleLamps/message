import { ChevronLeft, Video, Info } from "lucide-react";
import avatarImage from "@assets/generated_images/a_professional_yet_friendly_ai_assistant_avatar.png";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-[hsl(var(--ios-separator))] bg-white/85 backdrop-blur-xl">
      <div className="flex items-center px-3 pt-9 pb-2">
        <button className="flex items-center text-[17px] text-ios-blue hover:opacity-70 transition-opacity">
          <ChevronLeft className="w-7 h-7 -ml-1 mr-[2px]" strokeWidth={2.25} />
          <span className="font-normal">Messages</span>
        </button>

        <div className="flex-1 flex flex-col items-center justify-center gap-[2px]">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shadow-inner">
            <img
              src={avatarImage}
              alt="AI Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[17px] font-semibold text-black leading-tight">
            AI Assistant
          </span>
          <span className="text-[12px] text-gray-500 leading-tight -mt-[2px]">
            iMessage
          </span>
        </div>

        <div className="flex items-center gap-2 text-ios-blue">
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <Video className="w-6 h-6" strokeWidth={1.6} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <Info className="w-6 h-6" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </header>
  );
}
