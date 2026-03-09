import { prisma } from "@/lib/prisma";
import { createCourse, deleteCourse, updateCourse } from "../server-actions";

export default async function CoursesAdminPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="admin">
      <h1>Cursos</h1>

      <div className="card">
        <h3>Novo curso</h3>
        <form action={createCourse} className="stack">
          <label>
            Título
            <input name="title" required />
          </label>
          <label>
            Descrição
            <textarea name="description" rows={3} required />
          </label>
          <div className="grid grid-2">
            <label>
              Duração (opcional)
              <input name="duration" placeholder="ex: 3 anos" />
            </label>
            <label>
              Nível (opcional)
              <input name="level" placeholder="ex: Ensino técnico" />
            </label>
          </div>
          <button className="btn">Criar</button>
        </form>
      </div>

      <h3 style={{ marginTop: 20 }}>Lista</h3>
      {courses.map((c) => (
        <div className="card" key={c.id}>
          <form action={updateCourse.bind(null, c.id)} className="stack">
            <div className="grid grid-2">
              <label>
                Título
                <input name="title" defaultValue={c.title} required />
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" name="isActive" defaultChecked={c.isActive} />
                Ativo
              </label>
            </div>

            <label>
              Descrição
              <textarea name="description" rows={3} defaultValue={c.description} required />
            </label>

            <div className="grid grid-2">
              <label>
                Duração
                <input name="duration" defaultValue={c.duration || ""} />
              </label>
              <label>
                Nível
                <input name="level" defaultValue={c.level || ""} />
              </label>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn">Salvar</button>
              <button className="btn danger" formAction={deleteCourse.bind(null, c.id)}>
                Apagar
              </button>
            </div>
          </form>
        </div>
      ))}

      {courses.length === 0 ? <p className="muted">Sem cursos.</p> : null}
    </div>
  );
}
