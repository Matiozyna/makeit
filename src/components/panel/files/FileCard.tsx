"use client";

import { Download, Eye } from "lucide-react";
import { motion } from "framer-motion";

const typeConfig: Record<string, { bg: string; border: string; text: string; label: string }> = {
  svg: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-600", label: "SVG" },
  pdf: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-600", label: "PDF" },
  webp: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", label: "WEBP" },
  png: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", label: "PNG" },
  jpg: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", label: "JPG" },
  zip: { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-600", label: "ZIP" },
  figma: { bg: "bg-fuchsia-50", border: "border-fuchsia-200", text: "text-fuchsia-600", label: "FIG" },
};

interface FileCardProps {
  name: string;
  type: string;
  size: string;
  date: string;
  isNew?: boolean;
  preview?: string;
}

export default function FileCard({ name, type, size, date, isNew, preview }: FileCardProps) {
  const config = typeConfig[type] || typeConfig.pdf;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] border border-[#E5E7EB] bg-white overflow-hidden cursor-pointer
                 shadow-[0_1px_3px_rgba(0,0,0,0.04)]
                 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10),0_8px_20px_rgba(0,0,0,0.06)]
                 hover:border-[#D0D4DB] transition-shadow duration-300"
    >
      {/* New badge */}
      {isNew && (
        <div className="absolute top-3 right-3 z-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </div>
      )}

      {/* Preview area */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#F8FAFC] to-[#F0F4F8] flex items-center justify-center overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt={name}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
          />
        ) : (
          <>
            {/* Ambient decoration */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-[#4EA8FF] blur-[50px]" />
            </div>
            {/* Type badge large */}
            <div className={`relative w-16 h-16 rounded-[14px] ${config.bg} border ${config.border} flex items-center justify-center backdrop-blur-sm`}>
              <span className={`font-display text-[18px] font-bold tracking-[-0.02em] ${config.text}`}>
                {config.label}
              </span>
            </div>
          </>
        )}

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
          <button className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#111111] font-sans text-[12px] font-medium px-3.5 py-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-white transition-colors">
            <Eye className="w-3.5 h-3.5" strokeWidth={2} />
            Podgląd
          </button>
          <button className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#111111] font-sans text-[12px] font-medium px-3.5 py-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-white transition-colors">
            <Download className="w-3.5 h-3.5" strokeWidth={2} />
            Pobierz
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-medium text-[#111111] truncate leading-snug">
              {name}
            </p>
            <p className="font-sans text-[11px] text-[#9CA3AF] mt-0.5">
              {size} · {date}
            </p>
          </div>
          <span className={`shrink-0 font-sans text-[10px] font-semibold ${config.text} ${config.bg} border ${config.border} rounded-full px-2 py-0.5`}>
            {config.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
