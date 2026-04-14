"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Compass, Pencil, Code2, Eye, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";

const steps = [
  { label: "Discovery", icon: Compass, done: true },
  { label: "Design", icon: Pencil, active: true },
  { label: "Development", icon: Code2, done: false },
  { label: "Review", icon: Eye, done: false },
  { label: "Launch", icon: Rocket, done: false },
];

const PROGRESS = 65;

function AnimatedBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-1 w-full rounded-full bg-[#EBEBEB] overflow-hidden">
      <motion.div
        className="h-full bg-[#111111] rounded-full"
        initial={{ width: "0%" }}
        animate={inView ? { width: `${PROGRESS}%` } : { width: "0%" }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;
    const t = setTimeout(() => {
      const s = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - s) / 1000, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(e * end);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 200);
    return () => clearTimeout(t);
  }, [inView, end]);

  return <span ref={ref}>{Math.round(val)}{suffix}</span>;
}

export default function ProjectStatus() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA] mb-0.5">
            Status projektu
          </p>
          <h2 className="font-display text-[18px] font-bold tracking-[-0.03em] text-[#111111]">
            Strona Kuchciak Budownictwo
          </h2>
        </div>
        <span className="font-sans text-[11px] font-medium text-[#666666] bg-[#F4F4F4] px-2.5 py-1 rounded-md border border-[#E5E5E5]">
          Faza 2 z 5
        </span>
      </div>

      {/* Stepper */}
      <div className="flex items-start">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                {step.done ? (
                  <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center">
                    <Check size={14} strokeWidth={2.5} color="#ffffff" />
                  </div>
                ) : step.active ? (
                  <div className="w-8 h-8 rounded-full bg-[#111111] ring-4 ring-[#111111]/10 flex items-center justify-center">
                    <Icon size={13} strokeWidth={2} color="#ffffff" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#F4F4F4] border border-[#E5E5E5] flex items-center justify-center">
                    <Icon size={13} strokeWidth={1.5} color="#CCCCCC" />
                  </div>
                )}
                <span className={`font-sans text-[11px] font-medium whitespace-nowrap ${
                  step.done || step.active ? "text-[#333333]" : "text-[#CCCCCC]"
                }`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2.5 mb-5 ${
                  step.done ? "bg-[#111111]" : "bg-[#E5E5E5]"
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="mt-4 pt-4 border-t border-[#F0F0F0]">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-[26px] font-bold tracking-[-0.04em] text-[#111111] leading-none">
              <CountUp end={PROGRESS} suffix="%" />
            </span>
            <span className="font-sans text-[12px] text-[#AAAAAA]">ukonczone</span>
          </div>
          <span className="font-sans text-[12px] text-[#AAAAAA]">
            Deadline: <span className="font-medium text-[#444444]">28 kwi 2026</span>
          </span>
        </div>
        <AnimatedBar />
      </div>
    </div>
  );
}
