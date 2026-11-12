import React, { useState, useMemo } from 'react';
import {
  Search,
  HardHat,
  Building2,
  Layers,
  TrendingUp,
  Leaf,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  CheckCircle2,
  X,
  Share2,
  Bookmark,
  Sparkles,
} from 'lucide-react';

export const BLOG_POSTS = [
  {
    id: 'sustainable-construction-2026',
    title: 'The Future of Sustainable Construction',
    slug: 'the-future-of-sustainable-construction',
    category: 'Construction',
    categoryIcon: HardHat,
    date: 'May 12, 2026',
    readTime: '6 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Explore how eco-friendly materials, smart design, and green building practices are shaping the next generation of construction.',
    content: `
      <p class="lead">The construction industry is undergoing a monumental paradigm shift. As environmental priorities align with technological breakthroughs, sustainable construction has transformed from an experimental trend into the foundational standard for modern developments.</p>
      
      <h3>1. Net-Zero & Carbon-Negative Materials</h3>
      <p>Traditional concrete and steel production account for significant global carbon emissions. Forward-thinking builders are now deploying cross-laminated timber (CLT), geopolymer concretes, and bio-composites that actively sequester carbon over their lifespan.</p>
      
      <h3>2. Intelligent Energy Systems</h3>
      <p>Passive solar architecture, high-performance thermal envelopes, and integrated smart-grid solar arrays ensure modern commercial assets produce as much clean energy as they consume.</p>
      
      <h3>3. Circular Lifecycle Management</h3>
      <p>From pre-fabricated modular components to cradle-to-cradle material passports, projects are planned not just for immediate utility, but for effortless adaptability and clean decommissioning decades down the line.</p>
    `,
    author: {
      name: 'Elena Rostova',
      role: 'Head of Sustainable Engineering',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'real-estate-tips-2026',
    title: 'Top 5 Real Estate Investment Tips for 2026',
    slug: 'top-5-real-estate-investment-tips-2026',
    category: 'Real Estate',
    categoryIcon: Building2,
    date: 'Apr 20, 2026',
    readTime: '5 min read',
    popular: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Practical insights to help you make smarter and more profitable real estate investments this year.',
    content: `
      <p class="lead">Navigating today’s real estate landscape requires balancing emerging demographic shifts, transit-oriented growth, and sustainable asset appreciation.</p>
      
      <h3>1. Prioritize Transit-Connected Suburbs</h3>
      <p>High-speed commuter corridors and multi-modal transit links continue to drive outsized capital appreciation for suburban master-planned communities.</p>
      
      <h3>2. Focus on ESG-Certified Developments</h3>
      <p>Commercial and multi-family assets with verifiable green certifications command higher tenant retention rates and lower operating cost profiles.</p>
      
      <h3>3. Leverage Mixed-Use Density</h3>
      <p>Developments integrating retail, residential, and collaborative spaces outperform single-purpose properties across all economic cycles.</p>
    `,
    author: {
      name: 'Marcus Vance',
      role: 'Senior Portfolio Strategist',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'choose-construction-partner',
    title: 'How to Choose the Right Construction Partner',
    slug: 'how-to-choose-the-right-construction-partner',
    category: 'Construction',
    categoryIcon: HardHat,
    date: 'Apr 10, 2026',
    readTime: '7 min read',
    popular: true,
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Key factors to consider when selecting a reliable construction company for your next project.',
    content: `
      <p class="lead">Choosing the right general contractor or design-build firm is the single most critical decision determining project quality, safety, schedule fidelity, and financial outcome.</p>
      
      <h3>1. Transparent Cost Engineering</h3>
      <p>Seek partners offering open-book procurement and robust value-engineering early in the design phase rather than relying on contentious post-bid change orders.</p>
      
      <h3>2. Proven Safety Records</h3>
      <p>A rigorous safety culture directly correlates with operational efficiency. Always examine a firm’s Experience Modification Rate (EMR) and incident track record.</p>
      
      <h3>3. Comprehensive Subcontractor Networks</h3>
      <p>Established relationships with premier trade partners ensure premium craftsmanship and consistent material delivery even amid supply chain friction.</p>
    `,
    author: {
      name: 'David Kowalski',
      role: 'Director of Field Operations',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'technology-modern-construction',
    title: 'The Role of Technology in Modern Construction',
    slug: 'the-role-of-technology-in-modern-construction',
    category: 'Industry Trends',
    categoryIcon: TrendingUp,
    date: 'Mar 28, 2026',
    readTime: '5 min read',
    popular: true,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'From BIM to smart project management, explore how technology is transforming the construction industry.',
    content: `
      <p class="lead">Digital twin modeling, autonomous drone site surveys, and AI-assisted clash detection are eliminating costly rework and redefining construction productivity.</p>
      
      <h3>1. 4D and 5D Building Information Modeling (BIM)</h3>
      <p>Modern BIM integrates physical dimensions with real-time project scheduling (4D) and continuous cost telemetry (5D), allowing stakeholders to simulate full build sequences before breaking ground.</p>
      
      <h3>2. Drone LiDAR & Photogrammetry</h3>
      <p>Weekly aerial scanning produces sub-centimeter volumetric analysis for earthwork, structural alignment, and automated stakeholder reporting.</p>
    `,
    author: {
      name: 'Sofia Chen',
      role: 'Chief Innovation Officer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'green-building-practices',
    title: 'Green Building Practices That Make a Difference',
    slug: 'green-building-practices-that-make-a-difference',
    category: 'Sustainability',
    categoryIcon: Leaf,
    date: 'Mar 15, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Sustainable construction approaches that reduce environmental impact and create long-term value.',
    content: `
      <p class="lead">Modern sustainability isn't just about regulatory compliance—it is an economic driver that lowers operating costs and creates healthier living environments.</p>
      
      <h3>1. Rainwater Harvesting & Greywater Recycling</h3>
      <p>Integrated retention systems capture runoff for on-site landscaping and non-potable building systems, slashing municipal water demand by up to 60%.</p>
      
      <h3>2. Living Facades and Biophilic Architecture</h3>
      <p>Vertical foliage buffers building temperatures, cuts urban heat island effects, and measurably enhances occupant wellbeing and cognitive productivity.</p>
    `,
    author: {
      name: 'Elena Rostova',
      role: 'Head of Sustainable Engineering',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'effective-project-management',
    title: 'Effective Project Management in Construction',
    slug: 'effective-project-management-in-construction',
    category: 'Project Management',
    categoryIcon: Layers,
    date: 'Mar 08, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Best practices, tools, and strategies to keep construction projects on time, within budget, and on track.',
    content: `
      <p class="lead">Successful project execution lies at the intersection of rigorous milestone governance, proactive risk assessment, and transparent communication.</p>
      
      <h3>1. The Last Planner System & Agile Pull-Planning</h3>
      <p>Involving trade supervisors directly in weekly look-ahead commitments creates accountability and eliminates workflow bottlenecks before they impact critical paths.</p>
      
      <h3>2. Real-Time Cloud Progress Tracking</h3>
      <p>Replacing manual clipboard punch-lists with cloud-synced tablet workflows gives owners instant insight into daily production metrics, material arrivals, and safety compliance.</p>
    `,
    author: {
      name: 'Alexander Brandt',
      role: 'VP of Project Delivery',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'construction-trends-2026',
    title: 'Construction Industry Trends to Watch in 2026',
    slug: 'construction-industry-trends-to-watch-in-2026',
    category: 'Construction',
    categoryIcon: HardHat,
    date: 'Feb 25, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'A look at the key trends, innovations, and opportunities that will shape the construction industry this year.',
    content: `
      <p class="lead">From modular off-site prefabrication to predictive AI estimation, 2026 marks a watershed moment for construction productivity and design innovation.</p>
      
      <h3>1. Modular & Prefabricated Construction</h3>
      <p>Controlled factory assembly of wall systems and volumetric pods slashes project build times by 40% while virtually eliminating weather-induced delays.</p>
      
      <h3>2. AI-Driven Procurement & Estimation</h3>
      <p>Machine learning models leverage historical bidding datasets and real-time commodity pricing to generate highly accurate, risk-adjusted cost projections.</p>
    `,
    author: {
      name: 'David Kowalski',
      role: 'Director of Field Operations',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  },
];

const CATEGORIES = [
  { label: 'All Articles', count: 18, icon: Sparkles },
  { label: 'Construction', count: 12, icon: HardHat },
  { label: 'Real Estate', count: 8, icon: Building2 },
  { label: 'Project Management', count: 5, icon: Layers },
  { label: 'Industry Trends', count: 7, icon: TrendingUp },
  { label: 'Sustainability', count: 6, icon: Leaf },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === 'All Articles' || post.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost.id);
  const popularPosts = BLOG_POSTS.filter((p) => p.popular).slice(0, 3);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSubscribed(false);
    }, 4000);
  };

  return (
    <div className="relative w-full pt-[68px] bg-[#faf7f2] text-[#111d2c] min-h-[calc(100vh-68px)]">
      {/* 1. TOP HERO BANNER matching reference screenshot */}
      <section className="relative w-full overflow-hidden flex items-center bg-[#faf7f2] min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]">
        {/* Panoramic Cityscape Artwork with Griffin */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <img
            src="/Golden-Riverside-Castle.png"
            alt="Griffin Insights and Updates"
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
            {/* Kicker: — OUR BLOG — */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#d88918] mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
              <span>OUR BLOG</span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#d88918]" />
            </div>

            {/* Heading: Insights & Updates */}
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[44px] text-[#0c1f38] tracking-tight leading-[1.12] mb-3">
              Insights &amp; Updates
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#556477] leading-relaxed max-w-[430px]">
              Stay informed with the latest trends, expert insights, and updates from the world of
              construction and real estate.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS BAR (Horizontal Filter Tabs matching Reference) */}
      <div className="border-b border-[#ece4d6] bg-[#faf7f2]/95 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-3.5 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory.toLowerCase() === cat.label.toLowerCase();
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.label);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#d88918] text-white shadow-[0_4px_14px_rgba(216,137,24,0.35)] scale-[1.02]'
                      : 'bg-[#f4efe5] text-[#4b5c70] border border-[#e8ded0] hover:bg-[#ede5d6] hover:text-[#0c1f38]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#d88918]'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT: 2-COLUMN LAYOUT (Articles 70% + Sidebar 30%) */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ================= LEFT COLUMN: ARTICLES (8 COLS) ================= */}
          <div className="lg:col-span-8 space-y-10">
            {/* A. FEATURED ARTICLE CARD (Horizontal Hero Card matching reference) */}
            {(!searchQuery || featuredPost.title.toLowerCase().includes(searchQuery.toLowerCase())) && (
              <div className="bg-white rounded-2xl border border-[#e8dfd3] shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden group hover:shadow-[0_16px_40px_rgba(216,137,24,0.12)] transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                  {/* Featured Card Image */}
                  <div className="md:col-span-6 relative overflow-hidden min-h-[220px] md:min-h-[280px]">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 bg-[#d88918] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 fill-white" />
                      <span>Featured</span>
                    </div>
                  </div>

                  {/* Featured Card Content */}
                  <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between">
                    <div>
                      {/* Category & Date */}
                      <div className="flex items-center gap-2 text-xs text-[#718298] font-medium mb-2.5">
                        <span className="flex items-center gap-1 text-[#d88918] font-semibold">
                          <HardHat className="w-3.5 h-3.5 stroke-[2.2]" />
                          <span>{featuredPost.category}</span>
                        </span>
                        <span>•</span>
                        <span>{featuredPost.date}</span>
                      </div>

                      {/* Title */}
                      <h2 className="font-serif font-extrabold text-xl sm:text-2xl text-[#0c1f38] leading-tight mb-3 group-hover:text-[#d88918] transition-colors">
                        {featuredPost.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-[#556477] leading-relaxed mb-6">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    {/* Button */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(featuredPost)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d88918] text-white text-xs sm:text-sm font-semibold hover:bg-[#c27912] shadow-[0_4px_14px_rgba(216,137,24,0.35)] transition-all cursor-pointer group-hover:gap-3"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* B. LATEST ARTICLES SECTION */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif font-extrabold text-2xl sm:text-[26px] text-[#0c1f38] tracking-tight">
                  Latest Articles
                </h2>
                <span className="text-xs text-[#718298] font-medium">
                  Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                </span>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#e8dfd3] p-10 text-center">
                  <p className="text-sm text-[#718298] mb-3">No articles match your search criteria.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All Articles');
                    }}
                    className="text-xs font-semibold text-[#d88918] underline hover:text-[#b46e0e]"
                  >
                    Clear filters &amp; view all articles
                  </button>
                </div>
              ) : (
                /* Grid of 6 Cards (2 cols on sm, 3 cols on md/lg) matching reference */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {gridPosts.map((post) => {
                    const CategoryIcon = post.categoryIcon || HardHat;
                    return (
                      <article
                        key={post.id}
                        className="bg-white rounded-2xl border border-[#e8dfd3] shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_28px_rgba(216,137,24,0.12)] hover:border-[#dfceb8] transition-all duration-300 group"
                      >
                        <div>
                          {/* Card Thumbnail */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                              }}
                            />
                          </div>

                          {/* Card Body */}
                          <div className="p-4 sm:p-5">
                            {/* Meta: Category & Date */}
                            <div className="flex items-center gap-1.5 text-[11px] text-[#718298] font-medium mb-2">
                              <span className="flex items-center gap-1 text-[#d88918] font-semibold">
                                <CategoryIcon className="w-3 h-3 stroke-[2.2]" />
                                <span>{post.category}</span>
                              </span>
                              <span>•</span>
                              <span>{post.date}</span>
                            </div>

                            {/* Title */}
                            <h3 className="font-serif font-bold text-sm sm:text-base text-[#0c1f38] leading-snug mb-2 group-hover:text-[#d88918] transition-colors line-clamp-2">
                              {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-xs text-[#556477] leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Read More Link */}
                        <div className="px-4 sm:px-5 pb-4 pt-1">
                          <button
                            type="button"
                            onClick={() => setSelectedArticle(post)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#d88918] hover:text-[#b46e0e] transition-colors group-hover:gap-2 cursor-pointer"
                          >
                            <span>Read More</span>
                            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            {/* C. PAGINATION CONTROLS matching reference screenshot */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-xl border border-[#e8ded0] bg-white text-[#718298] hover:bg-[#f4efe5] hover:text-[#0c1f38] flex items-center justify-center transition-colors cursor-pointer text-xs font-semibold shadow-sm"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                    currentPage === page
                      ? 'bg-[#d88918] text-white shadow-[0_4px_12px_rgba(216,137,24,0.35)]'
                      : 'bg-white text-[#4b5c70] border border-[#e8ded0] hover:bg-[#f4efe5]'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                className="w-9 h-9 rounded-xl border border-[#e8ded0] bg-white text-[#718298] hover:bg-[#f4efe5] hover:text-[#0c1f38] flex items-center justify-center transition-colors cursor-pointer text-xs font-semibold shadow-sm"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: SIDEBAR WIDGETS (4 COLS) ================= */}
          <aside className="lg:col-span-4 space-y-6">
            {/* WIDGET 1: SEARCH ARTICLES */}
            <div className="bg-white rounded-2xl border border-[#e8dfd3] p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
              <h3 className="font-serif font-bold text-lg text-[#0c1f38] mb-3">
                Search Articles
              </h3>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for topics, articles..."
                  className="w-full bg-[#fcfaf7] border border-[#e4dcce] rounded-xl pl-3.5 pr-11 py-2.5 text-xs text-[#111d2c] placeholder-[#8d9cae] focus:outline-none focus:border-[#d88918] focus:ring-2 focus:ring-[#d88918]/20 transition-all"
                />
                <button
                  type="button"
                  aria-label="Submit search"
                  className="absolute right-1 w-8 h-8 rounded-lg bg-[#d88918] text-white flex items-center justify-center hover:bg-[#be7610] transition-colors cursor-pointer shadow-sm"
                >
                  <Search className="w-3.5 h-3.5 stroke-[2.4]" />
                </button>
              </div>
            </div>

            {/* WIDGET 2: CATEGORIES LIST with count badges */}
            <div className="bg-white rounded-2xl border border-[#e8dfd3] p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
              <h3 className="font-serif font-bold text-lg text-[#0c1f38] mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.slice(1).map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory.toLowerCase() === cat.label.toLowerCase();
                  return (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.label);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#fbf3e6] text-[#d88918]'
                          : 'text-[#4b5c70] hover:bg-[#f7f2ea] hover:text-[#0c1f38]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#d88918]" />
                        <span>{cat.label}</span>
                      </div>
                      <span className="text-[11px] text-[#8d9cae] bg-[#f0eae0] px-2 py-0.5 rounded-full font-bold">
                        ({cat.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* WIDGET 3: POPULAR POSTS (3 Thumbnail Rows matching Reference) */}
            <div className="bg-white rounded-2xl border border-[#e8dfd3] p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
              <h3 className="font-serif font-bold text-lg text-[#0c1f38] mb-4">
                Popular Posts
              </h3>
              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedArticle(post)}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xs text-[#0c1f38] leading-snug line-clamp-2 group-hover:text-[#d88918] transition-colors mb-1">
                        {post.title}
                      </h4>
                      <span className="text-[10.5px] text-[#8d9cae] font-medium">
                        {post.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 4: SUBSCRIBE TO OUR NEWSLETTER (Dark Navy Card matching Reference) */}
            <div className="bg-[#0c1f38] text-white rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-[#f2ae38] flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 stroke-[2]" />
                </div>

                <h3 className="font-serif font-bold text-lg text-white mb-2">
                  Subscribe to Our Newsletter
                </h3>

                <p className="text-xs text-slate-300/90 leading-relaxed mb-5">
                  Get the latest articles, project updates, and industry insights directly in your inbox.
                </p>

                {newsletterSubscribed ? (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Thank you for subscribing!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-white text-[#0c1f38] placeholder-slate-400 text-xs rounded-xl pl-3.5 pr-11 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f2ae38]"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="absolute right-1 w-8 h-8 rounded-lg bg-[#d88918] text-white flex items-center justify-center hover:bg-[#be7610] transition-colors cursor-pointer shadow-sm"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 4. ARTICLE DETAIL READING MODAL */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-[760px] w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/8] overflow-hidden bg-slate-900">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {/* Meta */}
              <div className="flex items-center gap-2 text-xs text-[#718298] font-semibold mb-3">
                <span className="text-[#d88918] uppercase tracking-wider">{selectedArticle.category}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0c1f38] leading-tight mb-4">
                {selectedArticle.title}
              </h2>

              {/* Author */}
              <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100">
                <img
                  src={selectedArticle.author.avatar}
                  alt={selectedArticle.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#0c1f38]">{selectedArticle.author.name}</h4>
                  <p className="text-[11px] text-[#718298]">{selectedArticle.author.role}</p>
                </div>
              </div>

              {/* Rich Body */}
              <div
                className="prose prose-slate max-w-none text-xs sm:text-sm text-[#4b5c70] leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Footer CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-[#718298]">Category: <strong>{selectedArticle.category}</strong></span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-xl bg-[#d88918] text-white text-xs font-bold hover:bg-[#be7610] transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

