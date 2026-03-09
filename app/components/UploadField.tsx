"use client";

import { useState } from "react";
import { FileUploader } from "./FileUploader";

export function UploadField({
  name,
  initialValue,
  dir,
  accept,
  label,
}: {
  name: string;
  initialValue?: string | null;
  dir: "avatar" | "projects" | "designs" | "resumes";
  accept?: string;
  label: string;
}) {
  const [value, setValue] = useState(initialValue ?? "");

  return (
    <div className="grid" style={{ gap: 10 }}>
      <label>
        <span className="label">{label} URL</span>
        <input
          className="input"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`/uploads/${dir}/your-file`}
        />
      </label>
      <FileUploader
        dir={dir}
        accept={accept}
        label={`Upload to /uploads/${dir}`}
        onUploaded={(url) => setValue(url)}
      />
    </div>
  );
}
