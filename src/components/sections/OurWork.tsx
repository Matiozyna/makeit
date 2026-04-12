"use client";

import { motion } from "framer-motion";

const projects = [
  {
    name: "Trinity Power",
    description: "Platforma e-learningowa dla firmy energetycznej. Kompleksowy projekt od UX po wdrożenie.",
    tags: ["Next.js", "Web App", "E-learning"],
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    accent: "#e94560",
  },
  {
    name: "Zielony Warsztat",
    description: "Strona firmowa dla studia ogrodniczego. Minimalistyczny design z pełnym CMS.",
    tags: ["Strona firmowa", "CMS"],
    gradient: "from-[#134e4a] via-[#065f46] to-[#064e3b]",
    accent: "#6ee7b7",
  },
  {
    name: "Patrycja Gołaszewska",
    description: "Landing page dla kursu beauty. Wysoka konwersja dzięki przemyślanemu copy i UX.",
    tags: ["Landing page", "Kursy online"],
    gradient: "from-[#4c1d95] via-[#6d28d9] to-[#7c3aed]",
    accent: "#c4b5fd",
  },
  {
    name: "Bloom Kwiaty",
    description: "Sesja wizerunkowa dla kwiaciarni. Zdjęcia produktowe i portrety właścicielki.",
    tags: ["Fotografia", "Branding"],
    gradient: "from-[#831843] via-[#be185d] to-[#db2777]",
    accent: "#fbcfe8",
  },
  {
    name: "Golden Jewel",
    description: "Profesjonalna sesja produktowa biżuterii na białym tle i w aranżacji lifestyle.",
    tags: ["Fotografia produktowa"],
    gradient: "from-[#78350f] via-[#92400e] to-[#b45309]",
    accent: "#fde68a",
  },
  {
    name: "Złoty Karp",
    description: "Film reklamowy dla restauracji. Ujęcia kuchni, atmosfery i dań w technice cinematic.",
    tags: ["Wideo", "Reklama"],
    gradient: "from-[#1e3a5f] via-[#1e40af] to-[#1d4ed8]",
    accent: "#93c5fd",
  },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function OurWork() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-sans text-xs font-semibold text-[#888888] uppercase tracking-widest mb-3">
              Nasze projekty
            </p>
            <h2 className="font-sans font-medium text-4xl sm:text-5xl text-[#111111] leading-tight max-w-lg">
              Marki z całej Polski. Projekty każdej skali.
            </h2>
          </div>
          <a
            href="#kontakt"
            className="inline-flex items-center font-sans text-sm font-medium text-[#111111] border border-[#EAEAEA] bg-white hover:border-[#CCCCCC] transition-all duration-200 px-5 py-2.5 rounded-full whitespace-nowrap"
          >
            Wszystkie projekty →
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.05 + i * 0.07)}
              className="group relative bg-white border border-[#EAEAEA] rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-300 cursor-pointer"
            >
              {/* Image / Thumbnail */}
              <div
                className={`relative h-52 bg-gradient-to-br ${p.gradient} overflow-hidden`}
              >
                {/* Fake browser chrome */}
                <div className="absolute top-4 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-xl h-full max-h-36 border border-white/20">
                  <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                    <div className="flex-1 mx-2 h-1.5 bg-white/15 rounded-full" />
                  </div>
                  <div className="p-3 space-y-1.5">
                    <div className="h-1.5 bg-white/20 rounded-full w-3/4" />
                    <div className="h-1.5 bg-white/15 rounded-full w-1/2" />
                    <div className="h-1.5 bg-white/10 rounded-full w-2/3" />
                  </div>
                </div>
                {/* Accent dot */}
                <div
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full opacity-60"
                  style={{ background: p.accent }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-sans font-semibold text-lg text-[#111111]">
                    {p.name}
                  </h3>
                  <span className="text-[#CCCCCC] group-hover:text-[#111111] transition-colors duration-200 text-lg mt-0.5">
                    →
                  </span>
                </div>
                <p className="font-sans text-sm text-[#666666] leading-relaxed mb-4">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-xs font-medium text-[#888888] bg-[#F5F5F7] px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
