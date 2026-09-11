import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckCircleIcon, SectionEyebrow } from '../components/Icons';
import { PROPERTIES, Property } from '../data/properties';
import { TESTIMONIALS } from '../data/testimonials';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyModal } from '../components/PropertyModal';
import { GrandCtaBanner } from '../components/GrandCtaBanner';
import { AgentCallout } from '../components/AgentCallout';
import { Star, ArrowRight } from 'lucide-react';

interface HomeProps {
  onOpenConsultation?: () => void;
}

export function Home({ onOpenConsultation }: HomeProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);

  const featuredProperties = PROPERTIES.slice(0, 2);

  const trustFeatures = [
    'West Pune Property Experts',
    'MahaRERA Verified Projects',
    'Transparent Deals & Legal Clearance',
    'End-to-End Home Loan & Documentation'
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consult & Discover',
      description: 'Discuss your budget and lifestyle preferences with our West Pune property consultants.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      step: '02',
      title: 'Private Site Visits & Due Diligence',
      description: 'Experience verified properties in Baner, Balewadi & Koregaon Park with full RERA and title checks.',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
    },
    {
      step: '03',
      title: 'Seamless Closing & Handover',
      description: 'Transparent price negotiation, smooth bank loan sanctions, and handing over the keys to your property.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen space-y-16 md:space-y-24">
      
      {/* 1. HERO SECTION - FULL WINDOW WITH BOTTOM-ONLY GRADIENT */}
      <section className="relative w-full h-screen min-h-[680px] flex items-end pb-16 sm:pb-20 md:pb-24 lg:pb-28 px-6 md:px-12 lg:px-16 overflow-hidden">
        {/* Full Window Background Image - Top is bright and natural */}
        <img 
          src="/hero-villa.png" 
          alt="Pravin Realty Luxury Properties Pune" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-100"
        />

        {/* Black gradient ONLY at the bottom, extending up smoothly to cover the text area */}
        <div className="absolute inset-x-0 bottom-0 h-[70%] md:h-[62%] bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

        {/* Hero Content Row: Left text/CTA and Right [SCROLL] indicator */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-2">
          
          {/* Left: Title, Subtitle, and Button - positioned precisely in the highlighted area */}
          <div className="max-w-2xl text-white space-y-4 md:space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-normal tracking-[-0.02em] leading-[1.08] text-white">
              Find the Right Property.<br />Make the Right Move.
            </h1>

            <p className="text-neutral-200 text-sm sm:text-base font-normal max-w-lg leading-relaxed">
              Your trusted partner for residential, commercial & luxury properties in Baner, Balewadi & West Pune.
            </p>

            <div className="pt-2 sm:pt-3 flex flex-wrap gap-3">
              <Link 
                to="/properties" 
                className="group bg-white text-[#121316] hover:bg-neutral-100 font-normal text-xs md:text-sm py-2.5 px-5 md:px-6 rounded-full inline-flex items-center gap-3 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Explore Properties</span>
                <div className="w-6 h-6 rounded-full bg-[#121316] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRightIcon className="w-3 h-3" />
                </div>
              </Link>

              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="bg-white/15 backdrop-blur-md hover:bg-white/25 text-white border border-white/30 font-normal text-xs md:text-sm py-2.5 px-5 rounded-full transition-all duration-300"
                >
                  Request Callback
                </button>
              )}
            </div>
          </div>

          {/* Right: [SCROLL] indicator */}
          <div className="hidden md:flex items-center pb-3">
            <span className="text-xs font-normal tracking-widest text-neutral-400 select-none">
              [SCROLL]
            </span>
          </div>

        </div>
      </section>

      {/* 2. STATS & WHO WE ARE SECTION */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Preview Card */}
          <div className="lg:col-span-4">
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-neutral-100 aspect-[4/3] group">
              <img 
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80" 
                alt="Pravin Realty Advisory Team" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-normal uppercase tracking-wider text-[#FDE8D7]">Balewadi Headquarters</p>
                <p className="text-sm font-normal">Nandan Probiz, 10th Floor, West Pune</p>
              </div>
            </div>
          </div>

          {/* Right: Statement & Numbers */}
          <div className="lg:col-span-8 space-y-6">
            <SectionEyebrow label="ABOUT PRAVIN REALTY" />

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#121316] tracking-[-0.015em] leading-[1.3]">
              Welcome to Pravin Realty — your trusted partner in Pune’s dynamic real estate landscape.
            </h2>

            <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-normal">
              Headquartered in Balewadi, Pune, Pravin Realty specializes in the flourishing markets of West Pune and the wider Pune region, helping clients with residential, commercial, land, and luxury properties. We combine deep local market intelligence with straightforward, client-first advisory.
            </p>

            {/* Numbers Row */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-200/80">
              <div>
                <span className="text-3xl md:text-4xl font-normal text-[#121316] tracking-tight block">12+</span>
                <span className="text-xs text-neutral-500 font-normal mt-1 block">Years in West Pune</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-normal text-[#121316] tracking-tight block">500+</span>
                <span className="text-xs text-neutral-500 font-normal mt-1 block">Properties Closed</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-normal text-[#121316] tracking-tight block">98%</span>
                <span className="text-xs text-neutral-500 font-normal mt-1 block">Client Satisfaction</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURED PROPERTIES GRID ("Handpicked Homes for Refined Living") */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="mb-2">
                <SectionEyebrow label="FEATURED PUNE LISTINGS" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#121316] tracking-[-0.015em]">
                Handpicked Properties for Refined Living & Business
              </h2>
              <p className="text-neutral-500 text-sm font-normal mt-1 max-w-lg">
                Explore our select residential villas, luxury apartments, and commercial corporate suites across Baner, Balewadi, and Koregaon Park.
              </p>
            </div>

            <Link 
              to="/properties" 
              className="group inline-flex items-center gap-2 bg-[#121316] hover:bg-[#252830] text-white text-xs font-normal px-5 py-2.5 rounded-full transition-all shadow-sm shrink-0"
            >
              <span>Explore All Properties</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Featured Property Cards with Simple Image Zoom on Hover */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id}
                property={property} 
                onSelect={(p) => setSelectedProperty(p)} 
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. TRUST & VALUE PROPOSITION ("Because The Right Home Begins with Trust") */}
      <section className="px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto bg-[#FAF9F6] rounded-3xl md:rounded-[36px] p-6 md:p-14 border border-neutral-200/70 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Text & Checkpoints */}
          <div className="lg:col-span-6 space-y-6">
            <SectionEyebrow label="WHY CHOOSE PRAVIN REALTY" />

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#121316] tracking-[-0.015em] leading-tight">
              From Boardroom to Bedrooms — We Handle It All
            </h2>

            <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-normal">
              Whether you’re looking to buy, sell, rent, or invest, our team provides personalized guidance based on your property requirements and investment goals with 100% MahaRERA transparency.
            </p>

            {/* Checklist */}
            <div className="space-y-3.5 pt-2">
              {trustFeatures.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 shrink-0" />
                  <span className="text-sm md:text-[15px] font-normal text-[#121316]">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link 
                to="/about"
                className="group bg-[#121316] hover:bg-[#252830] text-white font-normal text-xs sm:text-sm py-2.5 px-6 rounded-full inline-flex items-center gap-2 shadow-sm transition-all duration-200 active:scale-95"
              >
                <span>About Us</span>
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRightIcon className="w-3 h-3" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right: Advisor & Clients Photo */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/4.5] rounded-3xl overflow-hidden shadow-xl border border-neutral-100 group">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=85" 
                alt="Casavera Trusted Real Estate Consultation" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <p className="text-xs font-normal uppercase tracking-wider text-[#FDE8D7]">Client-First Commitment</p>
                <p className="text-sm font-normal">Trusted Guidance. Better Property Decisions.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PROCESS SECTION ("A Seamless Path to Your New Home") */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <SectionEyebrow label="OUR PROCESS" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#121316] tracking-[-0.015em]">
              A Seamless Path to Your New Property
            </h2>
            <p className="text-neutral-500 text-sm font-normal">
              How we guide you from initial consultation to keys and registration.
            </p>
          </div>

          {/* 3 Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3.5">
                  {/* Step Number Badge */}
                  <span className="inline-block bg-[#FDE8D7] text-[#9A3412] font-normal text-xs px-3 py-1 rounded-full">
                    {step.step}
                  </span>

                  <h3 className="text-base sm:text-lg font-normal text-[#121316]">{step.title}</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover img-zoom" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION ("Trusted by Homeowners Who Value Quality & Care") */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-2">
            <SectionEyebrow label="CLIENT STORIES" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#121316] tracking-[-0.015em]">
              Trusted by Homeowners & Businesses Across Pune
            </h2>
            <p className="text-neutral-500 text-sm font-normal max-w-xl">
              Real experiences from clients who bought, leased, or invested through Pravin Realty.
            </p>
          </div>

          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id} 
                className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-6"
              >
                {/* Stars */}
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#A15422]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {t.quote}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <img 
                    src={t.avatar} 
                    alt={t.author} 
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                  />
                  <div>
                    <h4 className="font-normal text-xs sm:text-sm text-[#121316]">{t.author}</h4>
                    <p className="text-[11px] text-neutral-400 font-normal">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. GRAND VILLA CTA BANNER */}
      <GrandCtaBanner />

      {/* 8. AGENT CALLOUT SECTION */}
      <AgentCallout onOpenConsultation={onOpenConsultation} />

      {/* Property Details Modal */}
      <PropertyModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />

    </div>
  );
}
