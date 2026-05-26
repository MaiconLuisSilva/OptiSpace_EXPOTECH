import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroField from "@/assets/hero-field.jpg";
import { loginUsuario, salvarSessao } from "@/lib/api";
import { LoadingOverlay } from "@/components/SeedLoading";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Login — OptiSpace" }] }),
});

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const auth = await loginUsuario({ username, password });
      salvarSessao(auth);
      navigate({ to: "/app/minha-conta" });
    } catch {
      setErro("Login ou senha inválidos. Confira os dados e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {carregando && <LoadingOverlay title="Semeando dados..." subtitle="Validando seu acesso ao OptiSpace." />}
      <img src={heroField} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[oklch(0.18_0.05_150/0.4)]" />

      <header className="relative z-10 flex justify-center pt-8">
        <nav className="font-sans flex items-center gap-12 rounded-full bg-[var(--forest-deep)]/90 px-12 py-4 text-cream backdrop-blur">
          <span className="text-sm tracking-widest underline underline-offset-8 decoration-gold">LOGIN</span>
          <Link to="/" className="text-lg tracking-[0.3em] text-cream">OPTISPACE</Link>
          <Link to="/cadastrar" className="text-sm tracking-widest text-cream/90 hover:text-gold transition">CADASTRAR</Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-8 pt-20 md:grid-cols-2">
        <div className="text-cream">
          <p className="font-sans text-sm tracking-[0.4em] text-gold">OPTISPACE</p>
          <h1 className="mt-4 text-5xl leading-tight md:text-6xl">Tecnologia para o<br />Campo, Resultados<br />para o Futuro</h1>
          <p className="mt-6 max-w-md text-lg text-cream/90">Entre com sua conta para gerar análises e manter seu histórico de plantio salvo.</p>
        </div>

        <form onSubmit={entrar} className="rounded-3xl bg-[var(--forest-deep)]/90 p-10 text-cream backdrop-blur shadow-soft">
          <p className="text-center text-xl">Entre para acessar o sistema<br />OptiSpace</p>
          {erro && <p className="mt-5 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">{erro}</p>}
          <label className="mt-8 block text-sm">Login</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required className="mt-2 w-full rounded-xl border border-gold/40 bg-transparent px-4 py-3 text-cream placeholder:text-cream/50 outline-none focus:border-gold" placeholder="Digite seu usuário" />
          <label className="mt-5 block text-sm">Senha</label>
          <div className="relative mt-2">
            <input value={password} onChange={(e) => setPassword(e.target.value)} required type={show ? "text" : "password"} className="w-full rounded-xl border border-gold/40 bg-transparent px-4 py-3 pr-12 text-cream placeholder:text-cream/50 outline-none focus:border-gold" placeholder="Digite sua senha" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/70">{show ? "🙈" : "👁"}</button>
          </div>
          <button disabled={carregando} className="font-sans mt-6 w-full rounded-full bg-gold py-3 font-semibold tracking-widest text-forest-deep hover:scale-[1.02] transition disabled:opacity-60">
            {carregando ? "ENTRANDO..." : "ENTRAR"}
          </button>
        </form>
      </main>
    </div>
  );
}
