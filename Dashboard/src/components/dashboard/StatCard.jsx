import { cn } from "@/lib/utils";

export default function StatCard({ label, value, hint, icon: Icon, tone = "default" }) {
  return (
    <div className="gc-card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        {Icon && (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md",
              tone === "gold" ? "bg-accent/15 text-gold-dark" : "bg-primary/5 text-primary",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="mt-3 font-heading text-3xl font-semibold text-primary">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}