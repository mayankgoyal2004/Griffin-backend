import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pager({ page, canPrev, hasNext, onPrev, onNext, loading, total }) {
  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
      <span>
        Page {page + 1}
        {typeof total === "number" ? ` · ${total} item${total === 1 ? "" : "s"}` : ""}
      </span>
      <div className="flex items-center gap-2">
        <Button type="button" size="sm" variant="outline" onClick={onPrev} disabled={!canPrev || loading}>
          <ChevronLeft className="mr-1 h-3.5 w-3.5" /> Previous
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onNext} disabled={!hasNext || loading}>
          Next <ChevronRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}