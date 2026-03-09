import { prisma } from "@/lib/prisma";
import { updateSiteSetting } from "../server-actions";

export default async function SiteAdminPage() {
  const s = await prisma.siteSetting.findUnique({ where: { id: 1 } });

  return (
    <div className="admin">
      <h1>Site</h1>
      <p className="muted">Edite textos e dados principais do site.</p>

      <form action={updateSiteSetting} className="card">
        <div className="grid grid-2">
          <label>
            Nome do site
            <input name="siteName" defaultValue={s?.siteName || ""} required />
          </label>
          <label>
            Logo URL (ex: /ipppb/pic.png)
            <input name="logoUrl" defaultValue={s?.logoUrl || ""} />
          </label>
        </div>

        <label>
          Título (Hero)
          <input name="heroTitle" defaultValue={s?.heroTitle || ""} required />
        </label>

        <label>
          Subtítulo (Hero)
          <textarea name="heroSubtitle" defaultValue={s?.heroSubtitle || ""} rows={3} required />
        </label>

        <div className="grid grid-2">
          <label>
            Título (Sobre)
            <input name="aboutTitle" defaultValue={s?.aboutTitle || ""} required />
          </label>
          <label>
            Rodapé
            <input name="footerText" defaultValue={s?.footerText || ""} />
          </label>
        </div>

        <label>
          Texto (Sobre)
          <textarea name="aboutText" defaultValue={s?.aboutText || ""} rows={4} required />
        </label>

        <div className="grid grid-3">
          <label>
            Endereço
            <input name="address" defaultValue={s?.address || ""} />
          </label>
          <label>
            Telefone
            <input name="phone" defaultValue={s?.phone || ""} />
          </label>
          <label>
            Email
            <input name="email" defaultValue={s?.email || ""} />
          </label>

          <label>
            WhatsApp (apenas números, ex: 244940191919)
            <input name="whatsappNumber" defaultValue={s?.whatsappNumber || ""} />
          </label>
        </div>

        <label>
          Google Maps Embed URL (iframe src)
          <input name="googleMapsEmbedUrl" defaultValue={s?.googleMapsEmbedUrl || ""} />
        </label>

        <button className="btn">Salvar</button>
      </form>
    </div>
  );
}
