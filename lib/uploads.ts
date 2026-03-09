import path from "node:path";
import fs from "node:fs/promises";

export const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

export async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

export function safeFileName(name: string) {
  // keep it simple: letters, numbers, dash, underscore, dot
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function saveUpload(file: File, subdir: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const dir = path.join(UPLOAD_ROOT, subdir);
  await ensureDir(dir);

  const fileName = `${Date.now()}_${safeFileName(file.name)}`;
  const absPath = path.join(dir, fileName);

  await fs.writeFile(absPath, buffer);

  // Public URL (Next serves /public at /)
  const publicUrl = `/uploads/${subdir}/${fileName}`;
  return { publicUrl, absPath };
}
