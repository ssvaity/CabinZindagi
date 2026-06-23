"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { products } from "@/data/products";

const productIcon: Record<string, string> = {
  "water-bottle": "water_drop",
  "care-kit": "backpack",
  dormitory: "night_shelter",
};

// Hero image per product.
const heroImage: Record<string, string> = {
  "water-bottle": "/products/water-bottle.png",
  "care-kit": "/products/travel-kit.png",
  dormitory: "/products/dormitory-building.png",
};

// Product shots on a light/studio background sit better "contained" on a panel;
// the dormitory photo fills its frame.
const heroContain: Record<string, boolean> = {
  "water-bottle": true,
  "care-kit": true,
};

// Long-form copy per product: overview, what's inside, and use cases by audience.
type ProductDetails = {
  description: string[];
  contents?: string[];
  useCases: { heading: string; points: string[] }[];
  closing?: string;
};

const productDetails: Record<string, ProductDetails> = {
  "water-bottle": {
    description: [
      "Every truck driver spends 10–14 hours on the road every single day. Access to clean, cold water isn't a luxury — it's basic safety and health.",
      "The bottle is durable enough for rough roads, easy to use inside the cabin, and reliable for the long haul.",
    ],
    useCases: [
      {
        heading: "For drivers",
        points: [
          "Keeps water cool for hours during hot-day driving",
          "Leak-proof and sturdy — built for bumpy highways and dusty dhabas",
          "Easy to grip, clean, and refill on the go",
        ],
      },
      {
        heading: "For logistics companies & fleet owners",
        points: [
          "A practical everyday welfare product your drivers will actually use",
          "Simple to distribute across your fleet, branches, or depots",
          "Option for bulk orders with branding (company logo on the bottle)",
          "Ideal for driver onboarding kits, safety programs, and annual gifting",
        ],
      },
      {
        heading: "For CSR & driver welfare programs",
        points: [
          "High-impact, low-complexity initiative focused on driver health and road safety",
          "Directly supports hydration, reduces fatigue, and encourages safer driving behaviour",
          "Works well alongside health camps, awareness drives, and rest-stop welfare programs",
          "Suitable for NGOs, foundations, and corporate CSR teams in trucking and logistics",
        ],
      },
    ],
    closing:
      "Planning a bulk order for your fleet or CSR program? Reach out with your quantity, locations, and timelines — we'll help you plan supply and distribution.",
  },
  "care-kit": {
    description: [
      "A truck driver's life is on the road — days away from home, long shifts, and limited access to basic personal care. The Driver Travel Kit is packed with daily hygiene essentials so your driver can feel fresh and confident on every trip.",
    ],
    contents: [
      "1 × Dental kit (toothbrush + toothpaste)",
      "1 × Shaving kit (razor + cream)",
      "1 × Comb",
      "1 × Hair oil",
      "2 × Bath soap bars",
    ],
    useCases: [
      {
        heading: "For drivers",
        points: [
          "All essential personal-care items in one compact, easy-to-carry pack",
          "Helps maintain daily hygiene even during multi-day trips and night halts",
          "Lightweight and fits easily in the cabin or a small bag",
        ],
      },
      {
        heading: "For logistics companies & fleet owners",
        points: [
          "A practical and thoughtful welfare kit to distribute to your drivers",
          "Great for driver onboarding, safety programs, or festive gifting",
          "Available in bulk — easy to plan and distribute across your fleet",
          "Option to customise with your company branding",
        ],
      },
      {
        heading: "For CSR & driver welfare programs",
        points: [
          "A simple, high-impact initiative that directly improves driver wellbeing",
          "Ideal for NGOs, foundations, and corporate CSR teams in the logistics sector",
          "Easy to procure, pack, and distribute at scale across regions",
        ],
      },
    ],
    closing:
      "Looking to order in bulk for your fleet or CSR initiative? Share your requirement and we'll help you plan and deliver.",
  },
};

