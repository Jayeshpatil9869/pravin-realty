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
import { ScrollReveal, ScrollStaggerGroup, ScrollStaggerItem } from '../components/ui/scroll-reveal';
import { Magnetic } from '../components/ui/magnetic-button';
import { CounterTicker } from '../components/ui/counter-ticker';

import { motion, Variants } from 'framer-motion';

interface HomeProps {
  onOpenConsultation?: () => void;
  isRevealFinished?: boolean;
}

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0,
    },
  },
};

const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
};

const heroSubtitleVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
};

const heroButtonVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
};

const heroScrollVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      delay: 0.05,
      ease: 'easeOut',
    },
  },
};

const heroBgVariants: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export function Home({ onOpenConsultation, isRevealFinished = true }: HomeProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

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
    <div className="min-h-screen space-y-12 sm:space-y-16 md:space-y-24 overflow-x-hidden">
      
      {/* 1. HERO SECTION - POSITIONED IN UPPER-MID LEFT CORRESPONDING TO SUNSET SKY */}
      <section className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-start pt-20 sm:pt-24 md:pt-28 pb-8 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
        {/* Full Window Background Image */}
        <motion.img 
          src="/hero-villa.png" 
          alt="Pravin Realty Luxury Properties Pune" 
          initial="hidden"
          animate={isRevealFinished ? "visible" : "hidden"}
          variants={heroBgVariants}
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 origin-center"
        />

        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[50%] sm:h-[55%] md:h-[60%] bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

        {/* Hero Content: Positioned cleanly in the left quadrant above the cantilever pool slab */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
          
          {/* Title, Subtitle, and Buttons */}
          <motion.div 
            initial="hidden"
            animate={isRevealFinished ? "visible" : "hidden"}
            variants={heroContainerVariants}
            className="max-w-xl lg:max-w-[540px] text-white space-y-4 sm:space-y-5 flex flex-col items-start text-left"
          >
            <motion.h1 
              variants={heroTitleVariants}
              className="text-[clamp(34px,5.2vw,54px)] lg:text-[56px] font-normal tracking-[-0.03em] leading-[1.08] text-white [text-shadow:_0_2px_12px_rgba(0,0,0,0.5)] text-left"
            >
              Find the Right Property. <br className="hidden sm:inline" />Make the Right Move.
            </motion.h1>

            <motion.p 
              variants={heroSubtitleVariants}
              className="text-neutral-100 text-[15px] sm:text-base font-normal max-w-md lg:max-w-lg leading-relaxed text-left [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]"
            >
              Your trusted partner for residential, commercial & luxury properties in Baner, Balewadi & West Pune.
            </motion.p>

            <motion.div 
              variants={heroButtonVariants}
              className="pt-2 sm:pt-3 flex flex-row items-center justify-start gap-2.5 sm:gap-3.5 w-auto flex-nowrap"
            >
              <Magnetic strength={0.2}>
                <Link 
                  to="/properties" 
                  className="group bg-white text-[#121316] hover:bg-neutral-100 font-normal text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 rounded-full inline-flex items-center justify-center gap-2 sm:gap-2.5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-center whitespace-nowrap"
                >
                  <span>Explore Properties</span>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#121316] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
                    <ArrowRightIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                </Link>
              </Magnetic>

              {onOpenConsultation && (
                <Magnetic strength={0.2}>
                  <button
                    onClick={onOpenConsultation}
                    className="bg-black/30 hover:bg-black/45 text-white border border-white/35 backdrop-blur-md font-normal text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-5 rounded-full transition-all duration-300 text-center cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    Request Callback
                  </button>
                </Magnetic>
              )}
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Right: [SCROLL] indicator */}
        <motion.div 
          initial="hidden"
          animate={isRevealFinished ? "visible" : "hidden"}
          variants={heroScrollVariants}
          className="hidden md:flex items-center absolute bottom-8 right-12 z-10"
        >
          <span className="text-xs font-normal tracking-widest text-neutral-400/80 select-none animate-pulse">
            [SCROLL]
          </span>
        </motion.div>
      </section>

      {/* 2. STATS & WHO WE ARE SECTION */}
      <section className="px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          
          {/* Left: Preview Card */}
          <ScrollReveal variant="fade-right" duration={0.7} className="lg:col-span-4">
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-neutral-100 aspect-[4/3] group">
              <img 
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80" 
                alt="Pravin Realty Advisory Team" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 right-3.5 sm:right-4 text-white text-left">
                <p className="text-[10px] sm:text-xs font-normal uppercase tracking-wider text-[#FDE8D7]">Balewadi Headquarters</p>
                <p className="text-xs sm:text-sm font-normal">Nandan Probiz, 10th Floor, West Pune</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Statement & Numbers */}
          <ScrollReveal variant="fade-left" duration={0.7} className="lg:col-span-8 space-y-4 sm:space-y-6 text-left">
            <SectionEyebrow label="ABOUT PRAVIN REALTY" />

            <h2 className="text-xl sm:text-3xl lg:text-[34px] font-normal text-[#121316] tracking-[-0.015em] leading-[1.3]">
              Welcome to Pravin Realty — your trusted partner in Pune’s dynamic real estate landscape.
            </h2>

            <p className="text-neutral-500 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              Headquartered in Balewadi, Pune, Pravin Realty specializes in the flourishing markets of West Pune and the wider Pune region, helping clients with residential, commercial, land, and luxury properties. We combine deep local market intelligence with straightforward, client-first advisory.
            </p>

            {/* Numbers Row with Smooth Roll-Up CounterTicker */}
            <ScrollStaggerGroup staggerDelay={0.12} className="grid grid-cols-3 gap-2 sm:gap-6 pt-3 sm:pt-4 border-t border-neutral-200/80">
              <ScrollStaggerItem variant="blur-up">
                <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#121316] tracking-tight block">
                  <CounterTicker value={12} suffix="+" />
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 font-normal mt-0.5 sm:mt-1 block">Years in Pune</span>
              </ScrollStaggerItem>
              <ScrollStaggerItem variant="blur-up">
                <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#121316] tracking-tight block">
                  <CounterTicker value={500} suffix="+" />
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 font-normal mt-0.5 sm:mt-1 block">Properties Closed</span>
              </ScrollStaggerItem>
              <ScrollStaggerItem variant="blur-up">
                <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#121316] tracking-tight block">
                  <CounterTicker value={98} suffix="%" />
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 font-normal mt-0.5 sm:mt-1 block">Client Satisfaction</span>
              </ScrollStaggerItem>
            </ScrollStaggerGroup>
          </ScrollReveal>

        </div>
      </section>

      {/* 3. FEATURED PROPERTIES GRID ("Handpicked Homes for Refined Living") */}
      <section className="px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 text-left">
          
          {/* Header Row */}
          <ScrollReveal variant="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="mb-2">
                <SectionEyebrow label="FEATURED PUNE LISTINGS" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#121316] tracking-[-0.015em]">
                Handpicked Properties for Refined Living & Business
              </h2>
              <p className="text-neutral-500 text-xs sm:text-sm font-normal mt-1 max-w-lg">
                Explore our select residential villas, luxury apartments, and commercial corporate suites across Baner, Balewadi, and Koregaon Park.
              </p>
            </div>

            <Link 
              to="/properties" 
              className="group inline-flex items-center justify-center gap-2 bg-[#121316] hover:bg-[#252830] text-white text-xs font-normal px-4 sm:px-5 py-2.5 rounded-full transition-all shadow-sm shrink-0 w-full sm:w-auto text-center"
            >
              <span>Explore All Properties</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </ScrollReveal>

          {/* Featured Property Cards */}
          <ScrollStaggerGroup staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
            {featuredProperties.map((property) => (
              <ScrollStaggerItem key={property.id} variant="fade-up" duration={0.65}>
                <PropertyCard 
                  property={property} 
                  onSelect={(p) => setSelectedProperty(p)} 
                />
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerGroup>

        </div>
      </section>

      {/* 4. TRUST & VALUE PROPOSITION ("Because The Right Home Begins with Trust") */}
      <section className="px-3 sm:px-4 md:px-8 py-2 sm:py-4">
        <ScrollReveal 
          variant="fade-up" 
          duration={0.7}
          className="max-w-7xl mx-auto bg-[#FAF9F6] rounded-3xl md:rounded-[36px] p-5 sm:p-8 md:p-14 border border-neutral-200/70 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center text-left"
        >
          {/* Left: Text & Checkpoints */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <SectionEyebrow label="WHY CHOOSE PRAVIN REALTY" />

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#121316] tracking-[-0.015em] leading-tight">
              From Boardroom to Bedrooms — We Handle It All
            </h2>

            <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              Whether you’re looking to buy, sell, rent, or invest, our team provides personalized guidance based on your property requirements and investment goals with 100% MahaRERA transparency.
            </p>

            {/* Checklist */}
            <ScrollStaggerGroup staggerDelay={0.08} className="space-y-2.5 sm:space-y-3.5 pt-1 sm:pt-2">
              {trustFeatures.map((item, idx) => (
                <ScrollStaggerItem key={idx} variant="fade-right" className="flex items-center gap-2.5 sm:gap-3">
                  <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="text-xs sm:text-sm md:text-[15px] font-normal text-[#121316]">{item}</span>
                </ScrollStaggerItem>
              ))}
            </ScrollStaggerGroup>

            <div className="pt-2 sm:pt-3">
              <Link 
                to="/about"
                className="w-full sm:w-auto group bg-[#121316] hover:bg-[#252830] text-white font-normal text-xs sm:text-sm py-2.5 px-6 rounded-full inline-flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-95 text-center"
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
            <ScrollReveal variant="scale-up" duration={0.7} className="relative w-full max-w-lg aspect-[4/4.5] rounded-3xl overflow-hidden shadow-xl border border-neutral-100 group">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85" 
                alt="Pravin Realty Trusted Real Estate Consultation" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white bg-white/15 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20">
                <p className="text-[10px] sm:text-xs font-normal uppercase tracking-wider text-[#FDE8D7]">Client-First Commitment</p>
                <p className="text-xs sm:text-sm font-normal">Trusted Guidance. Better Property Decisions.</p>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. PROCESS SECTION ("A Seamless Path to Your New Home") */}
      <section className="px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          
          <ScrollReveal variant="fade-up" className="text-center max-w-2xl mx-auto space-y-2">
            <SectionEyebrow label="OUR PROCESS" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#121316] tracking-[-0.015em]">
              A Seamless Path to Your New Property
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm font-normal">
              How we guide you from initial consultation to keys and registration.
            </p>
          </ScrollReveal>

          {/* 3 Process Cards */}
          <ScrollStaggerGroup staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {processSteps.map((step, idx) => (
              <ScrollStaggerItem 
                key={idx} 
                variant="fade-up"
                className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-all flex flex-col justify-between space-y-5 sm:space-y-6"
              >
                <div className="space-y-2.5 sm:space-y-3.5">
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
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerGroup>

        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION ("Trusted by Homeowners Who Value Quality & Care") */}
      <section className="px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 text-left">
          
          <ScrollReveal variant="fade-up" className="space-y-2">
            <SectionEyebrow label="CLIENT STORIES" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#121316] tracking-[-0.015em]">
              Trusted by Homeowners & Businesses Across Pune
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm font-normal max-w-xl">
              Real experiences from clients who bought, leased, or invested through Pravin Realty.
            </p>
          </ScrollReveal>

          {/* 3 Review Cards */}
          <ScrollStaggerGroup staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <ScrollStaggerItem 
                key={t.id} 
                variant="fade-up"
                className="bg-white rounded-3xl p-5 sm:p-7 border border-neutral-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-5 sm:space-y-6"
              >
                {/* Stars */}
                <div className="space-y-3 sm:space-y-4">
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
                <div className="flex items-center gap-3 pt-3.5 sm:pt-4 border-t border-neutral-100">
                  <img 
                    src={t.avatar} 
                    alt={t.author} 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-neutral-200"
                  />
                  <div>
                    <h4 className="font-normal text-xs sm:text-sm text-[#121316]">{t.author}</h4>
                    <p className="text-[10px] sm:text-[11px] text-neutral-400 font-normal">{t.role}</p>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerGroup>

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
