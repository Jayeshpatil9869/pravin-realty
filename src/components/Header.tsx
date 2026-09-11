import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PravinLogo } from './PravinLogo';
import { cn } from '../lib/utils';
import { RandomLetterSwap } from '@/components/ui/random-letter-swap';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center pointer-events-none"
      >
        <div 
          className={cn(
            "w-[94%] sm:w-[90%] lg:w-[88%] max-w-7xl pointer-events-auto transition-all duration-300 flex items-center justify-between border-x border-b",
            isScrolled 
              ? "bg-white/80 backdrop-blur-md border-neutral-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-2.5 px-6 md:px-8 rounded-b-[26px] sm:rounded-b-[30px]" 
              : "bg-white border-neutral-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-3.5 px-6 md:px-8 rounded-b-[28px] sm:rounded-b-[34px]"
          )}
        >
          
          {/* Pravin Realty Logo */}
          <Link 
            to="/" 
            className="flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <PravinLogo variant="dark" />
          </Link>

          {/* Desktop Navigation Links with RandomLetterSwap and Active Dot */}
          <nav className="hidden md:flex items-center space-x-8 text-[13.5px] font-normal text-[#555A64]">
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

          {/* Action CTA Button */}
          <div className="flex items-center space-x-3">
            {onOpenConsultation ? (
              <button 
                onClick={onOpenConsultation}
                className="bg-[#121316] hover:bg-[#252830] text-white text-[13px] font-normal px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                Talk to an Agent
              </button>
            ) : (
              <Link 
                to="/contact"
                className="bg-[#121316] hover:bg-[#252830] text-white text-[13px] font-normal px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm active:scale-95"
              >
                Talk to an Agent
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-1.5 text-[#121316] hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute top-20 left-4 right-4 bg-white rounded-3xl p-6 shadow-2xl border border-neutral-100 flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-normal py-2.5 px-4 rounded-xl transition-colors",
                    isActive(link.path) 
                      ? "bg-neutral-100 text-[#121316] font-medium" 
                      : "text-neutral-600 hover:bg-neutral-50 font-normal"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-2 border-t border-neutral-100">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block text-center bg-[#121316] text-white font-normal py-3 rounded-full text-sm"
              >
                Talk to an Agent
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
