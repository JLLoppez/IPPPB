"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { sessionOptions, type AdminSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}


async function getSession() {
  return getIronSession<AdminSession>(await cookies(), sessionOptions);
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const rawNext = String(formData.get("next") ?? "/admin");
  // Prevent open redirect: only allow internal /admin paths
  const next = rawNext.startsWith("/admin") ? rawNext : "/admin";

  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("Missing ADMIN_PASSWORD in environment variables.");
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    // simple UX: bounce back to login
    redirect("/admin/login?error=1");
  }

  const session = await getSession();
  session.isLoggedIn = true;
  await session.save();

  redirect(next);
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}

async function requireAdmin() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/admin/login");
}

export async function upsertProfile(formData: FormData) {
  await requireAdmin();

  const data = {
    name: String(formData.get("name") ?? ""),
    headline: String(formData.get("headline") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    email: String(formData.get("email") ?? "") || null,
    phone: String(formData.get("phone") ?? "") || null,
    location: String(formData.get("location") ?? "") || null,
    githubUrl: String(formData.get("githubUrl") ?? "") || null,
    linkedinUrl: String(formData.get("linkedinUrl") ?? "") || null,
    avatarUrl: String(formData.get("avatarUrl") ?? "") || null,
  };

  await prisma.profile.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  redirect("/admin/profile");
}

// Projects
export async function createProject(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "") || slugify(title);
  const summary = String(formData.get("summary") ?? "");
  const description = String(formData.get("description") ?? "");
  const tech = String(formData.get("tech") ?? "");
  const githubUrl = String(formData.get("githubUrl") ?? "") || null;
  const liveUrl = String(formData.get("liveUrl") ?? "") || null;
  const imageUrl = String(formData.get("imageUrl") ?? "") || null;
  const featured = formData.get("featured") === "on";

  await prisma.project.create({
    data: { title, slug, summary, description, tech, githubUrl, liveUrl, imageUrl, featured },
  });

  redirect("/admin/projects");
}

export async function updateProject(id: number, formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "") || slugify(title);
  const summary = String(formData.get("summary") ?? "");
  const description = String(formData.get("description") ?? "");
  const tech = String(formData.get("tech") ?? "");
  const githubUrl = String(formData.get("githubUrl") ?? "") || null;
  const liveUrl = String(formData.get("liveUrl") ?? "") || null;
  const imageUrl = String(formData.get("imageUrl") ?? "") || null;
  const featured = formData.get("featured") === "on";

  await prisma.project.update({
    where: { id },
    data: { title, slug, summary, description, tech, githubUrl, liveUrl, imageUrl, featured },
  });

  redirect("/admin/projects");
}

export async function deleteProject(id: number) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  redirect("/admin/projects");
}

// Designs
export async function createDesign(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "") || slugify(title);
  const summary = String(formData.get("summary") ?? "");
  const tool = String(formData.get("tool") ?? "") || null;
  const imageUrl = String(formData.get("imageUrl") ?? "") || null;
  const fileUrl = String(formData.get("fileUrl") ?? "") || null;

  await prisma.design.create({ data: { title, summary, tool, imageUrl, fileUrl } });
  redirect("/admin/designs");
}

export async function updateDesign(id: number, formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "") || slugify(title);
  const summary = String(formData.get("summary") ?? "");
  const tool = String(formData.get("tool") ?? "") || null;
  const imageUrl = String(formData.get("imageUrl") ?? "") || null;
  const fileUrl = String(formData.get("fileUrl") ?? "") || null;

  await prisma.design.update({ where: { id }, data: { title, summary, tool, imageUrl, fileUrl } });
  redirect("/admin/designs");
}

export async function deleteDesign(id: number) {
  await requireAdmin();
  await prisma.design.delete({ where: { id } });
  redirect("/admin/designs");
}

// Resumes
export async function createResume(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "") || slugify(title);
  const fileUrl = String(formData.get("fileUrl") ?? "");
  const isDefault = formData.get("isDefault") === "on";

  if (isDefault) {
    await prisma.resume.updateMany({ data: { isDefault: false } });
  }

  await prisma.resume.create({ data: { title, fileUrl, isDefault } });
  redirect("/admin/resumes");
}

export async function updateResume(id: number, formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "") || slugify(title);
  const fileUrl = String(formData.get("fileUrl") ?? "");
  const isDefault = formData.get("isDefault") === "on";

  if (isDefault) {
    await prisma.resume.updateMany({ data: { isDefault: false } });
  }

  await prisma.resume.update({ where: { id }, data: { title, fileUrl, isDefault } });
  redirect("/admin/resumes");
}

export async function deleteResume(id: number) {
  await requireAdmin();
  await prisma.resume.delete({ where: { id } });
  redirect("/admin/resumes");
}


