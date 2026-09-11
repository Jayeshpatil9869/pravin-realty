import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PravinLogo } from './PravinLogo';
import { cn } from '../lib/utils';
import { RandomLetterSwap } from '@/components/ui/random-letter-swap';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center pointer-events-none px-3 sm:px-4"
      >
        <div 
          className={cn(
            "w-full max-w-7xl pointer-events-auto transition-all duration-300 flex items-center justify-between border-x border-b",
            isScrolled 
              ? "bg-white/85 backdrop-blur-md border-neutral-200/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-2.5 px-4 sm:px-6 md:px-8 rounded-b-[24px] sm:rounded-b-[28px]" 
              : "bg-white/95 backdrop-blur-sm border-neutral-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-3 sm:py-3.5 px-4 sm:px-6 md:px-8 rounded-b-[26px] sm:rounded-b-[32px]"
          )}
        >
          
          {/* Pravin Realty Logo */}
          <Link 
            to="/" 
            className="flex items-center shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <PravinLogo variant="dark" />
          </Link>

          {/* Desktop Navigation Links with RandomLetterSwap and Active Dot */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[13.5px] font-normal text-[#555A64]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "transition-colors hover:text-[#121316] relative py-1 inline-flex flex-col items-center",
                  isActive(link.path) 
                    ? "text-[#121316] font-normal" 
                    : "text-[#555A64] font-normal"
                )}
              >
                <RandomLetterSwap
                  label={link.name}
                  staggerDuration={0.02}
                  transition={{ duration: 0.5, type: "spring" }}
                />
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#121316] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action CTA Button & Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link 
              to="/contact"
              className="hidden sm:inline-flex bg-[#121316] hover:bg-[#252830] text-white text-[12px] sm:text-[13px] font-normal px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap"
            >
              Talk to an Agent
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-[#121316] hover:bg-neutral-100 rounded-full transition-colors cursor-pointer active:scale-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in flex flex-col justify-start pt-20 px-4 pb-6 overflow-y-auto"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-neutral-100 flex flex-col space-y-4 max-w-sm mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <PravinLogo variant="dark" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-sm sm:text-base font-normal py-3 px-4 rounded-2xl transition-colors flex items-center justify-between",
                    isActive(link.path) 
                      ? "bg-neutral-100 text-[#121316] font-medium" 
                      : "text-neutral-600 hover:bg-neutral-50 font-normal"
                  )}
                >
                  <span>{link.name}</span>
                  {isActive(link.path) && (
                    <span className="w-2 h-2 rounded-full bg-[#121316]" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-neutral-100 space-y-2.5">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block text-center bg-[#121316] hover:bg-[#252830] text-white font-normal py-3.5 rounded-full text-sm transition-all active:scale-98 shadow-sm"
              >
                Talk to an Agent
              </Link>

              <a
                href="tel:+919762416737"
                className="w-full block text-center text-xs text-neutral-500 font-normal py-2 hover:text-neutral-900 transition-colors"
              >
                Call: +91 97624 16737
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
