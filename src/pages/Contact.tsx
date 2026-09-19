import React, { useState } from 'react';
import { SectionEyebrow } from '../components/Icons';
import { CheckCircle2, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { ScrollReveal, ScrollStaggerGroup, ScrollStaggerItem } from '../components/ui/scroll-reveal';

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
    <div className="min-h-screen bg-white pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 md:pb-28 text-left overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-12 sm:space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Form */}
          <ScrollReveal variant="fade-right" duration={0.7} className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            <div className="space-y-2">
              <SectionEyebrow label="GET IN TOUCH WITH US" />

              <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-normal text-[#121316] tracking-[-0.015em] leading-[1.2]">
                Send Us a Message
              </h1>
              <p className="text-neutral-500 text-xs sm:text-sm font-normal">
                Discover the right spaces in Pune and make informed property decisions with Pravin Realty.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-[#F8F9FA] p-6 sm:p-10 rounded-3xl border border-neutral-200/80 space-y-4 text-center animate-fade-in my-4 sm:my-6">
                <div className="w-14 h-14 bg-[#FDE8D7] text-[#9A3412] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-normal text-neutral-900">Inquiry Delivered</h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto font-normal leading-relaxed">
                  Thank you, <span className="font-medium text-neutral-900">{fullName}</span>. A Pravin Realty advisor will connect with you shortly at <span className="font-medium text-neutral-900">{email}</span> or <span className="font-medium text-neutral-900">{phone}</span>.
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
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 pt-1 sm:pt-2">
                
                {/* Full Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                  <div>
                    <label className="block text-xs font-normal text-[#121316] mb-1.5 sm:mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-normal text-[#121316] mb-1.5 sm:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-normal text-[#121316] mb-1.5 sm:mb-2">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 97624 16737"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED] outline-none transition-all"
                  />
                </div>

                {/* Your Message */}
                <div>
                  <label className="block text-xs font-normal text-[#121316] mb-1.5 sm:mb-2">
                    Your Requirements / Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us what you are looking for — residential flat (2/3/4 BHK), commercial office space, leasing, or investment in Baner/Balewadi."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs sm:text-sm font-normal bg-[#F3F4F6] text-neutral-900 placeholder:text-neutral-400 rounded-xl p-3.5 sm:p-4 border border-transparent focus:border-neutral-300 focus:bg-[#EAEBED] outline-none transition-all resize-y min-h-[110px]"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#121316] hover:bg-neutral-800 text-white font-normal text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer text-center mt-1"
                >
                  {loading ? 'Sending Inquiry...' : 'Submit Inquiry'}
                </button>
              </form>
            )}

          </ScrollReveal>

          {/* Right Column: Office Location & Quick Contact Cards */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <ScrollReveal variant="fade-left" duration={0.7} className="bg-[#FBFBFB] rounded-3xl p-5 sm:p-8 border border-neutral-200/80 shadow-xs space-y-5 sm:space-y-6">
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-medium text-neutral-500 block mb-1">
                  OUR CORPORATE HEADQUARTERS
                </span>
                <h3 className="text-xl sm:text-2xl font-normal text-[#121316]">
                  Pravin Realty Office
                </h3>
              </div>

              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-neutral-600 font-normal">
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FDE8D7] text-[#9A3412] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-[#121316]">Physical Address</p>
                    <p className="leading-relaxed text-neutral-600">
                      Office No. 1011, 10th Floor, Nandan Probiz, Sr. No. 23, Balewadi Road, Balewadi, Pune - 411045, Maharashtra, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FDE8D7] text-[#9A3412] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-[#121316]">Call & WhatsApp</p>
                    <p className="leading-relaxed">
                      <a href="tel:+919762416737" className="text-[#121316] hover:underline font-medium">+91 97624 16737</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FDE8D7] text-[#9A3412] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-[#121316]">Email Inquiries</p>
                    <p className="leading-relaxed space-y-0.5">
                      <a href="mailto:kpravin2492@gmail.com" className="text-[#121316] hover:underline block break-all">kpravin2492@gmail.com</a>
                      <a href="mailto:careerspravinrealty@gmail.com" className="text-neutral-500 hover:underline block text-xs break-all">Careers: careerspravinrealty@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FDE8D7] text-[#9A3412] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-[#121316]">Working Hours</p>
                    <p className="leading-relaxed text-neutral-600">
                      Monday – Saturday: 9:30 AM – 7:30 PM<br />
                      Sunday: By Prior Appointment
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919762416737?text=Hello%20Pravin%20Realty,%20I%20am%20interested%20in%20properties%20in%20Pune."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-5 rounded-2xl text-xs sm:text-sm font-normal inline-flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Connect on WhatsApp Instantly</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Coverage Areas */}
            <ScrollReveal variant="fade-up" delay={0.15} className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80">
              <h4 className="text-[11px] sm:text-xs font-normal uppercase tracking-wider text-neutral-500 mb-3">
                Key Micro-Markets We Serve Across Pune
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['Balewadi', 'Baner', 'Punawale', 'Hinjawadi IT Park', 'Wakad', 'Kharadi', 'Hadapsar', 'Lohegaon', 'Aundh', 'Pashan'].map((area) => (
                  <span key={area} className="text-xs bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-full font-normal">
                    {area}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </div>
  );
}
