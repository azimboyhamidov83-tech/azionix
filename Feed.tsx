'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import PostCard from './PostCard';
import RightPanel from './RightPanel';
import { postsData } from '../data/postsNew';

const POSTS_PER_PAGE = 3;

interface Comment {
  id: number;
  userId: string;
  username: string;
  avatarUrl: string;
  text: string;
  createdAt: string;
}

interface PostType {
  id: number;
  type: 'img' | 'video';
  media: string;
  views: number;
  likes: string[];
  comments: Comment[];
  username: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>(postsData.slice(0, POSTS_PER_PAGE));
  const [displayedCount, setDisplayedCount] = useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle infinite scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = (container as HTMLDivElement).scrollTop;
      const scrollHeight = (container as HTMLDivElement).scrollHeight;
      const clientHeight = (container as HTMLDivElement).clientHeight;

      // Load more when user scrolls near bottom (200px threshold)
      if (scrollHeight - (scrollTop + clientHeight) < 200 && !isLoading) {
        loadMorePosts();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isLoading, displayedCount]);

  const loadMorePosts = useCallback(() => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const newCount = Math.min(displayedCount + POSTS_PER_PAGE, postsData.length);
      setDisplayedCount(newCount);
      setPosts(postsData.slice(0, newCount));
      setIsLoading(false);
    }, 300);
  }, [displayedCount]);

  const handleAddPost = useCallback(
    (newPost: PostType) => {
      // Add new post to the beginning of the feed
      setPosts([newPost, ...posts]);

      // Scroll to top to see the new post
      if (containerRef.current) {
        (containerRef.current as HTMLDivElement).scrollTop = 0;
      }
    },
    [posts]
  );

  const handleLikeChange = (postId: number, newLikes: string[]) => {
    // Update post likes in state
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: newLikes } : post
      )
    );
  };

  const handleCommentAdd = (postId: number, comment: Comment) => {
    // Update post comments in state
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const handleCommentDelete = (postId: number, commentId: number) => {
    // Remove comment from post
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((c) => c.id !== commentId),
            }
          : post
      )
    );
  };

  return (
    <div className="flex h-screen w-full">
      {/* Main Feed */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6"
      >
        <div className="mb-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
            LOVEGRAM Feed
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Discover amazing moments from people you love
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="flex items-center justify-center h-96 text-gray-400">
            <p>No posts yet. Be the first to share!</p>
          </div>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                type={post.type}
                media={post.media}
                views={post.views}
                likes={post.likes}
                comments={post.comments}
                username={post.username}
                currentUser="oygul"
                onLikeChange={handleLikeChange}
                onCommentAdd={handleCommentAdd}
                onCommentDelete={handleCommentDelete}
              />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center py-8">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}

            {/* End of feed message */}
            {displayedCount >= postsData.length && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-semibold">You&apos;ve reached the end of the feed</p>
                <p className="text-sm mt-1">Check back later for more amazing posts!</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Panel with Upload */}
      <RightPanel onAddPost={handleAddPost} />
    </div>
  );
}
