import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminHome() {
  const [
    courses,
    announcements,
    applications,
    messages,
    galleryItems,
    users,
    projects,
    designs,
  ] = await Promise.all([
    prisma.course.count(),
    prisma.announcement.count(),
    prisma.application.count({ where: { status: "new" } }),
    prisma.contactMessage.count({ where: { status: "new" } }),
    prisma.galleryItem.count(),
    prisma.user.count(),
    prisma.project.count(),
    prisma.design.count(),
  ]);

  const stats = [
    { label: "Cursos", value: courses, href: "/admin/courses" },
    { label: "Anúncios", value: announcements, href: "/admin/announcements" },
    { label: "Novas inscrições", value: applications, href: "/admin/applications", highlight: applications > 0 },
    { label: "Novas mensagens", value: messages, href: "/admin/messages", highlight: messages > 0 },
    { label: "Galeria", value: galleryItems, href: "/admin/gallery" },
    { label: "Utilizadores", value: users, href: "/admin/users" },
    { label: "Projetos", value: projects, href: "/admin/projects" },
    { label: "Designs", value: designs, href: "/admin/designs" },
  ];

  return (
    <div style={{ paddingTop: 24 }}>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      <div className="grid grid-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card" style={s.highlight ? { borderLeft: "3px solid #e74c3c" } : {}}>
              <b style={s.highlight ? { color: "#e74c3c" } : {}}>{s.value}</b>
              <div className="muted">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="muted">
          Dica: faça upload de ficheiros (imagens/PDFs) e depois crie registos apontando para o URL enviado.
        </div>
      </div>
    </div>
  );
}
