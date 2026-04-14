"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

// Mock sparkline data
const uptimeData = [
  { v: 100 }, { v: 99.8 }, { v: 100 }, { v: 99.9 }, { v: 100 },
  { v: 99.7 }, { v: 100 }, { v: 100 }, { v: 99.9 }, { v: 100 },
];
const perfData = [
  { v: 88 }, { v: 90 }, { v: 87 }, { v: 92 }, { v: 91 },
  { v: 93 }, { v: 90 }, { v: 94 }, { v: 93 }, { v: 94 },
];
const deadlineData = [
  { v: 28 }, { v: 26 }, { v: 24 }, { v: 22 }, { v: 20 },
  { v: 18 }, { v: 17 }, { v: 16 }, { v: 15 }, { v: 14 },
];
const phaseData = [
  { v: 1 }, { v: 1 }, { v: 1 }, { v: 2 }, { v: 2 },
  { v: 2 }, { v: 2 }, { v: 2 }, { v: 2 }, { v: 2 },
];

function useCountUp(end: number, duration = 1000, delay = 100) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const ran = useRef(false);

  useEffect(() => {
    if (!inView || ran.current || end === 0) return;
    ran.current = true;
    const t = setTimeout(() => {
      const s = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - s) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(e * end);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [inView, end, duration, delay]);

  return { ref, val };
}

interface StatProps {
  label: string;
  value: string;
  sub: string;
  data: { v: number }[];
  numEnd: number;
  numSuffix?: string;
  isText?: boolean;
  textValue?: string;
}

function StatCard({ label, sub, data, numEnd, numSuffix = "", isText, textValue }: StatProps) {
  const { ref, val } = useCountUp(numEnd, 900, 150);

  const display = isText
    ? textValue
    : `${numEnd % 1 !== 0 ? val.toFixed(1) : Math.round(val)}${numSuffix}`;

  return (
    <div
      ref={ref}
      className="rounded-xl border border-[#EBEBEB] bg-white p-5 flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:border-[#CCCCCC] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200"
    >
      <div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-[#BBBBBB] mb-2.5">
          {label}
        </p>
        <p className="font-display text-[26px] font-bold tracking-[-0.04em] text-[#111111] leading-none mb-1">
          {display}
        </p>
        <p className="font-sans text-[11px] text-[#BBBBBB]">{sub}</p>
      </div>

      {/* Sparkline */}
      <div className="mt-4 h-[36px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#AAAAAA"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={true}
            />
            <Tooltip
              contentStyle={{
                background: "#111111",
                border: "none",
                borderRadius: "6px",
                padding: "4px 8px",
                fontSize: "11px",
                color: "#ffffff",
              }}
              itemStyle={{ color: "#ffffff", fontSize: "11px" }}
              labelFormatter={() => ""}
              formatter={(val) => [val ?? 0, ""]}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function QuickStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard label="Uptime" value="99.9%" sub="ostatnie 30 dni" data={uptimeData} numEnd={99.9} numSuffix="%" />
      <StatCard label="Performance" value="94/100" sub="Lighthouse score" data={perfData} numEnd={94} numSuffix="/100" />
      <StatCard label="Faza projektu" value="Design" sub="Etap 2 z 5" data={phaseData} numEnd={0} isText textValue="Design" />
      <StatCard label="Do deadline" value="14 dni" sub="28 kwi 2026" data={deadlineData} numEnd={14} numSuffix=" dni" />
    </div>
  );
}
