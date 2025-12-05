import { ArrowLeft, Video } from "lucide-react";
import avatarImage from "@assets/generated_images/a_professional_yet_friendly_ai_assistant_avatar.png";

export function Header() {
  return (
    <header className="flex items-center justify-between px-2 pt-12 pb-2 bg-ios-system-gray-6/80 backdrop-blur-xl border-b border-ios-separator sticky top-0 z-10">
      <button className="flex items-center text-ios-blue p-2 -ml-1 hover:opacity-70 transition-opacity">
        <ArrowLeft className="w-6 h-6" />
        <span className="text-[17px] -ml-0.5 leading-none">95</span>
      </button>

      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mb-1">
          <img 
            src={avatarImage} 
            alt="AI Assistant" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center leading-tight">
          <span className="text-[12px] font-medium text-black">AI Assistant</span>
          <span className="text-[10px] text-gray-500 flex items-center gap-1">
            iMessage
          </span>
        </div>
      </div>

      <button className="p-2 text-ios-blue hover:opacity-70 transition-opacity">
        <Video className="w-6 h-6 fill-current" />
      </button>
    </header>
  );
}
