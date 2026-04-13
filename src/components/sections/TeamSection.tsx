"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";

const K = ({ children }: { children: ReactNode }) => (
  <span className="font-medium text-[#111111]">{children}</span>
);

const team: {
  name: string;
  role: string;
  bio: ReactNode;
  photo: string;
  accent: string;
  initials: string;
}[] = [
  {
    name: "Mateusz Bryła",
    role: "Design & Web Development",
    bio: (
      <>
        <span className="gradient-text font-semibold">Tworzy</span> nowoczesne,
        szybkie <K>strony internetowe</K> i <K>aplikacje</K>. Łączy{" "}
        <K>estetykę</K> z funkcjonalnością, żeby każdy projekt{" "}
        <K>konwertował</K>.
      </>
    ),
    photo: "/team/mateusz-bryla.webp",
    accent: "from-[#6B4EFF] to-[#4EA8FF]",
    initials: "MB",
  },
  {
    name: "Mateusz Kuchciak",
    role: "Sprzedaż & IT Strategy",
    bio: (
      <>
        <span className="gradient-text font-semibold">Odpowiada</span> za{" "}
        <K>strategię sprzedaży</K>, <K>automatyzacje</K> i treści. Buduje{" "}
        <K>lejki sprzedażowe</K>, które zamieniają ruch w klientów.
      </>
    ),
    photo: "/team/mateusz-kuchciak.webp",
    accent: "from-[#4EA8FF] to-[#38BDF8]",
    initials: "MK",
  },
  {
    name: "Roksana Tybura",
    role: "Fotografia & Obróbka",
    bio: (
      <>
        <span className="gradient-text font-semibold">Profesjonalistka</span> od{" "}
        <K>fotografii wizerunkowej</K>, produktowej i{" "}
        <K>content marketingu</K>. Każde zdjęcie opowiada{" "}
        <K>historię marki</K>.
      </>
    ),
    photo: "/team/roksana-tybura.webp",
    accent: "from-[#F472B6] to-[#C084FC]",
    initials: "RT",
  },
  {
    name: "Szymon Żaczek",
    role: "Montaż & Post-produkcja",
    bio: (
      <>
        <span className="gradient-text font-semibold">Filmowiec</span> i{" "}
        <K>montażysta</K> z pasją do <K>motion graphics</K>. Tworzy{" "}
        <K>filmy firmowe</K>, Reelsy i reklamy, które zatrzymują scroll.
      </>
    ),
    photo: "/team/szymon-zaczek.webp",
    accent: "from-[#F59E0B] to-[#F97316]",
    initials: "SŻ",
  },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

function TeamCard({
  member,
  index,
}: {
  member: (typeof team)[0];
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      {...fadeUp(0.1 + index * 0.08)}
      className="group relative bg-white rounded-[28px] border border-[#EAEAEA] p-7 flex flex-col gap-5 overflow-hidden hover:border-[#D8D8D8] hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500"
    >
      {/* Decorative dot grid top-right */}
      <div
        className="absolute top-4 right-4 opacity-[0.07] pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 3 }).map((_, row) => (
          <div key={row} className="flex gap-2 mb-2">
            {Array.from({ length: 4 }).map((_, col) => (
              <div key={col} className="w-2 h-2 rounded-sm bg-[#111111]" />
            ))}
          </div>
        ))}
      </div>

      {/* Photo + name row */}
      <div className="flex items-center gap-4">
        <div className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden shrink-0 bg-[#F5F5F5]">
          {!imgError ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="72px"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${member.accent}`}
            >
              <span className="font-sans text-base font-black text-white">
                {member.initials}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-display font-semibold text-[18px] text-[#111111] tracking-[-0.03em] leading-snug">
            {member.name}
          </h3>
          <p className="font-sans text-[13px] text-[#888888] mt-0.5 leading-tight">
            {member.role}
          </p>
        </div>
      </div>

      {/* Dashed separator */}
      <div className="border-t border-dashed border-[#EBEBEB]" />

      {/* Bio */}
      <p className="font-sans text-[14px] text-[#555555] leading-[1.7] flex-1">
        {member.bio}
      </p>

      {/* Gradient accent bar on hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${member.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section className="bg-[#F9F9F9] py-32 px-6 relative overflow-hidden">
      {/* Subtle ambient glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#6B4EFF] opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#4EA8FF] opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 bg-white border border-[#EAEAEA] rounded-full px-4 py-1.5 mb-6 shadow-sm"
          >
            {/* Camera icon sticker — nawiązanie do screenshota */}
            <span className="text-sm">🎯</span>
            <span className="font-sans text-[11px] font-semibold text-[#888888] uppercase tracking-[0.12em]">
              Poznaj zespół
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.1)}
            className="font-display font-medium text-[40px] sm:text-[52px] md:text-[60px] text-[#111111] tracking-[-0.04em] leading-[1.05] mb-5"
          >
            Ludzie za{" "}
            <span className="gradient-text">Make it</span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.2)}
            className="font-sans text-[16px] md:text-[18px] text-[#666666] leading-relaxed max-w-xl"
          >
            Cztery osoby, cztery specjalizacje, jeden cel — pomóc Twojej marce
            wyglądać i działać profesjonalnie w internecie.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
