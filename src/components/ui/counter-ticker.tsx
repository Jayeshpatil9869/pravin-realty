import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // seconds
  className?: string;
}

export function CounterTicker({
  value,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className = '',
}: CounterTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const interval = requestAnimationFrame(function tick() {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(start + (end - start) * easeOutExpo(progress));

      if (frame <= totalFrames) {
        setDisplayValue(current);
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(end);
      }
    });

    return () => cancelAnimationFrame(interval);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
