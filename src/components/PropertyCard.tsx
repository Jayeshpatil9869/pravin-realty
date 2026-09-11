import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../data/properties';
import { Bed, Bath, Maximize } from 'lucide-react';

export interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
  key?: React.Key;
}

export function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      // Optional modal trigger if requested
    }
  };

  return (
    <Link 
      to={`/properties/${property.slug}`}
      onClick={handleClick}
      className="group bg-white rounded-3xl p-3 sm:p-3.5 border border-[#ECECEE] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer flex flex-col block text-left"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100">
        <img 
          src={property.image} 
          alt={property.title} 
          loading="lazy"
          className="w-full h-full object-cover img-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Feature Badges Overlay */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex flex-wrap gap-1 sm:gap-1.5 z-10">
          <span className="bg-white/95 backdrop-blur-md text-[#1E2024] text-[10px] sm:text-xs font-normal px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm flex items-center gap-1">
            <Bed className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400" />
            <span>{property.beds} beds</span>
          </span>
          <span className="bg-white/95 backdrop-blur-md text-[#1E2024] text-[10px] sm:text-xs font-normal px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm flex items-center gap-1">
            <Bath className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400" />
            <span>{property.baths} baths</span>
          </span>
          <span className="bg-white/95 backdrop-blur-md text-[#1E2024] text-[10px] sm:text-xs font-normal px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm flex items-center gap-1">
            <Maximize className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400" />
            <span>{property.sqft}</span>
          </span>
        </div>
      </div>

      {/* Info Content & Price Badge */}
      <div className="pt-3.5 sm:pt-4 pb-1 sm:pb-2 px-1 sm:px-2 flex items-center justify-between gap-2.5 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base md:text-lg font-normal text-[#121316] group-hover:text-[#A15422] transition-colors leading-snug truncate">
            {property.title}
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#717682] font-normal mt-0.5 truncate">
            {property.location}
          </p>
        </div>

        {/* Peach Price Badge */}
        <div className="shrink-0 bg-[#FDE8D7] text-[#9A3412] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-normal text-xs sm:text-sm shadow-sm whitespace-nowrap">
          {property.formattedPrice}
        </div>
      </div>
    </Link>
  );
}
