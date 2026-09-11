import React from 'react';

interface PravinLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  showText?: boolean;
  textSize?: string;
}

export function PravinLogo({
  className = "w-8 h-8",
  variant = 'dark',
  showText = true,
  textSize = "text-[17px]"
}: PravinLogoProps) {
  const isDark = variant === 'dark';

  return (
    <div className="inline-flex items-center gap-2.5 select-none group">
      {/* House PR Emblem */}
      <div className={`relative shrink-0 rounded-lg flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105 ${
        isDark ? 'bg-[#121316] text-white' : 'bg-white text-[#121316]'
      } ${className}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* Chimney */}
          <path d="M 28 32 L 28 18 L 38 18 L 38 25" strokeWidth="6" />
          
          {/* House Outer Outline */}
          <path d="M 12 45 L 50 14 L 88 45 L 88 88 L 12 88 Z" strokeWidth="7" />
          
          {/* Inside "P" */}
          <path d="M 28 48 L 50 48 C 56 48 56 62 50 62 L 28 62 L 28 88" strokeWidth="7" />
          
          {/* Inside "R" */}
          <path d="M 54 48 L 74 48 C 80 48 80 62 74 62 L 54 62 L 54 88 M 66 62 L 80 88" strokeWidth="7" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-normal tracking-tight ${textSize} ${
            isDark ? 'text-[#121316]' : 'text-white'
          }`}>
            Pravin Realty
          </span>
          <span className={`text-[9px] uppercase tracking-[0.2em] font-normal mt-0.5 ${
            isDark ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            Pune Real Estate
          </span>
        </div>
      )}
    </div>
  );
}
