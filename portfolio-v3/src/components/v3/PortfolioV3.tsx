"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroCanvas, type V3ScrollState } from "@/components/v3/HeroCanvas";
import { featuredProjects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { marqueeKeywords, site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function MarqueeRow() {
  return (
    <>
      {marqueeKeywords.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="flex shrink-0 items-center gap-10 whitespace-nowrap"
        >
          <span className="font-mono-label text-[11px] font-semibold tracking-[0.32em] text-[var(--muted)] md:text-xs">
            {word}
          </span>
          <span className="text-[var(--accent)] opacity-50" aria-hidden>
            ◆
          </span>
        </span>
      ))}
    </>
  );
}

export function PortfolioV3() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<V3ScrollState>({ hero: 0, page: 0 });
  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  const phoneTel = site.phone.replace(/\s/g, "");
  const showGithub = Boolean(site.links.github?.length);
  const showResume = Boolean(site.resumeUrl?.length);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    if (!root || !hero) return;

    const ctx = gsap.context(() => {
      if (progressRef.current && !reduced) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              start: "top top",
              end: "max",
              scrub: 0.35,
            },
          },
        );
      }

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: reduced ? false : 0.55,
        onUpdate: (self) => {
          scrollRef.current.hero = reduced ? 0 : self.progress;
        },
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "max",
        scrub: reduced ? false : 0.45,
        onUpdate: (self) => {
          scrollRef.current.page = reduced ? 0 : self.progress;
        },
      });

      const reveal = root.querySelectorAll<HTMLElement>("[data-v3-reveal]");
      if (reveal.length && !reduced) {
        reveal.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative bg-[var(--bg)] text-[var(--fg)]">
      <div className="v3-noise" aria-hidden />
      <div
        ref={progressRef}
        className="v3-progress fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hot)]"
        style={{ transform: reduced ? "scaleX(0)" : undefined }}
        aria-hidden
      />

      <header className="fixed top-[2px] right-0 left-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
          <a href="#" className="font-mono-label text-[10px] tracking-[0.28em] text-[var(--fg-soft)] uppercase">
            {site.name.split(" ")[0]}
            <span className="text-[var(--accent)]">.</span>
          </a>
          <nav className="hidden items-center gap-8 font-mono-label text-[11px] tracking-[0.2em] text-[var(--muted)] uppercase md:flex">
            <a className="hover:text-[var(--accent)]" href="#work">
              Work
            </a>
            <a className="hover:text-[var(--accent)]" href="#skills">
              Skills
            </a>
            <a className="hover:text-[var(--accent)]" href="#about">
              About
            </a>
            <a className="hover:text-[var(--accent)]" href="#contact">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            {showResume ? (
              <a
                href={site.resumeUrl}
                className="font-mono-label rounded-full border border-[var(--border)] bg-[var(--accent-dim)] px-4 py-2 text-[10px] tracking-[0.2em] text-[var(--fg)] uppercase hover:border-[var(--accent)]"
              >
                Résumé
              </a>
            ) : null}
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono-label rounded-full border border-[var(--accent)] px-4 py-2 text-[10px] tracking-[0.2em] text-[var(--bg)] uppercase"
              style={{ background: "var(--accent)" }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <section
        ref={heroRef}
        className="v3-grid-bg relative flex min-h-[100dvh] flex-col justify-end overflow-hidden pt-28 pb-20 md:pb-28"
      >
        <HeroCanvas scrollRef={scrollRef} />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/20 to-[var(--bg)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8">
          <p className="font-mono-label mb-4 text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase">
            Software engineer
          </p>
          <h1 className="max-w-4xl text-4xl leading-[1.05] font-extrabold tracking-tight text-[var(--fg)] md:text-6xl lg:text-7xl">
            {site.name}
            <span className="mt-2 block text-2xl font-semibold text-[var(--fg-soft)] md:text-3xl">
              {site.role}
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-soft)] md:text-lg">
            {site.tagline}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#work"
              className="font-mono-label inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-8 py-3 text-xs font-semibold tracking-[0.18em] text-[#03140c] uppercase hover:bg-[var(--accent-hot)]"
            >
              View work
            </a>
            <a
              href={`mailto:${site.email}`}
              className="font-mono-label inline-flex items-center justify-center rounded-full border border-[var(--border)] px-8 py-3 text-xs tracking-[0.18em] text-[var(--fg-soft)] uppercase hover:border-[var(--accent)]"
            >
              Email
            </a>
          </div>
        </div>
      </section>

      <div className="border-y border-[var(--border)] bg-[var(--bg-panel)] py-4 overflow-hidden">
        <div className="v3-marquee-track gap-12 opacity-90">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>

      <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5" data-v3-reveal>
            <p className="font-mono-label text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
              About
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Built for product velocity</h2>
          </div>
          <div className="space-y-6 text-[var(--fg-soft)] md:col-span-7" data-v3-reveal>
            <p className="text-lg leading-relaxed">{site.careerObjective}</p>
            <p className="leading-relaxed">{site.education}</p>
            <p className="font-mono-label text-sm text-[var(--muted)]">{site.location}</p>
            <p className="inline-flex rounded-full border border-[var(--border)] px-4 py-2 font-mono-label text-xs tracking-wider text-[var(--accent)]">
              {site.availability}
            </p>
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-[var(--border)] bg-[var(--bg-panel)]/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-v3-reveal>
            <div>
              <p className="font-mono-label text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
                Selected work
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Shipped in production</h2>
            </div>
            <p className="max-w-md font-mono-label text-xs leading-relaxed text-[var(--muted)]">
              Gamyam product surfaces — mobile, web, enterprise, and public-sector aligned experiences.
            </p>
          </div>
          <ul className="flex flex-col gap-10">
            {featuredProjects.map((p, index) => (
              <li
                key={p.id}
                data-v3-reveal
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]/80 p-8 transition-colors hover:border-[var(--accent-dim)] md:p-10"
              >
                <span className="font-mono-label absolute top-6 right-8 text-[10px] text-[var(--muted)] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{p.title}</h3>
                    <p className="mt-2 font-mono-label text-xs tracking-wider text-[var(--accent)] uppercase">
                      {p.company ? `${p.company} · ` : ""}
                      {p.role}
                    </p>
                  </div>
                </div>
                <p className="mt-6 max-w-3xl text-[var(--fg-soft)]">{p.summary}</p>
                <p className="mt-4 max-w-3xl text-sm text-[var(--muted)]">{p.outcome}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-[var(--fg-soft)]">
                      <span className="text-[var(--accent)]">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--border)] px-3 py-1 font-mono-label text-[10px] tracking-wider text-[var(--muted)] uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="mb-14" data-v3-reveal>
          <p className="font-mono-label text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
            Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Skills & tooling</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((c) => (
            <article
              key={c.id}
              data-v3-reveal
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-panel)]/50 p-6 md:p-8"
            >
              <p className="font-mono-label text-[10px] tracking-[0.25em] text-[var(--muted)] uppercase">
                {c.eyebrow}
              </p>
              <h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-soft)]">{c.summary}</p>
              <ul className="mt-5 space-y-2 font-mono-label text-xs text-[var(--muted)]">
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--bg-panel)] py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div
            data-v3-reveal
            className="flex flex-col items-start gap-8 rounded-3xl border border-[var(--border)] bg-[var(--bg)]/60 p-8 md:flex-row md:items-center md:gap-12 md:p-12"
          >
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-[var(--accent-dim)] bg-[var(--accent-dim)] font-mono-label text-2xl font-bold text-[var(--accent)]">
              NB
            </div>
            <div>
              <p className="font-mono-label text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
                Profile
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">{site.name}</h2>
              <p className="mt-3 max-w-2xl text-[var(--fg-soft)]">{site.role}</p>
              <a
                href={site.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block font-mono-label text-sm text-[var(--accent)] hover:underline"
              >
                Gamyam →
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-[var(--border)] pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="font-mono-label text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase" data-v3-reveal>
            Contact
          </p>
          <h2
            className="mt-4 max-w-4xl text-4xl leading-[0.95] font-extrabold tracking-tight md:text-6xl lg:text-7xl"
            data-v3-reveal
          >
            Let&apos;s build
            <span className="block text-[var(--accent)]">the next release.</span>
          </h2>
          <div
            className="mt-14 grid gap-10 border-t border-[var(--border)] pt-14 md:grid-cols-3"
            data-v3-reveal
          >
            <div>
              <p className="font-mono-label text-[10px] tracking-[0.25em] text-[var(--muted)] uppercase">Email</p>
              <a className="mt-2 block text-lg text-[var(--fg-soft)] hover:text-[var(--accent)]" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
            <div>
              <p className="font-mono-label text-[10px] tracking-[0.25em] text-[var(--muted)] uppercase">Phone</p>
              <a className="mt-2 block text-lg text-[var(--fg-soft)] hover:text-[var(--accent)]" href={`tel:${phoneTel}`}>
                {site.phone}
              </a>
            </div>
            <div>
              <p className="font-mono-label text-[10px] tracking-[0.25em] text-[var(--muted)] uppercase">Links</p>
              <div className="mt-2 flex flex-col gap-2 font-mono-label text-sm">
                <a className="text-[var(--fg-soft)] hover:text-[var(--accent)]" href={site.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                {showGithub ? (
                  <a className="text-[var(--fg-soft)] hover:text-[var(--accent)]" href={site.links.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <p className="mt-16 font-mono-label text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">
            © {new Date().getFullYear()} {site.name} · Portfolio v3
          </p>
        </div>
      </footer>
    </div>
  );
}
