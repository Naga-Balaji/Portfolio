import type { ReactNode } from "react";

export type FeaturedProject = {
  id: string;
  title: string;
  company?: string;
  role: string;
  summary: ReactNode;
  outcome: ReactNode;
  highlights: string[];
  tags: string[];
  href?: string;
};

/**
 * Gamyam product work (resume-aligned) + NeedDhobi from LinkedIn “Projects”.
 */
export const featuredProjects: FeaturedProject[] = [
  {
    id: "swarnaayu",
    title: "Swarnaayu",
    company: "Gamyam",
    role: "React Native Developer",
    summary: (
      <>
        Elderly-focused <strong className="font-semibold">AI companion</strong> app — emotional support
        through conversational AI, with UX deliberately tuned for older, less technical users.
      </>
    ),
    outcome: (
      <>
        Improved <strong className="font-semibold">adoption-friendly UX</strong> via accessibility-minded
        patterns; shipped the companion experience and the public product site.
      </>
    ),
    highlights: [
      "Developed an AI-powered mobile experience centered on emotional support for elderly users.",
      "Implemented accessibility: large text options, simplified UI, and intuitive navigation.",
      "Collaborated with designers to sharpen usability and feature clarity.",
      "Built and deployed the product marketing site using React.js, Tailwind CSS, and modern hosting.",
    ],
    tags: ["React Native", "OpenAI API", "Django", "React.js", "Tailwind CSS"],
  },
  {
    id: "swasthbharat",
    title: "SwasthBharat",
    company: "Gamyam",
    role: "Frontend Developer",
    summary: (
      <>
        <strong className="font-semibold">Government-aligned</strong> health awareness platform explaining{" "}
        <strong className="font-semibold">healthspan vs lifespan</strong> — trust, clarity, and compliance
        with public-sector expectations.
      </>
    ),
    outcome: (
      <>
        A consistent, <strong className="font-semibold">accessible</strong> presentation that reflects
        official UI/UX guidance and research-backed design decisions.
      </>
    ),
    highlights: [
      "Built a government-aligned health awareness platform from the ground up in React.",
      "Ensured alignment with government UI/UX and accessibility standards.",
      "Researched official references and comparable systems to keep visual and structural consistency.",
    ],
    tags: ["React.js", "Vercel"],
  },
  {
    id: "aerchain",
    title: "Aerchain",
    company: "Gamyam",
    role: "Frontend Developer",
    summary: (
      <>
        <strong className="font-semibold">AI procurement</strong> enterprise product — reusable UI for
        complex sourcing, negotiation, and <strong className="font-semibold">compliance</strong> workflows at
        scale.
      </>
    ),
    outcome: (
      <>
        <strong className="font-semibold">Faster delivery</strong> through reusable components, documented{" "}
        <strong className="font-semibold">Storybook</strong> variants, and tuned UI primitives.
      </>
    ),
    highlights: [
      "Developed reusable, scalable UI components for a growing product surface.",
      "Used Storybook for component testing, states, and documentation.",
      "Customized and optimized UI systems (including shadcn-style patterns) for speed and consistency.",
    ],
    tags: ["React.js", "Tailwind CSS", "shadcn/ui", "Storybook"],
  },
  {
    id: "1acre",
    title: "1Acre",
    company: "Gamyam",
    role: "Full Stack / Frontend Developer",
    summary: (
      <>
        <strong className="font-semibold">Land intelligence</strong> platform — transparency in the land
        market through clearer data, workflows, and guided user journeys.
      </>
    ),
    outcome: (
      <>
        Raised user data upload completion by <strong className="font-semibold">~40%</strong>; shipped map
        experiences, <strong className="font-semibold">analytics</strong> instrumentation, and payment flows.
      </>
    ),
    highlights: [
      "Built core features to improve user workflows and data transparency.",
      "Improved the data upload journey — ~40% higher completion on the critical flow.",
      "Integrated Mapbox for map-based product features.",
      "Implemented analytics tracking (GTM) and payment integration for transactions.",
    ],
    tags: ["Next.js", "Mapbox", "Google Tag Manager", "Tailwind CSS", "shadcn/ui"],
  },
  // {
  //   id: "needdhobi",
  //   title: "NeedDhobi",
  //   role: "Laundry services web platform",
  //   summary: <>Customer-facing site…</>,
  //   outcome: <>Stronger convenience…</>,
  //   highlights: [ "…" ],
  //   tags: ["React", "Web development", "Responsive design"],
  // },
];
