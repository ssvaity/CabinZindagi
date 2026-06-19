"use client";

import { useLanguage } from "@/lib/language-context";
import { display } from "@/lib/fonts";

export function Outcome() {
  const { t } = useLanguage();
  const o = t.home.outcome;

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      {/* Label + heading */}
      <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-50">
        {o.label}
      </p>
      <h2
        className={`${display.className} mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl`}
      >
        {o.headingLead}
        <br />
        <span className="opacity-40">{o.headingEmphasis}</span>
      </h2>

      {/* Before / After split card */}
      <div className="mt-12 grid overflow-hidden rounded-3xl border border-black/5 md:grid-cols-2 dark:border-white/10">
        {/* BEFORE — light panel */}
        <div className="bg-cream/60 p-8 sm:p-10 dark:bg-white/[0.03]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-50">
            {o.beforeLabel}
          </p>
          <h3 className="mt-4 text-2xl font-bold leading-snug">
            {o.beforeTitle[0]}
            <br />
            {o.beforeTitle[1]}
          </h3>
          <ul className="mt-6 space-y-3.5">
            {o.before.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/10 text-[11px] dark:bg-white/15">
                  ✕
                </span>
                <span className="text-sm line-through opacity-55">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AFTER — dark panel */}
        <div className="relative overflow-hidden bg-[#0b0b12] p-8 text-white sm:p-10">
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_top_right,rgba(254,104,15,0.18),transparent_55%)]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              {o.afterLabel}
            </p>
            <h3 className="mt-4 text-2xl font-bold leading-snug">
              {o.afterTitle[0]}
              <br />
              {o.afterTitle[1]}
            </h3>
            <ul className="mt-6 space-y-3.5">
              {o.after.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] text-[#1f2a33]">
                    ✓
                  </span>
                  <span className="text-sm text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
