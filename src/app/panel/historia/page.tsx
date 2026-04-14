"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Palette, FileText, MessageSquare, Layers, Zap } from "lucide-react";

type DecisionType = "approval" | "color" | "document" | "message" | "design" | "launch";

interface Decision {
  id: string;
  type: DecisionType;
  title: string;
  description: string;
  author: string;
  authorInitials: string;
  authorGradient: string;
  date: string;
  link?: string;
}

const typeConfig: Record<DecisionType, { icon: typeof Check; bg: string; border: string; text: string }> = {
  approval: { icon: Check, bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600" },
  color: { icon: Palette, bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-600" },
  document: { icon: FileText, bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-600" },
  message: { icon: MessageSquare, bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600" },
  design: { icon: Layers, bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600" },
  launch: { icon: Zap, bg: "bg-fuchsia-50", border: "border-fuchsia-200", text: "text-fuchsia-600" },
};

const allFilters = ["Wszystkie", "Zatwierdzenia", "Design", "Dokumenty", "Komunikacja"] as const;

const decisions: Decision[] = [
  { id: "1", type: "approval", title: "Logo v3 zatwierdzone", description: "Wersja 3 logo Kuchciak Budownictwo zatwierdzona przez klienta. Przekazane do wdrożenia.", author: "Kuchciak Budownictwo", authorInitials: "KB", authorGradient: "from-[#4EA8FF] to-[#6B4EFF]", date: "14 kwi 2026", link: "/panel/design-review" },
  { id: "2", type: "color", title: "Paleta kolorów wybrana", description: "Granatowy #1B3A6B jako kolor główny, pomarańczowy #F97316 jako akcent. Zatwierdzone przez obie strony.", author: "Mateusz B.", authorInitials: "MB", authorGradient: "from-[#6B4EFF] to-[#4EA8FF]", date: "12 kwi 2026" },
  { id: "3", type: "design", title: "Mockupy 3 podstron dodane", description: "Podstrony /uslugi, /o-nas, /kontakt gotowe do przeglądu w Design Review.", author: "Mateusz B.", authorInitials: "MB", authorGradient: "from-[#6B4EFF] to-[#4EA8FF]", date: "11 kwi 2026", link: "/panel/design-review" },
  { id: "4", type: "document", title: "Kontrakt podpisany", description: "Umowa na realizację strony internetowej podpisana elektronicznie przez obie strony.", author: "Kuchciak Budownictwo", authorInitials: "KB", authorGradient: "from-[#4EA8FF] to-[#6B4EFF]", date: "8 kwi 2026", link: "/panel/pliki" },
  { id: "5", type: "approval", title: "Brief zaakceptowany", description: "Brief projektowy z wymaganiami, zakresem prac i harmonogramem zatwierdzony.", author: "Kuchciak Budownictwo", authorInitials: "KB", authorGradient: "from-[#4EA8FF] to-[#6B4EFF]", date: "7 kwi 2026" },
  { id: "6", type: "message", title: "Ustalono styl fotografii", description: "Zdecydowano: zdjęcia realizacji w stylu dokumentalnym, naturalne światło, bez filtrów.", author: "Mateusz B.", authorInitials: "MB", authorGradient: "from-[#6B4EFF] to-[#4EA8FF]", date: "6 kwi 2026" },
  { id: "7", type: "design", title: "Typografia zatwierdzona", description: "Inter jako font główny, Cabinet Grotesk dla nagłówków. Hierarchia rozmiarów ustalona.", author: "Mateusz B.", authorInitials: "MB", authorGradient: "from-[#6B4EFF] to-[#4EA8FF]", date: "5 kwi 2026" },
  { id: "8", type: "launch", title: "Projekt rozpoczęty", description: "Kick-off meeting zrealizowany. Discovery phase rozpoczęta. Cele i KPI ustalone.", author: "make it", authorInitials: "MI", authorGradient: "from-[#4EA8FF] to-[#9B66FF]", date: "4 kwi 2026" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function HistoriaPage() {
  const [filter, setFilter] = useState<(typeof allFilters)[number]>("Wszystkie");

  const filtered = filter === "Wszystkie"
    ? decisions
    : decisions.filter((d) => {
        if (filter === "Zatwierdzenia") return d.type === "approval";
        if (filter === "Design") return d.type === "design" || d.type === "color";
        if (filter === "Dokumenty") return d.type === "document";
        if (filter === "Komunikacja") return d.type === "message";
        return true;
      });

  return (
    <div className="max-w-[900px] flex flex-col gap-6">
      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-1">
          Pełna historia Twojego projektu
        </p>
        <h1 className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111]">
          Historia decyzji
        </h1>
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeUp(0.04)} className="flex gap-1.5">
        {allFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-sans text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              f === filter
                ? "bg-[#111111] text-white shadow-sm"
                : "text-[#6B7280] bg-white border border-[#E5E7EB] hover:border-[#D0D4DB] hover:text-[#111111]"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Timeline */}
      <motion.div {...fadeUp(0.08)} className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-[#E5E7EB] via-[#E5E7EB] to-transparent" />

        <div className="flex flex-col gap-0">
          {filtered.map((decision, i) => {
            const config = typeConfig[decision.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={decision.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.08 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-14 pb-8 last:pb-0 group"
              >
                {/* Icon node */}
                <div className={`absolute left-0 top-0 w-[38px] h-[38px] rounded-[10px] ${config.bg} border ${config.border} flex items-center justify-center z-10 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-200`}>
                  <Icon className={`w-4 h-4 ${config.text}`} strokeWidth={2} />
                </div>

                {/* Card */}
                <div className="rounded-[16px] border border-[#E5E7EB] bg-white p-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#D0D4DB] transition-all duration-200">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="font-sans text-[15px] font-medium text-[#111111]">{decision.title}</h3>
                    <span className="font-sans text-[12px] text-[#9CA3AF] whitespace-nowrap shrink-0">{decision.date}</span>
                  </div>
                  <p className="font-sans text-[13px] text-[#6B7280] leading-relaxed mb-3">
                    {decision.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${decision.authorGradient} flex items-center justify-center`}>
                        <span className="font-sans text-[8px] font-semibold text-white">{decision.authorInitials}</span>
                      </div>
                      <span className="font-sans text-[12px] text-[#9CA3AF]">{decision.author}</span>
                    </div>
                    {decision.link && (
                      <a
                        href={decision.link}
                        className="font-sans text-[12px] font-medium text-[#4EA8FF] hover:text-[#6B4EFF] transition-colors duration-200"
                      >
                        Zobacz szczegóły →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
