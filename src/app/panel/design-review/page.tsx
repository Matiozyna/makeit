"use client";

import { useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
import DesignViewer from "@/components/panel/design-review/DesignViewer";
import ReviewSidebar from "@/components/panel/design-review/ReviewSidebar";

const versionImages = [
  "/portfolio/kuchciak.webp",
  "/portfolio/kuchciakoze.webp",
  "/portfolio/kuchciak.webp",
];

const versionNames = [
  "Strona Główna — v1 (odrzucona)",
  "Strona Główna — v2 (poprawki)",
  "Strona Główna — v3 (w review)",
];

const statusMap = [
  { label: "Odrzucona", className: "bg-red-50 text-red-700 border-red-200" },
  { label: "Poprawki", className: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "W review", className: "bg-violet-50 text-violet-700 border-violet-200" },
];

export default function DesignReviewPage() {
  const [activeVersion, setActiveVersion] = useState(2);
  const [approved, setApproved] = useState(false);

  const handleApprove = useCallback(() => {
    setApproved(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7, x: 0.5 },
      colors: ["#4EA8FF", "#6B4EFF", "#9B66FF", "#34D399", "#F59E0B"],
    });
  }, []);

  const status = statusMap[activeVersion];

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      {/* Topbar */}
      <div className="h-[56px] bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <a
            href="/panel"
            className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-[#6B7280] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
            Wróć
          </a>
          <div className="w-px h-4 bg-[#E5E7EB]" />
          <span className="font-sans text-[14px] font-medium text-[#111111]">
            {versionNames[activeVersion]}
          </span>
        </div>
        <span
          className={`inline-flex items-center font-sans text-[11px] font-semibold border rounded-full px-2.5 py-1 ${
            approved
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : status.className
          }`}
        >
          {approved ? "Zatwierdzona" : status.label}
        </span>
      </div>

      {/* Main content: viewer + sidebar */}
      <div className="flex flex-1 min-h-0">
        <DesignViewer
          src={versionImages[activeVersion]}
          alt={versionNames[activeVersion]}
        />
        <ReviewSidebar
          activeVersion={activeVersion}
          onVersionChange={setActiveVersion}
          onApprove={handleApprove}
          approved={approved}
        />
      </div>
    </div>
  );
}
