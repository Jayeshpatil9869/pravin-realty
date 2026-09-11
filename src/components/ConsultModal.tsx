import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/team';
import { SectionEyebrow } from './Icons';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col border border-neutral-100 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 bg-white sticky top-0 z-20">
          <SectionEyebrow label="PRAVIN REALTY ADVISORY" />

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#FDE8D7] text-[#9A3412] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-normal text-neutral-900">Callback Request Received</h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md font-normal leading-relaxed">
                Thank you, {name || 'client'}. Our West Pune property advisor will connect with you at <span className="font-medium text-neutral-900">{mobile}</span> within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-normal text-[#121316]">
                  Find Your Right Property
                </h3>
                <p className="text-xs text-neutral-500 mt-1 font-normal">
                  Connect directly with Pravin Realty for verified listings, floor plans & market analysis.
                </p>
              </div>

              {/* Form Fields matching the PDF format */}
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
                  className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-4 py-3 outline-none border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED]"
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
                  className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-4 py-3 outline-none border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED]"
                />
              </div>

              <div>
                <label className="block text-xs font-normal text-neutral-700 mb-1.5">
                  I'm interested in
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 rounded-xl px-4 py-3 outline-none border border-transparent focus:border-neutral-300 cursor-pointer"
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
                  className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-4 py-3 outline-none border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED]"
                />
              </div>

              {/* REQUEST A CALLBACK CTA Button */}
              <button
                type="submit"
                className="w-full bg-[#121316] hover:bg-[#252830] text-white font-normal text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer mt-2 tracking-wider uppercase"
              >
                REQUEST A CALLBACK
              </button>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <a href="tel:+919762416737" className="hover:text-neutral-900 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> +91 97624 16737
                </a>
                <a 
                  href="https://wa.me/919762416737?text=Hello%20Pravin%20Realty,%20I%20am%20looking%20for%20property%20consultation." 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-600 flex items-center gap-1 text-emerald-700 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Us
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
