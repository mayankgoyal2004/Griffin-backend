import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Team({ onOpenQuote }) {
  const sectionRef = useRef(null);
  const bannerRef = useRef(null);
  const eagleRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (eagleRef.current) {
        gsap.fromTo(
          eagleRef.current,
          { opacity: 0, x: -25, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 25, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const teamMembers = [
    {
      name: 'Mayank Goyal',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=85',
    },
    {
      name: 'Priya Sharma',
      role: 'Project Director',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=85',
    },
    {
      name: 'Rahul Verma',
      role: 'Chief Engineer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85',
    },
    {
      name: 'Amit Khanna',
      role: 'Operations Head',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=85',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="team"
      className="py-10 sm:py-14 bg-[#ebf0f5] text-[#142338] relative overflow-hidden"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        {/* Full panoramic banner card matching reference */}
        <div
          ref={bannerRef}
          className="relative bg-gradient-to-r from-white from-30% via-[#f7f9fc] via-50% to-[#e5edf5] rounded-3xl border border-[#dce4ee] shadow-[0_12px_40px_rgba(20,38,60,0.07)] overflow-hidden flex flex-col lg:flex-row items-center"
        >
          {/* Left Wing: Eagle Artwork + Text Block in continuous white canvas */}
          <div className="flex flex-col sm:flex-row items-center w-full lg:w-auto shrink-0 relative">
            {/* Eagle Artwork seamlessly blending without border */}
            <div
              ref={eagleRef}
              className="w-full sm:w-[220px] lg:w-[260px] xl:w-[290px] h-[200px] sm:h-[260px] lg:h-[280px] shrink-0 relative overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] sm:[mask-image:linear-gradient(to_right,black_72%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] sm:[-webkit-mask-image:linear-gradient(to_right,black_72%,transparent_100%)]"
            >
              <img
                src="/griffin-team-eagle.jpg"
                alt="Gryfno Eagle Mascot"
                className="w-full h-full object-cover object-left-top select-none"
              />
            </div>

            {/* Intro Copy & Action */}
            <div
              ref={introRef}
              className="py-4 sm:py-6 px-5 sm:px-4 lg:py-6 lg:pl-2 lg:pr-6 max-w-sm shrink-0 flex flex-col justify-center text-center sm:text-left items-center sm:items-start"
            >
              <div className="inline-flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#142338]">
                  OUR TEAM
                </span>
                <span className="w-8 h-[2px] bg-[#d97706]" />
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-[26px] lg:text-[29px] leading-[1.14] text-[#142338] tracking-tight mb-2">
                The People Behind<br />Gryfno Szajka
              </h2>

              <p className="text-xs text-[#52637a] leading-[1.65] mb-4 max-w-[260px]">
                A team of experienced professionals, engineers, and project managers who turn vision into reality.
              </p>

              <div>
                <button
                  onClick={onOpenQuote}
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#142338] bg-[#f0a528] hover:bg-[#e29618] active:scale-95 shadow-sm hover:shadow transition-all cursor-pointer group"
                >
                  <span>Meet Our Team</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Wing: 4 Team Member Cards */}
          <div
            ref={cardsRef}
            className="p-3 sm:p-5 lg:py-6 lg:pr-7 lg:pl-4 flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 w-full items-center"
          >
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-[18px] p-2.5 border border-[#e1e8f0] shadow-[0_8px_20px_rgba(20,38,60,0.06)] hover:shadow-[0_16px_32px_rgba(20,38,60,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Photo */}
                <div className="w-full h-32 sm:h-36 lg:h-[150px] rounded-[13px] overflow-hidden bg-[#e8eef4] relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Info row */}
                <div className="pt-2.5 pb-0.5 px-0.5 flex items-end justify-between gap-1">
                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-xs sm:text-[13px] text-[#142338] leading-tight whitespace-nowrap m-0">
                      {member.name}
                    </h3>
                    <p className="text-[10px] sm:text-[10.5px] text-[#6b7c93] leading-tight mt-0.5 whitespace-nowrap font-medium m-0">
                      {member.role}
                    </p>
                  </div>

                  {/* LinkedIn Icon Badge */}
                  <a
                    href="#team"
                    aria-label={`${member.name} LinkedIn Profile`}
                    className="w-5 h-5 rounded flex items-center justify-center shrink-0 hover:scale-110 transition-transform"
                  >
                    <svg
                      className="w-4 h-4 fill-[#0a66c2]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66-.92 0-1.66.74-1.66 1.66 0 .92.74 1.66 1.66 1.66m1.39 9.94v-8.37H5.07v8.37h2.78Z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
