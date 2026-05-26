import { createFileRoute, Link } from "@tanstack/react-router";
import heroField from "@/assets/hero-field.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "OptiSpace — Tecnologia para o Campo" },
      {
        name: "description",
        content:
          "OptiSpace é uma plataforma inteligente para o setor agropecuário: gerencie áreas, otimize espaços e gere relatórios.",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src={heroField}
        alt="Campo de trigo dourado ao pôr do sol"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.4_0.05_200/0.55)] via-transparent to-[oklch(0.18_0.05_150/0.45)]" />

      {/* Nav */}
      <header className="relative z-10 flex justify-center pt-8">
        <nav className="font-sans flex items-center gap-12 rounded-full bg-[var(--forest-deep)]/90 px-12 py-4 text-cream backdrop-blur-sm">
          <Link to="/login" className="text-sm tracking-widest text-cream/90 hover:text-gold transition">LOGIN</Link>
          <span className="text-lg tracking-[0.3em] text-cream underline underline-offset-8 decoration-gold">
            OPTISPACE
          </span>
          <Link to="/cadastrar" className="text-sm tracking-widest text-cream/90 hover:text-gold transition">CADASTRAR</Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-8 pt-20 pb-32 md:grid-cols-2 md:pt-32">
        <div className="text-cream drop-shadow">
          <p className="font-sans text-sm font-semibold tracking-[0.4em] text-gold">OPTISPACE</p>
          <h1 className="mt-4 text-5xl leading-tight md:text-6xl">
            Tecnologia para o<br />Campo, Resultados<br />para o Futuro
          </h1>
          <p className="mt-6 max-w-md text-lg text-cream/90">
            O OptiSpace é uma plataforma inteligente voltada para o setor agropecuário,
            desenvolvida para auxiliar produtores rurais e administradores no
            gerenciamento e otimização de áreas agrícolas e pecuárias.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Link
            to="/recursos"
            className="group relative inline-flex h-44 w-44 items-center justify-center rounded-3xl bg-gold text-center text-3xl text-forest-deep shadow-[var(--shadow-glow)] transition hover:scale-105 md:h-56 md:w-56 md:text-4xl"
          >
            Conhecer<br />Projeto
          </Link>
        </div>
      </main>
    </div>
  );
}
