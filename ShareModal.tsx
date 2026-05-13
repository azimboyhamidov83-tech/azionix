'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, MessageSquare, Share2, CheckCircle } from 'lucide-react';
import { useToastStore } from '@/stores/useToastStore';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

export default function ShareModal({
  isOpen,
  onClose,
  postId,
}: ShareModalProps) {
  const [copied, setCopied] = React.useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/post/${postId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      addToast('Link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast('Failed to copy link', 'error');
    }
  };

  const handleShareToChat = () => {
    addToast('Opening chat with share option...', 'info');
    onClose();
  };

  const handleShareProfile = () => {
    addToast('Post added to profile share!', 'success');
    onClose();
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
                <h2 className="text-lg font-bold text-white">Share Post</h2>
                <motion.button
                  onClick={onClose}
                  className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Share Options */}
              <div className="p-4 space-y-3">
                {/* Copy Link */}
                <motion.button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-800/70 rounded-lg transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="p-2 bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-lg"
                    animate={copied ? { scale: [1, 1.2, 1] } : {}}
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-pink-400" />
                    )}
                  </motion.div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white">Copy Link</p>
                    <p className="text-xs text-gray-400 truncate">
                      {copied ? 'Copied!' : shareUrl}
                    </p>
                  </div>
                </motion.button>

                {/* Send to Chat */}
                <motion.button
                  onClick={handleShareToChat}
                  className="w-full flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-800/70 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white">Send to Chat</p>
                    <p className="text-xs text-gray-400">
                      Share with your followers
                    </p>
                  </div>
                </motion.button>

                {/* Share to Profile */}
                <motion.button
                  onClick={handleShareProfile}
                  className="w-full flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-800/70 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg">
                    <Share2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white">Share to Profile</p>
                    <p className="text-xs text-gray-400">
                      Add to your story
                    </p>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
