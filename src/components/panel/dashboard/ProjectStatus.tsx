"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Compass, Pencil, Code2, Eye, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";

const steps = [
  { label: "Discovery", icon: Compass, done: true },
  { label: "Design", icon: Pencil, active: true },
  { label: "Development", icon: Code2 },
  { label: "Review", icon: Eye },
  { label: "Launch", icon: Rocket },
];

const PROGRESS = 65;

function AnimatedBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-[3px] w-full rounded-full bg-[#F0F0F0] overflow-hidden">
      <motion.div
        className="h-full bg-[#111111] rounded-full"
        initial={{ width: "0%" }}
        animate={inView ? { width: `${PROGRESS}%` } : { width: "0%" }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function CountUp({ end }: { end: number }) {
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

  return <span ref={ref}>{Math.round(val)}</span>;
}

export default function ProjectStatus() {
  return (
    <div className="rounded-xl border border-[#EBEBEB] bg-white p-6 h-full shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA] mb-1">
            Status projektu
          </p>
          <h2 className="font-sans text-[16px] font-semibold text-[#111111]">
            Strona Kuchciak Budownictwo
          </h2>
        </div>
        <span className="font-sans text-[11px] font-medium text-[#666666] bg-[#F5F5F5] px-2.5 py-1 rounded-md">
          Faza 2 z 5
        </span>
      </div>

      {/* Stepper */}
      <div className="flex items-start mb-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = step.active;
          const isDone = step.done;
          return (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                {isDone ? (
                  <div className="w-7 h-7 rounded-full bg-[#111111] flex items-center justify-center">
                    <Check size={13} strokeWidth={2.5} color="#fff" />
                  </div>
                ) : isActive ? (
                  <div className="w-7 h-7 rounded-full bg-[#111111] ring-[3px] ring-[#111111]/10 flex items-center justify-center">
                    <Icon size={12} strokeWidth={2} color="#fff" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center">
                    <Icon size={12} strokeWidth={1.5} color="#CCCCCC" />
                  </div>
                )}
                <span
                  className={`font-sans text-[11px] whitespace-nowrap ${
                    isDone || isActive
                      ? "font-medium text-[#333333]"
                      : "text-[#C8C8C8]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 mb-5 ${
                    isDone ? "bg-[#111111]" : "bg-[#EBEBEB]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress hero stat */}
      <div className="border-t border-[#F5F5F5] pt-5">
        <div className="flex items-end justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[52px] font-bold tracking-[-0.05em] text-[#111111] leading-none">
              <CountUp end={PROGRESS} />%
            </span>
            <span className="font-sans text-[13px] text-[#AAAAAA] mb-1">ukończone</span>
          </div>
          <div className="text-right">
            <p className="font-sans text-[11px] text-[#AAAAAA]">Deadline</p>
            <p className="font-sans text-[14px] font-semibold text-[#111111]">28 kwi 2026</p>
          </div>
        </div>
        <AnimatedBar />
      </div>
    </div>
  );
}
