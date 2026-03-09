"use client";

import { useState } from "react";

export function FileUploader({
  dir,
  label = "Upload file",
  onUploaded,
  accept,
}: {
  dir: "avatar" | "projects" | "designs" | "resumes";
  label?: string;
  accept?: string;
  onUploaded: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setBusy(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`/api/upload?dir=${dir}`, { method: "POST", body: fd });
      const json = await res.json();

      if (!res.ok) throw new Error(json?.error ?? "Upload failed");

      onUploaded(json.url as string);
      e.target.value = "";
    } catch (err: any) {
      setError(err?.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <label className="btn" style={{ gap: 8 }}>
          <input
            style={{ display: "none" }}
            type="file"
            onChange={onChange}
            accept={accept}
            disabled={busy}
          />
          {busy ? "Uploading..." : label}
        </label>
        {error ? <span className="muted">⚠️ {error}</span> : <span className="muted">Tip: upload → copy URL into the form field.</span>}
      </div>
    </div>
  );
}
