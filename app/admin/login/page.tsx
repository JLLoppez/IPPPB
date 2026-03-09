import { login } from "../server-actions";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  return (
    <main className="container" style={{ paddingTop: 60 }}>
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 style={{ marginTop: 0 }}>Admin Login</h1>
        <p className="muted">
          Use the password in <code>.env.local</code> (ADMIN_PASSWORD).
        </p>

        <form action={login} className="grid" style={{ gap: 12 }}>
          <input type="hidden" name="next" value={searchParams?.next ?? "/admin"} />
          <label>
            <span className="label">Password</span>
            <input className="input" type="password" name="password" required />
          </label>

          <button className="btn" type="submit">Sign in</button>
        </form>
      </div>
    </main>
  );
}
