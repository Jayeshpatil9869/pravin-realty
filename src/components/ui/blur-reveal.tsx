import React from 'react';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
  initial: {
    opacity: 0.001,
    y: 20,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      mass: 0.9,
    },
  },
};

export function BlurRevealItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// Split Text Blur Wave (Signature Kanva Headline Transition)
export function BlurWaveText({
  text,
  as: Tag = 'h1',
  className = '',
  staggerDuration = 0.04,
}: {
  text: string;
  as?: any;
  className?: string;
  staggerDuration?: number;
}) {
  const words = text.split(' ');

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDuration,
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="inline-block"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            style={{
              display: 'inline-block',
              marginRight: '0.25em',
              whiteSpace: 'nowrap',
              willChange: 'transform, filter, opacity',
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
