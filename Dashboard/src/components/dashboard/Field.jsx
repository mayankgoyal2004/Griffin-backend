import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Field({
  label,
  type = "text",
  value,
  onChange,
  options = [],
  rows = 4,
  placeholder,
  hint,
  required,
  disabled,
  className = "",
  min,
  step,
}) {
  return (
    <div className={className}>
      {label && (
        <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      {type === "textarea" ? (
        <Textarea
          rows={rows}
          value={value ?? ""}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === "select" ? (
        <select
          value={value ?? ""}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Select…</option>
          {options.map((option) => {
            const item = typeof option === "string" ? { value: option, label: option } : option;
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      ) : type === "checkbox" ? (
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm ${
            value ? "border-accent bg-accent/10 text-primary" : "border-border bg-white text-muted-foreground"
          }`}
        >
          <span className={`h-3 w-3 rounded-sm border ${value ? "border-gold-dark bg-gold" : "border-border"}`} />
          {placeholder || "Enabled"}
        </button>
      ) : (
        <Input
          type={type}
          value={value ?? ""}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          step={step}
          onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        />
      )}
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}