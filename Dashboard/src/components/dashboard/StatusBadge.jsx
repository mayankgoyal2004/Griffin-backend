const TONES = {
  New: "bg-blue-50 text-blue-700 ring-blue-200",
  Contacted: "bg-amber-50 text-amber-700 ring-amber-200",
  "In Progress": "bg-violet-50 text-violet-700 ring-violet-200",
  Converted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Closed: "bg-slate-100 text-slate-600 ring-slate-200",
  Planning: "bg-slate-100 text-slate-600 ring-slate-200",
  Ongoing: "bg-amber-50 text-amber-700 ring-amber-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Draft: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function StatusBadge({ value }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${
        TONES[value] || "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {value}
    </span>
  );
}