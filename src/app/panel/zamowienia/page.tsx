"use client";

import { useEffect, useState } from "react";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

interface Order {
  id: string;
  service: string;
  variant: string;
  budget: string;
  deadline: string;
  description: string;
  status: string;
  paymentStatus?: string;
  depositAmount?: number;
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; icon: typeof Clock; cls: string }> = {
  pending: { label: "Oczekujące", icon: Clock, cls: "bg-amber-50 text-amber-600 border-amber-200" },
  in_progress: { label: "W trakcie", icon: Package, cls: "bg-blue-50 text-blue-600 border-blue-200" },
  completed: { label: "Ukończone", icon: CheckCircle, cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  cancelled: { label: "Anulowane", icon: XCircle, cls: "bg-red-50 text-red-500 border-red-200" },
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="font-display text-[28px] font-bold text-[#111111] tracking-tight mb-1">
        Moje zamówienia
      </h1>
      <p className="font-sans text-[14px] text-[#888888] mb-6">
        Historia Twoich zamówień i ich statusy
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#E5E5E5] border-t-[#111111] rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EBEBEB] px-5 py-16 text-center">
          <Package size={40} className="mx-auto text-[#DEDEDE] mb-4" />
          <p className="font-sans text-[15px] font-medium text-[#888888] mb-1">
            Nie masz jeszcze żadnych zamówień
          </p>
          <p className="font-sans text-[13px] text-[#AAAAAA]">
            Skontaktuj się z nami, aby rozpocząć współpracę
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const sc = statusConfig[order.status] || statusConfig.pending;
            const Icon = sc.icon;
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-[#EBEBEB] p-5 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-sans text-[15px] font-semibold text-[#111111] mb-0.5">
                      {order.service} — {order.variant}
                    </h3>
                    <p className="font-sans text-[12px] text-[#999999]">
                      Zamówienie #{order.id} &middot; {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-sans text-[11px] font-semibold shrink-0 ${sc.cls}`}>
                    <Icon size={12} />
                    {sc.label}
                  </span>
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
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-semibold text-[11px] ${
                    order.paymentStatus === "pending_payment"
                      ? "bg-amber-50 text-amber-600 border-amber-200"
                      : "bg-emerald-50 text-emerald-600 border-emerald-200"
                  }`}>
                    {order.paymentStatus === "pending_payment" ? "Oczekuje na płatność" : "Opłacone"}
                  </span>
                  <span>Ostatnia aktualizacja: {new Date(order.updatedAt).toLocaleDateString("pl-PL")}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
