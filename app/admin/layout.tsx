import Link from "next/link";
import { logout } from "./server-actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <header className="header">
        <nav className="nav">
          <Link href="/admin"><b>Admin</b></Link>
          <Link href="/admin/site">Site</Link>
          <Link href="/admin/courses">Cursos</Link>
          <Link href="/admin/announcements">Anúncios</Link>
          <Link href="/admin/gallery">Galeria</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/messages">Mensagens</Link>
          <Link href="/admin/applications">Inscrições</Link>
          <Link href="/admin/profile">Profile</Link>
          <Link href="/admin/projects">Projects</Link>
          <Link href="/admin/designs">UI/UX</Link>
          <Link href="/admin/resumes">Resumes</Link>
          <Link className="btn" href="/">View site</Link>
          <form action={logout} style={{ marginLeft: "auto" }}>
            <button className="btn" type="submit">Logout</button>
          </form>
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}
