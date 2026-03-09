import Navbar from "@/app/components/ipppb/Navbar";
import Footer from "@/app/components/ipppb/Footer";
import { prisma } from "@/lib/prisma";
import { requirePortalLogin } from "@/lib/portal-auth";

export default async function PortalHome() {
  const session = await requirePortalLogin();

  // middleware should have redirected already, but keep it safe
  if (!session?.userId) {
    return null;
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  const applications = await prisma.application.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <main className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <div>
            <h1 className="mb-1">Bem-vindo{user?.name ? `, ${user.name}` : ""} 👋</h1>
            <p className="text-muted mb-0">{user?.email}</p>
          </div>

          <form method="post" action="/api/portal/logout">
            <button className="btn btn-outline-secondary" type="submit">
              Sair
            </button>
          </form>
        </div>

        <div className="row">
          <div className="col-lg-7 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Minhas inscrições</h5>
                {applications.length === 0 ? (
                  <p className="text-muted mb-0">Ainda não existe nenhuma inscrição associada a esta conta.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Curso</th>
                          <th>Classe</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((a) => (
                          <tr key={a.id}>
                            <td>{new Date(a.createdAt).toLocaleDateString("pt-PT")}</td>
                            <td>{a.course || "—"}</td>
                            <td>{a.classLevel || "—"}</td>
                            <td>{a.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-5 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Dicas</h5>
                <ul className="mb-0">
                  <li>Se você fizer a inscrição estando logado, ela aparece aqui automaticamente ✅</li>
                  <li>Se já se inscreveu antes, peça ao admin para associar ao seu email.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
