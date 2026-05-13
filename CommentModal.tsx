'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useToastStore } from '@/stores/useToastStore';

interface Comment {
  id: number;
  userId: string;
  username: string;
  avatarUrl: string;
  text: string;
  createdAt: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
  onDeleteComment: (commentId: number) => void;
  currentUser: string;
}

export default function CommentModal({
  isOpen,
  onClose,
  comments,
  onAddComment,
  onDeleteComment,
  currentUser,
}: CommentModalProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    const comment: Comment = {
      id: Math.max(...comments.map((c) => c.id), 0) + 1,
      userId: currentUser,
      username: currentUser,
      avatarUrl: `https://i.pravatar.cc/200?img=${Math.floor(Math.random() * 50)}`,
      text: newComment,
      createdAt: 'now',
    };

    onAddComment(comment);
    setNewComment('');
    addToast('Comment added', 'success');

    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700/30">
                <h2 className="text-lg font-bold text-white">Comments</h2>
                <motion.button
                  onClick={onClose}
                  className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Comments List */}
              <div className="max-h-96 overflow-y-auto space-y-3 p-4">
                {comments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">
                      No comments yet. Be the first to comment!
                    </p>
                  </div>
                ) : (
                  comments
                    .slice()
                    .reverse()
                    .map((comment) => (
                      <motion.div
                        key={comment.id}
                        className="flex gap-3 group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                      >
                        <img
                          src={comment.avatarUrl}
                          alt={comment.username}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-white">
                              {comment.username}
                            </p>
                            {comment.userId === currentUser && (
                              <motion.button
                                onClick={() => onDeleteComment(comment.id)}
                                className="text-xs text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Delete
                              </motion.button>
                            )}
                          </div>
                          <p className="text-sm text-gray-300 mt-1">
                            {comment.text}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {comment.createdAt}
                          </p>
                        </div>
                      </motion.div>
                    ))
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-700/30 p-4 bg-slate-950/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Write a comment..."
                    className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-colors"
                  />
                  <motion.button
                    onClick={handleAddComment}
                    disabled={isSubmitting || !newComment.trim()}
                    className="px-3 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
