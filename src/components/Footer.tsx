import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { PravinLogo } from './PravinLogo';

export function Footer() {
  return (
    <footer className="bg-[#0D0E11] text-[#A1A1AA] pt-16 md:pt-20 pb-8 md:pb-12 px-6 md:px-12 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 md:mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-8">
            <Link to="/" className="inline-block">
              <PravinLogo variant="light" textSize="text-xl" />
            </Link>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              Your trusted real estate partner in Pune’s flourishing corridors. Helping families and businesses discover the right properties across Baner, Balewadi, and West Pune.
            </p>
            <div className="flex items-start gap-2 text-xs text-neutral-400 pt-1">
              <MapPin className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
              <span>Office 1011, 10th Floor, Nandan Probiz, Balewadi, Pune - 411045</span>
            </div>
          </div>

          {/* Pages Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-medium text-white tracking-tight">Pages</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400 font-normal">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Market Insights</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Talk to an Agent</Link></li>
            </ul>
          </div>

          {/* Specializations Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-medium text-white tracking-tight">Specializations</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400 font-normal">
              <li><Link to="/properties" className="hover:text-white transition-colors">Baner Luxury Homes</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Balewadi High Street</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Commercial Offices</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Plot & Land Deals</Link></li>
            </ul>
          </div>

          {/* RERA & Trust Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-medium text-white tracking-tight">Trust & Legal</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400 font-normal">
              <li><span className="text-neutral-300">MahaRERA Registered</span></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Legal Due Diligence</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Title Search Reports</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Bank Loan Advisory</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-medium text-white tracking-tight">Contact</h4>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-400 font-normal">
              <p>
                <a href="mailto:info@pravinrealty.com" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> info@pravinrealty.com
                </a>
              </p>
              <p>
                <a href="tel:+919762416737" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> +91 97624 16737
                </a>
              </p>
              
              {/* Social Icons matching LinkedIn & Instagram */}
              <div className="flex items-center gap-2 pt-2">
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
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-normal pb-8 sm:pb-12 border-t border-neutral-900 pt-6">
          <p>© {new Date().getFullYear()} Pravin Realty. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 text-neutral-500">MahaRERA Compliant Agency • West Pune Real Estate</p>
        </div>

        {/* Giant Pure White Brand Display Typography in crisp font-normal */}
        <div className="w-full select-none pointer-events-none overflow-hidden text-center">
          <span className="text-[13vw] font-normal tracking-[-0.03em] text-white/90 leading-none block font-sans">
            Pravin Realty
          </span>
        </div>

      </div>
    </footer>
  );
}
