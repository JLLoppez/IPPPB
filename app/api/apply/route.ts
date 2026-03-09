import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { portalSessionOptions, type PortalSession } from "@/lib/portal-session";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const firstName = String(body.firstName || "").trim();
  const lastName = String(body.lastName || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const idNumber = String(body.idNumber || "").trim();
  const classLevel = String(body.classLevel || "").trim();
  const course = String(body.course || "").trim();

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: "Preencha nome, apelido e email." }, { status: 400 });
  }

  const session = await getIronSession<PortalSession>(await cookies(), portalSessionOptions);
  const userId = session.isLoggedIn && session.userId ? session.userId : null;

  await prisma.application.create({
    data: {
      userId: userId || null,
      firstName,
      lastName,
      email,
      phone: phone || null,
      idNumber: idNumber || null,
      classLevel: classLevel || null,
      course: course || null,
    },
  });

  return NextResponse.json({ ok: true });
}
