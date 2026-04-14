"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface WelcomeOverlayProps {
  onContinue: () => void;
}

export default function WelcomeOverlay({ onContinue }: WelcomeOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E8F1FF] via-[#F0F5FF] to-white" />

      {/* Cloud decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 0.12, x: 0 }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -left-[10%] top-[10%] w-[55%]"
        >
          <Image src="/design/parallax/cloud-left.png" alt="" width={800} height={500} className="w-full h-auto" priority />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 0.10, x: 0 }}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -right-[10%] top-[5%] w-[55%]"
        >
          <Image src="/design/parallax/cloud-right.png" alt="" width={800} height={500} className="w-full h-auto" priority />
        </motion.div>
      </div>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#4EA8FF] opacity-[0.06] blur-[120px]" />
        <div className="absolute top-[40%] right-[25%] w-[250px] h-[250px] rounded-full bg-[#9B66FF] opacity-[0.05] blur-[100px]" />
        <div className="absolute bottom-[20%] left-[40%] w-[200px] h-[200px] rounded-full bg-[#6B4EFF] opacity-[0.04] blur-[80px]" />
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[520px] w-full mx-6"
      >
        <div className="relative rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_24px_80px_rgba(0,0,0,0.08),0_8px_32px_rgba(78,168,255,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] p-12 text-center">
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

          <div className="relative">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-2.5 mb-10"
            >
              <span className="font-display font-bold text-[22px] tracking-[-0.04em] text-[#111111]">
                make it
              </span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-[36px] font-bold tracking-[-0.04em] text-[#111111] leading-[1.15] mb-4">
                Witaj w swoim panelu,{" "}
                <span className="gradient-text">Kuchciak&nbsp;Budownictwo</span>.
              </h1>
              <p className="font-sans text-[16px] text-[#6B7280] leading-relaxed max-w-[380px] mx-auto">
                Tutaj śledzisz postępy, akceptujesz projekty i&nbsp;komunikujesz się z&nbsp;naszym zespołem. Wszystko w&nbsp;jednym miejscu.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <button
                onClick={onContinue}
                className="group inline-flex items-center gap-2.5 bg-[#111111] hover:bg-[#000000] text-white font-sans text-[15px] font-medium px-7 py-3.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Pokaż mi panel
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
              </button>
            </motion.div>

            {/* Subtle made-by */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="font-sans text-[11px] text-[#CCCCCC] mt-8 tracking-wide"
            >
              powered by make it
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
