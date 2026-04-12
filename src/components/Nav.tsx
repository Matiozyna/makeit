"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "O nas", href: "#o-nas" },
  { label: "Usługi", href: "#uslugi" },
  { label: "Projekty", href: "#projekty" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F9F9F9]/80 backdrop-blur-md border-b border-[#E5E5E5] py-2 shadow-sm"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300">
        {/* Wordmark logo */}
        <a
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-6 h-6 border-2 border-[#111111] rounded-full group-hover:scale-105 transition-transform duration-200" />
          <span className="font-sans font-bold text-[#111111] text-[17px] tracking-tight select-none">
            make it.
          </span>
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[14px] font-medium text-[#666666] hover:text-[#111111] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="#kontakt"
            className="hidden sm:inline-flex font-sans text-[14px] font-medium text-[#111111] hover:text-[#111111] transition-all duration-200 px-5 py-2.5 rounded-full border border-[#EAEAEA] hover:border-[#CCCCCC] bg-white"
          >
            Napisz do nas
          </a>
          
          {/* Electric Border Button */}
          <a
            href="#kontakt"
            className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] group focus:outline-none focus:ring-2 focus:ring-[#6B4EFF] focus:ring-offset-2 focus:ring-offset-[#FCFCFD]"
          >
            {/* Spinning gradient streak (longer tail, brighter head) */}
            <span className="absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#111111_0%,#111111_45%,#4EA8FF_65%,#9B66FF_90%,#FFFFFF_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#4EA8FF_0%,#9B66FF_50%,#4EA8FF_100%)] transition-all duration-500" />
            
            {/* Inner dark button */}
            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-[#0A0A0A] px-5 py-2.5 text-[14px] font-medium text-white backdrop-blur-3xl transition-colors duration-300 group-hover:bg-[#151515]">
              Zacznij projekt
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
