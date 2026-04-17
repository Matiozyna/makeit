"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/* ────────────────────────────────────────────── */
/*  Types                                         */
/* ────────────────────────────────────────────── */

interface PackageData {
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  priceLabel: string;
  highlighted: boolean;
  buttonStyle: string;
  subtitleStyle: string;
  features: string[];
}

/* ────────────────────────────────────────────── */
/*  Static data                                   */
/* ────────────────────────────────────────────── */

const faqs = [
  {
    q: "Czy mogę zmienić pakiet w trakcie współpracy?",
    a: "Tak, w każdym momencie możesz przejść na wyższy lub niższy pakiet. Zmiana wchodzi w życie od następnego okresu rozliczeniowego.",
  },
  {
    q: "Jaki jest minimalny czas współpracy?",
    a: "Rekomendujemy minimum 3 miesiące, aby zobaczyć realne wyniki. Nie wymagamy jednak długoterminowych umów.",
  },
  {
    q: "Czy ceny są netto czy brutto?",
    a: "Podane ceny są cenami netto. Do każdej faktury doliczany jest podatek VAT 23%.",
  },
  {
    q: "Co jeśli potrzebuję czegoś spoza pakietu?",
    a: "Każdy pakiet można rozszerzyć o dodatkowe usługi. Skontaktuj się z nami, a przygotujemy indywidualną wycenę.",
  },
  {
    q: "Jak wygląda proces rozpoczęcia współpracy?",
    a: "Po wyborze pakietu umawiamy rozmowę wstępną, omawiamy Twoje cele i potrzeby, a następnie startujemy w ciągu 5 dni roboczych.",
  },
  {
    q: "Czy mogę zrezygnować w dowolnym momencie?",
    a: "Tak, z miesięcznym okresem wypowiedzenia. Bez ukrytych kosztów i kar.",
  },
];

/* ────────────────────────────────────────────── */
/*  Helpers                                       */
/* ────────────────────────────────────────────── */

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

const SUBTITLE_CLASSES: Record<string, string> = {
  gray: "text-[#888888]",
  gold: "text-[#D4A853]",
  gradient: "gradient-text",
};

const BUTTON_CLASSES: Record<string, string> = {
  outline: "border border-[#E5E5E5] text-[#111111] bg-white hover:bg-[#F5F5F5] transition-colors",
  gradient: "bg-gradient-to-br from-[#4EA8FF] to-[#9B66FF] text-white hover:opacity-90 transition-opacity",
  solid: "bg-[#0A0A0A] text-white hover:bg-[#1a1a1a] transition-colors",
};

