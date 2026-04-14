"use client";

import { useState } from "react";
import { Check, X, Send } from "lucide-react";
import VersionSwitcher from "./VersionSwitcher";

const comments = [
  {
    author: "Mateusz B.",
    initials: "MB",
    isAgency: true,
    text: "Zaktualizowałem hero section — większy kontrast na CTA. Dajcie znać jak wygląda.",
    time: "2 godz. temu",
  },
  {
    author: "Kuchciak Budownictwo",
    initials: "KB",
    isAgency: false,
    text: "Super, zdecydowanie lepiej. Czy możemy jeszcze powiększyć logo?",
    time: "1 godz. temu",
  },
  {
    author: "Mateusz B.",
    initials: "MB",
    isAgency: true,
    text: "Jasne, poprawione w v3. Logo jest teraz 20% większe.",
    time: "45 min temu",
  },
];

const versionHistory = [
  { label: "v1", note: "odrzucona", date: "8 kwi", done: true, current: false },
  { label: "v2", note: "poprawki",  date: "11 kwi", done: true, current: false },
  { label: "v3", note: "w review",  date: "14 kwi", done: false, current: true },
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
    <div className="w-[360px] shrink-0 border-l border-[#EBEBEB] bg-white flex flex-col h-full">

      {/* Version switcher */}
      <div className="px-5 py-4 border-b border-[#EBEBEB]">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#AAAAAA] mb-2.5">
          Wersja
        </p>
        <VersionSwitcher
          versions={["v1", "v2", "v3"]}
          active={activeVersion}
          onSelect={onVersionChange}
        />
      </div>

      {/* Comments + version history */}
      <div className="flex-1 overflow-auto px-5 py-4 flex flex-col gap-5">

        {/* Comments */}
        <div>
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#AAAAAA] mb-3">
            Komentarze ({comments.length})
          </p>
          <div className="flex flex-col gap-4">
            {comments.map((c, i) => (
              <div key={i} className="flex gap-3">
                {/* Avatar — agency: black, client: light */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    c.isAgency
                      ? "bg-[#111111]"
                      : "bg-[#F0F0F0] border border-[#E5E5E5]"
                  }`}
                >
                  <span
                    className={`font-sans text-[9px] font-bold ${
                      c.isAgency ? "text-white" : "text-[#555555]"
                    }`}
                  >
                    {c.initials}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans text-[13px] font-semibold text-[#111111]">
                      {c.author}
                    </span>
                    <span className="font-sans text-[11px] text-[#AAAAAA]">{c.time}</span>
                  </div>
                  <p className="font-sans text-[13px] text-[#555555] leading-relaxed mt-0.5">
                    {c.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Version history */}
        <div className="pt-4 border-t border-[#F0F0F0]">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#AAAAAA] mb-3">
            Historia wersji
          </p>
          <div className="flex flex-col gap-2.5">
            {versionHistory.map((v) => (
              <div key={v.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* Status dot — neutral, current is black */}
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      v.current ? "bg-[#111111]" : "bg-[#DDDDDD]"
                    }`}
                  />
                  <span
                    className={`font-sans text-[13px] font-medium ${
                      v.current ? "text-[#111111]" : "text-[#AAAAAA]"
                    }`}
                  >
                    {v.label}
                  </span>
                  <span className="font-sans text-[12px] text-[#AAAAAA]">
                    — {v.note}
                  </span>
                </div>
                <span className="font-sans text-[11px] text-[#CCCCCC]">{v.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment input */}
      <div className="px-5 py-3.5 border-t border-[#EBEBEB]">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Dodaj komentarz..."
            className="flex-1 font-sans text-[13px] border border-[#EBEBEB] rounded-lg px-3.5 py-2 focus:outline-none focus:border-[#AAAAAA] transition-colors placeholder:text-[#CCCCCC]"
          />
          <button className="w-9 h-9 rounded-lg bg-[#111111] hover:bg-[#2a2a2a] flex items-center justify-center transition-colors shrink-0">
            <Send className="w-3.5 h-3.5 text-white" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Approval actions */}
      <div className="px-5 py-4 border-t border-[#EBEBEB] bg-[#FAFAFA]">
        {approved ? (
          <div className="flex items-center gap-3 justify-center py-1">
            <div className="w-7 h-7 rounded-full bg-[#111111] flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-sans text-[14px] font-semibold text-[#111111]">
              Wersja zatwierdzona
            </span>
          </div>
        ) : showRevisionInput ? (
          <div className="flex flex-col gap-2.5">
            <textarea
              placeholder="Co chcesz zmienić?"
              rows={3}
              className="font-sans text-[13px] border border-[#EBEBEB] rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#AAAAAA] transition-colors placeholder:text-[#CCCCCC] resize-none"
            />
            <div className="flex gap-2">
              <button className="flex-1 font-sans text-[13px] font-medium bg-[#111111] text-white rounded-lg py-2.5 hover:bg-[#2a2a2a] transition-colors">
                Wyślij poprawki
              </button>
              <button
                onClick={() => setShowRevisionInput(false)}
                className="font-sans text-[13px] font-medium text-[#888888] hover:text-[#111111] px-3 transition-colors"
              >
                Anuluj
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              onClick={onApprove}
              className="w-full flex items-center justify-center gap-2 font-sans text-[14px] font-medium bg-[#111111] hover:bg-[#2a2a2a] text-white rounded-lg py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-all duration-150"
            >
              <Check className="w-4 h-4" strokeWidth={2.5} />
              Zatwierdź tę wersję
            </button>
            <button
              onClick={() => setShowRevisionInput(true)}
              className="w-full flex items-center justify-center gap-2 font-sans text-[14px] font-medium text-[#555555] hover:text-[#111111] border border-[#EBEBEB] hover:border-[#CCCCCC] rounded-lg py-2.5 transition-all duration-150"
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
