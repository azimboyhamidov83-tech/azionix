"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle } from "lucide-react";

export default function Post({ post, onLikeChange }) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const mediaRef = useRef(null);
  const lastTapRef = useRef(0);

  // Load like state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
      const isLiked = likedPosts[post.id] ? true : false;
      setLiked(isLiked);
      
      // Set likes from localStorage if available
      if (likedPosts[post.id]) {
        setLikes(post.likes + (likedPosts[post.id].count || 1));
      }
    }
  }, [post.id, post.likes]);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike();
  };

  const toggleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    const isCurrentlyLiked = likedPosts[post.id] ? true : false;

    if (isCurrentlyLiked) {
      // Unlike
      delete likedPosts[post.id];
      setLiked(false);
      setLikes(prev => Math.max(0, prev - 1));
    } else {
      // Like
      likedPosts[post.id] = { liked: true, count: 1, timestamp: Date.now() };
      setLiked(true);
      setLikes(prev => prev + 1);
    }

    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    if (onLikeChange) onLikeChange(post.id, !isCurrentlyLiked);
  };

  const handleDoubleClick = (e) => {
    if (!mediaRef.current) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Get position for heart animation
    const rect = mediaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left || rect.width / 2;
    const y = e.clientY - rect.top || rect.height / 2;
    setAnimationPosition({ x, y });
    
    // Double-tap detection
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap < 300) {
      // Double tap detected
      if (!liked) {
        toggleLike();
      }
      showHeartPulse();
    }

    lastTapRef.current = now;
  };

  const showHeartPulse = () => {
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 600);
  };

  const handleDirectClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/chat?user=${post.username}`);
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/profile/${post.username}`);
  };

  return (
    <div className="bg-dark-card/40 border border-dark-border/20 rounded-xl overflow-hidden hover:border-dark-border/40 transition-all duration-300 group max-w-2xl mx-auto">
      {/* Header - User Info */}
      <div className="flex items-center justify-between p-4 border-b border-dark-border/20">
        <div className="flex items-center gap-3">
          <button
            onClick={handleProfileClick}
            className="relative flex-shrink-0 group/avatar"
          >
            <img
              src={post.avatarUrl}
              alt={post.username}
              className="w-12 h-12 rounded-full object-cover border-2 border-accent/40 group-hover/avatar:border-accent/70 smooth-transition group-hover/avatar:scale-110"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-dark shadow-glow animate-pulse"></div>
          </button>
          <div className="flex flex-col">
            <Link href={`/profile/${post.username}`} className="group/user">
              <h3 className="font-bold text-white group-hover/user:text-accent smooth-transition text-sm">
                @{post.username}
              </h3>
            </Link>
            <span className="text-xs text-gray-500">{post.timestamp}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      {/* Media */}
      <div
        ref={mediaRef}
        onClick={handleDoubleClick}
        onDoubleClick={handleDoubleClick}
        className="relative w-full bg-dark group/media cursor-pointer aspect-square"
      >
        {post.mediaType === "video" ? (
          <video
            src={post.media}
            controls
            className="w-full h-full object-cover group-hover/media:scale-105 smooth-transition"
          />
        ) : (
          <img
            src={post.media}
            alt="post"
            className="w-full h-full object-cover group-hover/media:scale-105 smooth-transition"
          />
        )}

        {/* Double-tap heart animation - centered at tap position */}
        {showHeartAnimation && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${animationPosition.x}px`,
              top: `${animationPosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="animate-pulse">
              <Heart
                className="w-24 h-24 text-white drop-shadow-lg"
                fill="white"
                style={{
                  animation: "bounce 0.6s ease-out forwards",
                }}
              />
            </div>
          </div>
        )}

        {/* Media Type Badge */}
        {post.mediaType === "video" && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold">
            ▶ VIDEO
          </div>
        )}
      </div>

      {/* Footer - Actions and Stats */}
      <div className="p-4 space-y-3">
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="group hover:text-accent transition-colors"
            >
              <Heart
                className={`w-6 h-6 smooth-transition ${
                  liked ? "scale-125" : ""
                }`}
                fill={liked ? "currentColor" : "none"}
                color={liked ? "#ff3b7b" : "currentColor"}
              />
            </button>
            <button
              onClick={handleDirectClick}
              className="group hover:text-accent transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="group hover:text-accent transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <button className="group hover:text-accent transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
            </svg>
          </button>
        </div>

        {/* Likes */}
        <div className="text-sm font-semibold text-white">
          <span className="text-accent">{likes}</span> likes
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="text-sm text-gray-300">
            <span className="font-semibold text-white">@{post.username}</span>{" "}
            {post.caption}
          </div>
        )}

        {/* Stats */}
        <div className="text-xs text-gray-500 font-medium">
          0 comments • 0 shares
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
