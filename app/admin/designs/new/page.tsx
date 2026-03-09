import Link from "next/link";
import { createDesign } from "../../server-actions";
import { UploadField } from "@/app/components/UploadField";

export default function NewDesignPage() {
  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginTop: 0 }}>New Design</h1>
        <Link className="btn" href="/admin/designs">Back</Link>
      </div>

      <form action={createDesign} className="grid" style={{ gap: 14 }}>
        <label>
          <span className="label">Title</span>
          <input className="input" name="title" required />
        </label>

        <label>
          <span className="label">Summary</span>
          <input className="input" name="summary" required />
        </label>

        <label>
          <span className="label">Tool</span>
          <input className="input" name="tool" placeholder="Figma, Adobe XD, ..." />
        </label>

        <UploadField name="imageUrl" dir="designs" accept="image/*" label="Preview image" />
        <UploadField name="fileUrl" dir="designs" accept=".pdf,image/*" label="Design file (optional)" />

        <button className="btn" type="submit">Create design</button>
      </form>
    </div>
  );
}
