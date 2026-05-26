import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Panel } from "@/components/AppLayout";
import { baixarPdfAnalise, listarAnalises, type Analise } from "@/lib/api";

export const Route = createFileRoute("/app/relatorios")({
  component: Relatorios,
  head: () => ({ meta: [{ title: "Relatórios — OptiSpace" }] }),
});

const toneClass: Record<string, string> = {
  Aprovado: "bg-[oklch(0.78_0.15_145)] text-forest-deep",
  Atenção: "bg-[oklch(0.7_0.07_145)] text-cream",
  "Não recomendado": "bg-[oklch(0.65_0.1_25)] text-cream",
};

function Relatorios() {
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarAnalises()
      .then(setAnalises)
      .catch(() => setErro("Não foi possível carregar relatórios. Inicie o backend Django."));
  }, []);

  return (
    <AppShell title="Histórico de Relatórios" subtitle="Consulte os relatórios já criados no sistema">
      <Panel>
        <h2 className="text-3xl text-forest-deep">Relatórios de Plantio</h2>
        <p className="text-muted-foreground">Histórico de analises do usuário.</p>

        {erro && <p className="mt-4 rounded-2xl bg-red-100 px-4 py-3 text-red-700">{erro}</p>}

        <div className="mt-6 overflow-hidden rounded-2xl bg-[var(--forest-deep)] text-cream">
          <table className="w-full text-center">
            <thead className="bg-[var(--forest)]">
              <tr className="text-xl">
                {["ID", "Cultura", "Solo", "Região", "Mês", "Status", "Ação"].map((h) => <th key={h} className="px-4 py-4 font-normal">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {analises.length === 0 && !erro && (
                <tr><td colSpan={7} className="px-4 py-8">Nenhum relatório criado ainda.</td></tr>
              )}
              {analises.map((a) => (
                <tr key={a.id} className="border-t border-cream/10">
                  <td className="px-4 py-5">#{String(a.id).padStart(3, "0")}</td>
                  <td>{a.cultura}</td>
                  <td>{a.solo}</td>
                  <td>{a.regiao}</td>
                  <td>{a.mes_plantio}</td>
                  <td><span className={`inline-block rounded-full px-4 py-1 text-sm ${toneClass[a.resultado.status] ?? toneClass.Atenção}`}>{a.resultado.status}</span></td>
                  <td><button onClick={() => baixarPdfAnalise(a.id)} className="rounded-full bg-gold px-4 py-1 text-sm text-forest-deep hover:scale-105 transition">PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
