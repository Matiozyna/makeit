const partners = [
  {
    type: "Firmy usługowe",
    subtitle: "Lokalne i ogólnopolskie",
    description: "Restauracje, kliniki, salony, agencje, kancelarie — jeśli sprzedajesz usługi, wiemy jak zbudować Twoją obecność online.",
    gradient: "from-[#EDE7F6] to-[#F3E8FF]",
    blob: "#9B66FF",
    tags: ["Strony internetowe", "Social media", "Fotografia"],
  },
  {
    type: "E-commerce",
    subtitle: "Sklepy i marki produktowe",
    description: "Budujemy sklepy, które sprzedają. Dbamy o UX, zdjęcia produktowe i content, który przekonuje do zakupu.",
    gradient: "from-[#E0F2FE] to-[#EFF6FF]",
    blob: "#4EA8FF",
    tags: ["Sklepy online", "Sesje produktowe", "Konwersja"],
  },
  {
    type: "Marki osobiste",
    subtitle: "Twórcy i eksperci",
    description: "Coachowie, specjaliści, influencerzy — pomagamy budować markę osobistą, która przyciąga właściwych ludzi.",
    gradient: "from-[#FFF0F0] to-[#FFF5F5]",
    blob: "#F472B6",
    tags: ["Personal branding", "LinkedIn", "Content"],
  },
];

export default function WhoWePartnerWith() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-[#111111] mb-4">
            Z kim współpracujemy
          </h2>
          <p className="font-sans text-base text-[#666666] max-w-lg mx-auto leading-relaxed">
            Nasze doświadczenie w designie i marketingu — dopasowane do Twojego biznesu.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {partners.map((p, i) => (
            <div
              key={i}
              className={`rounded-3xl p-8 bg-gradient-to-br ${p.gradient} border border-white/60 flex flex-col gap-6 relative overflow-hidden`}
            >
              {/* Blob decoration */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl"
                style={{ background: p.blob }}
              />

              {/* Type */}
              <div>
                <p className="font-sans text-xs font-semibold text-[#888888] uppercase tracking-widest mb-1.5">
                  {p.subtitle}
                </p>
                <h3 className="font-display font-semibold text-xl text-[#111111]">
                  {p.type}
                </h3>
              </div>

              {/* Description */}
              <p className="font-sans text-sm text-[#555555] leading-relaxed">
                {p.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-xs font-medium text-[#444444] bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
