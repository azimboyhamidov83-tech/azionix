'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ParticleProps {
  id: number;
  delay: number;
}

const Particle: React.FC<ParticleProps> = ({ id, delay }) => {
  const angle = (id / 8) * Math.PI * 2;
  const distance = 80;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-600"
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      style={{ left: '50%', top: '50%', marginLeft: -4, marginTop: -4 }}
    />
  );
};

interface AnimatedHeartProps {
  isLiked: boolean;
}

export default function AnimatedHeart({ isLiked }: AnimatedHeartProps) {
  const heartVariants = {
    unliked: { scale: 1 },
    liked: {
      scale: [1, 1.3, 1.15],
      transition: { duration: 0.4 },
    },
  };

  const glowVariants = {
    unliked: { opacity: 0, scale: 1 },
    liked: {
      opacity: [0, 0.6, 0],
      scale: [0.8, 1.2, 1.4],
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 blur-md"
        variants={glowVariants}
        animate={isLiked ? 'liked' : 'unliked'}
      />

      {/* Heart Container */}
      <motion.div
        className="relative w-6 h-6"
        variants={heartVariants}
        animate={isLiked ? 'liked' : 'unliked'}
      >
        {/* Particles */}
        {isLiked &&
          Array.from({ length: 8 }).map((_, i) => (
            <Particle key={i} id={i} delay={0.05 * i} />
          ))}

        {/* Heart SVG */}
        <svg
          className="w-full h-full"
          viewBox="0 0 24 24"
          fill={isLiked ? '#ff2d75' : 'none'}
          stroke={isLiked ? '#ff2d75' : 'currentColor'}
          strokeWidth={isLiked ? 0 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </motion.div>
    </div>
  );
}
