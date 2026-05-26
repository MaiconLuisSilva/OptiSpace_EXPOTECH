import { Leaf } from "lucide-react";

export function SeedLoading({ title = "Semeando dados...", subtitle = "Estamos preparando tudo para você." }: { title?: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center text-forest-deep">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-forest/15 bg-cream/80 shadow-soft">
        <div className="absolute inset-[-10px] animate-spin rounded-full border-4 border-transparent border-t-leaf border-r-forest/20" />
        <div className="relative flex h-12 w-12 items-end justify-center rounded-b-full bg-[oklch(0.28_0.08_85)]">
          <Leaf className="absolute -top-6 text-leaf" size={42} strokeWidth={2.2} />
        </div>
      </div>
      <h2 className="mt-6 text-3xl">{title}</h2>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
      <div className="mt-6 h-2 w-52 overflow-hidden rounded-full bg-forest/15">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-leaf" />
      </div>
    </div>
  );
}

export function LoadingOverlay({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-cream/80 backdrop-blur-sm">
      <SeedLoading title={title} subtitle={subtitle} />
    </div>
  );
}
