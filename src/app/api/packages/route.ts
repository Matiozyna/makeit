import { NextRequest } from "next/server";
import { getAuthFromCookie } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/db";

interface Package {
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  priceLabel: string;
  highlighted: boolean;
  buttonStyle: string;
  subtitleStyle: string;
  features: string[];
}

export async function GET() {
  const packages = readJSON<Package[]>("packages.json");
  return Response.json(packages);
}

export async function PUT(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== "admin") {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const packages = await request.json();
  writeJSON("packages.json", packages);
  return Response.json(packages);
}
