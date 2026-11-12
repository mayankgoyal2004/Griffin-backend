import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

/**
 * Repeatable group of fields (feature cards, process steps, FAQs, stats…).
 * fields: [{ key, label, type: "text" | "textarea" | "number" | "select", options, placeholder }]
 */
export default function RepeaterField({ label, items = [], onChange, fields = [], addLabel = "Add item", emptyLabel }) {
  const update = (index, key, value) => {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    onChange(next);
  };

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onChange(next);
  };

  const remove = (index) => onChange(items.filter((_, i) => i !== index));

  const add = () => {
    const blank = fields.reduce((acc, field) => ({ ...acc, [field.key]: field.type === "number" ? 0 : "" }), {});
    onChange([...items, blank]);
  };

  return (
    <div>
      {label && <Label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</Label>}
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="rounded-md border border-dashed border-border px-3 py-4 text-center text-xs text-muted-foreground">
            {emptyLabel || "Nothing added yet."}
          </p>
        )}
        {items.map((item, index) => (
          <div key={index} className="rounded-lg border border-border bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">#{index + 1}</span>
              <div className="flex items-center gap-1">
                <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={() => move(index, -1)} disabled={index === 0}>
                  <ArrowUp className="h-3.5 w-3.5" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </Button>
                <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => remove(index)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                  <Label className="mb-1 block text-[11px] text-muted-foreground">{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      rows={2}
                      value={item[field.key] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(e) => update(index, field.key, e.target.value)}
                      className="text-sm"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={item[field.key] ?? ""}
                      onChange={(e) => update(index, field.key, e.target.value)}
                      className="h-9 w-full rounded-md border border-input bg-white px-2 text-sm"
                    >
                      <option value="">Select…</option>
                      {(field.options || []).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type={field.type === "number" ? "number" : "text"}
                      value={item[field.key] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(e) => update(index, field.key, field.type === "number" ? Number(e.target.value) : e.target.value)}
                      className="h-9 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" className="mt-3" onClick={add}>
        <Plus className="mr-1.5 h-3.5 w-3.5" /> {addLabel}
      </Button>
    </div>
  );
}