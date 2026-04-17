"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

interface Order {
  id: string;
  userId: string | null;
  service: string;
  variant: string;
  budget: string;
  deadline: string;
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
  notes: string;
  paymentStatus?: string;
  depositAmount?: number;
  createdAt: string;
  updatedAt: string;
}

const statusLabels: Record<string, { label: string; cls: string }> = {
  pending: { label: "Oczekujące", cls: "bg-amber-50 text-amber-600" },
  in_progress: { label: "W trakcie", cls: "bg-blue-50 text-blue-600" },
  completed: { label: "Ukończone", cls: "bg-emerald-50 text-emerald-600" },
  cancelled: { label: "Anulowane", cls: "bg-red-50 text-red-500" },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setOrders(data));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders(orders.map((o) => (o.id === id ? updated : o)));
    }
  };

  const saveNotes = async (id: string) => {
    const res = await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes: editNotes }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders(orders.map((o) => (o.id === id ? updated : o)));
      setEditingId(null);
    }
  };

  // PAYMENT_INTEGRATION_PLACEHOLDER: Docelowo automatyczna zmiana przez webhook Przelewy24
  const togglePaymentStatus = async (order: Order) => {
    const newStatus = order.paymentStatus === "paid" ? "pending_payment" : "paid";
    const res = await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: order.id, paymentStatus: newStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders(orders.map((o) => (o.id === order.id ? updated : o)));
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć to zamówienie?")) return;
    const res = await fetch("/api/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setOrders(orders.filter((o) => o.id !== id));
  };

  return (
    <div>
      <h1 className="font-display text-[28px] font-bold text-[#111111] tracking-tight mb-1">
        Zamówienia
      </h1>
      <p className="font-sans text-[14px] text-[#888888] mb-6">
        Zarządzaj zamówieniami klientów ({orders.length})
      </p>

      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const st = statusLabels[order.status] || statusLabels.pending;
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-[#EBEBEB] p-5 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-sans text-[15px] font-semibold text-[#111111]">
                      {order.service} — {order.variant}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full font-sans text-[11px] font-semibold ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                  <p className="font-sans text-[12px] text-[#999999]">
                    {order.contactName} &middot; {order.contactEmail} &middot; {order.contactPhone}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="font-sans text-[12px] border border-[#E5E5E5] rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-[#4EA8FF]"
                  >
                    <option value="pending">Oczekujące</option>
                    <option value="in_progress">W trakcie</option>
                    <option value="completed">Ukończone</option>
                    <option value="cancelled">Anulowane</option>
                  </select>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#AAAAAA] hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={14} strokeWidth={1.75} />
                  </button>
                </div>
              </div>

              {order.description && (
                <p className="font-sans text-[13px] text-[#666666] mb-3 leading-relaxed">{order.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-[12px] font-sans text-[#999999]">
                <span>Budżet: <strong className="text-[#666666]">{order.budget}</strong></span>
                {order.deadline && <span>Deadline: <strong className="text-[#666666]">{order.deadline}</strong></span>}
                {(order.depositAmount != null && order.depositAmount > 0) && (
                  <span>Zaliczka: <strong className="text-[#666666]">{order.depositAmount} zł</strong></span>
                )}
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold text-[11px] ${
                  order.paymentStatus === "pending_payment"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}>
                  {order.paymentStatus === "pending_payment" ? "Oczekuje na płatność" : "Opłacone"}
                </span>
                <button
                  onClick={() => togglePaymentStatus(order)}
                  className="font-sans text-[11px] font-medium text-[#4EA8FF] hover:underline"
                >
                  {order.paymentStatus === "paid" ? "Cofnij płatność" : "Oznacz jako opłacone"}
                </button>
                <span>Utworzono: {new Date(order.createdAt).toLocaleDateString("pl-PL")}</span>
              </div>

              {/* Notes */}
              <div className="mt-3 pt-3 border-t border-[#F5F5F5]">
                {editingId === order.id ? (
                  <div className="flex gap-2">
                    <input
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      className="flex-1 h-9 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]"
                      placeholder="Notatki..."
                    />
                    <button
                      onClick={() => saveNotes(order.id)}
                      className="px-3 h-9 rounded-lg bg-[#111111] text-white font-sans text-[12px] font-medium hover:bg-[#333333] transition-colors"
                    >
                      Zapisz
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 h-9 rounded-lg border border-[#E5E5E5] font-sans text-[12px] font-medium text-[#666666] hover:bg-[#F5F5F5] transition-colors"
                    >
                      Anuluj
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditingId(order.id); setEditNotes(order.notes); }}
                    className="font-sans text-[12px] text-[#AAAAAA] hover:text-[#4EA8FF] transition-colors"
                  >
                    {order.notes ? `Notatki: ${order.notes}` : "+ Dodaj notatkę"}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#EBEBEB] px-5 py-12 text-center font-sans text-[14px] text-[#AAAAAA]">
            Brak zamówień
          </div>
        )}
      </div>
    </div>
  );
}
