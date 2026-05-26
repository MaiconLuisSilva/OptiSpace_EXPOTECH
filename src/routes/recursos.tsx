import { createFileRoute, Link } from "@tanstack/react-router";
import heroField from "@/assets/hero-field.jpg";

export const Route = createFileRoute("/recursos")({
  component: Recursos,
  head: () => ({
    meta: [
      { title: "Recursos — OptiSpace" },
      { name: "description", content: "Descubra o que o OptiSpace oferece: gestão de áreas, dashboard, otimização e relatórios." },
    ],
  }),
});

const features = [
  { icon: "🌽", title: "Gestão de Áreas", desc: "Organize áreas de plantio, setores da fazenda e espaços produtivos." },
  { icon: "💡", title: "Dashboard Inteligente", desc: "Acompanhe dados, indicadores e informações da propriedade em uma tela visual." },
  { icon: "🗺️", title: "Otimização de Espaço", desc: "Ajuda no melhor aproveitamento das áreas agrícolas disponíveis." },
  { icon: "📋", title: "Relatórios", desc: "Gere relatórios para análise, organização e tomada de decisão no campo." },
];

function Recursos() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src={heroField} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[oklch(0.18_0.05_150/0.55)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 text-center text-cream">
            <p className="font-sans text-sm tracking-[0.3em] text-gold">RECURSOS DO SISTEMA</p>
            <h1 className="mt-2 text-5xl">O que o OptiSpace oferece?</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/90">
              Uma solução inteligente para organizar, controlar e otimizar a gestão
              agropecuária de forma simples, visual e eficiente.
            </p>
          </div>
          <Link
            to="/"
            className="font-sans rounded-full bg-gold px-6 py-3 text-sm font-medium text-forest-deep shadow-soft hover:scale-105 transition"
          >
            voltar
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl bg-[var(--forest-deep)]/90 p-10 text-center text-cream shadow-soft backdrop-blur"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-leaf text-3xl">
                {f.icon}
              </div>
              <h3 className="mt-6 text-3xl">{f.title}</h3>
              <p className="mt-3 text-cream/85">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
