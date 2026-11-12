import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Info,
  Layers,
  Building2,
  Users,
  FileEdit,
  Mail,
  Truck,
  Wrench,
  Globe,
  Sparkles,
} from 'lucide-react';
import { companyInfo } from '../data/websiteData';

export const SERVICES_DROPDOWN_ITEMS = [
  {
    title: 'Real Estate Development',
    slug: 'real-estate',
    desc: 'Residential & commercial spaces',
    icon: Building2,
  },
  {
    title: 'Transport & Logistics',
    slug: 'transport',
    desc: 'Fleet & heavy material transit',
    icon: Truck,
  },
  {
    title: 'Site Inspections',
    slug: 'inspections',
    desc: 'Quality, safety & compliance audits',
    icon: Wrench,
  },
  {
    title: 'Websites & Digital',
    slug: 'websites',
    desc: 'Modern web platforms & digital branding',
    icon: Globe,
  },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isContactPage = location.pathname === '/contact';
  const isBlogPage = location.pathname === '/blog';
  const isAboutPage = location.pathname === '/about';
  const isTeamPage = location.pathname === '/team';
  const isProjectsPage = location.pathname === '/projects';
  const isServicesPage = location.pathname.startsWith('/services');
  const isPrivacyPage = location.pathname === '/privacy-policy';
  const isTermsPage = location.pathname === '/terms-and-conditions' || location.pathname === '/terms';
  const isDedicatedPage =
    isContactPage ||
    isBlogPage ||
    isAboutPage ||
    isTeamPage ||
    isProjectsPage ||
    isServicesPage ||
    isPrivacyPage ||
    isTermsPage;

  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const dropdownTimerRef = useRef(null);

  const handleDropdownEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    if (isContactPage) {
      setActiveSection('contact');
      return;
    }
    if (isBlogPage) {
      setActiveSection('blog');
      return;
    }
    if (isAboutPage) {
      setActiveSection('about');
      return;
    }
    if (isTeamPage) {
      setActiveSection('team');
      return;
    }
    if (isProjectsPage) {
      setActiveSection('projects');
      return;
    }
    if (isServicesPage) {
      setActiveSection('services');
      return;
    }
    if (isPrivacyPage || isTermsPage) {
      setActiveSection('');
      return;
    }

    const updateActiveSection = () => {
      setIsSticky(window.scrollY > 30);

      // Check URL hash first if present
      const hash = window.location.hash.replace('#', '');
      if (window.scrollY < 80 && (!hash || hash === 'home')) {
        setActiveSection('home');
        return;
      }

      const sections = ['home', 'about', 'services', 'projects', 'team'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }

      setActiveSection('home');
    };

    // Update active section immediately on route or hash change
    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('hashchange', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('hashchange', updateActiveSection);
    };
  }, [
    isContactPage,
    isBlogPage,
    isAboutPage,
    isTeamPage,
    isProjectsPage,
    isServicesPage,
    isPrivacyPage,
    isTermsPage,
    location.pathname,
    location.hash,
  ]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home', icon: Home },
    { label: 'About', href: '/about', id: 'about', icon: Info },
    { label: 'Services', href: '/services', id: 'services', icon: Layers, hasDropdown: true },
    { label: 'Projects', href: '/projects', id: 'projects', icon: Building2 },
    { label: 'Team', href: '/team', id: 'team', icon: Users },
    { label: 'Blog', href: '/blog', id: 'blog', icon: FileEdit },
    { label: 'Contact', href: '/contact', id: 'contact', icon: Mail },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setActiveSection(link.id);

    if (link.id === 'services') {
      if (location.pathname !== '/services') {
        navigate('/services');
      }
      window.scrollTo(0, 0);
      return;
    }

    if (
      link.id === 'contact' ||
      link.id === 'blog' ||
      link.id === 'about' ||
      link.id === 'team' ||
      link.id === 'projects'
    ) {
      const target = `/${link.id}`;
      if (location.pathname !== target) {
        navigate(target);
      }
      window.scrollTo(0, 0);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/#' + link.id);
      setTimeout(() => {
        const el = document.getElementById(link.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(link.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleServiceSelect = (slug) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setActiveSection('services');
    navigate(`/services/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection('home');
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-[68px] z-50 flex items-center ${
          isDedicatedPage ? 'bg-[#06111e] border-b border-white/10' : ''
        }`}
      >
        {/* Only on Home page: provide smooth scroll cross-fade layers */}
        {!isDedicatedPage && (
          <>
            {/* Layer 1: Solid/Glassmorphic dark sticky navbar with border & subtle shadow */}
            <div
              className={`absolute inset-0 bg-[#06111e]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-opacity duration-300 pointer-events-none ${
                isSticky ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Layer 2: Soft transparent gradient fade for top of hero section */}
            <div
              className={`absolute inset-0 bg-gradient-to-b from-[#030914]/85 via-[#030914]/40 to-transparent backdrop-blur-[1.5px] transition-opacity duration-300 pointer-events-none ${
                !isSticky ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        )}

        <div className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 flex items-center justify-between gap-4 relative z-10">
          {/* Brand Logo: Gryfno Szajka 3 Griffins Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center group shrink-0 cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="Gryfno Szajka"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            />
          </a>

          {/* Desktop Nav Links with Stacked Icons */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`group relative flex flex-col items-center justify-center gap-1 py-1 px-1.5 transition-all cursor-pointer ${
                        isActive ? 'text-[#f2ae38]' : 'text-white/95 hover:text-[#f2ae38]'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-all duration-200 group-hover:scale-110 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
                          isActive
                            ? 'text-[#f2ae38] stroke-[2.4] drop-shadow-[0_0_8px_rgba(242,174,56,0.7)]'
                            : 'text-white stroke-[2] group-hover:text-[#f2ae38]'
                        }`}
                      />
                      <div className="flex items-center gap-1 text-[13px] font-bold tracking-wide leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-3 h-3 -ml-0.5 transition-transform duration-200 ${
                            servicesDropdownOpen
                              ? 'rotate-180 text-[#f2ae38]'
                              : isActive
                              ? 'text-[#f2ae38]'
                              : 'text-white/80 group-hover:text-[#f2ae38]'
                          }`}
                        />
                      </div>
                      {/* Active Indicator Underline */}
                      {isActive && (
                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-[#f2ae38] rounded-full shadow-[0_0_8px_rgba(242,174,56,0.9)]" />
                      )}
                    </a>

                    {/* Desktop Dropdown Popover */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 z-50 min-w-[240px] ${
                        servicesDropdownOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                          : 'opacity-0 -translate-y-1.5 pointer-events-none invisible'
                      }`}
                    >
                      <div className="bg-[#081626]/98 backdrop-blur-xl rounded-xl p-1.5 border border-white/12 shadow-[0_15px_35px_rgba(0,0,0,0.55)]">
                        <div className="flex flex-col gap-0.5">
                          {SERVICES_DROPDOWN_ITEMS.map((item) => {
                            const isItemActive = location.pathname === `/services/${item.slug}`;
                            return (
                              <button
                                key={item.slug}
                                type="button"
                                onClick={() => handleServiceSelect(item.slug)}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-[13px] font-medium transition-colors cursor-pointer group/item ${
                                  isItemActive
                                    ? 'bg-[#d88918]/20 text-[#f2ae38] font-semibold'
                                    : 'text-white/85 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span>{item.title}</span>
                                <ChevronRight
                                  className={`w-3.5 h-3.5 transition-transform group-hover/item:translate-x-0.5 ${
                                    isItemActive
                                      ? 'text-[#f2ae38]'
                                      : 'text-white/30 group-hover/item:text-white/70'
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`group relative flex flex-col items-center justify-center gap-1 py-1 px-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#f2ae38]'
                      : 'text-white/95 hover:text-[#f2ae38]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-all duration-200 group-hover:scale-110 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
                      isActive
                        ? 'text-[#f2ae38] stroke-[2.4] drop-shadow-[0_0_8px_rgba(242,174,56,0.7)]'
                        : 'text-white stroke-[2] group-hover:text-[#f2ae38]'
                    }`}
                  />
                  <div className="flex items-center gap-1 text-[13px] font-bold tracking-wide leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    <span>{link.label}</span>
                  </div>
                  {/* Active Indicator Underline matching Reference Screenshot */}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-[#f2ae38] rounded-full shadow-[0_0_8px_rgba(242,174,56,0.9)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Mobile / Phone Number with warm frosted glass pill */}
          <div className="hidden sm:flex items-center">
            <a
              href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold text-white bg-black/35 hover:bg-[#f2ae38] hover:text-[#061220] border border-white/20 hover:border-[#f2ae38] backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
            >
              <Phone className="w-3.5 h-3.5 text-[#f2ae38] transition-colors group-hover:text-[#061220]" />
              <span className="tracking-wide drop-shadow-sm">{companyInfo.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/90 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-[#050e18]/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 w-[280px] h-full bg-[#071322] border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <span className="text-sm font-bold text-white tracking-widest uppercase">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-white/80 hover:text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  const Icon = link.icon;

                  if (link.hasDropdown) {
                    return (
                      <div key={link.id} className="flex flex-col">
                        <div
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#d88918] text-[#071322]'
                              : 'text-white/85 hover:bg-white/5 hover:text-white'
                          }`}
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        >
                          <div className="flex items-center gap-3.5">
                            <Icon className="w-4 h-4" />
                            <span>{link.label}</span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileServicesOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </div>

                        {/* Mobile Services Accordion */}
                        {mobileServicesOpen && (
                          <div className="pl-3 pr-1 py-1 mt-1 space-y-0.5 bg-black/20 rounded-xl border border-white/5">
                            {SERVICES_DROPDOWN_ITEMS.map((sub) => {
                              const isCurrent = location.pathname === `/services/${sub.slug}`;
                              return (
                                <button
                                  key={sub.slug}
                                  type="button"
                                  onClick={() => handleServiceSelect(sub.slug)}
                                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                                    isCurrent
                                      ? 'bg-[#d88918]/25 text-[#f2ae38] font-semibold'
                                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                                  }`}
                                >
                                  <span>{sub.title}</span>
                                  <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#d88918] text-[#071322]'
                          : 'text-white/85 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10">
              <a
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#d88918] to-[#f2ae38] text-[#071322] font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
