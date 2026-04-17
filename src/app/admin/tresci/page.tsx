"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/content-types";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent);
  }, []);

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setSaved(false);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!content) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[#AAAAAA]" />
      </div>
    );
  }

  const field = (label: string, value: string, onChange: (v: string) => void) => (
    <div>
      <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
      />
    </div>
  );

  const textarea = (label: string, value: string, onChange: (v: string) => void, rows = 2) => (
    <div>
      <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF] resize-none"
      />
    </div>
  );

  const sectionClass = "bg-white rounded-2xl border border-[#EBEBEB] p-5";
  const sectionTitle = (title: string, subtitle?: string) => (
    <div className="mb-4">
      <h3 className="font-sans text-[14px] font-semibold text-[#111111]">{title}</h3>
      {subtitle && <p className="font-sans text-[11px] text-[#999999] mt-0.5">{subtitle}</p>}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#111111] tracking-tight mb-1">
            Treści strony
          </h1>
          <p className="font-sans text-[14px] text-[#888888]">
            Edytuj teksty, dane kontaktowe i ustawienia SEO
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-white font-sans text-[13px] font-medium hover:bg-[#333333] transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : null}
          {saving ? "Zapisywanie..." : saved ? "Zapisano!" : "Zapisz zmiany"}
        </button>
      </div>

      <div className="space-y-6">
        {/* General */}
        <section className={sectionClass}>
          {sectionTitle("Ogólne")}
          <div className="grid grid-cols-2 gap-4">
            {field("Nazwa strony", content.siteName, (v) => setContent({ ...content, siteName: v }))}
            {field("URL strony", content.siteUrl, (v) => setContent({ ...content, siteUrl: v }))}
            {field("Tagline", content.tagline, (v) => setContent({ ...content, tagline: v }))}
            {field("Google Analytics ID", content.googleAnalyticsId, (v) => setContent({ ...content, googleAnalyticsId: v }))}
          </div>
        </section>

        {/* Hero */}
        <section className={sectionClass}>
          {sectionTitle("Sekcja Hero", "Główna sekcja widoczna po wejściu na stronę")}
          <div className="grid grid-cols-2 gap-4">
            {field("Plakietka (badge)", content.hero?.badge || "", (v) => setContent({ ...content, hero: { ...content.hero, badge: v } }))}
            {field("Nagłówek — linia 1", content.hero?.headlineTop || "", (v) => setContent({ ...content, hero: { ...content.hero, headlineTop: v } }))}
            {field("Nagłówek — linia 2", content.hero?.headlineBottom || "", (v) => setContent({ ...content, hero: { ...content.hero, headlineBottom: v } }))}
            {field("Nagłówek — akcent (gradient)", content.hero?.headlineAccent || "", (v) => setContent({ ...content, hero: { ...content.hero, headlineAccent: v } }))}
            {field("Przycisk główny (biały)", content.hero?.ctaPrimary || "", (v) => setContent({ ...content, hero: { ...content.hero, ctaPrimary: v } }))}
            {field("Przycisk akcji (czarny)", content.hero?.ctaSecondary || "", (v) => setContent({ ...content, hero: { ...content.hero, ctaSecondary: v } }))}
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {field("Rotujący tekst — prefix", content.hero?.rotatingPrefix || "", (v) => setContent({ ...content, hero: { ...content.hero, rotatingPrefix: v } }))}
            {field("Rotujący tekst — suffix", content.hero?.rotatingSuffix || "", (v) => setContent({ ...content, hero: { ...content.hero, rotatingSuffix: v } }))}
          </div>

          {/* Rotating targets */}
          <div className="mt-4">
            <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-2">
              Rotujące słowa (wyświetlane w kapsule)
            </label>
            <div className="space-y-2">
              {(content.hero?.rotatingTargets || []).map((target, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={target}
                    onChange={(e) => {
                      const newTargets = [...(content.hero?.rotatingTargets || [])];
                      newTargets[i] = e.target.value;
                      setContent({ ...content, hero: { ...content.hero, rotatingTargets: newTargets } });
                    }}
                    className="flex-1 h-9 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
                  />
                  <button
                    onClick={() => {
                      const newTargets = (content.hero?.rotatingTargets || []).filter((_, idx) => idx !== i);
                      setContent({ ...content, hero: { ...content.hero, rotatingTargets: newTargets } });
                    }}
                    className="p-1.5 text-[#CC0000] hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newTargets = [...(content.hero?.rotatingTargets || []), ""];
                  setContent({ ...content, hero: { ...content.hero, rotatingTargets: newTargets } });
                }}
                className="flex items-center gap-1.5 font-sans text-[12px] font-medium text-[#4EA8FF] hover:text-[#3a8cd9] transition-colors"
              >
                <Plus size={14} /> Dodaj słowo
              </button>
            </div>
          </div>

          {/* Clients */}
          <div className="mt-4">
            <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-2">
              Klienci (pasek marquee na dole hero)
            </label>
            <div className="space-y-2">
              {(content.hero?.clients || []).map((client, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={client}
                    onChange={(e) => {
                      const newClients = [...(content.hero?.clients || [])];
                      newClients[i] = e.target.value;
                      setContent({ ...content, hero: { ...content.hero, clients: newClients } });
                    }}
                    className="flex-1 h-9 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
                  />
                  <button
                    onClick={() => {
                      const newClients = (content.hero?.clients || []).filter((_, idx) => idx !== i);
                      setContent({ ...content, hero: { ...content.hero, clients: newClients } });
                    }}
                    className="p-1.5 text-[#CC0000] hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newClients = [...(content.hero?.clients || []), ""];
                  setContent({ ...content, hero: { ...content.hero, clients: newClients } });
                }}
                className="flex items-center gap-1.5 font-sans text-[12px] font-medium text-[#4EA8FF] hover:text-[#3a8cd9] transition-colors"
              >
                <Plus size={14} /> Dodaj klienta
              </button>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className={sectionClass}>
          {sectionTitle("Sekcja kontaktowa (CTA)", "Sekcja z formularzem kontaktowym i rezerwacją rozmowy")}
          <div className="grid grid-cols-1 gap-4">
            {field("Nagłówek", content.contactCta?.heading || "", (v) => setContent({ ...content, contactCta: { ...content.contactCta, heading: v } }))}
            {textarea("Opis", content.contactCta?.description || "", (v) => setContent({ ...content, contactCta: { ...content.contactCta, description: v } }))}
            {field("Tekst przycisku email", content.contactCta?.emailButtonLabel || "", (v) => setContent({ ...content, contactCta: { ...content.contactCta, emailButtonLabel: v } }))}
          </div>
        </section>

        {/* Footer */}
        <section className={sectionClass}>
          {sectionTitle("Stopka", "Tekst w dolnej części strony")}
          <div className="grid grid-cols-1 gap-4">
            {textarea("Opis w stopce", content.footer?.description || "", (v) => setContent({ ...content, footer: { ...content.footer, description: v } }))}
            {field("Prawa autorskie", content.footer?.copyright || "", (v) => setContent({ ...content, footer: { ...content.footer, copyright: v } }))}
          </div>
        </section>

        {/* Contact */}
        <section className={sectionClass}>
          {sectionTitle("Kontakt")}
          <div className="grid grid-cols-3 gap-4">
            {field("Email", content.contact.email, (v) => setContent({ ...content, contact: { ...content.contact, email: v } }))}
            {field("Telefon", content.contact.phone, (v) => setContent({ ...content, contact: { ...content.contact, phone: v } }))}
            {field("Adres", content.contact.address, (v) => setContent({ ...content, contact: { ...content.contact, address: v } }))}
          </div>
        </section>

        {/* Social */}
        <section className={sectionClass}>
          {sectionTitle("Social Media")}
          <div className="grid grid-cols-2 gap-4">
            {field("Instagram", content.social.instagram, (v) => setContent({ ...content, social: { ...content.social, instagram: v } }))}
            {field("Facebook", content.social.facebook, (v) => setContent({ ...content, social: { ...content.social, facebook: v } }))}
            {field("LinkedIn", content.social.linkedin, (v) => setContent({ ...content, social: { ...content.social, linkedin: v } }))}
            {field("TikTok", content.social.tiktok, (v) => setContent({ ...content, social: { ...content.social, tiktok: v } }))}
          </div>
        </section>

        {/* SEO */}
        <section className={sectionClass}>
          {sectionTitle("SEO")}
          <div className="grid grid-cols-1 gap-4">
            {field("Tytuł strony", content.seo.title, (v) => setContent({ ...content, seo: { ...content.seo, title: v } }))}
            {textarea("Meta opis", content.seo.description, (v) => setContent({ ...content, seo: { ...content.seo, description: v } }))}
            {field("OG Image URL", content.seo.ogImage, (v) => setContent({ ...content, seo: { ...content.seo, ogImage: v } }))}
          </div>
        </section>

        {/* Stats */}
        <section className={sectionClass}>
          {sectionTitle("Statystyki", "Liczby wyświetlane na stronie głównej")}
          <div className="space-y-3">
            {content.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-sans text-[11px] font-semibold text-[#888888] mb-1">Wartość</label>
                  <input
                    type="number"
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...content.stats];
                      newStats[i] = { ...stat, value: Number(e.target.value) };
                      setContent({ ...content, stats: newStats });
                    }}
                    className="w-full h-9 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[11px] font-semibold text-[#888888] mb-1">Etykieta</label>
                  <input
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...content.stats];
                      newStats[i] = { ...stat, label: e.target.value };
                      setContent({ ...content, stats: newStats });
                    }}
                    className="w-full h-9 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[11px] font-semibold text-[#888888] mb-1">Sufiks</label>
                  <input
                    value={stat.suffix}
                    onChange={(e) => {
                      const newStats = [...content.stats];
                      newStats[i] = { ...stat, suffix: e.target.value };
                      setContent({ ...content, stats: newStats });
                    }}
                    className="w-full h-9 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
                    placeholder="%, +, etc."
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
