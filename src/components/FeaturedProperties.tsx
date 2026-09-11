import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { PropertyCard } from './PropertyCard';
import { PROPERTIES } from '../data/properties';

export function FeaturedProperties() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      });

      // Cards stagger reveal
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="max-w-2xl">
            <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              Exclusive <br />
              <span className="text-muted-foreground italic">Listings</span>
            </h2>
          </div>
          <Link to="/properties" className="hidden md:block uppercase tracking-widest text-sm font-medium border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors mt-8 md:mt-0 w-max">
            View All Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24">
          {PROPERTIES.slice(0, 4).map((property, index) => (
            <Link 
              key={property.id} 
              to={`/properties/${property.slug}`}
              ref={el => { cardsRef.current[index] = el; }}
              className={index % 2 !== 0 ? 'md:mt-24 block' : 'block'}
            >
              <PropertyCard property={property} />
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center md:hidden">
          <Link to="/properties" className="inline-block uppercase tracking-widest text-sm font-medium border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors w-full">
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
