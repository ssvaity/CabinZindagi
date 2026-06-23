"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import DotGrid from "./DotGrid";

export function QuoteSection() {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Default to dark until mounted (avoids a flash with the wrong palette).
  const isDark = !mounted || resolvedTheme === "dark";
  // Match the Hero grid palette (slate-900/slate-700 dark, slate-100/slate-200 light).
  const baseColor = isDark ? "#334155" : "#E2E8F0";
  const activeColor = isDark ? "#FE8A1C" : "#FE680F";

  // Split the slogan at the comma: muted lead line + bright emphasis line.
  const [lead, ...rest] = t.home.quote.split(",");
  const emphasis = rest.join(",").trim();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-100 py-40 sm:py-56 dark:bg-slate-900">
      {/* interactive dot grid background — colours follow the theme */}
      <div className="absolute inset-0">
        <DotGrid
          baseColor={baseColor}
          activeColor={activeColor}
          dotSize={5}
          gap={28}
          proximity={260}
          shockRadius={180}
          shockStrength={3}
          returnDuration={2}
        />
      </div>

      {/* subtle radial brand glow behind the text */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(254,104,15,0.12),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-4xl px-4 text-center">
        <p className="text-3xl font-semibold leading-snug tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-brand via-brand-light to-accent bg-clip-text font-bold text-transparent">
            {lead.trim()},
          </span>
          <span className="mt-1 block text-[#1f2a33] dark:text-white">
            {emphasis}
          </span>
        </p>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-brandtext sm:text-sm">
          {t.home.quoteSub}
        </p>
      </div>
    </section>
  );
}
