"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, Image as ImageIcon, MessageCircle } from "lucide-react";
import Post from "./Post";
import { postsData } from "../data/posts";
import { users } from "../data/users";

const POSTS_PER_PAGE = 3;

export default function Feed() {
  const router = useRouter();
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploadCaption, setUploadCaption] = useState("");

  // Initialize with first batch of posts
  useEffect(() => {
    loadMorePosts();
  }, []);

  const loadMorePosts = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const startIndex = currentIndex;
      const endIndex = Math.min(startIndex + POSTS_PER_PAGE, postsData.length);
      const newPosts = postsData.slice(startIndex, endIndex);

      setDisplayedPosts(prev => [...prev, ...newPosts]);
      setCurrentIndex(endIndex);
      setHasMore(endIndex < postsData.length);
      setIsLoading(false);
    }, 300);
  }, [currentIndex, isLoading, hasMore]);

  // Infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPercentage > 0.7 && hasMore && !isLoading) {
        loadMorePosts();
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [loadMorePosts, hasMore, isLoading]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadPreview(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePublishPost = () => {
    if (!uploadPreview || !uploadCaption.trim()) {
      alert("Please add a caption and media");
      return;
    }

    // Create new post
    const newPost = {
      id: Math.max(...postsData.map(p => p.id), 0) + 1,
      username: "oygul",
      avatar: "O",
      avatarUrl: "https://i.pravatar.cc/200?img=5",
      media: uploadPreview,
      mediaType: uploadedFile?.type.startsWith("video") ? "video" : "image",
      likes: 0,
      timestamp: "just now",
      caption: uploadCaption
    };

    // Add to beginning of displayed posts
    setDisplayedPosts(prev => [newPost, ...prev]);

    // Reset form
    setUploadedFile(null);
    setUploadPreview(null);
    setUploadCaption("");

    alert("✨ Post published!");
  };

  const handleUserClick = (username) => {
    router.push(`/chat?user=${username}`);
  };

  return (
    <div className="flex h-full w-full bg-gradient-to-br from-dark via-dark-card/50 to-dark overflow-hidden">
      {/* CENTER - FEED */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-dark-border/20 backdrop-blur-md bg-gradient-to-b from-dark/80 to-dark/60 px-8 py-6">
          <h1 className="text-4xl font-bold text-white">Menu</h1>
          <p className="text-sm text-gray-400 mt-1">Discover posts from people you love</p>
        </div>

        {/* Posts Feed */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-transparent"
        >
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
            {displayedPosts.length === 0 ? (
              <div className="flex items-center justify-center h-96 flex-col text-center">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-lg font-semibold text-gray-300">No posts yet</p>
                <p className="text-sm text-gray-500 mt-2">Be the first to share something!</p>
              </div>
            ) : (
              displayedPosts.map((post) => (
                <Post key={post.id} post={post} />
              ))
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
              </div>
            )}

            {/* End of feed message */}
            {!hasMore && displayedPosts.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 font-medium">No more posts to load</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-80 border-l border-dark-border/20 backdrop-blur-md bg-gradient-to-b from-dark/80 to-dark/60 flex flex-col p-6 gap-6 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-transparent">
        {/* Upload Box */}
        <div className="bg-dark-card/60 border-2 border-dashed border-accent/40 rounded-xl p-6 text-center hover:border-accent/60 smooth-transition">
          <div className="text-4xl mb-3">➕</div>
          <h3 className="font-bold text-white mb-2">Upload for post</h3>
          <p className="text-xs text-gray-400 mb-4">Photo or video</p>

          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/40 rounded-lg py-2 px-3 text-xs font-bold text-accent hover:bg-accent/20 smooth-transition">
              Choose File
            </div>
          </label>
        </div>

        {/* Upload Preview and Caption */}
        {uploadPreview && (
          <div className="bg-dark-card/60 rounded-xl p-4 border border-dark-border/40 space-y-3">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-dark">
              {uploadedFile?.type.startsWith("video") ? (
                <video
                  src={uploadPreview}
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <img
                  src={uploadPreview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <textarea
              value={uploadCaption}
              onChange={(e) => setUploadCaption(e.target.value)}
              placeholder="Write a caption..."
              maxLength={150}
              className="w-full bg-dark-card/60 border border-dark-border/40 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20 resize-none"
              rows={3}
            />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setUploadedFile(null);
                  setUploadPreview(null);
                  setUploadCaption("");
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-dark-card/60 border border-dark-border/40 text-sm font-medium text-gray-300 hover:border-dark-border/60 smooth-transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishPost}
                className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-accent to-pink-500 text-white text-sm font-bold hover:shadow-glow smooth-transition active:scale-95"
              >
                Publish
              </button>
            </div>
          </div>
        )}

        {/* Online Users */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">
            🟢 Online Now
          </h3>

          <div className="space-y-2">
            {users.slice(0, 8).map((user) => (
              <button
                key={user.username}
                onClick={() => handleUserClick(user.username)}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-dark-card/40 border border-dark-border/20 hover:border-accent/30 hover:bg-dark-card/60 smooth-transition group active:scale-95"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-accent/40 group-hover:border-accent/70 smooth-transition group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-dark shadow-glow animate-pulse"></div>
                </div>

                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-bold text-white truncate group-hover:text-accent smooth-transition">
                    @{user.username}
                  </p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>

                <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-accent smooth-transition flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-3 border-t border-dark-border/20 pt-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">
            Suggested
          </h3>

          <div className="space-y-2">
            {users.slice(8, 10).map((user) => (
              <button
                key={user.username}
                onClick={() => router.push(`/profile/${user.username}`)}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-dark-card/40 border border-dark-border/20 hover:border-accent/30 hover:bg-dark-card/60 smooth-transition group active:scale-95"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover border-2 border-accent/40 group-hover:border-accent/70 smooth-transition"
                />

                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-bold text-white truncate group-hover:text-accent smooth-transition">
                    @{user.username}
                  </p>
                  <p className="text-xs text-gray-500">{user.photos} photos</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
