"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { users } from "../data/users";

export default function RightPanel({ onAddPost }) {
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("Please upload an image or video file");
      return;
    }

    setSelectedFile(file);
    setMediaType(isImage ? "image" : "video");

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCreatePost = async () => {
    if (!selectedFile || !preview) {
      alert("Please select a file first");
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create new post object
      const newPost = {
        id: Math.floor(Math.random() * 100000),
        username: "current_user", // In a real app, this would be the logged-in user
        avatar: "C",
        avatarUrl: "https://i.pravatar.cc/200?img=1",
        media: preview, // Using the data URL from FileReader
        mediaType: mediaType,
        likes: 0,
        timestamp: "now",
        caption: caption || "Just shared a moment!",
      };

      // Trigger callback to add post to feed
      if (onAddPost) {
        onAddPost(newPost);
      }

      // Reset form
      setPreview(null);
      setSelectedFile(null);
      setCaption("");
      setMediaType(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert("Post uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload post");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setPreview(null);
    setSelectedFile(null);
    setCaption("");
    setMediaType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUserClick = (username) => {
    router.push(`/chat?user=${username}`);
  };

  // Get only first 8 users for the online list
  const onlineUsers = users.slice(0, 8);

  return (
    <aside className="fixed right-0 top-0 h-screen w-56 bg-black border-l border-dark-border p-6 flex flex-col gap-6 overflow-y-auto">
      {/* Upload Card */}
      {!preview ? (
        <button
          onClick={handleUploadClick}
          className="flex flex-col items-center justify-center gap-3 bg-dark-card rounded-lg p-8 border border-dashed border-dark-border hover:border-accent/60 transition cursor-pointer group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-4xl font-light text-accent group-hover:scale-110 transition">
            +
          </div>
          <div className="text-center">
            <p className="text-white font-semibold text-sm">Upload for post</p>
            <p className="text-gray-400 text-xs">Photo or video</p>
          </div>
        </button>
      ) : (
        <div className="flex flex-col gap-3 bg-dark-card rounded-lg p-4 border border-dark-border">
          {/* Preview */}
          <div className="relative w-full h-32 rounded overflow-hidden bg-black">
            {mediaType === "image" ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={preview}
                className="w-full h-full object-cover"
                controls
              />
            )}
          </div>

          {/* Caption Input */}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption..."
            className="w-full bg-dark-border/20 text-white placeholder-gray-500 rounded p-2 text-xs resize-none focus:outline-none focus:border-accent border border-dark-border"
            rows={2}
          />

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCreatePost}
              disabled={isUploading}
              className="flex-1 bg-gradient-to-r from-accent to-pink-500 text-white font-semibold py-2 rounded text-sm hover:shadow-glow disabled:opacity-50 transition"
            >
              {isUploading ? "Posting..." : "Post"}
            </button>
            <button
              onClick={handleCancelUpload}
              disabled={isUploading}
              className="flex-1 bg-dark-border/40 text-gray-300 font-semibold py-2 rounded text-sm hover:bg-dark-border/60 disabled:opacity-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Online Now Section */}
      <div>
        <h3 className="text-white font-semibold mb-4 text-sm">Online now</h3>
        <div className="flex flex-col gap-3">
          {onlineUsers.map((user) => (
            <button
              key={user.username}
              onClick={() => handleUserClick(user.username)}
              className="flex items-center gap-3 hover:bg-dark-card p-2 rounded-lg transition text-left w-full"
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-accent to-pink-400 flex items-center justify-center text-white font-bold text-xs">
                  {user.avatar}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
              </div>
              <span className="text-white text-sm font-medium truncate">
                {user.username}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
