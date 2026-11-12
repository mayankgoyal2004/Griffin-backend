import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

function HomePage({ handleOpenQuote, setSelectedService, setSelectedProject }) {
  return (
    <>
      <Hero onOpenQuote={handleOpenQuote} />
      <Services onSelectService={(srv) => setSelectedService(srv)} />
      <About onOpenQuote={handleOpenQuote} />
      <Projects onSelectProject={(prj) => setSelectedProject(prj)} />
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

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

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
              />
            }
          />
          <Route path="/about" element={<AboutPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services/:slug" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/projects" element={<ProjectsPage onSelectProject={handleConsultForSimilar} onOpenQuote={handleOpenQuote} />} />
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
              />
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

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
