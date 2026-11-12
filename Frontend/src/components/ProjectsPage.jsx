import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Building2,
  Factory,
  MapPin,
  ArrowRight,
  RotateCw,
  Award,
  Users,
  HardHat,
  Wrench,
  Construction,
} from "lucide-react";
import ProjectDetailModal from "./ProjectDetailModal";

export const ALL_PROJECTS = [
  {
    id: "maple-villas",
    title: "Maple Villas",
    category: "Residential",
    location: "Mohali, Punjab",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    description:
      "A premium residential community with modern architecture and sustainable living.",
    scope: "Architectural Design & Turnkey Construction",
    duration: "18 Months",
    highlights: [
      "Solar passive architecture with thermal glass envelope",
      "Private landscaped courtyards and terrace plunge pools",
      "Pre-certified 4-star Green Building rating",
    ],
  },
  {
    id: "griffin-business-park",
    title: "Griffin Business Park",
    category: "Commercial",
    location: "Chandigarh, Punjab",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    description:
      "A modern commercial space designed for productivity, collaboration, and growth.",
    scope: "Commercial Development & Structural Engineering",
    duration: "24 Months",
    highlights: [
      "Grade-A corporate floorplates with double-glazed low-E glass",
      "High-speed automated elevators and smart HVAC automation",
      "Zero-discharge rainwater harvesting and on-site solar generation",
    ],
  },
  {
    id: "dera-bassi-flyover",
    title: "Mohali Flyover",
    category: "Infrastructure",
    location: "Mohali, Punjab",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=900&q=80",
    description:
      "A key infrastructure project improving connectivity and regional development.",
    scope: "Civil Engineering, Bridge Construction & Roadworks",
    duration: "16 Months",
    highlights: [
      "High-load pre-stressed concrete girder technology",
      "Reinforced earth retaining walls with seismic dampers",
      "Smart LED corridor illumination and anti-skid surfacing",
    ],
  },
  {
    id: "vibrantick-industrial-unit",
    title: "Vibrantick Industrial Unit",
    category: "Industrial",
    location: "Zirakpur, Punjab",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    description:
      "A state-of-the-art industrial facility built for efficiency, safety, and scalability.",
    scope: "PEB Industrial Sheds & Laser-Screed Flooring",
    duration: "12 Months",
    highlights: [
      "Heavy-duty FM2 compliant industrial floor slabs",
      "Integrated logistics docks with automated levelers",
      "Comprehensive fire suppression and FM-global safety norms",
    ],
  },
  {
    id: "greenview-residences",
    title: "Greenview Residences",
    category: "Residential",
    location: "Mohali, Punjab",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
    description:
      "Contemporary apartments with landscaped spaces and modern amenities.",
    scope: "Multi-Story Residential Construction",
    duration: "22 Months",
    highlights: [
      "Spacious double-height wrap-around balconies",
      "Central clubhouse, indoor badminton courts, and fitness center",
      "3-tier biometric security and EV-charging stations per bay",
    ],
  },
  {
    id: "heritage-restoration",
    title: "Heritage Restoration",
    category: "Renovation",
    location: "Patiala, Punjab",
    image:
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=900&q=80",
    description:
      "A careful restoration project that preserves heritage while enhancing functionality.",
    scope: "Historical Conservation & Structural Retrofitting",
    duration: "14 Months",
    highlights: [
      "Traditional lime-plaster mortar restoration methods",
      "Invisible steel structural reinforcement and foundation underpinning",
      "Preservation of ornate cornices, archways, and sandstone carvings",
    ],
  },
  // Additional projects revealed on "Load More"
  {
    id: "skyline-corporate-hub",
    title: "Skyline Corporate Hub",
    category: "Commercial",
    location: "Panchkula, Haryana",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    description:
      "LEED-certified multi-tenant commercial office towers with retail podiums.",
    scope: "Turnkey Commercial Project",
    duration: "20 Months",
    highlights: [
      "Solar facade integration",
      "Sub-metered chilled water cooling",
      "Dedicated transit hub connection",
    ],
  },
  {
    id: "riverdale-luxury-estates",
    title: "Riverdale Luxury Estates",
    category: "Residential",
    location: "Kalka Road, Punjab",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    description: "Gated enclave of 36 bespoke river-facing modern villas.",
    scope: "Full Villa Development & Infrastructure",
    duration: "16 Months",
    highlights: [
      "Natural stone facades",
      "Smart home automation",
      "Waterfront promenade",
    ],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "residential", label: "Residential", icon: Home },
  { id: "commercial", label: "Commercial", icon: Building2 },
  { id: "industrial", label: "Industrial", icon: Factory },
  { id: "infrastructure", label: "Infrastructure", icon: Construction },
  { id: "renovation", label: "Renovation", icon: Wrench },
];

