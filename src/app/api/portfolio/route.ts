import { NextRequest } from "next/server";
import { getAuthFromCookie } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/db";

interface PortfolioItem {
  id: string;
  name: string;
  url?: string;
  description: string;
  gradient: string;
  category: string;
  tags?: string[];
  duration?: string;
  order: number;
}

export async function GET() {
  const items = readJSON<PortfolioItem[]>("portfolio.json");
  return Response.json(items);
}

export async function POST(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== "admin") {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const body = await request.json();
  const items = readJSON<PortfolioItem[]>("portfolio.json");

  const newItem: PortfolioItem = {
    id: "ptf-" + Math.random().toString(36).slice(2, 8),
    name: body.name || "",
    url: body.url || "",
    description: body.description || "",
    gradient: body.gradient || "from-blue-600 to-indigo-800",
    category: body.category || "strony",
    tags: body.tags || [],
    order: items.length,
  };

  items.push(newItem);
  writeJSON("portfolio.json", items);
  return Response.json(newItem);
}

export async function PUT(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== "admin") {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const body = await request.json();
  const items = readJSON<PortfolioItem[]>("portfolio.json");
  const idx = items.findIndex((i) => i.id === body.id);

  if (idx === -1) {
    return Response.json({ error: "Nie znaleziono elementu" }, { status: 404 });
  }

  Object.assign(items[idx], {
    ...body,
    id: items[idx].id, // prevent id override
  });

  writeJSON("portfolio.json", items);
  return Response.json(items[idx]);
}

export async function DELETE(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== "admin") {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const { id } = await request.json();
  const items = readJSON<PortfolioItem[]>("portfolio.json");
  const filtered = items.filter((i) => i.id !== id);

  writeJSON("portfolio.json", filtered);
  return Response.json({ ok: true });
}
