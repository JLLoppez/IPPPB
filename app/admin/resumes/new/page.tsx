import Link from "next/link";
import { createResume } from "../../server-actions";
import { UploadField } from "@/app/components/UploadField";

export default function NewResumePage() {
  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginTop: 0 }}>New Resume</h1>
        <Link className="btn" href="/admin/resumes">Back</Link>
      </div>

      <form action={createResume} className="grid" style={{ gap: 14 }}>
        <label>
          <span className="label">Title</span>
          <input className="input" name="title" placeholder="Resume (2026)" required />
        </label>

        <UploadField name="fileUrl" dir="resumes" accept=".pdf" label="Resume PDF" />

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="checkbox" name="isDefault" />
          <span className="muted">Set as default</span>
        </label>

        <button className="btn" type="submit">Create resume</button>
      </form>
    </div>
  );
}
