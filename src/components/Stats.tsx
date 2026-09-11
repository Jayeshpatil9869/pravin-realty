import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const STATS = [
  { value: '$2B+', label: 'In Global Sales' },
  { value: '150+', label: 'Exclusive Properties' },
  { value: '45', label: 'Global Destinations' },
  { value: '12', label: 'Years of Excellence' },
];

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center divide-x divide-background/10">
          {STATS.map((stat, index) => (
            <div 
              key={index} 
              ref={el => itemsRef.current[index] = el}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif mb-2 text-accent">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-background/70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
