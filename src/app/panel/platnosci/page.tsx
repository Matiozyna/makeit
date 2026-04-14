"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Download, Clock, Lock, Copy } from "lucide-react";
import Link from "next/link";

const TOTAL_PROJECT = 18000;
const PAID_AMOUNT = 4500;

const milestones = [
  {
    phase: "Discovery",
    status: "paid" as const,
    invoice: "#001",
    name: "Zaliczka — start projektu",
    description: "Kick-off, brief, analiza konkurencji",
    amount: 4500,
    date: "8 kwi 2026",
  },
  {
    phase: "Design",
    status: "upcoming" as const,
    invoice: "#002",
    name: "Płatność etapowa — Design",
    description: "Po zatwierdzeniu wszystkich mockupów",
    amount: 4500,
    due: "28 kwi 2026",
    daysLeft: 14,
  },
  {
    phase: "Development",
    status: "future" as const,
    invoice: "#003",
    name: "Płatność etapowa — Development",
    description: "Po wdrożeniu na środowisko staging",
    amount: 5400,
  },
  {
    phase: "Launch",
    status: "future" as const,
    invoice: "#004",
    name: "Płatność końcowa",
    description: "Po publikacji i przekazaniu projektu",
    amount: 3600,
  },
];

const bankDetails = [
  { label: "Odbiorca", value: "Make it Studio sp. z o.o." },
  { label: "Nr konta", value: "PL 12 1140 2004 0000 3802 8016 8348" },
  { label: "Tytuł przelewu", value: "Faktura #002 — Kuchciak Budownictwo" },
  { label: "Kwota", value: "4 500,00 zł" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: {
    duration: 0.4,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

function fmt(amount: number) {
  return (
    new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + " zł"
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="shrink-0 text-[#CCCCCC] hover:text-[#555555] transition-colors duration-150"
    >
      {copied ? <Check size={12} strokeWidth={2.5} /> : <Copy size={12} strokeWidth={1.75} />}
    </button>
  );
}

export default function PlatnosciPage() {
  const paidCount = milestones.filter((m) => m.status === "paid").length;
  const paidPct = Math.round((PAID_AMOUNT / TOTAL_PROJECT) * 100);

  return (
    <div className="flex flex-col gap-6 max-w-[1060px]">

      {/* Page header */}
      <motion.div {...fadeUp(0)} className="flex items-center gap-3">
        <h1 className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111]">
          Płatności
        </h1>
        <span className="font-sans text-[11px] font-semibold text-[#555555] bg-[#EFEFEF] px-2.5 py-1 rounded-full">
          Na bieżąco
        </span>
      </motion.div>

      {/* 2-column layout */}
      <div className="grid grid-cols-[1fr_300px] gap-5 items-start">

        {/* ─── LEFT: hero + milestone list ─── */}
        <div className="flex flex-col gap-5">

          {/* Hero next payment */}
          <motion.div {...fadeUp(0.04)}>
            <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-6">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#AAAAAA] mb-3">
                Następna płatność
              </p>
              <p className="font-display text-[52px] font-bold tracking-[-0.05em] text-[#111111] leading-none">
                {fmt(4500)}
              </p>
              <div className="flex items-baseline gap-2 mt-3">
                <p className="font-sans text-[14px] font-medium text-[#111111]">
                  Faktura #002
                </p>
                <span className="font-sans text-[13px] text-[#AAAAAA]">·</span>
                <p className="font-sans text-[13px] text-[#555555]">
                  termin 28 kwi 2026
                </p>
                <span className="font-sans text-[12px] text-[#AAAAAA]">
                  (za 14 dni)
                </span>
              </div>
              <p className="font-sans text-[12px] text-[#AAAAAA] mt-1">
                Po zatwierdzeniu mockupów fazy Design
              </p>
            </div>
          </motion.div>

          {/* Milestone list */}
          <motion.div {...fadeUp(0.08)}>
            <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">

              <div className="px-6 py-4 border-b border-[#F5F5F5]">
                <h2 className="font-sans text-[13px] font-semibold text-[#111111]">
                  Harmonogram płatności
                </h2>
              </div>

              <ul className="relative">
                {/* Vertical connector */}
                <div className="absolute left-[37px] top-6 bottom-12 w-px bg-[#EFEFEF]" />

                {milestones.map((m, i) => {
                  const isPaid = m.status === "paid";
                  const isUpcoming = m.status === "upcoming";
                  const isFuture = m.status === "future";

                  return (
                    <li
                      key={m.invoice}
                      className={`relative flex items-center gap-4 px-6 py-4 ${
                        i < milestones.length - 1 ? "border-b border-[#F7F7F7]" : ""
                      } ${isPaid ? "opacity-50" : ""} ${isFuture ? "opacity-30" : ""} ${
                        isUpcoming ? "bg-[#FAFAFA]" : ""
                      }`}
                    >
                      {/* Status icon — z-10 so it sits on top of connector line */}
                      <div className="shrink-0 relative z-10">
                        {isPaid && (
                          <div className="w-[26px] h-[26px] rounded-full bg-[#111111] flex items-center justify-center">
                            <Check size={12} strokeWidth={2.5} color="#fff" />
                          </div>
                        )}
                        {isUpcoming && (
                          <div className="w-[26px] h-[26px] rounded-full bg-white border-2 border-[#111111] flex items-center justify-center">
                            <Clock size={11} strokeWidth={2} color="#111111" />
                          </div>
                        )}
                        {isFuture && (
                          <div className="w-[26px] h-[26px] rounded-full bg-white border border-[#DDDDDD] flex items-center justify-center">
                            <Lock size={10} strokeWidth={1.75} color="#CCCCCC" />
                          </div>
                        )}
                      </div>

                      {/* Phase + name + description */}
                      <div className="flex-1 min-w-0">
                        {/* Phase label — tertiary, smallest */}
                        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#AAAAAA] mb-0.5">
                          {m.phase}
                        </p>
                        {/* Invoice name — primary in this row */}
                        <p className="font-sans text-[14px] font-semibold text-[#111111] leading-tight">
                          {m.name}
                        </p>
                        {/* Description + date — secondary */}
                        <p className="font-sans text-[12px] text-[#AAAAAA] mt-0.5">
                          {m.description}
                          {isPaid && <> · {m.date}</>}
                          {isUpcoming && m.daysLeft && (
                            <> · <span className="text-[#555555] font-medium">za {m.daysLeft} dni</span></>
                          )}
                        </p>
                      </div>

                      {/* Amount + action — right-aligned */}
                      <div className="shrink-0 flex items-center gap-3">
                        {/* Amount — primary data, always readable */}
                        <span className="font-display text-[15px] font-bold tracking-[-0.03em] text-[#111111]">
                          {fmt(m.amount)}
                        </span>

                        {isPaid && (
                          <button className="flex items-center gap-1.5 font-sans text-[11px] font-medium text-[#888888] border border-[#E5E5E5] hover:border-[#CCCCCC] hover:text-[#333333] px-2.5 py-1 rounded-md transition-all duration-150 whitespace-nowrap">
                            <Download size={11} strokeWidth={2} />
                            PDF
                          </button>
                        )}
                        {isUpcoming && (
                          <span className="font-sans text-[11px] font-medium text-[#555555] bg-white border border-[#DDDDDD] px-2.5 py-1 rounded-md whitespace-nowrap">
                            Oczekuje
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Total */}
              <div className="px-6 py-4 border-t border-[#EBEBEB] bg-[#FAFAFA] flex items-center justify-between">
                <p className="font-sans text-[12px] text-[#AAAAAA]">
                  Łączna wartość projektu
                </p>
                <p className="font-display text-[17px] font-bold tracking-[-0.03em] text-[#111111]">
                  {fmt(TOTAL_PROJECT)}
                </p>
              </div>

            </div>
          </motion.div>
        </div>

        {/* ─── RIGHT: progress + bank details ─── */}
        <div className="flex flex-col gap-5">

          {/* Payment progress */}
          <motion.div {...fadeUp(0.06)}>
            <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-5">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#AAAAAA] mb-4">
                Postęp płatności
              </p>

              {/* Phase circles */}
              <div className="flex items-start gap-2 mb-4">
                {milestones.map((m) => (
                  <div key={m.phase} className="flex flex-col items-center gap-1.5 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      m.status === "paid"
                        ? "bg-[#111111]"
                        : m.status === "upcoming"
                        ? "border-2 border-[#CCCCCC] bg-white"
                        : "border border-[#EBEBEB] bg-white"
                    }`}>
                      {m.status === "paid" && (
                        <Check size={13} strokeWidth={2.5} color="#fff" />
                      )}
                    </div>
                    <span className={`font-sans text-[9px] font-semibold text-center leading-tight ${
                      m.status === "paid" ? "text-[#555555]" : "text-[#CCCCCC]"
                    }`}>
                      {m.phase}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="h-[2px] w-full rounded-full bg-[#F0F0F0] overflow-hidden mb-2">
                <div
                  className="h-full bg-[#111111] rounded-full"
                  style={{ width: `${paidPct}%` }}
                />
              </div>

              {/* Stats */}
              <div className="flex justify-between items-baseline mt-3">
                <div>
                  <p className="font-display text-[18px] font-bold tracking-[-0.03em] text-[#111111]">
                    {fmt(PAID_AMOUNT)}
                  </p>
                  <p className="font-sans text-[11px] text-[#AAAAAA]">zapłacono</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-[18px] font-bold tracking-[-0.03em] text-[#CCCCCC]">
                    {fmt(TOTAL_PROJECT - PAID_AMOUNT)}
                  </p>
                  <p className="font-sans text-[11px] text-[#AAAAAA]">pozostało</p>
                </div>
              </div>

              <p className="font-sans text-[11px] text-[#AAAAAA] mt-3 pt-3 border-t border-[#F5F5F5]">
                {paidCount} z {milestones.length} płatności · {paidPct}% wartości projektu
              </p>
            </div>
          </motion.div>

          {/* Bank details — always visible */}
          <motion.div {...fadeUp(0.1)}>
            <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#F5F5F5]">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#AAAAAA]">
                  Dane do przelewu
                </p>
                <p className="font-sans text-[12px] text-[#AAAAAA] mt-0.5">
                  Faktura #002
                </p>
              </div>
              <ul className="divide-y divide-[#F7F7F7]">
                {bankDetails.map(({ label, value }) => (
                  <li key={label} className="px-5 py-3">
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA] mb-1">
                      {label}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-sans text-[12px] font-medium text-[#111111] leading-snug break-all">
                        {value}
                      </p>
                      <CopyButton value={value} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Help */}
          <motion.div {...fadeUp(0.12)}>
            <p className="font-sans text-[12px] text-[#BBBBBB] text-center">
              Pytania?{" "}
              <Link
                href="/panel/wiadomosci"
                className="text-[#888888] hover:text-[#111111] underline underline-offset-2 transition-colors"
              >
                Napisz do nas
              </Link>
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
