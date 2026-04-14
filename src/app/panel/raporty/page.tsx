"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, Search, MousePointerClick, Globe } from "lucide-react";

const topKeywords = [
  { keyword: "firma budowlana kraków", position: 3, change: 2, volume: 1200, trend: "up" as const },
  { keyword: "budownictwo kraków", position: 5, change: -1, volume: 880, trend: "down" as const },
  { keyword: "kuchciak budownictwo", position: 1, change: 0, volume: 320, trend: "stable" as const },
  { keyword: "budowa domów kraków", position: 8, change: 4, volume: 720, trend: "up" as const },
  { keyword: "generalny wykonawca kraków", position: 12, change: 3, volume: 540, trend: "up" as const },
  { keyword: "remont domu kraków", position: 15, change: -2, volume: 960, trend: "down" as const },
];

const trafficStats = [
  { icon: Globe, label: "Sesje", value: "2,847", change: "+18%", up: true, gradient: "from-[#4EA8FF] to-[#6B4EFF]" },
  { icon: MousePointerClick, label: "Kliknięcia GSC", value: "1,203", change: "+24%", up: true, gradient: "from-[#6B4EFF] to-[#9B66FF]" },
  { icon: Search, label: "Wyświetlenia", value: "18.4K", change: "+12%", up: true, gradient: "from-[#9B66FF] to-[#4EA8FF]" },
];

const recommendations = [
  { priority: "high" as const, title: "Dodaj meta opisy do 3 podstron", description: "/realizacje, /kontakt i /cennik nie mają zoptymalizowanych meta description." },
  { priority: "medium" as const, title: "Dodaj alt text do 8 zdjęć", description: "Zdjęcia realizacji w galerii nie mają opisów alternatywnych." },
  { priority: "low" as const, title: "Rozważ blog z case studies", description: "Regularne publikacje zwiększą ruch organiczny o ~30% w 6 miesięcy." },
];

const priorityConfig = {
  high: { label: "Wysoki", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  medium: { label: "Średni", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  low: { label: "Niski", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function RaportyPage() {
  return (
    <div className="max-w-[1200px] flex flex-col gap-6">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-end justify-between">
        <div>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-1">
            Raport za kwiecień 2026
          </p>
          <h1 className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111]">
            Raport SEO
          </h1>
        </div>
        <div className="flex gap-1.5">
          {["Lut", "Mar", "Kwi"].map((m, i) => (
            <button
              key={m}
              className={`font-sans text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                i === 2
                  ? "bg-[#111111] text-white shadow-sm"
                  : "text-[#6B7280] bg-white border border-[#E5E7EB] hover:border-[#D0D4DB]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Traffic stats */}
      <motion.div {...fadeUp(0.06)} className="grid grid-cols-3 gap-4">
        {trafficStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-[10px] bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-[0_4px_12px_rgba(78,168,255,0.2)]`}>
                  <Icon className="w-4.5 h-4.5 text-white" strokeWidth={1.75} />
                </div>
                <span className={`font-sans text-[12px] font-semibold ${stat.up ? "text-emerald-600" : "text-rose-600"} flex items-center gap-0.5`}>
                  <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                  {stat.change}
                </span>
              </div>
              <p className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111] leading-none">{stat.value}</p>
              <p className="font-sans text-[12px] font-medium text-[#9CA3AF] mt-1">{stat.label}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Top keywords */}
      <motion.div {...fadeUp(0.12)}>
        <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
          <h2 className="font-display text-[18px] font-bold tracking-[-0.04em] text-[#111111] mb-5">
            Top słowa kluczowe
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] text-left py-3">Słowo kluczowe</th>
                <th className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] text-center py-3">Pozycja</th>
                <th className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] text-center py-3">Zmiana</th>
                <th className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] text-right py-3">Wyszukiwania/msc</th>
              </tr>
            </thead>
            <tbody>
              {topKeywords.map((kw) => (
                <tr key={kw.keyword} className="border-b border-[#F0F2F5] last:border-0 hover:bg-[#FAFBFC] transition-colors">
                  <td className="font-sans text-[14px] font-medium text-[#111111] py-3.5">{kw.keyword}</td>
                  <td className="text-center py-3.5">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-display text-[13px] font-bold ${
                      kw.position <= 3
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : kw.position <= 10
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}>
                      {kw.position}
                    </span>
                  </td>
                  <td className="text-center py-3.5">
                    <span className={`inline-flex items-center gap-1 font-sans text-[12px] font-semibold ${
                      kw.trend === "up"
                        ? "text-emerald-600"
                        : kw.trend === "down"
                        ? "text-rose-600"
                        : "text-[#9CA3AF]"
                    }`}>
                      {kw.trend === "up" ? (
                        <><TrendingUp className="w-3 h-3" strokeWidth={2.5} />+{kw.change}</>
                      ) : kw.trend === "down" ? (
                        <><TrendingDown className="w-3 h-3" strokeWidth={2.5} />{kw.change}</>
                      ) : (
                        <><Minus className="w-3 h-3" strokeWidth={2.5} />0</>
                      )}
                    </span>
                  </td>
                  <td className="text-right py-3.5 font-sans text-[13px] text-[#6B7280]">
                    {kw.volume.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div {...fadeUp(0.18)}>
        <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
          <h2 className="font-display text-[18px] font-bold tracking-[-0.04em] text-[#111111] mb-5">
            Rekomendacje
          </h2>
          <div className="flex flex-col gap-3">
            {recommendations.map((rec) => {
              const config = priorityConfig[rec.priority];
              return (
                <div
                  key={rec.title}
                  className="flex items-start gap-4 p-4 rounded-[14px] border border-[#E5E7EB] hover:border-[#D0D4DB] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200"
                >
                  <span className={`shrink-0 font-sans text-[10px] font-semibold ${config.text} ${config.bg} border ${config.border} rounded-full px-2.5 py-1 mt-0.5`}>
                    {config.label}
                  </span>
                  <div>
                    <p className="font-sans text-[14px] font-medium text-[#111111]">{rec.title}</p>
                    <p className="font-sans text-[13px] text-[#6B7280] mt-0.5 leading-relaxed">{rec.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
