import { NextRequest } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { hashPassword, signToken, setAuthCookie } from "@/lib/auth";

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

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, company } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: "Imię, email i hasło są wymagane" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Hasło musi mieć minimum 6 znaków" },
        { status: 400 }
      );
    }

    const users = readJSON<User[]>("users.json");

    if (users.find((u) => u.email === email)) {
      return Response.json(
        { error: "Konto z tym adresem email już istnieje" },
        { status: 409 }
      );
    }

    const newUser: User = {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name,
      email,
      passwordHash: hashPassword(password),
      role: "user",
      phone: phone || "",
      company: company || "",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeJSON("users.json", users);

    const token = await signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    await setAuthCookie(token);

    return Response.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch {
    return Response.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
