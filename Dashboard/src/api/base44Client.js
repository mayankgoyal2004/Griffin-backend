// Griffin Construction CMS - Standalone Client & Local Data Store
// Replaces Base44 backend with a robust client-side storage engine.

const isBrowser = typeof window !== "undefined";

function getStorage(key, fallback) {
  if (!isBrowser) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Storage error:", err);
  }
}

// Initial Seed Data
const SEED_DATA = {
  WebsitePage: [
    {
      id: "page_home",
      slug: "home",
      title: "Home Page",
      page_type: "home",
      heading: "Building Tomorrow's Landmarks With Griffin",
      subtitle: "Residential, commercial and infrastructure projects delivered with uncompromising precision — from first survey to final handover.",
      cta_text: "View All Projects",
      cta_link: "/dashboard/projects",
      seo_title: "Griffin Construction — Building Tomorrow's Landmarks",
      seo_description: "Premier construction, real estate development and civil engineering partner.",
      sections: [
        {
          key: "about",
          heading: "Two decades of building with intent",
          description: "Griffin Construction began as a single-site contractor and grew into a full-service development partner. We plan carefully, build honestly and hand over work we are proud to sign.",
        },
        {
          key: "services",
          heading: "Comprehensive Construction & Development Services",
          description: "From conceptual design through turnkey handover, our multidisciplinary teams deliver excellence across every square foot.",
        },
        {
          key: "final-cta",
          heading: "Have a project in mind?",
          description: "Speak with our principal engineers and project leaders to turn your vision into enduring reality.",
          cta_text: "Contact Our Team",
          cta_link: "/contact",
        },
      ],
      stats: [
        { value: "24+", label: "Years building" },
        { value: "180+", label: "Projects delivered" },
        { value: "96%", label: "Repeat clients" },
      ],
      advantages: [
        { title: "Precision Engineering", description: "Rigorous quality control and zero tolerance for defect margins." },
        { title: "Transparent Timelines", description: "Milestone-driven project scheduling with real-time stakeholder reporting." },
        { title: "Sustainable Methods", description: "Energy-efficient architecture, eco-friendly concrete, and green ratings." },
      ],
    },
    {
      id: "page_about",
      slug: "about",
      title: "About Us",
      page_type: "about",
      heading: "Engineering Excellence with Griffin Strength",
      subtitle: "Delivering world-class residential, commercial, and industrial landmarks across the country.",
      sections: [],
    },
    {
      id: "page_contact",
      slug: "contact",
      title: "Contact Us",
      page_type: "contact",
      heading: "Get in Touch With Our Team",
      subtitle: "We are ready to discuss your next construction or development project.",
      sections: [],
    },
    {
      id: "page_privacy",
      slug: "privacy-policy",
      title: "Privacy Policy",
      page_type: "legal",
      heading: "Privacy Policy",
      subtitle: "How we collect, protect and process your data.",
      sections: [],
    },
    {
      id: "page_terms",
      slug: "terms",
      title: "Terms and Conditions",
      page_type: "legal",
      heading: "Terms and Conditions",
      subtitle: "Standard contractual terms and usage policies.",
      sections: [],
    },
  ],

  Service: [
    {
      id: "srv_1",
      title: "Real Estate Development",
      slug: "real-estate-development",
      category: "Commercial",
      short_description: "End-to-end property development with modern design and high investment yield.",
      full_description: "Comprehensive real estate development services from land acquisition and site feasibility to architectural planning, regulatory clearances, construction execution, and sales facilitation.",
      icon: "Home",
      card_image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      hero_image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      overview_image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      display_order: 1,
      featured: true,
      published: true,
      key_features: ["Master-planned residential & commercial complexes", "Land feasibility & regulatory approvals", "Turnkey construction management", "Investment lifecycle advisory"],
      updated_date: "2026-03-10T12:00:00.000Z",
    },
    {
      id: "srv_2",
      title: "Transport & Logistics",
      slug: "transport-and-logistics",
      category: "Industrial",
      short_description: "Reliable heavy transport, specialized construction fleet, and on-site logistics management.",
      full_description: "Heavy haulage, ready-mix logistics, aggregate transport, and smart supply chain coordination tailored to large-scale infrastructure and industrial job sites.",
      icon: "Truck",
      card_image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      hero_image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
      overview_image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      display_order: 2,
      featured: true,
      published: true,
      key_features: ["Heavy construction machinery haulage", "Real-time GPS fleet tracking", "Bulk material logistics", "On-site warehousing coordination"],
      updated_date: "2026-03-09T10:00:00.000Z",
    },
    {
      id: "srv_3",
      title: "Architectural Planning & Design",
      slug: "architectural-planning-and-design",
      category: "Commercial",
      short_description: "Award-winning architectural concepts, BIM 3D modeling, and structural blueprinting.",
      full_description: "BIM 3D modeling, sustainable green building design, seismic structural planning, and interior architectural detailing for modern urban spaces.",
      icon: "Building2",
      card_image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      hero_image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
      overview_image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      display_order: 3,
      featured: true,
      published: true,
      key_features: ["Full BIM 3D visual integration", "LEED green building certification guidance", "Seismic structural stability analysis", "Ergonomic interior space planning"],
      updated_date: "2026-03-08T09:00:00.000Z",
    },
    {
      id: "srv_4",
      title: "Infrastructure & Civil Works",
      slug: "infrastructure-and-civil-works",
      category: "Infrastructure",
      short_description: "Bridges, arterial roadways, grade-separated flyovers, and urban civic infrastructure.",
      full_description: "High-load civil infrastructure, grade-separated flyovers, stormwater drainage, and arterial road networks built to withstand demanding loads.",
      icon: "HardHat",
      card_image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
      hero_image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=80",
      overview_image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80",
      display_order: 4,
      featured: false,
      published: true,
      key_features: ["Municipal and arterial road paving", "Heavy bridge and culvert construction", "Underground utility networks", "Earthworks and slope stabilization"],
      updated_date: "2026-03-07T14:00:00.000Z",
    },
  ],

  Project: [
    {
      id: "proj_1",
      name: "Griffin Skyview Heights",
      slug: "griffin-skyview-heights",
      category: "Residential",
      location: "Sector 82, Mohali, Punjab",
      client_name: "Skyview Real Estate Ltd",
      status: "Ongoing",
      start_date: "2024-03-01",
      completion_date: "2026-12-31",
      short_description: "Twin 28-storey luxury residential towers with panoramic city views and gold-rated green efficiency.",
      full_description: "A prestigious residential project featuring earthquake-resistant reinforced RCC framing, sky lounges, rooftop infinity pool, and gold-rated green building efficiency.",
      cover_image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      ],
      display_order: 1,
      featured: true,
      published: true,
      updated_date: "2026-03-10T16:00:00.000Z",
    },
    {
      id: "proj_2",
      name: "Golden Riverside Commercial Complex",
      slug: "golden-riverside-commercial-complex",
      category: "Commercial",
      location: "IT Park, Chandigarh",
      client_name: "Riverside Corporate Group",
      status: "Completed",
      start_date: "2022-06-15",
      completion_date: "2025-01-20",
      short_description: "State-of-the-art corporate headquarters spanning 450,000 sq ft with integrated HVAC automation.",
      full_description: "Modern commercial glass-facade tower incorporating multi-level underground parking, high-speed smart elevators, and integrated HVAC automation.",
      cover_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      display_order: 2,
      featured: true,
      published: true,
      updated_date: "2026-03-08T11:00:00.000Z",
    },
    {
      id: "proj_3",
      name: "Griffin Logistics & Warehousing Hub",
      slug: "griffin-logistics-warehousing-hub",
      category: "Industrial",
      location: "GT Road, Ludhiana, Punjab",
      client_name: "Apex Logistics India",
      status: "Completed",
      start_date: "2023-01-10",
      completion_date: "2024-08-30",
      short_description: "Prefabricated steel warehouse and multi-modal freight terminal with laser-screed flooring.",
      full_description: "Engineered pre-engineered building (PEB) structure with laser-screed flooring, heavy-duty dock levellers, and solar PV roof installation.",
      cover_image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      display_order: 3,
      featured: true,
      published: true,
      updated_date: "2026-03-06T15:00:00.000Z",
    },
    {
      id: "proj_4",
      name: "Royal Heritage Villa Enclave",
      slug: "royal-heritage-villa-enclave",
      category: "Residential",
      location: "Pinjore Hills, Panchkula",
      client_name: "Private Consortium",
      status: "Completed",
      start_date: "2021-09-01",
      completion_date: "2023-11-15",
      short_description: "Gated community of 35 bespoke luxury hill villas with artisan stone masonry.",
      full_description: "Custom artisan stone masonry combined with contemporary timber engineering, landscaped terraced gardens, and private solar heating systems.",
      cover_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      display_order: 4,
      featured: false,
      published: true,
      updated_date: "2026-03-04T09:30:00.000Z",
    },
  ],

  BlogPost: [
    {
      id: "post_1",
      title: "Sustainable Construction: Trends Defining 2026",
      slug: "sustainable-construction-trends-2026",
      excerpt: "How low-carbon concrete, circular materials, and solar facades are revolutionizing modern commercial builds.",
      content: "<p>The construction sector is experiencing a monumental shift towards decarbonization and sustainable building practices. From low-carbon geopolymer concrete to smart glass facades, the projects rising today must balance durability with environmental responsibility.</p><p>At Griffin Construction, every new blueprint integrates passive cooling, rainwater harvesting, and recycled structural materials.</p>",
      author: "Mayank Goyal",
      category: "Industry Insights",
      tags: ["Sustainability", "Materials", "Green Building"],
      publication_date: "2026-02-15",
      reading_time: 5,
      featured: true,
      published: true,
      featured_image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
      updated_date: "2026-03-10T14:30:00.000Z",
    },
    {
      id: "post_2",
      title: "Innovations in High-Rise Structural Engineering",
      slug: "innovations-high-rise-structural-engineering",
      excerpt: "Exploring tuned mass dampers, composite steel columns, and seismic mitigation systems.",
      content: "<p>Taller towers demand bolder engineering. By utilizing computational stress modeling and composite materials, today's engineers can build structures that gracefully absorb wind and seismic pressures.</p>",
      author: "Er. Vikram Malhotra",
      category: "Engineering",
      tags: ["Structural", "High-Rise", "Technology"],
      publication_date: "2026-01-28",
      reading_time: 4,
      featured: false,
      published: true,
      featured_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      updated_date: "2026-03-05T11:00:00.000Z",
    },
  ],

  ContactInquiry: [
    {
      id: "inq_1",
      full_name: "Rajesh Sharma",
      email: "rajesh.sharma@example.com",
      phone: "+91 98140 22334",
      subject: "Commercial Office Park Development Quote",
      project_type: "Commercial",
      message: "We are planning a 120,000 sq ft office campus in Mohali and would like to review Griffin's portfolio and discuss scheduling an initial feasibility survey.",
      status: "New",
      assigned_to: "Mayank Goyal",
      created_date: "2026-03-10T10:30:00.000Z",
      updated_date: "2026-03-10T10:30:00.000Z",
    },
    {
      id: "inq_2",
      full_name: "Priya Patel",
      email: "priya.patel@horizoninfra.in",
      phone: "+91 98765 43210",
      subject: "Logistics Hub Civil Contracting",
      project_type: "Industrial",
      message: "Inquiry regarding specialized grade-slab concrete flooring and steel framing contractors for our warehouse expansion in Ludhiana.",
      status: "In Progress",
      assigned_to: "Er. Vikram Malhotra",
      created_date: "2026-03-08T14:15:00.000Z",
      updated_date: "2026-03-09T11:20:00.000Z",
    },
    {
      id: "inq_3",
      full_name: "Col. Harpreet Singh",
      email: "harpreet.singh@example.com",
      phone: "+91 94170 55667",
      subject: "Luxury Hillside Villa Construction",
      project_type: "Residential",
      message: "Looking for an end-to-end design and construction partner for a 6,500 sq ft custom villa in Pinjore hills.",
      status: "Contacted",
      assigned_to: "Mayank Goyal",
      created_date: "2026-03-05T09:45:00.000Z",
      updated_date: "2026-03-06T16:00:00.000Z",
    },
  ],

  TeamMember: [
    {
      id: "team_1",
      full_name: "Mayank Goyal",
      designation: "Managing Director & CEO",
      short_bio: "20+ years steering landmark civil, commercial, and residential developments across North India.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      linkedin_url: "https://linkedin.com",
      email: "mayank@griffinconstruction.in",
      experience: "20+ Years",
      skills: ["Project Leadership", "Real Estate Development", "Infrastructure Strategy"],
      featured: true,
      published: true,
      display_order: 1,
      updated_date: "2026-03-10T12:00:00.000Z",
    },
    {
      id: "team_2",
      full_name: "Ar. Sunita Rao",
      designation: "Chief Architect & Head of Design",
      short_bio: "Master of Architecture specializing in biophilic design, smart urbanism, and green high-rises.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      linkedin_url: "https://linkedin.com",
      email: "sunita.rao@griffinconstruction.in",
      experience: "15+ Years",
      skills: ["Architectural Design", "BIM 3D", "LEED AP"],
      featured: true,
      published: true,
      display_order: 2,
      updated_date: "2026-03-08T12:00:00.000Z",
    },
    {
      id: "team_3",
      full_name: "Er. Vikram Malhotra",
      designation: "Director of Structural Engineering",
      short_bio: "Expert in deep foundation systems, earthquake-resistant RCC frameworks, and pre-engineered steel buildings.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      linkedin_url: "https://linkedin.com",
      email: "vikram@griffinconstruction.in",
      experience: "18+ Years",
      skills: ["Structural Analysis", "Heavy Foundation", "Safety Compliance"],
      featured: true,
      published: true,
      display_order: 3,
      updated_date: "2026-03-05T12:00:00.000Z",
    },
  ],

  SiteSettings: [
    {
      id: "settings_global",
      company_name: "Griffin Construction",
      tagline: "Building a Stronger Tomorrow",
      phone: "+91 123 456 7890",
      email: "contact@griffinconstruction.in",
      address: "Mohali, Punjab – 160055, India",
      working_hours: "Mon - Sat: 9:00 AM - 7:00 PM",
      website_url: "https://griffinconstruction.in",
      phone_display: "+91 123 456 7890",
      header_cta_text: "Get a Quote",
      header_cta_link: "/contact",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      footer_description: "A premier construction and real estate development partner delivering residential, commercial and infrastructure landmarks with uncompromising precision.",
      copyright_text: "© 2026 Griffin Construction. All rights reserved.",
      updated_date: "2026-03-10T10:00:00.000Z",
    },
  ],

  MediaAsset: [
    {
      id: "media_1",
      name: "Griffin-Skyview-Tower.jpg",
      file_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      file_type: "Image",
      mime_type: "image/jpeg",
      size: 1420500,
      folder: "Projects",
      alt_text: "Griffin Skyview Towers",
      created_date: "2026-03-01T10:00:00.000Z",
      updated_date: "2026-03-01T10:00:00.000Z",
    },
    {
      id: "media_2",
      name: "Riverside-Complex-Render.jpg",
      file_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      file_type: "Image",
      mime_type: "image/jpeg",
      size: 2120000,
      folder: "Projects",
      alt_text: "Golden Riverside Commercial Complex",
      created_date: "2026-03-02T11:00:00.000Z",
      updated_date: "2026-03-02T11:00:00.000Z",
    },
  ],

  ActivityLog: [
    {
      id: "act_1",
      action: "updated",
      entity_type: "Project",
      entity_title: "Griffin Skyview Heights",
      user_email: "admin@griffinconstruction.in",
      user_name: "Admin User",
      created_date: "2026-03-11T09:00:00.000Z",
    },
    {
      id: "act_2",
      action: "published",
      entity_type: "BlogPost",
      entity_title: "Sustainable Construction: Trends Defining 2026",
      user_email: "admin@griffinconstruction.in",
      user_name: "Admin User",
      created_date: "2026-03-10T14:30:00.000Z",
    },
    {
      id: "act_3",
      action: "received",
      entity_type: "ContactInquiry",
      entity_title: "Rajesh Sharma",
      user_email: "system@griffinconstruction.in",
      user_name: "Website System",
      created_date: "2026-03-10T10:30:00.000Z",
    },
  ],

  User: [
    {
      id: "user_admin_1",
      email: "admin@griffinconstruction.in",
      full_name: "Admin User",
      role: "admin",
      created_date: "2026-01-01T00:00:00.000Z",
      updated_date: "2026-01-01T00:00:00.000Z",
    },
    {
      id: "user_editor_1",
      email: "editor@griffinconstruction.in",
      full_name: "Editor User",
      role: "user",
      created_date: "2026-01-05T00:00:00.000Z",
      updated_date: "2026-01-05T00:00:00.000Z",
    },
  ],
};

