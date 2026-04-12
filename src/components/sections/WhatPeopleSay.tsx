"use client";

import { motion } from "framer-motion";
import React from "react";

const testimonials = [
  {
    company: "Bloom Kwiaty",
    icon: (
      <svg className="w-4 h-4 text-[#888888]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    quote: (
      <>
        Strona przeszła nasze oczekiwania. <span className="text-[#4EA8FF]">Projekt był zrealizowany szybko i bezbłędnie</span> — wszystko działa idealnie. Polecamy każdemu, kto szuka solidnej ekipy.
      </>
    ),
    name: "Anna Kowalska",
    title: "Właścicielka, Bloom Kwiaty",
    avatar: "/team/roksana-tybura.png", // Using a placeholder from public dir
  },
  {
    company: "TechBuild",
    icon: (
      <svg className="w-4 h-4 text-[#888888]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
      </svg>
    ),
    quote: (
      <>
        Social media prowadzone profesjonalnie. <span className="text-[#4EA8FF]">Zaangażowanie wzrosło o 180% w ciągu 3 miesięcy</span>, a klienci coraz częściej trafiają do nas właśnie z Instagrama.
      </>
    ),
    name: "Tomasz Wiśniewski",
    title: "CEO, TechBuild",
    avatar: "/team/mateusz-bryla.jpg",
  },
  {
    company: "Golden Jewel",
    icon: (
      <svg className="w-4 h-4 text-[#888888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
    quote: (
      <>
        Sklep działa świetnie — <span className="text-[#9B66FF]">konwersja wzrosła o 40% po redesignie</span>. Zdjęcia produktowe są przepiękne, klienci często piszą, że właśnie przez nie zdecydowali się na zakup.
      </>
    ),
    name: "Karolina Bąk",
    title: "Właścicielka, Golden Jewel",
    avatar: "/team/szymon-zaczek.jpg",
  },
];

export default function WhatPeopleSay() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-transparent">
      {/* Top Black Fade effect similar to Drewl */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#111111] opacity-5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-24 relative"
        >
          <h2 className="font-sans font-medium text-[48px] sm:text-[56px] text-[#111111] tracking-[-0.04em] flex flex-wrap justify-center items-center gap-4">
            Dlaczego klienci
            <div className="relative inline-flex flex-col items-center justify-center">
              {/* Tooltip pill above */}
              <span className="absolute -top-7 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-[11px] font-semibold tracking-wider text-[#111111] shadow-sm uppercase z-10">
                ufają
              </span>
              {/* Dark rounded app icon */}
              <div className="w-14 h-14 bg-gradient-to-b from-[#333333] to-[#111111] rounded-[18px] shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center relative">
                <svg className="w-6 h-6 text-[#FF4E8D]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
            Make it
          </h2>
        </motion.div>

        {/* Testimonials Grid (Bento style) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="bg-white rounded-[24px] sm:rounded-[32px] p-8 sm:p-10 border border-[#E5E5E5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon + Company name */}
                <div className="flex items-center gap-2 mb-8">
                  {t.icon}
                  <span className="font-sans font-semibold text-[15px] text-[#666666] tracking-tight">
                    {t.company}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-sans text-[17px] text-[#666666] leading-[1.6] mb-12 font-medium">
                  {t.quote}
                </p>
              </div>

              {/* Author Footer */}
              <div>
                <div className="border-t border-dashed border-[#E5E5E5] w-full mb-6" />
                <div className="flex items-center gap-4">
                  {/* Using gray placeholder if image fails, but ideally an image */}
                  <div className="w-12 h-12 rounded-full bg-[#E5E5E5] overflow-hidden shrink-0">
                    <div className="w-full h-full bg-[#D4D4D4] flex items-center justify-center font-bold text-white text-lg">
                      {t.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-[15px] text-[#111111] leading-tight">
                      {t.name}
                    </h4>
                    <p className="font-sans text-[13px] text-[#888888] mt-0.5">
                      {t.title}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
