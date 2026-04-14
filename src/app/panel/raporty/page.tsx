"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Globe, MousePointerClick, Search } from "lucide-react";

const topKeywords = [
  { keyword: "firma budowlana kraków",      page: "/",           position: 3,  prev: 5,  change: 2,  volume: 1200, ctr: 24 },
  { keyword: "budownictwo kraków",           page: "/uslugi",    position: 5,  prev: 4,  change: -1, volume: 880,  ctr: 15 },
  { keyword: "kuchciak budownictwo",         page: "/",           position: 1,  prev: 1,  change: 0,  volume: 320,  ctr: 85 },
  { keyword: "budowa domów kraków",          page: "/realizacje", position: 8,  prev: 12, change: 4,  volume: 720,  ctr: 8  },
  { keyword: "generalny wykonawca kraków",   page: "/uslugi",    position: 12, prev: 15, change: 3,  volume: 540,  ctr: 4  },
  { keyword: "remont domu kraków",           page: "/realizacje", position: 15, prev: 13, change: -2, volume: 960,  ctr: 3  },
];

const trafficStats = [
  { icon: Globe,             label: "Sesje organiczne", value: "2 847", sub: "↑ +434 vs poprzedni msc" },
  { icon: MousePointerClick, label: "Kliknięcia GSC",   value: "1 203", sub: "↑ +233 vs poprzedni msc" },
  { icon: Search,            label: "Wyświetlenia",     value: "18 400", sub: "↑ +2 000 vs poprzedni msc" },
];

const topPages = [
  { page: "/",           title: "Strona główna",  clicks: 342, impressions: 4200 },
  { page: "/realizacje", title: "Realizacje",     clicks: 187, impressions: 2800 },
  { page: "/uslugi",     title: "Usługi",         clicks: 156, impressions: 3100 },
  { page: "/kontakt",    title: "Kontakt",         clicks: 98,  impressions: 1400 },
  { page: "/o-nas",      title: "O nas",           clicks: 67,  impressions: 890  },
];

const recommendations = [
  {
    n: "01",
    impact: "Wysoki",
    title: "Dodaj meta opisy do 3 podstron",
    description: "/realizacje, /kontakt i /cennik nie mają meta description. Szacowany efekt: +8–15% CTR.",
  },
  {
    n: "02",
    impact: "Średni",
    title: "Dodaj alt text do 8 zdjęć",
    description: "Galeria realizacji — brak opisów alternatywnych. Google nie indeksuje tych zdjęć.",
  },
  {
    n: "03",
    impact: "Niski",
    title: "Rozważ blog z case studies",
    description: "Regularne publikacje zwiększą ruch organiczny o ~30% w 6 miesięcy.",
  },
];

