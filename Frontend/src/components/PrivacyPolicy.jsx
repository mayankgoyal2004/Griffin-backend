import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  ShieldCheck,
  Cookie,
  Share2,
  FileText,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Lock,
  Scale,
  HelpCircle,
} from "lucide-react";
import { companyInfo } from "../data/websiteData";
import { apiClient } from "../api/client";
import { usePageSeo } from "../hooks/usePageSeo";

const defaultPrivacySections = [
  {
    key: "introduction",
    heading: "Introduction",
    description:
      "At Griffin Construction, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, store, and protect your data when you visit our website, interact with our services, or communicate with us.\n\nBy using our website, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please do not use our website.",
  },
  {
    key: "information-we-collect",
    heading: "Information We Collect",
    description:
      "We may collect the following types of information:\n• Personal information (name, email address, phone number, etc.)\n• Project details and inquiry information\n• Technical information (IP address, browser type, device information)\n• Usage data (pages visited, time spent, etc.)",
  },
  {
    key: "how-we-use-information",
    heading: "How We Use Your Information",
    description:
      "We use the information we collect for the following purposes:\n• To respond to your inquiries and provide requested services\n• To improve our website and user experience\n• To send you updates, news, and relevant information (with your consent)\n• To comply with legal and regulatory requirements",
  },
  {
    key: "data-protection",
    heading: "Data Protection",
    description:
      "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.",
  },
  {
    key: "cookies",
    heading: "Cookies",
    description:
      "Our website may use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can choose to disable cookies through your browser settings, but this may affect some features of our website.",
  },
  {
    key: "third-party-links",
    heading: "Third-Party Links",
    description:
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.",
  },
  {
    key: "changes-to-policy",
    heading: "Changes to This Policy",
    description:
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. Please review this policy periodically to stay informed about how we are protecting your information.",
  },
  {
    key: "contact-us",
    heading: "Contact Us",
    description:
      "If you have any questions or concerns about this Privacy Policy, please contact us at info@griffinconstruction.in or call +91 98765 43210.\n\nMohali, Punjab, India",
  },
];

function getSectionIcon(heading = "") {
  const h = heading.toLowerCase();
  if (h.includes("user") || h.includes("collect") || h.includes("information")) return User;
  if (h.includes("use") || h.includes("purpose") || h.includes("setting")) return Settings;
  if (h.includes("protect") || h.includes("security") || h.includes("safety")) return ShieldCheck;
  if (h.includes("cookie")) return Cookie;
  if (h.includes("third") || h.includes("share") || h.includes("link")) return Share2;
  if (h.includes("change") || h.includes("update") || h.includes("terms") || h.includes("policy")) return FileText;
  if (h.includes("contact") || h.includes("touch") || h.includes("reach") || h.includes("mail")) return Mail;
  if (h.includes("legal") || h.includes("rights")) return Scale;
  return ShieldCheck;
}

