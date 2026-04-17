"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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

const wordVariants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: {
      duration: 0.75,
      delay: 0.25 + i * 0.1,
      ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
    },
  }),
};

const line1 = ["Wynosimy", "Twoje"];
const line2 = [
  { text: "social media",  gradient: false },
  { text: "na orbitę.",    gradient: true  },
];

export default function HeroSocialMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const spring = { stiffness: 55, damping: 22, mass: 0.8 };

  // Chmury — rozchodzą się na boki i opadają (exhaust dispersing)
  const cloudLeftX  = useSpring(useTransform(scrollY, [0, 500], [0, -260]), spring);
  const cloudRightX = useSpring(useTransform(scrollY, [0, 500], [0,  260]), spring);
  const cloudY      = useSpring(useTransform(scrollY, [0, 500], [0,  110]), spring);

  // Rakieta — wzbija się w górę i lekko rośnie
  const rocketY     = useSpring(useTransform(scrollY, [0, 500], [0, -130]), spring);
  const rocketScale = useSpring(useTransform(scrollY, [0, 500], [1,  1.12]), spring);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#F9F9F9" }}
    >
      {/* Grid lines — identyczny background jak reszta serwisu */}
      <div className="absolute inset-0 -z-10">
        <GridBackground />
      </div>

      {/* Sky gradient — pojawia się w dolnej połowie hero */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to top, #d8e4ff 0%, #e8efff 35%, transparent 100%)",
        }}
      />

      {/* ── GÓRNA CZĘŚĆ: treść ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-4">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <LaurelBranch />
          <span className="font-sans text-[12px] font-medium text-[#A8A29A] tracking-[0.12em] uppercase">
            Social Media & Content
          </span>
          <LaurelBranch mirrored />
        </motion.div>

        {/* Headline */}
        <div className="relative max-w-5xl mx-auto mb-7">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[280px] pointer-events-none -z-10">
            <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-[360px] h-[240px] bg-[#4EA8FF] opacity-[0.13] blur-[100px] rounded-full" />
            <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[360px] h-[240px] bg-[#9B66FF] opacity-[0.13] blur-[100px] rounded-full" />
          </div>

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

          <div className="flex flex-wrap justify-center gap-x-4 leading-[1.05] mt-[-4px]">
            {line2.map((word, i) => (
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
                    <path className="swoosh-path" d="M 5 20 Q 150 0 395 15"
                      stroke="url(#swoosh-sm)" strokeWidth="5" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="swoosh-sm" x1="5" y1="10" x2="395" y2="10" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4EA8FF" />
                        <stop offset="1" stopColor="#9B66FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.7, ease: "easeOut" }}
          className="font-sans text-[16px] md:text-[18px] text-[#666666] leading-relaxed max-w-2xl mb-10"
        >
          Tworzymy content, który buduje markę i generuje{" "}
          <span className="text-[#111111] font-medium">mierzalne wyniki sprzedaży</span>.
          Strategia, grafiki, Reelsy — wszystko w jednym miejscu.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.85, ease: "easeOut" }}
          className="flex items-center justify-center gap-4"
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
      </div>

      {/* ── DOLNA CZĘŚĆ: scena startowa ── naturalny spacer + absolutne elementy */}
      <div className="relative flex-1 min-h-[44vh] z-[2]">

        {/* Ciepły blask ognia — pulsuje pod rakietą */}
        <motion.div
          animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute bottom-[18%] left-1/2 -translate-x-1/2 pointer-events-none z-[1]"
          style={{
            width: 340,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 85%, rgba(255,130,30,0.6) 0%, rgba(255,60,0,0.3) 38%, transparent 68%)",
            filter: "blur(22px)",
          }}
        />

        {/* Purpurowy blask ciała rakiety */}
        <div
          className="absolute bottom-[28%] left-1/2 -translate-x-1/2 pointer-events-none z-[1]"
          style={{
            width: 360,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(107,78,255,0.2) 0%, rgba(78,168,255,0.1) 50%, transparent 72%)",
            filter: "blur(40px)",
          }}
        />

        {/* Chmura lewa */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] }}
          style={{ x: cloudLeftX, y: cloudY, willChange: "transform" }}
          className="absolute bottom-[-2%] left-[-8%] pointer-events-none z-[3]"
        >
          <Image
            src="/shared/parallax/cloud-left.webp"
            alt=""
            width={580}
            height={640}
            className="w-[44vw] max-w-[620px] h-auto select-none"
            priority
            draggable={false}
          />
        </motion.div>

        {/* Chmura prawa */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] }}
          style={{ x: cloudRightX, y: cloudY, willChange: "transform" }}
          className="absolute bottom-[-2%] right-[-8%] pointer-events-none z-[3]"
        >
          <Image
            src="/shared/parallax/cloud-right.webp"
            alt=""
            width={580}
            height={640}
            className="w-[44vw] max-w-[620px] h-auto select-none"
            priority
            draggable={false}
          />
        </motion.div>

        {/* Rakieta */}
        <motion.div
          /* Wejście: wylatuje z dołu na miejsce */
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] }}
          className="absolute bottom-[-1%] left-1/2 -translate-x-1/2 pointer-events-none z-[4]"
        >
          {/* Parallax: wznosi się przy scrollu */}
          <motion.div style={{ y: rocketY, scale: rocketScale, willChange: "transform" }}>
            {/* Idle bobbing: unosi się delikatnie */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
            >
              <Image
                src="/social-media/rocket/rocket_launching.webp"
                alt="Rakieta startująca"
                width={2048}
                height={2048}
                className="w-[28vw] max-w-[380px] min-w-[200px] h-auto select-none"
                priority
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
