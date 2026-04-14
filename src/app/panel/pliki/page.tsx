"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Upload, Check, Clock, Palette, Type, Image as ImageIcon } from "lucide-react";
import FileCard from "@/components/panel/files/FileCard";

const filters = ["Wszystkie", "Logo", "Strona", "Faktury", "Inne"] as const;

const files = [
  { name: "Logo Kuchciak — v3.svg", type: "svg", size: "48 KB", date: "14 kwi", isNew: true, category: "Logo" },
  { name: "Logo Kuchciak — dark.svg", type: "svg", size: "42 KB", date: "14 kwi", isNew: true, category: "Logo" },
  { name: "Hero section — desktop.webp", type: "webp", size: "320 KB", date: "13 kwi", isNew: true, preview: "/portfolio/kuchciak.webp", category: "Strona" },
  { name: "Podstrona /uslugi — mockup.webp", type: "webp", size: "285 KB", date: "12 kwi", preview: "/portfolio/kuchciakoze.webp", category: "Strona" },
  { name: "Brief projektowy.pdf", type: "pdf", size: "1.2 MB", date: "8 kwi", category: "Inne" },
  { name: "Kontrakt — podpisany.pdf", type: "pdf", size: "890 KB", date: "8 kwi", category: "Faktury" },
  { name: "Faktura #001.pdf", type: "pdf", size: "340 KB", date: "8 kwi", category: "Faktury" },
  { name: "Projekt Figma — eksport.figma", type: "figma", size: "—", date: "11 kwi", category: "Strona" },
  { name: "Zdjęcia budowy — pack.zip", type: "zip", size: "24 MB", date: "6 kwi", category: "Inne" },
];

const brandAssets = [
  { icon: Palette, label: "Paleta kolorów", sub: "#1B3A6B · #F97316 · #F5F5F5", gradient: "from-[#4EA8FF] to-[#6B4EFF]" },
  { icon: Type, label: "Typografia", sub: "Inter · Cabinet Grotesk", gradient: "from-[#6B4EFF] to-[#9B66FF]" },
  { icon: ImageIcon, label: "Logo (3 warianty)", sub: "SVG · PNG · dark · light", gradient: "from-[#9B66FF] to-[#4EA8FF]" },
];

const invoices = [
  { name: "Faktura #001 — Zaliczka 50%", amount: "4 500 zł", status: "paid" as const, date: "8 kwi 2026" },
  { name: "Faktura #002 — Etap Design", amount: "4 500 zł", status: "pending" as const, date: "28 kwi 2026" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function PlikiPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Wszystkie");

  const filtered = activeFilter === "Wszystkie"
    ? files
    : files.filter((f) => f.category === activeFilter);

  return (
    <div className="max-w-[1200px] flex flex-col gap-7">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-end justify-between gap-4">
        <div>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-1">
            Wszystkie pliki w jednym miejscu
          </p>
          <h1 className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111]">
            Pliki & Deliverables
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" strokeWidth={2} />
            <input
              type="text"
              placeholder="Szukaj pliku..."
              className="font-sans text-[13px] pl-9 pr-4 py-2.5 border border-[#E5E7EB] rounded-full w-[200px] focus:outline-none focus:border-[#111111] focus:w-[260px] transition-all duration-300 placeholder:text-[#BBBBBB] bg-white"
            />
          </div>
          {/* Upload */}
          <button className="flex items-center gap-2 bg-[#111111] hover:bg-[#000000] text-white font-sans text-[13px] font-medium px-4 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-200">
            <Upload className="w-3.5 h-3.5" strokeWidth={2} />
            Prześlij
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeUp(0.04)} className="flex gap-1.5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`font-sans text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              f === activeFilter
                ? "bg-[#111111] text-white shadow-sm"
                : "text-[#6B7280] bg-white border border-[#E5E7EB] hover:border-[#D0D4DB] hover:text-[#111111]"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* File grid */}
      <motion.div {...fadeUp(0.08)}>
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((file) => (
            <FileCard key={file.name} {...file} />
          ))}
        </div>
      </motion.div>

      {/* Brand Vault */}
      <motion.div {...fadeUp(0.14)}>
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0F0F1A] via-[#111827] to-[#0F172A] p-8">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] opacity-20 pointer-events-none">
            <div className="absolute top-1/2 right-12 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#4EA8FF] blur-[100px]" />
            <div className="absolute top-1/3 right-32 w-[150px] h-[150px] rounded-full bg-[#6B4EFF] blur-[80px]" />
          </div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[200px] opacity-10 pointer-events-none">
            <div className="absolute bottom-4 left-8 w-[180px] h-[180px] rounded-full bg-[#9B66FF] blur-[90px]" />
          </div>

          <div className="relative">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-1.5">
              Twoja marka
            </p>
            <h2 className="font-display text-[22px] font-bold tracking-[-0.04em] text-white mb-6">
              Brand Vault
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {brandAssets.map((asset) => {
                const Icon = asset.icon;
                return (
                  <div
                    key={asset.label}
                    className="group relative rounded-[16px] bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm p-5 hover:bg-white/[0.10] hover:border-white/[0.15] transition-all duration-300 cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-[10px] bg-gradient-to-br ${asset.gradient} flex items-center justify-center mb-3 shadow-[0_4px_12px_rgba(78,168,255,0.25)]`}>
                      <Icon className="w-4.5 h-4.5 text-white" strokeWidth={1.75} />
                    </div>
                    <p className="font-sans text-[14px] font-medium text-white">{asset.label}</p>
                    <p className="font-sans text-[12px] text-white/50 mt-0.5">{asset.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Invoices */}
      <motion.div {...fadeUp(0.2)}>
        <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
          <h2 className="font-display text-[18px] font-bold tracking-[-0.04em] text-[#111111] mb-5">
            Faktury & Dokumenty
          </h2>
          <div className="flex flex-col gap-3">
            {invoices.map((inv) => (
              <div
                key={inv.name}
                className="flex items-center justify-between p-4 rounded-[14px] border border-[#E5E7EB] hover:border-[#D0D4DB] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* PDF icon */}
                  <div className="w-10 h-10 rounded-[10px] bg-rose-50 border border-rose-200 flex items-center justify-center">
                    <span className="font-display text-[12px] font-bold text-rose-600">PDF</span>
                  </div>
                  <div>
                    <p className="font-sans text-[14px] font-medium text-[#111111] group-hover:text-[#111111]">
                      {inv.name}
                    </p>
                    <p className="font-sans text-[12px] text-[#9CA3AF] mt-0.5">{inv.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-[15px] font-bold tracking-[-0.02em] text-[#111111]">
                    {inv.amount}
                  </span>
                  {inv.status === "paid" ? (
                    <span className="inline-flex items-center gap-1 font-sans text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1">
                      <Check className="w-3 h-3" strokeWidth={2.5} />
                      Zapłacona
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-sans text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-1">
                      <Clock className="w-3 h-3" strokeWidth={2} />
                      Oczekuje
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
