import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { portalSessionOptions, type PortalSession } from "@/lib/portal-session";

export async function POST(req: Request) {
  const session = await getIronSession<PortalSession>(await cookies(), portalSessionOptions);
  session.destroy();
  return NextResponse.redirect(new URL("/portal/login", req.url));
}
