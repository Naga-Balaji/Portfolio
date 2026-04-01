/** Labels orbiting the hero portrait — scroll-scrubbed rings on the main & v2 heroes */
export const HERO_TECH_ORBIT_LABELS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Django REST",
  "MongoDB",
  "PostgreSQL",
  "SQL",
  "Docker",
  "GitHub",
  "GitHub Actions",
  "Nginx",
  "Cloudflare",
  "Vercel",
  "Render",
  "n8n",
  "Gumloop",
  "AI Agents",
  "Cursor",
  "Claude",
  "Windsurf",
  "React Native",
  "Strapi",
  "Mapbox",
  "GTM",
  "Razorpay",
  "Tailwind CSS",
  "shadcn/ui",
  "Storybook",
  "Figma",
] as const;

/** 11 + 11 + 11 = 33 — wider angular spacing than 16+17 on two tight rings */
const all = [...HERO_TECH_ORBIT_LABELS];
export const HERO_ORBIT_RING_SETS: readonly (readonly string[])[] = [
  all.slice(0, 11),
  all.slice(11, 22),
  all.slice(22, 33),
];
