import Navbar from "@/app/components/ipppb/Navbar";
import Footer from "@/app/components/ipppb/Footer";

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next || "/portal";
  const error = sp.error === "1";

  return (
    <>
      <Navbar />
      <main className="container py-5" style={{ maxWidth: 720 }}>
        <h1 className="mb-3">Portal</h1>
        <p className="text-muted">Entre com a sua conta.</p>

        {error ? (
          <div className="alert alert-danger">Email ou password incorretos.</div>
        ) : null}

        <div className="card">
          <div className="card-body">
            <form method="post" action="/api/portal/login">
              <input type="hidden" name="next" value={next} />

              <div className="form-group mb-3">
                <label>Email</label>
                <input className="form-control" name="email" type="email" required />
              </div>

              <div className="form-group mb-3">
                <label>Password</label>
                <input className="form-control" name="password" type="password" required />
              </div>

              <button className="btn btn-primary" type="submit">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
