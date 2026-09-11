import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image scale down animation on load
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 2, ease: 'power3.out' }
      );

      // Text stagger reveal
      gsap.fromTo(
        textRef.current?.children || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
      );

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          ref={imageRef}
          className="w-full h-[120%] -top-[10%] relative bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 mt-20 text-center text-white">
        <div ref={textRef} className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-sm md:text-base tracking-[0.2em] uppercase mb-6 block font-medium">
            Curated Living Spaces
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8">
            Elevating the Art <br className="hidden md:block" /> of Real Estate
          </h1>
          <Link to="/properties" className="bg-white text-black px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300">
            Explore Portfolio
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white flex flex-col items-center animate-bounce">
        <span className="text-xs uppercase tracking-widest mb-2 opacity-70">Scroll</span>
        <ArrowDown className="w-4 h-4 opacity-70" />
      </div>
    </section>
  );
}
