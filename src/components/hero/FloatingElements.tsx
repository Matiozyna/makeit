"use client";

import { motion } from "framer-motion";

const floatProps = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: [0, -8, 0] as number[] },
  viewport: { once: false, margin: "200px" },
  transition: {
    opacity: { duration: 0.5, delay },
    y: { delay, duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
  },
});

export default function FloatingElements() {
  return (
    <>
      {/* Top-right: skill tag card */}
      <motion.div
        className="absolute top-32 right-[6%] hidden lg:flex flex-col gap-1.5 bg-white border border-[#E2E1DC] rounded-2xl px-4 py-3 shadow-sm rotate-[3deg]"
        {...floatProps(1.0)}
      >
        <p className="font-sans text-xs font-semibold text-[#0D0D0D]/40 uppercase tracking-widest">
          Tech stack
        </p>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F4F0] border border-[#E2E1DC] font-sans text-xs font-semibold text-[#0D0D0D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B4EFF]" />
            Next.js
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F4F0] border border-[#E2E1DC] font-sans text-xs font-semibold text-[#0D0D0D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4EA8FF]" />
            Tailwind
          </span>
        </div>
      </motion.div>

      {/* Mid-right: team member chip */}
      <motion.div
        className="absolute top-[55%] right-[4%] hidden lg:flex items-center gap-3 bg-white border border-[#E2E1DC] rounded-full pl-1.5 pr-4 py-1.5 shadow-sm rotate-[-2deg]"
        {...floatProps(1.3)}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B4EFF] to-[#4EA8FF] flex items-center justify-center">
          <span className="font-sans text-xs font-black text-white">MB</span>
        </div>
        <div>
          <p className="font-sans text-xs font-bold text-[#0D0D0D] leading-none">
            Mateusz B.
          </p>
          <p className="font-sans text-[10px] text-[#0D0D0D]/50 leading-none mt-0.5">
            Design & Web Dev
          </p>
        </div>
      </motion.div>

      {/* Bottom-right: location badge */}
      <motion.div
        className="absolute bottom-36 right-[7%] hidden lg:flex items-center gap-2 bg-white border border-[#E2E1DC] rounded-full px-3.5 py-2 shadow-sm rotate-[1.5deg]"
        {...floatProps(1.6)}
      >
        <span className="text-sm">📍</span>
        <span className="font-sans text-xs font-semibold text-[#0D0D0D]">
          Warszawa, Polska
        </span>
      </motion.div>

      {/* Top-left: availability pill */}
      <motion.div
        className="absolute top-36 left-[6%] hidden xl:flex items-center gap-2.5 bg-white border border-[#E2E1DC] rounded-full px-4 py-2.5 shadow-sm rotate-[-3deg]"
        {...floatProps(1.2)}
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="font-sans text-xs font-semibold text-[#0D0D0D]">
          Dostępni na nowe projekty
        </span>
      </motion.div>

      {/* Mid-left: satisfaction stat */}
      <motion.div
        className="absolute top-[50%] left-[4%] hidden xl:flex flex-col items-center bg-white border border-[#E2E1DC] rounded-2xl px-4 py-3 shadow-sm rotate-[2deg]"
        {...floatProps(1.5)}
      >
        <p className="font-display font-black text-2xl text-[#0D0D0D]">100%</p>
        <p className="font-sans text-[10px] font-medium text-[#0D0D0D]/50 uppercase tracking-wider">
          Zadowolenia
        </p>
      </motion.div>
    </>
  );
}
