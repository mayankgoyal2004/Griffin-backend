import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  HardHat,
  Layers,
  Award,
  ArrowRight,
  Mail,
} from 'lucide-react';

export const TEAM_MEMBERS = [
  {
    name: 'Manoj Kumar',
    role: 'Founder & Director',
    bio: 'Leading Griffin with a vision for quality, innovation, and long-term impact in construction.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80',
    linkedin: '#',
    instagram: '#',
    email: 'manoj@griffinconstruction.in',
  },
  {
    name: 'Mayank Goyal',
    role: 'Chief Executive Officer',
    bio: 'Driving strategic growth, operational excellence, and client success across all projects.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    linkedin: '#',
    instagram: '#',
    email: 'mayank@griffinconstruction.in',
  },
  {
    name: 'Aditi Sharma',
    role: 'Head of Projects',
    bio: 'Overseeing end-to-end project execution, timelines, and quality standards.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    linkedin: '#',
    instagram: '#',
    email: 'aditi@griffinconstruction.in',
  },
  {
    name: 'Rohit Verma',
    role: 'Construction Manager',
    bio: 'Managing site operations, safety, and on-ground project delivery.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    linkedin: '#',
    instagram: '#',
    email: 'rohit@griffinconstruction.in',
  },
  {
    name: 'Priya Mehta',
    role: 'Design & Planning Lead',
    bio: 'Bringing creative, functional, and sustainable design solutions to life.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    linkedin: '#',
    instagram: '#',
    email: 'priya@griffinconstruction.in',
  },
  {
    name: 'Vikram Singh',
    role: 'Business Development',
    bio: 'Building strong client relationships and new project opportunities across regions.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    linkedin: '#',
    instagram: '#',
    email: 'vikram@griffinconstruction.in',
  },
  {
    name: 'Arjun Rawat',
    role: 'Site Engineer',
    bio: 'Ensuring technical precision, site quality, and smooth project progress.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    linkedin: '#',
    instagram: '#',
    email: 'arjun@griffinconstruction.in',
  },
  {
    name: 'Neha Kapoor',
    role: 'HR & Operations',
    bio: 'Supporting our people, processes, and a high-performance work culture.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    linkedin: '#',
    instagram: '#',
    email: 'neha@griffinconstruction.in',
  },
];

export default function TeamPage({ onOpenQuote }) {
  const navigate = useNavigate();

  const handleCareerClick = () => {
    navigate('/contact');
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
            alt="Griffin Team Banner"
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
          <div className="max-w-[500px]">
            {/* Kicker: — OUR TEAM — */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
              <span>OUR TEAM</span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
            </div>

            {/* Heading: Meet Our Team */}
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[44px] text-[#0c1f38] tracking-tight leading-[1.12] mb-3">
              Meet Our Team
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed max-w-[440px]">
              A team of experienced professionals, builders, and problem-solvers committed to delivering
              exceptional results.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE STRENGTH BEHIND GRIFFIN (8 Team Members Grid) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#faf7f2] relative">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          {/* Section Heading & Subtitle */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
              <span>OUR PEOPLE</span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-[38px] text-[#0c1f38] tracking-tight leading-snug mb-3">
              The Strength Behind Griffin
            </h2>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed">
              Our team brings together diverse expertise, a shared passion for construction,
              and a commitment to building lasting value.
            </p>
          </div>

          {/* 8 Team Member Cards (4 columns x 2 rows) matching reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-[#fffdfa] rounded-2xl p-5 border border-[#e8dfd3] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(216,137,24,0.12)] hover:border-[#dfceb8] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>

                  {/* Name */}
                  <h3 className="font-serif font-bold text-lg sm:text-[19px] text-[#0c1f38] leading-snug mb-1 group-hover:text-[#d88918] transition-colors">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <div className="text-[11px] sm:text-xs font-bold text-[#d88918] mb-2.5 tracking-wide">
                    {member.role}
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-[12.5px] text-[#556477] leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                {/* Social Links Row at Bottom */}
                <div className="pt-3 border-t border-[#f0e8dc] flex items-center gap-3 text-[#7b8a9b]">
                  {/* LinkedIn */}
                  <a
                    href={member.linkedin}
                    aria-label={`${member.name} LinkedIn`}
                    className="w-7 h-7 rounded-lg bg-[#f7f2e8] hover:bg-[#d88918] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href={member.instagram}
                    aria-label={`${member.name} Instagram`}
                    className="w-7 h-7 rounded-lg bg-[#f7f2e8] hover:bg-[#d88918] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>

                  {/* Mail */}
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className="w-7 h-7 rounded-lg bg-[#f7f2e8] hover:bg-[#d88918] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 stroke-[2]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DARK NAVY STATS STRIP matching reference */}
      <section className="bg-[#081626] text-white py-10 sm:py-12 relative overflow-hidden">
        {/* Subtle Griffin Watermark */}
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.06] w-64 sm:w-80 h-auto">
          <img src="/logo-mark.png" alt="" className="w-full h-auto" />
        </div>

        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Stat 1 */}
            <div className="p-4 sm:p-6 text-center flex flex-col items-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#d88918] mb-2 stroke-[1.8]" />
              <div className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#d88918] mb-1 tracking-tight">
                15+
              </div>
              <div className="text-[11px] sm:text-xs text-[#aeb9c6] font-medium tracking-wide">
                Team Members
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 sm:p-6 text-center flex flex-col items-center">
              <HardHat className="w-5 h-5 sm:w-6 sm:h-6 text-[#d88918] mb-2 stroke-[1.8]" />
              <div className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#d88918] mb-1 tracking-tight">
                10+
              </div>
              <div className="text-[11px] sm:text-xs text-[#aeb9c6] font-medium tracking-wide">
                Experts &amp; Engineers
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 sm:p-6 text-center flex flex-col items-center">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#d88918] mb-2 stroke-[1.8]" />
              <div className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#d88918] mb-1 tracking-tight">
                100%
              </div>
              <div className="text-[11px] sm:text-xs text-[#aeb9c6] font-medium tracking-wide">
                Project Focused
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-4 sm:p-6 text-center flex flex-col items-center">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#d88918] mb-2 stroke-[1.8]" />
              <div className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#d88918] mb-1 tracking-tight">
                5+
              </div>
              <div className="text-[11px] sm:text-xs text-[#aeb9c6] font-medium tracking-wide">
                Years Together
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. JOIN OUR GROWING TEAM CTA BANNER matching reference */}
      <section className="relative overflow-hidden bg-[#081626] text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left: Building Image with Angled Cut */}
          <div className="md:col-span-4 lg:col-span-3 relative h-48 md:h-full min-h-[160px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              alt="Griffin Architecture"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = '/Golden-Riverside-Castle.png';
              }}
            />
            {/* Shading overlay into the dark banner */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#081626]" />
          </div>

          {/* Right: Content & CTA Action */}
          <div className="md:col-span-8 lg:col-span-9 p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-white mb-1.5">
                Join Our Growing Team
              </h2>
              <p className="text-xs sm:text-sm text-[#aeb9c6] max-w-xl">
                Be part of a company that builds more than structures — we build opportunities, careers,
                and lasting impact.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCareerClick}
              className="shrink-0 bg-[#d88918] hover:bg-[#c27912] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-md cursor-pointer group"
            >
              <span>View Careers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

