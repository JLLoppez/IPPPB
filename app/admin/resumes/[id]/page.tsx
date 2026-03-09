import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateResume } from "../../server-actions";
import { UploadField } from "@/app/components/UploadField";
import { notFound } from "next/navigation";

export default async function EditResumePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const resume = await prisma.resume.findUnique({ where: { id } });
  if (!resume) notFound();

  async function action(formData: FormData) {
    "use server";
    await updateResume(id, formData);
  }

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginTop: 0 }}>Edit Resume</h1>
        <Link className="btn" href="/admin/resumes">Back</Link>
      </div>

      <form action={action} className="grid" style={{ gap: 14 }}>
        <label>
          <span className="label">Title</span>
          <input className="input" name="title" defaultValue={resume.title} required />
        </label>

        <UploadField name="fileUrl" dir="resumes" accept=".pdf" label="Resume PDF" initialValue={resume.fileUrl} />

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="checkbox" name="isDefault" defaultChecked={resume.isDefault} />
          <span className="muted">Set as default</span>
        </label>

        <button className="btn" type="submit">Save changes</button>
      </form>
    </div>
  );
}
