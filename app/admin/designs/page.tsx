import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteDesign } from "../server-actions";

export default async function DesignsAdminPage() {
  const designs = await prisma.design.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginTop: 0 }}>UI/UX Designs</h1>
        <Link className="btn" href="/admin/designs/new">+ New design</Link>
      </div>

      <div className="grid" style={{ gap: 12 }}>
        {designs.map((d) => (
          <div key={d.id} className="card" style={{ display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <b>{d.title}</b>
              <div className="muted" style={{ fontSize: 13 }}>{d.summary}</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link className="btn" href={`/admin/designs/${d.id}`}>Edit</Link>
              <form action={async () => { "use server"; await deleteDesign(d.id); }}>
                <button className="btn" type="submit">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {designs.length === 0 ? <p className="muted">No designs yet.</p> : null}
    </div>
  );
}
