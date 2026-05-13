"use client";

import { Image as ImageIcon, Video } from "lucide-react";

interface ProfileTabsProps {
  activeTab: "photos" | "videos";
  onTabChange: (tab: "photos" | "videos") => void;
}

export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  return (
    <div className="border-b border-dark-border px-4 sm:px-6">
      <div className="flex items-center gap-6 sm:gap-8">
        {/* Photos Tab */}
        <button
          onClick={() => onTabChange("photos")}
          className={`flex items-center gap-2 py-4 text-sm sm:text-base font-semibold transition-all duration-300 relative group ${
            activeTab === "photos"
              ? "text-white"
              : "text-gray-500 hover:text-gray-400"
          }`}
        >
          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Photos</span>
          {activeTab === "photos" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-pink-500 rounded-t-full shadow-glow" />
          )}
        </button>

        {/* Videos Tab */}
        <button
          onClick={() => onTabChange("videos")}
          className={`flex items-center gap-2 py-4 text-sm sm:text-base font-semibold transition-all duration-300 relative group ${
            activeTab === "videos"
              ? "text-white"
              : "text-gray-500 hover:text-gray-400"
          }`}
        >
          <Video className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Videos</span>
          {activeTab === "videos" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-pink-500 rounded-t-full shadow-glow" />
          )}
        </button>
      </div>
    </div>
  );
}