export function ProductDetail({ id }: { id: string }) {
  const { t, locale } = useLanguage();
  const p = t.products;
  const prod = products.find((x) => x.id === id);

  if (!prod) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link href="/products" className="mt-6 font-semibold text-brandtext hover:opacity-80">
          ← Back to products
        </Link>
      </section>
    );
  }

  const isDrivers = prod.audience === "drivers";
  const accentText = isDrivers ? "text-brand" : "text-accent";
  const isDormitory = prod.id === "dormitory";
  const details = productDetails[prod.id];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-sm font-semibold opacity-70 transition hover:opacity-100"
      >
        <span aria-hidden>←</span> {p.driversHeading}
      </Link>

      {/* Hero */}
      <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isDrivers ? "bg-brand/10 text-brandtext" : "bg-accent/10 text-accent"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {isDrivers ? "local_shipping" : "apartment"}
            </span>
            {isDrivers ? p.forDrivers : p.forCompanies}
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            {prod.name[locale]}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed opacity-75">
            {prod.tagline[locale]}
          </p>

          <div className="mt-6">
            <span className="text-4xl font-extrabold tracking-tight">
              {prod.price[locale]}
            </span>
            <span className="ml-2 text-sm opacity-60">{prod.unit[locale]}</span>
          </div>

          <ul className="mt-8 space-y-3">
            {prod.features[locale].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <span className={`material-symbols-outlined text-[18px] ${accentText}`}>
                  check_circle
                </span>
                <span className="opacity-85">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 font-semibold text-[#1f2a33] shadow-lg shadow-brand/30 transition hover:bg-brand-light"
            >
              {p.buyLabel} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Visual — photo if we have one, otherwise an icon panel.
            Product shots sit on the left; the dormitory photo stays on the right. */}
        <div className={heroContain[prod.id] ? "lg:order-first" : ""}>
          {heroImage[prod.id] ? (
            heroContain[prod.id] ? (
              <div className="flex aspect-square items-center justify-center rounded-3xl border border-black/5 bg-white p-8 dark:border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImage[prod.id]}
                  alt={prod.name[locale]}
                  className="max-h-full w-auto object-contain"
                />
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={heroImage[prod.id]}
                alt={prod.name[locale]}
                className="w-full rounded-3xl border border-black/5 object-cover dark:border-white/10"
              />
            )
          ) : (
            <div
              className={`flex aspect-square items-center justify-center rounded-3xl border ${
                isDrivers
                  ? "border-brand/20 bg-brand/[0.06]"
                  : "border-accent/20 bg-accent/[0.06]"
              }`}
            >
              <span className={`material-symbols-outlined text-[120px] ${accentText}`}>
                {productIcon[prod.id] ?? "inventory_2"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Overview, what's inside, and use cases (bottle & travel kit).
          Both columns are equal-height cards so they end on the same level. */}
      {details && (
        <div className="mt-20 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left: overview + contents (closing pinned to the bottom) */}
          <div className="flex flex-col rounded-2xl border border-black/10 p-7 dark:border-white/15">
            {details.description.map((para) => (
              <p
                key={para.slice(0, 24)}
                className="mb-4 text-base leading-relaxed opacity-80"
              >
                {para}
              </p>
            ))}

            {details.contents && (
              <div className="mt-4">
                <h3 className="text-lg font-bold tracking-tight">
                  What&rsquo;s inside the {prod.name[locale]}
                </h3>
                <ul className="mt-4 space-y-2">
                  {details.contents.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-sm">
                      <span className={`material-symbols-outlined text-[18px] ${accentText}`}>
                        check_circle
                      </span>
                      <span className="opacity-85">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Driver-facing use case lives on the left to balance the columns */}
            {details.useCases[0] && (
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-brandtext">
                  {details.useCases[0].heading}
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {details.useCases[0].points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-2 text-sm leading-relaxed opacity-80"
                    >
                      <span className="text-brandtext">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details.closing && (
              <p className="mt-auto pt-8 text-sm leading-relaxed opacity-70">
                {details.closing}
              </p>
            )}
          </div>

          {/* Right: use cases for companies & CSR */}
          <div className="flex flex-col rounded-2xl border border-black/10 p-7 dark:border-white/15">
            <h3 className="text-lg font-bold tracking-tight">Use cases</h3>
            <div className="mt-5 space-y-6">
              {details.useCases.slice(1).map((group) => (
                <div key={group.heading}>
                  <h4 className="text-sm font-semibold text-brandtext">
                    {group.heading}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {group.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-2 text-sm leading-relaxed opacity-80"
                      >
                        <span className="text-brandtext">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dormitory — reuse the spec table, manufacturing cards, and photos */}
      {isDormitory && (
        <div className="mt-24 space-y-24">
          {/* Body */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {p.dormitoryHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed opacity-80">
              {p.dormitoryBody}
            </p>
          </div>

          {/* Spec table */}
          <div>
            <h3 className="text-center text-2xl font-bold text-brandtext sm:text-3xl">
              {p.offerHeading}
            </h3>
            <div className="mt-10 overflow-x-auto">
              <div className="min-w-[560px]">
                <div className="grid grid-cols-4 gap-6 pb-3">
                  {p.tableHeaders.map((h, i) => (
                    <div
                      key={h}
                      className={`text-lg font-bold text-brandtext sm:text-xl ${
                        i > 0
                          ? "border-l border-dashed border-black/25 pl-6 dark:border-white/25"
                          : ""
                      }`}
                    >
                      {h}
                    </div>
                  ))}
                </div>
                {p.tableRows.map((row, ri) => (
                  <div
                    key={ri}
                    className="grid grid-cols-4 gap-6 border-t border-black/5 py-5 text-base font-semibold dark:border-white/10"
                  >
                    {row.map((cell, ci) => (
                      <div
                        key={ci}
                        className={
                          ci > 0
                            ? "border-l border-dashed border-black/15 pl-6 dark:border-white/15"
                            : "font-bold"
                        }
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Manufacturing & deployment cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {p.offerCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-black/10 p-7 dark:border-white/15"
              >
                <h4 className="text-xl font-bold text-brandtext">{card.title}</h4>
                <p className="mt-3 text-sm leading-relaxed opacity-80">
                  {card.body}
                </p>
                <ul className="mt-4 space-y-2">
                  {card.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm opacity-80">
                      <span className="text-brandtext">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* A closer look — captioned exterior + interior, with section text */}
          <div>
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                A closer look
              </h3>
              <p className="mt-3 text-base leading-relaxed opacity-80">
                From the yard to the bunk — how a deployed Cabin Zindagi
                dormitory actually looks and lives on site.
              </p>
            </div>

            {/* Exterior */}
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-brandtext">
              On site
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 sm:gap-6">
              {[
                { src: "/products/dormitory.png", cap: "Stacked 20ft module" },
                { src: "/products/dormitory-night.png", cap: "Lit sleeping bays after dark" },
              ].map((img) => (
                <figure key={img.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.cap}
                    className="h-60 w-full rounded-xl border border-black/5 object-cover dark:border-white/10"
                  />
                  <figcaption className="mt-3 text-center text-sm opacity-60">
                    {img.cap}
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Interior & layout */}
            <p className="mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-brandtext">
              Interior &amp; layout
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-3 sm:gap-6">
              {[
                { src: "/products/dormitory-beds.png", cap: p.bedsCaption, fit: "object-cover" },
                { src: "/products/dormitory-showers.png", cap: p.showerCaption, fit: "object-cover" },
                { src: "/products/dormitory-floorplan.png", cap: p.layoutCaption, fit: "bg-white object-contain p-3" },
              ].map((img) => (
                <figure key={img.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.cap}
                    className={`h-56 w-full rounded-xl border border-black/5 dark:border-white/10 ${img.fit}`}
                  />
                  <figcaption className="mt-3 text-center text-sm opacity-60">
                    {img.cap}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
