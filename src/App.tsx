import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DataProvider } from './context/DataContext';

// Public Pages
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConsultModal } from './components/ConsultModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PageRevealAnimation } from './components/PageRevealAnimation';
import { PageTransition } from './components/ui/page-transition';
import { ErrorBoundary } from './components/ErrorBoundary';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProperties } from './pages/admin/AdminProperties';
import { AdminBlog } from './pages/admin/AdminBlog';
import { AdminTeam } from './pages/admin/AdminTeam';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminSettings } from './pages/admin/AdminSettings';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top upon any route transition or page open using official useLenis hook
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
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

function AdminGuard({ children }: { children: React.ReactNode }) {
  const isAuth = localStorage.getItem('pr_admin_auth') === 'true';
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout>{children}</AdminLayout>;
}

function MainAppRoutes() {
  const location = useLocation();
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [showReveal, setShowReveal] = useState(true);
  const lenisRef = useRef<any>(null);

  const isAdminRoute = location.pathname.startsWith('/admin');

  // Synchronize Lenis with GSAP ScrollTrigger ticker according to lenis.dev specs
  useEffect(() => {
    if (isAdminRoute) return;

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
  }, [isAdminRoute]);

  const handleRevealComplete = () => {
    setShowReveal(false);
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.start();
    }
  };

  // If inside Admin CMS Portal
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
        <Route path="/admin/properties" element={<AdminGuard><AdminProperties /></AdminGuard>} />
        <Route path="/admin/blog" element={<AdminGuard><AdminBlog /></AdminGuard>} />
        <Route path="/admin/team" element={<AdminGuard><AdminTeam /></AdminGuard>} />
        <Route path="/admin/testimonials" element={<AdminGuard><AdminTestimonials /></AdminGuard>} />
        <Route path="/admin/leads" element={<AdminGuard><AdminLeads /></AdminGuard>} />
        <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
      </Routes>
    );
  }

  // Public Facing Website Layout
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
      {/* 1. Page-Reveal Intro Animation on Initial Visit */}
      {showReveal && (
        <PageRevealAnimation onComplete={handleRevealComplete} />
      )}

      <ScrollToTop />
      <div className="min-h-screen bg-[#FBFBFB] text-[#121316] flex flex-col font-sans selection:bg-[#FDE8D7] selection:text-[#9A3412]">
        <Header />
        
        <main className="flex-grow flex flex-col">
          <PageTransition>
            <Routes location={location}>
              <Route path="/" element={<Home onOpenConsultation={() => setIsConsultOpen(true)} isRevealFinished={!showReveal} />} />
              <Route path="/properties" element={<Properties onOpenConsultation={() => setIsConsultOpen(true)} />} />
              <Route path="/properties/:slug" element={<PropertyDetail onOpenConsultation={() => setIsConsultOpen(true)} />} />
              <Route path="/about" element={<About onOpenConsultation={() => setIsConsultOpen(true)} />} />
              <Route path="/blog" element={<Blog onOpenConsultation={() => setIsConsultOpen(true)} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/talk-to-agent" element={<Contact />} />
              {/* Catch-all 404 Not Found */}
              <Route path="*" element={<NotFound onOpenConsultation={() => setIsConsultOpen(true)} />} />
            </Routes>
          </PageTransition>
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
    </ReactLenis>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <DataProvider>
        <BrowserRouter>
          <MainAppRoutes />
        </BrowserRouter>
      </DataProvider>
    </ErrorBoundary>
  );
}
