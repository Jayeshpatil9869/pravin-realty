import { Link } from 'react-router-dom';
import { ArrowRightIcon, SectionEyebrow } from './Icons';

interface AgentCalloutProps {
  onOpenConsultation?: () => void;
}

export function AgentCallout({ onOpenConsultation }: AgentCalloutProps) {
  return (
    <section className="px-4 md:px-8 py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column Text */}
        <div className="lg:col-span-6 space-y-5">
          <SectionEyebrow label="TALK TO PRAVIN REALTY" />

          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-normal text-[#121316] tracking-[-0.015em] leading-[1.2]">
            Your Trusted Partner in Finding The Right Property.
          </h2>

          <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-normal">
            Connect with Pravin Realty for personalized guidance, verified Pune property options, and transparent paperwork — from boardroom to bedrooms, we handle it all.
          </p>

          <div className="pt-2">
            {onOpenConsultation ? (
              <button
                onClick={onOpenConsultation}
                className="group bg-[#121316] hover:bg-[#252830] text-white font-normal text-xs sm:text-sm py-2.5 px-6 rounded-full inline-flex items-center gap-2.5 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Talk to an Advisor</span>
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRightIcon className="w-3 h-3" />
                </div>
              </button>
            ) : (
              <Link
                to="/contact"
                className="group bg-[#121316] hover:bg-[#252830] text-white font-normal text-xs sm:text-sm py-2.5 px-6 rounded-full inline-flex items-center gap-2.5 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span>Talk to an Advisor</span>
                <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRightIcon className="w-3 h-3" />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Right Column Agent Image */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-neutral-100 group">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=85" 
              alt="Pravin Realty Leadership" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            
            {/* Subtle Floating Agent Badge */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
              <div>
                <h4 className="font-normal text-sm text-[#121316]">Pravin K.</h4>
                <p className="text-xs text-neutral-500 font-normal">Founder & Principal Broker</p>
              </div>
              <span className="text-[11px] font-normal bg-[#FDE8D7] text-[#9A3412] px-2.5 py-1 rounded-full">
                West Pune Expert
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
