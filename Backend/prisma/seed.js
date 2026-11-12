// Prisma Database Seeder for Griffin Construction
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for Griffin Construction...");

  // 1. Seed Admin User
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("Admin@12345", salt);

  const admin = await prisma.user.upsert({
    where: { email: "admin@griffinconstruction.in" },
    update: {},
    create: {
      email: "admin@griffinconstruction.in",
      password: hashedPassword,
      fullName: "Admin User",
      role: "ADMIN",
      phone: "+91 98140 00000",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
  });
  console.log(`✓ Admin user verified: ${admin.email}`);

  // 2. Seed Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "settings_global" },
    update: {},
    create: {
      id: "settings_global",
      companyName: "Griffin Construction",
      tagline: "Building Tomorrow, Together.",
      phone: "+91 123 456 7890",
      phoneDisplay: "+91 123 456 7890",
      email: "contact@griffinconstruction.in",
      address: "Mohali, Punjab – 160055, India",
      workingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
      websiteUrl: "https://griffinconstruction.in",
      headerCtaText: "Get a Quote",
      headerCtaLink: "/contact",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      footerDescription:
        "A premier construction and real estate development partner delivering residential, commercial and infrastructure landmarks with uncompromising precision.",
      copyrightText: "© 2026 Griffin Construction. All rights reserved.",
    },
  });
  console.log("✓ Site settings seeded.");

  // 3. Seed Website Pages
  const pages = [
    {
      slug: "home",
      title: "Home Page",
      pageType: "home",
      heading: "Building Tomorrow's Landmarks With Griffin",
      subtitle:
        "Residential, commercial and infrastructure projects delivered with uncompromising precision — from first survey to final handover.",
      ctaText: "View All Projects",
      ctaLink: "/projects",
      seoTitle: "Griffin Construction — Building Tomorrow's Landmarks",
      seoDescription: "Premier construction, real estate development and civil engineering partner.",
      sections: [
        {
          key: "about",
          heading: "Two decades of building with intent",
          description:
            "Griffin Construction began as a single-site contractor and grew into a full-service development partner. We plan carefully, build honestly and hand over work we are proud to sign.",
        },
        {
          key: "services",
          heading: "Comprehensive Construction & Development Services",
          description:
            "From conceptual design through turnkey handover, our multidisciplinary teams deliver excellence across every square foot.",
        },
        {
          key: "final-cta",
          heading: "Have a project in mind?",
          description:
            "Speak with our principal engineers and project leaders to turn your vision into enduring reality.",
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
      slug: "about",
      title: "About Us",
      pageType: "about",
      heading: "Engineering Excellence with Griffin Strength",
      subtitle: "Delivering world-class residential, commercial, and industrial landmarks across the country.",
    },
    {
      slug: "contact",
      title: "Contact Us",
      pageType: "contact",
      heading: "Get in Touch With Our Team",
      subtitle: "We are ready to discuss your next construction or development project.",
    },
  ];

  for (const page of pages) {
    await prisma.websitePage.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }
  console.log(`✓ ${pages.length} website pages seeded.`);

  // 4. Seed Services
  const services = [
    {
      title: "Real Estate Development",
      slug: "real-estate-development",
      category: "Commercial",
      shortDescription: "End-to-end property development with modern design and high investment yield.",
      fullDescription:
        "Comprehensive real estate development services from land acquisition and site feasibility to architectural planning, regulatory clearances, construction execution, and sales facilitation.",
      icon: "Home",
      cardImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      overviewImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      displayOrder: 1,
      featured: true,
      published: true,
      keyFeatures: [
        "Master-planned residential & commercial complexes",
        "Land feasibility & regulatory approvals",
        "Turnkey construction management",
        "Investment lifecycle advisory",
      ],
    },
    {
      title: "Transport & Logistics",
      slug: "transport-and-logistics",
      category: "Industrial",
      shortDescription: "Reliable heavy transport, specialized construction fleet, and on-site logistics management.",
      fullDescription:
        "Heavy haulage, ready-mix logistics, aggregate transport, and smart supply chain coordination tailored to large-scale infrastructure and industrial job sites.",
      icon: "Truck",
      cardImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
      overviewImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      displayOrder: 2,
      featured: true,
      published: true,
      keyFeatures: [
        "Heavy construction machinery haulage",
        "Real-time GPS fleet tracking",
        "Bulk material logistics",
        "On-site warehousing coordination",
      ],
    },
    {
      title: "Architectural Planning & Design",
      slug: "architectural-planning-and-design",
      category: "Commercial",
      shortDescription: "Award-winning architectural concepts, BIM 3D modeling, and structural blueprinting.",
      fullDescription:
        "BIM 3D modeling, sustainable green building design, seismic structural planning, and interior architectural detailing for modern urban spaces.",
      icon: "Building2",
      cardImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
      overviewImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      displayOrder: 3,
      featured: true,
      published: true,
      keyFeatures: [
        "Full BIM 3D visual integration",
        "LEED green building certification guidance",
        "Seismic structural stability analysis",
        "Ergonomic interior space planning",
      ],
    },
    {
      title: "Infrastructure & Civil Works",
      slug: "infrastructure-and-civil-works",
      category: "Infrastructure",
      shortDescription: "Bridges, arterial roadways, grade-separated flyovers, and urban civic infrastructure.",
      fullDescription:
        "High-load civil infrastructure, grade-separated flyovers, stormwater drainage, and arterial road networks built to withstand demanding loads.",
      icon: "HardHat",
      cardImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=80",
      overviewImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80",
      displayOrder: 4,
      featured: false,
      published: true,
      keyFeatures: [
        "Municipal and arterial road paving",
        "Heavy bridge and culvert construction",
        "Underground utility networks",
        "Earthworks and slope stabilization",
      ],
    },
  ];

  for (const srv of services) {
    await prisma.service.upsert({
      where: { slug: srv.slug },
      update: {},
      create: srv,
    });
  }
  console.log(`✓ ${services.length} services seeded.`);

  // 5. Seed Projects
  const projects = [
    {
      name: "Griffin Skyview Heights",
      slug: "griffin-skyview-heights",
      category: "Residential",
      location: "Sector 82, Mohali, Punjab",
      clientName: "Skyview Real Estate Ltd",
      status: "ONGOING",
      startDate: new Date("2024-03-01"),
      completionDate: new Date("2026-12-31"),
      shortDescription: "Twin 28-storey luxury residential towers with panoramic city views and gold-rated green efficiency.",
      fullDescription:
        "A prestigious residential project featuring earthquake-resistant reinforced RCC framing, sky lounges, rooftop infinity pool, and gold-rated green building efficiency.",
      coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      ],
      displayOrder: 1,
      featured: true,
      published: true,
    },
    {
      name: "Golden Riverside Commercial Complex",
      slug: "golden-riverside-commercial-complex",
      category: "Commercial",
      location: "IT Park, Chandigarh",
      clientName: "Riverside Corporate Group",
      status: "COMPLETED",
      startDate: new Date("2022-06-15"),
      completionDate: new Date("2025-01-20"),
      shortDescription: "State-of-the-art corporate headquarters spanning 450,000 sq ft with integrated HVAC automation.",
      fullDescription:
        "Modern commercial glass-facade tower incorporating multi-level underground parking, high-speed smart elevators, and integrated HVAC automation.",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      displayOrder: 2,
      featured: true,
      published: true,
    },
    {
      name: "Griffin Logistics & Warehousing Hub",
      slug: "griffin-logistics-warehousing-hub",
      category: "Industrial",
      location: "GT Road, Ludhiana, Punjab",
      clientName: "Apex Logistics India",
      status: "COMPLETED",
      startDate: new Date("2023-01-10"),
      completionDate: new Date("2024-08-30"),
      shortDescription: "Prefabricated steel warehouse and multi-modal freight terminal with laser-screed flooring.",
      fullDescription:
        "Engineered pre-engineered building (PEB) structure with laser-screed flooring, heavy-duty dock levellers, and solar PV roof installation.",
      coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      displayOrder: 3,
      featured: true,
      published: true,
    },
  ];

  for (const proj of projects) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {},
      create: proj,
    });
  }
  console.log(`✓ ${projects.length} projects seeded.`);

  // 6. Seed Team Members
  const teamMembers = [
    {
      fullName: "Mayank Goyal",
      designation: "Managing Director & CEO",
      shortBio: "20+ years steering landmark civil, commercial, and residential developments across North India.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      email: "mayank@griffinconstruction.in",
      experience: "20+ Years",
      skills: ["Project Leadership", "Real Estate Development", "Infrastructure Strategy"],
      featured: true,
      published: true,
      displayOrder: 1,
    },
    {
      fullName: "Ar. Sunita Rao",
      designation: "Chief Architect & Head of Design",
      shortBio: "Master of Architecture specializing in biophilic design, smart urbanism, and green high-rises.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      email: "sunita.rao@griffinconstruction.in",
      experience: "15+ Years",
      skills: ["Architectural Design", "BIM 3D", "LEED AP"],
      featured: true,
      published: true,
      displayOrder: 2,
    },
    {
      fullName: "Er. Vikram Malhotra",
      designation: "Director of Structural Engineering",
      shortBio: "Expert in deep foundation systems, earthquake-resistant RCC frameworks, and pre-engineered steel buildings.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      email: "vikram@griffinconstruction.in",
      experience: "18+ Years",
      skills: ["Structural Analysis", "Heavy Foundation", "Safety Compliance"],
      featured: true,
      published: true,
      displayOrder: 3,
    },
  ];

  for (const member of teamMembers) {
    const existing = await prisma.teamMember.findFirst({
      where: { email: member.email },
    });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }
  console.log(`✓ ${teamMembers.length} team members seeded.`);

  // 7. Seed Sample Inquiries
  const inquiries = [
    {
      fullName: "Rajesh Sharma",
      email: "rajesh.sharma@example.com",
      phone: "+91 98140 22334",
      subject: "Commercial Office Park Development Quote",
      projectType: "Commercial",
      message: "We are planning a 120,000 sq ft office campus in Mohali and would like to review Griffin's portfolio and discuss scheduling an initial feasibility survey.",
      status: "NEW",
      assignedTo: "Mayank Goyal",
    },
    {
      fullName: "Priya Patel",
      email: "priya.patel@horizoninfra.in",
      phone: "+91 98765 43210",
      subject: "Logistics Hub Civil Contracting",
      projectType: "Industrial",
      message: "Inquiry regarding specialized grade-slab concrete flooring and steel framing contractors for our warehouse expansion in Ludhiana.",
      status: "IN_PROGRESS",
      assignedTo: "Er. Vikram Malhotra",
    },
  ];

  for (const inq of inquiries) {
    const existing = await prisma.contactInquiry.findFirst({
      where: { email: inq.email },
    });
    if (!existing) {
      await prisma.contactInquiry.create({ data: inq });
    }
  }
  console.log(`✓ Sample inquiries seeded.`);

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

