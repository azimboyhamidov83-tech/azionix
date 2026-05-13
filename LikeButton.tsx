'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeart from './AnimatedHeart';
import { useToastStore } from '@/stores/useToastStore';

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onLike: () => void;
  compact?: boolean;
}

export default function LikeButton({
  isLiked,
  likesCount,
  onLike,
  compact = false,
}: LikeButtonProps) {
  const addToast = useToastStore((state) => state.addToast);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onLike();
    if (!isLiked) {
      addToast('Post liked', 'success');
    }
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`flex items-center gap-2 group transition-colors ${
        compact ? 'text-xs' : 'text-sm'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`relative flex items-center justify-center transition-all ${
          compact ? 'w-5 h-5' : 'w-6 h-6'
        }`}
        animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <AnimatedHeart isLiked={isLiked} />

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-pink-500/20 blur-md -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      <motion.span
        className={`font-medium transition-colors ${
          isLiked
            ? 'text-pink-400 group-hover:text-pink-300'
            : 'text-gray-400 group-hover:text-pink-400'
        }`}
        key={likesCount}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {likesCount}
      </motion.span>

      {/* Cursor pointer indicator */}
      <div className="absolute inset-0 rounded-lg transition-all opacity-0 group-hover:opacity-100 pointer-events-none" />
    </motion.button>
  );
}
