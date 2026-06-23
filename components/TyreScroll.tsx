"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import { ImpactEntryContent } from "./ImpactContent";
import { ImpactCTA } from "./ImpactCTA";

// three.js touches the DOM/WebGL, so load the canvas client-side only.
const TyreCanvas = dynamic(() => import("./TyreCanvas"), { ssr: false });

type JourneyEntry = {
  title: string;
  variant: string;
  intro: string;
  cards: { title: string; text: string }[];
};

// Opening block ("Why this matters") shown while the wheel is parked far left.
const INVISIBLE_CRISIS = {
  eyebrow: "Why this matters",
  heading: "The Invisible Crisis on India's Highways",
  intro:
    "India's ₹14 lakh crore logistics industry runs on the backs of truck drivers. Yet they remain one of the country's most neglected workforces — no healthcare, no rest infrastructure, no voice. When drivers break down, supply chains break down.",
  cards: [
    {
      title: "Police Harassment",
      text: "Routine extortion and harassment on highways. Drivers lose earnings and dignity every single trip.",
    },
    {
      title: "Zero Health Coverage",
      text: "No insurance, no access to healthcare. A single accident can destroy an entire family financially.",
    },
    {
      title: "No Safe Rest Stops",
      text: "Drivers park wherever they can — unsafe, unhygienic, undignified. Fatigue is a leading cause of highway deaths.",
    },
    {
      title: "Family Separation",
      text: "8 to 10 months away from home annually. Mental health, marriages, and children's upbringing — all suffer silently.",
    },
  ],
};

// The wheel finishes rolling at this scroll fraction; afterwards it stays parked
// at the right edge and the CTA fades in as the final frame.
const WHEEL_END = 0.85;

// Extra cards added (test page only) so "The Outcome" fills its wider panel.
const OUTCOME_EXTRA = [
  { title: "Stronger retention", text: "Drivers treated with dignity stay in the job longer" },
  { title: "Policy momentum", text: "Welfare standards moving into boardrooms and policy" },
];

// One-off aside shown to the LEFT of the wheel during the "Our Work" stage —
// framed around how what we build helps the driver, not what we sell.
const PRODUCTS_ASIDE = {
  eyebrow: "What it means for drivers",
  title: "Rest that restores",
  intro: "What we build gives drivers back what the road takes away — sleep, hygiene and a moment to recover.",
  cards: [
    { title: "A real night's sleep", text: "A clean bed and a quiet bay instead of a cramped cabin, so drivers start the next leg fresh." },
    { title: "Dignity and hygiene", text: "Showers and toilets let drivers wash up and feel human again before they roll out." },
    { title: "Healthier on the road", text: "Clean water and travel kits cut fatigue and keep drivers well across long hauls." },
  ],
};
// Matches the "Our Work" slice window so the aside appears only there.
const PRODUCTS_RANGE: [number, number, number, number] = [0.33, 0.36, 0.45, 0.5];

// One scroll slice [fadeInStart, fullStart, fullEnd, fadeOutEnd] + the side the
// card sits on + panel width. Cards sit opposite the wheel (rolls left -> right).
const slices: {
  side: "left" | "right";
  range: [number, number, number, number];
  maxW: string;
}[] = [
  { side: "right", range: [0.13, 0.16, 0.26, 0.31], maxW: "max-w-lg" },
  { side: "right", range: [0.33, 0.36, 0.45, 0.5], maxW: "max-w-md" },
  { side: "left", range: [0.52, 0.55, 0.63, 0.68], maxW: "max-w-2xl" },
  { side: "left", range: [0.7, 0.73, 0.8, 0.84], maxW: "max-w-3xl" },
];

