"use client";

import { useState } from "react";
import { Check, X, Send } from "lucide-react";
import VersionSwitcher from "./VersionSwitcher";

const comments = [
  {
    author: "Mateusz B.",
    initials: "MB",
    gradient: "from-[#6B4EFF] to-[#4EA8FF]",
    text: "Zaktualizowałem hero section — większy kontrast na CTA. Dajcie znać jak wygląda.",
    time: "2 godz. temu",
  },
  {
    author: "Kuchciak Budownictwo",
    initials: "KB",
    gradient: "from-[#4EA8FF] to-[#6B4EFF]",
    text: "Super, zdecydowanie lepiej. Czy możemy jeszcze powiększyć logo?",
    time: "1 godz. temu",
  },
  {
    author: "Mateusz B.",
    initials: "MB",
    gradient: "from-[#6B4EFF] to-[#4EA8FF]",
    text: "Jasne, poprawione w v3. Logo jest teraz 20% większe.",
    time: "45 min temu",
  },
];

const versionHistory = [
  { label: "v1", status: "rejected" as const, date: "8 kwi" },
  { label: "v2", status: "revised" as const, date: "11 kwi" },
  { label: "v3", status: "review" as const, date: "14 kwi" },
];

interface ReviewSidebarProps {
  activeVersion: number;
  onVersionChange: (i: number) => void;
  onApprove: () => void;
  approved: boolean;
}

export default function ReviewSidebar({
  activeVersion,
  onVersionChange,
  onApprove,
  approved,
}: ReviewSidebarProps) {
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const [newComment, setNewComment] = useState("");

  return (
    <div className="w-[380px] shrink-0 border-l border-[#E5E7EB] bg-white flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#E5E7EB]">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-2">
          Wersja
        </p>
        <VersionSwitcher
          versions={["v1", "v2", "v3"]}
          active={activeVersion}
          onSelect={onVersionChange}
        />
      </div>

      {/* Comments */}
      <div className="flex-1 overflow-auto px-6 py-5">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-3">
          Komentarze ({comments.length})
        </p>
        <div className="flex flex-col gap-4">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}
              >
                <span className="font-sans text-[9px] font-semibold text-white">
                  {c.initials}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-[13px] font-medium text-[#111111]">
                    {c.author}
                  </span>
                  <span className="font-sans text-[11px] text-[#9CA3AF]">{c.time}</span>
                </div>
                <p className="font-sans text-[13px] text-[#6B7280] leading-relaxed mt-0.5">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Version history */}
        <div className="mt-6 pt-5 border-t border-dashed border-[#E5E7EB]">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-3">
            Historia wersji
          </p>
          <div className="flex flex-col gap-2">
            {versionHistory.map((v) => (
              <div
                key={v.label}
                className="flex items-center justify-between font-sans text-[13px]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      v.status === "rejected"
                        ? "bg-[#EF4444]"
                        : v.status === "revised"
                        ? "bg-[#F59E0B]"
                        : "bg-[#6B4EFF]"
                    }`}
                  />
                  <span className="font-medium text-[#111111]">{v.label}</span>
                  <span className="text-[#9CA3AF]">
                    {v.status === "rejected"
                      ? "— odrzucona"
                      : v.status === "revised"
                      ? "— poprawki"
                      : "— w review"}
                  </span>
                </div>
                <span className="text-[#9CA3AF]">{v.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment input */}
      <div className="px-6 py-4 border-t border-[#E5E7EB]">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Dodaj komentarz..."
            className="flex-1 font-sans text-[13px] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#111111] transition-colors placeholder:text-[#BBBBBB]"
          />
          <button className="w-10 h-10 rounded-xl bg-[#111111] hover:bg-[#000000] flex items-center justify-center transition-colors shrink-0">
            <Send className="w-3.5 h-3.5 text-white" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Approval actions */}
      <div className="px-6 py-5 border-t border-[#E5E7EB] bg-[#FAFBFC]">
        {approved ? (
          <div className="flex items-center gap-3 justify-center py-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
            </div>
            <span className="font-sans text-[14px] font-medium text-emerald-700">
              Wersja zatwierdzona
            </span>
          </div>
        ) : showRevisionInput ? (
          <div className="flex flex-col gap-3">
            <textarea
              placeholder="Co chcesz zmienić?"
              rows={3}
              className="font-sans text-[13px] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#111111] transition-colors placeholder:text-[#BBBBBB] resize-none"
            />
            <div className="flex gap-2">
              <button className="flex-1 font-sans text-[13px] font-medium bg-[#111111] text-white rounded-full py-2.5 hover:bg-[#000000] transition-colors">
                Wyślij poprawki
              </button>
              <button
                onClick={() => setShowRevisionInput(false)}
                className="font-sans text-[13px] font-medium text-[#6B7280] hover:text-[#111111] px-3 transition-colors"
              >
                Anuluj
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              onClick={onApprove}
              className="w-full flex items-center justify-center gap-2 font-sans text-[14px] font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-3 shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <Check className="w-4 h-4" strokeWidth={2.5} />
              Zatwierdź tę wersję
            </button>
            <button
              onClick={() => setShowRevisionInput(true)}
              className="w-full flex items-center justify-center gap-2 font-sans text-[14px] font-medium text-[#6B7280] hover:text-[#111111] border border-[#E5E7EB] hover:border-[#D0D0D0] rounded-full py-2.5 hover:-translate-y-0.5 transition-all duration-200"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2} />
              Zgłoś poprawki
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
