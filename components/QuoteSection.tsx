"use client";

import { useLanguage } from "@/lib/language-context";

export function QuoteSection() {
  const { t } = useLanguage();

  // Split the slogan at the comma: muted lead line + bright emphasis line.
  const [lead, ...rest] = t.home.quote.split(",");
  const emphasis = rest.join(",").trim();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0b0b12] py-40 sm:py-56">
      {/* subtle radial brand glow behind the text */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(254,104,15,0.12),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-4xl px-4 text-center">
        <p className="text-3xl font-semibold leading-snug tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-neutral-500">{lead.trim()},</span>
          <span className="mt-1 block text-white">{emphasis}</span>
        </p>
        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-neutral-500 sm:text-sm">
          {t.home.quoteSub}
        </p>
      </div>
    </section>
  );
}
