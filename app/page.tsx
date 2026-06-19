import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { QuoteSection } from "@/components/QuoteSection";
import { Outcome } from "@/components/Outcome";

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <QuoteSection />
      <Outcome />
    </>
  );
}
