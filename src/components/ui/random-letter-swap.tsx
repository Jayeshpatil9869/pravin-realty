"use client";

import React, { useState } from "react";
import { motion, Transition } from "motion/react";

interface RandomLetterSwapProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: Transition;
  reverse?: boolean;
  key?: React.Key;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function RandomLetterSwap({
  label,
  className = "",
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: "spring" },
}: RandomLetterSwapProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`inline-flex items-center overflow-hidden relative select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="inline-flex">
        {label.split("").map((letter, index) => (
          <span key={index} className="relative inline-block overflow-hidden">
            {/* Primary letter moving up/down */}
            <motion.span
              className="inline-block"
              initial={{ y: "0%" }}
              animate={{ y: isHovered ? "-100%" : "0%" }}
              transition={{
                ...transition,
                delay: index * staggerDuration,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>

            {/* Secondary swapped letter sliding in */}
            <motion.span
              className="inline-block absolute left-0 top-0"
              initial={{ y: "100%" }}
              animate={{ y: isHovered ? "0%" : "100%" }}
              transition={{
                ...transition,
                delay: index * staggerDuration,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}
