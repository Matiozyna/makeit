"use client";

import { motion } from "framer-motion";
import GridBackground from "./GridBackground";

function LaurelBranch({ mirrored = false }: { mirrored?: boolean }) {
  const leafPath = (l: number, w: number) =>
    `M 0 0 Q ${l * 0.5} ${-w} ${l} 0 Q ${l * 0.5} ${w} 0 0 Z`;

  const leaves = [
    { x: 15, y: 37, a: -138, l: 10,  w: 2.2 },
    { x: 12, y: 30, a: -158, l: 10,  w: 2.3 },
    { x: 8,  y: 23, a:  172, l: 10,  w: 2.2 },
    { x: 7,  y: 16, a:  155, l: 9.5, w: 2.1 },
    { x: 8,  y: 10, a:  138, l: 9,   w: 2.0 },
    { x: 12, y:  4, a:  118, l: 8.5, w: 1.9 },
  ];

  return (
    <svg
      width="28"
      height="44"
      viewBox="0 0 28 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={mirrored ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M15 40 C11 32 6 23 6 15 C6 9 9 4 14 1"
        stroke="#C0BAB2"
        strokeWidth="0.75"
        strokeLinecap="round"
        fill="none"
      />
      {leaves.map((leaf, i) => (
        <path
          key={i}
          d={leafPath(leaf.l, leaf.w)}
          fill="#B0AA9E"
          transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.a})`}
        />
      ))}
    </svg>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

const floatCard = (delay: number, amplitude = 8) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: [0, -amplitude, 0] as number[] },
  transition: {
    opacity: { duration: 0.5, delay },
    y: { delay, duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
  },
});

const stats = [
  { value: "2022", label: "Rok założenia" },
  { value: "60+",  label: "Projektów"     },
  { value: "100%", label: "Zadowolenia"   },
  { value: "3",    label: "Obszary usług" },
];

export default function HeroONas() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-transparent z-0">
      <div className="absolute inset-0 -z-10">
        <GridBackground />
      </div>

      {/* ── Floating ambient cards ── */}

      {/* Left — year founded */}
      <motion.div
        {...floatCard(1.0)}
        className="absolute top-36 left-[6%] hidden xl:flex items-center gap-2.5 bg-white border border-[#E2E1DC] rounded-full px-4 py-2.5 shadow-sm rotate-[-3deg] z-20"
      >
        <div className="w-5 h-5 rounded-full bg-[#111111] flex items-center justify-center shrink-0">
          <span className="font-sans text-[8px] font-black text-white leading-none tracking-tighter">22</span>
        </div>
        <span className="font-sans text-xs font-semibold text-[#0D0D0D]">
          Działamy od 2022
        </span>
      </motion.div>

      {/* Left — team size */}
      <motion.div
        {...floatCard(1.4, 6)}
        className="absolute top-[50%] left-[4%] hidden xl:flex flex-col items-center bg-white border border-[#E2E1DC] rounded-2xl px-5 py-3.5 shadow-sm rotate-[2deg] z-20"
      >
        <p className="font-display font-black text-2xl text-[#0D0D0D] leading-none">4</p>
        <p className="font-sans text-[10px] font-medium text-[#0D0D0D]/50 uppercase tracking-wider mt-1">
          Osoby w teamie
        </p>
      </motion.div>

      {/* Right — projects count */}
      <motion.div
        {...floatCard(1.1)}
        className="absolute top-32 right-[6%] hidden lg:flex flex-col gap-0.5 bg-white border border-[#E2E1DC] rounded-2xl px-4 py-3 shadow-sm rotate-[3deg] z-20"
      >
        <p className="font-sans text-[10px] font-semibold text-[#0D0D0D]/40 uppercase tracking-widest">
          Zrealizowane
        </p>
        <p className="font-display font-black text-[26px] text-[#0D0D0D] leading-none">
          60<span className="text-[#6B4EFF]">+</span>
        </p>
        <p className="font-sans text-[10px] text-[#0D0D0D]/50">projektów</p>
      </motion.div>

      {/* Right — location */}
      <motion.div
        {...floatCard(1.6, 6)}
        className="absolute bottom-36 right-[7%] hidden lg:flex items-center gap-2 bg-white border border-[#E2E1DC] rounded-full px-3.5 py-2 shadow-sm rotate-[1.5deg] z-20"
      >
        <svg className="w-3.5 h-3.5 text-[#6B4EFF]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span className="font-sans text-xs font-semibold text-[#0D0D0D]">Kraków, Polska</span>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-24 pb-8">

        {/* Laurel badge */}
        <motion.div {...fadeUp(0.2)} className="flex items-center gap-3 mb-8">
          <LaurelBranch />
          <span className="font-sans text-[12px] font-medium text-[#A8A29A] tracking-[0.12em] uppercase">
            Nasza historia i zespół
          </span>
          <LaurelBranch mirrored />
        </motion.div>

        {/* Headline */}
        <h1 className="flex flex-col items-center gap-0 mb-8 relative max-w-5xl mx-auto">

          {/* Ambient glow */}
          <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] h-[300px] pointer-events-none -z-20">
            <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-[350px] h-[250px] bg-[#4EA8FF] opacity-[0.18] blur-[100px] rounded-full" />
            <div className="absolute top-1/2 -translate-y-1/2 right-[15%] w-[350px] h-[250px] bg-[#9B66FF] opacity-[0.18] blur-[100px] rounded-full" />
          </div>

          <motion.span
            {...fadeUp(0.35)}
            className="font-display font-medium text-[48px] sm:text-[56px] md:text-[68px] lg:text-[76px] text-[#111111] tracking-[-0.04em] leading-[1.05] text-center"
          >
            Projektujemy z pasją,
          </motion.span>

          <motion.div {...fadeUp(0.5)} className="relative inline-block mt-[-2px] text-center">
            <span className="font-display font-medium text-[48px] sm:text-[56px] md:text-[68px] lg:text-[76px] tracking-[-0.04em] leading-[1.05] text-[#111111]">
              budujemy z{" "}
            </span>
            <span className="font-display font-medium text-[48px] sm:text-[56px] md:text-[68px] lg:text-[76px] tracking-[-0.04em] leading-[1.05] gradient-text relative z-10">
              precyzją.
              <svg
                className="absolute -bottom-1 left-0 w-[110%] h-[20px] overflow-visible -translate-x-[5%] z-20"
                viewBox="0 0 400 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  className="swoosh-path"
                  d="M 5 20 Q 150 0 395 15"
                  stroke="url(#swoosh-onas)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="swoosh-onas" x1="5" y1="10" x2="395" y2="10" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4EA8FF" />
                    <stop offset="1" stopColor="#9B66FF" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.div>
        </h1>

        {/* Subline */}
        <motion.p
          {...fadeUp(0.65)}
          className="mb-12 mt-6 z-10 max-w-2xl font-sans text-[16px] md:text-[18px] text-[#666666] leading-relaxed text-center"
        >
          Jesteśmy Make it — agencja kreatywna z Krakowa łącząca design,
          development i content w jednym miejscu.{" "}
          <span className="text-[#111111] font-medium">
            Budujemy marki, które wygrywają w internecie.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.8)} className="flex items-center justify-center gap-4 mb-16 z-10">
          <a
            href="/portfolio"
            className="group relative inline-flex h-[44px] items-center justify-center overflow-hidden rounded-full bg-white px-6 font-sans text-[14px] font-medium text-[#111111] transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E5E5E5] hover:border-[#D0D0D0] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          >
            <span className="relative z-10">Nasze projekty</span>
          </a>

          <a
            href="/#kontakt"
            className="group relative inline-flex h-[44px] items-center justify-center overflow-hidden rounded-full bg-[#111111] px-6 font-sans text-[14px] font-medium text-white transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:bg-[#000000]"
          >
            <span className="relative z-10">Napisz do nas</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 py-6 px-6 mt-auto"
      >
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-dashed border-[#D4D4D4] pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-1 text-center">
                  <span className="font-display font-black text-[28px] text-[#111111] leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className="font-sans text-[11px] text-[#999999] uppercase tracking-[0.1em] font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
