import { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '+919762416737';
  const displayPhone = '+91 97624 16737';

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-auto">
      {/* Expanded Quick Contact Card */}
      {isOpen && (
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-neutral-200/80 w-[calc(100vw-32px)] max-w-[320px] sm:w-80 space-y-3 sm:space-y-3.5 animate-fade-in text-left">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-[11px] sm:text-xs font-normal uppercase tracking-wider text-[#121316]">
                Pravin Realty Advisory
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-700 transition-colors p-1"
              aria-label="Close contact options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-neutral-600 font-normal leading-relaxed">
            Connect directly with our West Pune property consultant for instant floor plans, pricing & site visits.
          </p>

          <div className="space-y-2 pt-1">
            <a
              href={`https://wa.me/${phoneNumber.replace('+', '')}?text=Hello%20Pravin%20Realty,%20I%20am%20interested%20in%20properties%20in%20Pune.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs font-normal transition-all shadow-sm group"
            >
              <div className="flex items-center gap-2 sm:gap-2.5">
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Chat on WhatsApp</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full shrink-0">Instant</span>
            </a>

            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center justify-between bg-[#121316] hover:bg-[#252830] text-white px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs font-normal transition-all shadow-sm"
            >
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="truncate">Call {displayPhone}</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full shrink-0">Direct</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Toggle Button with subtle pulse effect */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-[#25D366] hover:bg-[#20bd5a] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Contact Pravin Realty on WhatsApp"
      >
        {/* Subtle breathing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        )}
      </button>
    </div>
  );
}
