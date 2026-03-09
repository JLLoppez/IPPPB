import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { portalSessionOptions, type PortalSession } from "./portal-session";

export async function getPortalSession() {
  return getIronSession<PortalSession>(await cookies(), portalSessionOptions);
}

export async function requirePortalLogin() {
  const session = await getPortalSession();
  if (!session.isLoggedIn || !session.userId) return null;
  return session;
}
