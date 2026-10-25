import { useState } from "react";
import { WORKFLOW_EXAMPLES } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Scripted, deterministic example — not a live AI feature. */
export function IllustrativeWorkflow() {
  const [i, setI] = useState(0);
  const ex = WORKFLOW_EXAMPLES[i] ?? WORKFLOW_EXAMPLES[0];
  return (
    <div className="rounded-lg border border-border bg-background p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">Illustrative workflow</p>
        <p className="data-label text-muted-foreground" aria-live="polite">
          Example {i + 1} of {WORKFLOW_EXAMPLES.length}
        </p>
      </div>
      <div role="group" aria-label="Choose an example" className="mt-4 flex flex-wrap gap-2">
        {WORKFLOW_EXAMPLES.map((e, idx) => (
          <button
            key={e.label}
            type="button"
            aria-pressed={idx === i}
            onClick={() => setI(idx)}
            className={cn(
              "min-h-11 rounded-md border px-4 text-sm font-medium transition-colors",
              idx === i ? "border-navy bg-pale text-navy" : "border-control text-navy hover:bg-surface",
            )}
          >
            {e.label}
          </button>
        ))}
      </div>
      <ol className="mt-6 divide-y divide-border border-t border-border">
        <li className="grid gap-2 py-4 md:grid-cols-[150px_1fr]">
          <span className="data-label text-muted-foreground">1 · Question</span>
          <p className="border-l-2 border-cyan pl-3 text-lg font-medium text-navy">{ex.question}</p>
        </li>
        <li className="grid gap-2 py-4 md:grid-cols-[150px_1fr]">
          <span className="data-label text-muted-foreground">2 · Evidence</span>
          <ul className="space-y-2">
            {ex.evidence.map((e) => (
              <li key={e.k}>
                <span className="text-ink">{e.k}</span>
                <span className="data-label block text-muted-foreground">{e.v}</span>
              </li>
            ))}
          </ul>
        </li>
        <li className="grid gap-2 py-4 md:grid-cols-[150px_1fr]">
          <span className="data-label text-muted-foreground">3 · Option</span>
          <p className="text-ink">{ex.option}</p>
        </li>
        <li className="grid gap-2 py-4 md:grid-cols-[150px_1fr]">
          <span className="data-label text-muted-foreground">4 · Human review</span>
          <p className="text-ink">Validate demand, pricing and permitted data use with your team.</p>
        </li>
      </ol>
    </div>
  );
}
