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
      className="group bg-white rounded-3xl p-3 md:p-3.5 border border-[#ECECEE] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer flex flex-col block text-left"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100">
        <img 
          src={property.image} 
          alt={property.title} 
          loading="lazy"
          className="w-full h-full object-cover img-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Feature Badges Overlay */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-white/95 backdrop-blur-md text-[#1E2024] text-xs font-normal px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Bed className="w-3 h-3 text-neutral-400" />
            {property.beds} beds
          </span>
          <span className="bg-white/95 backdrop-blur-md text-[#1E2024] text-xs font-normal px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Bath className="w-3 h-3 text-neutral-400" />
            {property.baths} baths
          </span>
          <span className="bg-white/95 backdrop-blur-md text-[#1E2024] text-xs font-normal px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Maximize className="w-3 h-3 text-neutral-400" />
            {property.sqft}
          </span>
        </div>
      </div>

      {/* Info Content & Price Badge */}
      <div className="pt-4 pb-2 px-2 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base md:text-lg font-normal text-[#121316] group-hover:text-[#A15422] transition-colors leading-snug">
            {property.title}
          </h3>
          <p className="text-xs md:text-sm text-[#717682] font-normal mt-0.5">
            {property.location}
          </p>
        </div>

        {/* Peach Price Badge */}
        <div className="shrink-0 bg-[#FDE8D7] text-[#9A3412] px-3.5 py-1.5 rounded-full font-normal text-xs md:text-sm shadow-sm">
          {property.formattedPrice}
        </div>
      </div>
    </Link>
  );
}
