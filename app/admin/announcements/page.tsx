import { prisma } from "@/lib/prisma";
import { createAnnouncement, deleteAnnouncement, updateAnnouncement } from "../server-actions";

export default async function AnnouncementsAdminPage() {
  const items = await prisma.announcement.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="admin">
      <h1>Anúncios</h1>

      <div className="card">
        <h3>Novo anúncio</h3>
        <form action={createAnnouncement} className="stack">
          <div className="grid grid-2">
            <label>
              Título
              <input name="title" required />
            </label>
            <label>
              Slug (opcional)
              <input name="slug" placeholder="auto" />
            </label>
          </div>
          <label>
            Resumo (excerpt)
            <textarea name="excerpt" rows={2} required />
          </label>
          <label>
            Conteúdo
            <textarea name="content" rows={6} required />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" name="published" defaultChecked />
            Publicado
          </label>
          <button className="btn">Criar</button>
        </form>
      </div>

      <h3 style={{ marginTop: 20 }}>Lista</h3>
      {items.map((a) => (
        <div className="card" key={a.id}>
          <form action={updateAnnouncement.bind(null, a.id)} className="stack">
            <div className="grid grid-2">
              <label>
                Título
                <input name="title" defaultValue={a.title} required />
              </label>
              <label>
                Slug
                <input name="slug" defaultValue={a.slug} required />
              </label>
            </div>
            <label>
              Excerpt
              <textarea name="excerpt" rows={2} defaultValue={a.excerpt} required />
            </label>
            <label>
              Conteúdo
              <textarea name="content" rows={6} defaultValue={a.content} required />
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" name="published" defaultChecked={a.published} />
              Publicado
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn">Salvar</button>
              <button className="btn danger" formAction={deleteAnnouncement.bind(null, a.id)}>
                Apagar
              </button>
            </div>
          </form>
        </div>
      ))}

      {items.length === 0 ? <p className="muted">Sem anúncios.</p> : null}
    </div>
  );
}
