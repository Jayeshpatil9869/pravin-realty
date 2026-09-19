import React, { ElementType, ReactNode } from 'react';
import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade'
  | 'blur-up'
  | 'scale-up';

export interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children?: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  className?: string;
  as?: ElementType;
}

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.55,
  distance = 24,
  once = true,
  amount = 0.1,
  className = '',
  as = 'div',
  ...props
}: ScrollRevealProps) {
  const getInitial = () => {
    switch (variant) {
      case 'fade-up':
        return { opacity: 0, y: distance };
      case 'fade-down':
        return { opacity: 0, y: -distance };
      case 'fade-left':
        return { opacity: 0, x: distance };
      case 'fade-right':
        return { opacity: 0, x: -distance };
      case 'blur-up':
        return { opacity: 0, y: distance * 0.75 };
      case 'scale-up':
        return { opacity: 0, scale: 0.96 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (variant) {
      case 'blur-up':
        return { opacity: 1, y: 0 };
      case 'scale-up':
        return { opacity: 1, scale: 1 };
      case 'fade-left':
      case 'fade-right':
        return { opacity: 1, x: 0 };
      case 'fade-up':
      case 'fade-down':
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const MotionTag = (motion as unknown as Record<string, React.ElementType>)[typeof as === 'string' ? as : 'div'] || motion.div;

  return (
    <MotionTag
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: 'opacity, transform' }}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------- */
/*                        STAGGER CONTAINER & CHILDREN                         */
/* -------------------------------------------------------------------------- */

export interface ScrollStaggerGroupProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  className?: string;
  as?: ElementType;
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delayChildren,
    },
  }),
};

export function ScrollStaggerGroup({
  children,
  staggerDelay = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.08,
  className = '',
  as = 'div',
  ...props
}: ScrollStaggerGroupProps) {
  const MotionTag = (motion as unknown as Record<string, React.ElementType>)[typeof as === 'string' ? as : 'div'] || motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerContainerVariants}
      custom={{ staggerDelay, delayChildren }}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export interface ScrollStaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variant?: RevealVariant;
  distance?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
}

export function ScrollStaggerItem({
  children,
  variant = 'fade-up',
  distance = 20,
  duration = 0.5,
  className = '',
  as = 'div',
  ...props
}: ScrollStaggerItemProps) {
  const getItemVariants = (): Variants => {
    switch (variant) {
      case 'blur-up':
        return {
          hidden: { opacity: 0, y: distance * 0.75 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] },
          },
        };
      case 'scale-up':
        return {
          hidden: { opacity: 0, scale: 0.96 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration, ease: [0.16, 1, 0.3, 1] },
          },
        };
      case 'fade-left':
        return {
          hidden: { opacity: 0, x: distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] },
          },
        };
      case 'fade-right':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] },
          },
        };
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, ease: [0.16, 1, 0.3, 1] },
          },
        };
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] },
          },
        };
    }
  };

  const MotionTag = (motion as unknown as Record<string, React.ElementType>)[typeof as === 'string' ? as : 'div'] || motion.div;

  return (
    <MotionTag
      variants={getItemVariants()}
      style={{ willChange: 'opacity, transform' }}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

