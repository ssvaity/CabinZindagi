import { ScrollVideo } from "@/components/ScrollVideo";
import { Outcome } from "@/components/Outcome";
import { ImpactTransition } from "@/components/ImpactTransition";
import { SectionSnap } from "@/components/SectionSnap";

export default function TestPage() {
  return (
    <>
      <SectionSnap />
      <ScrollVideo brandColor="theme" inset reveal="fadeup" />
      <div className="snap-start">
        <Outcome />
      </div>
      <div className="snap-start">
        <ImpactTransition />
      </div>
    </>
  );
}