function formatPrice(price: number): string {
  return price.toLocaleString("pl-PL").replace(/,/g, " ");
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="10" fill="url(#checkGrad)" fillOpacity="0.12" />
      <path
        d="M6.5 10.5L9 13L14 7.5"
        stroke="url(#checkGradStroke)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="checkGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4EA8FF" />
          <stop offset="1" stopColor="#9B66FF" />
        </linearGradient>
        <linearGradient id="checkGradStroke" x1="6.5" y1="7.5" x2="14" y2="13" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4EA8FF" />
          <stop offset="1" stopColor="#9B66FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4EA8FF] to-[#9B66FF] flex items-center justify-center mx-auto mb-4">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  Card component                                */
/* ────────────────────────────────────────────── */

function PricingCard({ pkg, delay }: { pkg: PackageData; delay: number }) {
  const subtitleClass = SUBTITLE_CLASSES[pkg.subtitleStyle] || SUBTITLE_CLASSES.gray;
  const buttonClass = BUTTON_CLASSES[pkg.buttonStyle] || BUTTON_CLASSES.outline;

  const card = (
    <div className={`bg-white rounded-2xl ${pkg.highlighted ? "" : "border border-[#E5E5E5]"} shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 flex flex-col h-full relative`}>
      {pkg.highlighted && (
        <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#4EA8FF] to-[#9B66FF] text-white font-sans text-[11px] font-bold tracking-wide uppercase px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(78,168,255,0.3)]">
          Najpopularniejszy
        </div>
      )}

      <h3 className="font-display font-bold text-[24px] text-[#111111] tracking-tight">
        {pkg.name}
      </h3>
      <p className={`font-sans text-[14px] mt-1 ${subtitleClass}`}>
        {pkg.subtitle}
      </p>

      <div className="flex items-baseline gap-1.5 mt-5">
        <span className="font-display font-bold text-[40px] text-[#111111] leading-none tracking-tight">
          {formatPrice(pkg.price)} zł
        </span>
        <span className="font-sans text-[14px] text-[#888888]">/mies.</span>
      </div>

      <div className="border-t border-[#E5E5E5] my-6" />

      <ul className="space-y-3 flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <CheckIcon />
            <span className="font-sans text-[14px] text-[#444444] leading-relaxed">
              {f}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={`/dokoncz-zamowienie?pakiet=${pkg.slug}&nazwa=${encodeURIComponent(pkg.name)}&cena=${pkg.price}`}
        className={`mt-8 w-full h-[48px] rounded-full font-sans text-[15px] font-semibold inline-flex items-center justify-center ${buttonClass}`}
      >
        Startujemy
      </a>
    </div>
  );

  if (pkg.highlighted) {
    return (
      <motion.div
        {...fadeUp(delay)}
        className="md:col-span-2 lg:col-span-1 lg:scale-105 origin-top"
      >
        <div className="bg-gradient-to-br from-[#4EA8FF] to-[#9B66FF] p-[2px] rounded-2xl h-full">
          {card}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div {...fadeUp(delay)}>
      {card}
    </motion.div>
  );
}

/* ────────────────────────────────────────────── */
/*  Page                                          */
/* ────────────────────────────────────────────── */

export default function PakietyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [packages, setPackages] = useState<PackageData[]>([]);

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setPackages(data));
  }, []);

  return (
    <>
      <Nav />
      <main className="bg-[#F9F9F9] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          {/* Back link */}
          <motion.a
            {...fadeUp(0.1)}
            href="/"
            className="inline-flex items-center gap-1.5 font-sans text-[14px] text-[#666666] hover:text-[#111111] transition-colors mb-10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8l4-4" />
            </svg>
            Wróć na stronę główną
          </motion.a>

          {/* Heading */}
          <motion.div {...fadeUp(0.2)} className="text-center mb-16">
            <h1 className="font-display font-medium text-[48px] sm:text-[56px] md:text-[68px] tracking-[-0.04em] leading-[1.05]">
              <span className="gradient-text">Make it happen</span>
              <span className="text-[#111111]"> — wybierz swój pakiet.</span>
            </h1>
            <p className="font-sans text-[16px] sm:text-[18px] text-[#666666] mt-5">
              Ceny są miesięczne, rozliczane w cyklu współpracy.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start mb-20">
            {packages.map((pkg, i) => (
              <PricingCard key={pkg.slug} pkg={pkg} delay={0.3 + i * 0.15} />
            ))}
          </div>

          {/* Guarantee */}
          <motion.div
            {...fadeUp(0.4)}
            className="bg-white rounded-2xl border border-[#E5E5E5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-10 max-w-2xl mx-auto text-center mb-20"
          >
            <ShieldIcon />
            <h2 className="font-display font-bold text-[24px] text-[#111111] tracking-tight mb-3">
              Gwarancja satysfakcji
            </h2>
            <p className="font-sans text-[16px] text-[#666666] leading-relaxed max-w-md mx-auto">
              Jeśli nie zobaczysz wyników w pierwszym miesiącu — kolejny miesiąc gratis.
            </p>
          </motion.div>

          {/* FAQ */}
          <motion.div {...fadeUp(0.5)} className="max-w-3xl mx-auto">
            <h2 className="font-display font-medium text-[32px] sm:text-[40px] text-[#111111] tracking-[-0.03em] text-center mb-10">
              Najczęściej zadawane pytania
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  >
                    <span className="font-sans font-semibold text-[15px] text-[#111111] pr-4">
                      {faq.q}
                    </span>
                    <span className="text-[#888888] text-[20px] leading-none shrink-0 w-6 h-6 flex items-center justify-center">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 font-sans text-[14px] text-[#666666] leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
