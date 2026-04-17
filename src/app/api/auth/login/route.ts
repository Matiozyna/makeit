import { NextRequest } from "next/server";
import { readJSON } from "@/lib/db";
import { verifyPassword, signToken, setAuthCookie } from "@/lib/auth";

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email i hasło są wymagane" },
        { status: 400 }
      );
    }

    const users = readJSON<User[]>("users.json");
    const user = users.find((u) => u.email === email);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return Response.json(
        { error: "Nieprawidłowy email lub hasło" },
        { status: 401 }
      );
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    await setAuthCookie(token);

    return Response.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch {
    return Response.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
