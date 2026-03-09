import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "../server-actions";

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }] });

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginTop: 0 }}>Projects</h1>
        <Link className="btn" href="/admin/projects/new">+ New project</Link>
      </div>

      <div className="grid" style={{ gap: 12 }}>
        {projects.map((p) => (
          <div key={p.id} className="card" style={{ display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <b>{p.title}</b> {p.featured ? <span className="muted">(featured)</span> : null}
              <div className="muted" style={{ fontSize: 13 }}>{p.summary}</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link className="btn" href={`/admin/projects/${p.id}`}>Edit</Link>
              <form action={async () => { "use server"; await deleteProject(p.id); }}>
                <button className="btn" type="submit">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 ? <p className="muted">No projects yet.</p> : null}
    </div>
  );
}
