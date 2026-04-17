"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  FileText,
  Briefcase,
  Package,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Użytkownicy", href: "/admin/uzytkownicy" },
  { icon: ShoppingCart, label: "Zamówienia", href: "/admin/zamowienia" },
  { icon: Briefcase, label: "Portfolio", href: "/admin/portfolio" },
  { icon: Package, label: "Pakiety", href: "/admin/pakiety" },
  { icon: FileText, label: "Treści", href: "/admin/tresci" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F7F8]">
      {/* Sidebar */}
      <aside
        className={`h-screen fixed left-0 top-0 z-40 flex flex-col bg-[#0D0D0D] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          collapsed ? "w-[64px]" : "w-[240px]"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex items-center h-[56px] shrink-0 border-b border-white/[0.06] ${
            collapsed ? "justify-center px-0" : "justify-between px-5"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-[26px] h-[26px] rounded-[6px] bg-gradient-to-br from-[#4EA8FF] to-[#9B66FF] flex items-center justify-center shrink-0">
              <span className="font-display font-black text-[11px] text-white leading-none">A</span>
            </div>
            {!collapsed && (
              <span className="font-display font-bold text-[15px] tracking-[-0.03em] text-white truncate">
                Admin Panel
              </span>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-white/20 hover:text-white/50 transition-colors"
            >
              <ChevronLeft size={14} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto pt-4 ${collapsed ? "px-2" : "px-3"}`}>
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href} title={collapsed ? item.label : undefined}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center transition-colors duration-150 ${
                      collapsed
                        ? `w-10 h-10 mx-auto justify-center rounded-lg ${
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-white/35 hover:text-white/60 hover:bg-white/5"
                          }`
                        : `gap-2.5 px-3 py-2 rounded-lg ${
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-white/40 hover:text-white/70 hover:bg-white/5"
                          }`
                    }`}
                  >
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 1.75} className="shrink-0" />
                    {!collapsed && (
                      <span className="font-sans text-[13px] font-medium leading-none">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom */}
        <div className={`border-t border-white/[0.06] ${collapsed ? "px-2 py-4" : "px-3 py-4"}`}>
          <button
            onClick={logout}
            className={`flex items-center transition-colors duration-150 text-white/35 hover:text-red-400 hover:bg-white/5 rounded-lg ${
              collapsed ? "w-10 h-10 mx-auto justify-center" : "gap-2.5 px-3 py-2 w-full"
            }`}
            title="Wyloguj"
          >
            <LogOut size={16} strokeWidth={1.75} className="shrink-0" />
            {!collapsed && (
              <span className="font-sans text-[13px] font-medium">Wyloguj</span>
            )}
          </button>

          {!collapsed && user && (
            <div className="mt-3 px-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4EA8FF] to-[#9B66FF] flex items-center justify-center shrink-0">
                <span className="font-sans text-[9px] font-bold text-white">
                  {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-sans text-[11px] font-medium text-white/55 truncate">{user.name}</p>
                <p className="font-sans text-[10px] text-white/25 truncate">{user.email}</p>
              </div>
            </div>
          )}

          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-white/20 hover:text-white/50 transition-colors mx-auto mt-2"
            >
              <ChevronRight size={13} strokeWidth={2} />
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          collapsed ? "ml-[64px]" : "ml-[240px]"
        }`}
      >
        <header className="h-[56px] px-8 flex items-center justify-between shrink-0 border-b border-[#EBEBEB] bg-[#F7F7F8]">
          <nav className="flex items-center gap-1.5 font-sans text-[13px]">
            <Link href="/admin" className="text-[#999999] hover:text-[#666666] transition-colors">
              Admin
            </Link>
            {pathname !== "/admin" && (
              <>
                <span className="text-[#DEDEDE]">/</span>
                <span className="font-medium text-[#111111]">
                  {navItems.find((i) => pathname.startsWith(i.href) && i.href !== "/admin")?.label || ""}
                </span>
              </>
            )}
          </nav>
          <Link href="/panel" className="font-sans text-[12px] font-medium text-[#999999] hover:text-[#4EA8FF] transition-colors">
            Panel klienta &rarr;
          </Link>
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="max-w-[1100px] mx-auto px-8 pt-6 pb-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
