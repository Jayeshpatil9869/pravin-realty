import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROPERTIES, Property } from '../data/properties';
import { SectionEyebrow, CheckCircleIcon } from '../components/Icons';
import { GrandCtaBanner } from '../components/GrandCtaBanner';
import { AgentCallout } from '../components/AgentCallout';
import { PropertyModal } from '../components/PropertyModal';
import { ConsultModal } from '../components/ConsultModal';
import { MapPin, ArrowLeft, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';

interface PropertyDetailProps {
  onOpenConsultation?: () => void;
}

export function PropertyDetail({ onOpenConsultation }: PropertyDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  // Find property by slug, or fallback to the Birch Residence
  const property: Property = PROPERTIES.find((p) => p.slug === slug) || PROPERTIES[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Specific high-res 4-grid photos for interior showcase matching the screenshot
  const interiorGallery = [
    {
      title: 'Living Room',
      image: property.gallery[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    },
    {
      title: 'Master Bedroom',
      image: property.gallery[1] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    },
    {
      title: 'Kitchen & Dining',
      image: property.gallery[2] || 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
    },
    {
      title: 'Terrace & Bath',
      image: property.gallery[3] || 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  const highlights = [
    'Modern Layout',
    'Sustainable Materials',
    'Smart Connectivity',
    'Spacious Living Area'
  ];

  const neighborhoodTimes = [
    { name: 'Balewadi High Street Dining & Retail', time: '4 mins' },
    { name: 'Mumbai-Pune Expressway Entry', time: '8 mins' },
    { name: 'Hinjewadi IT Park Phase 1', time: '12 mins' },
    { name: 'Aditya Birla Hospital & Schools', time: '10 mins' },
  ];

  return (
    <div className="min-h-screen pt-28 md:pt-36 space-y-16 md:space-y-24">
      
      {/* 1. TOP HEADER BAR: TITLE, LOCATION, METRICS */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link 
            to="/properties" 
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-900 transition-colors font-normal"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Properties</span>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Eyebrow & Title */}
          <div className="space-y-3">
            <SectionEyebrow label="PRAVIN REALTY EXCLUSIVE" />

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#121316] tracking-[-0.02em] leading-tight">
              {property.title}
            </h1>

            <p className="flex items-center gap-1.5 text-neutral-500 text-sm md:text-base font-normal">
              <MapPin className="w-4 h-4 text-[#A15422]" />
              <span>{property.location}</span>
            </p>
          </div>

          {/* 4 Metric Cards Row (Price, Bedrooms, Bathrooms, Sq Ft) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-normal">Pricing</span>
              <span className="text-lg sm:text-2xl font-normal text-[#121316] mt-1 block">
                {property.formattedPrice}
              </span>
            </div>

            <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-normal">Configuration</span>
              <span className="text-lg sm:text-2xl font-normal text-[#121316] mt-1 block">
                {typeof property.beds === 'number' ? `${property.beds} BHK` : property.beds}
              </span>
            </div>

            <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-normal">Bathrooms</span>
              <span className="text-lg sm:text-2xl font-normal text-[#121316] mt-1 block">
                {property.baths}
              </span>
            </div>

            <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-normal">Carpet Area</span>
              <span className="text-lg sm:text-2xl font-normal text-[#121316] mt-1 block">
                {property.sqft}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN ARCHITECTURAL HERO IMAGE */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="relative aspect-[16/9] sm:aspect-[2.1/1] w-full rounded-3xl md:rounded-[36px] overflow-hidden shadow-sm border border-neutral-100 bg-neutral-100">
          <img 
            src={property.image} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-[#121316] text-xs font-normal px-4 py-1.5 rounded-full shadow-md">
            {property.category} • MahaRERA #{property.reraId || 'P52100049281'}
          </div>
        </div>
      </section>

      {/* 3. OVERVIEW & PROPERTY HIGHLIGHTS */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Overview Statement */}
        <div className="space-y-4 max-w-4xl">
          <SectionEyebrow label="PROPERTY OVERVIEW" />

          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-normal text-[#121316] tracking-[-0.015em] leading-[1.25]">
            A blend of architectural distinction, prime connectivity, and lasting investment value.
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal pt-2">
            {property.description}
          </p>
        </div>

        {/* Property Highlights Grid */}
        <div className="space-y-5 pt-4 border-t border-neutral-200/80">
          <h3 className="text-xl sm:text-2xl font-normal text-[#121316]">
            Key Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {highlights.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-neutral-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <CheckCircleIcon className="w-5 h-5 shrink-0" />
                <span className="text-sm font-normal text-[#121316]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Finishes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {property.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 font-normal">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A15422] shrink-0 mt-2" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

      </section>

      {/* 4. 4-PHOTO INTERIOR GALLERY */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {interiorGallery.map((item, idx) => (
            <div 
              key={idx} 
              className="group aspect-[16/10] rounded-3xl overflow-hidden shadow-sm border border-neutral-100 bg-neutral-100 relative"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-normal opacity-0 group-hover:opacity-100 transition-opacity">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NEIGHBORHOOD & MAP LOCATION */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Neighborhood Walk Times */}
        <div className="space-y-6 max-w-3xl">
          <h3 className="text-xl sm:text-2xl font-normal text-[#121316]">
            Neighborhood Connectivity
          </h3>

          <div className="space-y-4">
            {neighborhoodTimes.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between py-2.5 border-b border-dashed border-neutral-200 text-sm font-normal"
              >
                <span className="text-neutral-800">{item.name}</span>
                <span className="text-neutral-500 font-medium">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Location Card */}
        <div className="space-y-5">
          <h3 className="text-xl sm:text-2xl font-normal text-[#121316]">
            Location & Vicinity
          </h3>

          <div className="relative aspect-[21/9] sm:aspect-[2.6/1] w-full rounded-3xl overflow-hidden border border-neutral-200 shadow-sm bg-[#E9EBEF] flex items-center justify-center p-6 text-center">
            {/* Map Graphical Visual */}
            <div className="absolute inset-0 opacity-80 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Map Roads & Geography stylized overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-40 text-neutral-400 stroke-current" fill="none">
              <path d="M 0 100 Q 250 80 500 120 T 1000 80 T 1600 120" strokeWidth="6" />
              <path d="M 200 0 Q 240 200 300 400" strokeWidth="4" />
              <path d="M 600 0 Q 550 200 650 400" strokeWidth="4" />
              <path d="M 900 0 Q 950 200 900 400" strokeWidth="4" />
            </svg>

            {/* Map Center Pin and Landmarks */}
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-neutral-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9A3412] animate-ping" />
                <span className="font-normal text-sm sm:text-base text-[#121316]">
                  {property.title} • {property.neighborhood}, Pune
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-500 font-normal">
                <span className="bg-white/80 px-3 py-1 rounded-full border border-neutral-200/60">Balewadi High Street (4 mins)</span>
                <span className="bg-white/80 px-3 py-1 rounded-full border border-neutral-200/60">Mumbai-Pune Expressway (8 mins)</span>
                <span className="bg-white/80 px-3 py-1 rounded-full border border-neutral-200/60">Hinjewadi IT Park (12 mins)</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 6. INTERESTED IN THIS PROPERTY? AGENT INQUIRY BOX */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl md:rounded-[36px] p-6 sm:p-10 border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-6 text-left">
          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl sm:text-3xl font-normal text-[#121316]">
              Interested in this property?
            </h3>
            <p className="text-neutral-500 text-xs sm:text-sm font-normal">
              For price breakdowns, video walkthroughs, or to schedule a private site visit, connect with our advisor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
            
            {/* Agent Profile & Contact */}
            <div className="md:col-span-8 flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm shrink-0">
                <img 
                  src={property.agent.avatar} 
                  alt={property.agent.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-normal text-[#121316]">
                  {property.agent.name}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                  {property.agent.role}
                </p>
                <p className="text-xs text-neutral-400 font-normal mt-1">
                  {property.agent.phone} • {property.agent.email}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
              <button
                onClick={() => setIsTourModalOpen(true)}
                className="w-full bg-[#121316] hover:bg-[#252830] text-white font-normal text-xs sm:text-sm py-3 px-6 rounded-full transition-all shadow-sm active:scale-95 cursor-pointer text-center"
              >
                Schedule Site Visit
              </button>

              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-normal text-xs sm:text-sm py-3 px-6 rounded-full transition-all active:scale-95 cursor-pointer text-center"
              >
                Request Callback
              </button>
            </div>

          </div>

          {/* Certified Guarantee */}
          <div className="pt-4 border-t border-neutral-100 flex items-center gap-2.5 text-xs text-neutral-500 font-normal">
            <ShieldCheck className="w-4 h-4 text-[#A15422] shrink-0" />
            <span>Pravin Realty Certified Advisory. 100% direct developer mandate with title verification.</span>
          </div>
        </div>
      </section>

      {/* 7. GRAND CTA BANNER */}
      <GrandCtaBanner />

      {/* 8. AGENT CALLOUT */}
      <AgentCallout onOpenConsultation={onOpenConsultation} />

      {/* Modals */}
      <PropertyModal 
        property={isTourModalOpen ? property : null} 
        onClose={() => setIsTourModalOpen(false)} 
      />

      <ConsultModal 
        isOpen={isConsultModalOpen} 
        onClose={() => setIsConsultModalOpen(false)} 
      />

    </div>
  );
}
