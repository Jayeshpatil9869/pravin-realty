import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Parallax
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal
      gsap.fromTo(
        textRef.current?.children || [],
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-muted text-foreground overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden w-full max-w-md mx-auto lg:max-w-none">
            <div 
              ref={imageRef}
              className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2053&auto=format&fit=crop)' }}
            />
          </div>

          <div ref={textRef} className="order-1 lg:order-2 flex flex-col justify-center">
            <span className="text-sm tracking-widest uppercase text-muted-foreground mb-6 block font-medium">
              Our Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8">
              Beyond the <br /> <span className="italic">Transaction</span>
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8 max-w-xl">
              We believe that a home is more than an address—it is the backdrop to your life's most meaningful moments. Our approach transcends traditional real estate, focusing on architectural integrity, design nuance, and the subtle art of matching individuals with spaces that resonate with their personal narrative.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-12 max-w-xl">
              Every property in our portfolio represents the pinnacle of modern living, curated for those who appreciate the extraordinary.
            </p>
            
            <Link to="/about" className="inline-block uppercase tracking-widest text-sm font-medium border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors w-max">
              Read Our Story
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
