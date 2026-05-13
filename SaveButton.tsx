'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useToastStore } from '@/stores/useToastStore';

interface SaveButtonProps {
  isSaved: boolean;
  onSave: () => void;
  compact?: boolean;
}

export default function SaveButton({
  isSaved,
  onSave,
  compact = false,
}: SaveButtonProps) {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const handleClick = () => {
    setIsAnimating(true);
    onSave();
    addToast(
      isSaved ? 'Removed from saved' : 'Saved successfully',
      'success'
    );
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="group transition-colors"
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
        <motion.div
          initial={{ rotateZ: 0 }}
          animate={isAnimating ? { rotateZ: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Bookmark
            className={`w-full h-full transition-all ${
              isSaved
                ? 'fill-pink-400 text-pink-400'
                : 'text-gray-400 group-hover:text-pink-400'
            }`}
          />
        </motion.div>

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-pink-500/20 blur-md -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.button>
  );
}
