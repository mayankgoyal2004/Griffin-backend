import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Home,
  Truck,
  Wrench,
  Globe,
  ArrowRight,
  Download,
  CheckCircle2,
  ChevronDown,
  Building2,
  MapPin,
  Sparkles,
  ShieldCheck,
  HardHat,
  Layers,
  FileText,
  Calendar,
  Clock,
  Compass,
  Palette,
  Code2,
  Rocket,
  Search,
  Check,
} from "lucide-react";

export const SERVICES_CONFIG = {
  "real-estate": {
    id: "real-estate",
    slug: "real-estate",
    title: "Real Estate Development",
    tagline:
      "End-to-end property development with modern design, sustainable planning, and long-term value creation.",
    heroCharacter: "/services/real-estate.png",
    badge: "Property & Development",
    badgeBg: "#ea580c",
    icon: Home,
    overview: {
      title: "Creating Landmark Properties",
      description:
        "Griffin Construction delivers comprehensive real estate development solutions, from land acquisition and project planning to design, construction, and final handover. We create high-quality residential and commercial spaces that offer lasting value, strong returns, and modern living experiences.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      badges: [
        { label: "Residential Projects", icon: Home },
        { label: "Commercial Spaces", icon: Building2 },
        { label: "Land Development", icon: Layers },
        { label: "Investment Solutions", icon: Sparkles },
      ],
    },
    offerings: [
      {
        title: "Residential Development",
        desc: "Modern, well-planned residential communities with premium amenities.",
        icon: Home,
      },
      {
        title: "Commercial Development",
        desc: "High-quality commercial spaces designed for business growth.",
        icon: Building2,
      },
      {
        title: "Property Investment",
        desc: "Strategic investment opportunities with long-term value.",
        icon: Sparkles,
      },
      {
        title: "Land Development",
        desc: "Land acquisition, planning, and infrastructure development.",
        icon: Layers,
      },
    ],
    process: {
      title: "Our Development Process",
      steps: [
        {
          num: "01",
          title: "Consultation",
          desc: "Understand your goals, requirements, and vision.",
          icon: Compass,
        },
        {
          num: "02",
          title: "Planning",
          desc: "Feasibility, design, and regulatory approvals.",
          icon: FileText,
        },
        {
          num: "03",
          title: "Development",
          desc: "Quality construction with strict controls.",
          icon: HardHat,
        },
        {
          num: "04",
          title: "Handover",
          desc: "Final inspection and project delivery.",
          icon: CheckCircle2,
        },
      ],
    },
    advantage: {
      description:
        "A trusted partner in real estate development, known for quality, transparency, and long-term value.",
      points: [
        "End-to-end project execution",
        "Experienced and skilled team",
        "Quality construction and materials",
        "Transparent and reliable processes",
        "Focus on sustainability and value",
      ],
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
    },
    relatedProjects: [
      {
        title: "Maple Villas",
        location: "Mohali, Punjab",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Greenview Residences",
        location: "Mohali, Punjab",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Griffin Business Park",
        location: "Chandigarh, Punjab",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      },
    ],
    faqs: [
      {
        q: "What types of real estate projects do you develop?",
        a: "We develop bespoke luxury villas, modern residential multi-family apartments, grade-A commercial office parks, retail centers, and integrated mixed-use townships.",
      },
      {
        q: "Do you handle regulatory approvals and permits?",
        a: "Yes, our experienced in-house legal and liaison department manages complete master-plan zoning clearances, municipal building sanctions, environmental clearances, and RERA compliance.",
      },
      {
        q: "Can you assist with land acquisition?",
        a: "Yes, we provide end-to-end land evaluation, title searches, zoning verification, feasibility studies, and legal diligence to assist partners and investors with prime land procurement.",
      },
      {
        q: "How do you ensure construction quality?",
        a: "We implement rigorous multi-stage quality audits, deploy certified structural engineers, conduct third-party laboratory material testing, and maintain ISO-certified construction protocols.",
      },
    ],
  },
  transport: {
    id: "transport",
    slug: "transport",
    title: "Transport & Logistics",
    tagline:
      "Reliable and efficient transport and logistics solutions for the construction, real estate, and industrial sectors.",
    heroCharacter: "/services/transport.png",
    badge: "Fleet & Logistics",
    badgeBg: "#0a2540",
    icon: Truck,
    overview: {
      title: "End-to-End Logistics Support",
      description:
        "We provide integrated transport and logistics solutions tailored for construction, real estate, and infrastructure projects. From material transportation to on-site delivery, our services ensure timely, safe, and cost-effective movement of goods.",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      badges: [
        { label: "Material Transportation", icon: Truck },
        { label: "Warehousing & Storage", icon: Building2 },
        { label: "On-Site Logistics", icon: Layers },
        { label: "Fleet Management", icon: MapPin },
      ],
    },
    offerings: [
      {
        title: "Material Transportation",
        desc: "Safe and timely transport of construction materials, equipment, and project goods.",
        icon: Truck,
      },
      {
        title: "Fleet & Logistics Management",
        desc: "A well-maintained fleet with end-to-end logistics planning and coordination.",
        icon: Building2,
      },
      {
        title: "Warehousing Solutions",
        desc: "Secure, organized, and scalable storage for construction and industrial materials.",
        icon: Layers,
      },
      {
        title: "On-Site Material Handling",
        desc: "Efficient loading, unloading, and material movement at project sites.",
        icon: Wrench,
      },
    ],
    process: {
      title: "Our Logistics Process",
      steps: [
        {
          num: "01",
          title: "Requirement Analysis",
          desc: "Understand material, volume, and delivery needs.",
          icon: FileText,
        },
        {
          num: "02",
          title: "Planning & Scheduling",
          desc: "Create the most efficient transport and logistics plan.",
          icon: MapPin,
        },
        {
          num: "03",
          title: "Execution",
          desc: "Safe, timely, and coordinated movement of goods.",
          icon: Truck,
        },
        {
          num: "04",
          title: "Delivery & Support",
          desc: "On-time delivery with ongoing project support.",
          icon: CheckCircle2,
        },
      ],
    },
    advantage: {
      description:
        "Dedicated logistics expertise, reliable and well-maintained fleet, and round-the-clock telematics monitoring.",
      points: [
        "Dedicated logistics expertise",
        "Reliable and well-maintained fleet",
        "Timely and cost-effective operations",
        "Safety and compliance at every stage",
        "Scalable solutions for projects of any size",
      ],
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80",
    },
    relatedProjects: [
      {
        title: "Industrial Material Transport",
        location: "Zirakpur, Punjab",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Construction Site Logistics",
        location: "Mohali, Punjab",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Warehousing & Distribution",
        location: "Mohali, Punjab",
        image:
          "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
      },
    ],
    faqs: [
      {
        q: "What types of logistics services do you provide?",
        a: "We provide heavy aggregate transport, bulk cement and steel transit, specialized oversized equipment hauling, warehousing, and just-in-time on-site material dispatching.",
      },
      {
        q: "Do you handle transportation for large construction projects?",
        a: "Yes, our heavy-duty commercial fleet handles multi-thousand-ton daily supply movements for major infrastructure, industrial, and commercial developments across North India.",
      },
      {
        q: "Can you provide warehousing and storage facilities?",
        a: "Yes, we operate secure, weather-protected, crane-equipped staging facilities and warehouses with 24/7 digital inventory management and security surveillance.",
      },
      {
        q: "How do you ensure the safety of materials during transport?",
        a: "All vehicles are equipped with certified heavy-duty tie-down systems, GPS telematics for real-time tracking, speed monitoring, and comprehensive transit insurance.",
      },
    ],
  },
  inspections: {
    id: "inspections",
    slug: "inspections",
    title: "Site Inspections",
    tagline:
      "Professional construction, structural, and safety inspections to ensure quality, compliance, and long-term reliability.",
    heroCharacter: "/services/inspections.png",
    badge: "Audits & Compliance",
    badgeBg: "#c85a17",
    icon: Wrench,
    overview: {
      title: "Comprehensive Site Inspections",
      description:
        "We provide end-to-end site inspection services to assess construction quality, structural integrity, safety compliance, and overall project readiness. Our expert inspections help identify risks early, ensure regulatory compliance, and maintain the highest standards throughout the project lifecycle.",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
      badges: [
        { label: "Safety Compliance", icon: ShieldCheck },
        { label: "Structural Assessment", icon: Building2 },
        { label: "Quality Checks", icon: CheckCircle2 },
        { label: "Detailed Reporting", icon: FileText },
      ],
    },
    offerings: [
      {
        title: "Quality & Safety Checks",
        desc: "On-site verification of construction quality and safety standards.",
        icon: HardHat,
      },
      {
        title: "Structural Inspections",
        desc: "Assessment of structural integrity, materials, and workmanship.",
        icon: Building2,
      },
      {
        title: "Technical Assessment",
        desc: "Evaluation of construction methods, design compliance, and risk factors.",
        icon: FileText,
      },
      {
        title: "Detailed Reports",
        desc: "Comprehensive, actionable reports with findings, recommendations, and compliance status.",
        icon: FileText,
      },
    ],
    process: {
      title: "Our Inspection Process",
      steps: [
        {
          num: "01",
          title: "Site Assessment",
          desc: "Initial site review and requirement analysis.",
          icon: Search,
        },
        {
          num: "02",
          title: "Detailed Inspection",
          desc: "On-site checks, testing, and evaluation.",
          icon: Wrench,
        },
        {
          num: "03",
          title: "Reporting",
          desc: "Comprehensive findings with clear recommendations.",
          icon: FileText,
        },
        {
          num: "04",
          title: "Action & Follow-up",
          desc: "Support for remediation and final clearance.",
          icon: CheckCircle2,
        },
      ],
    },
    advantage: {
      description:
        "Accurate, unbiased evaluations and actionable insights from senior licensed structural engineers.",
      points: [
        "Experienced inspection professionals",
        "Accurate, unbiased, and detailed evaluations",
        "Compliance with industry and safety standards",
        "Timely reporting and actionable insights",
      ],
      image:
        "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=900&q=80",
    },
    relatedProjects: [
      {
        title: "Griffin Business Park",
        location: "Chandigarh, Punjab",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Mohali Flyover",
        location: "Mohali, Punjab",
        image:
          "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Vibrantick Industrial Unit",
        location: "Zirakpur, Punjab",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      },
    ],
    faqs: [
      {
        q: "What types of site inspections do you provide?",
        a: "We conduct pre-pour rebar audits, non-destructive concrete strength testing (Rebound Hammer & Ultrasonic), structural deflection checks, MEP compliance, and pre-occupancy snagging inspections.",
      },
      {
        q: "When should a site inspection be done?",
        a: "Inspections should be scheduled at major construction milestones: excavation clearance, foundation casting, framing, and final finishing before occupancy certification.",
      },
      {
        q: "Do you provide compliance and safety inspections?",
        a: "Yes, our certified EHS officers perform full workplace safety reviews, scaffolding audits, fire-safety compliance checks, and adherence to National Building Codes.",
      },
      {
        q: "Will I receive a detailed report after the inspection?",
        a: "Yes, an exhaustive report containing photographic documentation, severity ratings, defect classifications, and clear corrective actions is delivered within 24 to 48 hours.",
      },
    ],
  },
  websites: {
    id: "websites",
    slug: "websites",
    title: "Websites & Digital",
    tagline:
      "Modern digital solutions for construction, real estate, and businesses — from high-performance websites to complete digital branding and online growth.",
    heroCharacter: "/services/websites.png",
    badge: "Web & Digital",
    badgeBg: "#004d4d",
    icon: Globe,
    overview: {
      title: "Digital Solutions for a Modern World",
      description:
        "We design, build, and grow digital experiences that help construction, real estate, and related businesses establish a strong online presence, generate leads, and build lasting brand value.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      badges: [
        { label: "Business Websites", icon: Globe },
        { label: "Web Applications", icon: Code2 },
        { label: "Digital Branding", icon: Palette },
        { label: "SEO & Growth", icon: Sparkles },
      ],
    },
    offerings: [
      {
        title: "Custom Website Development",
        desc: "Tailored, responsive, and high-performance websites for your business.",
        icon: Globe,
      },
      {
        title: "Web Applications",
        desc: "Scalable and secure web applications for operations, clients, and teams.",
        icon: Layers,
      },
      {
        title: "UI/UX & Branding",
        desc: "User-focused design, brand identity, and engaging digital experiences.",
        icon: Palette,
      },
      {
        title: "SEO & Digital Marketing",
        desc: "Improve visibility, generate leads, and grow your business online.",
        icon: Sparkles,
      },
    ],
    process: {
      title: "Our Delivery Process",
      steps: [
        {
          num: "01",
          title: "Discovery",
          desc: "Understand your goals, requirements, and audience.",
          icon: Search,
        },
        {
          num: "02",
          title: "Design",
          desc: "Create intuitive and brand-aligned designs.",
          icon: Palette,
        },
        {
          num: "03",
          title: "Development",
          desc: "Build a secure, scalable, and high-performing solution.",
          icon: Code2,
        },
        {
          num: "04",
          title: "Launch & Grow",
          desc: "Deploy, optimize, and support for long-term results.",
          icon: Rocket,
        },
      ],
    },
    advantage: {
      description:
        "A reliable technology partner with industry understanding, creative expertise, and a result-driven approach.",
      points: [
        "Construction & real estate industry expertise",
        "Custom, scalable, and future-ready solutions",
        "Design-led, user-first approach",
        "Ongoing support and maintenance",
        "Focus on measurable business growth",
      ],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    },
    relatedProjects: [
      {
        title: "Griffin Construction Website",
        location: "Construction Company Website",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "MP-MLA Portal",
        location: "Constituency Management Platform",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "KYP-5 Platform",
        location: "Student Assessment & Learning Platform",
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      },
    ],
    faqs: [
      {
        q: "What types of websites do you build?",
        a: "We design and develop high-conversion corporate brand portals, interactive real estate development showcases, architectural portfolio websites, and enterprise web applications.",
      },
      {
        q: "Can you redesign our existing website?",
        a: "Yes, we take legacy sites and transform them into cutting-edge, mobile-first, blazing-fast web experiences engineered for higher conversion and SEO visibility.",
      },
      {
        q: "Do you provide ongoing maintenance and support?",
        a: "Yes, our engineering team provides continuous SLA-backed maintenance, security monitoring, cloud hosting optimization, and incremental feature updates.",
      },
      {
        q: "How long does it take to build a website?",
        a: "A bespoke modern corporate website typically takes 3 to 4 weeks from discovery to production launch, while complex web applications take 6 to 10 weeks.",
      },
    ],
  },
};

