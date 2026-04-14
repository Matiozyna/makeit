"use client";

import { Check, Pencil, FileText, Palette, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const events = [
  {
    icon: Check,
    title: "Projekt logo zaakceptowany",
    description: "Wersja 3 zatwierdzona — przechodzimy do wdrożenia.",
    time: "2 godz. temu",
    author: "Mateusz B.",
  },
  {
    icon: Pencil,
    title: "Dodano 3 nowe mockupy",
    description: "Podstrony /usługi, /o-nas, /kontakt gotowe do przeglądu.",
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
    title: "Wybrano paletę kolorów",
    description: "Granatowy #1B3A6B jako kolor główny, akcent pomarańczowy.",
    time: "5 dni temu",
    author: "Mateusz B.",
  },
  {
    icon: Rocket,
    title: "Projekt rozpoczęty",
    description: "Kick-off call zakończony. Discovery phase w toku.",
    time: "12 kwi 2026",
    author: "make it",
  },
];

// Opacity cascade: newest is full weight, older entries fade naturally
const opacities = [1, 0.85, 0.65, 0.5, 0.38];

export default function ActivityFeed() {
  return (
    <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#F5F5F5] flex items-center justify-between">
        <h3 className="font-sans text-[13px] font-semibold text-[#111111]">
          Ostatnia aktywność
        </h3>
        <span className="font-sans text-[11px] text-[#BBBBBB]">
          {events.length} zdarzeń
        </span>
      </div>

      <ul className="relative px-6 py-3">
        {/* Vertical guide line — aligned to icon centers */}
        <div className="absolute left-[34px] top-5 bottom-5 w-px bg-[#EFEFEF]" />

        {events.map((event, i) => {
          const Icon = event.icon;
          const isLatest = i === 0;

          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: opacities[i], y: 0 }}
              transition={{
                delay: 0.05 * i,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative pl-10 py-3.5"
            >
              {/* Icon marker */}
              {isLatest ? (
                // Latest event: filled black circle — signals "this just happened"
                <div className="absolute left-0 top-[13px] w-[22px] h-[22px] rounded-full bg-[#111111] flex items-center justify-center">
                  <Icon size={10} strokeWidth={2.5} color="#ffffff" />
                </div>
              ) : (
                <div className="absolute left-0 top-[13px] w-[22px] h-[22px] rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center">
                  <Icon size={10} strokeWidth={2} color="#AAAAAA" />
                </div>
              )}

              {/* Content — single column, reading order: title → description → meta */}
              <p
                className={`font-sans leading-snug ${
                  isLatest
                    ? "text-[14px] font-semibold text-[#111111]"
                    : "text-[13px] font-medium text-[#222222]"
                }`}
              >
                {event.title}
              </p>
              <p className="font-sans text-[13px] text-[#666666] mt-0.5 leading-snug">
                {event.description}
              </p>
              <p className="font-sans text-[11px] text-[#AAAAAA] mt-1.5">
                {event.author} · {event.time}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
