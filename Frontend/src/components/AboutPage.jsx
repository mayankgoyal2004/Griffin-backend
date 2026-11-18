import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import { usePageSeo } from '../hooks/usePageSeo';
import {
  Layers,
  ShieldCheck,
  Users2,
  Building2,
  Users,
  HardHat,
  Award,
  Target,
  Eye,
  Gem,
  Handshake,
  Leaf,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Star,
} from 'lucide-react';

const defaultAboutData = {
  story: {
    kicker: "OUR STORY",
    heading: "A Trusted Partner in Construction",
    description:
      "Griffin Construction is a modern construction and real estate company focused on delivering high-quality, sustainable, and future-ready spaces. With a strong commitment to quality, innovation, and timely delivery, we bring ideas to life — from concept to completion.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
    inset_image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=85",
    pillars: [
      { title: "Quality Construction", icon: "layers" },
      { title: "Reliable Execution", icon: "shield" },
      { title: "Client-Centric Approach", icon: "users" },
    ],
  },
  stats: [
    { value: "50+", label: "Projects Completed", icon: "building" },
    { value: "100+", label: "Happy Clients", icon: "users" },
    { value: "10+", label: "Years of Experience", icon: "hardhat" },
    { value: "98%", label: "Project Success Rate", icon: "award" },
  ],
  mission_vision: {
    kicker: "OUR MISSION & VISION",
    heading: "Driven by Purpose, Built for the Future",
    description:
      "Our mission is to deliver exceptional construction solutions while our vision is to build a better, more sustainable built environment for future generations.",
    mission_title: "Our Mission",
    mission_description:
      "To deliver high-quality, safe, and sustainable construction solutions that exceed client expectations.",
    vision_title: "Our Vision",
    vision_description:
      "To be a leading construction company known for trust, innovation, and lasting value.",
  },
  core_values: {
    kicker: "OUR CORE VALUES",
    heading: "The Principles That Guide Us",
    items: [
      {
        title: "Integrity",
        description: "We build trust through honest and transparent practices.",
        icon: "gem",
      },
      {
        title: "Quality",
        description: "We never compromise on the quality of our work.",
        icon: "handshake",
      },
      {
        title: "Sustainability",
        description:
          "We create spaces that are environmentally responsible and future-ready.",
        icon: "leaf",
      },
      {
        title: "People First",
        description:
          "We value our clients, partners, and team, and grow together with them.",
        icon: "users",
      },
    ],
  },
  cta: {
    heading: "Let's Build Something Great Together",
    description: "Have a project in mind? Get in touch with our team today.",
    button_text: "Contact Us",
    button_link: "/contact",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
};

function getPillarIcon(iconName = "", title = "") {
  const key = `${iconName} ${title}`.toLowerCase();
  if (key.includes("layer") || key.includes("quality")) return Layers;
  if (key.includes("shield") || key.includes("reliable") || key.includes("safe")) return ShieldCheck;
  if (key.includes("user") || key.includes("client") || key.includes("people")) return Users2;
  if (key.includes("award") || key.includes("star")) return Award;
  return Layers;
}

function getStatIcon(iconName = "", index = 0) {
  const key = (iconName || "").toLowerCase();
  if (key.includes("build")) return Building2;
  if (key.includes("user") || key.includes("client")) return Users;
  if (key.includes("hat") || key.includes("year") || key.includes("exp")) return HardHat;
  if (key.includes("award") || key.includes("rate") || key.includes("succ")) return Award;
  const fallbacks = [Building2, Users, HardHat, Award];
  return fallbacks[index % fallbacks.length];
}

function getValueIcon(iconName = "", title = "") {
  const key = `${iconName} ${title}`.toLowerCase();
  if (key.includes("gem") || key.includes("integrity")) return Gem;
  if (key.includes("hand") || key.includes("quality") || key.includes("trust")) return Handshake;
  if (key.includes("leaf") || key.includes("sustain") || key.includes("green")) return Leaf;
  if (key.includes("user") || key.includes("people") || key.includes("team")) return Users;
  if (key.includes("award") || key.includes("excel")) return Award;
  return Star;
}

export default function AboutPage({ onOpenQuote }) {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);

  usePageSeo(pageData, 'About Us', pageData?.subtitle);

  useEffect(() => {
    let isMounted = true;
    apiClient.getPage('about').then((data) => {
      if (data && isMounted) setPageData(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleContactClick = (link = "/contact") => {
    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      navigate(link);
      window.scrollTo(0, 0);
    }
  };

  const bannerImg = pageData?.heroImage || pageData?.hero_image || '/Golden-Riverside-Castle.png';
  const pageHeading = pageData?.heading || 'About Us';
  const pageSubtitle = pageData?.subtitle || 'Building spaces that create lasting value for people, businesses, and communities.';

  // Resolve sections data
  const rawSections = pageData?.sections;
  let sectionsObj = {};
  if (rawSections && typeof rawSections === 'object' && !Array.isArray(rawSections)) {
    sectionsObj = rawSections;
  } else if (Array.isArray(rawSections)) {
    rawSections.forEach((s) => {
      if (s?.key) sectionsObj[s.key] = s;
    });
  }

  const story = sectionsObj.story || defaultAboutData.story;
  const missionVision = sectionsObj.mission_vision || defaultAboutData.mission_vision;
  const coreValues = sectionsObj.core_values || defaultAboutData.core_values;
  const cta = sectionsObj.cta || defaultAboutData.cta;

  const statsList =
    Array.isArray(pageData?.stats) && pageData.stats.length > 0
      ? pageData.stats
      : defaultAboutData.stats;

  const storyPillars =
    Array.isArray(story.pillars) && story.pillars.length > 0
      ? story.pillars
      : defaultAboutData.story.pillars;

  const valueItems =
    Array.isArray(coreValues.items) && coreValues.items.length > 0
      ? coreValues.items
      : defaultAboutData.core_values.items;

  return (
    <div className="relative w-full pt-[68px] bg-[#faf7f2] text-[#111d2c] min-h-[calc(100vh-68px)]">
      {/* 1. TOP HERO BANNER */}
      <section className="relative w-full overflow-hidden flex items-center bg-[#faf7f2] min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]">
        {/* Panoramic Cityscape Artwork with Griffin */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <img
            src={bannerImg}
            alt={pageHeading}
            className="w-full h-full object-cover object-[85%_top] sm:object-[right_top] md:object-[right_top]"
            onError={(e) => {
              e.currentTarget.src = '/Golden-Riverside-Castle.png';
            }}
          />
        </div>

        {/* Mobile Soft Shading for Text Legibility */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background:
              'linear-gradient(90deg, rgba(250, 247, 242, 0.95) 0%, rgba(250, 247, 242, 0.85) 55%, rgba(250, 247, 242, 0.4) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Banner Text Content */}
        <div className="max-w-[1240px] w-full mx-auto px-5 sm:px-8 relative z-10 py-10 sm:py-12 md:py-16">
          <div className="max-w-[480px]">
            {/* Kicker: — ABOUT GRIFFIN — */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
              <span>ABOUT GRIFFIN</span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
            </div>

            {/* Heading: About Us */}
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[44px] text-[#0c1f38] tracking-tight leading-[1.12] mb-3">
              {pageHeading}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed max-w-[430px]">
              {pageSubtitle}
            </p>

            {/* Description (optional additional info) */}
            {pageData?.description && (
              <p className="text-xs sm:text-sm text-[#718296] leading-relaxed max-w-[480px] mt-2.5 pt-2.5 border-t border-[#ece4d6]">
                {pageData.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#faf7f2] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Overlapping Photo Composition with Gold Border Accent */}
            <div className="lg:col-span-6 relative pb-10 sm:pb-12 lg:pb-8 pr-4 sm:pr-8">
              {/* Outer Golden Accent Frame */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-[85%] h-[85%] rounded-3xl border-2 border-[#d88918]/40 pointer-events-none" />

              {/* Main Photo: Modern Glass Commercial Building */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-200 z-10 border border-[#e8dfd3]">
                <img
                  src={
                    story.image ||
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85"
                  }
                  alt={story.heading || "Griffin Construction Project"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/Golden-Riverside-Castle.png';
                  }}
                />
              </div>

              {/* Overlapping Inset Card: Construction Site */}
              <div className="absolute -bottom-2 right-0 sm:right-2 w-[58%] sm:w-[52%] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border-4 border-[#faf7f2] z-20 bg-slate-100">
                <img
                  src={
                    story.inset_image ||
                    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=85"
                  }
                  alt={story.heading || "Griffin Site"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=85';
                  }}
                />
              </div>
            </div>

            {/* Right: Story Content & Badges */}
            <div className="lg:col-span-6">
              {/* Kicker */}
              {story.kicker ? (
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2 sm:mb-2.5">
                  <span className="w-5 sm:w-6 h-[1.5px] bg-[#d88918]" />
                  <span>{story.kicker}</span>
                </div>
              ) : null}

              {/* Heading */}
              {story.heading ? (
                <h2 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-[36px] text-[#0c1f38] leading-tight tracking-tight mb-4 sm:mb-5">
                  {story.heading}
                </h2>
              ) : null}

              {/* Narrative */}
              {story.description ? (
                <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed mb-8 whitespace-pre-line">
                  {story.description}
                </p>
              ) : null}

              {/* Pillars / Feature Row */}
              {storyPillars.length > 0 && (
                <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2 border-t border-[#ece4d6]">
                  {storyPillars.map((pillar, idx) => {
                    const PillarIcon = getPillarIcon(pillar.icon, pillar.title);
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center sm:items-start text-center sm:text-left pt-3"
                      >
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#faebd7]/70 flex items-center justify-center text-[#d88918] mb-2.5 shadow-sm">
                          <PillarIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#0c1f38] leading-snug">
                          {pillar.title}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DARK NAVY STATS STRIP */}
      {statsList.length > 0 && (
        <section className="bg-[#081626] text-white py-10 sm:py-12 relative overflow-hidden">
          {/* Subtle Griffin Watermark */}
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.06] w-64 sm:w-80 h-auto">
            <img src="/logo-mark.png" alt="" className="w-full h-auto" />
          </div>

          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {statsList.map((stat, idx) => {
                const StatIcon = getStatIcon(stat.icon, idx);
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-6 text-center flex flex-col items-center"
                  >
                    <StatIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#d88918] mb-2 stroke-[1.8]" />
                    <div className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#d88918] mb-1 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#aeb9c6] font-medium tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. MISSION & VISION SECTION */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#faf7f2] relative">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Header & Intro */}
            <div className="lg:col-span-5">
              {missionVision.kicker ? (
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2 sm:mb-2.5">
                  <span className="w-5 sm:w-6 h-[1.5px] bg-[#d88918]" />
                  <span>{missionVision.kicker}</span>
                </div>
              ) : null}
              {missionVision.heading ? (
                <h2 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-[36px] text-[#0c1f38] leading-tight tracking-tight mb-4">
                  {missionVision.heading}
                </h2>
              ) : null}
              {missionVision.description ? (
                <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed whitespace-pre-line">
                  {missionVision.description}
                </p>
              ) : null}
            </div>

            {/* Right: 2 Cards Side by Side */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Mission Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd3] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] mb-4 shadow-sm">
                    <Target className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0c1f38] mb-2">
                    {missionVision.mission_title || "Our Mission"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#556477] leading-relaxed whitespace-pre-line">
                    {missionVision.mission_description}
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd3] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] mb-4 shadow-sm">
                    <Eye className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0c1f38] mb-2">
                    {missionVision.vision_title || "Our Vision"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#556477] leading-relaxed whitespace-pre-line">
                    {missionVision.vision_description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR CORE VALUES SECTION */}
      <section className="pb-16 sm:pb-20 lg:pb-24 bg-[#faf7f2] relative">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          {/* Section Header */}
          <div className="mb-10 sm:mb-12">
            {coreValues.kicker ? (
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2">
                <span className="w-5 sm:w-6 h-[1.5px] bg-[#d88918]" />
                <span>{coreValues.kicker}</span>
              </div>
            ) : null}
            {coreValues.heading ? (
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-[36px] text-[#0c1f38] leading-tight tracking-tight">
                {coreValues.heading}
              </h2>
            ) : null}
          </div>

          {/* Value Pillars in Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {valueItems.map((val, idx) => {
              const ValueIcon = getValueIcon(val.icon, val.title);
              return (
                <div key={idx} className="flex flex-col items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#faebd7]/70 flex items-center justify-center text-[#d88918] mb-3 shadow-xs">
                    <ValueIcon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#0c1f38] mb-1.5">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#556477] leading-relaxed whitespace-pre-line">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="relative overflow-hidden bg-[#081626] text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left: Building Image with Angled Cut */}
          <div className="md:col-span-4 lg:col-span-3 relative h-48 md:h-full min-h-[160px] overflow-hidden">
            <img
              src={
                cta.image ||
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              }
              alt={cta.heading || "Griffin Architecture"}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = '/Golden-Riverside-Castle.png';
              }}
            />
            {/* Shading overlay into the dark banner */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#081626]" />
          </div>

          {/* Right: Content & CTA Action */}
          <div className="md:col-span-8 lg:col-span-9 p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-white mb-1.5">
                {cta.heading || "Let's Build Something Great Together"}
              </h2>
              <p className="text-xs sm:text-sm text-[#aeb9c6]">
                {cta.description ||
                  "Have a project in mind? Get in touch with our team today."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleContactClick(cta.button_link || "/contact")}
              className="shrink-0 bg-[#d88918] hover:bg-[#c27912] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-md cursor-pointer group"
            >
              <span>{cta.button_text || "Contact Us"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
