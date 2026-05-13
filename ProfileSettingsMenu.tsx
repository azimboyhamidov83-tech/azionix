"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ProfileSettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  married: boolean;
  avatarUrl: string;
  onUsernameChange?: (newUsername: string) => void;
  onMarriedChange?: (married: boolean) => void;
  onAvatarChange?: (newUrl: string) => void;
  onAvatarRemove?: () => void;
}

export default function ProfileSettingsMenu({
  isOpen,
  onClose,
  username,
  married,
  avatarUrl,
  onUsernameChange,
  onMarriedChange,
  onAvatarChange,
  onAvatarRemove,
}: ProfileSettingsMenuProps) {
  const [editUsername, setEditUsername] = useState(username);
  const [editMarried, setEditMarried] = useState(married);
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  if (!isOpen) return null;

  const handleSaveUsername = () => {
    if (editUsername.trim()) {
      onUsernameChange?.(editUsername);
      setIsEditingUsername(false);
    }
  };

  const handleMarriedToggle = () => {
    const newMarried = !editMarried;
    setEditMarried(newMarried);
    onMarriedChange?.(newMarried);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-dark-card border border-dark-border/30 rounded-2xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-border/20">
            <h2 className="text-xl font-bold text-white">Profile Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-border/30 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
            {/* Avatar Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">
                Profile Picture
              </h3>
              <div className="flex items-center gap-4">
                <img
                  src={avatarUrl}
                  alt={username}
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent/30"
                />
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e: any) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event: any) => {
                            onAvatarChange?.(event.target.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      };
                      input.click();
                    }}
                    className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent text-sm font-semibold rounded-lg transition-colors"
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => onAvatarRemove?.()}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-semibold rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Username Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">
                Username
              </h3>
              {isEditingUsername ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSaveUsername()}
                    className="flex-1 bg-dark-border/30 border border-dark-border/50 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 transition-colors"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveUsername}
                    className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent font-semibold rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-dark-border/20 rounded-lg">
                  <span className="text-white">@{editUsername}</span>
                  <button
                    onClick={() => setIsEditingUsername(true)}
                    className="px-3 py-1 bg-accent/20 hover:bg-accent/30 text-accent text-sm font-semibold rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Married Status Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">
                Relationship
              </h3>
              <div className="flex items-center justify-between p-3 bg-dark-border/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💍</span>
                  <span className="text-white font-semibold">
                    Married: {editMarried ? "YES" : "NO"}
                  </span>
                </div>
                <button
                  onClick={handleMarriedToggle}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    editMarried
                      ? "bg-green-500/20 hover:bg-green-500/30 text-green-400"
                      : "bg-gray-500/20 hover:bg-gray-500/30 text-gray-400"
                  }`}
                >
                  {editMarried ? "Yes" : "No"}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-dark-border/20 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-dark-border/30 hover:bg-dark-border/50 text-gray-300 font-semibold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
