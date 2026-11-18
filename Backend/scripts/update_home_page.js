import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.websitePage.findUnique({ where: { slug: 'home' } });

  const defaultHero = {
    kicker: "BUILDING TOMORROW",
    headline: existing?.heading || "Your Nest, Our Business.",
    subtitle: existing?.subtitle || "Construction solutions for residential, commercial and infrastructure projects.",
  };

  const defaultServices = {
    kicker: "WHAT WE DO",
    heading: "Explore Our Services",
    subtitle: "We connect places, people and opportunities through reliable and modern construction solutions.",
  };

  const defaultAbout = {
    kicker: "About Griffin",
    heading: "A Construction Partner Built on Strength & Trust",
    description: "Griffin Construction is a modern construction and real estate company committed to delivering high-quality, sustainable, and value-driven projects. We combine industry expertise, advanced technology and a commitment to excellence to build spaces that last.",
    main_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85",
    inset_image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=85",
    badge_1: "Quality First",
    badge_2: "Expert Team",
    badge_3: "Sustainable",
    badge_4: "On-Time Delivery",
    stat_1_val: "10+",
    stat_1_label: "Years of Experience",
    stat_2_val: "150+",
    stat_2_label: "Projects Completed",
    stat_3_val: "500+",
    stat_3_label: "Happy Clients",
    cta_text: "Learn More",
    cta_link: "#quote",
  };

  const defaultProjects = {
    kicker: "OUR WORK",
    heading: "Featured Projects",
  };

  const defaultTeam = {
    kicker: "OUR TEAM",
    heading: "The People Behind Griffin",
    description: "A team of experienced professionals, engineers, and project managers who turn vision into reality.",
    image: "/griffin-team-eagle.jpg",
    cta_text: "Meet the Team →",
    cta_link: "/team",
  };

  const defaultAdvantageSection = {
    kicker: "Why choose us",
    heading: "The Griffin Advantage",
  };

  const defaultCtaBanner = {
    heading: "Let’s Build Your Next Project",
    subtitle: "Get in touch with our team for a consultation and a detailed quote.",
    button_text: "Contact Us →",
    button_link: "/contact",
    background_image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85",
  };

  const defaultStats = [
    { value: "10+", label: "Years of Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "100+", label: "Happy Clients" },
    { value: "100%", label: "Quality & Safety" },
  ];

  const defaultAdvantages = [
    { title: "End-to-End Solutions", description: "From planning to handover.", icon: "star" },
    { title: "Trusted Partnerships", description: "With leading vendors & experts.", icon: "users" },
    { title: "Safety & Compliance", description: "Highest industry standards.", icon: "shield" },
    { title: "Sustainable Build", description: "For a better tomorrow.", icon: "leaf" },
  ];

  const currentSections = (existing?.sections && typeof existing.sections === 'object' && !Array.isArray(existing.sections))
    ? existing.sections
    : {};

  const mergedSections = {
    hero: { ...defaultHero, ...(currentSections.hero || {}) },
    services_preview: { ...defaultServices, ...(currentSections.services_preview || {}) },
    about_preview: { ...defaultAbout, ...(currentSections.about_preview || {}) },
    projects_preview: { ...defaultProjects, ...(currentSections.projects_preview || {}) },
    team_preview: { ...defaultTeam, ...(currentSections.team_preview || {}) },
    advantage_section: { ...defaultAdvantageSection, ...(currentSections.advantage_section || {}) },
    cta_banner: { ...defaultCtaBanner, ...(currentSections.cta_banner || {}) },
  };

  const dataToUpdate = {
    title: "Home Page",
    pageType: "home",
    heading: existing?.heading || defaultHero.headline,
    subtitle: existing?.subtitle || defaultHero.subtitle,
    heroImage: existing?.heroImage || "/Griffin-valiue.png",
    sections: mergedSections,
    stats: (Array.isArray(existing?.stats) && existing.stats.length === 4) ? existing.stats : defaultStats,
    advantages: (Array.isArray(existing?.advantages) && existing.advantages.length === 4) ? existing.advantages : defaultAdvantages,
  };

  const result = await prisma.websitePage.upsert({
    where: { slug: 'home' },
    update: dataToUpdate,
    create: {
      slug: 'home',
      ...dataToUpdate,
    },
  });

  console.log("Successfully seeded/updated home page in DB:", result.slug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
