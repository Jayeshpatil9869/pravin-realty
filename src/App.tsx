import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
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
import { PageRevealAnimation } from './components/PageRevealAnimation';

import { PageTransition } from './components/ui/page-transition';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top upon any route transition or page open using official useLenis hook
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Disable automatic browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetToTop = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetToTop();
    const rafId = requestAnimationFrame(resetToTop);
    const timeoutId = setTimeout(resetToTop, 40);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [pathname, search, hash, lenis]);

  return null;
}

function AnimatedRoutes({ 
  onOpenConsultation, 
  isRevealFinished 
}: { 
  onOpenConsultation: () => void; 
  isRevealFinished: boolean; 
}) {
  const location = useLocation();

  return (
    <PageTransition>
      <Routes location={location}>
        <Route path="/" element={<Home onOpenConsultation={onOpenConsultation} isRevealFinished={isRevealFinished} />} />
        <Route path="/properties" element={<Properties onOpenConsultation={onOpenConsultation} />} />
        <Route path="/properties/:slug" element={<PropertyDetail onOpenConsultation={onOpenConsultation} />} />
        <Route path="/about" element={<About onOpenConsultation={onOpenConsultation} />} />
        <Route path="/blog" element={<Blog onOpenConsultation={onOpenConsultation} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/talk-to-agent" element={<Contact />} />
        {/* Catch-all fallback */}
        <Route path="*" element={<Home onOpenConsultation={onOpenConsultation} isRevealFinished={isRevealFinished} />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [showReveal, setShowReveal] = useState(true);
  const lenisRef = useRef<any>(null);

  // Synchronize Lenis with GSAP ScrollTrigger ticker according to lenis.dev specs
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      (window as unknown as { __lenisInstance?: unknown }).__lenisInstance = lenis;
      lenis.on('scroll', ScrollTrigger.update);
    }

    function updateTicker(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateTicker);
      (window as unknown as { __lenisInstance?: unknown }).__lenisInstance = undefined;
    };
  }, []);

  const handleRevealComplete = () => {
    setShowReveal(false);
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.start();
    }
  };

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
        infinite: false,
      }}
    >
      <BrowserRouter>
        {/* 1. Page-Reveal Intro Animation on Visit */}
        {showReveal && (
          <PageRevealAnimation onComplete={handleRevealComplete} />
        )}

        <ScrollToTop />
        <div className="min-h-screen bg-[#FBFBFB] text-[#121316] flex flex-col font-sans selection:bg-[#FDE8D7] selection:text-[#9A3412]">
          <Header />
          
          <main className="flex-grow flex flex-col">
            <AnimatedRoutes 
              onOpenConsultation={() => setIsConsultOpen(true)} 
              isRevealFinished={!showReveal} 
            />
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
    </ReactLenis>
  );
}


