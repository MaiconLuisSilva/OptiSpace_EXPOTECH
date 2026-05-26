import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroField from "@/assets/hero-field.jpg";
import { cadastrarUsuario, salvarSessao } from "@/lib/api";

export const Route = createFileRoute("/cadastrar")({
  component: Cadastrar,
  head: () => ({ meta: [{ title: "Cadastrar — OptiSpace" }] }),
});

function Cadastrar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", username: "", email: "", password: "", password_confirm: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function setCampo(campo: keyof typeof form, valor: string) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (form.password !== form.password_confirm) {
      setErro("As senhas não conferem.");
      return;
    }
    setCarregando(true);
    try {
      const auth = await cadastrarUsuario(form);
      salvarSessao(auth);
      navigate({ to: "/app/minha-conta" });
    } catch (error) {
      setErro("Não foi possível criar a conta. Verifique se login/e-mail já estão em uso.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src={heroField} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[oklch(0.18_0.05_150/0.45)]" />

      <header className="relative z-10 flex justify-center pt-8">
        <nav className="font-sans flex items-center gap-12 rounded-full bg-[var(--forest-deep)]/90 px-12 py-4 text-cream backdrop-blur">
          <Link to="/login" className="text-sm tracking-widest text-cream/90 hover:text-gold">LOGIN</Link>
          <Link to="/" className="text-lg tracking-[0.3em]">OPTISPACE</Link>
          <span className="text-sm tracking-widest underline underline-offset-8 decoration-gold">CADASTRAR</span>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-2xl px-8 pt-16 pb-20">
        <form onSubmit={cadastrar} className="rounded-3xl bg-[var(--forest-deep)]/92 p-10 text-cream shadow-soft backdrop-blur">
          <h2 className="text-center text-3xl">Criar sua conta OptiSpace</h2>
          <p className="text-center text-cream/80">Comece agora a otimizar sua produção</p>
          {erro && <p className="mt-5 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">{erro}</p>}

          <Campo label="Nome completo" value={form.nome} onChange={(v) => setCampo("nome", v)} placeholder="Seu nome" />
          <Campo label="Login" value={form.username} onChange={(v) => setCampo("username", v)} placeholder="Escolha um usuário" />
          <Campo label="E-mail" type="email" value={form.email} onChange={(v) => setCampo("email", v)} placeholder="voce@email.com" />
          <Campo label="Senha" type="password" value={form.password} onChange={(v) => setCampo("password", v)} placeholder="Mínimo 6 caracteres" />
          <Campo label="Confirmar senha" type="password" value={form.password_confirm} onChange={(v) => setCampo("password_confirm", v)} placeholder="Repita sua senha" />

          <button disabled={carregando} className="font-sans mt-8 w-full rounded-full bg-gold py-3 font-semibold tracking-widest text-forest-deep hover:scale-[1.02] transition disabled:opacity-60">
            {carregando ? "CADASTRANDO..." : "CADASTRAR"}
          </button>
          <p className="mt-4 text-center text-sm text-cream/80">Já possui conta? <Link to="/login" className="text-gold underline">Entrar</Link></p>
        </form>
      </main>
    </div>
  );
}

function Campo({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (valor: string) => void; placeholder: string; type?: string }) {
  return (
    <div className="mt-5">
      <label className="text-sm">{label}</label>
      <input required type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-gold/40 bg-transparent px-4 py-3 text-cream placeholder:text-cream/50 outline-none focus:border-gold" />
    </div>
  );
}
