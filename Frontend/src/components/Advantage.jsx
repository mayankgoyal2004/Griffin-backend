import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Advantage() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 88%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      title: 'End-to-End Solutions',
      desc: 'From planning to handover.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7 mx-auto text-[#d68b12]">
          <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      ),
    },
    {
      title: 'Trusted Partnerships',
      desc: 'With leading vendors & experts.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7 mx-auto text-[#d68b12]">
          <circle cx="9" cy="8" r="4" />
          <path d="M2 21v-2a7 7 0 0 1 14 0v2m1-16a4 4 0 0 1 0 8m1 3a6 6 0 0 1 4 5" />
        </svg>
      ),
    },
    {
      title: 'Safety & Compliance',
      desc: 'Highest industry standards.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7 mx-auto text-[#d68b12]">
          <path d="M20 4C10 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16zM4 21c2-5 6-9 12-13" />
        </svg>
      ),
    },
    {
      title: 'Sustainable Build',
      desc: 'For a better tomorrow.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7 mx-auto text-[#d68b12]">
          <path d="M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6z" />
          <path d="m8 12 3 3 5-6" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} id="advantage" className="py-8 sm:py-10 bg-[#fffdfa] border-t border-[#ece7de] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-0">
          {/* Title block */}
          <div className="lg:col-span-4 text-center lg:text-left pr-0 lg:pr-6">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-1.5">
              <span className="w-5 h-[1.5px] bg-[#d88918]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b46e11]">
                Why choose us
              </span>
              <span className="w-5 h-[1.5px] bg-[#d88918]" />
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-[27px] text-[#142b45] tracking-tight leading-snug">
              The Griffin Advantage
            </h2>
          </div>

          {/* 4 Feature Items */}
          <div ref={gridRef} className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4">
            {items.map((item, idx) => (
              <div
                key={item.title}
                className={`px-3 sm:px-5 py-2 text-center ${
                  idx === 0
                    ? 'lg:border-l lg:border-[rgba(23,40,61,0.14)]'
                    : 'border-l border-[rgba(23,40,61,0.14)]'
                }`}
              >
                <div className="mb-2 flex items-center justify-center">{item.icon}</div>
                <strong className="block text-[11px] sm:text-xs font-bold text-[#263f58] mb-0.5 leading-snug">
                  {item.title}
                </strong>
                <span className="text-[10px] sm:text-[11px] text-[#69798a] leading-tight block">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
