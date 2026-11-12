// Fallback content used before the CMS records load (and on a fresh install).
// Once records exist in the database, live values replace everything here.

export const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Team", to: "/team" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const SITE_DEFAULTS = {
  company_name: "Griffin Construction",
  company_description:
    "Griffin Construction designs, builds and delivers residential, commercial and infrastructure projects with the precision of a craftsman and the strength of a griffin.",
  phone: "+91 98200 00000",
  email: "info@griffinconstruction.com",
  address: "Griffin House, 4th Floor, Business Park, Mumbai 400051",
  working_hours: "Mon – Sat, 9:00 AM – 6:30 PM",
  maps_link: "",
  website_url: "",
  phone_display: "+91 98200 00000",
  header_cta_text: "Get a Quote",
  header_cta_link: "/contact",
  facebook: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  footer_description:
    "A premium construction and real estate partner for clients who value craft, clarity and long-term value.",
  copyright_text: "© {year} Griffin Construction. All rights reserved.",
};

export const HOME_DEFAULTS = {
  hero_title: "Building Tomorrow's Landmarks With Griffin",
  hero_subtitle:
    "Residential, commercial and infrastructure projects delivered with uncompromising precision — from first survey to final handover.",
  hero_primary_cta: "View All Projects",
  hero_primary_link: "/projects",
  about_heading: "Two decades of building with intent",
  about_description:
    "Griffin Construction began as a single-site contractor and grew into a full-service development partner. We plan carefully, build honestly and hand over work we are proud to sign.",
  about_stats: [
    { value: "24+", label: "Years building" },
    { value: "180+", label: "Projects delivered" },
    { value: "96%", label: "Repeat clients" },
  ],
  cta_heading: "Have a project in mind?",
  cta_description:
    "Tell us what you are planning. Our team will review the brief and come back with a clear path forward.",
  cta_button: "Start a conversation",
};

export const HERO_PHOTOS = [
  {
    src: "https://media.base44.com/images/public/6af56de1d3b552650e481948/10cd08209_generated_image.png",
    alt: "Completed luxury residential development at dusk",
  },
  {
    src: "https://media.base44.com/images/public/6af56de1d3b552650e481948/23b9bca7a_generated_image.png",
    alt: "Steel frame and tower crane on a Griffin commercial site",
  },
  {
    src: "https://media.base44.com/images/public/6af56de1d3b552650e481948/89ddbda8d_generated_image.png",
    alt: "Refined commercial lobby completed by Griffin Construction",
  },
];

export const GRIFFIN_EMBLEM =
  "https://media.base44.com/images/public/6af56de1d3b552650e481948/5e3271271_generated_image.png";

export const PROJECT_CATEGORIES = ["Residential", "Commercial", "Industrial", "Infrastructure", "Renovation"];
export const PROJECT_STATUSES = ["Planning", "Ongoing", "Completed"];
export const INQUIRY_STATUSES = ["New", "Contacted", "In Progress", "Converted", "Closed"];
export const MEDIA_FOLDERS = ["Logo", "Hero Images", "Services", "Projects", "Team", "Blog", "General"];