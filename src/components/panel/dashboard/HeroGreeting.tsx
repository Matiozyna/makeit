"use client";

import { motion } from "framer-motion";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5)  return "Dobranoc, Mateusz";
  if (hour < 12) return "Dzień dobry, Mateusz";
  if (hour < 18) return "Cześć, Mateusz";
  return "Dobry wieczór, Mateusz";
}

interface HeroGreetingProps {
  actionCount: number;
}

export default function HeroGreeting({ actionCount }: HeroGreetingProps) {
  const statusLine =
    actionCount === 0 ? (
      <span>Nic nie czeka — wszystko gra.</span>
    ) : actionCount === 1 ? (
      <>
        Czeka na Ciebie{" "}
        <span className="font-semibold text-[#111111]">1 rzecz</span>.
      </>
    ) : (
      <>
        Czekają na Ciebie{" "}
        <span className="font-semibold text-[#111111]">{actionCount} rzeczy</span>.
      </>
    );

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[36px] font-bold tracking-[-0.04em] text-[#111111] leading-tight"
      >
        {getGreeting()}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans text-[16px] text-[#666666] mt-1.5"
      >
        {statusLine}
      </motion.p>
    </div>
  );
}
