"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Dzien dobry, Mateusz";
  if (hour < 18) return "Hej, Mateusz";
  return "Dobry wieczor, Mateusz";
}

function getSub(): string {
  return "Masz 2 rzeczy wymagajace Twojej uwagi.";
}

export default function HeroGreeting() {
  return (
    <div className="flex items-center justify-between py-1 mb-4">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[26px] font-bold tracking-[-0.04em] text-[#111111]"
        >
          {getGreeting()} <span>👋</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[14px] text-[#888888] mt-1"
        >
          {getSub()}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <Link
          href="/panel/design-review"
          className="inline-flex items-center gap-2 font-sans text-[13px] font-medium text-[#111111] bg-white border border-[#E5E5E5] px-4 py-2 rounded-lg hover:border-[#CCCCCC] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-150"
        >
          Design Review
          <ArrowRight size={13} strokeWidth={2} />
        </Link>
      </motion.div>
    </div>
  );
}
