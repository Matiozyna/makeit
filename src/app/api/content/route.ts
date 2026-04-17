import { NextRequest } from "next/server";
import { getAuthFromCookie } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/db";
import type { SiteContent } from "@/lib/content-types";

export async function GET() {
  const content = readJSON<SiteContent>("content.json");
  return Response.json(content);
}

export async function PUT(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== "admin") {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const body = await request.json();
  const content = readJSON<SiteContent>("content.json");
  const updated = { ...content, ...body };

  writeJSON("content.json", updated);
  return Response.json(updated);
}
