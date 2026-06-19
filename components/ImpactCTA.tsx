"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

const AMOUNTS = [100, 250, 500, 1000];

export function ImpactCTA() {
  const { t } = useLanguage();
  const c = t.impact.cta;
  const s = t.impact.support;

  const [amount, setAmount] = useState<number>(250);
  const [custom, setCustom] = useState<string>("");

  const value = custom ? Number(custom) || 0 : amount;
  const formatted = value ? value.toLocaleString("en-IN") : "0";

  const amountBtn = (active: boolean) =>
    `rounded-lg border px-3 py-3 text-sm font-semibold transition ${
      active
        ? "border-brand bg-brand/15 text-white"
        : "border-white/15 text-white/80 hover:border-white/30"
    }`;

  return (
    <section className="flex min-h-screen items-center bg-[#0b0b12] py-32 text-white sm:py-48">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* CTA — headline + actions + testimonial */}
        <div className="grid gap-12 border-y border-dashed border-white/15 py-14 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2 lg:border-r lg:border-dashed lg:border-white/15 lg:pr-12">
            <h2 className="text-3xl font-medium leading-tight text-neutral-300 sm:text-4xl md:text-5xl">
              {c.headLead}{" "}
              <span className="font-bold text-white">{c.headStrong}</span>
            </h2>
            <p className="mt-6 text-2xl leading-snug text-neutral-300 sm:text-3xl">
              {c.subLead} <span className="text-brand">{c.subWord1}</span>{" "}
              {c.subMid} <span className="text-accent">{c.subWord2}</span>{" "}
              {c.subTail}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-[#1f2a33] transition hover:bg-brand-light"
              >
                {c.primary} <span aria-hidden>→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                {c.secondary}
                <span className="material-symbols-outlined text-[18px]">
                  chat_bubble
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:pl-2">
            <p className="text-lg leading-relaxed text-white/80">{c.quote}</p>
            <p className="mt-6 font-bold">{c.author}</p>
            <p className="text-sm text-white/50">{c.role}</p>
          </div>
        </div>

        {/* Contribution module */}
        <div className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:mt-28 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">{s.heading}</h3>
              <p className="mt-3 text-white/70">{s.sub}</p>
              <p className="mt-6 text-xs text-white/40">{s.note}</p>
            </div>

            <div>
              {/* Amounts */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setAmount(a);
                      setCustom("");
                    }}
                    className={amountBtn(!custom && amount === a)}
                  >
                    ₹{a.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <input
                type="number"
                min={1}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder={s.customPlaceholder}
                className="mt-3 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-brand"
              />

              <Link
                href="/contact"
                className="mt-4 block rounded-lg bg-brand px-6 py-3 text-center font-semibold text-[#1f2a33] transition hover:bg-brand-light"
              >
                {s.button} ₹{formatted}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
