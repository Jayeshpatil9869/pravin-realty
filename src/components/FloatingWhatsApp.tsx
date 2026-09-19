import { useState } from 'react';
import { Phone, MessageCircle, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '+919762416737';
  const displayPhone = '+91 97624 16737';

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-auto">
      {/* Expanded Quick Contact Card with Spring Physics */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-neutral-200/80 w-[calc(100vw-32px)] max-w-[320px] sm:w-80 space-y-3 sm:space-y-3.5 text-left origin-bottom-right"
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <h4 className="text-[11px] sm:text-xs font-normal uppercase tracking-wider text-[#121316]">
                  Pravin Realty Advisory
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
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
                className="group flex items-center justify-between bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs font-normal transition-all duration-200 shadow-sm active:scale-98"
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <MessageCircle className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span>Chat on WhatsApp</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full shrink-0">Instant</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>

              <a
                href={`tel:${phoneNumber}`}
                className="group flex items-center justify-between bg-[#121316] hover:bg-[#252830] text-white px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs font-normal transition-all duration-200 shadow-sm active:scale-98"
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Phone className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="truncate">Call {displayPhone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full shrink-0">Direct</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button with dual-ring radar ping */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] cursor-pointer"
        aria-label="Contact Pravin Realty on WhatsApp"
      >
        {/* Dual Radar Ring Pulse */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <span className="absolute -inset-1 rounded-full border border-[#25D366]/40 animate-pulse pointer-events-none" />

        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
}

