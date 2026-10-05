import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home as HomeIcon, Search, PhoneCall, ArrowRight } from 'lucide-react';

interface NotFoundProps {
  onOpenConsultation?: () => void;
}

export function NotFound({ onOpenConsultation }: NotFoundProps) {
  return (
    <div className="min-h-[80vh] bg-[#FBFBFB] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FDE8D7]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F7D0B2]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 space-y-8">
        
        {/* Emblem Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white border border-[#EAEAEB] shadow-lg text-[#C86D2F] mx-auto animate-bounce-subtle">
          <Compass className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-[#FDE8D7] text-[#121316] border border-[#F7D0B2]">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#121316]">
            Looking for Prime Property?
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 max-w-md mx-auto leading-relaxed">
            The page or listing you are looking for has been moved, renamed, or is currently off-market.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto bg-[#121316] text-white hover:bg-neutral-800 font-medium px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 text-sm"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/properties"
            className="w-full sm:w-auto bg-white border border-[#EAEAEB] hover:border-neutral-400 text-[#121316] font-medium px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 transition-all shadow-xs active:scale-95 text-sm"
          >
            <Search className="w-4 h-4 text-[#C86D2F]" />
            <span>Browse Portfolio</span>
          </Link>
        </div>

        {/* Quick Help Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#EAEAEB] shadow-xs text-left max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Need Direct Assistance?
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-sm text-neutral-700">
            Speak directly with our senior property advisors for personalized residential & commercial options in Baner & Balewadi.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <a
              href="tel:+919762416737"
              className="text-xs font-semibold text-[#121316] hover:text-[#C86D2F] inline-flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C86D2F]" />
              <span>+91 97624 16737</span>
            </a>
            
            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="text-xs font-semibold text-[#C86D2F] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
