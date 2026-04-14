"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

const K = ({ children }: { children: ReactNode }) => (
  <span className="font-medium text-[#111111]">{children}</span>
);

const cards: {
  title: string;
  description: ReactNode;
  image: string;
  imageWidth: number;
  imageHeight: number;
  col: string;
  imgPos: string;
}[] = [
  {
    title: "Klienci przychodzą na spotkanie już przekonani",
    description: (
      <>
        <K>"Widziałem waszą stronę — właśnie tego szukałem."</K> Zamiast 20
        minut tłumaczenia, zaczynasz od:{" "}
        <K>kiedy możemy zacząć?</K>
      </>
    ),
    image: "/design/bento-grid/output1.webp",
    imageWidth: 2400,
    imageHeight: 1792,
    col: "lg:col-span-5",
    imgPos: "center center",
  },
  {
    title: "Zaczynasz dostawać zapytania od obcych",
    description: (
      <>
        Nie z polecenia. Nie z Instagrama. Od kogoś kto szukał w Google i
        zdecydował że wyglądasz jak ktoś,{" "}
        <K>komu można zaufać.</K>
      </>
    ),
    image: "/design/bento-grid/output2.webp",
    imageWidth: 2048,
    imageHeight: 2048,
    col: "lg:col-span-7",
    imgPos: "center center",
  },
  {
    title: "Wiesz skąd przychodzą klienci — i dlaczego",
    description: (
      <>
        Analytics, śledzenie konwersji, mapy ciepła. Pierwszy raz masz{" "}
        <K>dane zamiast domysłów</K> — i wiesz co zmienić żeby było lepiej.
      </>
    ),
    image: "/design/bento-grid/output3.webp",
    imageWidth: 2400,
    imageHeight: 1792,
    col: "lg:col-span-7",
    imgPos: "center 35%",
  },
  {
    title: "Twoja marka przestaje wyglądać jak dwie różne firmy",
    description: (
      <>
        Instagram, strona, wizytówka —{" "}
        <K>to samo DNA.</K> Klienci którzy sprawdzają cię w kilku miejscach
        widzą spójność. <K>Spójność buduje zaufanie.</K>
      </>
    ),
    image: "/design/bento-grid/output4.webp",
    imageWidth: 2752,
    imageHeight: 1536,
    col: "lg:col-span-5",
    imgPos: "center center",
  },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function WebDesignBento() {
  return (
    <section className="bg-[#F9F9F9] pt-14 pb-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">

        {/* Heading */}
        <div className="mb-16">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-display font-medium text-[40px] sm:text-[50px] md:text-[58px] text-[#111111] leading-[1.05] tracking-[-0.04em] max-w-3xl">
              Co konkretnie{" "}
              <span className="gradient-text">zmienia się</span>{" "}
              po projekcie
            </h2>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.1 + i * 0.08)}
              className={`group relative z-10 flex flex-col rounded-[32px] bg-[#F1F1F3] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.06)] transition-all duration-500 justify-between ${card.col}`}
            >
              {/* Text area */}
              <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4">
                <h3 className="font-display font-medium text-[19px] sm:text-[21px] text-[#111111] leading-snug tracking-[-0.02em] mb-2 sm:mb-2.5">
                  {card.title}
                </h3>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#666666] leading-[1.6]">
                  {card.description}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-[200px] sm:h-[240px] lg:h-[260px] overflow-hidden rounded-[24px] mx-4 sm:mx-6 mb-4 sm:mb-6 bg-[#E8E8EB]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectPosition: card.imgPos }}
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-700 rounded-[24px]" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
