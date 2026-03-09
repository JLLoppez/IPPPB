import { prisma } from "@/lib/prisma";
import { deleteApplication, markApplication } from "../server-actions";

export default async function ApplicationsAdminPage() {
  const apps = await prisma.application.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="admin">
      <h1>Inscrições</h1>
      <p className="muted">Formulário de inscrição do site.</p>

      {apps.map((a) => (
        <div className="card" key={a.id}>
          <div className="grid grid-2">
            <div>
              <b>{a.firstName} {a.lastName}</b> • <span className="muted">{a.email}</span>
              {a.phone ? <span> • {a.phone}</span> : null}
              <div className="muted" style={{ marginTop: 6 }}>
                {new Date(a.createdAt).toLocaleString("pt-PT")} • status: <b>{a.status}</b>
              </div>
              <div className="muted" style={{ marginTop: 6 }}>
                {a.course ? <>Curso: <b>{a.course}</b> • </> : null}
                {a.classLevel ? <>Classe: <b>{a.classLevel}</b> • </> : null}
                {a.idNumber ? <>BI: <b>{a.idNumber}</b></> : null}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <form action={markApplication.bind(null, a.id, "contacted")}>
                <button className="btn">Contactado</button>
              </form>
              <form action={markApplication.bind(null, a.id, "archived")}>
                <button className="btn">Arquivar</button>
              </form>
              <form action={deleteApplication.bind(null, a.id)}>
                <button className="btn danger">Apagar</button>
              </form>
            </div>
          </div>
        </div>
      ))}

      {apps.length === 0 ? <p className="muted">Sem inscrições.</p> : null}
    </div>
  );
}