function matchesQuery(item, query = {}) {
  for (const [key, val] of Object.entries(query)) {
    if (val && typeof val === "object" && "$in" in val) {
      if (!val.$in.includes(item[key])) return false;
      continue;
    }
    if (item[key] !== val) return false;
  }
  return true;
}

function sortItems(items, sort) {
  if (!sort) return items;
  const isDesc = sort.startsWith("-");
  const field = isDesc ? sort.slice(1) : sort;
  return [...items].sort((a, b) => {
    let va = a[field];
    let vb = b[field];
    if (va === undefined || va === null) return 1;
    if (vb === undefined || vb === null) return -1;
    if (typeof va === "string") {
      const cmp = va.localeCompare(String(vb));
      return isDesc ? -cmp : cmp;
    }
    return isDesc ? (vb > va ? 1 : vb < va ? -1 : 0) : (va > vb ? 1 : va < vb ? -1 : 0);
  });
}

function createEntityStore(entityName, defaults) {
  const storageKey = `griffin_cms_${entityName}`;

  const getItems = () => getStorage(storageKey, defaults);
  const saveItems = (items) => setStorage(storageKey, items);

  return {
    async list(sort = "-updated_date", limit, skip = 0) {
      let items = getItems();
      items = sortItems(items, sort);
      if (skip) items = items.slice(skip);
      if (limit) items = items.slice(0, limit);
      return items;
    },

    async filter(query = {}, options = {}) {
      let items = getItems();
      if (Object.keys(query).length > 0) {
        items = items.filter((item) => matchesQuery(item, query));
      }
      if (options.sort) {
        items = sortItems(items, options.sort);
      }
      const limit = options.limit || 50;
      let startIndex = 0;
      if (options.cursor) {
        const found = items.findIndex((i) => i.id === options.cursor);
        if (found !== -1) startIndex = found + 1;
      }
      const paginated = items.slice(startIndex, startIndex + limit);
      const nextIndex = startIndex + limit;
      const has_more = nextIndex < items.length;
      const next_cursor = has_more && paginated.length > 0 ? paginated[paginated.length - 1].id : null;

      return {
        items: paginated,
        has_more,
        next_cursor,
        total: items.length,
      };
    },

    async get(id) {
      const items = getItems();
      const found = items.find((i) => i.id === id || i.slug === id);
      if (!found) {
        throw new Error(`${entityName} not found with id: ${id}`);
      }
      return found;
    },

    async create(data) {
      const items = getItems();
      const now = new Date().toISOString();
      const newItem = {
        ...data,
        id: data.id || `${entityName.toLowerCase()}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        created_date: now,
        updated_date: now,
      };
      items.unshift(newItem);
      saveItems(items);
      return newItem;
    },

    async update(id, data) {
      const items = getItems();
      const index = items.findIndex((i) => i.id === id || i.slug === id);
      if (index === -1) {
        throw new Error(`${entityName} not found: ${id}`);
      }
      const updated = {
        ...items[index],
        ...data,
        updated_date: new Date().toISOString(),
      };
      items[index] = updated;
      saveItems(items);
      return updated;
    },

    async delete(id) {
      const items = getItems();
      const filtered = items.filter((i) => i.id !== id && i.slug !== id);
      saveItems(filtered);
      return { success: true, id };
    },

    async count(query = {}) {
      const items = getItems();
      if (!query || Object.keys(query).length === 0) return items.length;
      return items.filter((item) => matchesQuery(item, query)).length;
    },

    async aggregate({ query = {}, groupBy = "category" } = {}) {
      let items = getItems();
      if (query && Object.keys(query).length > 0) {
        items = items.filter((item) => matchesQuery(item, query));
      }
      const counts = {};
      for (const item of items) {
        const key = item[groupBy] || "Uncategorised";
        counts[key] = (counts[key] || 0) + 1;
      }
      const rows = Object.entries(counts).map(([key, count]) => ({
        [groupBy]: key,
        category: key,
        _id: key,
        key,
        count,
      }));
      return { rows };
    },
  };
}

// Client Auth Store
const AUTH_SESSION_KEY = "griffin_auth_session";
const AUTH_TOKEN_KEY = "griffin_auth_token";

const DEFAULT_USER = {
  id: "user_admin_1",
  email: "admin@griffinconstruction.in",
  full_name: "Admin User",
  role: "admin",
};

const authStore = {
  hasToken() {
    if (!isBrowser) return true;
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    // Auto-initialize default admin token if not present
    if (token === null) {
      localStorage.setItem(AUTH_TOKEN_KEY, "admin-session-active");
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(DEFAULT_USER));
      return true;
    }
    return !!token;
  },

  async me() {
    if (!isBrowser) return DEFAULT_USER;
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return DEFAULT_USER;
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_USER;
    }
  },

  async loginWithPassword({ email, password, full_name, role }) {
    const user = {
      id: `user_${Date.now()}`,
      email: email || "admin@griffinconstruction.in",
      full_name: full_name || (email ? email.split("@")[0].replace(/\./g, " ") : "Admin User"),
      role: role || (email && email.includes("editor") ? "user" : "admin"),
    };
    if (isBrowser) {
      localStorage.setItem(AUTH_TOKEN_KEY, "admin-session-active");
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
    }
    return { user, access_token: "admin-session-active" };
  },

  async register({ email, password, full_name, role }) {
    return this.loginWithPassword({ email, password, full_name, role });
  },

  async logout(redirectUrl) {
    if (isBrowser) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_SESSION_KEY);
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    }
  },

  setToken(token) {
    if (isBrowser) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  },

  redirectToLogin(returnTo) {
    if (isBrowser) {
      window.location.href = `/login?returnTo=${encodeURIComponent(returnTo || "/dashboard")}`;
    }
  },

  async updateMe(data) {
    const current = await this.me();
    const updated = { ...current, ...data };
    if (isBrowser) {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(updated));
    }
    return updated;
  },

  async resetPasswordRequest() {
    return { success: true };
  },

  async resetPassword() {
    return { success: true };
  },
};

// Integrations (File upload)
const integrationsStore = {
  Core: {
    async UploadPublicFile({ file }) {
      if (!file) throw new Error("No file provided");
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({ file_url: reader.result });
        };
        reader.onerror = () => {
          resolve({ file_url: URL.createObjectURL(file) });
        };
        reader.readAsDataURL(file);
      });
    },
  },
};

// User store (invites)
const usersStore = {
  async inviteUser(email, role = "user") {
    const userStore = createEntityStore("User", SEED_DATA.User);
    const user = await userStore.create({
      email,
      full_name: email.split("@")[0].replace(/\./g, " "),
      role,
    });
    return user;
  },
};

export const base44 = {
  auth: authStore,
  entities: {
    WebsitePage: createEntityStore("WebsitePage", SEED_DATA.WebsitePage),
    Service: createEntityStore("Service", SEED_DATA.Service),
    Project: createEntityStore("Project", SEED_DATA.Project),
    BlogPost: createEntityStore("BlogPost", SEED_DATA.BlogPost),
    ContactInquiry: createEntityStore("ContactInquiry", SEED_DATA.ContactInquiry),
    TeamMember: createEntityStore("TeamMember", SEED_DATA.TeamMember),
    SiteSettings: createEntityStore("SiteSettings", SEED_DATA.SiteSettings),
    MediaAsset: createEntityStore("MediaAsset", SEED_DATA.MediaAsset),
    ActivityLog: createEntityStore("ActivityLog", SEED_DATA.ActivityLog),
    User: createEntityStore("User", SEED_DATA.User),
  },
  integrations: integrationsStore,
  users: usersStore,
};

export const api = base44;
export default base44;
