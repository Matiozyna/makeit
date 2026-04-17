import { NextRequest } from "next/server";
import { getAuthFromCookie } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/db";

interface Order {
  id: string;
  userId: string | null;
  service: string;
  variant: string;
  budget: string;
  deadline: string;
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
  notes: string;
  paymentStatus: string;
  depositAmount: number;
  createdAt: string;
  updatedAt: string;
}

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return Response.json({ error: "Brak dostępu" }, { status: 401 });
  }

  const orders = readJSON<Order[]>("orders.json");

  if (auth.role === "admin") {
    return Response.json(orders);
  }

  // Regular users see only their own orders
  const userOrders = orders.filter((o) => o.userId === auth.userId);
  return Response.json(userOrders);
}

export async function POST(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return Response.json({ error: "Brak dostępu" }, { status: 401 });
  }

  const body = await request.json();
  const orders = readJSON<Order[]>("orders.json");

  const newOrder: Order = {
    id: "ord-" + Math.random().toString(36).slice(2, 8),
    userId: auth.userId,
    service: body.service || "",
    variant: body.variant || "",
    budget: body.budget || "",
    deadline: body.deadline || "",
    description: body.description || "",
    contactName: body.contactName || "",
    contactEmail: body.contactEmail || auth.email,
    contactPhone: body.contactPhone || "",
    status: body.status || "pending",
    notes: "",
    paymentStatus: body.paymentStatus || "pending_payment",
    depositAmount: body.depositAmount || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  writeJSON("orders.json", orders);
  return Response.json(newOrder);
}

export async function PUT(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== "admin") {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const body = await request.json();
  const orders = readJSON<Order[]>("orders.json");
  const idx = orders.findIndex((o) => o.id === body.id);

  if (idx === -1) {
    return Response.json({ error: "Nie znaleziono zamówienia" }, { status: 404 });
  }

  if (body.status) orders[idx].status = body.status;
  if (body.notes !== undefined) orders[idx].notes = body.notes;
  if (body.userId !== undefined) orders[idx].userId = body.userId;
  if (body.paymentStatus) orders[idx].paymentStatus = body.paymentStatus;
  if (body.depositAmount !== undefined) orders[idx].depositAmount = body.depositAmount;
  orders[idx].updatedAt = new Date().toISOString();

  writeJSON("orders.json", orders);
  return Response.json(orders[idx]);
}

export async function DELETE(request: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== "admin") {
    return Response.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const { id } = await request.json();
  const orders = readJSON<Order[]>("orders.json");
  const filtered = orders.filter((o) => o.id !== id);

  writeJSON("orders.json", filtered);
  return Response.json({ ok: true });
}
