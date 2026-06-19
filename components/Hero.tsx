"use client";

import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t, locale } = useLanguage();
  // Join the wordmark in English ("CabinZindagi"); keep the space in Hindi.
  const brand = locale === "en" ? t.brand.replace(/\s+/g, "") : t.brand;

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-slate-900 px-4">
      {/* Radial mask fades the boxes out toward the edges */}
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />

      <Boxes />

      <h1 className="relative z-20 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl md:text-8xl">
        {brand}
      </h1>

      <p className="relative z-20 mt-4 text-center text-base font-semibold uppercase tracking-[0.2em] text-brand sm:text-xl">
        {t.home.tagline}
      </p>

      <p className="relative z-20 mx-auto mt-6 max-w-xl text-center text-neutral-300">
        {t.home.subtitle}
      </p>

      <div className="relative z-20 mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/contact"
          className="inline-block rounded-full bg-brand px-7 py-3 font-semibold text-[#1f2a33] shadow-lg shadow-brand/30 transition hover:bg-brand-light"
        >
          {t.home.ctaPrimary}
        </Link>
        <Link
          href="/impact"
          className="inline-block rounded-full border border-white/20 bg-white/5 px-7 py-3 font-semibold text-white backdrop-blur transition hover:border-accent hover:text-accent"
        >
          {t.home.ctaSecondary}
        </Link>
      </div>
    </section>
  );
}
