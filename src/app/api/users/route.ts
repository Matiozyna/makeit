import { NextRequest } from "next/server";
import { getAuthFromCookie } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  phone: string;
  company: string;
  createdAt: string;
}

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== "admin") {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const users = readJSON<User[]>("users.json");
  const safeUsers = users.map(({ passwordHash: _, ...rest }) => rest);
  return Response.json(safeUsers);
}

export async function PUT(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return Response.json({ error: "Brak dostępu" }, { status: 401 });
  }

  const body = await request.json();
  const users = readJSON<User[]>("users.json");
  const idx = users.findIndex((u) => u.id === body.id);

  if (idx === -1) {
    return Response.json({ error: "Nie znaleziono użytkownika" }, { status: 404 });
  }

  // Regular users can only edit their own account
  if (auth.role !== "admin" && auth.userId !== body.id) {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  if (body.name) users[idx].name = body.name;
  if (body.email) users[idx].email = body.email;
  if (body.phone !== undefined) users[idx].phone = body.phone;
  if (body.company !== undefined) users[idx].company = body.company;
  if (body.password) users[idx].passwordHash = hashPassword(body.password);
  // Only admin can change role
  if (body.role && auth.role === "admin") users[idx].role = body.role;

  writeJSON("users.json", users);

  const { passwordHash: _, ...safeUser } = users[idx];
  return Response.json(safeUser);
}

export async function POST(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== "admin") {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const { name, email, password, phone, company, role } = await request.json();

  if (!name || !email || !password) {
    return Response.json({ error: "Imię, email i hasło są wymagane" }, { status: 400 });
  }

  if (password.length < 6) {
    return Response.json({ error: "Hasło musi mieć minimum 6 znaków" }, { status: 400 });
  }

  const users = readJSON<User[]>("users.json");

  if (users.find((u) => u.email === email)) {
    return Response.json({ error: "Konto z tym adresem email już istnieje" }, { status: 409 });
  }

  const newUser: User = {
    id: Math.random().toString(36).slice(2) + Date.now().toString(36),
    name,
    email,
    passwordHash: hashPassword(password),
    role: role || "user",
    phone: phone || "",
    company: company || "",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeJSON("users.json", users);

  const { passwordHash: _, ...safeUser } = newUser;
  return Response.json(safeUser);
}

export async function DELETE(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== "admin") {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const { id } = await request.json();
  const users = readJSON<User[]>("users.json");
  const filtered = users.filter((u) => u.id !== id);

  if (filtered.length === users.length) {
    return Response.json({ error: "Nie znaleziono użytkownika" }, { status: 404 });
  }

  writeJSON("users.json", filtered);
  return Response.json({ ok: true });
}
