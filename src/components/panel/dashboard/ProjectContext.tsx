"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const phases = [
  { label: "Discovery",    done: true,  active: false },
  { label: "Design",       done: false, active: true  },
  { label: "Development",  done: false, active: false },
  { label: "Review",       done: false, active: false },
  { label: "Launch",       done: false, active: false },
];

const PROGRESS = 65;
const DEADLINE  = "28 kwi 2026";
const DAYS_LEFT = 14;

export default function ProjectContext() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="pt-6 border-t border-[#F0F0F0]"
    >
      {/* Phase timeline */}
      <div className="flex items-start mb-3">
        {phases.map((phase, i) => (
          <div key={phase.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              {/* Dot */}
              <div
                className={`w-[18px] h-[18px] rounded-full flex items-center justify-center ${
                  phase.done
                    ? "bg-[#111111]"
                    : phase.active
                    ? "bg-[#111111] ring-[3px] ring-[#111111]/10"
                    : "bg-white border border-[#DDDDDD]"
                }`}
              >
                {phase.done && (
                  <Check size={9} strokeWidth={3} color="white" />
                )}
              </div>
              {/* Label */}
              <span
                className={`font-sans text-[11px] whitespace-nowrap ${
                  phase.done || phase.active
                    ? "font-medium text-[#333333]"
                    : "text-[#AAAAAA]"
                }`}
              >
                {phase.label}
              </span>
            </div>

            {/* Connector */}
            {i < phases.length - 1 && (
              <div
                className={`h-px w-[52px] mx-1 mb-[14px] ${
                  phase.done ? "bg-[#111111]" : "bg-[#EBEBEB]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar + meta */}
      <div className="flex items-center gap-4 mt-1">
        <div className="flex-1 h-[2px] rounded-full bg-[#EBEBEB] overflow-hidden">
          <div
            className="h-full bg-[#111111] rounded-full transition-all duration-700"
            style={{ width: `${PROGRESS}%` }}
          />
        </div>
        <p className="font-sans text-[12px] text-[#888888] shrink-0">
          {PROGRESS}% · Deadline:{" "}
          <span className="font-semibold text-[#333333]">{DEADLINE}</span>
          <span className="text-[#999999]"> ({DAYS_LEFT} dni)</span>
        </p>
      </div>
    </motion.div>
  );
}
