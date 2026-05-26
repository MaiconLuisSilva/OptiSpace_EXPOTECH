import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/AppLayout";

export const Route = createFileRoute("/app/configuracoes")({
  component: Configuracoes,
  head: () => ({ meta: [{ title: "Configurações — OptiSpace" }] }),
});

function Configuracoes() {
  return (
    <AppShell title="Recomendações" subtitle="Referência rápida dos parâmetros ideais para cada tipo de plantio.">
      <Panel>
        <h2 className="text-3xl text-forest-deep">Valores Recomendados por Cultura</h2>
        <p className="text-muted-foreground">Conheça as condições ideais de cada cultura.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {crops.map((crop) => (
            <div key={crop.name} className="rounded-2xl bg-[oklch(0.88_0.02_130)] p-6 shadow-soft">
              <div className="flex items-center gap-2 text-2xl text-forest-deep">
                <span className="text-3xl">{crop.emoji}</span>
                <span className="font-semibold">{crop.name}</span>
              </div>
              <ul className="mt-4 space-y-2 text-forest-deep/90">
                <li>Produtividade base ideal: <strong>{crop.productivity}</strong></li>
                <li>Água ideal: <strong>{crop.water}</strong></li>
                <li>Temperatura ideal: <strong>{crop.temperature}</strong></li>
                <li>Meses ideais: <strong>{crop.months}</strong></li>
              </ul>
              <p className="mt-4 rounded-xl bg-[oklch(0.95_0.01_120)] px-4 py-3 text-sm text-forest-deep/80 italic">
                Obs: {crop.note}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}

const crops = [
  {
    emoji: "🌱",
    name: "Soja",
    productivity: "70",
    water: "650 mm (chuva + irrigação)",
    temperature: "22°C a 30°C",
    months: "Setembro, Outubro, Novembro",
    note: "A soja se desenvolve melhor em clima quente moderado e boa disponibilidade de água, principalmente na primavera.",
  },
  {
    emoji: "🌽",
    name: "Milho",
    productivity: "180",
    water: "800 mm",
    temperature: "18°C a 32°C",
    months: "Setembro, Outubro, Novembro, Dezembro",
    note: "O milho tolera uma faixa maior de temperatura e exige bastante água. Ele é mais produtivo com clima quente e boa umidade.",
  },
  {
    emoji: "🫘",
    name: "Feijão",
    productivity: "55",
    water: "450 mm",
    temperature: "18°C a 28°C",
    months: "Agosto, Setembro, Outubro",
    note: "O feijão prefere temperaturas mais amenas e precisa de menos água que soja e milho. Plantio ideal no final do inverno e início da primavera.",
  },
  {
    emoji: "🌾",
    name: "Arroz",
    productivity: "120",
    water: "1200 mm",
    temperature: "20°C a 35°C",
    months: "Setembro, Outubro, Novembro",
    note: "O arroz é a cultura mais exigente em água no modelo. Se adapta bem ao calor e precisa de muita irrigação/chuva.",
  },
];