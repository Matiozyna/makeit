"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const clientActions = [
  {
    text: "Zatwierdź projekt logo — wersja 3",
    cta: "Zatwierdź",
    href: "/panel/design-review",
  },
  {
    text: "Odpowiedz na pytanie dot. kolorów",
    cta: "Odpowiedz",
    href: "/panel/wiadomosci",
  },
];

const agencyActions = [
  "Przygotowujemy mockupy podstrony /usługi",
  "Dobieramy typografię nagłówków",
];

export default function ActionItems() {
  return (
    <div className="rounded-xl border border-[#EBEBEB] bg-white p-6 h-full flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-sans text-[13px] font-semibold text-[#111111]">
          Wymaga akcji
        </h3>
        <span className="font-sans text-[10px] font-bold text-white bg-[#111111] w-[18px] h-[18px] rounded-full flex items-center justify-center">
          {clientActions.length}
        </span>
      </div>

      {/* Action list */}
      <ul className="flex flex-col">
        {clientActions.map((item, i) => (
          <li
            key={item.text}
            className={`py-3.5 flex items-start justify-between gap-3 ${
              i < clientActions.length - 1 ? "border-b border-[#F5F5F5]" : ""
            }`}
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

      {/* In progress — pushed to bottom */}
      <div className="mt-auto pt-5 border-t border-[#F5F5F5]">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[#BBBBBB] mb-3">
          W realizacji
        </p>
        <ul className="flex flex-col gap-2.5">
          {agencyActions.map((text) => (
            <li key={text} className="flex items-start gap-2">
              <span className="mt-[6px] w-1 h-1 rounded-full bg-[#DDDDDD] shrink-0" />
              <span className="font-sans text-[12px] text-[#999999] leading-snug">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