function renderSectionBody(description = "") {
  if (!description) return null;
  const blocks = String(description).split(/\n\n+/);

  return (
    <div className="space-y-3 text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
      {blocks.map((block, i) => {
        const lines = block
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);
        const isBulletList =
          lines.length > 0 &&
          lines.every(
            (l) => l.startsWith("•") || l.startsWith("-") || l.startsWith("*")
          );

        if (isBulletList) {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5 text-[#556477]">
              {lines.map((item, idx) => (
                <li key={idx}>{item.replace(/^[•\-\*]\s*/, "")}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="whitespace-pre-line">
            {block}
          </p>
        );
      })}
    </div>
  );
}

function formatUpdatedDate(val) {
  if (!val) return "NOV 6, 2026";
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return String(val).toUpperCase();
    return d
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  } catch {
    return String(val).toUpperCase();
  }
}

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);

  usePageSeo(pageData, "Privacy Policy", pageData?.subtitle);

  useEffect(() => {
    let isMounted = true;
    apiClient.getPage("privacy-policy").then((data) => {
      if (data && isMounted) {
        setPageData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLink = (path, hash) => {
    if (path === location.pathname && !hash) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 0.85 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (window.scrollY > 150) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, {
          duration: 0.6,
          onComplete: () => {
            navigate(path + (hash || ""));
            window.scrollTo(0, 0);
          },
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          navigate(path + (hash || ""));
          window.scrollTo(0, 0);
        }, 500);
      }
    } else {
      navigate(path + (hash || ""));
      window.scrollTo(0, 0);
    }
  };

  const quickLinks = [
    { label: "About Us", path: "/about", hash: "" },
    { label: "Services", path: "/", hash: "#services" },
    { label: "Projects", path: "/", hash: "#projects" },
    { label: "Team", path: "/", hash: "#team" },
    { label: "Blog", path: "/blog", hash: "" },
    { label: "Contact", path: "/contact", hash: "" },
  ];

  const rawSections =
    Array.isArray(pageData?.sections) && pageData.sections.length > 0
      ? pageData.sections
      : defaultPrivacySections;

  const lastUpdated = formatUpdatedDate(
    pageData?.lastRevised || pageData?.last_revised || pageData?.updatedAt
  );

  return (
    <div className="relative w-full pt-[68px] bg-[#faf7f2] text-[#111d2c] min-h-[calc(100vh-68px)]">
      {/* 1. TOP HERO BANNER */}
      <section className="relative w-full overflow-hidden flex items-center bg-[#faf7f2] min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]">
        {/* Panoramic Cityscape Artwork with Griffin */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <img
            src={pageData?.heroImage || pageData?.hero_image || "/Golden-Riverside-Castle.png"}
            alt="Griffin Privacy Policy Banner"
            className="w-full h-full object-cover object-[85%_top] sm:object-[right_top] md:object-[right_top]"
            onError={(e) => {
              e.currentTarget.src = "/Golden-Riverside-Castle.png";
            }}
          />
        </div>

        {/* Mobile Soft Shading for Text Legibility */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(250, 247, 242, 0.95) 0%, rgba(250, 247, 242, 0.85) 55%, rgba(250, 247, 242, 0.4) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Banner Text Content */}
        <div className="max-w-[1240px] w-full mx-auto px-5 sm:px-8 relative z-10 py-10 sm:py-12 md:py-16">
          <div className="max-w-[520px]">
            {/* Kicker: — PRIVACY POLICY — */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
              <span>PRIVACY POLICY</span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
            </div>

            {/* Heading: Privacy Policy */}
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[44px] text-[#0c1f38] tracking-tight leading-[1.12] mb-3">
              {pageData?.heading || pageData?.title || "Privacy Policy"}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed max-w-[460px]">
              {pageData?.subtitle ||
                "Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN POLICY CONTENT WITH MONOCHROME GRIFFIN WATERMARK */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Elegant Monochrome Griffin Profile Watermark in bottom right */}
        <div
          className="absolute right-0 bottom-0 pointer-events-none select-none z-0 w-[500px] sm:w-[650px] lg:w-[820px] max-w-[90vw] opacity-[0.08] mix-blend-multiply transition-opacity"
          aria-hidden="true"
        >
          <img
            src="/Elegant-Monochrome-Griffin-Profile.png"
            alt=""
            className="w-full h-auto object-contain object-right-bottom"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Dynamic Policy Sections */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              {rawSections.map((sec, idx) => {
                const IconComponent = getSectionIcon(sec.heading);
                const isFirst = idx === 0;
                const isContact = (sec.heading || "").toLowerCase().includes("contact");

                if (isFirst) {
                  return (
                    <div key={sec.key || idx}>
                      <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#d88918] mb-2">
                        <span className="w-5 h-[1.5px] bg-[#d88918]" />
                        <span>LAST UPDATED: {lastUpdated}</span>
                      </div>
                      <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0c1f38] mb-4">
                        {sec.heading}
                      </h2>
                      {renderSectionBody(sec.description)}
                    </div>
                  );
                }

                if (isContact) {
                  return (
                    <div
                      key={sec.key || idx}
                      className="pt-2 border-t border-[#ece4d6] pt-8"
                    >
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                          <IconComponent className="w-5 h-5 stroke-[2]" />
                        </div>
                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                          {sec.heading}
                        </h3>
                      </div>
                      <div className="pl-0 sm:pl-[54px]">
                        {renderSectionBody(sec.description)}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={sec.key || idx} className="pt-2">
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                        <IconComponent className="w-5 h-5 stroke-[2]" />
                      </div>
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                        {sec.heading}
                      </h3>
                    </div>
                    <div className="pl-0 sm:pl-[54px]">
                      {renderSectionBody(sec.description)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Sidebar with Quick Links & Trust Box */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[90px]">
              {/* Quick Links Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd3] shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#d88918] mb-4">
                  <span className="w-4 h-[1.5px] bg-[#d88918]" />
                  <span>QUICK LINKS</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {quickLinks.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => handleLink(link.path, link.hash)}
                      className="w-full py-3 flex items-center justify-between text-xs sm:text-sm text-[#2b3a4a] hover:text-[#d88918] font-medium transition-colors cursor-pointer group text-left"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#d88918] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Your Trust Our Priority Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd3] shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] mb-4 shadow-xs">
                  <Lock className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0c1f38] mb-2 leading-snug">
                  Your Trust <br />
                  Our Priority
                </h3>
                <p className="text-xs sm:text-sm text-[#556477] leading-relaxed">
                  We value your privacy and are committed to keeping your information safe and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
