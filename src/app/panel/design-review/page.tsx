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
  "Strona Główna — v1",
  "Strona Główna — v2",
  "Strona Główna — v3",
];

const statusMap = [
  { label: "Odrzucona" },
  { label: "Poprawki" },
  { label: "W review" },
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
      colors: ["#111111", "#555555", "#AAAAAA", "#DDDDDD"],
    });
  }, []);

  const status = statusMap[activeVersion];

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Contextual topbar */}
      <div className="h-[48px] bg-white border-b border-[#EBEBEB] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <a
            href="/panel"
            className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-[#AAAAAA] hover:text-[#111111] transition-colors duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
            Wróć
          </a>
          <div className="w-px h-4 bg-[#EBEBEB]" />
          <span className="font-sans text-[13px] font-medium text-[#111111]">
            {versionNames[activeVersion]}
          </span>
        </div>

        {/* Status badge — neutral, no color */}
        <span
          className={`inline-flex items-center font-sans text-[11px] font-semibold border rounded-md px-2.5 py-1 ${
            approved
              ? "bg-[#111111] text-white border-[#111111]"
              : activeVersion === 2
              ? "bg-[#111111] text-white border-[#111111]"
              : "bg-[#F5F5F5] text-[#555555] border-[#EBEBEB]"
          }`}
        >
          {approved ? "Zatwierdzona" : status.label}
        </span>
      </div>

      {/* Viewer + sidebar */}
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
