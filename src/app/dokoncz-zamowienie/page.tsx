"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

function formatPrice(price: number): string {
  return price.toLocaleString("pl-PL").replace(/,/g, " ");
}

function OrderForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading, refresh } = useAuth();

  const slug = searchParams.get("pakiet") || "";
  const nazwa = searchParams.get("nazwa") || "";
  const cena = Number(searchParams.get("cena")) || 0;
  const zaliczka = Math.round(cena * 0.1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    if (!authLoading && user && !prefilled) {
      const parts = user.name?.split(" ") || [];
      setForm((f) => ({
        ...f,
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phone || "",
        company: user.company || "",
      }));
      setPrefilled(true);
    }
  }, [user, authLoading, prefilled]);

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.firstName || !form.lastName || !form.phone || !form.email) {
      setError("Wypełnij wszystkie wymagane pola.");
      return;
    }

    if (!user && (!form.password || form.password.length < 6)) {
      setError("Hasło musi mieć minimum 6 znaków.");
      return;
    }

    setSubmitting(true);

    try {
      // Step 1: Register if not logged in
      if (!user) {
        const regRes = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.firstName + " " + form.lastName,
            email: form.email,
            password: form.password,
            phone: form.phone,
            company: form.company,
          }),
        });

        const regData = await regRes.json();

        if (!regRes.ok) {
          setError(regData.error || "Błąd rejestracji.");
          setSubmitting(false);
          return;
        }
      }

      // Step 2: Create order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: nazwa,
          variant: slug,
          budget: formatPrice(cena) + " zł/mies.",
          description: "Zamówienie pakietu " + nazwa,
          contactName: form.firstName + " " + form.lastName,
          contactEmail: form.email,
          contactPhone: form.phone,
          paymentStatus: "paid",
          depositAmount: zaliczka,
          status: "pending",
        }),
      });

      if (!orderRes.ok) {
        const orderData = await orderRes.json();
        setError(orderData.error || "Błąd tworzenia zamówienia.");
        setSubmitting(false);
        return;
      }

      // Step 3: Refresh auth context and redirect
      await refresh();
      router.push("/panel/zamowienia?zamowienie=nowe");
    } catch {
      setError("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] text-[#111111] focus:outline-none focus:border-[#4EA8FF] transition-colors bg-white";
  const labelClass =
    "block font-sans text-[12px] font-semibold text-[#666666] mb-1";

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[#AAAAAA]" />
      </div>
    );
  }

  if (!slug || !cena) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <p className="font-sans text-[16px] text-[#888888] mb-4">
          Nie wybrano pakietu.
        </p>
        <a
          href="/pakiety"
          className="font-sans text-[14px] font-medium text-[#4EA8FF] hover:underline"
        >
          Wróć do pakietów
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Back link */}
      <motion.a
        {...fadeUp(0.1)}
        href="/pakiety"
        className="inline-flex items-center gap-1.5 font-sans text-[14px] text-[#666666] hover:text-[#111111] transition-colors mb-10"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 12L6 8l4-4" />
        </svg>
        Wróć do pakietów
      </motion.a>

      {/* Package info card */}
      <motion.div
        {...fadeUp(0.2)}
        className="bg-white rounded-2xl border border-[#E5E5E5] p-8 mb-6"
      >
        <p className="font-sans text-[11px] font-bold text-[#999999] uppercase tracking-[0.15em] mb-3">
          Wybrany pakiet
        </p>
        <h2 className="font-display font-bold text-[28px] text-[#111111] tracking-tight mb-2">
          {nazwa}
        </h2>
        <div className="flex items-baseline gap-4 mb-4">
          <div>
            <span className="font-sans text-[13px] text-[#888888]">
              Cena miesięczna:{" "}
            </span>
            <span className="font-display font-bold text-[20px] text-[#111111]">
              {formatPrice(cena)} zł
            </span>
            <span className="font-sans text-[13px] text-[#888888]">
              /mies.
            </span>
          </div>
          <div>
            <span className="font-sans text-[13px] text-[#888888]">
              Zaliczka (10%):{" "}
            </span>
            <span className="font-display font-bold text-[20px] text-[#111111]">
              {formatPrice(zaliczka)} zł
            </span>
          </div>
        </div>
        <p className="font-sans text-[14px] text-[#666666] leading-relaxed">
          Skontaktujemy się w ciągu 24h od złożenia zamówienia i natychmiast
          zaczniemy działać.
        </p>
      </motion.div>

      {/* Form card */}
      <motion.div
        {...fadeUp(0.35)}
        className="bg-white rounded-2xl border border-[#E5E5E5] p-8 mb-6"
      >
        <p className="font-sans text-[11px] font-bold text-[#999999] uppercase tracking-[0.15em] mb-4">
          Dane kontaktowe
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Imię *</label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className={inputClass}
                placeholder="Jan"
              />
            </div>
            <div>
              <label className={labelClass}>Nazwisko *</label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className={inputClass}
                placeholder="Kowalski"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Numer telefonu *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
                placeholder="+48 500 100 200"
              />
            </div>
            <div>
              <label className={labelClass}>Adres e-mail *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
                placeholder="jan@firma.pl"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClass}>Firma</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className={inputClass}
              placeholder="Nazwa firmy (opcjonalnie)"
            />
          </div>

          {/* Password section — only for non-logged-in users */}
          {!user && (
            <div className="mt-6 pt-6 border-t border-[#E5E5E5]">
              <p className="font-sans text-[13px] text-[#888888] mb-3">
                Podaj hasło, aby stworzyć konto i śledzić swoje zamówienie.
              </p>
              <div>
                <label className={labelClass}>Hasło *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className={inputClass}
                  placeholder="Min. 6 znaków"
                />
              </div>
            </div>
          )}

          {/* Payment info */}
          {/* PAYMENT_INTEGRATION_PLACEHOLDER */}
          {/* Docelowo: Przelewy24 lub inny procesor płatności */}
          {/* Na ten moment: zamówienie jest automatycznie uznawane za opłacone */}
          <div className="mt-6 pt-6 border-t border-[#E5E5E5]">
            <p className="font-sans text-[13px] text-[#888888] leading-relaxed">
              Zaliczka (10%):{" "}
              <strong className="text-[#111111]">
                {formatPrice(zaliczka)} zł
              </strong>{" "}
              — aktualnie płatność jest realizowana po kontakcie z zespołem.
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="mt-4 font-sans text-[13px] text-red-500">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full h-[48px] rounded-full bg-gradient-to-r from-[#4EA8FF] to-[#9B66FF] font-sans text-[15px] font-semibold text-white inline-flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "Złóż zamówienie"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function DokonczZamowieniePage() {
  return (
    <>
      <Nav />
      <main className="bg-[#F9F9F9] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <Loader2 size={24} className="animate-spin text-[#AAAAAA]" />
              </div>
            }
          >
            <OrderForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
