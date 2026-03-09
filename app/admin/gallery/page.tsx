import { prisma } from "@/lib/prisma";
import { createGalleryItem, deleteGalleryItem, updateGalleryItem } from "../server-actions";

export default async function GalleryAdminPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="admin">
      <h1>Galeria</h1>
      <p className="muted">Adicione fotos e vídeos (use link de embed do YouTube no campo URL).</p>

      <div className="card">
        <h3>Novo item</h3>
        <form action={createGalleryItem} className="stack">
          <label>
            Título
            <input name="title" required />
          </label>

          <div className="grid grid-3">
            <label>
              Tipo
              <select name="type" defaultValue="IMAGE">
                <option value="IMAGE">Imagem</option>
                <option value="VIDEO">Vídeo</option>
              </select>
            </label>
            <label>
              Ordem (0 primeiro)
              <input name="sortOrder" type="number" defaultValue={0} />
            </label>
            <label>
              Capa (opcional, p/ vídeo)
              <input name="coverUrl" placeholder="/uploads/gallery/cover.jpg" />
            </label>
          </div>

          <label>
            URL (imagem ou embed)
            <input name="url" placeholder="/uploads/gallery/1.jpg ou https://www.youtube.com/embed/..." required />
          </label>

          <button className="btn">Criar</button>
        </form>
      </div>

      <h3 style={{ marginTop: 20 }}>Lista</h3>
      {items.map((it) => (
        <div className="card" key={it.id}>
          <form action={updateGalleryItem.bind(null, it.id)} className="stack">
            <div className="grid grid-2">
              <label>
                Título
                <input name="title" defaultValue={it.title} required />
              </label>
              <label>
                Tipo
                <select name="type" defaultValue={it.type}>
                  <option value="IMAGE">Imagem</option>
                  <option value="VIDEO">Vídeo</option>
                </select>
              </label>
            </div>

            <div className="grid grid-3">
              <label>
                URL
                <input name="url" defaultValue={it.url} required />
              </label>
              <label>
                Capa
                <input name="coverUrl" defaultValue={it.coverUrl || ""} />
              </label>
              <label>
                Ordem
                <input name="sortOrder" type="number" defaultValue={it.sortOrder} />
              </label>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn">Salvar</button>
              <button className="btn danger" formAction={deleteGalleryItem.bind(null, it.id)}>
                Apagar
              </button>
            </div>
          </form>
        </div>
      ))}

      {items.length === 0 ? <p className="muted">Sem itens ainda.</p> : null}
    </div>
  );
}
