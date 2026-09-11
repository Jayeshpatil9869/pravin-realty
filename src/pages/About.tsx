import { useRef } from 'react';
import gsap from 'gsap';
import { TEAM_MEMBERS } from '../data/team';
import { GrandCtaBanner } from '../components/GrandCtaBanner';
import { AgentCallout } from '../components/AgentCallout';
import { SectionEyebrow } from '../components/Icons';
import { Search, Award, HeartHandshake } from 'lucide-react';
import AboutSection3 from '../components/ui/about-section';

interface AboutProps {
  onOpenConsultation?: () => void;
}

export function About({ onOpenConsultation }: AboutProps) {
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);

  const handleMouseEnterLeft = () => {
    if (window.innerWidth >= 768 && leftBoxRef.current && rightBoxRef.current) {
      gsap.to(leftBoxRef.current, {
        flexGrow: 1.5,
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.to(rightBoxRef.current, {
        flexGrow: 0.75,
        opacity: 0.92,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseEnterRight = () => {
    if (window.innerWidth >= 768 && leftBoxRef.current && rightBoxRef.current) {
      gsap.to(rightBoxRef.current, {
        flexGrow: 1.5,
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.to(leftBoxRef.current, {
        flexGrow: 0.75,
        opacity: 0.92,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeaveSplit = () => {
    if (leftBoxRef.current && rightBoxRef.current) {
      gsap.to([leftBoxRef.current, rightBoxRef.current], {
        flexGrow: 1,
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  };

  const services = [
    {
      icon: Search,
      title: 'Residential Property Search & Advisory',
      description: 'Expert guidance matching your family’s lifestyle with vetted 2, 3, 4 BHK luxury residences in Baner, Balewadi, and Koregaon Park.'
    },
    {
      icon: Award,
      title: 'Commercial Leasing & Sales',
      description: 'Corporate office suites, retail spaces, and tech park mandates across Nandan Probiz, Punwala Finecrop, and Baner High Street.'
    },
    {
      icon: HeartHandshake,
      title: 'End-to-End Legal & RERA Advisory',
      description: 'MahaRERA compliance verification, clear title search reports, stamp duty registration, and priority bank home loan sanctions.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-28 md:pt-36 space-y-12 sm:space-y-16 md:space-y-24 text-left">
      
      {/* 1. HERO ANIMATED SECTION (Vertical Cut Reveal & Clipped SVG Hero) */}
      <AboutSection3 onOpenConsultation={onOpenConsultation} />

      {/* 2. MISSION & STORY SECTION (Split Images) */}
      <section className="px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14">
            
            {/* Left tag */}
            <div className="lg:col-span-3">
              <SectionEyebrow label="OUR PHILOSOPHY" />
            </div>

            {/* Right text */}
            <div className="lg:col-span-9 space-y-4 sm:space-y-5">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-normal text-[#121316] tracking-[-0.015em] leading-[1.3]">
                "With Pravin Realty, you’re not just finding a property — you’re finding the right opportunity with the right guidance."
              </h2>
              <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                Whether you’re looking to buy, sell, rent, or invest, our team provides personalized guidance based on your property requirements and investment goals. We combine local market knowledge with a straightforward, client-first approach to help you make confident property decisions.
              </p>
              <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                From our corporate headquarters at Nandan Probiz, Balewadi, we manage prominent residential and commercial portfolios across Baner, Balewadi, Aundh, Koregaon Park, and Hinjewadi IT Park.
              </p>
            </div>

          </div>

          {/* 2 Split Images with GSAP Interactive Hover Expansion */}
          <div 
            className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full items-stretch"
            onMouseLeave={handleMouseLeaveSplit}
          >
            <div 
              ref={leftBoxRef}
              onMouseEnter={handleMouseEnterLeft}
              className="group aspect-[16/10] rounded-3xl overflow-hidden shadow-xs bg-neutral-100 cursor-pointer w-full md:flex-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85" 
                alt="Pravin Realty Advisory Team" 
                className="w-full h-full object-cover img-zoom"
              />
            </div>

            <div 
              ref={rightBoxRef}
              onMouseEnter={handleMouseEnterRight}
              className="group aspect-[16/10] rounded-3xl overflow-hidden shadow-xs bg-neutral-100 cursor-pointer w-full md:flex-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85" 
                alt="Modern Residential Architecture" 
                className="w-full h-full object-cover img-zoom"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            <SectionEyebrow label="OUR CORE SERVICES" />

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#121316] tracking-[-0.015em] leading-[1.2]">
              From Boardroom to Bedrooms — We Handle It All
            </h2>

            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-normal">
              Guided by over 12 years of hands-on market experience, our end-to-end real estate brokerage services ensure every step of your transaction is transparent and effortless.
            </p>

            <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80" 
                alt="Pravin Realty Commercial Consultation" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: 3 Service Cards */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-5 sm:p-7 rounded-3xl border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-start gap-3.5 sm:gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#FDE8D7] text-[#9A3412] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-normal text-sm sm:text-base md:text-lg text-[#121316] mb-1">
                      {srv.title}
                    </h3>
                    <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-normal">
                      {srv.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. TEAM SECTION (6 Team Members) */}
      <section className="px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <SectionEyebrow label="MEET OUR LEADERSHIP" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#121316] tracking-[-0.015em]">
              Meet the People Behind Pravin Realty
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm font-normal">
              Our seasoned property consultants and documentation advisors are dedicated to your peace of mind.
            </p>
          </div>

          {/* 6 Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-3xl p-3.5 sm:p-4 border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-all text-center space-y-3 group"
              >
                <div className="aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-neutral-100">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover img-zoom"
                  />
                </div>
                <div>
                  <h3 className="font-normal text-sm sm:text-base text-[#121316] group-hover:text-[#A15422] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-500 font-normal mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. GRAND CTA BANNER */}
      <GrandCtaBanner />

      {/* 6. AGENT CALLOUT */}
      <AgentCallout onOpenConsultation={onOpenConsultation} />

    </div>
  );
}
