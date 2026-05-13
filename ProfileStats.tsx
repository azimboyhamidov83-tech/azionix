"use client";

import { Image, Video } from "lucide-react";

interface StatsProps {
  totalPosts: number;
  imageCount: number;
  videoCount: number;
}

export default function ProfileStats({ totalPosts, imageCount, videoCount }: StatsProps) {
  return (
    <div className="flex flex-row gap-3 sm:gap-4 justify-center px-4 py-6 flex-wrap">
      {/* Total Posts */}
      <div className="flex-1 min-w-[90px] sm:min-w-[110px] p-3 sm:p-4 rounded-2xl border border-accent/20 bg-gradient-to-br from-dark-card/60 to-dark/60 backdrop-blur-md hover:border-accent/50 hover:shadow-glow transition-all duration-300">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
            Posts
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {totalPosts}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            📸 {imageCount} | 🎬 {videoCount}
          </p>
        </div>
      </div>

      {/* Images Count */}
      <div className="flex-1 min-w-[90px] sm:min-w-[110px] p-3 sm:p-4 rounded-2xl border border-accent/20 bg-gradient-to-br from-dark-card/60 to-dark/60 backdrop-blur-md hover:border-accent/50 hover:shadow-glow transition-all duration-300">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
            Images
          </p>
          <div className="flex items-center justify-center mt-2">
            <Image className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white mt-2">
            {imageCount}
          </p>
        </div>
      </div>

      {/* Videos Count */}
      <div className="flex-1 min-w-[90px] sm:min-w-[110px] p-3 sm:p-4 rounded-2xl border border-accent/20 bg-gradient-to-br from-dark-card/60 to-dark/60 backdrop-blur-md hover:border-accent/50 hover:shadow-glow transition-all duration-300">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
            Videos
          </p>
          <div className="flex items-center justify-center mt-2">
            <Video className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white mt-2">
            {videoCount}
          </p>
        </div>
      </div>
    </div>
  );
}
