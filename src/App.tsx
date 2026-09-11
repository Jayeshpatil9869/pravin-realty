import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConsultModal } from './components/ConsultModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top upon any route transition or page open
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Disable automatic browser scroll restoration so it doesn't fight our router
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetToTop = () => {
      // 1. Lenis Smooth Scroll instance reset
      const lenis = (window as unknown as { __lenisInstance?: Lenis }).__lenisInstance;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }

      // 2. Native window and document scroll reset
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate execution
    resetToTop();

    // Secondary execution on next render frame to handle layout shifts
    const rafId = requestAnimationFrame(resetToTop);
    const timeoutId = setTimeout(resetToTop, 50);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [pathname, search, hash]);

  return null;
}

export default function App() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  useEffect(() => {
    // Initialize buttery Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    (window as unknown as { __lenisInstance?: Lenis }).__lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      (window as unknown as { __lenisInstance?: Lenis }).__lenisInstance = undefined;
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FBFBFB] text-[#121316] flex flex-col font-sans selection:bg-[#FDE8D7] selection:text-[#9A3412]">
        <Header onOpenConsultation={() => setIsConsultOpen(true)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenConsultation={() => setIsConsultOpen(true)} />} />
            <Route path="/properties" element={<Properties onOpenConsultation={() => setIsConsultOpen(true)} />} />
            <Route path="/properties/:slug" element={<PropertyDetail onOpenConsultation={() => setIsConsultOpen(true)} />} />
            <Route path="/about" element={<About onOpenConsultation={() => setIsConsultOpen(true)} />} />
            <Route path="/blog" element={<Blog onOpenConsultation={() => setIsConsultOpen(true)} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/talk-to-agent" element={<Contact />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<Home onOpenConsultation={() => setIsConsultOpen(true)} />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Floating WhatsApp Quick Connect */}
        <FloatingWhatsApp />

        {/* Global Consultation Modal */}
        <ConsultModal 
          isOpen={isConsultOpen} 
          onClose={() => setIsConsultOpen(false)} 
        />
      </div>
    </BrowserRouter>
  );
}
