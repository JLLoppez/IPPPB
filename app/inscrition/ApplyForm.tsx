"use client";

import { useEffect, useState } from "react";

type Course = { id: number; title: string };

export default function ApplyForm() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((d) => setCourses(d?.courses || []))
      .catch(() => setCourses([]));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null);
    setErr(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      idNumber: String(form.get("idNumber") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      classLevel: String(form.get("classLevel") || ""),
      course: String(form.get("course") || ""),
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Falha ao enviar inscrição.");

      (e.target as HTMLFormElement).reset();
      setOk("✅ Inscrição enviada! Em breve entraremos em contacto.");
    } catch (e: any) {
      setErr(e?.message || "Erro ao enviar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card shadow-sm">
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 form-group">
            <label>Primeiros nomes</label>
            <input className="form-control" name="firstName" required />
          </div>
          <div className="col-md-6 form-group">
            <label>Apelido</label>
            <input className="form-control" name="lastName" required />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label>Nº BI (opcional)</label>
            <input className="form-control" name="idNumber" />
          </div>
          <div className="col-md-6 form-group">
            <label>Telefone (opcional)</label>
            <input className="form-control" name="phone" />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="email" name="email" required />
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label>Classe (opcional)</label>
            <select className="form-control" name="classLevel" defaultValue="">
              <option value="">Selecionar</option>
              <option value="10ª">10ª</option>
              <option value="11ª">11ª</option>
              <option value="12ª">12ª</option>
              <option value="13ª">13ª</option>
            </select>
          </div>

          <div className="col-md-6 form-group">
            <label>Curso (opcional)</label>
            <select className="form-control" name="course" defaultValue="">
              <option value="">Selecionar</option>
              {courses.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {ok ? <div className="alert alert-success mt-3 mb-0">{ok}</div> : null}
        {err ? <div className="alert alert-danger mt-3 mb-0">{err}</div> : null}
      </div>

      <div className="card-footer bg-white border-0">
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Enviando..." : "Enviar inscrição"}
        </button>
      </div>
    </form>
  );
}
