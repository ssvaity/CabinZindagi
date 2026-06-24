"use client";

import { useLanguage } from "@/lib/language-context";
import { display } from "@/lib/fonts";

const YOUTUBE = "https://www.youtube.com/@cabinzindagi";

// Gallery images — add entries here later (drop files in /public/gallery first):
//   { src: "/gallery/driver-1.jpg", alt: "On the highway" },
// Until then, placeholder tiles are shown.
const GALLERY: { src: string; alt: string }[] = [];

function VideoCard({ id, title }: { id: string; title: string }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white/[0.02] shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl dark:border-white/10"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-900/40 transition duration-200 group-hover:scale-110">
            <span className="material-symbols-outlined text-3xl">play_arrow</span>
          </span>
        </span>
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <span className="material-symbols-outlined text-[14px] text-red-500">
            smart_display
          </span>
          Cabin Zindagi
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold leading-snug">{title}</h3>
        <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brandtext">
          Watch on YouTube
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </p>
      </div>
    </a>
  );
}

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

      {/* Featured stories */}
      <p className="mt-16 text-xs font-semibold uppercase tracking-[0.2em] text-brandtext">
        {s.featured}
      </p>
      <div className="mt-5 grid gap-6 md:grid-cols-3">
        {s.featuredVideos.map((v) => (
          <VideoCard key={v.id} id={v.id} title={v.title} />
        ))}
      </div>

      {/* Latest uploads */}
      <p className="mt-14 text-xs font-semibold uppercase tracking-[0.2em] text-brandtext">
        {s.latest}
      </p>
      <div className="mt-5 grid gap-6 md:grid-cols-3">
        {s.latestVideos.map((v) => (
          <VideoCard key={v.id} id={v.id} title={v.title} />
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

      {/* Gallery */}
      <div className="mt-24 border-t border-black/10 pt-16 dark:border-white/10">
        <h2 className={`${display.className} text-3xl font-bold tracking-tight sm:text-4xl`}>
          {s.galleryTitle}
        </h2>
        <p className="mt-3 max-w-xl opacity-70">{s.gallerySub}</p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {(GALLERY.length ? GALLERY : Array.from({ length: 8 })).map((g, i) =>
            g ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={(g as { src: string }).src}
                src={(g as { src: string; alt: string }).src}
                alt={(g as { src: string; alt: string }).alt}
                className="aspect-square w-full rounded-xl border border-black/5 object-cover dark:border-white/10"
              />
            ) : (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-black/15 bg-black/[0.02] dark:border-white/15 dark:bg-white/[0.03]"
              >
                <span className="material-symbols-outlined text-3xl opacity-25">
                  image
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
