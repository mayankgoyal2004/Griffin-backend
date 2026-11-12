import React from 'react';
import { X, MapPin, Calendar, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose, onConsultForSimilar }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#091726]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#fffdfa] rounded-3xl max-w-2xl w-full overflow-hidden border border-[#e8e2d8] shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image preview */}
        <div className="relative h-64 sm:h-72 w-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091726] via-[#091726]/40 to-transparent opacity-90" />

          {/* Badges and Title */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-[#f2ae38] text-[#091726] shadow-sm">
              {project.category}
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-2 leading-tight">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#cbd5e1] mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#f2ae38]" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key metrics bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#f6f4ef] border border-[#e8e2d8] text-center">
            <div>
              <div className="text-[10px] text-[#64748b] uppercase tracking-wider font-bold">Built-Up Area</div>
              <div className="font-serif font-bold text-sm text-[#091726] mt-0.5">{project.area}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#64748b] uppercase tracking-wider font-bold">Execution Timeline</div>
              <div className="font-serif font-bold text-sm text-[#091726] mt-0.5">{project.timeline}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] text-[#64748b] uppercase tracking-wider font-bold">Status</div>
              <div className="font-serif font-bold text-sm text-green-700 mt-0.5">Delivered & Certified</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-[#091726] uppercase tracking-wider mb-2">
              Project Architecture & Brief
            </h4>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Specifications */}
          {project.specs && (
            <div>
              <h4 className="text-xs font-bold text-[#091726] uppercase tracking-wider mb-2.5">
                Key Engineering Specifications
              </h4>
              <div className="space-y-2">
                {project.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                    <Check className="w-4 h-4 text-[#d88918] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onConsultForSimilar(project);
              }}
              type="button"
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#091726] bg-gradient-to-r from-[#f2ae38] to-[#ffc15a] hover:from-[#d88918] hover:to-[#f2ae38] hover:text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Build A Similar Project With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-3 rounded-xl font-bold text-xs text-[#091726] border border-[#cbd5e1] hover:bg-black/5 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

