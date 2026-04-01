export type FeaturedProject = {
  id: string;
  title: string;
  company?: string;
  role: string;
  summary: string;
  outcome: string;
  highlights: string[];
  tags: string[];
  href?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "swarnaayu",
    title: "Swarnaayu",
    company: "Gamyam",
    role: "React Native Developer",
    summary:
      "Elderly-focused AI companion app — emotional support through conversational AI, with UX tuned for older users.",
    outcome:
      "Accessibility-minded patterns; shipped the companion experience and the public product site.",
    highlights: [
      "AI-powered mobile experience for emotional support.",
      "Accessibility: large text, simplified UI, intuitive navigation.",
      "Product marketing site with React.js and Tailwind CSS.",
    ],
    tags: ["React Native", "OpenAI API", "Django", "React.js", "Tailwind CSS"],
  },
  {
    id: "swasthbharat",
    title: "SwasthBharat",
    company: "Gamyam",
    role: "Frontend Developer",
    summary:
      "Government-aligned health awareness platform — trust, clarity, and public-sector UX standards.",
    outcome: "Accessible presentation aligned with official UI/UX guidance.",
    highlights: [
      "Built from the ground up in React.",
      "Government UI/UX and accessibility standards.",
    ],
    tags: ["React.js", "Vercel"],
  },
  {
    id: "aerchain",
    title: "Aerchain",
    company: "Gamyam",
    role: "Frontend Developer",
    summary: "AI procurement enterprise product — reusable UI for complex workflows at scale.",
    outcome: "Reusable components, Storybook variants, tuned UI primitives.",
    highlights: [
      "Scalable UI components for a growing product surface.",
      "Storybook for states and documentation.",
      "shadcn-style patterns for consistency.",
    ],
    tags: ["React.js", "Tailwind CSS", "shadcn/ui", "Storybook"],
  },
  {
    id: "1acre",
    title: "1Acre",
    company: "Gamyam",
    role: "Full Stack / Frontend Developer",
    summary: "Land intelligence platform — clearer data, workflows, and guided journeys.",
    outcome:
      "~40% higher completion on a critical upload flow; maps, analytics, payments.",
    highlights: [
      "Mapbox map features.",
      "GTM analytics and payment integration.",
    ],
    tags: ["Next.js", "Mapbox", "GTM", "Tailwind CSS", "shadcn/ui"],
  },
  {
    id: "needdhobi",
    title: "NeedDhobi",
    role: "Laundry services web platform",
    summary: "Customer-facing site for bookings and operations.",
    outcome: "Smoother scheduling for users and clearer workflows for the team.",
    highlights: [
      "End-to-end web experience for laundry requests.",
      "Reduced friction in the service flow.",
    ],
    tags: ["React", "Web development", "Responsive design"],
  },
];
