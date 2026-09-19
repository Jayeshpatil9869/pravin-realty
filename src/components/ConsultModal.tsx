import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { SectionEyebrow } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultModal({ isOpen, onClose }: ConsultModalProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Buying a Property');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-neutral-100 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100 bg-white sticky top-0 z-20">
              <SectionEyebrow label="PRAVIN REALTY ADVISORY" />

              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-5 sm:space-y-6">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 sm:py-10 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FDE8D7] text-[#9A3412] rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-normal text-neutral-900">Callback Request Received</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md font-normal leading-relaxed">
                    Thank you, {name || 'client'}. Our West Pune property advisor will connect with you at <span className="font-medium text-neutral-900">{mobile}</span> within 15 minutes.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-normal text-[#121316]">
                      Find Your Right Property
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-1 font-normal">
                      Connect directly with Pravin Realty for verified listings, floor plans & market analysis.
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className="block text-xs font-normal text-neutral-700 mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 outline-none border border-transparent focus:border-[#C86D2F]/40 focus:bg-white focus:ring-2 focus:ring-[#FDE8D7] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-normal text-neutral-700 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 outline-none border border-transparent focus:border-[#C86D2F]/40 focus:bg-white focus:ring-2 focus:ring-[#FDE8D7] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-normal text-neutral-700 mb-1.5">
                      I'm interested in
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 outline-none border border-transparent focus:border-[#C86D2F]/40 focus:bg-white focus:ring-2 focus:ring-[#FDE8D7] transition-all cursor-pointer"
                    >
                      <option value="Buying a Property">Buying a Property</option>
                      <option value="Selling a Property">Selling a Property</option>
                      <option value="Renting a Property">Renting a Property</option>
                      <option value="Commercial Property">Commercial Property</option>
                      <option value="Plots & Land Deals">Plots & Land Deals</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-normal text-neutral-700 mb-1.5">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 outline-none border border-transparent focus:border-[#C86D2F]/40 focus:bg-white focus:ring-2 focus:ring-[#FDE8D7] transition-all"
                    />
                  </div>

                  {/* REQUEST A CALLBACK CTA Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full overflow-hidden bg-[#121316] hover:bg-[#252830] text-white font-normal text-xs sm:text-sm py-3 sm:py-3.5 rounded-xl shadow-md cursor-pointer mt-2 tracking-wider uppercase group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                    <span className="relative z-10">REQUEST A CALLBACK</span>
                  </motion.button>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 gap-2">
                    <a href="tel:+919762416737" className="hover:text-neutral-900 flex items-center gap-1 transition-colors">
                      <Phone className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">+91 97624 16737</span>
                    </a>
                    <a 
                      href="https://wa.me/919762416737?text=Hello%20Pravin%20Realty,%20I%20am%20looking%20for%20property%20consultation." 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-emerald-600 flex items-center gap-1 text-emerald-700 font-medium shrink-0 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> <span>WhatsApp Us</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

