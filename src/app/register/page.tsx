"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const result = await register({ name, email, password, phone, company });
      if (result.error) setError(result.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#FAFAFA_0%,#FFFFFF_100%)] pointer-events-none" />

      <div className="w-full max-w-[440px] relative z-10">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4EA8FF] to-[#9B66FF] flex items-center justify-center shadow-lg shadow-[#4EA8FF]/20">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="font-display font-bold text-[#111111] text-xl tracking-tight">
              make it.
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-display text-[32px] font-bold text-[#111111] tracking-tight mb-2 text-center">
            Utwórz konto
          </h2>
          <p className="font-sans text-[#666666] text-[15px] mb-8 text-center">
            Zarejestruj się, aby uzyskać dostęp do panelu klienta.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="font-sans text-[13px] font-semibold text-[#111111]">
                Imię i nazwisko *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jan Kowalski"
                className="w-full h-[48px] border border-[#E5E5E5] bg-[#FAFAFA] focus:bg-white hover:border-[#D0D0D0] focus:border-[#4EA8FF] focus:ring-[4px] focus:ring-[#4EA8FF]/10 rounded-xl px-4 font-sans text-[14px] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none transition-all duration-200"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="font-sans text-[13px] font-semibold text-[#111111]">
                Firma
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Nazwa firmy"
                className="w-full h-[48px] border border-[#E5E5E5] bg-[#FAFAFA] focus:bg-white hover:border-[#D0D0D0] focus:border-[#4EA8FF] focus:ring-[4px] focus:ring-[#4EA8FF]/10 rounded-xl px-4 font-sans text-[14px] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[13px] font-semibold text-[#111111]">
              Adres e-mail *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jan@firma.pl"
              className="w-full h-[48px] border border-[#E5E5E5] bg-[#FAFAFA] focus:bg-white hover:border-[#D0D0D0] focus:border-[#4EA8FF] focus:ring-[4px] focus:ring-[#4EA8FF]/10 rounded-xl px-4 font-sans text-[14px] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[13px] font-semibold text-[#111111]">
              Telefon
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+48 500 100 200"
              className="w-full h-[48px] border border-[#E5E5E5] bg-[#FAFAFA] focus:bg-white hover:border-[#D0D0D0] focus:border-[#4EA8FF] focus:ring-[4px] focus:ring-[#4EA8FF]/10 rounded-xl px-4 font-sans text-[14px] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[13px] font-semibold text-[#111111]">
              Hasło *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 znaków"
                className="w-full h-[48px] border border-[#E5E5E5] bg-[#FAFAFA] focus:bg-white hover:border-[#D0D0D0] focus:border-[#4EA8FF] focus:ring-[4px] focus:ring-[#4EA8FF]/10 rounded-xl px-4 pr-12 font-sans text-[14px] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-[#111111] transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-sans text-[13px] text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="group relative mt-1 w-full h-[48px] flex items-center justify-center rounded-xl bg-[#111111] overflow-hidden transition-all hover:shadow-[0_8px_24px_rgba(17,17,17,0.15)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4EA8FF] to-[#9B66FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative font-sans text-[14px] font-semibold text-white tracking-wide">
              {isLoading ? "Rejestracja..." : "Utwórz konto"}
            </span>
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center font-sans text-[14px] text-[#888888]"
        >
          Masz już konto?{" "}
          <Link href="/login" className="font-semibold text-[#111111] hover:text-[#4EA8FF] transition-colors">
            Zaloguj się
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
