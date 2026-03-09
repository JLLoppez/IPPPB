import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteResume } from "../server-actions";

export default async function ResumesAdminPage() {
  const resumes = await prisma.resume.findMany({ orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }] });

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginTop: 0 }}>Resumes</h1>
        <Link className="btn" href="/admin/resumes/new">+ New resume</Link>
      </div>

      <div className="grid" style={{ gap: 12 }}>
        {resumes.map((r) => (
          <div key={r.id} className="card" style={{ display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <b>{r.title}</b> {r.isDefault ? <span className="muted">(default)</span> : null}
              <div className="muted" style={{ fontSize: 13 }}>{r.fileUrl}</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link className="btn" href={`/admin/resumes/${r.id}`}>Edit</Link>
              <form action={async () => { "use server"; await deleteResume(r.id); }}>
                <button className="btn" type="submit">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {resumes.length === 0 ? <p className="muted">No resumes yet.</p> : null}
    </div>
  );
}
