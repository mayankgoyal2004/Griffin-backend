import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Truck, Wrench, Globe, Check, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/websiteData';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ onSelectService }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Staggered cards reveal
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />;
      case 'Truck':
        return <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />;
      default:
        return <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#fbf9f5] py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Subtle vintage architectural background engravings (left & right) */}
      <div className="absolute top-0 left-0 w-80 h-80 pointer-events-none opacity-[0.07] select-none">
        <svg viewBox="0 0 200 200" fill="none" stroke="#142338" strokeWidth="1" className="w-full h-full">
          <path d="M20,180 L20,90 L40,70 L60,90 L60,180 Z" />
          <path d="M40,70 L40,20 L45,15 L50,20 L50,70" />
          <path d="M70,180 L70,110 L90,95 L110,110 L110,180 Z" />
          <path d="M90,95 L90,40 L95,35 L100,40 L100,95" />
          <path d="M120,180 L120,130 L135,115 L150,130 L150,180 Z" />
          <circle cx="45" cy="45" r="4" />
          <circle cx="95" cy="65" r="5" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-[0.07] select-none -scale-x-100">
        <svg viewBox="0 0 200 200" fill="none" stroke="#142338" strokeWidth="1" className="w-full h-full">
          <path d="M20,180 L20,90 L40,70 L60,90 L60,180 Z" />
          <path d="M40,70 L40,20 L45,15 L50,20 L50,70" />
          <path d="M70,180 L70,110 L90,95 L110,110 L110,180 Z" />
          <path d="M90,95 L90,40 L95,35 L100,40 L100,95" />
          <circle cx="45" cy="45" r="4" />
          <circle cx="95" cy="65" r="5" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Heading */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#c57e1b] mb-2.5">
            <span className="w-7 h-[1px] bg-[#c57e1b]" />
            <span>WHAT WE DO</span>
            <span className="w-7 h-[1px] bg-[#c57e1b]" />
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[46px] leading-tight tracking-tight text-[#0b1a2d] mb-3">
            Explore Our Services
          </h2>

          <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed max-w-2xl mx-auto">
            We connect places, people and opportunities through reliable and modern construction solutions.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {servicesData.map((item, idx) => (
            <article
              key={item.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="bg-white border border-[#e8e2d8] rounded-2xl shadow-[0_8px_24px_rgba(27,48,69,0.06)] hover:shadow-[0_16px_36px_rgba(27,48,69,0.12)] transition-all duration-300 flex flex-col group relative overflow-hidden"
            >
              {/* Photo Banner with organic wave overlay */}
              <div className="relative h-44 sm:h-48 w-full rounded-t-2xl overflow-hidden bg-slate-100 select-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Organic wave cutout at the bottom of the photo */}
                <div className="absolute -bottom-[1px] left-0 right-0 h-7 pointer-events-none overflow-hidden leading-none z-10">
                  <svg
                    viewBox="0 0 500 40"
                    preserveAspectRatio="none"
                    className="w-full h-full text-white fill-current"
                  >
                    <path d="M0,22 C120,38 280,6 500,18 L500,40 L0,40 Z" />
                  </svg>
                </div>
              </div>

              {/* Floating Circular Badge on the LEFT, overlapping photo & wave */}
              <div className="relative -mt-6 ml-5 mb-2 z-20 w-fit">
                <div
                  className="w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: item.badgeBg }}
                >
                  {getServiceIcon(item.icon)}
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-1 pb-6 px-5 sm:px-6 flex flex-col flex-1 bg-white">
                {/* Left-aligned Title */}
                <h3 className="font-serif font-bold text-[19px] sm:text-xl text-[#0b1a2d] leading-snug mb-2 tracking-tight">
                  {item.titleLines ? (
                    <>
                      {item.titleLines[0]}
                      <br />
                      {item.titleLines[1]}
                    </>
                  ) : (
                    item.title
                  )}
                </h3>

                {/* Left-aligned Description */}
                <p className="text-xs text-[#64748b] leading-relaxed mb-4 min-h-[36px]">
                  {item.description}
                </p>

                {/* Bullet Points with delicate amber checkmarks */}
                <ul className="space-y-2 mb-6 flex-1">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-[#556477]">
                      <Check className="w-3.5 h-3.5 text-[#d88918] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => onSelectService(item)}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs tracking-wide text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer ${item.btnBg}`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
