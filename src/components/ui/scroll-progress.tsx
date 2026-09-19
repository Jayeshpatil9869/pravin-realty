import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, willChange: 'transform', transform: 'translateZ(0)' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#121316] via-[#C86D2F] to-[#FDE8D7] origin-left z-[60] pointer-events-none"
    />
  );
}

