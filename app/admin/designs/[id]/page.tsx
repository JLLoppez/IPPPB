import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateDesign } from "../../server-actions";
import { UploadField } from "@/app/components/UploadField";
import { notFound } from "next/navigation";

export default async function EditDesignPage({
  const { id } = await params; params }: { params: { id: string } }) {
  const id = Number(id);
  if (!Number.isFinite(id)) notFound();

  const design = await prisma.design.findUnique({ where: { id } });
  if (!design) notFound();

  async function action(formData: FormData) {
    "use server";
    await updateDesign(id, formData);
  }

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginTop: 0 }}>Edit Design</h1>
        <Link className="btn" href="/admin/designs">Back</Link>
      </div>

      <form action={action} className="grid" style={{ gap: 14 }}>
        <label>
          <span className="label">Title</span>
          <input className="input" name="title" defaultValue={design.title} required />
        </label>

        <label>
          <span className="label">Summary</span>
          <input className="input" name="summary" defaultValue={design.summary} required />
        </label>

        <label>
          <span className="label">Tool</span>
          <input className="input" name="tool" defaultValue={design.tool ?? ""} />
        </label>

        <UploadField name="imageUrl" dir="designs" accept="image/*" label="Preview image" initialValue={design.imageUrl} />
        <UploadField name="fileUrl" dir="designs" accept=".pdf,image/*" label="Design file (optional)" initialValue={design.fileUrl} />

        <button className="btn" type="submit">Save changes</button>
      </form>
    </div>
  );
}
