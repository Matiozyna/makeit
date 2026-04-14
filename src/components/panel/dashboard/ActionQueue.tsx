"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PenLine, MessageSquare, CreditCard, FileText, Check } from "lucide-react";

type ActionType = "design" | "message" | "payment" | "file";

interface Action {
  id: string;
  type: ActionType;
  title: string;
  description: string;
  context: string; // "Mateusz B. czeka na Twoją decyzję od X"
  href: string;
  cta: string;
  waitingSince: string;
}

const typeIcon: Record<ActionType, typeof PenLine> = {
  design: PenLine,
  message: MessageSquare,
  payment: CreditCard,
  file: FileText,
};

const typeLabel: Record<ActionType, string> = {
  design: "Design Review",
  message: "Wiadomość",
  payment: "Płatność",
  file: "Plik",
};

// W produkcji te dane przychodzą z API / CMS
const actions: Action[] = [
  {
    id: "1",
    type: "design",
    title: "Zatwierdź projekt logo — wersja 3",
    description:
      "Finalna propozycja logo Kuchciak Budownictwo gotowa. Wersja 3 uwzględnia wszystkie poprzednie uwagi — sprawdź i podejmij decyzję.",
    context: "Mateusz B. czeka na Twoją decyzję",
    href: "/panel/design-review",
    cta: "Przejrzyj i zatwierdź",
    waitingSince: "2 godz. temu",
  },
  {
    id: "2",
    type: "message",
    title: "Odpowiedz na pytanie dot. kolorów",
    description: "",
    context: "Mateusz B. zadał pytanie",
    href: "/panel/wiadomosci",
    cta: "Odpowiedz",
    waitingSince: "1 godz. temu",
  },
];

export default function ActionQueue() {
  const [primary, ...secondary] = actions;

  // Empty state — nic nie czeka
  if (actions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 flex flex-col items-start"
      >
        <div className="w-11 h-11 rounded-full bg-[#111111] flex items-center justify-center mb-5">
          <Check size={18} strokeWidth={2.5} color="white" />
        </div>
        <h2 className="font-display text-[22px] font-bold tracking-[-0.04em] text-[#111111] mb-2">
          Wszystko gra.
        </h2>
        <p className="font-sans text-[14px] text-[#888888] max-w-[380px] leading-relaxed">
          Pracujemy teraz nad mockupami podstron. Poinformujemy
          Cię kiedy będą gotowe do przeglądu.
        </p>
      </motion.div>
    );
  }

  const PrimaryIcon = typeIcon[primary.type];

  return (
    <div className="flex flex-col gap-3">

      {/* ── Hero action ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="rounded-2xl border border-[#E0E0E0] bg-white shadow-[0_4px_28px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.04)] p-8">

          {/* Meta row — type + waiting */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center">
                <PrimaryIcon size={12} strokeWidth={1.75} color="#555555" />
              </div>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#AAAAAA]">
                {typeLabel[primary.type]}
              </span>
            </div>
            <span className="font-sans text-[11px] text-[#999999]">
              {primary.waitingSince}
            </span>
          </div>

          {/* Title — the primary focal point */}
          <h2 className="font-display text-[26px] font-bold tracking-[-0.04em] text-[#111111] leading-tight mb-3">
            {primary.title}
          </h2>

          {/* Human context — makes agency feel present */}
          <p className="font-sans text-[13px] text-[#777777] mb-3">
            {primary.context}
          </p>

          {/* Description */}
          <p className="font-sans text-[14px] text-[#444444] leading-relaxed mb-8 max-w-[480px]">
            {primary.description}
          </p>

          {/* CTA — bottom, full natural width, draws the eye down */}
          <Link
            href={primary.href}
            className="inline-flex items-center gap-2.5 bg-[#111111] hover:bg-[#2a2a2a] text-white font-sans text-[14px] font-medium px-7 py-3.5 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-all duration-150"
          >
            {primary.cta}
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </motion.div>

      {/* ── Secondary actions ── */}
      {secondary.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl border border-[#EBEBEB] bg-white overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
        >
          <ul className="divide-y divide-[#F7F7F7]">
            {secondary.map((action) => {
              const Icon = typeIcon[action.type];
              return (
                <li
                  key={action.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center shrink-0">
                      <Icon size={14} strokeWidth={1.75} color="#555555" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-[13px] font-semibold text-[#111111] truncate">
                        {action.title}
                      </p>
                      <p className="font-sans text-[12px] text-[#888888]">
                        {typeLabel[action.type]} · {action.waitingSince}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={action.href}
                    className="shrink-0 inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold text-[#111111] border border-[#E5E5E5] hover:border-[#CCCCCC] px-3.5 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap"
                  >
                    {action.cta}
                    <ArrowRight size={11} strokeWidth={2.5} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}

    </div>
  );
}
