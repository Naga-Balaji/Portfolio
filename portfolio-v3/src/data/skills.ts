export type SkillCategory = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    eyebrow: "01 — Frontend",
    title: "Interfaces users actually finish",
    summary:
      "React, Redux, TypeScript, and Tailwind for responsive web apps — Next.js and shadcn-style systems on larger surfaces.",
    items: [
      "HTML · CSS · JavaScript",
      "React.js · Redux · TypeScript",
      "Next.js · Tailwind CSS · shadcn/ui",
      "Storybook",
    ],
  },
  {
    id: "backend",
    eyebrow: "02 — Backend",
    title: "APIs and server-side logic",
    summary: "REST-style services with Node and Django.",
    items: ["Node.js · Express.js", "Django · Django REST Framework"],
  },
  {
    id: "data",
    eyebrow: "03 — Data",
    title: "Persistence you can reason about",
    summary: "Relational and document storage when the product calls for it.",
    items: ["MongoDB", "PostgreSQL", "SQL"],
  },
  {
    id: "devops",
    eyebrow: "04 — DevOps",
    title: "Ship, repeat, sleep well",
    summary: "Automation and reproducible environments.",
    items: ["GitHub Actions", "Docker", "Nginx", "Cloudflare", "Vercel · Render"],
  },
  {
    id: "ai",
    eyebrow: "05 — AI",
    title: "Models in the loop",
    summary: "OpenAI-backed experiences and automation.",
    items: ["OpenAI API", "n8n", "Agent orchestration concepts"],
  },
  {
    id: "mobile-tools",
    eyebrow: "06 — Mobile",
    title: "Device-native delivery",
    summary: "React Native plus design and analytics tooling.",
    items: ["React Native", "Figma", "Google Tag Manager"],
  },
];
