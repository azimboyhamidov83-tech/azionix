'use client';

import { motion } from 'framer-motion';
import React, { useRef } from 'react';

interface DoubleClickHeartProps {
  onDoubleTap: () => void;
  children: React.ReactNode;
}

interface HeartPosition {
  x: number;
  y: number;
  id: number;
}

export default function DoubleClickHeart({
  onDoubleTap,
  children,
}: DoubleClickHeartProps) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const clickCountRef = useRef(0);
  const [floatingHearts, setFloatingHearts] = React.useState<HeartPosition[]>(
    []
  );

  const handleClick = (e: React.MouseEvent) => {
    clickCountRef.current++;

    if (clickCountRef.current === 1) {
      timeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 300);
    } else if (clickCountRef.current === 2) {
      clearTimeout(timeoutRef.current);
      clickCountRef.current = 0;

      // Add floating heart at click position
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newHeart: HeartPosition = {
        x,
        y,
        id: Math.random(),
      };

      setFloatingHearts((prev) => [...prev, newHeart]);

      // Remove heart after animation
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1000);

      onDoubleTap();
    }
  };

  return (
    <div
      className="relative w-full h-full cursor-pointer"
      onClick={handleClick}
    >
      {children}

      {/* Floating Hearts */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{ left: heart.x, top: heart.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5, 1.2],
            opacity: [1, 1, 0],
            y: -100,
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <svg
            className="w-16 h-16 drop-shadow-lg"
            viewBox="0 0 24 24"
            fill="#ff2d75"
            stroke="#ff2d75"
            strokeWidth={1}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
