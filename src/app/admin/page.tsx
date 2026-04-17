"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, ShoppingCart, Briefcase, FileText } from "lucide-react";

interface Stats {
  users: number;
  orders: number;
  portfolio: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ users: 0, orders: 0, portfolio: 0, pendingOrders: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/users").then((r) => r.json()),
      fetch("/api/orders").then((r) => r.json()),
      fetch("/api/portfolio").then((r) => r.json()),
    ]).then(([users, orders, portfolio]) => {
      setStats({
        users: Array.isArray(users) ? users.length : 0,
        orders: Array.isArray(orders) ? orders.length : 0,
        portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
        pendingOrders: Array.isArray(orders) ? orders.filter((o: { status: string }) => o.status === "pending").length : 0,
      });
    });
  }, []);

  const cards = [
    { label: "Użytkownicy", value: stats.users, icon: Users, href: "/admin/uzytkownicy", color: "from-blue-500 to-blue-600" },
    { label: "Zamówienia", value: stats.orders, icon: ShoppingCart, href: "/admin/zamowienia", color: "from-emerald-500 to-emerald-600", sub: `${stats.pendingOrders} oczekujących` },
    { label: "Portfolio", value: stats.portfolio, icon: Briefcase, href: "/admin/portfolio", color: "from-purple-500 to-purple-600" },
    { label: "Treści", value: "Edytuj", icon: FileText, href: "/admin/tresci", color: "from-amber-500 to-amber-600" },
  ];

  return (
    <div>
      <h1 className="font-display text-[28px] font-bold text-[#111111] tracking-tight mb-1">
        Panel administracyjny
      </h1>
      <p className="font-sans text-[14px] text-[#888888] mb-8">
        Zarządzaj treścią strony, portfolio, użytkownikami i zamówieniami.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-white rounded-2xl border border-[#EBEBEB] p-5 hover:shadow-lg hover:border-[#D0D0D0] transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                <Icon size={18} className="text-white" strokeWidth={2} />
              </div>
              <p className="font-display text-[24px] font-bold text-[#111111] mb-0.5">
                {card.value}
              </p>
              <p className="font-sans text-[13px] text-[#888888] font-medium">
                {card.label}
              </p>
              {card.sub && (
                <p className="font-sans text-[11px] text-[#4EA8FF] font-medium mt-1">{card.sub}</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
