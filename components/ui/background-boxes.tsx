"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only render on devices with hover capabilities (pointer: fine) and tablet/desktop width
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const minWidth = window.matchMedia("(min-width: 768px)");
    
    const check = () => {
      setShouldRender(finePointer.matches && minWidth.matches);
    };

    check();
    finePointer.addEventListener("change", check);
    minWidth.addEventListener("change", check);

    return () => {
      finePointer.removeEventListener("change", check);
      minWidth.removeEventListener("change", check);
    };
  }, []);

  if (!shouldRender) return null;

  // Optimized grid size to cover the scaled/skewed viewport area without inflating DOM footprint
  const rows = new Array(80).fill(1);
  const cols = new Array(60).fill(1);
  let colors = [
    "#FE680F", // brand orange
    "#FE8A1C", // amber
    "#2D8D46", // shield green
    "#3FB860", // light green
    "#FBBF24", // warm yellow
    "#FE680F",
    "#FE8A1C",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="relative h-8 w-16 border-l border-slate-300 dark:border-slate-700"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="relative h-8 w-16 border-t border-r border-slate-300 dark:border-slate-700"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-300 dark:text-slate-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
