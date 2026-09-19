import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0.001,
    y: 24,
    filter: 'blur(12px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.27, 0, 0.51, 1],
      staggerChildren: 0.08,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: 'blur(8px)',
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence 
      mode="wait" 
      onExitComplete={() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }}
    >
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ willChange: 'transform, filter, opacity', width: '100%' }}
        className="w-full flex-grow flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
