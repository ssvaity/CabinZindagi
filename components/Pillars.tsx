"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import SpotlightCard from "@/components/SpotlightCard";
import { display } from "@/lib/fonts";

// Column spans give the grid its asymmetric rhythm (3 pillars).
const spans = ["md:col-span-2", "md:col-span-1", "md:col-span-3"];

export function Pillars() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-36 sm:py-44">
      {/* Animated, word-by-word heading */}
      <h2
        className={`${display.className} max-w-3xl text-center text-4xl font-bold tracking-tight sm:text-5xl`}
      >
        {t.home.pillarsHeading.split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1, ease: "easeInOut" }}
            className="mr-2 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className={`${display.className} mt-3 text-center opacity-70`}
      >
        {t.home.pillarsSub}
      </motion.p>

      {/* Spotlight cards — text only */}
      <div className="mt-12 grid w-full gap-6 md:grid-cols-3">
        {t.home.pillars.map((pillar, i) => (
          <SpotlightCard
            key={pillar.title}
            spotlightColor="rgba(254, 104, 15, 0.25)"
            className={`border border-black/5 bg-black/[0.02] p-7 dark:border-white/10 dark:bg-white/[0.03] ${spans[i]}`}
          >
            <h3
              className={`${display.className} text-2xl font-semibold tracking-tight`}
            >
              {pillar.title}
            </h3>
            <p
              className={`${display.className} mt-3 text-[15px] leading-relaxed opacity-75`}
            >
              {pillar.detail}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
