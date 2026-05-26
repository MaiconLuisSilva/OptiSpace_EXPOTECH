import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AppShell, Panel, Field, TextInput, Select, PrimaryButton } from "@/components/AppLayout";
import { LoadingOverlay } from "@/components/SeedLoading";
import { baixarPdfAnalise, criarAnalise, type Analise } from "@/lib/api";

export const Route = createFileRoute("/app/nova-verificacao")({
  component: NovaVerificacao,
  head: () => ({ meta: [{ title: "Nova Verificação — OptiSpace" }] }),
});

function Slider({ label, value, onChange, suffix = "%" }: { label: string; value: number; onChange: (v: number) => void; suffix?: string }) {
  return (
    <div>
      <label className="text-sm text-forest-deep">
        {label}: <span className="text-leaf">{value}{suffix}</span>
      </label>
      <input
        type="range" min={0} max={100} value={value} onChange={(e) => onChange(+e.target.value)}
        className="mt-2 w-full accent-[var(--leaf)]"
      />
    </div>
  );
}

function ResultPill({ children }: { children: ReactNode }) {
  return <div className="rounded-full bg-[var(--forest)] px-6 py-4 text-center text-cream shadow-soft">{children}</div>;
}

function ResultModal({ analise, onClose }: { analise: Analise; onClose: () => void }) {
  const r = analise.resultado;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-[oklch(0.97_0.01_220)] p-8 shadow-2xl">
        <div className="relative">
          <div className="rounded-full bg-[oklch(0.82_0.18_145)] px-8 py-4 text-center">
            <h3 className="text-3xl text-forest-deep">Condições do plantio: <span className="font-semibold">{r.status}</span></h3>
          </div>
          <button onClick={onClose} aria-label="Fechar" className="absolute right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-2xl text-forest-deep shadow-soft hover:scale-105 transition">×</button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ResultPill><div className="text-lg">índice_viabilidade:</div><div className="text-2xl">{r.indice_viabilidade}%</div></ResultPill>
          <ResultPill><div className="text-lg">produtividade_estimativa:</div><div className="text-2xl">{r.produtividade_estimativa}</div></ResultPill>
          <ResultPill><div className="text-lg">produção_total:</div><div className="text-2xl">{r.producao_total}</div></ResultPill>
          <ResultPill><div className="text-lg">risco_climático:</div><div className="text-2xl">{r.risco_climatico}</div></ResultPill>
          <ResultPill><div className="text-lg">sementes_total:</div><div className="text-2xl">{r.sementes_necessarias_total}</div></ResultPill>
          <ResultPill><div className="text-lg">água_necessária:</div><div className="text-xl">{r.necessidade_hidrica.mm_necessarios} mm</div></ResultPill>
        </div>

        <div className="mt-4 rounded-3xl bg-[var(--forest)] px-6 py-4 text-center text-cream shadow-soft">
          <div className="text-lg">recomendação:</div>
          <div className="text-base leading-relaxed">{r.recomendacao}</div>
        </div>

        <button onClick={() => baixarPdfAnalise(analise.id)} className="mt-5 block w-full rounded-full bg-gold px-6 py-3 text-center text-forest-deep shadow-soft hover:scale-105 transition">Baixar relatório PDF</button>
      </div>
    </div>
  );
}

function NovaVerificacao() {
  const [form, setForm] = useState({
    cultura: "Soja", solo: "Argiloso", regiao: "Sudeste", mes_plantio: "Outubro", condicao_climatica: "Sol moderado",
    area_hectares: 20, temperatura_media: 25, agua_disponivel: 70, incidencia_solar: 65, umidade_solo: 60,
  });
  const [analise, setAnalise] = useState<Analise | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function analisar() {
    try {
      setLoading(true); setErro("");
      const resposta = await criarAnalise(form);
      setAnalise(resposta);
    } catch (e) {
      setErro("Não foi possível conectar ao backend. Confirme se o Django está rodando em http://127.0.0.1:8000");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell title="Verificação" subtitle="Realize análises inteligentes para plantio.">
      <Panel>
        <h2 className="text-3xl text-forest-deep">Nova Verificação de Plantio</h2>
        <p className="text-muted-foreground">Preencha os dados abaixo para analisar a melhor condição de cultivo.</p>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          <Field label="Tipo de plantio"><Select value={form.cultura} onChange={(e) => setForm({ ...form, cultura: e.target.value })}><option>Soja</option><option>Milho</option><option>Feijão</option><option>Arroz</option></Select></Field>
          <Field label="Tipo de solo"><Select value={form.solo} onChange={(e) => setForm({ ...form, solo: e.target.value })}><option>Argiloso</option><option>Arenoso</option><option>Misto</option><option>Humoso</option></Select></Field>
          <Field label="Região"><Select value={form.regiao} onChange={(e) => setForm({ ...form, regiao: e.target.value })}><option>Norte</option><option>Nordeste</option><option>Centro-Oeste</option><option>Sudeste</option><option>Sul</option></Select></Field>
          <Field label="Mês do plantio"><Select value={form.mes_plantio} onChange={(e) => setForm({ ...form, mes_plantio: e.target.value })}>{["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].map(m => <option key={m}>{m}</option>)}</Select></Field>
          <Field label="Condição climática"><Select value={form.condicao_climatica} onChange={(e) => setForm({ ...form, condicao_climatica: e.target.value })}><option>Sol forte</option><option>Sol moderado</option><option>Chuva frequente</option><option>Clima seco</option><option>Clima úmido</option></Select></Field>
          <Field label="Área disponível em hectares"><TextInput type="number" value={form.area_hectares} onChange={(e) => setForm({ ...form, area_hectares: Number(e.target.value) })} /></Field>
          <Slider label="Temperatura média" suffix="°C" value={form.temperatura_media} onChange={(v) => setForm({ ...form, temperatura_media: v })} />
          <Slider label="Quantidade de água disponível" value={form.agua_disponivel} onChange={(v) => setForm({ ...form, agua_disponivel: v })} />
          <Slider label="Incidência solar" value={form.incidencia_solar} onChange={(v) => setForm({ ...form, incidencia_solar: v })} />
          <Slider label="Umidade do solo" value={form.umidade_solo} onChange={(v) => setForm({ ...form, umidade_solo: v })} />
        </div>

        {erro && <p className="mt-4 rounded-2xl bg-red-100 px-4 py-3 text-red-700">{erro}</p>}
        <div className="mt-8"><PrimaryButton onClick={analisar} disabled={loading}>{loading ? "Analisando..." : "Analisar Plantio"}</PrimaryButton></div>
      </Panel>
      {loading && <LoadingOverlay title="Analisando condições..." subtitle="Semeando dados para verificar a viabilidade do plantio." />}
      {analise && <ResultModal analise={analise} onClose={() => setAnalise(null)} />}
    </AppShell>
  );
}
