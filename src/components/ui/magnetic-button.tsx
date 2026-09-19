import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Distance multiplier (default 0.25)
  activeScale?: number;
}

export function Magnetic({
  children,
  className = '',
  strength = 0.25,
  activeScale = 0.96,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Pure motion values - ZERO React component re-renders on mouse move!
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 18, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY, willChange: 'transform' }}
      whileTap={{ scale: activeScale }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

