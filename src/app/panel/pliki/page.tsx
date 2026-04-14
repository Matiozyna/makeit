"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Upload, Palette, Type, Image as ImageIcon } from "lucide-react";
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
  { icon: Palette, label: "Paleta kolorów", sub: "#1B3A6B · #F97316 · #F5F5F5" },
  { icon: Type, label: "Typografia", sub: "Inter · Cabinet Grotesk" },
  { icon: ImageIcon, label: "Logo (3 warianty)", sub: "SVG · PNG · dark · light" },
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
    <div className="flex flex-col gap-6">

      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-center justify-between gap-4">
        <h1 className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111]">
          Pliki & Deliverables
        </h1>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#AAAAAA]" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Szukaj pliku..."
              className="font-sans text-[13px] pl-9 pr-4 py-2 border border-[#EBEBEB] rounded-lg w-[200px] focus:outline-none focus:border-[#AAAAAA] focus:w-[240px] bg-white transition-all duration-300 placeholder:text-[#CCCCCC] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            />
          </div>
          {/* Upload */}
          <button className="flex items-center gap-2 bg-[#111111] hover:bg-[#2a2a2a] text-white font-sans text-[13px] font-medium px-4 py-2 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-all duration-150">
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
            className={`font-sans text-[13px] font-medium px-4 py-1.5 rounded-lg transition-all duration-150 ${
              f === activeFilter
                ? "bg-[#111111] text-white"
                : "text-[#666666] bg-white border border-[#EBEBEB] hover:border-[#CCCCCC] hover:text-[#111111]"
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

      {/* Brand Assets — clean white card */}
      <motion.div {...fadeUp(0.12)}>
        <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F5F5F5]">
            <h2 className="font-sans text-[13px] font-semibold text-[#111111]">
              Brand Assets
            </h2>
            <p className="font-sans text-[12px] text-[#AAAAAA] mt-0.5">
              Zasoby marki Kuchciak Budownictwo
            </p>
          </div>

          <div className="grid grid-cols-3 divide-x divide-[#F5F5F5]">
            {brandAssets.map((asset) => {
              const Icon = asset.icon;
              return (
                <div
                  key={asset.label}
                  className="p-5 hover:bg-[#FAFAFA] transition-colors duration-150 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center mb-3 group-hover:border-[#CCCCCC] transition-colors duration-150">
                    <Icon size={16} strokeWidth={1.75} color="#555555" />
                  </div>
                  <p className="font-sans text-[13px] font-medium text-[#111111]">
                    {asset.label}
                  </p>
                  <p className="font-sans text-[11px] text-[#AAAAAA] mt-0.5">
                    {asset.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

    </div>
  );
}
