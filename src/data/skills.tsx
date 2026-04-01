import type { ReactNode } from "react";

export type SkillCategory = {
  id: string;
  title: string;
  eyebrow: string;
  summary: ReactNode;
  items: string[];
};

/** Section heading (e.g. v2 stack block) */
export const skillsSectionTitle = "Toolbox";

export const skillsSectionDescription = (
  <>
    A practical toolkit for building <strong className="font-semibold">scalable</strong>,{" "}
    <strong className="font-semibold">production-ready</strong> applications.
  </>
) as ReactNode;

/** Aligned with resume “Technical skills” + how you apply them in product work */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    eyebrow: "01 — Frontend",
    title: "High-performance user interfaces",
    summary: (
      <>
        Building responsive, scalable web applications using{" "}
        <strong className="font-semibold">React</strong>, <strong className="font-semibold">Next.js</strong>
        , and <strong className="font-semibold">TypeScript</strong> — focused on performance, usability, and
        clean component architecture.
      </>
    ),
    items: [
      "HTML · CSS · JavaScript",
      "React.js · Redux · TypeScript",
      "Next.js · Tailwind CSS · shadcn/ui",
      "Storybook (testing & documentation)",
    ],
  },
  {
    id: "backend",
    eyebrow: "02 — Backend",
    title: "Scalable APIs & backend systems",
    summary: (
      <>
        Designing <strong className="font-semibold">RESTful APIs</strong> using{" "}
        <strong className="font-semibold">Node.js</strong> and{" "}
        <strong className="font-semibold">Django</strong>, with a focus on clean architecture, performance,
        and end-to-end feature ownership.
      </>
    ),
    items: ["Node.js · Express.js", "Django · Django REST Framework"],
  },
  {
    id: "data",
    eyebrow: "03 — Data",
    title: "Structured & scalable data systems",
    summary: (
      <>
        Working with relational and NoSQL databases to design efficient data models, optimize queries, and
        support <strong className="font-semibold">scalable product features</strong>.
      </>
    ),
    items: ["MongoDB", "PostgreSQL", "SQL"],
  },
  {
    id: "devops",
    eyebrow: "04 — DevOps & deployment",
    title: "Reliable deployment & DevOps workflows",
    summary: (
      <>
        Managing <strong className="font-semibold">CI/CD</strong> pipelines, containerized deployments, and
        cloud hosting to ensure <strong className="font-semibold">reliable releases</strong> and production
        stability.
      </>
    ),
    items: [
      "GitHub · GitHub Actions (CI/CD)",
      "Docker",
      "Nginx",
      "Cloudflare (proxy, CDN)",
      "Vercel · Render",
    ],
  },
  {
    id: "ai",
    eyebrow: "05 — AI & automation",
    title: "AI-powered features & automation",
    summary: (
      <>
        Building <strong className="font-semibold">AI-integrated features</strong> using OpenAI APIs and
        workflow automation tools for smarter user experiences.
      </>
    ),
    items: ["OpenAI API", "n8n", "AI agent workflows (orchestration concepts)"],
  },
  {
    id: "mobile-tools",
    eyebrow: "06 — Mobile & tooling",
    title: "Mobile apps & product analytics",
    summary: (
      <>
        Developing cross-platform apps with <strong className="font-semibold">React Native</strong> and
        integrating analytics to improve product decisions.
      </>
    ),
    items: ["React Native", "Figma (basic)", "Google Tag Manager (GTM)"],
  },
];
