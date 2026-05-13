'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Share2,
  Eye,
} from 'lucide-react';
import LikeButton from './LikeButton';
import SaveButton from './SaveButton';
import CommentModal from './CommentModal';
import ShareModal from './ShareModal';

interface Comment {
  id: number;
  userId: string;
  username: string;
  avatarUrl: string;
  text: string;
  createdAt: string;
}

interface PostActionsProps {
  postId: number;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  views: number;
  isSaved: boolean;
  comments: Comment[];
  currentUser: string;
  onLike: () => void;
  onSave: () => void;
  onAddComment: (comment: Comment) => void;
  onDeleteComment: (commentId: number) => void;
}

export default function PostActions({
  postId,
  isLiked,
  likesCount,
  commentsCount,
  views,
  isSaved,
  comments,
  currentUser,
  onLike,
  onSave,
  onAddComment,
  onDeleteComment,
}: PostActionsProps) {
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="flex items-center justify-between px-4 py-3 border-t border-slate-700/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Actions */}
        <motion.div
          className="flex items-center gap-4"
          variants={itemVariants}
        >
          <LikeButton
            isLiked={isLiked}
            likesCount={likesCount}
            onLike={onLike}
          />

          <motion.button
            onClick={() => setShowComments(true)}
            className="flex items-center gap-2 group text-sm hover:text-cyan-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 10 }}
            >
              <MessageCircle className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              {commentsCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 text-xs bg-cyan-500/80 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {commentsCount > 99 ? '99+' : commentsCount}
                </motion.span>
              )}
            </motion.div>
            <span className="font-medium text-gray-300 group-hover:text-cyan-400 transition-colors">
              {commentsCount}
            </span>
          </motion.button>

          <motion.button
            onClick={() => setShowShare(true)}
            className="flex items-center gap-2 group text-sm hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div whileHover={{ rotate: -10 }}>
              <Share2 className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Right Actions */}
        <motion.div
          className="flex items-center gap-4"
          variants={itemVariants}
        >
          {/* Views Counter */}
          <motion.div
            className="flex items-center gap-1 text-xs text-gray-400"
            whileHover={{ scale: 1.1 }}
          >
            <Eye className="w-4 h-4" />
            <span className="font-medium">{views.toLocaleString()}</span>
          </motion.div>

          {/* Save Button */}
          <SaveButton isSaved={isSaved} onSave={onSave} />
        </motion.div>
      </motion.div>

      {/* Modals */}
      <CommentModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        comments={comments}
        onAddComment={onAddComment}
        onDeleteComment={onDeleteComment}
        currentUser={currentUser}
      />

      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        postId={postId}
      />
    </>
  );
}
