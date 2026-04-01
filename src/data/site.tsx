import type { ReactNode } from "react";

export const site = {
  /** Display name — matches public LinkedIn profile */
  name: "Balaji Naga",
  /** City from LinkedIn; keep resume-level region for recruiters */
  location: "Amalāpuram, Andhra Pradesh, India",
  phone: "+91 6305517488",
  email: "balajinagendra567@gmail.com",

  /** LinkedIn headline role + breadth from your shipped work */
  role: (
    <>
      <strong className="font-semibold">Software Development Engineer (SDE)</strong> at{" "}
      <strong className="font-semibold">Gamyam</strong> — Building high-performance web &amp; mobile apps
      using <strong className="font-semibold">React</strong>, <strong className="font-semibold">Next.js</strong>{" "}
      &amp; modern full-stack technologies
    </>
  ) as ReactNode,

  tagline: (
    <>
      I&apos;m a <strong className="font-semibold">Full Stack Developer</strong> with hands-on experience
      building <strong className="font-semibold">production-grade</strong> web and mobile applications.
      <br />
      <br />
      I specialize in creating <strong className="font-semibold">scalable, high-performance UIs</strong>{" "}
      using <strong className="font-semibold">React</strong>, <strong className="font-semibold">Next.js</strong>
      , and <strong className="font-semibold">TypeScript</strong>, backed by robust APIs with{" "}
      <strong className="font-semibold">Node.js</strong> and <strong className="font-semibold">Django</strong>.
      <br />
      <br />
      I focus on <strong className="font-semibold">performance</strong>,{" "}
      <strong className="font-semibold">clean architecture</strong>, and{" "}
      <strong className="font-semibold">user experience</strong>, and have delivered measurable improvements —
      including optimizing critical flows by up to <strong className="font-semibold">40%</strong>.
      <br />
      <br />
      Currently exploring <strong className="font-semibold">AI-powered applications</strong>,{" "}
      <strong className="font-semibold">automation</strong>, and modern{" "}
      <strong className="font-semibold">DevOps</strong> practices to build smarter and faster systems.
    </>
  ) as ReactNode,

  metaDescription:
    "Naga Balaji Nagendra — SDE @ Gamyam (Amalāpuram, AP). React, Redux, TypeScript, React Native, Next.js, Django. Production apps: accessibility, gov-aligned web, enterprise UI, land-tech & maps.",

  careerObjective:
    "To work as a software engineer in a product-driven environment where I can build scalable applications, leverage AI technologies thoughtfully, and solve real-world user problems.",

  /** LinkedIn: Srinivasa Institute of Engineering and Technology, 2021–2025, 7.5 CGPA, ECE */
  education: (
    <>
      <strong className="font-semibold">B.Tech</strong>,{" "}
      <strong className="font-semibold">Electronics &amp; Communication Engineering</strong> — Srinivasa
      Institute of Engineering and Technology (2021–2025) ·{" "}
      <strong className="font-semibold">7.5 CGPA</strong>
    </>
  ) as ReactNode,

  availability: "Open to roles · India / remote-friendly",

  resumeUrl: "",

  links: {
    github: "https://github.com/Naga-Balaji",
    linkedin: "https://www.linkedin.com/in/nagabalajinagendra/",
  },

  /** Optional — LinkedIn company page for Gamyam */
  companyUrl: "https://www.linkedin.com/company/gamyamco",
};
