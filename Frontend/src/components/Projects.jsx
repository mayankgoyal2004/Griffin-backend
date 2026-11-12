import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/websiteData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Industrial', value: 'industrial' },
    { label: 'Renovation', value: 'renovation' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projectsData
      : projectsData.filter((item) => item.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="projects" className="py-20 sm:py-24 bg-[#f7f4ee] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Header & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#b46e11]">
                Our work
              </span>
              <span className="w-8 h-[2px] bg-[#d88918]" />
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#142b45] tracking-tight">
              Featured Projects
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === filter.value
                    ? 'bg-[#d88918] text-white shadow-md'
                    : 'bg-white text-[#455a70] hover:bg-[#eae6de] border border-[#e2dcd1]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel / Grid with Left & Right Arrows */}
        <div className="relative">
          {/* Side arrow buttons */}
          <button
            type="button"
            className="hidden xl:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-md items-center justify-center text-[#0b1a2c] hover:bg-[#ea8b0d] hover:text-white transition-all cursor-pointer"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="hidden xl:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-md items-center justify-center text-[#0b1a2c] hover:bg-[#ea8b0d] hover:text-white transition-all cursor-pointer"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 4 Cards Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 bg-[#0b1a2c]"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a2c] via-[#0b1a2c]/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                {/* Bottom Details matching reference template */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 z-10">
                  <div>
                    <p className="text-[10px] text-[#d3dce5] mb-0.5 font-medium tracking-wide">
                      {project.location}
                    </p>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-[#f2ae38] transition-colors leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-[#d88918] text-[#142238] flex items-center justify-center text-sm font-bold shadow-md group-hover:scale-110 transition-transform shrink-0">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
