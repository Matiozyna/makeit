"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { useVisibility } from "@/hooks/useVisibility";

const defaultTargets = [
  "firm",
  "e-commerce",
  "twórców",
  "restauracji",
  "startupów",
];

interface RotatingSublineProps {
  prefix?: string;
  targets?: string[];
  suffix?: string;
}

export default function RotatingSubline({ prefix, targets: targetsProp, suffix }: RotatingSublineProps) {
  const targets = targetsProp?.length ? targetsProp : defaultTargets;
  const [index, setIndex] = useState(0);
  const { ref, isVisible } = useVisibility();

  useEffect(() => {
    if (!isVisible) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % targets.length);
    }, 3200);
    return () => clearInterval(id);
  }, [isVisible]);

  return (
    <LayoutGroup>
      <div ref={ref} className="font-sans text-[16px] md:text-[18px] text-[#666666] leading-relaxed flex flex-col items-center">
        
        {/* Top Line with dynamic pill and dot */}
        <motion.div layout className="flex flex-wrap items-center justify-center">
          <motion.span layout className="whitespace-pre">
            {prefix ?? "Zaufany partner designu i developmentu dla"}{" "}
          </motion.span>
          
          <motion.span 
            layout
            className="relative inline-flex items-center justify-center overflow-hidden bg-white border border-[#E5E5E5] shadow-[0_2px_8px_rgba(0,0,0,0.04)] h-[28px] md:h-[32px] mx-1"
            style={{ borderRadius: 9999 }}
          >
            {/* Invisible span controls the dynamic width of the pill fluidly */}
            <span className="invisible px-3 font-normal text-[14px] tracking-tight whitespace-nowrap">
              {targets[index]}
            </span>
            
            <AnimatePresence initial={false}>
              <motion.span
                layout
                key={index}
                initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -40, opacity: 0, filter: "blur(4px)" }}
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center px-3 font-normal text-[#111111] text-[14px] tracking-tight whitespace-nowrap"
              >
                {targets[index]}
              </motion.span>
            </AnimatePresence>
          </motion.span>

          <motion.span layout className="font-medium text-[#111111]">
            .
          </motion.span>
        </motion.div>

        {/* Bottom Line */}
        <motion.div layout className="mt-1 text-center">
          {suffix ?? "Przeprowadzamy marki od złożoności do prostoty."}
        </motion.div>

      </div>
    </LayoutGroup>
  );
}
