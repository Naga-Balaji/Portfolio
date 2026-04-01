"use client";

import Image from "next/image";
import { HERO_ORBIT_RING_SETS } from "@/data/hero-tech-orbit";
import { site } from "@/data/site";

const RING_ANGLE_OFFSET = [0, 360 / 22, 360 / 11 / 2] as const;

const pillClass =
  "border-2 border-[var(--v2-ink)] bg-[var(--v2-paper)] text-[var(--v2-ink)] shadow-[2px_2px_0_var(--v2-green-mid)]";

function OrbitPill({ label, angleDeg }: { label: string; angleDeg: number }) {
  return (
    <span
      className={`orbit-pill absolute left-1/2 top-1/2 z-[1] max-w-[5.6rem] truncate rounded-full px-1 py-0.5 text-center text-[7.25px] font-semibold uppercase leading-tight tracking-wide shadow-sm min-[400px]:max-w-[6rem] sm:max-w-[8.25rem] sm:px-2 sm:text-[8.25px] md:max-w-[9.25rem] md:px-2 md:text-[9px] lg:max-w-[10.25rem] lg:text-[10px] font-v2-mono ${pillClass}`}
      style={{
        transform: `translate(-50%, -50%) rotate(${angleDeg}deg) translateY(calc(-1 * var(--orbit-r, 6rem))) rotate(${-angleDeg}deg)`,
      }}
      title={label}
    >
      {label}
    </span>
  );
}

const imgRing =
  "ring-2 ring-[var(--v2-ink)] ring-offset-2 ring-offset-[var(--v2-paper)] sm:ring-offset-4";

export function HeroTechOrbit() {
  return (
    <div className="hero-tech-orbit-root mx-auto w-full max-w-[min(100%,calc(100vw-2.75rem))] sm:max-w-[min(100%,640px)] sm:px-2">
      {/* Mobile: scale entire graphic so pills stay inside the column; sm+ uses full size */}
      <div className="flex justify-center overflow-x-clip sm:overflow-visible">
        <div className="hero-tech-orbit-scale w-full max-w-[min(350px,calc(100vw-3rem))] origin-top scale-[0.77] min-[400px]:scale-[0.83] sm:max-w-none sm:scale-100 sm:origin-center">
          <div className="relative mx-auto w-full">
            <div
              className="pointer-events-none absolute inset-[-11%] rounded-full bg-[color-mix(in_srgb,var(--v2-green)_12%,transparent)]"
              aria-hidden
            />

            <div className="hero-tech-orbit relative aspect-square w-full min-h-[min(72vw,328px)] overflow-visible sm:min-h-0">
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-[10] w-[min(62%,214px)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(58%,226px)] md:w-[min(50%,264px)] lg:w-[min(48%,284px)]">
                <div className={`relative w-full overflow-visible rounded-2xl sm:rounded-3xl ${imgRing}`}>
                  <Image
                    src="/image2.png"
                    alt={`${site.name} — profile illustration`}
                    width={640}
                    height={640}
                    className="h-auto w-full object-contain object-center drop-shadow-md"
                    sizes="(max-width: 639px) 208px, (max-width: 1023px) 48vw, 284px"
                    priority
                  />
                </div>
              </div>

              {HERO_ORBIT_RING_SETS.map((labels, ringIdx) => {
                const z = 20 + ringIdx * 2;
                const varName = `--o-r${ringIdx}` as const;
                return (
                  <div
                    key={ringIdx}
                    className="absolute inset-0 sm:inset-[-2%] md:inset-0"
                    style={{
                      transformOrigin: "50% 50%",
                      zIndex: z,
                      ["--orbit-r" as string]: `var(${varName})`,
                    }}
                  >
                    <div className="relative h-full w-full">
                      {labels.map((label, i) => (
                        <OrbitPill
                          key={`r${ringIdx}-${label}-${i}`}
                          label={label}
                          angleDeg={(360 / labels.length) * i + RING_ANGLE_OFFSET[ringIdx]}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
