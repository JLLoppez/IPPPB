import Link from "next/link";
import { createProject } from "../../server-actions";
import { UploadField } from "@/app/components/UploadField";

export default function NewProjectPage() {
  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginTop: 0 }}>New Project</h1>
        <Link className="btn" href="/admin/projects">Back</Link>
      </div>

      <form action={createProject} className="grid" style={{ gap: 14 }}>
        <label>
          <span className="label">Title</span>
          <input className="input" name="title" required />
        </label>


        <label>
          <span className="label">Slug (optional)</span>
          <input className="input" name="slug" placeholder="project-one" />
          <div className="help muted">Leave blank to auto-generate from the title.</div>
        </label>

        <label>
          <span className="label">Summary</span>
          <input className="input" name="summary" required />
        </label>

        <label>
          <span className="label">Description</span>
          <textarea className="textarea" name="description" rows={6} required />
        </label>

        <label>
          <span className="label">Tech (comma-separated)</span>
          <input className="input" name="tech" placeholder="React, Next.js, Node, ..." required />
        </label>

        <div className="grid grid-2">
          <label>
            <span className="label">Live URL</span>
            <input className="input" name="liveUrl" />
          </label>
          <label>
            <span className="label">GitHub URL</span>
            <input className="input" name="githubUrl" />
          </label>
        </div>

        <UploadField name="imageUrl" dir="projects" accept="image/*" label="Project image" />

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="checkbox" name="featured" />
          <span className="muted">Featured</span>
        </label>

        <button className="btn" type="submit">Create project</button>
      </form>
    </div>
  );
}