const months = ["Lut", "Mar", "Kwi"];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function RaportyPage() {
  const [activeMonth, setActiveMonth] = useState(2);

  const improved = topKeywords.filter((k) => k.change > 0).length;
  const declined = topKeywords.filter((k) => k.change < 0).length;

  return (
    <div className="max-w-[1060px] flex flex-col gap-5">

      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111]">
            Raport SEO
          </h1>
          <p className="font-sans text-[14px] text-[#888888] mt-0.5">
            {improved} słów kluczowych wzrosło · {declined} spadło · kwiecień 2026
          </p>
        </div>
        {/* Period switcher */}
        <div className="flex gap-0.5 bg-[#F0F0F0] rounded-lg p-0.5">
          {months.map((m, i) => (
            <button
              key={m}
              onClick={() => setActiveMonth(i)}
              className={`font-sans text-[13px] font-medium px-4 py-1.5 rounded-md transition-all duration-150 ${
                i === activeMonth
                  ? "bg-white text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-[#888888] hover:text-[#111111]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Traffic stats — one card, three panels */}
      <motion.div {...fadeUp(0.05)}>
        <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-[#F5F5F5]">
            {trafficStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="px-6 py-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center">
                      <Icon size={14} strokeWidth={1.75} color="#555555" />
                    </div>
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">
                      {stat.label}
                    </span>
                  </div>
                  <p className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111] leading-none">
                    {stat.value}
                  </p>
                  <p className="font-sans text-[12px] text-[#555555] mt-1.5">
                    {stat.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Keywords table */}
      <motion.div {...fadeUp(0.1)}>
        <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F5F5F5] flex items-center justify-between">
            <h2 className="font-sans text-[13px] font-semibold text-[#111111]">
              Top słowa kluczowe
            </h2>
            <span className="font-sans text-[11px] text-[#AAAAAA]">
              Google Search Console · kwi 2026
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F5F5F5]">
                {[
                  { label: "Słowo kluczowe", align: "left",  cls: "pl-6" },
                  { label: "Podstrona",       align: "left",  cls: "px-4" },
                  { label: "Pozycja",         align: "center",cls: "px-4" },
                  { label: "Zmiana",          align: "center",cls: "px-4" },
                  { label: "CTR",             align: "center",cls: "px-4" },
                  { label: "Wyszukiwania",    align: "right", cls: "pr-6" },
                ].map(({ label, align, cls }) => (
                  <th
                    key={label}
                    className={`font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA] py-3 ${cls} text-${align}`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topKeywords.map((kw) => {
                const isTop3 = kw.position <= 3;
                const isTop10 = kw.position <= 10;
                return (
                  <tr
                    key={kw.keyword}
                    className="border-b border-[#F7F7F7] last:border-0 hover:bg-[#FAFAFA] transition-colors duration-100"
                  >
                    {/* Keyword */}
                    <td className="pl-6 py-3.5 font-sans text-[13px] font-medium text-[#111111]">
                      {kw.keyword}
                    </td>

                    {/* Page */}
                    <td className="px-4 py-3.5">
                      <span className="font-sans text-[11px] font-medium text-[#AAAAAA] bg-[#F5F5F5] px-2 py-0.5 rounded-md">
                        {kw.page}
                      </span>
                    </td>

                    {/* Position — size encodes rank */}
                    <td className="px-4 py-3.5 text-center">
                      <span className={`font-display font-bold tracking-tight ${
                        isTop3
                          ? "text-[18px] text-[#111111]"
                          : isTop10
                          ? "text-[15px] text-[#444444]"
                          : "text-[14px] text-[#888888]"
                      }`}>
                        {kw.position}
                      </span>
                    </td>

                    {/* Change */}
                    <td className="px-4 py-3.5 text-center">
                      {kw.change > 0 ? (
                        <span className="inline-flex items-center gap-0.5 font-sans text-[12px] font-semibold text-[#333333]">
                          <TrendingUp size={12} strokeWidth={2.5} />
                          +{kw.change}
                        </span>
                      ) : kw.change < 0 ? (
                        <span className="inline-flex items-center gap-0.5 font-sans text-[12px] font-medium text-[#AAAAAA]">
                          <TrendingDown size={12} strokeWidth={2} />
                          {kw.change}
                        </span>
                      ) : (
                        <span className="font-sans text-[12px] text-[#DDDDDD]">
                          <Minus size={12} strokeWidth={2} />
                        </span>
                      )}
                    </td>

                    {/* CTR */}
                    <td className="px-4 py-3.5 text-center">
                      <span className="font-sans text-[13px] font-medium text-[#555555]">
                        {kw.ctr}%
                      </span>
                    </td>

                    {/* Volume */}
                    <td className="pr-6 py-3.5 text-right font-sans text-[13px] text-[#888888]">
                      {kw.volume.toLocaleString("pl-PL")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Bottom row: Recommendations + Top pages */}
      <motion.div {...fadeUp(0.15)} className="grid grid-cols-[1fr_300px] gap-5 items-start">

        {/* Recommendations */}
        <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F5F5F5]">
            <h2 className="font-sans text-[13px] font-semibold text-[#111111]">
              Rekomendacje
            </h2>
            <p className="font-sans text-[12px] text-[#AAAAAA] mt-0.5">
              Priorytetyzowane działania SEO na maj 2026
            </p>
          </div>
          <ul className="divide-y divide-[#F7F7F7]">
            {recommendations.map((rec) => (
              <li key={rec.n} className="flex items-start gap-4 px-6 py-4 hover:bg-[#FAFAFA] transition-colors duration-100">
                {/* Priority number */}
                <span className="shrink-0 font-display text-[18px] font-bold tracking-tight text-[#EBEBEB] w-6 text-right leading-tight mt-0.5">
                  {rec.n}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-sans text-[13px] font-semibold text-[#111111]">
                      {rec.title}
                    </p>
                    <span className="font-sans text-[10px] font-semibold text-[#AAAAAA] bg-[#F5F5F5] border border-[#EBEBEB] rounded-md px-1.5 py-0.5 shrink-0">
                      {rec.impact}
                    </span>
                  </div>
                  <p className="font-sans text-[12px] text-[#888888] leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Top organic pages */}
        <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F5F5F5]">
            <h2 className="font-sans text-[13px] font-semibold text-[#111111]">
              Top stron organicznych
            </h2>
          </div>
          <ul className="divide-y divide-[#F7F7F7]">
            {topPages.map((p, i) => {
              const maxClicks = topPages[0].clicks;
              const barW = Math.round((p.clicks / maxClicks) * 100);
              return (
                <li key={p.page} className="px-5 py-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-sans text-[11px] font-bold text-[#DDDDDD] w-4 shrink-0">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-sans text-[12px] font-semibold text-[#111111] truncate">
                          {p.title}
                        </p>
                        <p className="font-sans text-[10px] text-[#AAAAAA]">{p.page}</p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right ml-2">
                      <p className="font-display text-[14px] font-bold text-[#111111]">
                        {p.clicks}
                      </p>
                      <p className="font-sans text-[10px] text-[#AAAAAA]">kliknięć</p>
                    </div>
                  </div>
                  {/* Click share bar */}
                  <div className="h-[2px] w-full rounded-full bg-[#F0F0F0] overflow-hidden">
                    <div
                      className="h-full bg-[#111111] rounded-full"
                      style={{ width: `${barW}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

      </motion.div>
    </div>
  );
}
