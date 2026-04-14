"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, AlertTriangle, Clock, Check, Flame } from "lucide-react";

interface Request {
  id: string;
  title: string;
  description: string;
  page: string;
  priority: "normal" | "urgent";
  date: string;
  author: string;
}

const initialData: Record<string, Request[]> = {
  new: [
    { id: "1", title: "Zmień tekst na hero", description: "Nagłówek powinien brzmieć: \"Budujemy solidnie od 2005 roku\"", page: "Strona główna", priority: "normal", date: "14 kwi", author: "Kuchciak Budownictwo" },
    { id: "2", title: "Dodaj numer telefonu w footerze", description: "Brakuje kontaktowego numeru telefonu w stopce.", page: "Wszystkie", priority: "urgent", date: "13 kwi", author: "Kuchciak Budownictwo" },
  ],
  progress: [
    { id: "3", title: "Nowy baner — promocja wiosenna", description: "Baner 1920x600 z informacją o rabacie -15% na usługi dachowe.", page: "Strona główna", priority: "normal", date: "11 kwi", author: "Kuchciak Budownictwo" },
  ],
  done: [
    { id: "4", title: "Aktualizacja menu nawigacji", description: "Dodanie zakładki \"Realizacje\" w menu głównym.", page: "Wszystkie", priority: "normal", date: "8 kwi", author: "Kuchciak Budownictwo" },
    { id: "5", title: "Poprawka literówki /o-nas", description: "\"Budownictow\" → \"Budownictwo\" w sekcji O nas.", page: "/o-nas", priority: "normal", date: "7 kwi", author: "Kuchciak Budownictwo" },
    { id: "6", title: "Nowe zdjęcia realizacji", description: "Dodanie 4 nowych zdjęć budowy domku w Niepołomicach.", page: "/realizacje", priority: "normal", date: "5 kwi", author: "Kuchciak Budownictwo" },
  ],
};

const columns = [
  { key: "new", label: "Nowe", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  { key: "progress", label: "W toku", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  { key: "done", label: "Gotowe", icon: Check, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function ZgloszeniaPage() {
  const [showModal, setShowModal] = useState(false);
  const [data] = useState(initialData);

  return (
    <>
      <div className="max-w-[1200px] flex flex-col gap-6">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="flex items-end justify-between">
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-1">
              Zgłaszaj zmiany, śledź postępy
            </p>
            <h1 className="font-display text-[28px] font-bold tracking-[-0.04em] text-[#111111]">
              Zgłoszenia zmian
            </h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#111111] hover:bg-[#000000] text-white font-sans text-[13px] font-medium px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Nowe zgłoszenie
          </button>
        </motion.div>

        {/* Kanban */}
        <motion.div {...fadeUp(0.06)} className="grid grid-cols-3 gap-5 items-start">
          {columns.map((col) => {
            const Icon = col.icon;
            const items = data[col.key];
            return (
              <div key={col.key} className="flex flex-col gap-3">
                {/* Column header */}
                <div className="flex items-center gap-2 px-1">
                  <div className={`w-7 h-7 rounded-[8px] ${col.bg} border ${col.border} flex items-center justify-center`}>
                    <Icon className={`w-3.5 h-3.5 ${col.color}`} strokeWidth={2} />
                  </div>
                  <span className="font-sans text-[14px] font-medium text-[#111111]">{col.label}</span>
                  <span className="font-sans text-[12px] font-medium text-[#9CA3AF] bg-[#F5F7FA] rounded-full px-2 py-0.5">
                    {items.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2.5">
                  {items.map((req, i) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -2 }}
                      className="rounded-[16px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-[#D0D4DB] transition-shadow duration-300 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-sans text-[14px] font-medium text-[#111111] leading-snug">
                          {req.title}
                        </h3>
                        {req.priority === "urgent" && (
                          <span className="shrink-0 inline-flex items-center gap-1 font-sans text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-200 rounded-full px-2 py-0.5">
                            <Flame className="w-2.5 h-2.5" strokeWidth={2.5} />
                            Pilne
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[12px] text-[#6B7280] leading-relaxed line-clamp-2 mb-3">
                        {req.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[11px] text-[#9CA3AF] bg-[#F5F7FA] rounded-full px-2 py-0.5">
                          {req.page}
                        </span>
                        <span className="font-sans text-[11px] text-[#9CA3AF]">{req.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* New Request Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[480px] mx-6 rounded-[24px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.15)] p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-[20px] font-bold tracking-[-0.03em] text-[#111111]">
                  Nowe zgłoszenie
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-[#F5F7FA] flex items-center justify-center text-[#9CA3AF] hover:text-[#111111] transition-all duration-200"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[13px] font-semibold text-[#111111]">Co chcesz zmienić?</label>
                  <textarea
                    rows={4}
                    placeholder="Opisz zmianę..."
                    className="font-sans text-[14px] border border-[#E5E7EB] rounded-[12px] px-4 py-3 focus:outline-none focus:border-[#111111] focus:shadow-[0_0_0_3px_rgba(17,17,17,0.06)] transition-all duration-200 placeholder:text-[#BBBBBB] resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[13px] font-semibold text-[#111111]">Gdzie na stronie?</label>
                  <select className="font-sans text-[14px] border border-[#E5E7EB] rounded-[12px] px-4 py-3 focus:outline-none focus:border-[#111111] transition-all duration-200 bg-white text-[#111111] appearance-none cursor-pointer">
                    <option>Strona główna</option>
                    <option>/uslugi</option>
                    <option>/o-nas</option>
                    <option>/realizacje</option>
                    <option>/kontakt</option>
                    <option>Wszystkie podstrony</option>
                    <option>Inne</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[13px] font-semibold text-[#111111]">Priorytet</label>
                  <div className="flex gap-2">
                    <button className="flex-1 font-sans text-[13px] font-medium border border-[#111111] bg-[#111111] text-white rounded-full py-2.5 transition-all duration-200">
                      Normalny
                    </button>
                    <button className="flex-1 font-sans text-[13px] font-medium border border-[#E5E7EB] text-[#6B7280] hover:border-rose-300 hover:text-rose-600 rounded-full py-2.5 transition-all duration-200">
                      Pilne
                    </button>
                  </div>
                </div>

                <button className="w-full mt-2 bg-[#111111] hover:bg-[#000000] text-white font-sans text-[14px] font-medium py-3.5 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-200">
                  Wyślij zgłoszenie
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
