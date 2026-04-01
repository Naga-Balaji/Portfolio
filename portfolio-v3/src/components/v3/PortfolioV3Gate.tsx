"use client";

import dynamic from "next/dynamic";

const PortfolioV3 = dynamic(
  () => import("@/components/v3/PortfolioV3").then((m) => m.PortfolioV3),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] text-[var(--fg-soft)]">
        <p className="font-mono-label text-xs tracking-[0.3em] uppercase">Loading scene…</p>
      </div>
    ),
  },
);

export function PortfolioV3Gate() {
  return <PortfolioV3 />;
}
