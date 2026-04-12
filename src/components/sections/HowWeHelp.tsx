"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M3 5h18v14H3z" />
        <path d="M3 9h18" />
        <path d="M9 21v-4" />
        <path d="M15 21v-4" />
      </svg>
    ),
    label: "Strony i sklepy",
    title: "Web Design & Development",
    description: "Projektujemy i budujemy strony, które konwertują. Od wizytówki po zaawansowany e-commerce.",
    features: [
      "Projekty UX/UI w Figmie",
      "Szybkie wdrożenie w Next.js",
      "Responsywność i SEO",
      "Szybszy time-to-market",
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M4 4h16v16H4z" />
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8h.01" />
      </svg>
    ),
    label: "Social i treści",
    title: "Social Media & Content",
    description: "Tworzymy content, który buduje markę i generuje sprzedaż — na Instagramie, TikToku i LinkedIn.",
    features: [
      "Strategia contentowa",
      "Grafiki i Reelsy co miesiąc",
      "Copywriting i posty",
      "Rosnące zaangażowanie",
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M2 6h20v12H2z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M18 10h.01" />
        <path d="M6 10h.01" />
      </svg>
    ),
    label: "Foto i wideo",
    title: "Fotografia & Wideo",
    description: "Profesjonalne zdjęcia produktowe, sesje wizerunkowe i filmy reklamowe, które przykuwają uwagę.",
    features: [
      "Sesje produktowe i biznesowe",
      "Filmy corporate i reklamy",
      "Reelsy i short-form video",
      "Postprodukcja i retusz",
    ],
  },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function HowWeHelp() {
  return (
    <section className="relative bg-[#F9F9F9] py-32 px-6 overflow-hidden">
      {/* Ambient glows for Premium SaaS vibe */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#4EA8FF] opacity-[0.12] blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#9B66FF] opacity-[0.12] blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#111111]" />
            <p className="font-sans text-xs font-bold text-[#888888] uppercase tracking-[0.15em]">
              Co robimy
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-sans font-semibold text-5xl md:text-6xl text-[#111111] tracking-[-0.04em] max-w-lg leading-[1.05]">
              Jak pomagamy
            </h2>
            <p className="font-sans text-lg text-[#666666] max-w-sm leading-relaxed mb-2 md:mb-0">
              Od strategii po realizację — jesteśmy z Tobą na każdym etapie budowania marki.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.1 + i * 0.1)}
              className="bg-[#FFFFFF] rounded-[32px] p-8 md:p-10 border border-[#E5E5E5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative group overflow-hidden"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-[#F9F9F9] border border-[#E5E5E5] flex items-center justify-center mb-8 text-[#111111] transition-transform group-hover:scale-105 duration-300">
                {s.icon}
              </div>

              {/* Label */}
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] mb-4 gradient-text w-fit">
                {s.label}
              </p>

              {/* Title */}
              <h3 className="font-sans font-semibold text-2xl text-[#111111] tracking-[-0.04em] mb-4">
                {s.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[#666666] leading-relaxed mb-10">
                {s.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mt-auto pt-6 border-t border-dashed border-[#E5E5E5]">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-sans text-[15px] text-[#444444] font-medium tracking-tight">
                    <svg className="w-5 h-5 shrink-0 text-[#4EA8FF] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
