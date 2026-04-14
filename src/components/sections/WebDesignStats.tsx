"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "94%",
    label: "użytkowników ocenia wiarygodność marki na podstawie designu strony",
  },
  {
    value: "38%",
    label: "opuszcza strony z nieatrakcyjnym układem lub treścią",
  },
  {
    value: "57%",
    label: "nie poleci firmy ze słabo zaprojektowaną stroną mobilną",
  },
  {
    value: "3s",
    label: "tyle masz na zatrzymanie uwagi nowego odwiedzającego",
  },
];

/*
  Abstrakcyjne linie w tle kart. 
  Zmodyfikowane tak, by dobrze wyglądały jako subtelne tło w odseparowanych kartach.
*/
const PIPES: Array<string[]> = [
  [
    "M 90 0 V 46 Q 90 72 116 72 H 300",
    "M 0 160 H 154 Q 180 160 180 134 V 0",
  ],
  [
    "M 0 72 H 300",
    "M 90 240 V 186 Q 90 160 116 160 H 300",
  ],
  [
    "M 0 72 H 300",
    "M 0 160 H 54 Q 80 160 80 186 V 240",
  ],
  [
    "M 0 72 H 214 Q 240 72 240 98 V 240",
    "M 80 0 V 98 Q 80 124 106 124 H 300",
  ],
];

function CardPipes({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 300 240"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    >
      {PIPES[index].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#EAEAEF"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function WebDesignStats() {
  return (
    <section className="bg-[#F9F9F9] py-24 md:py-32 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-20 lg:items-center justify-between">
          <div className="flex-1">
            <motion.div {...fadeUp(0)}>
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E5E5E5] bg-white mb-8 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="#111111" strokeWidth="1.2" />
                  <path d="M7 4v3.5l2 2" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="font-sans text-[13px] font-medium text-[#111111]">
                  Dlaczego to ważne
                </span>
              </div>
              
              {/* Heading */}
              <h2 className="font-display font-medium text-[40px] sm:text-[48px] md:text-[56px] text-[#111111] leading-[1.05] tracking-[-0.04em]">
                Strona to Twój
                <br className="hidden sm:block" />
                <span className="gradient-text">najlepszy handlowiec.</span>
              </h2>
            </motion.div>
          </div>

          <div className="flex-1 lg:max-w-lg mt-4 lg:mt-0">
            <motion.p
              {...fadeUp(0.1)}
              className="font-sans text-[17px] md:text-[18px] text-[#666666] leading-relaxed"
            >
              Dobra strona pracuje 24/7, buduje zaufanie i konwertuje odwiedzających
              w klientów — zanim jeszcze odbierzesz telefon. Dane mówią same za siebie.
            </motion.p>
          </div>
        </div>

        {/* Karty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" }}
              className="relative bg-[#F2F2F5] rounded-[24px] overflow-hidden px-6 py-12 flex flex-col items-center justify-center text-center group shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Rury SVG w tle karty */}
              <CardPipes index={i} />

              {/* Treść — nad rurami */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <span className="font-display font-medium text-[56px] sm:text-[64px] text-[#111111] leading-none tracking-[-0.04em]">
                  {stat.value}
                </span>
                <p className="font-sans text-[15px] text-[#666666] leading-relaxed max-w-[200px]">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Dotted separator matching the Drewl layout (optional but adds polish) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 w-full max-w-[80%] mx-auto border-t border-dashed border-[#DCDCE4]" 
        />
      </div>
    </section>
  );
}
