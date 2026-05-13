"use client";

import { Eye, Heart, Play } from "lucide-react";

interface Post {
  id: string;
  image: string;
  type: "photo" | "video";
  views?: string;
  likes?: number;
}

interface ProfileGridProps {
  posts: Post[];
  activeTab: "photos" | "videos";
}

export default function ProfileGrid({ posts, activeTab }: ProfileGridProps) {
  // Filter posts based on active tab
  const filteredPosts = posts.filter((post) => {
    if (activeTab === "photos") return post.type === "photo";
    if (activeTab === "videos") return post.type === "video";
    return true;
  });

  return (
    <div className="px-4 sm:px-6 py-8">
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-sm">
            No {activeTab} yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg sm:rounded-2xl h-48 sm:h-64 lg:h-72"
            >
              {/* Post Image */}
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                <div className="flex items-center gap-3 sm:gap-4 w-full text-white text-xs sm:text-sm">
                  {post.type === "video" ? (
                    <>
                      <div className="flex items-center gap-1">
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                        <span>Video</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {post.views && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{post.views}</span>
                        </div>
                      )}
                      {post.likes !== undefined && (
                        <div className="flex items-center gap-1 ml-auto">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-accent text-accent" />
                          <span>{post.likes}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Video Icon Badge */}
              {post.type === "video" && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/80 flex items-center justify-center">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-white text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