function Stage({
  entry,
  index,
  side,
  range,
  maxW,
  scrollYProgress,
}: {
  entry: JourneyEntry;
  index: number;
  side: "left" | "right";
  range: [number, number, number, number];
  maxW: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [a, b, c, d] = range;
  const opacity = useTransform(scrollYProgress, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [a, b], [40, 0]);

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 z-10 flex w-[90%] ${maxW} items-center ${
        side === "left" ? "left-4 sm:left-12" : "right-4 sm:right-12"
      }`}
    >
      <motion.div style={{ opacity, y }} className="w-full">
        <div className="rounded-2xl border border-black/10 bg-[var(--background)]/70 p-8 shadow-xl backdrop-blur-md dark:border-white/15">
          <ImpactEntryContent entry={entry} index={index} />
        </div>
      </motion.div>
    </div>
  );
}

function TyreScrollDesktop() {
  const { t } = useLanguage();
  const impact = t.impact;
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [ctaActive, setCtaActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Wheel completes its roll by WHEEL_END, then holds at the right edge.
  const wheelProgress = useTransform(scrollYProgress, [0, WHEEL_END], [0, 1]);
  useMotionValueEvent(wheelProgress, "change", (v) => {
    progress.current = v;
  });

  // Opening block is full at the very start, then fades as the first entry rolls in.
  const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.12], [1, 1, 0]);
  // Products/dorm aside fades in/out with the "Our Work" stage.
  const productsOpacity = useTransform(scrollYProgress, PRODUCTS_RANGE, [0, 1, 1, 0]);
  const productsY = useTransform(scrollYProgress, [PRODUCTS_RANGE[0], PRODUCTS_RANGE[1]], [40, 0]);
  // Heading fades out as the CTA takes over.
  const headingOpacity = useTransform(scrollYProgress, [0.8, 0.87], [1, 0]);
  // CTA fades in for the final frame.
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.93], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const on = v > 0.87;
    setCtaActive((prev) => (prev === on ? prev : on));
  });

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Persistent heading (fades out before the CTA) */}
        <motion.div
          style={{ opacity: headingOpacity }}
          className="pointer-events-none absolute inset-x-0 top-0 z-20 px-4 pt-24 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            {impact.heading}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm opacity-60">
            {impact.subheading}
          </p>
        </motion.div>

        {/* Opening block — fills the centre/right while the wheel is far left */}
        <div className="pointer-events-none absolute inset-y-0 left-4 right-4 z-10 flex items-center sm:left-[28%] sm:right-12">
          <motion.div style={{ opacity: introOpacity }} className="w-full">
            <div className="rounded-2xl border border-black/10 bg-[var(--background)]/70 p-8 shadow-xl backdrop-blur-md dark:border-white/15">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandtext">
                {INVISIBLE_CRISIS.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {INVISIBLE_CRISIS.heading}
              </h2>
              <p className="mt-4 text-sm leading-relaxed opacity-80">
                {INVISIBLE_CRISIS.intro}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {INVISIBLE_CRISIS.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-black/5 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <h4 className="text-base font-semibold text-brandtext">
                      {card.title}
                    </h4>
                    <p className="mt-1 text-sm opacity-70">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* One Impact entry per scroll slice, fading in/out opposite the wheel */}
        {impact.journey.map((entry, i) => {
          const e = entry as JourneyEntry;
          // "The Outcome" gets a couple of extra cards to fill its wider panel.
          const filled =
            e.variant === "dark"
              ? { ...e, cards: [...e.cards, ...OUTCOME_EXTRA] }
              : e;
          return (
            <Stage
              key={e.title}
              entry={filled}
              index={i}
              side={slices[i]?.side ?? (i % 2 === 0 ? "right" : "left")}
              range={slices[i]?.range ?? [0, 0.05, 0.75, 0.8]}
              maxW={slices[i]?.maxW ?? "max-w-lg"}
              scrollYProgress={scrollYProgress}
            />
          );
        })}

        {/* One-off products/dorm aside, left of the wheel during "Our Work" */}
        <div className="pointer-events-none absolute inset-y-0 left-4 z-10 flex w-[90%] max-w-sm items-center sm:left-12">
          <motion.div style={{ opacity: productsOpacity, y: productsY }} className="w-full">
            <div className="rounded-2xl border border-black/10 bg-[var(--background)]/70 p-7 shadow-xl backdrop-blur-md dark:border-white/15">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandtext">
                {PRODUCTS_ASIDE.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight">
                {PRODUCTS_ASIDE.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                {PRODUCTS_ASIDE.intro}
              </p>
              <div className="mt-5 space-y-3">
                {PRODUCTS_ASIDE.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <h4 className="text-sm font-semibold text-brandtext">
                      {card.title}
                    </h4>
                    <p className="mt-1 text-xs leading-snug opacity-70">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final frame: CTA fades in behind the parked wheel */}
        <motion.div
          style={{ opacity: ctaOpacity }}
          className={`absolute inset-0 z-20 ${
            ctaActive ? "" : "pointer-events-none"
          }`}
        >
          <ImpactCTA compact />
        </motion.div>

        {/* Wheel sits on top (decorative) so it stays visible at the right edge */}
        <div className="pointer-events-none absolute inset-0 z-30">
          <TyreCanvas progress={progress} />
        </div>
      </div>
    </section>
  );
}

// Simple card used in the mobile stacked layout.
function MiniCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.03]">
      <h4 className="text-sm font-semibold text-brandtext">{title}</h4>
      <p className="mt-1 text-sm leading-snug opacity-70">{text}</p>
    </div>
  );
}

// Mobile / narrow screens: no 3D wheel or pinned scroll — just the content,
// stacked and fully scrollable, with the CTA as a normal section.
function TyreScrollMobile() {
  const { t } = useLanguage();
  const impact = t.impact;

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-28">
        <h1 className="text-3xl font-bold tracking-tight">{impact.heading}</h1>
        <p className="mt-3 text-sm opacity-60">{impact.subheading}</p>

        {/* Why this matters */}
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandtext">
            {INVISIBLE_CRISIS.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            {INVISIBLE_CRISIS.heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed opacity-80">
            {INVISIBLE_CRISIS.intro}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {INVISIBLE_CRISIS.cards.map((card) => (
              <MiniCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </div>

        {/* Impact journey */}
        <div className="mt-14 space-y-14">
          {impact.journey.map((entry, i) => {
            const e = entry as JourneyEntry;
            const filled =
              e.variant === "dark"
                ? { ...e, cards: [...e.cards, ...OUTCOME_EXTRA] }
                : e;
            return <ImpactEntryContent key={e.title} entry={filled} index={i} />;
          })}
        </div>

        {/* Rest infrastructure aside */}
        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandtext">
            {PRODUCTS_ASIDE.eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-tight">
            {PRODUCTS_ASIDE.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed opacity-80">
            {PRODUCTS_ASIDE.intro}
          </p>
          <div className="mt-5 space-y-3">
            {PRODUCTS_ASIDE.cards.map((card) => (
              <MiniCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </div>
      </div>

      <ImpactCTA />
    </>
  );
}

export function TyreScroll() {
  // Default to the mobile layout for SSR; switch to the 3D pinned experience
  // only on wide screens (where the wheel won't block the content).
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop ? <TyreScrollDesktop /> : <TyreScrollMobile />;
}
