import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Layers,
  HardHat,
  Users,
  Link as LinkIcon,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Handshake,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { companyInfo } from "../data/websiteData";
import { apiClient } from "../api/client";
import { usePageSeo } from "../hooks/usePageSeo";

const defaultTermsSections = [
  {
    key: "introduction",
    heading: "1. Introduction",
    description:
      "These Terms & Conditions (\"Terms\") govern your use of the Griffin Construction website (\"Website\") and the services, information, and content provided by Griffin Construction (\"Company\", \"we\", \"our\", \"us\"). By accessing or using our Website, you agree to be bound by these Terms.",
  },
  {
    key: "use-of-website",
    heading: "2. Use of the Website",
    description:
      "You agree to use the Website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of the Website.",
  },
  {
    key: "services",
    heading: "3. Services",
    description:
      "Griffin Construction provides construction, real estate development, and related services. The information on the Website is for general informational purposes only and does not constitute a binding offer or contract.",
  },
  {
    key: "intellectual-property",
    heading: "4. Intellectual Property",
    description:
      "All content on this Website, including text, images, logos, graphics, and design, is the property of Griffin Construction or its licensors and is protected by applicable copyright, trademark, and intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission.",
  },
  {
    key: "user-submissions",
    heading: "5. User Submissions",
    description:
      "If you submit any inquiry, feedback, or information through our contact forms, you agree that the information you provide is accurate and complete. We may use this information to respond to your inquiry and provide relevant services.",
  },
  {
    key: "third-party-links",
    heading: "6. Third-Party Links",
    description:
      "Our Website may contain links to third-party websites for your convenience. We are not responsible for the content, policies, or practices of these external websites.",
  },
  {
    key: "disclaimer",
    heading: "7. Disclaimer",
    description:
      "The information on this Website is provided \"as is\" and \"as available.\" While we strive to keep the information accurate and up to date, we make no warranties, express or implied, regarding the completeness, accuracy, or reliability of any content.",
  },
  {
    key: "limitation-of-liability",
    heading: "8. Limitation of Liability",
    description:
      "To the fullest extent permitted by law, Griffin Construction shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Website or our services.",
  },
  {
    key: "changes-to-terms",
    heading: "9. Changes to These Terms",
    description:
      "We may update these Terms from time to time. Any changes will be posted on this page with the updated \"Last Updated\" date. Your continued use of the Website after such changes constitutes your acceptance of the revised Terms.",
  },
  {
    key: "contact-us",
    heading: "10. Contact Us",
    description:
      "If you have any questions about these Terms & Conditions, please contact us at info@griffinconstruction.in or call +91 98765 43210.\n\nMohali, Punjab, India",
  },
];

function getTermsIcon(heading = "") {
  const h = heading.toLowerCase();
  if (h.includes("intro")) return FileText;
  if (h.includes("use") || h.includes("website")) return Layers;
  if (h.includes("service")) return HardHat;
  if (h.includes("property") || h.includes("intellectual")) return FileText;
  if (h.includes("submission") || h.includes("user")) return Users;
  if (h.includes("link") || h.includes("third")) return LinkIcon;
  if (h.includes("disclaimer")) return ShieldCheck;
  if (h.includes("liability") || h.includes("limit")) return AlertTriangle;
  if (h.includes("change") || h.includes("update")) return RefreshCw;
  if (h.includes("contact") || h.includes("touch")) return Mail;
  return FileText;
}

function renderTermsBody(description = "") {
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

export default function TermsAndConditions() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);

  usePageSeo(pageData, "Terms & Conditions", pageData?.subtitle);

  useEffect(() => {
    let isMounted = true;
    apiClient.getPage("terms").then((data) => {
      if (data && isMounted) {
        setPageData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleContactClick = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -90, duration: 0.8 });
      } else {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const rawSections =
    Array.isArray(pageData?.sections) && pageData.sections.length > 0
      ? pageData.sections
      : defaultTermsSections;

  const sectionsList = rawSections.map((s, idx) => {
    const rawKey = s.key || (s.heading || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `section-${idx + 1}`;
    const cleanLabel = (s.heading || `Section ${idx + 1}`).replace(/^\d+[\.\)]\s*/, "");
    return {
      id: rawKey,
      label: cleanLabel,
      heading: s.heading,
      description: s.description,
    };
  });

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
            alt="Griffin Terms & Conditions Banner"
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
            {/* Kicker: — TERMS & CONDITIONS — */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
              <span>TERMS &amp; CONDITIONS</span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
            </div>

            {/* Heading */}
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[44px] text-[#0c1f38] tracking-tight leading-[1.12] mb-3">
              {pageData?.heading || pageData?.title || "Terms & Conditions"}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed max-w-[460px]">
              {pageData?.subtitle ||
                "Please read these terms and conditions carefully before using our website."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN TERMS CONTENT WITH MONOCHROME GRIFFIN WATERMARK */}
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
            {/* Left Column: Numbered Terms Sections */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              {sectionsList.map((sec, idx) => {
                const IconComponent = getTermsIcon(sec.heading);
                const isFirst = idx === 0;
                const isContact = (sec.heading || "").toLowerCase().includes("contact");

                if (isFirst) {
                  return (
                    <div key={sec.id} id={sec.id} className="scroll-mt-24">
                      <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#d88918] mb-2">
                        <span className="w-5 h-[1.5px] bg-[#d88918]" />
                        <span>LAST UPDATED: {lastUpdated}</span>
                      </div>
                      <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0c1f38] mb-4">
                        {sec.heading}
                      </h2>
                      {renderTermsBody(sec.description)}
                    </div>
                  );
                }

                if (isContact) {
                  return (
                    <div
                      key={sec.id}
                      id={sec.id}
                      className="scroll-mt-24 pt-2 border-t border-[#ece4d6] pt-8"
                    >
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                          <IconComponent className="w-5 h-5 stroke-[2]" />
                        </div>
                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                          {sec.heading}
                        </h3>
                      </div>
                      <div className="pl-0 sm:pl-[54px]">
                        {renderTermsBody(sec.description)}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-24 pt-2"
                  >
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                        <IconComponent className="w-5 h-5 stroke-[2]" />
                      </div>
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                        {sec.heading}
                      </h3>
                    </div>
                    <div className="pl-0 sm:pl-[54px]">
                      {renderTermsBody(sec.description)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Sidebar with "ON THIS PAGE" & "Have Questions?" Card */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[90px]">
              {/* "ON THIS PAGE" Table of Contents Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd3] shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#d88918] mb-4">
                  <span className="w-4 h-[1.5px] bg-[#d88918]" />
                  <span>ON THIS PAGE</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {sectionsList.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className="w-full py-2.5 flex items-center justify-between text-xs sm:text-sm text-[#2b3a4a] hover:text-[#d88918] font-medium transition-colors cursor-pointer group text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#d88918] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* "Have Questions?" CTA Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd3] shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] mb-4 shadow-xs">
                  <Handshake className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0c1f38] mb-2 leading-snug">
                  Have Questions?
                </h3>
                <p className="text-xs sm:text-sm text-[#556477] leading-relaxed mb-5">
                  If you need any clarification about our Terms &amp; Conditions, feel free to reach out to our team.
                </p>
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="w-full bg-[#d88918] hover:bg-[#c27912] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer group"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
