import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ArrowRight,
} from 'lucide-react';
import { companyInfo } from '../data/websiteData';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 0.85 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLink = (e, path, hash) => {
    e.preventDefault();

    const isCurrentPage =
      (path === location.pathname && !hash) ||
      (path === '/' && location.pathname === '/' && (!hash || hash === '#home'));

    // 1. If clicking the current page: smoothly glide all the way from bottom to top
    if (isCurrentPage) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 0.85 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // 2. If navigating to a different page or section from the bottom
    const isScrolledDown = window.scrollY > 150;

    if (isScrolledDown) {
      let navigated = false;
      const doNavigate = () => {
        if (navigated) return;
        navigated = true;
        navigate(path + (hash || ''));

        if (hash && hash !== '#home') {
          setTimeout(() => {
            const el = document.getElementById(hash.replace('#', ''));
            if (el) {
              if (window.__lenis) {
                window.__lenis.scrollTo(el, { offset: -70, duration: 0.85 });
              } else {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 120);
        } else {
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
          }
          window.scrollTo(0, 0);
        }
      };

      // Smoothly scroll from bottom to top before completing page redirect
      if (window.__lenis) {
        window.__lenis.scrollTo(0, {
          duration: 0.8,
          onComplete: doNavigate,
        });
        setTimeout(doNavigate, 850);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(doNavigate, 750);
      }
      return;
    }

    // 3. Already at the top of the page: navigate directly
    if (path !== location.pathname) {
      navigate(path + (hash || ''));
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      return;
    }

    // 4. Same page anchor scroll
    if (hash && hash !== '#home') {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -70, duration: 0.85 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 0.85 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#142b45] text-[#eaf0f4] pt-12 pb-6 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* 4 Column Footer Grid matching reference screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 pr-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/', '#home')}
              className="inline-block mb-3 group cursor-pointer"
            >
              <img
                src="/logo-light.png"
                alt="Griffin Construction"
                className="h-13 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>
            <p className="text-xs text-[#aeb9c6] leading-relaxed max-w-[300px] mb-4">
              A trusted construction and real estate company delivering quality, innovation and lasting value.
            </p>
            {/* Social Icons matching design */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#f2ae38] text-white/70 hover:text-[#06111e] flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#f2ae38] text-white/70 hover:text-[#06111e] flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#f2ae38] text-white/70 hover:text-[#06111e] flex items-center justify-center transition-all duration-200"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#f2ae38] text-white/70 hover:text-[#06111e] flex items-center justify-center transition-all duration-200 font-bold text-xs"
                aria-label="X (Twitter)"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="text-[11px] font-bold text-[#f2ae38] uppercase tracking-[0.16em] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Home', path: '/', hash: '#home', isActive: location.pathname === '/' && (!location.hash || location.hash === '#home') },
                { label: 'About', path: '/about', hash: '', isActive: location.pathname === '/about' },
                { label: 'Services', path: '/services', hash: '', isActive: location.pathname.startsWith('/services') },
                { label: 'Projects', path: '/projects', hash: '', isActive: location.pathname === '/projects' },
                { label: 'Team', path: '/team', hash: '', isActive: location.pathname === '/team' },
                { label: 'Blog', path: '/blog', hash: '', isActive: location.pathname === '/blog' },
                { label: 'Contact', path: '/contact', hash: '', isActive: location.pathname === '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path + (item.hash || '')}
                    onClick={(e) => handleLink(e, item.path, item.hash)}
                    className={`transition-colors cursor-pointer ${
                      item.isActive
                        ? 'text-[#f2ae38] font-semibold'
                        : 'text-[#c1cfdb] hover:text-[#f2ae38]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4 className="text-[11px] font-bold text-[#f2ae38] uppercase tracking-[0.16em] mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                {
                  label: 'Real Estate Development',
                  path: '/services/real-estate',
                  isActive: location.pathname === '/services/real-estate',
                },
                {
                  label: 'Transport & Logistics',
                  path: '/services/transport',
                  isActive: location.pathname === '/services/transport',
                },
                {
                  label: 'Site Inspections',
                  path: '/services/inspections',
                  isActive: location.pathname === '/services/inspections',
                },
                {
                  label: 'Websites & Digital',
                  path: '/services/websites',
                  isActive: location.pathname === '/services/websites',
                },
              ].map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLink(e, item.path, '')}
                    className={`flex items-center gap-2 transition-colors cursor-pointer group ${
                      item.isActive
                        ? 'text-[#f2ae38] font-semibold'
                        : 'text-[#c1cfdb] hover:text-[#f2ae38]'
                    }`}
                  >
                    <ArrowRight className="w-3 h-3 text-[#f2ae38] transition-transform group-hover:translate-x-1" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4 className="text-[11px] font-bold text-[#f2ae38] uppercase tracking-[0.16em] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-[#c1cfdb]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#f2ae38] shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#f2ae38] shrink-0" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#f2ae38] shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a9bbc9]">
          <div>
            © {new Date().getFullYear()} Developed and Powered by Vibrantick Infotech Solutions. All Rights Reserved.
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/privacy-policy"
              onClick={(e) => handleLink(e, '/privacy-policy', '')}
              className={`transition-colors cursor-pointer ${
                location.pathname === '/privacy-policy' ? 'text-[#f2ae38] font-semibold' : 'hover:text-white'
              }`}
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="/terms-and-conditions"
              onClick={(e) => handleLink(e, '/terms-and-conditions', '')}
              className={`transition-colors cursor-pointer ${
                location.pathname === '/terms-and-conditions' || location.pathname === '/terms'
                  ? 'text-[#f2ae38] font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>

      {/* Floating Gold Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          type="button"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#f2ae38] hover:bg-[#f8bd59] text-[#142b45] shadow-2xl flex items-center justify-center transition-all hover:-translate-y-1 cursor-pointer focus:outline-none"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </footer>
  );
}
