"use client";

interface ProfileHeaderProps {
  avatar: string;
  username: string;
  isOnline?: boolean;
  married?: boolean;
  onAvatarClick?: () => void;
}

export default function ProfileHeader({
  avatar,
  username,
  isOnline = true,
  married = false,
  onAvatarClick,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 sm:py-12">
      {/* Avatar with online indicator */}
      <div 
        className={`relative mb-6 ${onAvatarClick ? "cursor-pointer" : ""}`}
        onClick={onAvatarClick}
      >
        {/* Main avatar */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-accent/20 overflow-hidden shadow-lg hover:border-accent/50 transition-colors duration-300">
          <img
            src={avatar}
            alt={username}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Online status indicator */}
        {isOnline && (
          <div className="absolute bottom-3 right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-400 border-4 border-dark shadow-lg animate-pulse"></div>
        )}
      </div>

      {/* Username and status */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">@{username}</h1>
      <p className="text-gray-400 text-sm flex items-center gap-2 mb-3">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        Online now
      </p>

      {/* Married Status Badge */}
      {married && (
        <div className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-500/30 rounded-full flex items-center gap-2">
          <span className="text-xl">💍</span>
          <span className="text-sm font-semibold text-pink-300">Married</span>
        </div>
      )}
    </div>
  );
}
