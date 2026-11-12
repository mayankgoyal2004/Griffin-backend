import React from 'react';
import { X, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function ServiceDetailModal({ service, onClose, onConsultForService }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#091726]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#fffdfa] rounded-3xl max-w-xl w-full overflow-hidden border border-[#e8e2d8] shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-48 w-full">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091726] via-[#091726]/50 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f2ae38]">
              {service.badge}
            </span>
            <h3 className="font-serif font-bold text-2xl text-white mt-1 leading-tight">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-7 space-y-5">
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            {service.description}
          </p>

          <div>
            <h4 className="text-xs font-bold text-[#091726] uppercase tracking-wider mb-3">
              Included Deliverables & Standards
            </h4>
            <div className="space-y-2">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#1e293b]">
                  <Check className="w-4 h-4 text-[#d88918] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onConsultForService(service);
              }}
              type="button"
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#091726] bg-gradient-to-r from-[#f2ae38] to-[#ffc15a] hover:from-[#d88918] hover:to-[#f2ae38] hover:text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Inquire About This Service</span>
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

