"use client";

import { useState } from "react";
import { People, ClipboardText, Lamp } from "iconsax-react";

export default function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="bg-[#F9F9F9] py-32 px-6 overflow-hidden relative">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Centered heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-medium text-[40px] sm:text-[52px] md:text-[60px] text-[#111111] leading-[1.1] tracking-[-0.04em] mb-5">
            Dostań bezpłatną{" "}
            <span className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-[16px] bg-gradient-to-b from-[#333333] to-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] align-middle mx-1 relative -top-1">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <br className="hidden sm:block" />
            konsultację projektu
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#666666] leading-relaxed max-w-xl mx-auto">
            Napisz do nas lub zarezerwuj szybką rozmowę. Niezależnie czy masz gotowy projekt, czy dopiero pomysł — jesteśmy tu, żeby pomóc.
          </p>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left — Call card */}
          <div className="bg-white rounded-[28px] border border-[#E5E5E5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
            <div className="p-8 sm:p-10 flex-1">
              <h3 className="font-display font-semibold text-[28px] sm:text-[32px] text-[#111111] leading-[1.15] tracking-[-0.03em] mb-4">
                Zarezerwuj{" "}
                <span className="gradient-text">30-min</span>
                <br />
                rozmowę wstępną
              </h3>
              <p className="font-sans text-[15px] text-[#666666] leading-relaxed mb-8">
                Wskocz na szybki call i zamień pół godziny w początek czegoś{" "}
                <span className="font-semibold text-[#111111] bg-[#F0F0F0] px-1.5 py-0.5 rounded">wielkiego</span>.
              </p>

              <p className="font-sans text-[11px] font-bold text-[#999999] uppercase tracking-[0.15em] mb-4">
                Co zrobimy przez ~30 min:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { label: "Krótkie przedstawienie", icon: <People size={18} variant="Bold" color="#666666" /> },
                  { label: "Omówienie Twojego projektu", icon: <ClipboardText size={18} variant="Bold" color="#666666" /> },
                  { label: "Jak możemy Ci pomóc", icon: <Lamp size={18} variant="Bold" color="#666666" /> },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F5F5F7] flex items-center justify-center shrink-0 text-[#666666]">
                      {item.icon}
                    </div>
                    <span className="font-sans text-[14px] font-medium text-[#333333]">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gradient bottom with CTA */}
            <div className="relative px-8 sm:px-10 pb-8 sm:pb-10 pt-6">
              {/* Gradient bleed */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4EA8FF]/10 via-[#9B66FF]/5 to-transparent pointer-events-none" />
              <a
                href="mailto:kontakt@makeit.pl"
                className="relative z-10 w-full inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#0A0A0A] font-sans text-[15px] font-semibold text-white hover:bg-[#1a1a1a] transition-colors duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Zarezerwuj rozmowę
              </a>
            </div>
          </div>

          {/* Right — Form card */}
          <div className="bg-white rounded-[28px] border border-[#E5E5E5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 sm:p-10 flex flex-col">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center mb-2">
                  <svg className="w-7 h-7 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-2xl text-[#111111]">Dziękujemy!</h3>
                <p className="font-sans text-[15px] text-[#666666] leading-relaxed max-w-xs">
                  Twoja wiadomość do nas dotarła. Odezwiemy się w ciągu jednego dnia roboczego.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[13px] font-semibold text-[#111111]">
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Jan Kowalski"
                    className="w-full border border-[#E5E5E5] hover:border-[#D0D0D0] focus:border-[#111111] rounded-xl px-4 py-3 font-sans text-[15px] text-[#111111] placeholder:text-[#CCCCCC] focus:outline-none transition-colors bg-transparent"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[13px] font-semibold text-[#111111]">
                    Adres e-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="jan@firma.pl"
                    className="w-full border border-[#E5E5E5] hover:border-[#D0D0D0] focus:border-[#111111] rounded-xl px-4 py-3 font-sans text-[15px] text-[#111111] placeholder:text-[#CCCCCC] focus:outline-none transition-colors bg-transparent"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="font-sans text-[13px] font-semibold text-[#111111]">
                    Opis projektu
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Opowiedz nam o swoim projekcie..."
                    className="w-full border border-[#E5E5E5] hover:border-[#D0D0D0] focus:border-[#111111] rounded-xl px-4 py-3 font-sans text-[15px] text-[#111111] placeholder:text-[#CCCCCC] focus:outline-none transition-colors bg-transparent resize-none flex-1"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-2 w-full h-[52px] flex items-center justify-center rounded-full bg-[#0A0A0A] font-sans text-[15px] font-semibold text-white hover:bg-[#1a1a1a] transition-colors duration-200 active:scale-[0.98] transition-transform"
                >
                  Wyślij wiadomość
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
