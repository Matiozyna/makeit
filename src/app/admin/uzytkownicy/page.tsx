"use client";

import { useEffect, useState } from "react";
import { Trash2, Shield, User, Plus, Pencil, X, Loader2, ChevronDown, ChevronUp } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  company: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Create form state
  const [createForm, setCreateForm] = useState({
    name: "", email: "", password: "", phone: "", company: "", role: "user",
  });
  const [createError, setCreateError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({ email: "", password: "" });
  const [editError, setEditError] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setUsers(data));
  }, []);

  const deleteUser = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć tego użytkownika?")) return;
    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setUsers(users.filter((u) => u.id !== id));
  };

  const toggleRole = async (user: UserData) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, role: newRole }),
    });
    if (res.ok) {
      setUsers(users.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)));
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    setCreateLoading(true);

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createForm),
    });

    const data = await res.json();
    setCreateLoading(false);

    if (!res.ok) {
      setCreateError(data.error || "Wystąpił błąd");
      return;
    }

    setUsers([...users, data]);
    setCreateForm({ name: "", email: "", password: "", phone: "", company: "", role: "user" });
    setShowCreate(false);
  };

  const startEdit = (user: UserData) => {
    setEditingId(user.id);
    setEditForm({ email: user.email, password: "" });
    setEditError("");
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setEditError("");
    setEditLoading(true);

    const body: Record<string, string> = { id: editingId, email: editForm.email };
    if (editForm.password) body.password = editForm.password;

    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setEditLoading(false);

    if (!res.ok) {
      setEditError(data.error || "Wystąpił błąd");
      return;
    }

    setUsers(users.map((u) => (u.id === editingId ? { ...u, ...data } : u)));
    setEditingId(null);
  };

  const inputClass = "w-full h-10 border border-[#E5E5E5] rounded-lg px-3 font-sans text-[13px] focus:outline-none focus:border-[#4EA8FF]";
  const labelClass = "block font-sans text-[12px] font-semibold text-[#666666] mb-1";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#111111] tracking-tight mb-1">
            Użytkownicy
          </h1>
          <p className="font-sans text-[14px] text-[#888888]">
            Zarządzaj kontami użytkowników ({users.length})
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-white font-sans text-[13px] font-medium hover:bg-[#333333] transition-colors"
        >
          {showCreate ? <ChevronUp size={15} /> : <Plus size={15} />}
          {showCreate ? "Zwiń formularz" : "Nowy użytkownik"}
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-5 mb-6">
          <h3 className="font-sans text-[14px] font-semibold text-[#111111] mb-4">Nowe konto</h3>
          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Imię i nazwisko *</label>
                <input
                  required
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  required
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Hasło *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  className={inputClass}
                  placeholder="Min. 6 znaków"
                />
              </div>
              <div>
                <label className={labelClass}>Telefon</label>
                <input
                  value={createForm.phone}
                  onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Firma</label>
                <input
                  value={createForm.company}
                  onChange={(e) => setCreateForm({ ...createForm, company: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Rola</label>
                <select
                  value={createForm.role}
                  onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                  className={`${inputClass} bg-white`}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            </div>
            {createError && (
              <p className="mt-3 font-sans text-[13px] text-red-500">{createError}</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={createLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-white font-sans text-[13px] font-medium hover:bg-[#333333] transition-colors disabled:opacity-60"
              >
                {createLoading && <Loader2 size={14} className="animate-spin" />}
                Utwórz konto
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#EBEBEB]">
              <th className="text-left px-5 py-3 font-sans text-[11px] font-semibold text-[#888888] uppercase tracking-wider">Użytkownik</th>
              <th className="text-left px-5 py-3 font-sans text-[11px] font-semibold text-[#888888] uppercase tracking-wider">Email</th>
              <th className="text-left px-5 py-3 font-sans text-[11px] font-semibold text-[#888888] uppercase tracking-wider">Rola</th>
              <th className="text-left px-5 py-3 font-sans text-[11px] font-semibold text-[#888888] uppercase tracking-wider">Firma</th>
              <th className="text-left px-5 py-3 font-sans text-[11px] font-semibold text-[#888888] uppercase tracking-wider">Data rejestracji</th>
              <th className="text-right px-5 py-3 font-sans text-[11px] font-semibold text-[#888888] uppercase tracking-wider">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <>
                <tr key={user.id} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        user.role === "admin"
                          ? "bg-gradient-to-br from-[#4EA8FF] to-[#9B66FF]"
                          : "bg-[#111111]"
                      }`}>
                        <span className="font-sans text-[9px] font-bold text-white">
                          {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-sans text-[13px] font-medium text-[#111111]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-sans text-[13px] text-[#666666]">{user.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans text-[11px] font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-50 text-purple-600"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {user.role === "admin" ? <Shield size={11} /> : <User size={11} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-sans text-[13px] text-[#666666]">{user.company || "—"}</td>
                  <td className="px-5 py-3.5 font-sans text-[12px] text-[#999999]">
                    {new Date(user.createdAt).toLocaleDateString("pl-PL")}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => editingId === user.id ? setEditingId(null) : startEdit(user)}
                        title="Edytuj dane logowania"
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          editingId === user.id
                            ? "text-[#4EA8FF] bg-blue-50"
                            : "text-[#AAAAAA] hover:text-[#4EA8FF] hover:bg-blue-50"
                        }`}
                      >
                        {editingId === user.id ? <X size={14} strokeWidth={1.75} /> : <Pencil size={14} strokeWidth={1.75} />}
                      </button>
                      <button
                        onClick={() => toggleRole(user)}
                        title="Zmień rolę"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#AAAAAA] hover:text-[#4EA8FF] hover:bg-blue-50 transition-all"
                      >
                        <Shield size={14} strokeWidth={1.75} />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        title="Usuń"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#AAAAAA] hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={14} strokeWidth={1.75} />
                      </button>
                    </div>
                  </td>
                </tr>
                {editingId === user.id && (
                  <tr key={`edit-${user.id}`} className="border-b border-[#F5F5F5]">
                    <td colSpan={6} className="px-5 py-4 bg-[#FAFAFA]">
                      <form onSubmit={handleEdit} className="flex items-end gap-4">
                        <div className="flex-1">
                          <label className={labelClass}>Email</label>
                          <input
                            type="email"
                            required
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                        <div className="flex-1">
                          <label className={labelClass}>Nowe hasło (opcjonalne)</label>
                          <input
                            type="password"
                            value={editForm.password}
                            onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                            className={inputClass}
                            placeholder="Zostaw puste aby nie zmieniać"
                            minLength={6}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={editLoading}
                          className="flex items-center gap-2 h-10 px-4 rounded-lg bg-[#111111] text-white font-sans text-[13px] font-medium hover:bg-[#333333] transition-colors disabled:opacity-60 shrink-0"
                        >
                          {editLoading && <Loader2 size={14} className="animate-spin" />}
                          Zapisz
                        </button>
                      </form>
                      {editError && (
                        <p className="mt-2 font-sans text-[13px] text-red-500">{editError}</p>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="px-5 py-12 text-center font-sans text-[14px] text-[#AAAAAA]">
            Brak użytkowników
          </div>
        )}
      </div>
    </div>
  );
}
