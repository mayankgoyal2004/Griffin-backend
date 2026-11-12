import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About({ onOpenQuote }) {
  const sectionRef = useRef(null);
  const mainPhotoRef = useRef(null);
  const insetPhotoRef = useRef(null);
  const copyRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dual-layer photo parallax
      if (mainPhotoRef.current && insetPhotoRef.current) {
        gsap.to(mainPhotoRef.current, {
          y: 28,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.to(insetPhotoRef.current, {
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Copy reveal
      if (copyRef.current) {
        gsap.fromTo(
          copyRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: copyRef.current,
              start: 'top 82%',
            },
          }
        );
      }

      // Right pill list staggered reveal
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-[#eaf0f2] text-[#142b45] py-16 sm:py-20 relative overflow-hidden">
      {/* Subtle radial ambient reflection */}
      <div
        className="absolute -right-12 top-0 w-96 h-full pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,.7), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-9 items-center">
          {/* Column 1: Photos (.about-photos) - 4 cols */}
          <div className="lg:col-span-4 xl:col-span-4 relative h-[275px]">
            {/* Main Photo with polygonal clip-path */}
            <div
              ref={mainPhotoRef}
              className="absolute left-0 top-0 w-[78%] h-full overflow-hidden border-2 border-white shadow-md will-change-transform"
              style={{
                clipPath: 'polygon(17% 0, 100% 0, 84% 100%, 0 100%)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85"
                alt="Contemporary commercial construction"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Small Overlapping Inset Photo */}
            <div
              ref={insetPhotoRef}
              className="absolute right-0 bottom-0 w-[47%] h-[54%] overflow-hidden border-[5px] border-[#142b45] shadow-xl z-10 will-change-transform"
              style={{
                clipPath: 'polygon(17% 0, 100% 0, 83% 100%, 0 100%)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=85"
                alt="Architect reviewing construction plans"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 2: Story & Copy (.about-copy) - 5 cols */}
          <div ref={copyRef} className="lg:col-span-5 xl:col-span-5 space-y-3">
            {/* Kicker */}
            <div className="flex items-center gap-2 text-[9px] tracking-[0.28em] font-extrabold uppercase text-[#a9660d]">
              <span>About Griffin</span>
              <span className="w-12 h-[1px] bg-[#d88918]" />
            </div>

            {/* Headline */}
            <h2 className="font-serif font-bold text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.08] tracking-[-0.03em] text-[#142b45] my-2.5">
              A Construction Partner<br />
              Built on Strength & <span className="text-[#d88918]">Trust</span>
            </h2>

            {/* Paragraph */}
            <p className="text-[11px] leading-[1.8] text-[#52677b] max-w-[440px] m-0 font-normal">
              Griffin Construction is a modern construction and real estate company committed to delivering high-quality, sustainable, and value-driven projects. We combine industry expertise, advanced technology and a commitment to excellence to build spaces that last.
            </p>

            {/* 4 Feature Points */}
            <div className="flex items-center gap-3.5 sm:gap-4 my-4 flex-wrap text-[9px] font-semibold text-[#29445e]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#bd7412] text-[10px]">✦</span>
                <span>Quality First</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#bd7412] text-[10px]">♧</span>
                <span>Expert Team</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#bd7412] text-[10px]">◈</span>
                <span>Sustainable</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#bd7412] text-[10px]">⬡</span>
                <span>On-Time Delivery</span>
              </div>
            </div>

            {/* Button */}
            <div className="pt-1">
              <button
                onClick={onOpenQuote}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[5px] bg-[#f2ae38] hover:bg-[#ffc15a] text-[#182b40] font-extrabold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Learn More</span>
                <span className="text-sm font-bold">→</span>
              </button>
            </div>
          </div>

          {/* Column 3: Stats (.about-stats) - 3 cols */}
          <div ref={listRef} className="lg:col-span-3 xl:col-span-3 lg:border-l border-[rgba(20,43,69,0.2)] lg:pl-6 space-y-4 sm:space-y-5">
            {/* Stat 1 */}
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7 text-[#bd7412] shrink-0">
                <path d="M12 2 4 5v6c0 5 3 8 8 11 5-3 8-6 8-11V5z" />
                <path d="m8 12 3 3 5-6" />
              </svg>
              <div>
                <strong className="block font-serif font-bold text-2xl text-[#bd7412] leading-none">
                  10+
                </strong>
                <span className="text-[9px] text-[#52677b] mt-0.5 block font-medium">
                  Years of Experience
                </span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7 text-[#bd7412] shrink-0">
                <circle cx="9" cy="8" r="4" />
                <path d="M2 21v-2a7 7 0 0 1 14 0v2M17 4a4 4 0 0 1 0 8m2 3a6 6 0 0 1 3 5v1" />
              </svg>
              <div>
                <strong className="block font-serif font-bold text-2xl text-[#bd7412] leading-none">
                  150+
                </strong>
                <span className="text-[9px] text-[#52677b] mt-0.5 block font-medium">
                  Projects Completed
                </span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7 text-[#bd7412] shrink-0">
                <path d="M3 21V8l9-5 9 5v13M8 21v-8h8v8" />
              </svg>
              <div>
                <strong className="block font-serif font-bold text-2xl text-[#bd7412] leading-none">
                  500+
                </strong>
                <span className="text-[9px] text-[#52677b] mt-0.5 block font-medium">
                  Happy Clients
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
