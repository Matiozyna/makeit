"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const clientActions = [
  {
    text: "Zatwierdz projekt logo — wersja 3",
    cta: "Zatwierdz",
    href: "/panel/design-review",
  },
  {
    text: "Odpowiedz na pytanie dot. kolorow",
    cta: "Odpowiedz",
    href: "/panel/wiadomosci",
  },
];

const agencyActions = [
  "Przygotowujemy mockupy podstrony /uslugi",
  "Dobieramy typografie naglowkow",
];

export default function ActionItems() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 h-full flex flex-col">
      {/* Requires action */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]">
            Wymaga akcji
          </span>
        </div>
        <ul className="flex flex-col gap-2">
          {clientActions.map((item) => (
            <li
              key={item.text}
              className="flex items-start justify-between gap-3 p-3 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA] hover:border-[#DDDDDD] transition-colors duration-150"
            >
              <span className="font-sans text-[13px] text-[#333333] leading-snug">
                {item.text}
              </span>
              <Link
                href={item.href}
                className="shrink-0 inline-flex items-center gap-1 font-sans text-[11px] font-semibold text-white bg-[#111111] px-3 py-1.5 rounded-md hover:bg-[#333333] transition-colors duration-150"
              >
                {item.cta}
                <ArrowRight size={10} strokeWidth={2.5} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-[#F0F0F0] my-1 mb-4" />

      {/* In progress */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#999999]" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[#666666]">
            W realizacji
          </span>
        </div>
        <ul className="flex flex-col gap-2.5">
          {agencyActions.map((text) => (
            <li key={text} className="flex items-start gap-2.5">
              <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#DDDDDD] shrink-0" />
              <span className="font-sans text-[13px] text-[#555555] leading-snug">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
