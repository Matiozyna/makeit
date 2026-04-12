import Link from "next/link";

const footerLinks = {
  Strony: ["O nas", "Usługi", "Projekty", "Blog"],
  Usługi: ["Web Design", "Social Media", "Fotografia", "Wideo", "Marka osobista"],
  Kontakt: ["kontakt@make.it", "+48 123 456 789", "Warszawa, Polska"],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#EAEAEA] overflow-hidden">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <a href="/" className="font-sans font-black text-xl text-[#111111] tracking-tight mb-4 block">
              make it.
            </a>
            <p className="font-sans text-sm text-[#666666] leading-relaxed mb-6 max-w-xs">
              Projektujemy obecność, która sprzedaje. Strony, social media, zdjęcia i wideo — wszystko w jednym miejscu.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Twój email"
                className="flex-1 border border-[#EAEAEA] rounded-full px-4 py-2.5 font-sans text-sm text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none focus:border-[#CCCCCC] transition-colors bg-[#FAFAFA]"
              />
              <button className="font-sans text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#222222] transition-colors duration-200 px-4 py-2.5 rounded-full whitespace-nowrap">
                Zapisz się
              </button>
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section}>
              <p className="font-sans text-xs font-semibold text-[#111111] uppercase tracking-widest mb-4">
                {section}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <span className="font-sans text-sm text-[#666666] hover:text-[#111111] transition-colors duration-200 cursor-pointer">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#EAEAEA] px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-[#AAAAAA]">
            © {new Date().getFullYear()} Make it. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-4">
            {["Instagram", "LinkedIn", "TikTok"].map((s) => (
              <a key={s} href="#" className="font-sans text-xs text-[#AAAAAA] hover:text-[#111111] transition-colors duration-200">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant watermark */}
      <div className="relative h-20 sm:h-28 overflow-hidden select-none pointer-events-none" aria-hidden>
        <p
          className="absolute bottom-0 left-1/2 -translate-x-1/2 font-sans font-black text-[120px] sm:text-[180px] leading-none text-[#F0F0F0] whitespace-nowrap tracking-tighter"
        >
          MAKE IT
        </p>
      </div>
    </footer>
  );
}
