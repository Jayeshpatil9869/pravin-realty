import React, { useState } from 'react';
import { SectionEyebrow } from '../components/Icons';
import { CheckCircle2 } from 'lucide-react';

export function Contact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-white pt-28 sm:pt-32 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <SectionEyebrow label="TALK TO PRAVIN REALTY" />

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#121316] tracking-[-0.015em] leading-[1.2]">
                Send Us a Message
              </h1>
            </div>

            {isSubmitted ? (
              <div className="bg-[#F8F9FA] p-8 sm:p-10 rounded-2xl border border-neutral-200/80 space-y-4 text-center animate-fade-in my-6">
                <div className="w-14 h-14 bg-[#FDE8D7] text-[#9A3412] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-normal text-neutral-900">Message Delivered</h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto font-normal leading-relaxed">
                  Thank you, <span className="font-medium text-neutral-900">{fullName}</span>. A Pravin Realty West Pune property advisor will get in touch with you at <span className="font-medium text-neutral-900">{email}</span> within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-4 bg-[#121316] text-white text-xs font-normal px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                
                {/* Full Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-normal text-[#121316] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-4 py-3 border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-normal text-[#121316] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="example@casavera.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-4 py-3 border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-normal text-[#121316] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="(+1) ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-4 py-3 border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED] outline-none transition-all"
                  />
                </div>

                {/* Your Message */}
                <div>
                  <label className="block text-xs font-normal text-[#121316] mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tell us how we can help you — for example, scheduling a viewing or asking about a property."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl p-4 border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED] outline-none transition-all resize-y min-h-[140px]"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#6B7280] hover:bg-[#4B5563] text-white font-normal text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer text-center mt-2"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Agent Portrait Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/4.9] rounded-3xl overflow-hidden shadow-lg border border-neutral-100 bg-[#E8EEF3]">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85" 
                alt="Casavera Professional Real Estate Agent" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
