import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Layers,
  HardHat,
  FileText,
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

export default function TermsAndConditions() {
  const navigate = useNavigate();

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

  const sectionsList = [
    { id: "introduction", label: "Introduction" },
    { id: "use-of-website", label: "Use of the Website" },
    { id: "services", label: "Services" },
    { id: "intellectual-property", label: "Intellectual Property" },
    { id: "user-submissions", label: "User Submissions" },
    { id: "third-party-links", label: "Third-Party Links" },
    { id: "disclaimer", label: "Disclaimer" },
    { id: "limitation-of-liability", label: "Limitation of Liability" },
    { id: "changes-to-terms", label: "Changes to These Terms" },
    { id: "contact-us", label: "Contact Us" },
  ];

  return (
    <div className="relative w-full pt-[68px] bg-[#faf7f2] text-[#111d2c] min-h-[calc(100vh-68px)]">
      {/* 1. TOP HERO BANNER matching reference screenshot */}
      <section className="relative w-full overflow-hidden flex items-center bg-[#faf7f2] min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]">
        {/* Panoramic Cityscape Artwork with Griffin */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <img
            src="/Golden-Riverside-Castle.png"
            alt="Griffin Terms and Conditions Banner"
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
          <div className="max-w-[540px]">
            {/* Kicker: — LEGAL — */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
              <span>LEGAL</span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
            </div>

            {/* Heading: Terms & Conditions */}
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[44px] text-[#0c1f38] tracking-tight leading-[1.12] mb-3">
              Terms &amp; Conditions
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed max-w-[480px]">
              Please read these Terms &amp; Conditions carefully before using
              our website and services.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN TERMS CONTENT WITH MONOCHROME GRIFFIN WATERMARK */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Elegant Monochrome Griffin Profile Watermark in bottom right matching reference */}
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
            {/* Left Column: Numbered Terms Sections (1 - 10) */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              {/* 1. Introduction */}
              <div id="introduction" className="scroll-mt-24">
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#d88918] mb-2">
                  <span className="w-5 h-[1.5px] bg-[#d88918]" />
                  <span>LAST UPDATED: NOV 6, 2026</span>
                </div>
                <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0c1f38] mb-4">
                  1. Introduction
                </h2>
                <div className="space-y-3 text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
                  <p>
                    These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern
                    your use of the Griffin Construction website
                    (&ldquo;Website&rdquo;) and the services, information, and
                    content provided by Griffin Construction
                    (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;,
                    &ldquo;us&rdquo;). By accessing or using our Website, you
                    agree to be bound by these Terms.
                  </p>
                </div>
              </div>

              {/* 2. Use of the Website */}
              <div id="use-of-website" className="scroll-mt-24 pt-2">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                    <Layers className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                    2. Use of the Website
                  </h3>
                </div>
                <div className="pl-0 sm:pl-[54px] text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
                  <p>
                    You agree to use the Website only for lawful purposes and in
                    a manner that does not infringe the rights of, restrict, or
                    inhibit anyone else&rsquo;s use of the Website.
                  </p>
                </div>
              </div>

              {/* 3. Services */}
              <div id="services" className="scroll-mt-24 pt-2">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                    <HardHat className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                    3. Services
                  </h3>
                </div>
                <div className="pl-0 sm:pl-[54px] text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
                  <p>
                    Griffin Construction provides construction, real estate
                    development, and related services. The information on the
                    Website is for general informational purposes only and does
                    not constitute a binding offer or contract.
                  </p>
                </div>
              </div>

              {/* 4. Intellectual Property */}
              <div id="intellectual-property" className="scroll-mt-24 pt-2">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                    <FileText className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                    4. Intellectual Property
                  </h3>
                </div>
                <div className="pl-0 sm:pl-[54px] text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
                  <p>
                    All content on this Website, including text, images, logos,
                    graphics, and design, is the property of Griffin
                    Construction or its licensors and is protected by applicable
                    copyright, trademark, and intellectual property laws. You
                    may not reproduce, distribute, or use any content without
                    prior written permission.
                  </p>
                </div>
              </div>

              {/* 5. User Submissions */}
              <div id="user-submissions" className="scroll-mt-24 pt-2">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                    <Users className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                    5. User Submissions
                  </h3>
                </div>
                <div className="pl-0 sm:pl-[54px] text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
                  <p>
                    If you submit any inquiry, feedback, or information through
                    our contact forms, you agree that the information you
                    provide is accurate and complete. We may use this
                    information to respond to your inquiry and provide relevant
                    services.
                  </p>
                </div>
              </div>

              {/* 6. Third-Party Links */}
              <div id="third-party-links" className="scroll-mt-24 pt-2">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                    <LinkIcon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                    6. Third-Party Links
                  </h3>
                </div>
                <div className="pl-0 sm:pl-[54px] text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
                  <p>
                    Our Website may contain links to third-party websites for
                    your convenience. We are not responsible for the content,
                    policies, or practices of these external websites.
                  </p>
                </div>
              </div>

              {/* 7. Disclaimer */}
              <div id="disclaimer" className="scroll-mt-24 pt-2">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                    <ShieldCheck className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                    7. Disclaimer
                  </h3>
                </div>
                <div className="pl-0 sm:pl-[54px] text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
                  <p>
                    The information on this Website is provided &ldquo;as
                    is&rdquo; and &ldquo;as available.&rdquo; While we strive to
                    keep the information accurate and up to date, we make no
                    warranties, express or implied, regarding the completeness,
                    accuracy, or reliability of any content.
                  </p>
                </div>
              </div>

              {/* 8. Limitation of Liability */}
              <div id="limitation-of-liability" className="scroll-mt-24 pt-2">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                    <AlertTriangle className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                    8. Limitation of Liability
                  </h3>
                </div>
                <div className="pl-0 sm:pl-[54px] text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
                  <p>
                    To the fullest extent permitted by law, Griffin Construction
                    shall not be liable for any direct, indirect, incidental, or
                    consequential damages arising from your use of the Website
                    or our services.
                  </p>
                </div>
              </div>

              {/* 9. Changes to These Terms */}
              <div id="changes-to-terms" className="scroll-mt-24 pt-2">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                    <RefreshCw className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                    9. Changes to These Terms
                  </h3>
                </div>
                <div className="pl-0 sm:pl-[54px] text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
                  <p>
                    We may update these Terms from time to time. Any changes
                    will be posted on this page with the updated &ldquo;Last
                    Updated&rdquo; date. Your continued use of the Website after
                    such changes constitutes your acceptance of the revised
                    Terms.
                  </p>
                </div>
              </div>

              {/* 10. Contact Us */}
              <div
                id="contact-us"
                className="scroll-mt-24 pt-2 border-t border-[#ece4d6] pt-8"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#faebd7]/80 flex items-center justify-center text-[#d88918] shrink-0 shadow-xs">
                    <Mail className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0c1f38]">
                    10. Contact Us
                  </h3>
                </div>
                <div className="pl-0 sm:pl-[54px] space-y-4">
                  <p className="text-xs sm:text-sm text-[#4b5c70] leading-relaxed">
                    If you have any questions about these Terms &amp;
                    Conditions, please contact us:
                  </p>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#0c1f38] font-medium pt-1">
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="flex items-center gap-2 hover:text-[#d88918] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#d88918]" />
                      <span>+91 98765 43210</span>
                    </a>
                    <a
                      href="mailto:info@griffinconstruction.in"
                      className="flex items-center gap-2 hover:text-[#d88918] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#d88918]" />
                      <span>info@griffinconstruction.in</span>
                    </a>
                    <div className="flex items-center gap-2 text-[#556477]">
                      <MapPin className="w-4 h-4 text-[#d88918]" />
                      <span>Mohali, Punjab, India</span>
                    </div>
                  </div>
                </div>
              </div>
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
                  If you need any clarification about our Terms &amp;
                  Conditions, feel free to reach out to our team.
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
