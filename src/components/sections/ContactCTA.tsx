"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="bg-[#0A0A0A] py-24 px-6 overflow-hidden relative">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#9B66FF]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div {...fadeUp(0)}>
            <h2 className="font-sans font-medium text-4xl sm:text-5xl text-white leading-tight mb-4">
              Dostań bezpłatną{" "}
              <span className="inline-flex items-center bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm font-semibold text-white mx-1">
                💬 sprawdź!
              </span>{" "}
              konsultację
            </h2>
            <p className="font-sans text-base text-white/50 leading-relaxed mb-10 max-w-md">
              Napisz do nas lub zarezerwuj szybką rozmowę. Niezależnie czy masz gotowy projekt, czy dopiero kiełkujący pomysł — jesteśmy tu, żeby pomóc.
            </p>

            {/* Call option */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <p className="font-sans text-sm font-semibold text-white mb-1">
                Zarezerwuj 30-min rozmowę wstępną
              </p>
              <p className="font-sans text-sm text-white/50 mb-5">
                Pół godziny, które mogą zapoczątkować coś wielkiego.
              </p>
              <p className="font-sans text-xs text-white/40 mb-3 font-medium uppercase tracking-wider">
                Co zrobimy przez ~30 min:
              </p>
              <ul className="space-y-2 mb-6">
                {["Krótkie przedstawienie", "Omówienie Twojego projektu", "Jak możemy pomóc"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 font-sans text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B66FF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:kontakt@make.it"
                className="inline-flex items-center font-sans text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 px-5 py-2.5 rounded-full"
              >
                Zarezerwuj rozmowę →
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div {...fadeUp(0.15)}>
            {sent ? (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
                <div className="w-14 h-14 rounded-full bg-[#9B66FF]/20 flex items-center justify-center text-2xl">✓</div>
                <h3 className="font-sans font-semibold text-xl text-white">Wiadomość wysłana!</h3>
                <p className="font-sans text-sm text-white/50">Odezwiemy się w ciągu 24 godzin.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-xs font-medium text-white/40 uppercase tracking-wider">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Jan Kowalski"
                      className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-xs font-medium text-white/40 uppercase tracking-wider">
                      Firma (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      placeholder="Twoja firma"
                      className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-medium text-white/40 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="jan@firma.pl"
                    className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-medium text-white/40 uppercase tracking-wider">
                    Jak możemy pomóc?
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Opowiedz nam o swoim projekcie..."
                    className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full font-sans text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-white/90 transition-colors duration-200 px-6 py-3.5 rounded-full"
                >
                  Wyślij wiadomość →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
