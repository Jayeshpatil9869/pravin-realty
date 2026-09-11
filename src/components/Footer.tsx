import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { PravinLogo } from './PravinLogo';

export function Footer() {
  return (
    <footer className="bg-[#0D0E11] text-[#A1A1AA] pt-12 sm:pt-16 md:pt-20 pb-8 md:pb-12 px-4 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid: 2-column on mobile, 12-column on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-10 lg:gap-8 mb-12 sm:mb-16 md:mb-20">
          
          {/* Top Brand Info: Full width on mobile, 4-col on desktop */}
          <div className="col-span-2 lg:col-span-4 space-y-4 pr-0 lg:pr-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link to="/" className="inline-block">
              <PravinLogo variant="light" textSize="text-lg sm:text-xl" />
            </Link>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal mx-auto lg:mx-0">
              Your trusted real estate partner in Pune’s flourishing corridors. Helping families and businesses discover the right properties across Baner, Balewadi, and West Pune.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-neutral-400 pt-1 text-center lg:text-left max-w-sm mx-auto lg:mx-0">
              <MapPin className="w-4 h-4 text-neutral-300 shrink-0" />
              <span>Office 1011, 10th Floor, Nandan Probiz, Balewadi, Pune - 411045</span>
            </div>
          </div>

          {/* Section 1: Column 1 on mobile (Pages) */}
          <div className="col-span-1 lg:col-span-2 space-y-3 sm:space-y-3.5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-xs sm:text-sm font-medium text-white tracking-tight uppercase sm:capitalize">Pages</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-neutral-400 font-normal">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Market Insights</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Talk to an Agent</Link></li>
            </ul>
          </div>

          {/* Section 2: Column 2 on mobile (Specializations) */}
          <div className="col-span-1 lg:col-span-2 space-y-3 sm:space-y-3.5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-xs sm:text-sm font-medium text-white tracking-tight uppercase sm:capitalize">Specializations</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-neutral-400 font-normal">
              <li><Link to="/properties" className="hover:text-white transition-colors">Baner Luxury Homes</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Balewadi High Street</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Commercial Offices</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Plot & Land Deals</Link></li>
            </ul>
          </div>

          {/* Section 3 (Bottom on mobile): Trust & Legal */}
          <div className="col-span-2 lg:col-span-2 space-y-3 sm:space-y-3.5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-xs sm:text-sm font-medium text-white tracking-tight uppercase sm:capitalize">Trust & Legal</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-neutral-400 font-normal">
              <li><span className="text-neutral-300">MahaRERA Registered</span></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Legal Due Diligence</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Title Search Reports</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Bank Loan Advisory</Link></li>
            </ul>
          </div>

          {/* Section 3 (Bottom on mobile): Contact & Social */}
          <div className="col-span-2 lg:col-span-2 space-y-3 sm:space-y-3.5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-xs sm:text-sm font-medium text-white tracking-tight uppercase sm:capitalize">Contact</h4>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-400 font-normal flex flex-col items-center lg:items-start">
              <p>
                <a href="mailto:kpravin2492@gmail.com" className="hover:text-white transition-colors flex items-center justify-center lg:justify-start gap-1.5 break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0" /> kpravin2492@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+919762416737" className="hover:text-white transition-colors flex items-center justify-center lg:justify-start gap-1.5">
                  <Phone className="w-3.5 h-3.5 shrink-0" /> +91 97624 16737
                </a>
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center justify-center lg:justify-start gap-2 pt-2">
                <a 
                  href="https://in.linkedin.com/company/pravin-realty" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-lg bg-[#22252A] text-neutral-300 hover:text-white hover:bg-neutral-700 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://instagram.com/pravinrealty" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-lg bg-[#22252A] text-neutral-300 hover:text-white hover:bg-neutral-700 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://youtube.com/@pravinrealty" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-lg bg-[#22252A] text-neutral-300 hover:text-white hover:bg-neutral-700 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://facebook.com/pravinrealty" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-8 h-8 rounded-lg bg-[#22252A] text-neutral-300 hover:text-white hover:bg-neutral-700 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Meta Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-normal pb-6 sm:pb-10 border-t border-neutral-900 pt-6 gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Pravin Realty. All Rights Reserved.</p>
          <p className="text-neutral-500">MahaRERA Compliant Agency • West Pune Real Estate</p>
        </div>

        {/* Giant Pure White Brand Display Typography in crisp font-normal */}
        <div className="w-full select-none pointer-events-none overflow-hidden text-center">
          <span className="text-[12vw] sm:text-[11vw] font-normal tracking-[-0.03em] text-white/90 leading-none block font-sans whitespace-nowrap">
            Pravin Realty
          </span>
        </div>

      </div>
    </footer>
  );
}
