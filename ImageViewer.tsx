"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle } from "lucide-react";

interface Comment {
  id: number;
  userId: string;
  username: string;
  avatarUrl: string;
  text: string;
  createdAt: string;
}

interface Post {
  id: number;
  type: "img" | "video";
  media: string;
  views: number;
  likes: string[];
  comments: Comment[];
}

interface ImageViewerProps {
  posts: Post[];
  initialPostId: number;
  onClose: () => void;
  onLikeChange?: (postId: number, newLikes: string[]) => void;
  onCommentAdd?: (postId: number, comment: Comment) => void;
  onCommentDelete?: (postId: number, commentId: number) => void;
  currentUser?: string;
}

export default function ImageViewer({
  posts,
  initialPostId,
  onClose,
  onLikeChange,
  onCommentAdd,
  onCommentDelete,
  currentUser = "oygul",
}: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(posts.findIndex((p) => p.id === initialPostId));
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentPost = posts[currentIndex];
  const [isLiked, setIsLiked] = useState(currentPost.likes.includes(currentUser));
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [localLikes, setLocalLikes] = useState([...currentPost.likes]);
  const [localComments, setLocalComments] = useState([...currentPost.comments]);

  useEffect(() => {
    setIsLiked(currentPost.likes.includes(currentUser));
    setLocalLikes([...currentPost.likes]);
    setLocalComments([...currentPost.comments]);
    setNewComment("");
  }, [currentIndex, currentPost, currentUser]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  const toggleLike = () => {
    const updatedLikes = isLiked
      ? localLikes.filter((u) => u !== currentUser)
      : [...localLikes, currentUser];

    setIsLiked(!isLiked);
    setLocalLikes(updatedLikes);
    onLikeChange?.(currentPost.id, updatedLikes);
  };

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Math.max(...localComments.map((c) => c.id), 0) + 1,
        userId: currentUser,
        username: currentUser,
        avatarUrl: `https://i.pravatar.cc/200?img=${Math.floor(Math.random() * 50)}`,
        text: newComment,
        createdAt: "now",
      };
      setLocalComments([...localComments, comment]);
      setNewComment("");
      onCommentAdd?.(currentPost.id, comment);
    }
  };

  const deleteComment = (commentId: number) => {
    setLocalComments(localComments.filter((c) => c.id !== commentId));
    onCommentDelete?.(currentPost.id, commentId);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Main Content */}
      <div className="flex w-full h-full max-w-6xl gap-4">
        {/* Image/Video Section */}
        <div className="flex-1 flex items-center justify-center relative">
          {currentPost.type === "video" ? (
            <video
              src={currentPost.media}
              controls
              className="w-full h-full object-contain max-h-screen"
            />
          ) : (
            <img
              src={currentPost.media}
              alt="Post"
              className="w-full h-full object-contain max-h-screen rounded-lg"
            />
          )}

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-accent" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-accent" />
          </button>

          {/* Post Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-semibold">
            {currentIndex + 1} / {posts.length}
          </div>
        </div>

        {/* Comments and Info Section */}
        <div className="w-96 flex flex-col bg-dark-card/40 rounded-xl border border-dark-border/20 overflow-hidden">
          {/* Header Stats */}
          <div className="p-4 border-b border-dark-border/20 space-y-3">
            {/* Aura */}
            <div className="flex items-center gap-2 text-white text-sm">
              <span className="text-lg">🔥</span>
              <span>Aura: {currentPost.views.toLocaleString()} views</span>
            </div>

            {/* Like Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLike}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isLiked ? "fill-accent text-accent" : "text-accent"
                  }`}
                />
                <span className="text-white font-semibold">{localLikes.length}</span>
              </button>

              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-accent" />
                <span className="text-white font-semibold">{localComments.length}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 flex flex-col">
            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {localComments.length > 0 ? (
                localComments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <img
                      src={comment.avatarUrl}
                      alt={comment.username}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 bg-dark-border/20 rounded-lg px-3 py-2 flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm">
                          <span className="font-semibold text-white">{comment.username}</span>
                        </p>
                        <p className="text-gray-400 text-xs mt-1">{comment.text}</p>
                      </div>
                      {comment.userId === currentUser && (
                        <button
                          onClick={() => deleteComment(comment.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-sm py-8">No comments yet</p>
              )}
            </div>

            {/* Add Comment Input */}
            <div className="p-4 border-t border-dark-border/20 flex gap-2">
              <input
                type="text"
                placeholder="Add comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addComment()}
                className="flex-1 bg-dark-border/20 border border-dark-border/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button
                onClick={addComment}
                disabled={!newComment.trim()}
                className="bg-accent/20 hover:bg-accent/30 disabled:bg-dark-border/20 text-accent disabled:text-gray-500 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
