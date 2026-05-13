'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import DoubleClickHeart from './DoubleClickHeart';
import PostActions from './PostActions';

interface Comment {
  id: number;
  userId: string;
  username: string;
  avatarUrl: string;
  text: string;
  createdAt: string;
}

interface PostCardProps {
  id: number;
  type: 'img' | 'video';
  media: string;
  views: number;
  likes: string[];
  comments: Comment[];
  username: string;
  onLikeChange?: (postId: number, newLikes: string[]) => void;
  onCommentAdd?: (postId: number, comment: Comment) => void;
  onCommentDelete?: (postId: number, commentId: number) => void;
  onOpenViewer?: (postId: number) => void;
  currentUser?: string;
}

export default function PostCard({
  id,
  type,
  media,
  views,
  likes,
  comments,
  username,
  onLikeChange,
  onCommentAdd,
  onCommentDelete,
  onOpenViewer,
  currentUser = 'oygul',
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(likes.includes(currentUser));
  const [isSaved, setIsSaved] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);
  const [localComments, setLocalComments] = useState(comments);

  const toggleLike = () => {
    const updatedLikes = isLiked
      ? localLikes.filter((u) => u !== currentUser)
      : [...localLikes, currentUser];

    setIsLiked(!isLiked);
    setLocalLikes(updatedLikes);
    onLikeChange?.(id, updatedLikes);
  };

  const handleAddComment = (comment: Comment) => {
    setLocalComments([...localComments, comment]);
    onCommentAdd?.(id, comment);
  };

  const handleDeleteComment = (commentId: number) => {
    setLocalComments(localComments.filter((c) => c.id !== commentId));
    onCommentDelete?.(id, commentId);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-700/30 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 group"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Post Image/Video Container */}
      <DoubleClickHeart onDoubleTap={toggleLike}>
        <div className="relative overflow-hidden h-64 sm:h-80 md:h-96 bg-slate-950 cursor-pointer">
          {type === 'video' ? (
            <>
              <video
                src={media}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <motion.div
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-pink-500/80 backdrop-blur-md flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4 fill-white text-white" />
              </motion.div>
            </>
          ) : (
            <motion.img
              src={media}
              alt={`Post by ${username}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => onOpenViewer?.(id)}
            />
          )}

          {/* Hover Overlay with Stats */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="flex gap-8 text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
              >
                <motion.svg
                  className="w-12 h-12 mb-2 text-pink-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </motion.svg>
                <span className="text-lg font-bold">
                  {localLikes.length}
                </span>
              </motion.div>
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
              >
                <svg
                  className="w-12 h-12 mb-2 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-lg font-bold">
                  {localComments.length}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Aura Badge */}
          <motion.div
            className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-lg">🔥</span>
            <span>Aura: {views.toLocaleString()}</span>
          </motion.div>
        </div>
      </DoubleClickHeart>

      {/* Post Info */}
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.p
          className="text-sm text-gray-400 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Posted by{' '}
          <span className="font-semibold text-white hover:text-pink-400 transition-colors cursor-pointer">
            @{username}
          </span>
        </motion.p>
      </motion.div>

      {/* Actions */}
      <PostActions
        postId={id}
        isLiked={isLiked}
        likesCount={localLikes.length}
        commentsCount={localComments.length}
        views={views}
        isSaved={isSaved}
        comments={localComments}
        currentUser={currentUser}
        onLike={toggleLike}
        onSave={handleSave}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
      />
    </motion.div>
  );
}
