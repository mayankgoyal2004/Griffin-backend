import { prisma } from "../config/db.js";

const privacySections = [
  {
    key: "introduction",
    heading: "Introduction",
    description: "At Griffin Construction, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, store, and protect your data when you visit our website, interact with our services, or communicate with us.\n\nBy using our website, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please do not use our website."
  },
  {
    key: "information-we-collect",
    heading: "Information We Collect",
    description: "We may collect the following types of information:\n• Personal information (name, email address, phone number, etc.)\n• Project details and inquiry information\n• Technical information (IP address, browser type, device information)\n• Usage data (pages visited, time spent, etc.)"
  },
  {
    key: "how-we-use-information",
    heading: "How We Use Your Information",
    description: "We use the information we collect for the following purposes:\n• To respond to your inquiries and provide requested services\n• To improve our website and user experience\n• To send you updates, news, and relevant information (with your consent)\n• To comply with legal and regulatory requirements"
  },
  {
    key: "data-protection",
    heading: "Data Protection",
    description: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure."
  },
  {
    key: "cookies",
    heading: "Cookies",
    description: "Our website may use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can choose to disable cookies through your browser settings, but this may affect some features of our website."
  },
  {
    key: "third-party-links",
    heading: "Third-Party Links",
    description: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information."
  },
  {
    key: "changes-to-policy",
    heading: "Changes to This Policy",
    description: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. Please review this policy periodically to stay informed about how we are protecting your information."
  },
  {
    key: "contact-us",
    heading: "Contact Us",
    description: "If you have any questions or concerns about this Privacy Policy, please contact us at info@griffinconstruction.in or call +91 98765 43210.\n\nMohali, Punjab, India"
  }
];

const termsSections = [
  {
    key: "introduction",
    heading: "1. Introduction",
    description: "These Terms & Conditions (\"Terms\") govern your use of the Griffin Construction website (\"Website\") and the services, information, and content provided by Griffin Construction (\"Company\", \"we\", \"our\", \"us\"). By accessing or using our Website, you agree to be bound by these Terms."
  },
  {
    key: "use-of-website",
    heading: "2. Use of the Website",
    description: "You agree to use the Website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of the Website."
  },
  {
    key: "services",
    heading: "3. Services",
    description: "Griffin Construction provides construction, real estate development, and related services. The information on the Website is for general informational purposes only and does not constitute a binding offer or contract."
  },
  {
    key: "intellectual-property",
    heading: "4. Intellectual Property",
    description: "All content on this Website, including text, images, logos, graphics, and design, is the property of Griffin Construction or its licensors and is protected by applicable copyright, trademark, and intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission."
  },
  {
    key: "user-submissions",
    heading: "5. User Submissions",
    description: "If you submit any inquiry, feedback, or information through our contact forms, you agree that the information you provide is accurate and complete. We may use this information to respond to your inquiry and provide relevant services."
  },
  {
    key: "third-party-links",
    heading: "6. Third-Party Links",
    description: "Our Website may contain links to third-party websites for your convenience. We are not responsible for the content, policies, or practices of these external websites."
  },
  {
    key: "disclaimer",
    heading: "7. Disclaimer",
    description: "The information on this Website is provided \"as is\" and \"as available.\" While we strive to keep the information accurate and up to date, we make no warranties, express or implied, regarding the completeness, accuracy, or reliability of any content."
  },
  {
    key: "limitation-of-liability",
    heading: "8. Limitation of Liability",
    description: "To the fullest extent permitted by law, Griffin Construction shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Website or our services."
  },
  {
    key: "changes-to-terms",
    heading: "9. Changes to These Terms",
    description: "We may update these Terms from time to time. Any changes will be posted on this page with the updated \"Last Updated\" date. Your continued use of the Website after such changes constitutes your acceptance of the revised Terms."
  },
  {
    key: "contact-us",
    heading: "10. Contact Us",
    description: "If you have any questions about these Terms & Conditions, please contact us at info@griffinconstruction.in or call +91 98765 43210.\n\nMohali, Punjab, India"
  }
];

async function seed() {
  await prisma.websitePage.upsert({
    where: { slug: "privacy-policy" },
    update: {
      sections: privacySections,
      lastRevised: "2026-11-06",
      heroImage: "/Golden-Riverside-Castle.png"
    },
    create: {
      slug: "privacy-policy",
      title: "Privacy Policy",
      pageType: "legal",
      heading: "Privacy Policy",
      subtitle: "How we collect, protect and process your data.",
      sections: privacySections,
      lastRevised: "2026-11-06",
      heroImage: "/Golden-Riverside-Castle.png"
    }
  });
  console.log("Privacy Policy updated with sections");

  await prisma.websitePage.upsert({
    where: { slug: "terms" },
    update: {
      sections: termsSections,
      lastRevised: "2026-11-06",
      heroImage: "/Golden-Riverside-Castle.png"
    },
    create: {
      slug: "terms",
      title: "Terms and Conditions",
      pageType: "legal",
      heading: "Terms & Conditions",
      subtitle: "Please read these terms and conditions carefully before using our website.",
      sections: termsSections,
      lastRevised: "2026-11-06",
      heroImage: "/Golden-Riverside-Castle.png"
    }
  });
  console.log("Terms and Conditions updated with sections");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
