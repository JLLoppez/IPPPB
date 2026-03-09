import { prisma } from "@/lib/prisma";
import { deleteMessage, markMessage } from "../server-actions";

export default async function MessagesAdminPage() {
  const msgs = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="admin">
      <h1>Mensagens</h1>
      <p className="muted">Formulário de contacto do site.</p>

      {msgs.map((m) => (
        <div className="card" key={m.id}>
          <div className="grid grid-2">
            <div>
              <b>{m.name}</b> • <span className="muted">{m.email}</span> {m.phone ? <span>• {m.phone}</span> : null}
              <div className="muted" style={{ marginTop: 6 }}>
                {new Date(m.createdAt).toLocaleString("pt-PT")} • status: <b>{m.status}</b>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <form action={markMessage.bind(null, m.id, "read")}>
                <button className="btn">Marcar lida</button>
              </form>
              <form action={markMessage.bind(null, m.id, "archived")}>
                <button className="btn">Arquivar</button>
              </form>
              <form action={deleteMessage.bind(null, m.id)}>
                <button className="btn danger">Apagar</button>
              </form>
            </div>
          </div>
          <hr />
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{m.message}</pre>
        </div>
      ))}

      {msgs.length === 0 ? <p className="muted">Sem mensagens.</p> : null}
    </div>
  );
}
