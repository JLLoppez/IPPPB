import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateProject } from "../../server-actions";
import { UploadField } from "@/app/components/UploadField";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  async function action(formData: FormData) {
    "use server";
    await updateProject(id, formData);
  }

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginTop: 0 }}>Edit Project</h1>
        <Link className="btn" href="/admin/projects">Back</Link>
      </div>

      <form action={action} className="grid" style={{ gap: 14 }}>
        <label>
          <span className="label">Title</span>
          <input className="input" name="title" defaultValue={project.title} required />
        </label>

        <label>
          <span className="label">Slug (optional)</span>
          <input className="input" name="slug" defaultValue={project.slug} placeholder="project-one" />
          <div className="help muted">Leave blank to auto-generate from the title.</div>
        </label>

        <label>
          <span className="label">Summary</span>
          <input className="input" name="summary" defaultValue={project.summary} required />
        </label>

        <label>
          <span className="label">Description</span>
          <textarea className="textarea" name="description" rows={6} defaultValue={project.description} required />
        </label>

        <label>
          <span className="label">Tech (comma-separated)</span>
          <input className="input" name="tech" defaultValue={project.tech} required />
        </label>

        <div className="grid grid-2">
          <label>
            <span className="label">Live URL</span>
            <input className="input" name="liveUrl" defaultValue={project.liveUrl ?? ""} />
          </label>
          <label>
            <span className="label">GitHub URL</span>
            <input className="input" name="githubUrl" defaultValue={project.githubUrl ?? ""} />
          </label>
        </div>

        <UploadField name="imageUrl" dir="projects" accept="image/*" label="Project image" initialValue={project.imageUrl} />

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="checkbox" name="featured" defaultChecked={project.featured} />
          <span className="muted">Featured</span>
        </label>

        <button className="btn" type="submit">Save changes</button>
      </form>
    </div>
  );
}
