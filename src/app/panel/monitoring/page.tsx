"use client";

import { motion } from "framer-motion";
import { Shield, Eye, MonitorSmartphone, Globe } from "lucide-react";

// 30-day uptime: 1 = up, 0.5 = degraded, 0 = down
const uptimeDays = [
  1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

const vitals = [
  { label: "LCP", fullLabel: "Largest Contentful Paint", value: "1.2s",  target: "< 2.5s", percent: 48 },
  { label: "INP", fullLabel: "Interaction to Next Paint",  value: "85ms", target: "< 200ms", percent: 42 },
  { label: "CLS", fullLabel: "Cumulative Layout Shift",    value: "0.02", target: "< 0.1",   percent: 20 },
];

const lighthouseHistory = [
  { date: "Sty", perf: 88, acc: 95, bp: 92,  seo: 100 },
  { date: "Lut", perf: 90, acc: 95, bp: 92,  seo: 100 },
  { date: "Mar", perf: 91, acc: 96, bp: 95,  seo: 100 },
  { date: "Kwi", perf: 94, acc: 97, bp: 95,  seo: 100 },
];

const quickStats = [
  { icon: Eye,              label: "Czas odpowiedzi", value: "142ms",   sub: "średnia z 7 dni" },
  { icon: MonitorSmartphone, label: "Mobile score",   value: "91/100",  sub: "PageSpeed Insights" },
  { icon: Globe,            label: "SSL certyfikat",  value: "Aktywny", sub: "ważny do 15 lip 2026" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

// Delta between last two rows for the latest month indicator
function getDelta(arr: typeof lighthouseHistory, key: keyof Omit<typeof lighthouseHistory[0], "date">) {
  const len = arr.length;
  if (len < 2) return 0;
  return arr[len - 1][key] - arr[len - 2][key];
}

export default function MonitoringPage() {
  const uptimePercent = ((uptimeDays.filter((d) => d === 1).length / uptimeDays.length) * 100).toFixed(1);
  const degradedCount = uptimeDays.filter((d) => d === 0.5).length;

  return (
    <div className="max-w-[1060px] flex flex-col gap-5">

      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <h1 className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111]">
          Monitoring & Uptime
        </h1>
        <p className="font-sans text-[14px] text-[#888888] mt-0.5">
          kuchciak-budownictwo.pl — dane w czasie rzeczywistym
        </p>
      </motion.div>

      {/* ── Uptime hero — intentionally dark, one deliberate use ── */}
      <motion.div {...fadeUp(0.05)}>
        <div className="rounded-xl bg-[#111111] p-6">

          {/* Status row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/[0.07] border border-white/10 flex items-center justify-center">
                <Shield size={18} strokeWidth={1.75} color="rgba(255,255,255,0.6)" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {/* Calm static dot — no pulsing, no color */}
                  <span className="w-2 h-2 rounded-full bg-white/70" />
                  <span className="font-sans text-[14px] font-medium text-white/80">
                    Strona działa poprawnie
                  </span>
                </div>
                <p className="font-sans text-[12px] text-white/30 mt-0.5">
                  kuchciak-budownictwo.pl
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-display text-[40px] font-bold tracking-[-0.05em] text-white leading-none">
                {uptimePercent}%
              </p>
              <p className="font-sans text-[11px] text-white/30 mt-1">
                uptime · ostatnie 30 dni
                {degradedCount > 0 && (
                  <span className="ml-1.5 text-white/45">· {degradedCount} dzień degradacji</span>
                )}
              </p>
            </div>
          </div>

          {/* Uptime bar chart — white opacity only, no color */}
          <div className="flex items-end gap-[3px] h-[40px]">
            {uptimeDays.map((day, i) => (
              <div
                key={i}
                title={`Dzień ${i + 1}: ${day === 1 ? "OK" : day === 0.5 ? "Degraded" : "Down"}`}
                className="flex-1 rounded-[2px] transition-opacity duration-150 hover:opacity-60"
                style={{
                  height: day === 1 ? "100%" : day === 0.5 ? "65%" : "25%",
                  background: day === 1
                    ? "rgba(255,255,255,0.35)"
                    : day === 0.5
                    ? "rgba(255,255,255,0.18)"
                    : "rgba(255,255,255,0.08)",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-sans text-[10px] text-white/20">30 dni temu</span>
            <span className="font-sans text-[10px] text-white/20">Dziś</span>
          </div>
        </div>
      </motion.div>

      {/* ── Core Web Vitals ── */}
      <motion.div {...fadeUp(0.1)}>
        <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F5F5F5]">
            <h2 className="font-sans text-[13px] font-semibold text-[#111111]">
              Core Web Vitals
            </h2>
            <p className="font-sans text-[12px] text-[#AAAAAA] mt-0.5">
              Ostatni pomiar · 14 kwi 2026
            </p>
          </div>

          <div className="grid grid-cols-3 divide-x divide-[#F5F5F5]">
            {vitals.map((v) => (
              <div key={v.label} className="p-6">
                {/* Label + status — no color, one neutral badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">
                    {v.label}
                  </span>
                  <span className="font-sans text-[10px] font-semibold text-[#555555] bg-[#F5F5F5] border border-[#EBEBEB] rounded-md px-2 py-0.5">
                    Dobry
                  </span>
                </div>

                {/* Hero value */}
                <p className="font-display text-[32px] font-bold tracking-[-0.04em] text-[#111111] leading-none">
                  {v.value}
                </p>
                <p className="font-sans text-[11px] text-[#AAAAAA] mt-1 mb-4">
                  {v.fullLabel}
                </p>

                {/* Progress bar — dark fill, no color gradient */}
                <div className="h-[3px] rounded-full bg-[#F0F0F0] overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${v.percent}%` }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[#111111] rounded-full"
                  />
                </div>
                <p className="font-sans text-[11px] text-[#AAAAAA] mt-1.5">
                  Cel: {v.target}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Two-column: Lighthouse history + Quick stats ── */}
      <motion.div {...fadeUp(0.15)} className="grid grid-cols-[1fr_280px] gap-5 items-start">

        {/* Lighthouse history table */}
        <div className="rounded-xl border border-[#EBEBEB] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F5F5F5]">
            <h2 className="font-sans text-[13px] font-semibold text-[#111111]">
              Historia Lighthouse
            </h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F5F5F5]">
                {["Miesiąc", "Performance", "Accessibility", "Best Practices", "SEO"].map((h) => (
                  <th
                    key={h}
                    className={`font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA] py-3 ${
                      h === "Miesiąc" ? "text-left px-6" : "text-center px-4"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lighthouseHistory.map((row, rowIdx) => {
                const isLatest = rowIdx === lighthouseHistory.length - 1;
                const scores = [row.perf, row.acc, row.bp, row.seo] as const;
                const keys = ["perf", "acc", "bp", "seo"] as const;
                return (
                  <tr
                    key={row.date}
                    className={`border-b border-[#F7F7F7] last:border-0 ${
                      isLatest ? "bg-[#FAFAFA]" : "hover:bg-[#FAFAFA]"
                    } transition-colors duration-100`}
                  >
                    <td className="px-6 py-3.5">
                      <span className={`font-sans text-[13px] font-medium ${
                        isLatest ? "text-[#111111]" : "text-[#555555]"
                      }`}>
                        {row.date} 2026
                      </span>
                      {isLatest && (
                        <span className="ml-2 font-sans text-[10px] font-semibold text-[#AAAAAA] bg-[#F0F0F0] px-1.5 py-0.5 rounded-md">
                          Teraz
                        </span>
                      )}
                    </td>
                    {scores.map((score, i) => {
                      const delta = isLatest ? getDelta(lighthouseHistory, keys[i]) : null;
                      return (
                        <td key={i} className="text-center px-4 py-3.5">
                          <div className="inline-flex items-baseline gap-1">
                            <span className={`font-display text-[15px] font-bold tracking-tight ${
                              isLatest ? "text-[#111111]" : "text-[#888888]"
                            }`}>
                              {score}
                            </span>
                            {delta !== null && delta > 0 && (
                              <span className="font-sans text-[10px] font-semibold text-[#888888]">
                                +{delta}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Quick stats — vertical stack */}
        <div className="flex flex-col gap-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              >
                {/* Neutral icon container */}
                <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center mb-3">
                  <Icon size={15} strokeWidth={1.75} color="#555555" />
                </div>
                <p className="font-display text-[22px] font-bold tracking-[-0.04em] text-[#111111] leading-none">
                  {stat.value}
                </p>
                <p className="font-sans text-[12px] font-medium text-[#555555] mt-1">
                  {stat.label}
                </p>
                <p className="font-sans text-[11px] text-[#AAAAAA] mt-0.5">
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
}
