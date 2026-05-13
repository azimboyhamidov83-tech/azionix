"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface User {
  id: string | number;
  avatar?: string;
  username: string;
  avatarUrl?: string;
}

interface PeopleLikedProps {
  users: User[];
  title?: string;
  onUserClick?: (username: string) => void;
}

export default function PeopleLiked({
  users,
  title = "PEOPLE WHO LIKED THIS",
  onUserClick,
}: PeopleLikedProps) {
  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 py-8 border-t border-dark-border">
      {/* Title */}
      <h3 className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-semibold mb-5">
        {title}
      </h3>

      {/* Avatars Container - Horizontal scroll */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/profile/${user.username}`}
            onClick={() => onUserClick?.(user.username)}
            className="flex flex-col items-center gap-2 flex-shrink-0 group cursor-pointer"
          >
            {/* Avatar */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-accent/30 overflow-hidden transition-all duration-300 group-hover:border-accent group-hover:shadow-glow">
              {user.avatarUrl || user.avatar ? (
                <img
                  src={user.avatarUrl || user.avatar}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            {/* Username */}
            <span className="text-xs text-gray-400 max-w-14 text-center truncate group-hover:text-accent transition-colors">
              @{user.username}
            </span>
          </Link>
        ))}

        {/* View More */}
        {users.length > 5 && (
          <div className="flex flex-col items-center gap-2 flex-shrink-0 group cursor-pointer">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-accent/30 bg-gradient-to-br from-dark-card to-dark flex items-center justify-center transition-all duration-300 group-hover:border-accent group-hover:shadow-glow">
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
            </div>
            <span className="text-xs text-gray-400 max-w-14 text-center truncate">
              View more
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
