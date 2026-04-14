"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Clock, Eye, MonitorSmartphone, Globe } from "lucide-react";

// 30-day uptime mock: 1 = up, 0.5 = degraded, 0 = down
const uptimeDays = [
  1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

const vitals = [
  {
    label: "LCP",
    fullLabel: "Largest Contentful Paint",
    value: "1.2s",
    status: "good" as const,
    target: "< 2.5s",
    percent: 48,
  },
  {
    label: "INP",
    fullLabel: "Interaction to Next Paint",
    value: "85ms",
    status: "good" as const,
    target: "< 200ms",
    percent: 42,
  },
  {
    label: "CLS",
    fullLabel: "Cumulative Layout Shift",
    value: "0.02",
    status: "good" as const,
    target: "< 0.1",
    percent: 20,
  },
];

const statusColor = {
  good: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", bar: "from-emerald-400 to-emerald-500" },
  warning: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", bar: "from-amber-400 to-amber-500" },
  poor: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", bar: "from-rose-400 to-rose-500" },
};

const lighthouseHistory = [
  { date: "Sty", perf: 88, acc: 95, bp: 92, seo: 100 },
  { date: "Lut", perf: 90, acc: 95, bp: 92, seo: 100 },
  { date: "Mar", perf: 91, acc: 96, bp: 95, seo: 100 },
  { date: "Kwi", perf: 94, acc: 97, bp: 95, seo: 100 },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function MonitoringPage() {
  const uptimePercent = ((uptimeDays.filter(d => d === 1).length / uptimeDays.length) * 100).toFixed(1);

  return (
    <div className="max-w-[1200px] flex flex-col gap-6">
      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-1">
          Twoja strona w czasie rzeczywistym
        </p>
        <h1 className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111]">
          Monitoring & Uptime
        </h1>
      </motion.div>

      {/* Uptime hero */}
      <motion.div {...fadeUp(0.06)}>
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0F0F1A] via-[#111827] to-[#0F172A] p-8">
          {/* Ambient */}
          <div className="absolute top-0 right-0 w-[350px] h-[250px] opacity-15 pointer-events-none">
            <div className="absolute top-8 right-16 w-[200px] h-[200px] rounded-full bg-emerald-400 blur-[100px]" />
          </div>
          <div className="absolute bottom-0 left-0 w-[250px] h-[200px] opacity-10 pointer-events-none">
            <div className="absolute bottom-4 left-8 w-[150px] h-[150px] rounded-full bg-[#4EA8FF] blur-[80px]" />
          </div>

          <div className="relative flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[14px] bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" strokeWidth={1.75} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-sans text-[14px] font-medium text-emerald-400">Strona działa poprawnie</span>
                </div>
                <p className="font-sans text-[13px] text-white/40 mt-0.5">kuchciak-budownictwo.pl</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-display text-[36px] font-bold tracking-[-0.04em] text-white">{uptimePercent}%</p>
              <p className="font-sans text-[12px] text-white/40">uptime — ostatnie 30 dni</p>
            </div>
          </div>

          {/* Bar chart */}
          <div className="relative flex items-end gap-[3px] h-[48px]">
            {uptimeDays.map((day, i) => (
              <div
                key={i}
                className={`flex-1 rounded-[3px] transition-all duration-200 hover:opacity-80 ${
                  day === 1
                    ? "bg-emerald-400/60 h-full"
                    : day === 0.5
                    ? "bg-amber-400/60 h-[70%]"
                    : "bg-rose-400/60 h-[30%]"
                }`}
                title={`Dzień ${i + 1}: ${day === 1 ? "OK" : day === 0.5 ? "Degraded" : "Down"}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-sans text-[10px] text-white/25">30 dni temu</span>
            <span className="font-sans text-[10px] text-white/25">Dziś</span>
          </div>
        </div>
      </motion.div>

      {/* Core Web Vitals */}
      <motion.div {...fadeUp(0.12)}>
        <h2 className="font-display text-[18px] font-bold tracking-[-0.04em] text-[#111111] mb-4">
          Core Web Vitals
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {vitals.map((v) => {
            const colors = statusColor[v.status];
            return (
              <div
                key={v.label}
                className="rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-display text-[13px] font-bold ${colors.text} ${colors.bg} border ${colors.border} rounded-full px-2.5 py-0.5`}>
                    {v.label}
                  </span>
                  <span className={`font-sans text-[11px] font-semibold ${colors.text} ${colors.bg} border ${colors.border} rounded-full px-2 py-0.5`}>
                    Dobry
                  </span>
                </div>
                <p className="font-display text-[32px] font-bold tracking-[-0.04em] text-[#111111] leading-none">
                  {v.value}
                </p>
                <p className="font-sans text-[12px] text-[#9CA3AF] mt-1 mb-3">{v.fullLabel}</p>
                <div className="h-1.5 rounded-full bg-[#F0F2F5] overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${v.percent}%` }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
                  />
                </div>
                <p className="font-sans text-[11px] text-[#BBBBBB] mt-1.5">Cel: {v.target}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Lighthouse history */}
      <motion.div {...fadeUp(0.18)}>
        <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
          <h2 className="font-display text-[18px] font-bold tracking-[-0.04em] text-[#111111] mb-5">
            Historia Lighthouse
          </h2>
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] text-left py-3 pr-4">Miesiąc</th>
                  <th className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] text-center py-3 px-4">Performance</th>
                  <th className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] text-center py-3 px-4">Accessibility</th>
                  <th className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] text-center py-3 px-4">Best Practices</th>
                  <th className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] text-center py-3 pl-4">SEO</th>
                </tr>
              </thead>
              <tbody>
                {lighthouseHistory.map((row) => (
                  <tr key={row.date} className="border-b border-[#F0F2F5] last:border-0 hover:bg-[#FAFBFC] transition-colors">
                    <td className="font-sans text-[14px] font-medium text-[#111111] py-3.5 pr-4">{row.date} 2026</td>
                    {[row.perf, row.acc, row.bp, row.seo].map((score, i) => (
                      <td key={i} className="text-center py-3.5 px-4">
                        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-display text-[14px] font-bold ${
                          score >= 90
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : score >= 50
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}>
                          {score}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Quick stats row */}
      <motion.div {...fadeUp(0.24)} className="grid grid-cols-3 gap-4">
        {[
          { icon: Eye, label: "Czas odpowiedzi", value: "142ms", sub: "średnia z 7 dni", gradient: "from-[#4EA8FF] to-[#6B4EFF]" },
          { icon: MonitorSmartphone, label: "Mobile score", value: "91/100", sub: "PageSpeed Insights", gradient: "from-[#6B4EFF] to-[#9B66FF]" },
          { icon: Globe, label: "SSL certyfikat", value: "Aktywny", sub: "ważny do 15 lip 2026", gradient: "from-[#34D399] to-[#10B981]" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className={`w-9 h-9 rounded-[10px] bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-[0_4px_12px_rgba(78,168,255,0.2)]`}>
                <Icon className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <p className="font-display text-[22px] font-bold tracking-[-0.04em] text-[#111111] mt-3 leading-none">{stat.value}</p>
              <p className="font-sans text-[12px] font-medium text-[#9CA3AF] mt-1">{stat.label}</p>
              <p className="font-sans text-[11px] text-[#BBBBBB] mt-0.5">{stat.sub}</p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