export default function ServicesPage({ onOpenQuote }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Normalized service resolution: default to 'real-estate' if slug is unknown or root /services
  const activeServiceKey =
    slug === "transport-logistics"
      ? "transport"
      : slug === "site-inspections"
        ? "inspections"
        : slug === "websites-digital"
          ? "websites"
          : slug === "real-estate-development"
            ? "real-estate"
            : SERVICES_CONFIG[slug]
              ? slug
              : "real-estate";

  const service =
    SERVICES_CONFIG[activeServiceKey] || SERVICES_CONFIG["real-estate"];
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleContactClick = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="relative w-full pt-[68px] bg-[#faf7f2] text-[#111d2c] min-h-[calc(100vh-68px)]">
      {/* 1. TOP HERO BANNER matching About, Projects & Team pages */}
      <section className="relative w-full overflow-hidden flex items-center bg-[#faf7f2] min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]">
        {/* Panoramic Cityscape Artwork with Golden Griffin */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <img
            src="/Golden-Riverside-Castle.png"
            alt="Griffin Services Banner"
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
          <div className="max-w-[500px]">
            {/* Kicker: — OUR SERVICE — */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
              <span>OUR SERVICE</span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
            </div>

            {/* Heading */}
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[44px] text-[#0c1f38] tracking-tight leading-[1.12] mb-3">
              {service.title}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed max-w-[460px]">
              {service.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION matching reference screenshot */}
      <section className="py-14 sm:py-20 bg-[#faf7f2] relative">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Image */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-200 border border-[#e8dfd3]">
                <img
                  src={service.overview.image}
                  alt={service.overview.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Overview Info */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2">
                <span className="w-5 sm:w-6 h-[1.5px] bg-[#d88918]" />
                <span>OVERVIEW</span>
              </div>
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-[34px] text-[#0c1f38] leading-tight tracking-tight mb-4">
                {service.overview.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed mb-8">
                {service.overview.description}
              </p>

              {/* 4 Feature Badges in Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 border-t border-[#ece4d6]">
                {service.overview.badges.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={b.label}
                      className="text-center sm:text-left flex flex-col items-center sm:items-start pt-2"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#faebd7]/70 flex items-center justify-center text-[#d88918] mb-2 shadow-xs">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="font-bold text-xs text-[#0c1f38] leading-snug">
                        {b.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE OFFER (4 Offerings Grid) matching reference screenshot */}
      <section className="py-12 sm:py-16 bg-[#faf7f2] relative border-t border-[#ece4d6]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="mb-10 sm:mb-12">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2">
              <span className="w-5 sm:w-6 h-[1.5px] bg-[#d88918]" />
              <span>WHAT WE OFFER</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-[34px] text-[#0c1f38] tracking-tight">
              {service.id === "inspections"
                ? "Our Inspection Services"
                : service.id === "websites"
                  ? "Our Websites & Digital Services"
                  : "What We Offer"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.offerings.map((offering) => {
              const Icon = offering.icon;
              return (
                <div
                  key={offering.title}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd3] shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#faebd7]/90 text-[#d88918] flex items-center justify-center mb-5 transition-transform group-hover:scale-110 shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#0c1f38] mb-2.5 leading-snug group-hover:text-[#d88918] transition-colors">
                      {offering.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#556477] leading-relaxed">
                      {offering.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. OUR PROCESS (Dark Navy Rounded Container matching reference screenshot) */}
      <section className="py-6 sm:py-10 bg-[#faf7f2] relative">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="bg-[#071322] text-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Soft decorative background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d88918]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12 relative z-10">
              {/* Left Title */}
              <div className="lg:w-[26%] shrink-0">
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5">
                  <span className="w-5 h-[1.5px] bg-[#d88918]" />
                  <span>OUR PROCESS</span>
                </div>
                <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                  {service.process.title}
                </h2>
              </div>

              {/* 4-Step Flow with Icons & Connecting Arrows */}
              <div className="lg:w-[74%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {service.process.steps.map((st, idx) => {
                  const StepIcon = st.icon;
                  const isLast = idx === service.process.steps.length - 1;
                  return (
                    <div
                      key={st.num}
                      className="flex flex-col items-start relative group"
                    >
                      {/* Step Circle with Icon + Arrow */}
                      <div className="flex items-center justify-between w-full mb-3.5">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-[#f2ae38] flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-[#d88918] group-hover:text-white shadow-md">
                          {StepIcon ? (
                            <StepIcon className="w-5 h-5 stroke-[2.2]" />
                          ) : (
                            <span className="font-bold text-xs">{st.num}</span>
                          )}
                        </div>

                        {/* Arrow connecting to next step (shown on desktop between cards) */}
                        {!isLast && (
                          <div className="hidden lg:flex flex-1 items-center justify-center px-1 text-[#d88918]">
                            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        )}
                      </div>

                      {/* Step Title: 01. Title */}
                      <h4 className="font-bold text-sm text-white mb-1.5 flex items-center gap-1.5">
                        <span className="text-[#d88918]">{st.num}.</span>
                        <span>{st.title}</span>
                      </h4>

                      {/* Step Description */}
                      <p className="text-xs text-[#aeb9c6] leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE GRIFFIN ADVANTAGE matching reference screenshot */}
      <section className="py-14 sm:py-20 bg-[#faf7f2] relative">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Advantage Points */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2">
                <span className="w-5 sm:w-6 h-[1.5px] bg-[#d88918]" />
                <span>WHY CHOOSE US</span>
              </div>
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-[34px] text-[#0c1f38] tracking-tight leading-snug mb-4">
                The Griffin Advantage
              </h2>
              <p className="text-xs sm:text-sm text-[#556477] leading-relaxed mb-6">
                {service.advantage.description}
              </p>

              <div className="space-y-3">
                {service.advantage.points.map((pt) => (
                  <div key={pt} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#faebd7] flex items-center justify-center text-[#d88918] shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#0c1f38] font-medium">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Angled Image Frame */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[16/10] bg-slate-200 border border-[#e8dfd3]">
                <img
                  src={service.advantage.image}
                  alt="The Griffin Advantage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RELATED PROJECTS (3 Cards) matching reference screenshot */}
      <section className="py-12 sm:py-16 bg-[#faf7f2] border-t border-[#ece4d6]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-1.5">
                <span className="w-5 sm:w-6 h-[1.5px] bg-[#d88918]" />
                <span>RELATED PROJECTS</span>
              </div>
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0c1f38] tracking-tight">
                Our {service.title} Projects
              </h2>
            </div>

            <Link
              to="/projects"
              className="text-xs sm:text-sm font-semibold text-[#d88918] hover:text-[#c27912] inline-flex items-center gap-1 group transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.relatedProjects.map((p) => (
              <div
                key={p.title}
                onClick={() => navigate("/projects")}
                className="bg-white rounded-2xl overflow-hidden border border-[#e8dfd3] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-slate-200">{p.location}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#d88918] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQs Accordion) matching reference screenshot */}
      <section className="py-14 sm:py-20 bg-[#faf7f2] border-t border-[#ece4d6]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left FAQ Info */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2">
                <span className="w-5 sm:w-6 h-[1.5px] bg-[#d88918]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#0c1f38] tracking-tight mb-3">
                FAQs
              </h2>
              <p className="text-xs sm:text-sm text-[#556477] leading-relaxed">
                Find answers to common questions about our{" "}
                {service.title.toLowerCase()} services.
              </p>
            </div>

            {/* Right Accordion List */}
            <div className="lg:col-span-8 space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="bg-white rounded-2xl border border-[#e8dfd3] overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-[#0c1f38] flex items-center justify-between gap-4 cursor-pointer hover:text-[#d88918] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#d88918]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#556477] leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. HAVE A PROJECT IN MIND? CTA BANNER */}
      <section className="relative overflow-hidden bg-[#081626] text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left: Building Image with Angled Cut */}
          <div className="md:col-span-4 lg:col-span-3 relative h-48 md:h-full min-h-[160px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              alt="Griffin Architecture"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = "/Golden-Riverside-Castle.png";
              }}
            />
            {/* Shading overlay into the dark banner */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#081626]" />
          </div>

          {/* Right: Content & CTA Action */}
          <div className="md:col-span-8 lg:col-span-9 p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-white mb-1.5">
                Have a Project in Mind?
              </h2>
              <p className="text-xs sm:text-sm text-[#aeb9c6]">
                Let's discuss your {service.title.toLowerCase()} requirements
                and create a tailored solution for your project.
              </p>
            </div>

            <button
              type="button"
              onClick={handleContactClick}
              className="shrink-0 bg-[#d88918] hover:bg-[#c27912] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-md cursor-pointer group"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
