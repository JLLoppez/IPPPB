import { prisma } from "@/lib/prisma";
import { createPortalUser, deletePortalUser, updatePortalUser } from "../server-actions";

export default async function UsersAdminPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="admin">
      <h1>Users (Portal)</h1>
      <p className="muted">Crie contas para estudantes (ou admins do portal).</p>

      <div className="card">
        <h3>Novo user</h3>
        <form action={createPortalUser} className="stack">
          <div className="grid grid-2">
            <label>
              Email
              <input name="email" type="email" required />
            </label>
            <label>
              Nome (opcional)
              <input name="name" />
            </label>
          </div>

          <div className="grid grid-2">
            <label>
              Role
              <select name="role" defaultValue="STUDENT">
                <option value="STUDENT">STUDENT</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </label>
            <label>
              Password
              <input name="password" type="password" required />
            </label>
          </div>

          <button className="btn">Criar</button>
        </form>
      </div>

      <h3 style={{ marginTop: 20 }}>Lista</h3>
      {users.map((u) => (
        <div className="card" key={u.id}>
          <form action={updatePortalUser.bind(null, u.id)} className="stack">
            <div className="grid grid-3">
              <label>
                Email
                <input name="email" defaultValue={u.email} required />
              </label>
              <label>
                Nome
                <input name="name" defaultValue={u.name || ""} />
              </label>
              <label>
                Role
                <select name="role" defaultValue={u.role}>
                  <option value="STUDENT">STUDENT</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </label>
            </div>

            <label>
              Reset password (deixe vazio para não alterar)
              <input name="password" type="password" placeholder="novo password" />
            </label>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn">Salvar</button>
              <button className="btn danger" formAction={deletePortalUser.bind(null, u.id)}>
                Apagar
              </button>
            </div>
          </form>
        </div>
      ))}

      {users.length === 0 ? <p className="muted">Sem users.</p> : null}
    </div>
  );
}
