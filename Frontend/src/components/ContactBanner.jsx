import React, { useRef, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { companyInfo } from '../data/websiteData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactBanner() {
  const bannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bannerRef.current, {
        backgroundPosition: '50% 75%',
        ease: 'none',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={bannerRef}
      className="relative py-12 sm:py-14 text-white overflow-hidden bg-[#122b43]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(8, 24, 43, 0.94) 0%, rgba(18, 43, 67, 0.72) 50%, rgba(8, 24, 43, 0.92) 100%), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text */}
          <div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight leading-tight mb-2">
              Let’s Build Your <span className="text-[#f2ae38]">Next Project</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#d6dce5] max-w-xl">
              Get in touch with our team for a consultation and a detailed quote.
            </p>
          </div>

          {/* Right Action Buttons matching reference screenshot */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleContactClick}
              type="button"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-[#142338] bg-[#ea8b0d] hover:bg-[#ffb03a] shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#142338] transition-transform group-hover:scale-110" />
              <span>Contact Us →</span>
            </button>

            <a
              href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-[#142338] bg-[#ea8b0d] hover:bg-[#ffb03a] shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#142338] transition-transform group-hover:scale-110" />
              <span>{companyInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
