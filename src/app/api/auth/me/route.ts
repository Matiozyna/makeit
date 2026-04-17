import { getAuthFromCookie } from "@/lib/auth";
import { readJSON } from "@/lib/db";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  company: string;
  createdAt: string;
}

export async function GET() {
  const payload = await getAuthFromCookie();
  if (!payload) {
    return Response.json({ user: null }, { status: 401 });
  }

  const users = readJSON<User[]>("users.json");
  const user = users.find((u) => u.id === payload.userId);

  if (!user) {
    return Response.json({ user: null }, { status: 401 });
  }

  return Response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      company: user.company,
      createdAt: user.createdAt,
    },
  });
}
