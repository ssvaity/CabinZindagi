"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Timeline } from "@/components/ui/timeline";
import { display } from "@/lib/fonts";

type JourneyEntry = {
  title: string;
  variant: string;
  intro: string;
  cards: { title: string; text: string }[];
};

// Material Symbols icon per card, by [entry index][card index].
const cardIcons = [
  [],
  [],
  ["health_and_safety", "hotel", "shield", "diversity_3"],
  ["verified", "trending_up"],
];

const cardBase =
  "group rounded-2xl border border-black/5 bg-black/[0.02] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]";

// One journey entry's right-side content: intro paragraph + cards. Shared by
// the timeline layout (/impact) and the bare stacked layout (/test).
export function ImpactEntryContent({
  entry,
  index: e,
}: {
  entry: JourneyEntry;
  index: number;
}) {
  const { t } = useLanguage();
  let body: React.ReactNode = null;

  if (entry.variant === "stats") {
    body = (
      <div className="grid grid-cols-2 gap-3">
        {entry.cards.map((c) => (
          <div key={c.title} className={cardBase}>
            <div
              className={`${display.className} text-3xl font-extrabold tracking-tight text-brandtext sm:text-4xl`}
            >
              {c.title}
            </div>
            <div className="mt-1 text-xs leading-snug opacity-70">{c.text}</div>
          </div>
        ))}
      </div>
    );
  } else if (entry.variant === "dark") {
    body = (
      <div className="grid gap-3 sm:grid-cols-2">
        {entry.cards.map((c, i) => (
          <div
            key={c.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b12] p-5 text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_top_right,rgba(45,141,70,0.28),transparent_60%)]" />
            <div className="relative">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <span className="material-symbols-outlined text-[20px]">
                  {cardIcons[e]?.[i] ?? "check"}
                </span>
              </div>
              <h4
                className={`${display.className} text-lg font-semibold tracking-tight`}
              >
                {c.title}
              </h4>
              <p className="mt-1 text-sm text-white/70">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (entry.variant === "csr") {
    body = (
      <div>
        <div className="grid gap-3">
          {entry.cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl bg-brand p-5 text-[#1f2a33] transition hover:bg-brand-light"
            >
              <h4 className={`${display.className} text-lg font-bold tracking-tight`}>
                {c.title}
              </h4>
              <p className="mt-1 text-sm text-[#1f2a33]/80">{c.text}</p>
            </div>
          ))}
        </div>
        <Link
          href="/contact"
          className="mt-6 inline-block font-semibold text-brandtext transition hover:opacity-80"
        >
          {t.home.ctaPrimary} →
        </Link>
      </div>
    );
  } else if (entry.variant === "cards") {
    body = (
      <div className="grid gap-3 sm:grid-cols-2">
        {entry.cards.map((c, i) => (
          <div
            key={c.title}
            className={`${cardBase} ${
              entry.cards.length % 2 === 1 && i === 0 ? "sm:col-span-2" : ""
            }`}
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand transition group-hover:bg-brand/20">
              <span className="material-symbols-outlined text-[20px]">
                {cardIcons[e]?.[i] ?? "check"}
              </span>
            </div>
            <h4
              className={`${display.className} text-lg font-semibold tracking-tight`}
            >
              {c.title}
            </h4>
            <p className="mt-1 text-sm opacity-70">{c.text}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-sm leading-relaxed opacity-80 md:text-base">
        {entry.intro}
      </p>
      {body}
    </div>
  );
}

// Timeline layout used on the /impact page.
export function ImpactContent({
  showProgressLine = true,
}: {
  showProgressLine?: boolean;
} = {}) {
  const { t } = useLanguage();
  const impact = t.impact;

  const data = impact.journey.map((entry, e) => ({
    title: entry.title,
    content: <ImpactEntryContent entry={entry as JourneyEntry} index={e} />,
  }));

  return (
    <Timeline
      title={impact.heading}
      description={impact.subheading}
      data={data}
      showProgressLine={showProgressLine}
    />
  );
}

// Bare stacked layout (no timeline rail / numbers / big titles): just the
// right-side content of each entry. Used on the /test page.
export function ImpactEntries() {
  const { t } = useLanguage();
  const impact = t.impact;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24">
      <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
        {impact.heading}
      </h2>
      <p className="max-w-sm text-sm opacity-70 md:text-base">
        {impact.subheading}
      </p>
      <div className="mt-16 space-y-24">
        {impact.journey.map((entry, e) => (
          <ImpactEntryContent
            key={entry.title}
            entry={entry as JourneyEntry}
            index={e}
          />
        ))}
      </div>
    </div>
  );
}
