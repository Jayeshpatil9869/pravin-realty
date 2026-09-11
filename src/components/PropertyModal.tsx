import React, { useState, useEffect } from 'react';
import { Property } from '../data/properties';
import { X, Bed, Bath, Maximize, Phone, Mail, Check, ShieldCheck, MapPin } from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export function PropertyModal({ property, onClose }: PropertyModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [tourDate, setTourDate] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmitTour = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[11px] sm:text-xs font-normal uppercase tracking-wider bg-[#FDE8D7] text-[#9A3412] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shrink-0">
              {property.category}
            </span>
            <span className="text-[11px] sm:text-xs text-neutral-400 font-normal truncate">MLS #{property.id.toUpperCase()}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          
          {/* Main Gallery Showcase */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-sm">
              <img 
                src={property.gallery[activeImageIndex] || property.image} 
                alt={property.title} 
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-[#121316]/90 backdrop-blur-md text-white px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-normal shadow-lg">
                {property.formattedPrice}
              </div>
            </div>

            {/* Thumbnail selector */}
            {property.gallery.length > 1 && (
              <div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {property.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-11 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#121316] scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Core Specs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-neutral-100 text-left">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal text-[#121316] tracking-tight">
                {property.title}
              </h2>
              <p className="flex items-center gap-1.5 text-neutral-500 text-xs sm:text-sm mt-1 font-normal">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A15422] shrink-0" />
                <span>{property.location}</span>
              </p>
            </div>

            {/* Specs Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1.5 bg-neutral-100 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-normal text-neutral-800">
                <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
                <span>{property.beds} Beds</span>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-100 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-normal text-neutral-800">
                <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
                <span>{property.baths} Baths</span>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-100 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-normal text-neutral-800">
                <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
                <span>{property.sqft}</span>
              </div>
            </div>
          </div>

          {/* Description & Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 text-left">
            <div className="md:col-span-7 space-y-5 sm:space-y-6">
              <div>
                <h4 className="text-xs font-normal text-neutral-900 uppercase tracking-wider mb-2">
                  Architectural Specifications
                </h4>
                <p className="text-neutral-600 leading-relaxed text-xs sm:text-sm font-normal">
                  {property.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-normal text-neutral-900 uppercase tracking-wider mb-2.5">
                  Highlights & Custom Finishes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 font-normal">
                      <div className="w-4 h-4 rounded-full bg-[#FDE8D7] text-[#9A3412] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Trust Badge */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/70 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#A15422] shrink-0" />
                <div className="text-[11px] sm:text-xs text-neutral-600 font-normal leading-relaxed">
                  <span className="font-medium text-neutral-900">Pravin Realty Verified Project.</span> MahaRERA ID: <span className="font-medium">{property.reraId || 'P52100049281'}</span>. 100% legal title clearance and transparent pricing.
                </div>
              </div>
            </div>

            {/* Right Column: Book a Private Viewing */}
            <div className="md:col-span-5 bg-neutral-50 p-4 sm:p-6 rounded-3xl border border-neutral-200/60 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 pb-3 mb-3 border-b border-neutral-200">
                  <img 
                    src={property.agent.avatar} 
                    alt={property.agent.name} 
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-normal text-xs sm:text-sm text-neutral-900 truncate">{property.agent.name}</h5>
                    <p className="text-[11px] sm:text-xs text-neutral-500 font-normal truncate">{property.agent.role}</p>
                  </div>
                </div>

                <h4 className="font-normal text-xs sm:text-sm text-neutral-900 mb-1">
                  Schedule a Private Showing
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-500 mb-3 font-normal">
                  Experience this residence in person with our dedicated luxury advisor.
                </p>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl text-center text-xs sm:text-sm font-normal animate-fade-in">
                    ✓ Showing request received. {property.agent.name} will confirm your appointment shortly.
                  </div>
                ) : (
                  <form onSubmit={handleSubmitTour} className="space-y-2.5">
                    <input 
                      type="text" 
                      placeholder="Your Full Name" 
                      required 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full text-xs font-normal bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email Address" 
                      required 
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full text-xs font-normal bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number (+91 ...)" 
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full text-xs font-normal bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                    <div className="relative">
                      <input 
                        type="date" 
                        required 
                        min={todayStr}
                        value={tourDate}
                        onChange={(e) => setTourDate(e.target.value)}
                        className="w-full text-xs font-normal bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 text-neutral-700"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#121316] hover:bg-[#252830] text-white font-normal text-xs py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer mt-1"
                    >
                      Request Private Showing
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
                <a href={`tel:${property.agent.phone}`} className="flex items-center gap-1 hover:text-neutral-900 font-normal">
                  <Phone className="w-3.5 h-3.5" /> Call Advisor
                </a>
                <a href={`mailto:${property.agent.email}`} className="flex items-center gap-1 hover:text-neutral-900 font-normal">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
