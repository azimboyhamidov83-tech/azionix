"use client";

import { Heart, Share2, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ActionButtons() {
  const [isLiked, setIsLiked] = useState(false);
  const [messageHovered, setMessageHovered] = useState(false);
  const [shareHovered, setShareHovered] = useState(false);

  const handleMessage = () => {
    console.log("Message clicked");
    alert("Opening message dialog...");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log(isLiked ? "Unliked" : "Liked");
  };

  const handleShare = () => {
    console.log("Share clicked");
    alert("Share options opened...");
  };

  return (
    <div className="flex flex-row gap-3 sm:gap-4 justify-center px-4 py-6 flex-wrap">
      {/* Message Button - Gradient Pink/Purple */}
      <button
        onClick={handleMessage}
        onMouseEnter={() => setMessageHovered(true)}
        onMouseLeave={() => setMessageHovered(false)}
        className={`flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          messageHovered
            ? "bg-gradient-to-r from-accent via-pink-500 to-purple-600 text-white shadow-glow scale-105"
            : "bg-gradient-to-r from-accent to-pink-500 text-white shadow-sm"
        }`}
      >
        <MessageCircle className="w-5 h-5" />
        <span>Message</span>
      </button>

      {/* Like Button - Outline with Heart */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3 rounded-2xl font-semibold text-sm sm:text-base border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          isLiked
            ? "border-accent bg-accent/10 text-accent shadow-glow"
            : "border-gray-600 hover:border-accent text-gray-300 hover:text-accent"
        }`}
      >
        <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        <span>Like</span>
      </button>

      {/* Share Button - Icon only */}
      <button
        onClick={handleShare}
        onMouseEnter={() => setShareHovered(true)}
        onMouseLeave={() => setShareHovered(false)}
        className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          shareHovered
            ? "border-accent bg-accent/10 text-accent shadow-glow"
            : "border-gray-600 text-gray-400 hover:border-accent hover:text-accent"
        }`}
      >
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  );
}
