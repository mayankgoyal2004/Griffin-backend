import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ChevronDown,
  CheckCircle,
  Building,
} from 'lucide-react';
import { companyInfo } from '../data/websiteData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message with brief realistic delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
      });
    }, 800);
  };

  return (
    <section id="contact" className="relative w-full pt-[68px] bg-[#faf7f2] text-[#111d2c] overflow-hidden min-h-[calc(100vh-68px)]">
      {/* 1. TOP HERO BANNER matching reference screenshot */}
      <div className="relative w-full overflow-hidden flex items-center bg-[#faf7f2] min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]">
        {/* Panoramic Cityscape Artwork with Griffin */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <img
            src="/Golden-Riverside-Castle.png"
            alt="Griffin Over Golden Cityscape"
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
            {/* Kicker: — GET IN TOUCH — */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
              <span>GET IN TOUCH</span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
            </div>

            {/* Heading: Contact Us */}
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[44px] text-[#0c1f38] tracking-tight leading-[1.12] mb-3">
              Contact Us
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed max-w-[430px]">
              We'd love to hear from you. Reach out for project inquiries, consultations, or any
              other questions.
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN SECTION: CONTACT INFO + SEND US A MESSAGE FORM */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Kicker: — CONTACT INFORMATION — */}
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#d88918] mb-2">
              <span className="w-6 h-[1.5px] bg-[#d88918]" />
              <span>CONTACT INFORMATION</span>
            </div>

            {/* Title: Let's Talk About Your Project */}
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-[34px] text-[#0c1f38] leading-tight mb-8">
              Let’s Talk About <br />
              Your Project
            </h2>

            {/* 4 Detail Items matching Reference Screenshot */}
            <div className="space-y-6">
              {/* Item 1: Our Office */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#fdf3e5] border border-[#fae2c1] text-[#d88918] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <MapPin className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0c1f38] leading-snug">Our Office</h3>
                  <p className="text-xs text-[#556477] mt-1 leading-relaxed">
                    Mohali, Punjab – 160055, India
                  </p>
                </div>
              </div>

              {/* Item 2: Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#fdf3e5] border border-[#fae2c1] text-[#d88918] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Phone className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0c1f38] leading-snug">Phone</h3>
                  <a
                    href="tel:+919876543210"
                    className="text-xs text-[#556477] mt-1 leading-relaxed inline-block hover:text-[#d88918] transition-colors font-medium"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Item 3: Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#fdf3e5] border border-[#fae2c1] text-[#d88918] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Mail className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0c1f38] leading-snug">Email</h3>
                  <a
                    href="mailto:info@griffinconstruction.in"
                    className="text-xs text-[#556477] mt-1 leading-relaxed inline-block hover:text-[#d88918] transition-colors font-medium"
                  >
                    info@griffinconstruction.in
                  </a>
                </div>
              </div>

              {/* Item 4: Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#fdf3e5] border border-[#fae2c1] text-[#d88918] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Clock className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0c1f38] leading-snug">Working Hours</h3>
                  <p className="text-xs text-[#556477] mt-1 leading-relaxed">
                    Mon – Sat: 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send Us a Message Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-[0_12px_45px_rgba(0,0,0,0.04)] border border-[#ece7de] relative">
              <h2 className="font-serif font-bold text-2xl sm:text-[26px] text-[#0c1f38] mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#fdf3e5] text-[#d88918] flex items-center justify-center mb-4 shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#0c1f38] mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-[#556477] max-w-sm mb-6 leading-relaxed">
                    Thank you for reaching out. Our engineering team has received your inquiry and
                    will get in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#0c1f38] text-white font-bold text-xs hover:bg-[#162d4c] transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Row 1: Your Name & Your Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#0c1f38] mb-1.5">
                        Your Name <span className="text-[#d88918]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border border-[#e2dcce] bg-[#fdfcf9] focus:bg-white focus:border-[#d88918] focus:ring-2 focus:ring-[#d88918]/20 outline-none text-xs text-[#0c1f38] placeholder:text-[#9aa5b4] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0c1f38] mb-1.5">
                        Your Email <span className="text-[#d88918]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-xl border border-[#e2dcce] bg-[#fdfcf9] focus:bg-white focus:border-[#d88918] focus:ring-2 focus:ring-[#d88918]/20 outline-none text-xs text-[#0c1f38] placeholder:text-[#9aa5b4] transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#0c1f38] mb-1.5">
                        Phone Number <span className="text-[#d88918]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 rounded-xl border border-[#e2dcce] bg-[#fdfcf9] focus:bg-white focus:border-[#d88918] focus:ring-2 focus:ring-[#d88918]/20 outline-none text-xs text-[#0c1f38] placeholder:text-[#9aa5b4] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0c1f38] mb-1.5">
                        Project Type <span className="text-[#d88918]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#e2dcce] bg-[#fdfcf9] focus:bg-white focus:border-[#d88918] focus:ring-2 focus:ring-[#d88918]/20 outline-none text-xs text-[#0c1f38] transition-all appearance-none cursor-pointer pr-10"
                        >
                          <option value="" disabled>
                            Select project type
                          </option>
                          <option value="Real Estate">Real Estate Development</option>
                          <option value="Transport & Logistics">Transport & Logistics</option>
                          <option value="Site Inspections">Site Inspections</option>
                          <option value="Websites & Digital">Websites & Digital</option>
                          <option value="Residential Construction">Residential Construction</option>
                          <option value="Commercial Infrastructure">
                            Commercial Infrastructure
                          </option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#8a99ad] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Your Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#0c1f38] mb-1.5">
                      Your Message <span className="text-[#d88918]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your project, requirements, or any questions..."
                      className="w-full px-4 py-3 rounded-xl border border-[#e2dcce] bg-[#fdfcf9] focus:bg-white focus:border-[#d88918] focus:ring-2 focus:ring-[#d88918]/20 outline-none text-xs text-[#0c1f38] placeholder:text-[#9aa5b4] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button matching golden amber reference */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-gradient-to-r from-[#d88918] via-[#e49a21] to-[#d88918] hover:from-[#c77a10] hover:to-[#d88918] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                  >
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: FIND US HERE CARD WITH MAP */}
        <div className="bg-white rounded-3xl border border-[#ece7de] shadow-[0_12px_40px_rgba(0,0,0,0.03)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 mt-12 sm:mt-16">
          {/* Left Text & Action */}
          <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-center">
            {/* Kicker: — OUR LOCATION — */}
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#d88918] mb-2">
              <span className="w-6 h-[1.5px] bg-[#d88918]" />
              <span>OUR LOCATION</span>
              <span className="w-6 h-[1.5px] bg-[#d88918]" />
            </div>

            {/* Heading: Find Us Here */}
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0c1f38] mb-2.5">
              Find Us Here
            </h2>

            {/* Description */}
            <p className="text-xs text-[#556477] leading-relaxed mb-6 max-w-sm">
              Visit our office or get in touch online. We're always happy to help.
            </p>

            {/* Dark Navy Button: Get Directions → */}
            <div>
              <a
                href="https://maps.google.com/?q=Dera+Bassi,+Punjab,+160055"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#091a2e] hover:bg-[#122840] text-white text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-slate-900/20"
              >
                <MapPin className="w-3.5 h-3.5 text-[#d88918]" />
                <span>Get Directions</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right Map Canvas with Floating Pin Card */}
          <div className="lg:col-span-7 relative min-h-[240px] sm:min-h-[280px] bg-[#eef1f6] overflow-hidden">
            {/* Interactive Embedded Map */}
            <iframe
              title="Griffin Construction Location Map"
              src="https://maps.google.com/maps?q=Dera+Bassi,+Punjab+160055&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[240px] sm:min-h-[280px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Stylized Floating Badge Overlay matching Reference Screenshot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-black/10 flex items-center gap-2.5 pointer-events-none z-10">
              <div className="w-7 h-7 rounded-full bg-[#fdf3e5] border border-[#fae2c1] flex items-center justify-center text-[#d88918] shadow-sm">
                <MapPin className="w-4 h-4 fill-[#d88918]" />
              </div>
              <div className="font-bold text-xs text-[#0c1f38] tracking-tight">
                Griffin Construction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

