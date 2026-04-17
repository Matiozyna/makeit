"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Check, Loader2 } from "lucide-react";

export default function AccountPage() {
  const { user, refresh } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setCompany(user.company || "");
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);

    const body: Record<string, string> = {
      id: user!.id,
      name,
      email,
      phone,
      company,
    };
    if (newPassword) body.password = newPassword;

    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setSaved(true);
      setNewPassword("");
      await refresh();
      setTimeout(() => setSaved(false), 2000);
    } else {
      const data = await res.json();
      setError(data.error || "Błąd zapisu");
    }
    setSaving(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[#AAAAAA]" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-[28px] font-bold text-[#111111] tracking-tight mb-1">
        Moje konto
      </h1>
      <p className="font-sans text-[14px] text-[#888888] mb-6">
        Zarządzaj swoimi danymi osobowymi
      </p>

      <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 max-w-[600px]">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#F5F5F5]">
          <div className="w-14 h-14 rounded-full bg-[#111111] flex items-center justify-center">
            <span className="font-sans text-[16px] font-bold text-white">
              {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-sans text-[16px] font-semibold text-[#111111]">{user.name}</p>
            <p className="font-sans text-[13px] text-[#888888]">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Imię i nazwisko</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
              />
            </div>
            <div>
              <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Firma</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
              />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Adres e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
            />
          </div>

          <div>
            <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Telefon</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
            />
          </div>

          <div className="pt-4 border-t border-[#F5F5F5]">
            <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">
              Nowe hasło <span className="font-normal text-[#AAAAAA]">(zostaw puste, jeśli nie chcesz zmieniać)</span>
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-sans text-[13px]">
            {error}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] text-white font-sans text-[13px] font-medium hover:bg-[#333333] transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : null}
          {saving ? "Zapisywanie..." : saved ? "Zapisano!" : "Zapisz zmiany"}
        </button>
      </div>
    </div>
  );
}
