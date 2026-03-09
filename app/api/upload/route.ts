import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type AdminSession } from "@/lib/session";
import { saveUpload } from "@/lib/uploads";

export const runtime = "nodejs";

const ALLOWED = new Set(["avatar", "projects", "designs", "resumes", "gallery", "logo"]);

const ALLOWED_MIME: Record<string, string[]> = {
  avatar:   ["image/jpeg", "image/png", "image/webp", "image/gif"],
  projects: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  designs:  ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"],
  resumes:  ["application/pdf"],
  gallery:  ["image/jpeg", "image/png", "image/webp", "image/gif"],
  logo:     ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
};

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  // Auth check — only logged-in admins may upload
  const session = await getIronSession<AdminSession>(await cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const subdir = url.searchParams.get("dir") ?? "misc";

  if (!ALLOWED.has(subdir)) {
    return NextResponse.json(
      { error: `Invalid dir. Use one of: ${[...ALLOWED].join(", ")}.` },
      { status: 400 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large. Maximum is 10 MB." }, { status: 400 });
  }

  const allowed = ALLOWED_MIME[subdir] ?? [];
  if (allowed.length > 0 && !allowed.includes(file.type)) {
    return NextResponse.json(
      { error: `Invalid file type "${file.type}". Allowed: ${allowed.join(", ")}` },
      { status: 400 }
    );
  }

  const { publicUrl } = await saveUpload(file, subdir);
  return NextResponse.json({ url: publicUrl });
}
