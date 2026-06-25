import { ScrollVideo } from "@/components/ScrollVideo";
import { Outcome } from "@/components/Outcome";
import { ImpactTransition } from "@/components/ImpactTransition";
import { SectionSnap } from "@/components/SectionSnap";

export default function Test2Page() {
  return (
    <>
      <SectionSnap />
      <ScrollVideo src="/test2/scroll.mp4" reveal="mask" brandColor="theme" inset />
      <div className="snap-start">
        <Outcome />
      </div>
      <div className="snap-start">
        <ImpactTransition />
      </div>
    </>
  );
}
