"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null);
    setErr(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Falha ao enviar. Tente novamente.");

      (e.target as HTMLFormElement).reset();
      setOk("✅ Mensagem enviada. Obrigado! Vamos responder em breve.");
    } catch (e: any) {
      setErr(e?.message || "Erro ao enviar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card shadow-sm">
      <div className="card-body">
        <div className="form-group">
          <label>Nome</label>
          <input className="form-control" name="name" required placeholder="Seu nome" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="email" name="email" required placeholder="seu@email.com" />
        </div>
        <div className="form-group">
          <label>Telefone (opcional)</label>
          <input className="form-control" name="phone" placeholder="Telefone" />
        </div>
        <div className="form-group">
          <label>Mensagem</label>
          <textarea className="form-control" name="message" required rows={5} placeholder="Sua mensagem" />
        </div>

        {ok ? <div className="alert alert-success mt-3 mb-0">{ok}</div> : null}
        {err ? <div className="alert alert-danger mt-3 mb-0">{err}</div> : null}
      </div>

      <div className="card-footer bg-white border-0">
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
}
