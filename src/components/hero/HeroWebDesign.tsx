"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
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
    <svg width="28" height="44" viewBox="0 0 28 44" fill="none"
      style={mirrored ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M15 40 C11 32 6 23 6 15 C6 9 9 4 14 1"
        stroke="#C0BAB2" strokeWidth="0.75" strokeLinecap="round" fill="none" />
      {leaves.map((leaf, i) => (
        <path key={i} d={leafPath(leaf.l, leaf.w)} fill="#B0AA9E"
          transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.a})`} />
      ))}
    </svg>
  );
}

// Headline words with optional gradient flag
const line1 = ["Strony,", "które"];
const line2Words = [
  { text: "robią", gradient: false },
  { text: "wrażenie.", gradient: true },
];

const wordVariants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, delay: 0.3 + i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] },
  }),
};

const techStack = [
  { label: "Figma → Next.js", dot: "#6B4EFF" },
  { label: "Mobile-first",    dot: "#4EA8FF" },
  { label: "SEO-ready",       dot: "#34D399" },
  { label: "Performance",     dot: "#F59E0B" },
];

export default function HeroWebDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const springCfg = { stiffness: 55, damping: 22, mass: 0.8 };

  // Clouds spread apart and float up slower than page
  const rawLeftX  = useTransform(scrollY, [0, 700], [0, -320]);
  const rawRightX = useTransform(scrollY, [0, 700], [0,  320]);
  const rawCloudY = useTransform(scrollY, [0, 700], [0,  140]);

  const cloudLeftX  = useSpring(rawLeftX,  springCfg);
  const cloudRightX = useSpring(rawRightX, springCfg);
  const cloudY      = useSpring(rawCloudY, springCfg);

  // Content drifts up slightly slower (gentle depth)
  const contentY = useTransform(scrollY, [0, 700], [0, -50]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden z-0"
      style={{ background: "#F9F9F9" }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 -z-10">
        <GridBackground />
      </div>

      {/* Sky gradient: transparent → airy periwinkle at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[58%] pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(to top, #dce8ff 0%, #eaf1ff 28%, transparent 100%)",
        }}
      />

      {/* Radial glow behind cloud gap (center-bottom) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none z-[3]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(107,78,255,0.10) 0%, rgba(78,168,255,0.07) 40%, transparent 72%)",
        }}
      />

      {/* ── CLOUDS ── */}
      <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden">
        {/* Left cloud */}
        <motion.div
          style={{ x: cloudLeftX, y: cloudY, willChange: "transform" }}
          className="absolute bottom-[-6%] left-[-12%]"
        >
          <Image
            src="/design/parallax/cloud-left.png"
            alt=""
            width={580}
            height={640}
            className="w-[52vw] max-w-[760px] h-auto select-none"
            priority
            draggable={false}
          />
        </motion.div>

        {/* Right cloud */}
        <motion.div
          style={{ x: cloudRightX, y: cloudY, willChange: "transform" }}
          className="absolute bottom-[-6%] right-[-12%]"
        >
          <Image
            src="/design/parallax/cloud-right.png"
            alt=""
            width={580}
            height={640}
            className="w-[52vw] max-w-[760px] h-auto select-none"
            priority
            draggable={false}
          />
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-24 pb-12"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <LaurelBranch />
          <span className="font-sans text-[12px] font-medium text-[#A8A29A] tracking-[0.12em] uppercase">
            Web Design & Development
          </span>
          <LaurelBranch mirrored />
        </motion.div>

        {/* Headline */}
        <h1 className="relative max-w-5xl mx-auto mb-8">
          {/* Ambient glow behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] pointer-events-none -z-10">
            <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[380px] h-[260px] bg-[#4EA8FF] opacity-[0.15] blur-[100px] rounded-full" />
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[380px] h-[260px] bg-[#9B66FF] opacity-[0.15] blur-[100px] rounded-full" />
          </div>

          {/* Line 1 */}
          <div className="flex flex-wrap justify-center gap-x-4 leading-[1.05]">
            {line1.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="font-display font-medium text-[48px] sm:text-[56px] md:text-[68px] lg:text-[80px] text-[#111111] tracking-[-0.04em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap justify-center gap-x-4 leading-[1.05] mt-[-4px]">
            {line2Words.map((word, i) => (
              <motion.span
                key={word.text}
                custom={line1.length + i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`font-display font-medium text-[48px] sm:text-[56px] md:text-[68px] lg:text-[80px] tracking-[-0.04em] inline-block relative ${
                  word.gradient ? "gradient-text" : "text-[#111111]"
                }`}
              >
                {word.text}
                {word.gradient && (
                  <svg
                    className="absolute -bottom-1 left-0 w-[110%] h-[20px] overflow-visible -translate-x-[5%]"
                    viewBox="0 0 400 30" fill="none" preserveAspectRatio="none"
                  >
                    <path
                      className="swoosh-path"
                      d="M 5 20 Q 150 0 395 15"
                      stroke="url(#swoosh-wd)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="swoosh-wd" x1="5" y1="10" x2="395" y2="10" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4EA8FF" />
                        <stop offset="1" stopColor="#9B66FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.75, ease: "easeOut" }}
          className="font-sans text-[16px] md:text-[18px] text-[#666666] leading-relaxed max-w-2xl mb-12"
        >
          Projektujemy i budujemy strony internetowe, które łączą{" "}
          <span className="text-[#111111] font-medium">estetykę z funkcjonalnością</span>.
          Od designu w Figmie po deployment — w jednym miejscu.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.9, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-20"
        >
          <a
            href="/portfolio"
            className="group relative inline-flex h-[44px] items-center justify-center overflow-hidden rounded-full bg-white px-6 font-sans text-[14px] font-medium text-[#111111] transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#E5E5E5] hover:border-[#D0D0D0] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          >
            <span className="relative z-10">Nasze realizacje</span>
          </a>

          <a
            href="/#kontakt"
            className="group relative inline-flex h-[44px] items-center justify-center overflow-hidden rounded-full bg-[#111111] px-6 font-sans text-[14px] font-medium text-white transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:bg-[#000000]"
          >
            <span className="relative z-10">Zacznij projekt</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
          </a>
        </motion.div>

        {/* Tech stack strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex items-center justify-center flex-wrap gap-3"
        >
          {techStack.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 font-sans text-[12px] font-medium text-[#888888] bg-white/70 backdrop-blur-sm border border-[#E8E8E8] px-3.5 py-1.5 rounded-full"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: item.dot }}
              />
              {item.label}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
