import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel, Field, TextInput, Select, PrimaryButton } from "@/components/AppLayout";
import { getUsuarioLocal } from "@/lib/api";

export const Route = createFileRoute("/app/minha-conta")({
  component: MinhaConta,
  head: () => ({ meta: [{ title: "Minha Conta — OptiSpace" }] }),
});

function MinhaConta() {
  const usuario = getUsuarioLocal();

  return (
    <AppShell title="Minha Conta" subtitle="Visualize as informações da sua conta autenticada">
      <Panel>
        <h2 className="text-3xl text-forest-deep">Informações do Usuário</h2>
        <p className="text-muted-foreground">Bem-vindo! É um prazer recebê-lo!</p>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          <Field label="Nome de usuário"><TextInput value={usuario?.first_name || ""} readOnly /></Field>
          <Field label="Login"><TextInput value={usuario?.username || ""} readOnly /></Field>
          <Field label="E-mail"><TextInput value={usuario?.email || ""} readOnly /></Field>
          <Field label="Status da conta"><TextInput value="Usuário autenticado" readOnly /></Field>
          <Field label="Status da autenticação"><TextInput value="Logado com token" readOnly /></Field>
          <Field label="Confirmação por e-mail">
            <Select defaultValue="Ativado"><option>Ativado</option><option>Desativado</option></Select>
          </Field>
        </div>
        
      </Panel>
    </AppShell>
  );
}
