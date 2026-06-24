"use client";

import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t, locale } = useLanguage();
  // Join the wordmark in English ("CabinZindagi"); keep the space in Hindi.
  const brand = locale === "en" ? t.brand.replace(/\s+/g, "") : t.brand;

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-100 px-4 pt-28 pb-16 dark:bg-slate-900">
      {/* Radial mask fades the boxes out toward the edges */}
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-100 [mask-image:radial-gradient(transparent,white)] dark:bg-slate-900" />

      <Boxes />

      <h1 className="relative z-20 py-2 bg-gradient-to-b from-[#1f2a33] to-neutral-600 bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl md:text-8xl dark:from-white dark:to-neutral-400">
        {brand}
      </h1>

      <p className="relative z-20 mt-4 text-center text-base font-semibold uppercase tracking-[0.2em] text-brand sm:text-xl">
        {t.home.tagline}
      </p>

      <p className="relative z-20 mx-auto mt-6 max-w-xl text-center text-neutral-600 dark:text-neutral-300">
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
          className="inline-block rounded-full border border-black/15 bg-black/5 px-7 py-3 font-semibold text-[#1f2a33] backdrop-blur transition hover:border-accent hover:text-accent dark:border-white/20 dark:bg-white/5 dark:text-white"
        >
          {t.home.ctaSecondary}
        </Link>
      </div>
    </section>
  );
}
