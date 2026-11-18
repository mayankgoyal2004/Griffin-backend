import { prisma } from "../config/db.js";

const aboutSections = {
  story: {
    kicker: "OUR STORY",
    heading: "A Trusted Partner in Construction",
    description: "Griffin Construction is a modern construction and real estate company focused on delivering high-quality, sustainable, and future-ready spaces. With a strong commitment to quality, innovation, and timely delivery, we bring ideas to life — from concept to completion.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
    inset_image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=85",
    pillars: [
      { title: "Quality Construction", icon: "layers" },
      { title: "Reliable Execution", icon: "shield" },
      { title: "Client-Centric Approach", icon: "users" }
    ]
  },
  mission_vision: {
    kicker: "OUR MISSION & VISION",
    heading: "Driven by Purpose, Built for the Future",
    description: "Our mission is to deliver exceptional construction solutions while our vision is to build a better, more sustainable built environment for future generations.",
    mission_title: "Our Mission",
    mission_description: "To deliver high-quality, safe, and sustainable construction solutions that exceed client expectations.",
    vision_title: "Our Vision",
    vision_description: "To be a leading construction company known for trust, innovation, and lasting value."
  },
  core_values: {
    kicker: "OUR CORE VALUES",
    heading: "The Principles That Guide Us",
    items: [
      { title: "Integrity", description: "We build trust through honest and transparent practices.", icon: "gem" },
      { title: "Quality", description: "We never compromise on the quality of our work.", icon: "handshake" },
      { title: "Sustainability", description: "We create spaces that are environmentally responsible and future-ready.", icon: "leaf" },
      { title: "People First", description: "We value our clients, partners, and team, and grow together with them.", icon: "users" }
    ]
  },
  cta: {
    heading: "Let's Build Something Great Together",
    description: "Have a project in mind? Get in touch with our team today.",
    button_text: "Contact Us",
    button_link: "/contact",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  }
};

const aboutStats = [
  { value: "50+", label: "Projects Completed", icon: "building" },
  { value: "100+", label: "Happy Clients", icon: "users" },
  { value: "10+", label: "Years of Experience", icon: "hardhat" },
  { value: "98%", label: "Project Success Rate", icon: "award" }
];

async function seedAbout() {
  await prisma.websitePage.upsert({
    where: { slug: "about" },
    update: {
      title: "About Us",
      pageType: "about",
      heading: "About Us",
      subtitle: "Building spaces that create lasting value for people, businesses, and communities.",
      heroImage: "/Golden-Riverside-Castle.png",
      sections: aboutSections,
      stats: aboutStats,
      published: true
    },
    create: {
      slug: "about",
      title: "About Us",
      pageType: "about",
      heading: "About Us",
      subtitle: "Building spaces that create lasting value for people, businesses, and communities.",
      heroImage: "/Golden-Riverside-Castle.png",
      sections: aboutSections,
      stats: aboutStats,
      published: true
    }
  });

  console.log("About page updated successfully in database.");
  process.exit(0);
}

seedAbout().catch((err) => {
  console.error("Error seeding about page:", err);
  process.exit(1);
});
