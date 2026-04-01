"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";
import { featuredProjects } from "@/data/projects";
import {
  skillCategories,
  skillsSectionDescription,
  skillsSectionTitle,
} from "@/data/skills";
import { HeroTechOrbit } from "@/components/portfolio/HeroTechOrbit";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ScribbleRule() {
  return (
    <svg
      className="mx-auto w-full max-w-lg px-4 text-[var(--v2-green-mid)] opacity-50 sm:px-0"
      viewBox="0 0 480 20"
      aria-hidden
    >
      <path
        d="M8 10 C80 2 160 18 240 10 S400 2 472 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function V2Grain() {
  return (
    <div className="portfolio-v2-grain" aria-hidden>
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="v2noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
            result="n"
          />
          <feColorMatrix type="saturate" values="0" in="n" />
        </filter>
        <rect width="100%" height="100%" filter="url(#v2noise)" />
      </svg>
    </div>
  );
}

function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const navItems = [
  { id: "intro", href: "#intro", label: "Intro" },
  { id: "work", href: "#work", label: "Work" },
  { id: "stack", href: "#stack", label: "Stack" },
  { id: "contact", href: "#contact", label: "Hello" },
] as const;

export function PortfolioV2Experience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const heroHandRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const [activeNavId, setActiveNavId] = useState<string>("intro");
  const [chevronTopPx, setChevronTopPx] = useState(0);
  const navRailRef = useRef<HTMLDivElement>(null);
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const updateChevronPosition = useCallback(() => {
    const rail = navRailRef.current;
    if (!rail) return;
    const idx = navItems.findIndex((item) => item.id === activeNavId);
    const link = navLinkRefs.current[idx];
    if (!link) return;
    const railRect = rail.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const centerY = linkRect.top + linkRect.height / 2 - railRect.top;
    setChevronTopPx(centerY);
  }, [activeNavId]);

  useLayoutEffect(() => {
    updateChevronPosition();
  }, [updateChevronPosition]);

  useEffect(() => {
    window.addEventListener("resize", updateChevronPosition);
    return () => window.removeEventListener("resize", updateChevronPosition);
  }, [updateChevronPosition]);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);

    const updateActiveNav = () => {
      const marker = window.scrollY + window.innerHeight * 0.32;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = window.scrollY + el.getBoundingClientRect().top;
        if (marker >= top) current = id;
      }
      setActiveNavId(current);
    };

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);
    return () => {
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("resize", updateActiveNav);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = prefersReducedMotion();
    const preloader = preloaderRef.current;

    const ctx = gsap.context(() => {
      if (preloader && !reduced) {
        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
        tl.to(preloader.querySelector("[data-v2-preload-text]"), {
          y: -12,
          opacity: 0,
          duration: 0.45,
          delay: 0.35,
        }).to(
          preloader,
          {
            yPercent: -100,
            duration: 0.85,
            onComplete: () => {
              gsap.set(preloader, {
                pointerEvents: "none",
                visibility: "hidden",
              });
            },
          },
          "-=0.1",
        );
      } else if (preloader) {
        gsap.set(preloader, { display: "none" });
      }

      const handWords = heroHandRef.current?.querySelectorAll<HTMLElement>("[data-v2-word]");
      if (handWords?.length && !reduced) {
        gsap.fromTo(
          handWords,
          { yPercent: 120, rotate: -4, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.07,
            ease: "power4.out",
            delay: reduced ? 0 : 1.15,
          },
        );
      }

      if (heroSubRef.current && !reduced) {
        gsap.fromTo(
          heroSubRef.current,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 1.55,
          },
        );
      }

      const reveals = root.querySelectorAll<HTMLElement>("[data-v2-reveal]");
      reveals.forEach((el) => {
        if (reduced) {
          gsap.set(el, { opacity: 1, y: 0, rotate: 0 });
          return;
        }
        gsap.fromTo(
          el,
          { y: 72, opacity: 0, rotate: -1.2 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      const cards = root.querySelectorAll<HTMLElement>("[data-v2-card]");
      cards.forEach((el, i) => {
        if (reduced) {
          gsap.set(el, { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          el,
          { y: 90, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      const stackRows = root.querySelectorAll<HTMLElement>("[data-v2-stack-row]");
      stackRows.forEach((el, i) => {
        if (reduced) {
          gsap.set(el, { opacity: 1, x: 0 });
          return;
        }
        gsap.fromTo(
          el,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            delay: i * 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#stack",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  const showGithub = Boolean(site.links.github?.length);
  const nameParts = site.name.split(" ");

  return (
    <div ref={rootRef} className="portfolio-v2-experience relative z-[2] min-w-0">
      <div
        ref={preloaderRef}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--v2-green)] px-6 text-center text-[var(--v2-paper)]"
      >
        <p
          data-v2-preload-text
          className="font-v2-hand text-4xl font-semibold tracking-wide md:text-5xl"
        >
          <strong className="font-bold">One sec</strong>…
        </p>
        <p className="font-v2-mono mt-4 text-xs uppercase tracking-[0.35em] opacity-80">
          <strong className="font-semibold">DIY</strong> scroll · <strong className="font-semibold">GSAP</strong>
        </p>
      </div>

      <V2Grain />

      <nav
        className="fixed left-0 top-0 z-[90] flex h-full w-11 flex-col overflow-visible pt-[max(0.5rem,env(safe-area-inset-top))] md:w-16 md:pt-0"
        aria-label="Section navigation"
      >
        <div
          className="pointer-events-none absolute inset-0 border-r border-[var(--v2-border)] bg-[var(--v2-paper)]/92 backdrop-blur-sm"
          aria-hidden
        />
        <div
          ref={navRailRef}
          className="relative flex h-full w-full flex-col items-stretch justify-center gap-5 overflow-visible px-0.5 py-6 md:gap-8 md:px-1.5 md:py-8"
        >
          {navItems.map((item, i) => {
            const isActive = activeNavId === item.id;
            return (
              <a
                key={item.href}
                ref={(el) => {
                  navLinkRefs.current[i] = el;
                }}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={`portfolio-v2-nav-link relative flex min-h-[44px] w-full items-center justify-center overflow-visible py-1 font-v2-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-[var(--v2-ink-soft)] [writing-mode:vertical-rl] sm:text-[9px] sm:tracking-[0.2em] md:min-h-0 md:py-0 md:text-[10px] ${
                  isActive ? "portfolio-v2-nav-link--active" : ""
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <svg
            className={`portfolio-v2-nav-chevron pointer-events-none absolute left-full z-[2] ml-[-0.5] h-[14px] w-[11px] -translate-y-1/2 motion-safe:transition-[top] motion-safe:duration-300 motion-safe:ease-out ${
              activeNavId === "stack" ? "portfolio-v2-nav-chevron--white" : ""
            }`}
            style={{ top: chevronTopPx }}
            viewBox="0 0 8 12"
            aria-hidden
            role="presentation"
          >
            <polygon points="0,0 8,6 0,12" />
          </svg>
        </div>
      </nav>

      <div className="min-w-0 max-w-[100vw] pl-11 pr-[max(0.75rem,env(safe-area-inset-right))] md:pl-16 md:pr-0">
        <section
          id="intro"
          className="relative overflow-x-visible px-4 pb-16 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 md:px-12 md:pb-24 md:pt-12"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-8 py-6 sm:gap-10 sm:py-8 md:min-h-[min(92dvh,900px)] md:grid-cols-[1fr_minmax(280px,42%)] md:items-center md:gap-14 md:py-10">
          <div className="relative z-10 min-w-0 max-w-4xl">
            <p className="font-v2-mono text-[10px] uppercase leading-snug tracking-[0.28em] text-[var(--v2-ink-soft)] sm:text-xs sm:tracking-[0.35em]">
              Building <strong className="font-semibold">scalable</strong> web &amp; mobile products with{" "}
              <strong className="font-semibold">performance</strong> and{" "}
              <strong className="font-semibold">AI-driven</strong> experiences
            </p>
            <div
              ref={heroHandRef}
              className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-v2-hand text-[clamp(2.35rem,10.5vw+0.35rem,7rem)] font-bold leading-[0.92] text-[var(--v2-green)] sm:mt-6 sm:gap-x-3"
            >
              {nameParts.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden pb-4 pl-0.5 pr-4 sm:pr-5 md:pr-6"
                >
                  <span data-v2-word className="inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </div>
            <p
              ref={heroSubRef}
              className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--v2-ink-soft)] sm:mt-10 sm:text-lg md:text-xl"
            >
              {site.role}
            </p>
            <p className="mt-4 max-w-2xl break-words border-l-4 border-[var(--v2-highlighter)] pl-4 text-sm leading-relaxed text-[var(--v2-ink)] sm:mt-5 sm:pl-5 sm:text-base md:text-lg">
              {site.tagline}
            </p>
            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-12 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="#work"
                className="inline-flex min-h-[48px] w-full rotate-[-1deg] items-center justify-center rounded-sm border-2 border-[var(--v2-ink)] bg-[var(--v2-highlighter)] px-6 py-3.5 text-center font-v2-hand text-xl font-semibold text-[var(--v2-ink)] shadow-[4px_4px_0_var(--v2-ink)] transition-transform active:scale-[0.98] sm:w-auto sm:px-8 sm:text-2xl sm:hover:translate-x-0.5 sm:hover:translate-y-0.5 sm:hover:shadow-[2px_2px_0_var(--v2-ink)]"
              >
                See the work
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-[48px] w-full rotate-[1deg] items-center justify-center border-b-4 border-[var(--v2-green-mid)] px-4 py-3.5 text-center font-v2-hand text-xl text-[var(--v2-green)] active:opacity-90 sm:w-auto sm:text-2xl"
              >
                Say hi →
              </a>
            </div>
          </div>
          <div className="flex min-w-0 justify-center overflow-x-clip sm:overflow-x-visible md:justify-end">
            <HeroTechOrbit />
          </div>
          </div>
          <p className="mx-auto mt-8 max-w-6xl px-2 text-center font-v2-mono text-[9px] uppercase leading-snug tracking-[0.25em] text-[var(--v2-ink-soft)] sm:text-[10px] sm:tracking-[0.3em] md:mt-12">
            Scroll to explore my <strong className="font-semibold">tech stack</strong> &amp;{" "}
            <strong className="font-semibold">projects</strong>
          </p>
        </section>

        <ScribbleRule />

        <section id="work" className="px-4 py-12 sm:px-5 md:px-12 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2
              data-v2-reveal
              className="font-v2-hand text-[clamp(2.25rem,9vw,3.75rem)] font-bold leading-tight text-[var(--v2-green)] md:text-6xl"
            >
              <strong className="font-bold">Production</strong> work I&apos;ve{" "}
              <strong className="font-bold">shipped</strong>
            </h2>
            <p
              data-v2-reveal
              className="mt-4 max-w-2xl font-v2-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-[var(--v2-ink-soft)] sm:text-sm sm:tracking-[0.2em]"
            >
              <strong className="font-semibold">Real-world</strong> products built and shipped at{" "}
              <strong className="font-semibold">Gamyam</strong>, focusing on{" "}
              <strong className="font-semibold">scalability</strong>,{" "}
              <strong className="font-semibold">performance</strong>, and{" "}
              <strong className="font-semibold">user experience</strong>{" "}
              <strong className="whitespace-nowrap font-semibold">(May 2025-Present)</strong>.
            </p>

            <div className="mt-10 grid gap-6 sm:mt-14 sm:gap-8 md:grid-cols-2">
              {featuredProjects.map((p, i) => (
                <article
                  key={p.id}
                  data-v2-card
                  className="portfolio-v2-card rounded-sm border-2 border-[var(--v2-ink)] bg-[var(--v2-paper-2)] p-5 shadow-[6px_6px_0_rgba(30,92,58,0.2)] sm:p-6 md:p-8"
                  style={{ transform: `rotate(${i % 2 === 0 ? -0.8 : 0.8}deg)` }}
                >
                  {p.company ? (
                    <p className="font-v2-mono text-[10px] uppercase tracking-[0.25em] text-[var(--v2-green-mid)]">
                      {p.company}
                    </p>
                  ) : null}
                  <h3 className="mt-2 font-v2-hand text-2xl font-bold leading-tight text-[var(--v2-ink)] sm:text-3xl md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-v2-mono text-xs uppercase tracking-wider text-[var(--v2-ink-soft)]">
                    {p.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--v2-ink)] md:text-base">
                    {p.summary}
                  </p>
                  <p className="mt-3 font-v2-hand text-lg italic text-[var(--v2-green)]">
                    {p.outcome}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 6).map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[var(--v2-border)] bg-[var(--v2-paper)] px-3 py-1 font-v2-mono text-[10px] uppercase tracking-wide text-[var(--v2-ink-soft)]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ScribbleRule />

        <section
          id="stack"
          className="bg-[var(--v2-green)] px-4 py-16 text-[var(--v2-paper)] sm:px-5 md:px-12 md:py-28"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="font-v2-hand text-[clamp(2.25rem,8vw,3.75rem)] font-bold leading-tight md:text-6xl">
              {skillsSectionTitle}
            </h2>
            <p className="mt-3 max-w-xl font-v2-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-[var(--v2-paper)]/75 sm:text-xs sm:tracking-[0.25em]">
              {skillsSectionDescription}
            </p>
            <ul className="mt-8 space-y-5 sm:mt-12 sm:space-y-6">
              {skillCategories.map((cat, i) => (
                <li
                  key={cat.id}
                  data-v2-stack-row
                  className="border-b border-[var(--v2-paper)]/25 pb-6"
                >
                  <p className="font-v2-mono text-[10px] uppercase tracking-[0.3em] text-[var(--v2-highlighter)]">
                    {cat.eyebrow}
                  </p>
                  <h3 className="mt-2 font-v2-hand text-2xl font-semibold md:text-3xl">{cat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--v2-paper)]/85">{cat.summary}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-sm border border-[var(--v2-paper)]/30 px-2 py-1 font-v2-mono text-[10px] uppercase tracking-wide"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="px-4 py-16 sm:px-5 md:px-12 md:py-10">
          <div className="mx-auto max-w-2xl px-1 text-center sm:px-0">
            <h2
              data-v2-reveal
              className="font-v2-hand text-[clamp(2.1rem,8vw,3.75rem)] font-bold leading-tight text-[var(--v2-green)] md:text-6xl"
            >
              Let&apos;s build something <strong className="font-bold">impactful</strong>
            </h2>
            <p data-v2-reveal className="mt-4 text-sm leading-relaxed text-[var(--v2-ink-soft)] sm:text-base">
              Open to <strong className="font-semibold">full-time SDE</strong> roles,{" "}
              <strong className="font-semibold">freelance</strong> projects, and collaborations in web,
              mobile, and <strong className="font-semibold">AI-powered</strong> applications.
            </p>
            <p data-v2-reveal className="mt-4 text-[var(--v2-ink-soft)]">
              {site.location}
            </p>
            <p data-v2-reveal className="mt-8 font-v2-mono text-sm text-[var(--v2-ink-soft)]">
              <strong className="font-semibold">Reach out</strong> directly:
            </p>
            <a
              data-v2-reveal
              href={`mailto:${site.email}`}
              className="mt-2 inline-block max-w-full break-all px-1 font-v2-hand text-2xl font-semibold text-[var(--v2-green)] underline decoration-wavy decoration-[var(--v2-green-mid)] underline-offset-4 sm:break-words sm:text-3xl sm:underline-offset-8 md:text-4xl"
            >
              {site.email}
            </a>
            <p data-v2-reveal className="mt-6 font-v2-mono text-sm text-[var(--v2-ink-soft)]">
              📞 <strong className="font-semibold">Available</strong> for quick discussions:
            </p>
            <p data-v2-reveal className="mt-2 font-v2-mono text-sm text-[var(--v2-ink-soft)]">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-[var(--v2-green)]">
                {site.phone}
              </a>
            </p>
            {showGithub ? (
              <>
                <p
                  data-v2-reveal
                  className="mt-10 flex items-center justify-center gap-2 font-v2-mono text-sm text-[var(--v2-ink-soft)]"
                >
                  <GitHubLogo className="h-[1.1em] w-[1.1em] shrink-0 text-[var(--v2-ink)]" />
                  <strong className="font-semibold">GitHub</strong>:
                </p>
                <a
                  data-v2-reveal
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex max-w-full items-start gap-2 break-all border-b-2 border-[var(--v2-ink)] pb-1 text-left font-v2-mono text-[10px] leading-snug text-[var(--v2-ink-soft)] transition-colors hover:border-[var(--v2-green)] hover:text-[var(--v2-green)] sm:text-xs"
                >
                  <GitHubLogo className="mt-0.5 h-3.5 w-3.5 shrink-0 text-current sm:h-4 sm:w-4" />
                  <span className="min-w-0">https://github.com/Naga-Balaji</span>
                </a>
              </>
            ) : null}
            <div
              data-v2-reveal
              className="mt-10 flex flex-wrap justify-center gap-4 font-v2-mono text-xs uppercase tracking-widest"
            >
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b-2 border-[var(--v2-ink)] pb-1 text-[var(--v2-ink-soft)] transition-colors hover:border-[var(--v2-green)] hover:text-[var(--v2-green)]"
              >
                <LinkedInLogo className="h-[1.15em] w-[1.15em] shrink-0 text-current" />
                Connect on LinkedIn →
              </a>
            </div>
            <p data-v2-reveal className="mt-14 text-sm leading-relaxed text-[var(--v2-ink-soft)]">
              I enjoy building <strong className="font-semibold">scalable products</strong>, solving{" "}
              <strong className="font-semibold">real-world problems</strong>, and continuously learning new
              technologies. If you&apos;re looking for a developer who can take{" "}
              <strong className="font-semibold">ownership</strong> and <strong className="font-semibold">deliver</strong>{" "}
              — let&apos;s connect.
            </p>
            <p data-v2-reveal className="mt-6 text-left text-sm leading-relaxed text-[var(--v2-ink-soft)]">
              <span className="font-v2-hand text-lg text-[var(--v2-ink)]">Note · </span>
              {site.education}
            </p>
          </div>
        </section>

        <footer className="border-t-2 border-dashed border-[var(--v2-border)] px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-5 md:px-12 md:py-10 md:pb-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 text-center text-xs text-[var(--v2-ink-soft)] md:flex-row md:items-center md:justify-between md:text-left">
            <span>
              © {new Date().getFullYear()} {site.name} — Built with <strong className="font-semibold">Next.js</strong>
              , <strong className="font-semibold">GSAP</strong>, and a focus on{" "}
              <strong className="font-semibold">performance</strong>.
            </span>
            <span>
              Available for <strong className="font-semibold">full-time</strong> roles &amp;{" "}
              <strong className="font-semibold">freelance</strong> projects.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
