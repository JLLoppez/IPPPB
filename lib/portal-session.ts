import type { SessionOptions } from "iron-session";

export type PortalSession = {
  userId?: number;
  role?: "ADMIN" | "STUDENT";
  email?: string;
  name?: string | null;
  isLoggedIn?: boolean;
};

export const portalSessionOptions: SessionOptions = {
  password:
    process.env.SESSION_PASSWORD ??
    "development_only_password_that_is_32_chars!",
  cookieName: "ipppb_portal_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
