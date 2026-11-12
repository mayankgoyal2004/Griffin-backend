import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle, Phone, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { companyInfo } from '../data/websiteData';

export default function QuoteModal({ isOpen, onClose, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'residential',
    area: '',
    budget: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialData.projectType || prev.projectType,
        area: initialData.area || prev.area,
        budget: initialData.estimatedCost ? `Est. ${initialData.estimatedCost}` : prev.budget,
        message: initialData.packageTier
          ? `Interested in ${initialData.packageTier.toUpperCase()} specification tier (${initialData.floors} floors).`
          : prev.message,
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Launch celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f2ae38', '#091726', '#ffc15a', '#ffffff'],
    });

    setTimeout(() => {
      // Auto close after 4 seconds
      // onClose();
    }, 4500);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#091726]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div className="relative bg-[#fffdfa] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#e8e2d8] shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#091726]/5 hover:bg-[#091726]/10 text-[#091726] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#b46e11] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#d88918]" />
                <span>Complimentary Consultation</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#091726]">
                Request a Detailed Quote
              </h3>
              <p className="text-xs text-[#667487] mt-1">
                Share your site details and our project directors will prepare an architectural feasibility summary and cost estimate.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#091726] uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] focus:border-[#d88918] bg-white text-xs text-[#091726] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#091726] uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] focus:border-[#d88918] bg-white text-xs text-[#091726] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#091726] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] focus:border-[#d88918] bg-white text-xs text-[#091726] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#091726] uppercase tracking-wider mb-1">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] focus:border-[#d88918] bg-white text-xs text-[#091726] focus:outline-none transition-colors"
                  >
                    <option value="residential">Residential Construction / Villa</option>
                    <option value="commercial">Commercial Tower / Retail Park</option>
                    <option value="industrial">Industrial Shed / Factory / Warehouse</option>
                    <option value="renovation">Renovation / Structural Remodeling</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#091726] uppercase tracking-wider mb-1">
                    Built-up Area / Plot Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2,500 sq. ft."
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] focus:border-[#d88918] bg-white text-xs text-[#091726] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#091726] uppercase tracking-wider mb-1">
                    Estimated Budget Target
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹50 Lakh - ₹1 Crore"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] focus:border-[#d88918] bg-white text-xs text-[#091726] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#091726] uppercase tracking-wider mb-1">
                  Project Description & Location Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Share details regarding site location, timeline preferences, or specific architectural needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd5e1] focus:border-[#d88918] bg-white text-xs text-[#091726] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#091726] bg-gradient-to-r from-[#f2ae38] to-[#ffc15a] hover:from-[#d88918] hover:to-[#f2ae38] hover:text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Consultation Request</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-serif font-bold text-2xl text-[#091726]">
              Request Received Successfully!
            </h3>

            <p className="text-xs text-[#64748b] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#091726]">{formData.name}</strong>. Our project management office has received your project briefing. Mayank Goyal and our engineering team will review the parameters and reach out within 24 business hours.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleReset}
                type="button"
                className="px-5 py-2.5 rounded-xl bg-[#091726] text-white text-xs font-bold hover:bg-[#142b45] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

