import React, { useRef, useEffect, useState } from 'react';
import { HardHat, Layers, Users, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { apiClient } from '../api/client';
import { usePageSeo } from '../hooks/usePageSeo';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_STATS = [
  { value: '10+', label: 'Years of Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '100+', label: 'Happy Clients' },
  { value: '100%', label: 'Quality & Safety' },
];

export default function Hero({ pageData: initialPageData, onOpenQuote }) {
  const heroRef = useRef(null);
  const bgImgRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const statsBarRef = useRef(null);
  const [pageData, setPageData] = useState(initialPageData);

  usePageSeo(pageData, 'Griffin Construction | Building a Stronger Tomorrow', pageData?.subtitle);

  useEffect(() => {
    if (initialPageData) {
      setPageData(initialPageData);
    } else {
      let isMounted = true;
      apiClient.getPage('home').then((data) => {
        if (data && isMounted) setPageData(data);
      });
      return () => {
        isMounted = false;
      };
    }
  }, [initialPageData]);

  const statsList =
    Array.isArray(pageData?.stats) && pageData.stats.length > 0
      ? pageData.stats
      : DEFAULT_STATS;

  const parseStat = (val) => {
    if (!val) return { num: null, suffix: '' };
    const str = String(val).trim();
    const match = str.match(/^(\d+)(.*)$/);
    if (match) {
      return { num: parseInt(match[1], 10), suffix: match[2] };
    }
    return { num: null, suffix: '' };
  };

  const [animatedValues, setAnimatedValues] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (kickerRef.current) {
        tl.fromTo(
          kickerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      }
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.3'
        );
      }
      if (copyRef.current) {
        tl.fromTo(
          copyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.4'
        );
      }
      if (statsBarRef.current) {
        tl.fromTo(
          statsBarRef.current,
          { opacity: 0, y: 25, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          '-=0.2'
        );
      }

      // Numbers counter animation
      const initialVals = {};
      const targetVals = {};
      statsList.forEach((stat, i) => {
        const parsed = parseStat(stat.value);
        if (parsed.num !== null) {
          initialVals[`val_${i}`] = 0;
          targetVals[`val_${i}`] = parsed.num;
        }
      });

      if (Object.keys(targetVals).length > 0) {
        gsap.to(initialVals, {
          ...targetVals,
          duration: 1.8,
          delay: 0.3,
          ease: 'power2.out',
          onUpdate: () => {
            const nextVals = {};
            Object.keys(targetVals).forEach((k) => {
              nextVals[k] = Math.round(initialVals[k]);
            });
            setAnimatedValues(nextVals);
          },
          onComplete: () => {
            setAnimatedValues(targetVals);
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [statsList.map((s) => s.value).join(',')]);

  const getStatIcon = (index, label) => {
    const l = (label || '').toLowerCase();
    if (l.includes('year') || l.includes('experience')) {
      return <HardHat className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />;
    }
    if (l.includes('project') || l.includes('deliver') || l.includes('build')) {
      return <Layers className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />;
    }
    if (l.includes('client') || l.includes('customer') || l.includes('people') || l.includes('user')) {
      return <Users className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />;
    }
    if (l.includes('safety') || l.includes('quality') || l.includes('rate') || l.includes('satisfaction')) {
      return <ShieldCheck className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />;
    }
    if (index === 0) return <HardHat className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />;
    if (index === 1) return <Layers className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />;
    if (index === 2) return <Users className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />;
    return <ShieldCheck className="w-5 h-5 text-[#f2ae38] stroke-[2.2]" />;
  };

  const kicker = pageData?.sections?.hero?.kicker ?? "BUILDING TOMORROW";
  const heading = pageData?.sections?.hero?.headline ?? pageData?.heading;
  const subtitle =
    pageData?.sections?.hero?.subtitle ??
    pageData?.subtitle ??
    "Construction solutions for residential, commercial and infrastructure projects.";
  const bgImage = pageData?.heroImage || pageData?.hero_image || "/regal-griffin-hero.png";

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-[580px] h-[100dvh] max-h-[820px] pt-[76px] sm:pt-[84px] pb-3 sm:pb-5 overflow-hidden flex flex-col justify-between"
    >
      {/* Panoramic Artwork Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <img
          ref={bgImgRef}
          src={bgImage}
          alt={heading || "Griffin Construction Artwork"}
          className="w-full h-full object-cover object-[78%_top] sm:object-[82%_top] md:object-[96%_top] lg:object-[98%_top] xl:object-[96%_top]"
        />

        {/* Localized Left Gradient (Desktop) */}
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

      {/* Main Content Area */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full relative z-20 my-auto py-2">
        <div className="w-full md:w-[60%] lg:w-[50%] xl:w-[46%] max-w-[540px]">
          {/* Kicker */}
          {kicker ? (
            <div
              ref={kickerRef}
              className="flex items-center gap-2.5 text-[10.5px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3"
            >
              <span className="w-7 sm:w-9 h-[1.5px] bg-[#d88918]" />
              <span>{kicker}</span>
              <span className="w-7 sm:w-9 h-[1.5px] bg-[#d88918]" />
            </div>
          ) : null}

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-serif font-extrabold text-[36px] sm:text-[46px] md:text-[52px] lg:text-[58px] xl:text-[66px] leading-[1.06] tracking-tight text-white mb-3 sm:mb-3.5 drop-shadow-[0_3px_20px_rgba(0,0,0,0.7)]"
          >
            {heading ? (
              <span className="whitespace-pre-line">{heading}</span>
            ) : (
              <>
                Your Nest,<br />
                <span className="text-[#d88918] drop-shadow-[0_4px_24px_rgba(216,137,24,0.4)]">
                  Our Business.
                </span>
              </>
            )}
          </h1>

          {/* Subtitle / Description */}
          {subtitle && (
            <p
              ref={copyRef}
              className="text-xs sm:text-sm lg:text-[15.5px] leading-relaxed text-slate-200/90 max-w-[440px] font-normal drop-shadow-sm whitespace-pre-line"
            >
              {subtitle}
            </p>
          )}

          {pageData?.description && (
            <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed max-w-[440px] font-normal mt-2 pt-2 border-t border-white/10 drop-shadow-sm whitespace-pre-line">
              {pageData.description}
            </p>
          )}
        </div>
      </div>

      {/* Floating Glassmorphism Stats Bar */}
      <div
        ref={statsBarRef}
        className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 relative z-20 mb-1 sm:mb-2"
      >
        <div className="bg-[#050f1d]/65 backdrop-blur-xl rounded-2xl sm:rounded-full border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] py-2.5 sm:py-3 px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          {statsList.slice(0, 4).map((stat, idx) => {
            const parsed = parseStat(stat.value);
            const currentNum =
              animatedValues[`val_${idx}`] !== undefined
                ? animatedValues[`val_${idx}`]
                : parsed.num;
            const displayVal =
              parsed.num !== null ? `${currentNum}${parsed.suffix}` : (stat.value ?? '');

            return (
              <div key={idx} className="flex items-center gap-3 sm:gap-3.5 lg:px-6">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#f2ae38]/25 to-[#d88918]/10 border border-[#f2ae38]/35 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(242,174,56,0.15)]">
                  {getStatIcon(idx, stat.label)}
                </div>
                <div>
                  <div className="font-extrabold text-xl sm:text-2xl lg:text-[25px] text-white tracking-tight leading-none drop-shadow-sm flex items-center">
                    <span>{displayVal}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 leading-tight tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
