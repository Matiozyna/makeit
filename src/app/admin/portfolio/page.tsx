"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";

interface PortfolioItem {
  id: string;
  name: string;
  url?: string;
  description: string;
  gradient: string;
  category: string;
  tags?: string[];
  order: number;
}

const emptyItem: Omit<PortfolioItem, "id" | "order"> = {
  name: "",
  url: "",
  description: "",
  gradient: "from-blue-600 to-indigo-800",
  category: "strony",
  tags: [],
};

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editItem, setEditItem] = useState<Partial<PortfolioItem> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setItems(data));
  }, []);

  const save = async () => {
    if (!editItem?.name) return;
    const method = isNew ? "POST" : "PUT";
    const res = await fetch("/api/portfolio", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editItem),
    });
    if (res.ok) {
      const saved = await res.json();
      if (isNew) {
        setItems([...items, saved]);
      } else {
        setItems(items.map((i) => (i.id === saved.id ? saved : i)));
      }
      setEditItem(null);
      setIsNew(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Usunąć ten element z portfolio?")) return;
    const res = await fetch("/api/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#111111] tracking-tight mb-1">
            Portfolio
          </h1>
          <p className="font-sans text-[14px] text-[#888888]">
            Zarządzaj projektami w portfolio ({items.length})
          </p>
        </div>
        <button
          onClick={() => { setEditItem({ ...emptyItem }); setIsNew(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-white font-sans text-[13px] font-medium hover:bg-[#333333] transition-colors"
        >
          <Plus size={15} /> Dodaj projekt
        </button>
      </div>

      {/* Edit/Add form */}
      {editItem && (
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-sans text-[15px] font-semibold text-[#111111]">
              {isNew ? "Nowy projekt" : "Edycja projektu"}
            </h3>
            <button onClick={() => { setEditItem(null); setIsNew(false); }} className="text-[#AAAAAA] hover:text-[#666666]">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Nazwa</label>
              <input
                value={editItem.name || ""}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
              />
            </div>
            <div>
              <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">URL</label>
              <input
                value={editItem.url || ""}
                onChange={(e) => setEditItem({ ...editItem, url: e.target.value })}
                className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
              />
            </div>
            <div>
              <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Kategoria</label>
              <select
                value={editItem.category || "strony"}
                onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
              >
                <option value="strony">Strony</option>
                <option value="foto">Fotografia</option>
                <option value="wideo">Wideo</option>
              </select>
            </div>
            <div>
              <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Gradient (Tailwind)</label>
              <input
                value={editItem.gradient || ""}
                onChange={(e) => setEditItem({ ...editItem, gradient: e.target.value })}
                className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
                placeholder="from-blue-600 to-indigo-800"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Opis</label>
            <textarea
              value={editItem.description || ""}
              onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
              rows={2}
              className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF] resize-none"
            />
          </div>
          <div className="mb-4">
            <label className="block font-sans text-[12px] font-semibold text-[#666666] mb-1">Tagi (oddzielone przecinkami)</label>
            <input
              value={(editItem.tags || []).join(", ")}
              onChange={(e) => setEditItem({ ...editItem, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
              className="w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
              placeholder="Next.js, E-learning, Dashboard"
            />
          </div>
          <button
            onClick={save}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-white font-sans text-[13px] font-medium hover:bg-[#333333] transition-colors"
          >
            <Check size={15} /> Zapisz
          </button>
        </div>
      )}

      {/* Items list */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#EBEBEB] p-4 flex items-center gap-4 hover:shadow-sm transition-all">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} shrink-0`} />
            <div className="flex-1 min-w-0">
              <h3 className="font-sans text-[14px] font-semibold text-[#111111] truncate">{item.name}</h3>
              <p className="font-sans text-[12px] text-[#888888] truncate">{item.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-full bg-[#F5F5F5] font-sans text-[10px] font-semibold text-[#666666]">
                  {item.category}
                </span>
                {item.tags?.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-[#F5F5F5] font-sans text-[10px] text-[#999999]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => { setEditItem({ ...item }); setIsNew(false); }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#AAAAAA] hover:text-[#4EA8FF] hover:bg-blue-50 transition-all"
              >
                <Pencil size={14} strokeWidth={1.75} />
              </button>
              <button
                onClick={() => remove(item.id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#AAAAAA] hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <Trash2 size={14} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
