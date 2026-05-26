import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BarChart3, Leaf, LogOut, PlusCircle, UserRound } from "lucide-react";
import { logout } from "@/lib/api";

const navItems = [
  { to: "/app/minha-conta", label: "Minha Conta", icon: UserRound },
  { to: "/app/nova-verificacao", label: "Nova Verificação", icon: PlusCircle },
  { to: "/app/relatorios", label: "Relatórios", icon: BarChart3 },
  { to: "/app/configuracoes", label: "Recomendações", icon: Leaf },
] as const;

export function AppShell({ title, subtitle, action, children }: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-cream to-[oklch(0.78_0.1_145)]">
      <aside className="w-64 bg-[var(--forest-deep)] px-6 py-10 text-cream">
        <Link to="/" className="block text-3xl">
          Opti<span className="text-gold">Space</span>
        </Link>
        <nav className="mt-12 space-y-3">
          {navItems.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center justify-center gap-3 rounded-full px-5 py-2.5 text-lg transition ${
                  active
                    ? "bg-[var(--forest)] text-gold ring-1 ring-gold shadow-[0_0_14px_rgba(218,165,32,0.2)]"
                    : "bg-[oklch(0.4_0.04_150)] text-cream/90 hover:bg-[var(--forest)] hover:text-gold"
                }`}
              >
                <Icon size={22} strokeWidth={2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => { logout(); navigate({ to: "/login" }); }}
            className="mt-2 flex w-full items-center justify-center gap-3 rounded-full bg-[oklch(0.55_0.02_150)] px-5 py-2.5 text-lg text-cream hover:bg-[oklch(0.45_0.02_150)] hover:text-gold"
          >
            <LogOut size={22} strokeWidth={2} />
            <span>Sair</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 px-12 py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-5xl text-forest-deep">{title}</h1>
            <p className="mt-1 text-lg text-muted-foreground">{subtitle}</p>
          </div>
          {action}
        </div>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}

export function Outlet$() {
  return <Outlet />;
}

export function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl bg-[oklch(0.92_0.01_120)] p-8 shadow-soft">
      {children}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-forest-deep">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-full border border-forest/30 bg-transparent px-5 py-2.5 text-forest-deep outline-none focus:border-forest"
    />
  );
}

export function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full appearance-none rounded-full border border-forest/30 bg-transparent bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22><path fill=%22%23234%22 d=%22M2 4l4 4 4-4z%22/></svg>')] bg-[right_1rem_center] bg-no-repeat px-5 py-2.5 pr-10 text-forest-deep outline-none focus:border-forest"
    >
      {children}
    </select>
  );
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full rounded-full bg-[var(--leaf)] py-3 text-lg text-cream shadow-soft transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
    />
  );
}
