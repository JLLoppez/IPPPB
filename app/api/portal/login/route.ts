import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { portalSessionOptions, type PortalSession } from "@/lib/portal-session";

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.redirect(new URL("/portal/login?error=1", req.url));

  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  const next = String(form.get("next") || "/portal");
  // Prevent open redirect: only allow internal /portal paths
  const safeNext = next.startsWith("/portal") ? next : "/portal";

  if (!email || !password) {
    return NextResponse.redirect(new URL("/portal/login?error=1", req.url));
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.redirect(new URL("/portal/login?error=1", req.url));
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.redirect(new URL("/portal/login?error=1", req.url));
  }

  const session = await getIronSession<PortalSession>(await cookies(), portalSessionOptions);
  session.isLoggedIn = true;
  session.userId = user.id;
  session.role = user.role;
  session.email = user.email;
  session.name = user.name;
  await session.save();

  return NextResponse.redirect(new URL(safeNext, req.url));
}