export default function ProjectsPage({ onSelectProject, onOpenQuote }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return ALL_PROJECTS;
    return ALL_PROJECTS.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [activeCategory]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoadingMore(false);
    }, 450);
  };

  const handleProjectClick = (proj) => {
    if (onSelectProject) {
      onSelectProject(proj);
    } else {
      setSelectedModalProject(proj);
    }
  };

  const handleContactClick = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative w-full pt-[68px] bg-[#faf7f2] text-[#111d2c] min-h-[calc(100vh-68px)]">
      {/* 1. TOP HERO BANNER matching reference screenshot */}
      <section className="relative w-full overflow-hidden flex items-center bg-[#faf7f2] min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]">
        {/* Panoramic Cityscape Artwork with Griffin */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <img
            src="/Golden-Riverside-Castle.png"
            alt="Griffin Projects Banner"
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
            {/* Kicker: — OUR PROJECTS — */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
              <span>OUR PROJECTS</span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
            </div>

            {/* Heading: Projects */}
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[44px] text-[#0c1f38] tracking-tight leading-[1.12] mb-3">
              Projects
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed max-w-[440px]">
              A showcase of our work, reflecting our commitment to quality,
              innovation, and lasting value.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS BAR matching reference screenshot */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(6);
                }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs ${
                  isActive
                    ? "bg-[#d88918] text-white shadow-md"
                    : "bg-[#f4efe6] text-[#425265] hover:bg-[#ece4d6] hover:text-[#0c1f38]"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#8d9cae]"}`}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. 6 PROJECTS GRID matching reference screenshot */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-14 sm:pb-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedProjects.map((project) => {
            const catObj = CATEGORIES.find(
              (c) => c.label.toLowerCase() === project.category.toLowerCase(),
            );
            const CatIcon = catObj?.icon || Building2;

            return (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="bg-[#fffdfa] rounded-2xl border border-[#e8dfd3] shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_28px_rgba(216,137,24,0.12)] hover:border-[#dfceb8] transition-all duration-300 group cursor-pointer"
              >
                <div>
                  {/* Project Image Frame with Category Pill Badge pinned on top-left */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80";
                      }}
                    />

                    {/* Category Pill Tag matching reference */}
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm text-[#0c1f38] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <CatIcon className="w-3.5 h-3.5 text-[#d88918]" />
                      <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 pb-2">
                    {/* Title */}
                    <h3 className="font-serif font-bold text-lg sm:text-[20px] text-[#0c1f38] leading-snug mb-1.5 group-hover:text-[#d88918] transition-colors">
                      {project.title}
                    </h3>

                    {/* Location with Pin */}
                    <div className="flex items-center gap-1.5 text-xs text-[#718298] font-medium mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#d88918] shrink-0" />
                      <span>{project.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#556477] leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* View Project Action */}
                <div className="px-5 sm:px-6 pb-5 pt-3">
                  <span className="text-[#d88918] font-semibold text-xs sm:text-[13px] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center pt-10 sm:pt-12">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 border border-[#d88918] text-[#0c1f38] hover:bg-[#d88918] hover:text-white font-semibold text-xs sm:text-sm px-7 py-2.5 rounded-full transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
            >
              <span>
                {isLoadingMore ? "Loading Projects..." : "Load More Projects"}
              </span>
              <RotateCw
                className={`w-3.5 h-3.5 text-[#d88918] group-hover:text-white ${isLoadingMore ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        )}
      </section>

      {/* 4. DARK NAVY STATS STRIP matching reference */}
      <section className="bg-[#081626] text-white py-10 sm:py-12 relative overflow-hidden">
        {/* Subtle Griffin Watermark */}
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.06] w-64 sm:w-80 h-auto">
          <img src="/logo-mark.png" alt="" className="w-full h-auto" />
        </div>

        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Stat 1 */}
            <div className="p-4 sm:p-6 text-center flex flex-col items-center">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#d88918] mb-2 stroke-[1.8]" />
              <div className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#d88918] mb-1 tracking-tight">
                50+
              </div>
              <div className="text-[11px] sm:text-xs text-[#aeb9c6] font-medium tracking-wide">
                Projects Completed
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 sm:p-6 text-center flex flex-col items-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#d88918] mb-2 stroke-[1.8]" />
              <div className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#d88918] mb-1 tracking-tight">
                25+
              </div>
              <div className="text-[11px] sm:text-xs text-[#aeb9c6] font-medium tracking-wide">
                Happy Clients
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 sm:p-6 text-center flex flex-col items-center">
              <HardHat className="w-5 h-5 sm:w-6 sm:h-6 text-[#d88918] mb-2 stroke-[1.8]" />
              <div className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#d88918] mb-1 tracking-tight">
                8+
              </div>
              <div className="text-[11px] sm:text-xs text-[#aeb9c6] font-medium tracking-wide">
                Ongoing Projects
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-4 sm:p-6 text-center flex flex-col items-center">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#d88918] mb-2 stroke-[1.8]" />
              <div className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#d88918] mb-1 tracking-tight">
                100%
              </div>
              <div className="text-[11px] sm:text-xs text-[#aeb9c6] font-medium tracking-wide">
                Quality Commitment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HAVE A PROJECT IN MIND? CTA BANNER matching reference */}
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
                Let's build something exceptional together.
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

      {/* Modal Detail if opened locally */}
      {selectedModalProject && (
        <ProjectDetailModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
          onConsultForSimilar={() => {
            setSelectedModalProject(null);
            handleContactClick();
          }}
        />
      )}
    </div>
  );
}
