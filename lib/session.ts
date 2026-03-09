import { SessionOptions } from "iron-session";

export type AdminSession = {
  isLoggedIn: boolean;
};

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_PASSWORD ??
    // Fallback only for local dev; DO NOT use in production
    "development_only_password_that_is_32_chars!",
  cookieName: "portfolio_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
