"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { products } from "@/data/products";

const dormitoryImages = [
  { src: "/products/dormitory-night.png", span: "col-span-2 h-56", fit: "object-cover" },
  { src: "/products/dormitory.png", span: "h-40", fit: "object-cover" },
  { src: "/products/dormitory-building.png", span: "h-40", fit: "object-cover" },
  { src: "/products/dormitory-floorplan.png", span: "col-span-2 h-56", fit: "object-contain bg-white p-2" },
];

const ctaClass =
  "inline-block rounded-full bg-brand px-7 py-3 font-semibold text-[#1f2a33] shadow-lg shadow-brand/30 transition hover:bg-brand-light";

export function ServicesGrid() {
  const { t, locale } = useLanguage();
  const p = t.products;

  return (
    <>
      {/* Section 1 — Products (pricing-style cards) */}
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-32 sm:py-40">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{p.driversHeading}</h2>
          <p className="mt-3 opacity-70">{p.driversSub}</p>
        </div>

        <div className="grid w-full gap-6 lg:grid-cols-3 lg:items-start">
          {products.map((prod) => {
            const popular = prod.popular;
            return (
              <div
                key={prod.id}
                className={`relative flex flex-col rounded-3xl border p-8 transition ${
                  popular
                    ? "border-brand bg-brand/[0.05] shadow-xl lg:-mt-4 lg:pb-12"
                    : "border-black/10 bg-black/[0.02] hover:border-brand/40 dark:border-white/10 dark:bg-white/[0.03]"
                }`}
              >
                {popular && (
                  <span className="absolute right-6 top-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-[#1f2a33]">
                    {p.popular}
                  </span>
                )}

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandtext">
                  {prod.audience === "drivers" ? p.forDrivers : p.forCompanies}
                </p>
                <h3 className="mt-2 text-xl font-bold">{prod.name[locale]}</h3>
                <p className="mt-2 text-sm opacity-70">{prod.tagline[locale]}</p>

                <div className="mt-6">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {prod.price[locale]}
                  </span>
                  <span className="ml-2 text-sm opacity-60">
                    {prod.unit[locale]}
                  </span>
                </div>

                <Link
                  href="/contact"
                  className={`mt-6 rounded-lg px-6 py-3 text-center font-semibold transition ${
                    popular
                      ? "bg-brand text-[#1f2a33] hover:bg-brand-light"
                      : "border border-black/15 hover:border-brand dark:border-white/20"
                  }`}
                >
                  {p.buyLabel}
                </Link>

                <ul className="mt-8 space-y-3">
                  {prod.features[locale].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="material-symbols-outlined text-[18px] text-brand">
                        check_circle
                      </span>
                      <span className="opacity-80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2 — Driver Dormitory showcase */}
      <section className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-32 sm:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                {p.dormitoryHeading}
              </h2>
              <p className="mt-3 opacity-70">{p.dormitorySub}</p>
              <p className="mt-6 text-base leading-relaxed opacity-80">
                {p.dormitoryBody}
              </p>
              <ul className="mt-6 space-y-3">
                {p.dormitoryFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-1 text-accent">▹</span>
                    <span className="opacity-80">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`mt-8 ${ctaClass}`}>
                {p.cta}
              </Link>
            </div>

            {/* Image gallery */}
            <div className="grid grid-cols-2 gap-3">
              {dormitoryImages.map((img) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={img.src}
                  src={img.src}
                  alt={p.dormitoryHeading}
                  className={`w-full rounded-xl border border-black/5 dark:border-white/10 ${img.span} ${img.fit}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
