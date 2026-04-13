const footerLinks = {
  Strony: [
    { label: "O nas", href: "#o-nas" },
    { label: "Usługi", href: "#uslugi" },
    { label: "Projekty", href: "#projekty" },
    { label: "Blog", href: "#" },
  ],
  Usługi: [
    { label: "Web Design", href: "#uslugi" },
    { label: "Social Media", href: "#uslugi" },
    { label: "Fotografia", href: "#uslugi" },
    { label: "Wideo", href: "#uslugi" },
    { label: "Marka osobista", href: "#uslugi" },
  ],
  Kontakt: [
    { label: "kontakt@make.it", href: "mailto:kontakt@make.it" },
    { label: "+48 123 456 789", href: "tel:+48123456789" },
    { label: "Kraków, Polska", href: "#" },
  ],
};

const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] overflow-hidden relative">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex items-center gap-2 group mb-5">
              <div className="w-5 h-5 border-2 border-white/40 rounded-full group-hover:border-white/70 transition-colors duration-200" />
              <span className="font-sans font-bold text-white text-[17px] tracking-tight">
                make it.
              </span>
            </a>
            <p className="font-sans text-sm text-white/40 leading-relaxed mb-8 max-w-xs">
              Projektujemy obecność, która sprzedaje. Strony, social media, zdjęcia i wideo — wszystko w jednym miejscu.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Twój email"
                className="flex-1 border border-white/10 rounded-full px-4 py-2.5 font-sans text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors bg-white/5"
              />
              <button className="font-sans text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-white/90 transition-colors duration-200 px-5 py-2.5 rounded-full whitespace-nowrap">
                Zapisz się
              </button>
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section}>
              <p className="font-sans text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-5">
                {section}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-6 py-5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/20">
            © {new Date().getFullYear()} Make it. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="font-sans text-xs text-white/20 hover:text-white/60 transition-colors duration-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant watermark — fully visible */}
      <div className="relative z-0 select-none pointer-events-none overflow-hidden" aria-hidden="true">
        <p className="font-display font-black text-[clamp(80px,15vw,200px)] leading-[0.85] text-white/[0.03] text-center tracking-tighter pb-4">
          MAKE IT
        </p>
      </div>
    </footer>
  );
}
