"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SpotlightStep {
  selector: string;
  title: string;
  description: string;
  position: "right" | "bottom" | "left";
}

const steps: SpotlightStep[] = [
  {
    selector: "[data-tour='hero']",
    title: "Twój przegląd na start",
    description: "Tu zawsze widzisz co jest najważniejsze — status projektu, aktualizacje i co czeka na Twoją uwagę.",
    position: "bottom",
  },
  {
    selector: "[data-tour='actions']",
    title: "Rzeczy wymagające akcji",
    description: "Jeśli coś czeka na Twoją decyzję — znajdziesz to tutaj. Jeden klik i gotowe.",
    position: "left",
  },
  {
    selector: "[data-tour='sidebar']",
    title: "Wszystko pod ręką",
    description: "Pliki, wiadomości, raporty — wszystko w jednym miejscu. Żadnych maili.",
    position: "right",
  },
];

interface SpotlightTourProps {
  onComplete: () => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function SpotlightTour({ onComplete }: SpotlightTourProps) {
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);

  const updateRect = useCallback(() => {
    const el = document.querySelector(steps[step].selector);
    if (el) {
      const r = el.getBoundingClientRect();
      setTargetRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
  }, [step]);

  useEffect(() => {
    // Small delay to let layout settle
    const timeout = setTimeout(updateRect, 100);
    window.addEventListener("resize", updateRect);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateRect);
    };
  }, [updateRect]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const current = steps[step];
  const pad = 8;

  // Tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) return { opacity: 0 };
    const { top, left, width, height } = targetRect;
    switch (current.position) {
      case "bottom":
        return { top: top + height + pad + 12, left: left + width / 2, transform: "translateX(-50%)" };
      case "right":
        return { top: top + height / 2, left: left + width + pad + 12, transform: "translateY(-50%)" };
      case "left":
        return { top: top + height / 2, left: left - pad - 12, transform: "translate(-100%, -50%)" };
      default:
        return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100]"
    >
      {/* Dark overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && (
              <motion.rect
                initial={{ opacity: 0 }}
                animate={{
                  x: targetRect.left - pad,
                  y: targetRect.top - pad,
                  width: targetRect.width + pad * 2,
                  height: targetRect.height + pad * 2,
                  opacity: 1,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                rx={16}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.55)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Highlight ring */}
      {targetRect && (
        <motion.div
          animate={{
            top: targetRect.top - pad,
            left: targetRect.left - pad,
            width: targetRect.width + pad * 2,
            height: targetRect.height + pad * 2,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute rounded-[16px] ring-2 ring-[#4EA8FF] ring-offset-2 ring-offset-transparent pointer-events-none"
          style={{ boxShadow: "0 0 0 4px rgba(78,168,255,0.15), 0 0 40px rgba(78,168,255,0.1)" }}
        />
      )}

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-10"
          style={getTooltipStyle()}
        >
          <div className="w-[300px] rounded-[20px] bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_24px_rgba(78,168,255,0.08)] p-6">
            {/* Step indicator */}
            <div className="flex items-center gap-1.5 mb-3">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === step
                      ? "w-5 bg-gradient-to-r from-[#4EA8FF] to-[#6B4EFF]"
                      : i < step
                      ? "w-1.5 bg-[#4EA8FF]"
                      : "w-1.5 bg-[#E5E7EB]"
                  }`}
                />
              ))}
            </div>

            <h3 className="font-display text-[16px] font-bold tracking-[-0.03em] text-[#111111] mb-1.5">
              {current.title}
            </h3>
            <p className="font-sans text-[13px] text-[#6B7280] leading-relaxed mb-5">
              {current.description}
            </p>

            <button
              onClick={handleNext}
              className="group inline-flex items-center gap-2 bg-[#111111] hover:bg-[#000000] text-white font-sans text-[13px] font-medium px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {step < steps.length - 1 ? "Dalej" : "Rozumiem"}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
