import { useEffect, useState } from 'react';

interface PageRevealAnimationProps {
  onComplete: () => void;
}

export function PageRevealAnimation({ onComplete }: PageRevealAnimationProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Fast, responsive reveal (1000ms)
    const loadingAnimationTime = 1000;

    // Immediately start smooth fade-out to reveal the main website
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, loadingAnimationTime);

    // Complete and unmount cleanly right after exit
    const finishTimer = setTimeout(() => {
      onComplete();
    }, loadingAnimationTime + 280);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[999999] select-none overflow-hidden bg-white transition-all duration-300 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Curtain with expanding progress bar */}
      <div className="curtain intro-flex">
        <div className="progressBar progressGrow-animation" />
      </div>
    </div>
  );
}