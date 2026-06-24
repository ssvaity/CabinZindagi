"use client";

import { useLanguage } from "@/lib/language-context";
import { display } from "@/lib/fonts";

const YOUTUBE = "https://www.youtube.com/@cabinzindagi";

// Designed gradient posters (brand-themed) for the featured video cards.
const posters = [
  "from-brand/40 via-[#14110d] to-[#0b0b12]",
  "from-accent/35 via-[#0d1410] to-[#0b0b12]",
  "from-brand-light/35 via-[#14110d] to-[#0b0b12]",
];

export function Stories() {
  const { t } = useLanguage();
  const s = t.stories;

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:py-28">
      {/* Hero */}
      <div className="max-w-2xl">
        <p className="pt-1 text-xs font-semibold uppercase leading-relaxed tracking-[0.28em] text-brandtext">
          {s.eyebrow}
        </p>
        <h1
          className={`${display.className} mt-3 bg-gradient-to-r from-brand via-brand-light to-accent bg-clip-text py-1 text-4xl font-bold tracking-tight text-transparent sm:text-6xl`}
        >
          {s.heading}
        </h1>
        <p className="mt-5 text-lg leading-relaxed opacity-75">{s.sub}</p>
      </div>

      {/* Featured video stories */}
      <p className="mt-16 text-xs font-semibold uppercase tracking-[0.2em] text-brandtext">
        {s.featured}
      </p>
      <div className="mt-5 grid gap-6 md:grid-cols-3">
        {s.videos.map((v, i) => (
          <a
            key={v.title}
            href={YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-2xl border border-black/10 bg-white/[0.02] shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl dark:border-white/10"
          >
            <div
              className={`relative flex aspect-video items-center justify-center bg-gradient-to-br ${posters[i % posters.length]}`}
            >
              {/* subtle tread texture */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(135deg,#fff_0,#fff_2px,transparent_2px,transparent_10px)]" />
              {/* play button */}
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-900/40 transition duration-200 group-hover:scale-110">
                <span className="material-symbols-outlined text-4xl">play_arrow</span>
              </span>
              {/* channel chip */}
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                <span className="material-symbols-outlined text-[14px] text-red-500">
                  smart_display
                </span>
                Cabin Zindagi
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold leading-snug">{v.title}</h3>
              <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brandtext">
                Watch on YouTube
                <span aria-hidden className="transition group-hover:translate-x-0.5">
                  →
                </span>
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Watch-all CTA */}
      <div className="mt-10">
        <a
          href={YOUTUBE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 font-semibold text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500"
        >
          <span className="material-symbols-outlined text-[20px]">smart_display</span>
          {s.watchAll}
          <span aria-hidden>→</span>
        </a>
      </div>

      {/* In their words — editorial quote band */}
      <div className="mt-24 border-t border-black/10 pt-16 dark:border-white/10">
        <h2 className={`${display.className} text-3xl font-bold tracking-tight sm:text-4xl`}>
          {s.voicesTitle}
        </h2>
        <p className="mt-3 max-w-xl opacity-70">{s.voicesSub}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {s.items.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-2xl border border-black/10 bg-black/[0.02] p-7 transition duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="material-symbols-outlined text-3xl text-brandtext">
                format_quote
              </span>
              <blockquote className="mt-1 text-lg leading-relaxed opacity-90">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 font-bold text-brandtext">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-bold leading-tight">{item.name}</span>
                  <span className="block text-sm opacity-60">{item.route}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
