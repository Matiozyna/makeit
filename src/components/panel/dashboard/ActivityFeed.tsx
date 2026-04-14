"use client";

import { Check, Pencil, FileText, Palette, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const events = [
  {
    icon: Check,
    title: "Projekt logo zaakceptowany",
    description: "Wersja 3 zatwierdzona — przechodzimy do wdrozenia.",
    time: "2 godz. temu",
    author: "Mateusz B.",
  },
  {
    icon: Pencil,
    title: "Dodano 3 nowe mockupy",
    description: "Podstrony: /uslugi, /o-nas, /kontakt gotowe do przegadu.",
    time: "wczoraj, 16:40",
    author: "Mateusz B.",
  },
  {
    icon: FileText,
    title: "Kontrakt podpisany",
    description: "Umowa podpisana elektronicznie.",
    time: "3 dni temu",
    author: "Kuchciak Budownictwo",
  },
  {
    icon: Palette,
    title: "Wybrano palete kolorow",
    description: "Granatowy #1B3A6B jako kolor glowny, akcent pomaranczowy.",
    time: "5 dni temu",
    author: "Mateusz B.",
  },
  {
    icon: Rocket,
    title: "Projekt rozpoczety",
    description: "Kick-off call zakonczony. Discovery phase w toku.",
    time: "12 kwi 2026",
    author: "make it",
  },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5">
      <h3 className="font-display text-[16px] font-bold tracking-[-0.03em] text-[#111111] mb-5">
        Ostatnia aktywnosc
      </h3>

      <ul className="relative">
        {/* Vertical guide line */}
        <div className="absolute left-[13px] top-3 bottom-3 w-px bg-[#EFEFEF]" />

        {events.map((event, i) => {
          const Icon = event.icon;
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.04 * i,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative pl-10 pb-5 last:pb-0"
            >
              {/* Icon marker */}
              <div className="absolute left-0 top-0.5 w-[26px] h-[26px] rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center">
                <Icon size={12} strokeWidth={2} color="#555555" />
              </div>

              <p className="font-sans text-[13px] font-semibold text-[#1a1a1a] leading-snug">
                {event.title}
              </p>
              <p className="font-sans text-[12px] text-[#888888] mt-0.5 leading-snug">
                {event.description}
              </p>
              <p className="font-sans text-[11px] text-[#C0C0C0] mt-1.5">
                {event.author} · {event.time}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