// -------- IPPPB site content --------
export async function updateSiteSetting(formData: FormData) {
  await requireAdmin();

  const siteName = String(formData.get("siteName") || "");
  const logoUrl = String(formData.get("logoUrl") || "");
  const heroTitle = String(formData.get("heroTitle") || "");
  const heroSubtitle = String(formData.get("heroSubtitle") || "");
  const aboutTitle = String(formData.get("aboutTitle") || "");
  const aboutText = String(formData.get("aboutText") || "");
  const address = String(formData.get("address") || "");
  const phone = String(formData.get("phone") || "");
  const email = String(formData.get("email") || "");
  const footerText = String(formData.get("footerText") || "");
  const whatsappNumber = String(formData.get("whatsappNumber") || "");
  const googleMapsEmbedUrl = String(formData.get("googleMapsEmbedUrl") || "");

  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {
      siteName,
      logoUrl: logoUrl || null,
      heroTitle,
      heroSubtitle,
      aboutTitle,
      aboutText,
      address: address || null,
      phone: phone || null,
      email: email || null,
      footerText: footerText || null,
      whatsappNumber: whatsappNumber || null,
      googleMapsEmbedUrl: googleMapsEmbedUrl || null,
    },
    create: {
      id: 1,
      siteName,
      logoUrl: logoUrl || null,
      heroTitle,
      heroSubtitle,
      aboutTitle,
      aboutText,
      address: address || null,
      phone: phone || null,
      email: email || null,
      footerText: footerText || null,
      whatsappNumber: whatsappNumber || null,
      googleMapsEmbedUrl: googleMapsEmbedUrl || null,
    },
  });

  redirect("/admin/site");
}

export async function createCourse(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const duration = String(formData.get("duration") || "").trim();
  const level = String(formData.get("level") || "").trim();

  if (!title || !description) throw new Error("Title and description are required.");

  await prisma.course.create({
    data: {
      title,
      description,
      duration: duration || null,
      level: level || null,
      isActive: true,
    },
  });

  redirect("/admin/courses");
}

export async function updateCourse(id: number, formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const duration = String(formData.get("duration") || "").trim();
  const level = String(formData.get("level") || "").trim();
  const isActive = String(formData.get("isActive") || "") === "on";

  await prisma.course.update({
    where: { id },
    data: {
      title,
      description,
      duration: duration || null,
      level: level || null,
      isActive,
    },
  });

  redirect("/admin/courses");
}

export async function deleteCourse(id: number) {
  await requireAdmin();
  await prisma.course.delete({ where: { id } });
  redirect("/admin/courses");
}

export async function createAnnouncement(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const published = String(formData.get("published") || "") === "on";
  const slug = String(formData.get("slug") || "").trim() || slugify(title);

  if (!title || !excerpt || !content) throw new Error("title/excerpt/content required.");

  await prisma.announcement.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      published,
      publishedAt: published ? new Date().toISOString() : null,
    },
  });

  redirect("/admin/announcements");
}

export async function updateAnnouncement(id: number, formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const published = String(formData.get("published") || "") === "on";
  const slug = String(formData.get("slug") || "").trim() || slugify(title);

  await prisma.announcement.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      published,
      publishedAt: published ? new Date().toISOString() : null,
    },
  });

  redirect("/admin/announcements");
}

export async function deleteAnnouncement(id: number) {
  await requireAdmin();
  await prisma.announcement.delete({ where: { id } });
  redirect("/admin/announcements");
}

export async function markMessage(id: number, status: string) {
  await requireAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  redirect("/admin/messages");
}

export async function deleteMessage(id: number) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  redirect("/admin/messages");
}

export async function markApplication(id: number, status: string) {
  await requireAdmin();
  await prisma.application.update({ where: { id }, data: { status } });
  redirect("/admin/applications");
}

export async function deleteApplication(id: number) {
  await requireAdmin();
  await prisma.application.delete({ where: { id } });
  redirect("/admin/applications");
}


// -------- Gallery --------
export async function createGalleryItem(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  const type = String(formData.get("type") || "IMAGE") as "IMAGE" | "VIDEO";
  const url = String(formData.get("url") || "").trim();
  const coverUrl = String(formData.get("coverUrl") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);

  if (!title || !url) throw new Error("title/url required");

  await prisma.galleryItem.create({
    data: {
      title,
      type,
      url,
      coverUrl: coverUrl || null,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    },
  });

  redirect("/admin/gallery");
}

export async function updateGalleryItem(id: number, formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  const type = String(formData.get("type") || "IMAGE") as "IMAGE" | "VIDEO";
  const url = String(formData.get("url") || "").trim();
  const coverUrl = String(formData.get("coverUrl") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);

  await prisma.galleryItem.update({
    where: { id },
    data: {
      title,
      type,
      url,
      coverUrl: coverUrl || null,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    },
  });

  redirect("/admin/gallery");
}

export async function deleteGalleryItem(id: number) {
  await requireAdmin();
  await prisma.galleryItem.delete({ where: { id } });
  redirect("/admin/gallery");
}


// -------- Portal users --------
export async function createPortalUser(formData: FormData) {
  await requireAdmin();

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "STUDENT") as "ADMIN" | "STUDENT";
  const password = String(formData.get("password") || "");

  if (!email || !password) throw new Error("email/password required");

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name: name || null,
      role,
      passwordHash,
    },
  });

  redirect("/admin/users");
}

export async function updatePortalUser(id: number, formData: FormData) {
  await requireAdmin();

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "STUDENT") as "ADMIN" | "STUDENT";
  const password = String(formData.get("password") || "");

  const data: any = { email, name: name || null, role };

  if (password) {
    data.passwordHash = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({ where: { id }, data });
  redirect("/admin/users");
}

export async function deletePortalUser(id: number) {
  await requireAdmin();
  await prisma.user.delete({ where: { id } });
  redirect("/admin/users");
}
