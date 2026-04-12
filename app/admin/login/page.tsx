import { login } from "../server-actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="container" style={{ paddingTop: 60 }}>
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 style={{ marginTop: 0 }}>Admin Login</h1>
        <p className="muted">
          Use the password in <code>.env.local</code> (ADMIN_PASSWORD).
        </p>

        <form action={login} className="grid" style={{ gap: 12 }}>
          <input
            type="hidden"
            name="next"
            value={params?.next ?? "/admin"}
          />
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
