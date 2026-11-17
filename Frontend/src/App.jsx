import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { apiClient } from './api/client';

import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import Team from './components/Team';
import Advantage from './components/Advantage';
import ContactBanner from './components/ContactBanner';
import Contact from './components/Contact';
import Blog from './components/Blog';
import AboutPage from './components/AboutPage';
import TeamPage from './components/TeamPage';
import ProjectsPage from './components/ProjectsPage';
import ServicesPage from './components/ServicesPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import Footer from './components/Footer';

import QuoteModal from './components/QuoteModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import ServiceDetailModal from './components/ServiceDetailModal';

gsap.registerPlugin(ScrollTrigger);

function HomePage({ handleOpenQuote, setSelectedService, setSelectedProject, showProjects = true }) {
  return (
    <>
      <Hero onOpenQuote={handleOpenQuote} />
      <Services onSelectService={(srv) => setSelectedService(srv)} />
      <About onOpenQuote={handleOpenQuote} />
      {showProjects && <Projects onSelectProject={(prj) => setSelectedProject(prj)} />}
      <Team onOpenQuote={handleOpenQuote} />
      <Advantage />
      <ContactBanner />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const cachedSettings = apiClient.getCachedSettings();
  const [showProjects, setShowProjects] = useState(() => {
    if (cachedSettings) {
      return Boolean(cachedSettings.show_projects ?? cachedSettings.showProjects ?? false);
    }
    return false; // Safe initial state to prevent flash of content
  });
  const [settingsLoading, setSettingsLoading] = useState(() => !cachedSettings);

  useEffect(() => {
    let isMounted = true;
    apiClient
      .getSettings()
      .then((settings) => {
        if (!isMounted || !settings) return;
        const visible = Boolean(settings.show_projects ?? settings.showProjects ?? false);
        setShowProjects(visible);
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setSettingsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      prevent: (node) => {
        return (
          node?.hasAttribute?.('data-lenis-prevent') ||
          Boolean(node?.closest?.('[data-lenis-prevent]')) ||
          Boolean(node?.closest?.('[role="dialog"]'))
        );
      },
    });

    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      delete window.__lenis;
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  // Lock background scroll when any global modal is open
  useEffect(() => {
    const isModalOpen = quoteModalOpen || Boolean(selectedProject) || Boolean(selectedService);
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = '';
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, [quoteModalOpen, selectedProject, selectedService]);

  // Handle hash-based redirect e.g. #contact -> /contact
  useEffect(() => {
    if (window.location.hash === '#contact' || window.location.hash === '#/contact') {
      navigate('/contact');
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigate]);

  // Scroll to top when switching pages
  useEffect(() => {
    if (
      location.pathname === '/contact' ||
      location.pathname === '/blog' ||
      location.pathname === '/about' ||
      location.pathname === '/team' ||
      location.pathname === '/projects' ||
      location.pathname.startsWith('/services') ||
      location.pathname === '/privacy-policy' ||
      location.pathname.startsWith('/terms')
    ) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const handleOpenQuote = () => {
    setQuoteInitialData(null);
    setQuoteModalOpen(true);
  };

  const handleConsultForSimilar = (project) => {
    setQuoteInitialData({
      projectType: project.category,
      message: `Inquiring about building a project similar to ${project.title} (${project.location}).`,
    });
    setQuoteModalOpen(true);
  };

  const handleConsultForService = (service) => {
    setQuoteInitialData({
      projectType: 'residential',
      message: `Inquiring regarding ${service.title} scope and site feasibility.`,
    });
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#111d2c] flex flex-col selection:bg-[#ea8b0d] selection:text-white">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main Header */}
      <Header onOpenQuote={handleOpenQuote} />

      {/* Main Pages: Home and Dedicated Contact Us Page */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                handleOpenQuote={handleOpenQuote}
                setSelectedService={setSelectedService}
                setSelectedProject={setSelectedProject}
                showProjects={showProjects}
              />
            }
          />
          <Route path="/about" element={<AboutPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services/:slug" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
          <Route
            path="/projects"
            element={
              settingsLoading ? (
                <div className="min-h-screen bg-[#071322] flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[#d88918] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : showProjects ? (
                <ProjectsPage onSelectProject={handleConsultForSimilar} onOpenQuote={handleOpenQuote} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/team" element={<TeamPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route
            path="*"
            element={
              <HomePage
                handleOpenQuote={handleOpenQuote}
                setSelectedService={setSelectedService}
                setSelectedProject={setSelectedProject}
                showProjects={showProjects}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer showProjects={showProjects} />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialData={quoteInitialData}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsultForSimilar={handleConsultForSimilar}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onConsultForService={handleConsultForService}
      />
    </div>
  );
}
