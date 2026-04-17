"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";

interface Package {
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  priceLabel: string;
  highlighted: boolean;
  buttonStyle: string;
  subtitleStyle: string;
  features: string[];
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then(setPackages);
  }, []);

  const save = async () => {
    if (!packages) return;
    setSaving(true);
    setSaved(false);
    await fetch("/api/packages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packages),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!packages) {
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

  const numberField = (label: string, value: number, onChange: (v: number) => void) => (
    <div>
      <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
      />
    </div>
  );

  const sectionClass = "bg-white rounded-2xl border border-[#EBEBEB] p-5";

  const updatePkg = (index: number, updates: Partial<Package>) => {
    const updated = [...packages];
    updated[index] = { ...updated[index], ...updates };
    setPackages(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#111111] tracking-tight mb-1">
            Pakiety cenowe
          </h1>
          <p className="font-sans text-[14px] text-[#888888]">
            Edytuj pakiety wyświetlane na stronie /pakiety
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
        {packages.map((pkg, i) => (
          <section key={i} className={sectionClass}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans text-[14px] font-semibold text-[#111111]">
                Pakiet {i + 1}: {pkg.name || "(bez nazwy)"}
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pkg.highlighted}
                  onChange={(e) => updatePkg(i, { highlighted: e.target.checked })}
                  className="w-4 h-4 rounded accent-[#4EA8FF]"
                />
                <span className="font-sans text-[12px] text-[#666666]">Wyróżniony</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {field("Nazwa pakietu", pkg.name, (v) => updatePkg(i, { name: v }))}
              {field("Podtytuł", pkg.subtitle, (v) => updatePkg(i, { subtitle: v }))}
              {field("Slug (URL)", pkg.slug, (v) => updatePkg(i, { slug: v }))}
              {numberField("Cena (liczbowo)", pkg.price, (v) => updatePkg(i, { price: v }))}
              {field("Etykieta ceny", pkg.priceLabel, (v) => updatePkg(i, { priceLabel: v }))}
              <div>
                <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Styl przycisku</label>
                <select
                  value={pkg.buttonStyle}
                  onChange={(e) => updatePkg(i, { buttonStyle: e.target.value })}
                  className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF] bg-white"
                >
                  <option value="outline">Outline (biały)</option>
                  <option value="gradient">Gradient (niebieski→fiolet)</option>
                  <option value="solid">Solid (czarny)</option>
                </select>
              </div>
              <div>
                <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Styl podtytułu</label>
                <select
                  value={pkg.subtitleStyle}
                  onChange={(e) => updatePkg(i, { subtitleStyle: e.target.value })}
                  className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF] bg-white"
                >
                  <option value="gray">Szary</option>
                  <option value="gold">Złoty</option>
                  <option value="gradient">Gradient</option>
                </select>
              </div>
            </div>

            {/* Features */}
            <div className="mt-4">
              <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-2">
                Lista funkcji
              </label>
              <div className="space-y-2">
                {pkg.features.map((feature, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <input
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...pkg.features];
                        newFeatures[fi] = e.target.value;
                        updatePkg(i, { features: newFeatures });
                      }}
                      className="flex-1 h-9 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
                    />
                    <button
                      onClick={() => {
                        const newFeatures = pkg.features.filter((_, idx) => idx !== fi);
                        updatePkg(i, { features: newFeatures });
                      }}
                      className="p-1.5 text-[#CC0000] hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    updatePkg(i, { features: [...pkg.features, ""] });
                  }}
                  className="flex items-center gap-1.5 font-sans text-[12px] font-medium text-[#4EA8FF] hover:text-[#3a8cd9] transition-colors"
                >
                  <Plus size={14} /> Dodaj funkcję
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
