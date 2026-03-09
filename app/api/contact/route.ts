import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { portalSessionOptions, type PortalSession } from "@/lib/portal-session";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Preencha nome, email e mensagem." }, { status: 400 });
  }

  const session = await getIronSession<PortalSession>(await cookies(), portalSessionOptions);
  const userId = session.isLoggedIn && session.userId ? session.userId : null;

  await prisma.contactMessage.create({
    data: { userId: userId || null, name, email, phone: phone || null, message },
  });

  return NextResponse.json({ ok: true });
}
