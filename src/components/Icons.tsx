import React from 'react';

export function SectionEyebrow({ 
  label, 
  light = false,
  className = "" 
}: { 
  label: string; 
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2 text-[11.5px] font-normal tracking-[0.2em] uppercase select-none ${
      light ? 'text-white' : 'text-[#121316]'
    } ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${light ? 'bg-white' : 'bg-[#121316]'}`} />
      <span>{label}</span>
    </div>
  );
}

export function SparkleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div className={`rounded-full bg-[#FDE8D7] text-[#9A3412] flex items-center justify-center p-1 ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}
