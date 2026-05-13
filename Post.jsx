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
    <div className="flex items-start gap-4 p-5 rounded-xl border border-dark-border/20 bg-dark-card/40 backdrop-blur-sm hover:border-dark-border/40 transition-all duration-300 group">
      {/* User Avatar and Info */}
      <div className="flex flex-col gap-3 flex-shrink-0">
        <button
          onClick={handleProfileClick}
          className="relative flex-shrink-0 group/avatar"
        >
          <img
            src={post.avatarUrl}
            alt={post.username}
            className="w-16 h-16 rounded-full object-cover border-3 border-accent/40 group-hover/avatar:border-accent/70 smooth-transition group-hover/avatar:scale-110"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-2 border-dark shadow-glow animate-pulse"></div>
        </button>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-fit">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm smooth-transition border transition-all active:scale-95 ${
              liked
                ? "bg-gradient-to-r from-accent to-pink-500 text-white border-accent/50 shadow-glow"
                : "bg-dark-card/60 border-dark-border/40 text-gray-300 hover:text-accent hover:border-accent/40"
            }`}
          >
            <Heart
              className={`w-4 h-4 smooth-transition ${liked ? "scale-125" : ""}`}
              fill={liked ? "currentColor" : "none"}
            />
            <span className="text-xs">{likes}</span>
          </button>

          {/* Direct Button */}
          <button
            onClick={handleDirectClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-dark-card/60 border border-dark-border/40 text-gray-300 hover:text-accent hover:border-accent/40 smooth-transition active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">Direct</span>
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Username and Info */}
        <div className="flex items-center justify-between">
          <Link href={`/profile/${post.username}`} className="group/user">
            <h3 className="font-bold text-white group-hover/user:text-accent smooth-transition">
              @{post.username}&apos;s post
            </h3>
          </Link>
          <span className="text-xs text-gray-500 font-medium">{post.timestamp}</span>
        </div>

        {/* Media */}
        <div
          ref={mediaRef}
          onClick={handleDoubleClick}
          onDoubleClick={handleDoubleClick}
          className="relative w-full rounded-lg overflow-hidden bg-dark group/media cursor-pointer aspect-square sm:aspect-video"
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

        {/* Caption */}
        {post.caption && (
          <p className="text-sm text-gray-300 leading-relaxed">{post.caption}</p>
        )}

        {/* Stats */}
        <div className="flex gap-4 text-xs text-gray-500 font-medium pt-2 border-t border-dark-border/20">
          <span className="text-accent">{likes} likes</span>
          <span>0 comments</span>
          <span>0 shares</span>
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
