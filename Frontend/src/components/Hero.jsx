import React, { useRef, useEffect, useState } from 'react';
import { HardHat, Layers, Users, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const bgImgRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const statsBarRef = useRef(null);

  const [counts, setCounts] = useState({
    years: 10,
    projects: 50,
    clients: 100,
    satisfaction: 100,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.3'
        )
        .fromTo(
          copyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.4'
        )
        .fromTo(
          statsBarRef.current,
          { opacity: 0, y: 25, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          '-=0.2'
        );

      // Numbers counter animation
      const values = { years: 0, projects: 0, clients: 0, satisfaction: 0 };
      gsap.to(values, {
        years: 10,
        projects: 50,
        clients: 100,
        satisfaction: 100,
        duration: 1.8,
        delay: 0.3,
        ease: 'power2.out',
        onUpdate: () => {
          setCounts({
            years: Math.round(values.years),
            projects: Math.round(values.projects),
            clients: Math.round(values.clients),
            satisfaction: Math.round(values.satisfaction),
          });
        },
        onComplete: () => {
          setCounts({ years: 10, projects: 50, clients: 100, satisfaction: 100 });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-[580px] h-[100dvh] max-h-[820px] pt-[76px] sm:pt-[84px] pb-3 sm:pb-5 overflow-hidden flex flex-col justify-between"
    >
      {/* Panoramic Artwork Container: Native high-definition rendering with zero transform blur */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <img
          ref={bgImgRef}
          src="/Griffin-valiue.png"
          alt="Griffin Construction Artwork"
          className="w-full h-full object-cover object-[78%_top] sm:object-[82%_top] md:object-[96%_top] lg:object-[98%_top] xl:object-[96%_top]"
        />

        {/* Localized Left Gradient (Desktop): Soft shading behind text only; cathedral dome, castle, sky & griffin remain 100% clear */}
        <div
          className="absolute inset-y-0 left-0 w-full sm:w-[50%] lg:w-[40%] pointer-events-none hidden md:block"
          style={{
            background:
              'linear-gradient(90deg, rgba(5, 12, 22, 0.82) 0%, rgba(5, 12, 22, 0.60) 42%, rgba(5, 12, 22, 0.15) 75%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Mobile Gradient Overlay */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(5, 12, 22, 0.72) 0%, rgba(5, 12, 22, 0.35) 24%, rgba(5, 12, 22, 0.02) 45%, rgba(5, 12, 22, 0.70) 80%, rgba(5, 12, 22, 0.92) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Main Content Area matching Reference Screenshot */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full relative z-20 my-auto py-2">
        <div className="w-full md:w-[60%] lg:w-[50%] xl:w-[46%] max-w-[540px]">
          {/* Kicker: — BUILDING TOMORROW — */}
          <div
            ref={kickerRef}
            className="flex items-center gap-2.5 text-[10.5px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3"
          >
            <span className="w-7 sm:w-9 h-[1.5px] bg-[#d88918]" />
            <span>BUILDING TOMORROW</span> 
            <span className="w-7 sm:w-9 h-[1.5px] bg-[#d88918]" />
          </div>

          {/* Headline: Your Nest, Our Business. */}
          <h1
            ref={headlineRef}
            className="font-serif font-extrabold text-[36px] sm:text-[46px] md:text-[52px] lg:text-[58px] xl:text-[66px] leading-[1.06] tracking-tight text-white mb-3 sm:mb-3.5 drop-shadow-[0_3px_20px_rgba(0,0,0,0.7)]"
          >
            Your Nest,<br />
            <span className="text-[#d88918] drop-shadow-[0_4px_24px_rgba(216,137,24,0.4)]">
              Our Business.
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p
            ref={copyRef}
            className="text-xs sm:text-sm lg:text-[15.5px] leading-relaxed text-slate-200/90 max-w-[440px] font-normal drop-shadow-sm"
          >
            Construction solutions for residential, commercial and infrastructure projects.
          </p>
        </div>
      </div>

      {/* Floating Glassmorphism Stats Bar anchored cleanly on bottom cobblestones/balustrade */}
      <div
        ref={statsBarRef}
        className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 relative z-20 mb-1 sm:mb-2"
      >
        <div className="bg-[#050f1d]/65 backdrop-blur-xl rounded-2xl sm:rounded-full border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] py-2.5 sm:py-3 px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          {/* Stat 1: Years of Experience */}
          <div className="flex items-center gap-3 sm:gap-3.5 lg:px-6">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#f2ae38]/25 to-[#d88918]/10 border border-[#f2ae38]/35 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(242,174,56,0.15)]">
              <HardHat className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />
            </div>
            <div>
              <div className="font-extrabold text-xl sm:text-2xl lg:text-[25px] text-white tracking-tight leading-none drop-shadow-sm flex items-center">
                <span>{counts.years}</span>
                <span className="text-[#f2ae38] font-bold ml-0.5">+</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 leading-tight tracking-wide">
                Years of Experience
              </div>
            </div>
          </div>

          {/* Stat 2: Projects Completed */}
          <div className="flex items-center gap-3 sm:gap-3.5 lg:px-6">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#f2ae38]/25 to-[#d88918]/10 border border-[#f2ae38]/35 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(242,174,56,0.15)]">
              <Layers className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />
            </div>
            <div>
              <div className="font-extrabold text-xl sm:text-2xl lg:text-[25px] text-white tracking-tight leading-none drop-shadow-sm flex items-center">
                <span>{counts.projects}</span>
                <span className="text-[#f2ae38] font-bold ml-0.5">+</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 leading-tight tracking-wide">
                Projects Completed
              </div>
            </div>
          </div>

          {/* Stat 3: Happy Clients */}
          <div className="flex items-center gap-3 sm:gap-3.5 lg:px-6">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#f2ae38]/25 to-[#d88918]/10 border border-[#f2ae38]/35 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(242,174,56,0.15)]">
              <Users className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />
            </div>
            <div>
              <div className="font-extrabold text-xl sm:text-2xl lg:text-[25px] text-white tracking-tight leading-none drop-shadow-sm flex items-center">
                <span>{counts.clients}</span>
                <span className="text-[#f2ae38] font-bold ml-0.5">+</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 leading-tight tracking-wide">
                Happy Clients
              </div>
            </div>
          </div>

          {/* Stat 4: Quality & Safety */}
          <div className="flex items-center gap-3 sm:gap-3.5 lg:px-6">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#f2ae38]/25 to-[#d88918]/10 border border-[#f2ae38]/35 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(242,174,56,0.15)]">
              <ShieldCheck className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />
            </div>
            <div>
              <div className="font-extrabold text-xl sm:text-2xl lg:text-[25px] text-white tracking-tight leading-none drop-shadow-sm flex items-center">
                <span>{counts.satisfaction}</span>
                <span className="text-[#f2ae38] font-bold ml-0.5">%</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 leading-tight tracking-wide">
                Quality & Safety
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
