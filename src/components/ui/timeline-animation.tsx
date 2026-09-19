'use client'

import React, { ElementType } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TimelineContentProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  [key: string]: unknown;
}

export function TimelineContent({
  as: Component = 'div',
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  children,
  ...props
}: TimelineContentProps) {
  const localRef = React.useRef<HTMLElement>(null);
  const targetRef = timelineRef || localRef;
  const isInView = useInView(targetRef, { once: true, amount: 0.1 });

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: (i || 0) * 0.12,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const variants = customVariants || defaultVariants;
  const MotionComponent = (motion as unknown as Record<string, React.ElementType>)[typeof Component === 'string' ? Component : 'div'] || motion.div;

  return (
    <MotionComponent
      ref={localRef as unknown as React.Ref<never>}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
