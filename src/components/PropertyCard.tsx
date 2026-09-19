import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../data/properties';
import { Bed, Bath, Maximize, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
  key?: React.Key;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt motion values - zero React re-renders!
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 22, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 22, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3.5deg', '-3.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3.5deg', '3.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className="perspective-1000 w-full"
    >
      <Link
        to={`/properties/${property.slug}`}
        className="group relative bg-white rounded-3xl p-3 sm:p-3.5 border border-[#ECECEE] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer flex flex-col block text-left overflow-hidden"
      >
        {/* Subtle Ambient Hover Glow using pure CSS */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />

        {/* Image Container with Badges */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100">
          <img
            src={property.image}
            alt={property.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* Feature Badges Overlay */}
          <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex flex-wrap items-center justify-between gap-1 sm:gap-1.5 z-10 pointer-events-none">
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              <span className="bg-white/95 backdrop-blur-md text-[#1E2024] text-[10px] sm:text-xs font-normal px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm flex items-center gap-1 transition-transform duration-200 group-hover:translate-y-[-1px]">
                <Bed className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400" />
                <span>{property.beds} beds</span>
              </span>
              <span className="bg-white/95 backdrop-blur-md text-[#1E2024] text-[10px] sm:text-xs font-normal px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm flex items-center gap-1 transition-transform duration-200 group-hover:translate-y-[-1px]">
                <Bath className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400" />
                <span>{property.baths} baths</span>
              </span>
              <span className="bg-white/95 backdrop-blur-md text-[#1E2024] text-[10px] sm:text-xs font-normal px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm flex items-center gap-1 transition-transform duration-200 group-hover:translate-y-[-1px]">
                <Maximize className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400" />
                <span>{property.sqft}</span>
              </span>
            </div>

            {/* Micro Discover Arrow Pill */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 backdrop-blur-md text-[#121316] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-105 shadow-sm">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>
        </div>

        {/* Info Content & Price Badge */}
        <div className="pt-3.5 sm:pt-4 pb-1 sm:pb-2 px-1 sm:px-2 flex items-center justify-between gap-2.5 sm:gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base md:text-lg font-normal text-[#121316] group-hover:text-[#A15422] transition-colors duration-200 leading-snug truncate">
              {property.title}
            </h3>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#717682] font-normal mt-0.5 truncate">
              {property.location}
            </p>
          </div>

          {/* Peach Price Badge */}
          <div className="shrink-0 bg-[#FDE8D7] text-[#9A3412] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-normal text-xs sm:text-sm shadow-sm whitespace-nowrap transition-all duration-200 group-hover:bg-[#F7D0B2] group-hover:scale-105">
            {property.formattedPrice}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


