"use client";

import { useEffect } from "react";

/**
 * Enables vertical scroll-snapping on the root scroller for the current page only
 * (cleaned up on navigate away). "mandatory" forces the scroll to land on a beat
 * where the text is fully shown, instead of resting mid-transition. Snap targets
 * are the elements marked with `snap-start`.
 */
export function SectionSnap() {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollSnapType;
    el.style.scrollSnapType = "y mandatory";
    return () => {
      el.style.scrollSnapType = prev;
    };
  }, []);
  return null;
}
