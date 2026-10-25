import { useEffect, useRef, useState } from "react";

type Advice = { brand: string; trigger: string; text: string };
type Msg = { role: "user" | "assistant"; text: string };

function promptFor(a: Advice) {
  return `What should ${a.brand} do about the ${a.trigger.toLowerCase()}?`;
}

/** One ChatGPT-style window that plays the example exchanges one at a time. */
export function AssistantChat({ items }: { items: readonly Advice[] }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setMessages(items.flatMap((a) => [{ role: "user", text: promptFor(a) }, { role: "assistant", text: a.text }] as Msg[]));
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));
    (async () => {
      while (!cancelled) {
        for (const a of items) {
          if (cancelled) return;
          // Each example starts from an empty window.
          setMessages([]);
          setTyping(false);
          await wait(600);
          if (cancelled) return;
          setMessages((m) => [...m, { role: "user", text: promptFor(a) }]);
          setTyping(true);
          await wait(1100);
          setTyping(false);
          const words = a.text.split(" ");
          setMessages((m) => [...m, { role: "assistant", text: "" }]);
          for (let i = 1; i <= words.length; i++) {
            if (cancelled) return;
            await wait(35);
            const t = words.slice(0, i).join(" ");
            setMessages((m) => [...m.slice(0, -1), { role: "assistant", text: t }]);
          }
          await wait(2400);
        }
        if (cancelled) return;
        setMessages([]);
        await wait(1200);
      }
    })();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [items]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  return (
    <div className="cg-chat flex h-[480px] flex-col border border-border bg-background shadow-sm">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-cyan" aria-hidden />
        <p className="data-label text-navy">AI Brand Assistant</p>
      </div>
      <div ref={scrollRef} aria-live="polite" className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="cg-chat-in flex justify-end">
              <p className="max-w-[80%] rounded-2xl bg-navy px-4 py-2.5 text-sm text-primary-foreground">{m.text}</p>
            </div>
          ) : (
            <div key={i} className="cg-chat-in flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-semibold text-navy" aria-hidden>CG</span>
              <p className="text-sm leading-relaxed text-foreground">{m.text}</p>
            </div>
          ),
        )}
        {typing && (
          <div className="cg-chat-in flex gap-3" aria-label="Assistant is typing">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-semibold text-navy" aria-hidden>CG</span>
            <span className="flex items-center gap-1 pt-2">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground" style={{ animationDelay: `${d * 150}ms` }} />
              ))}
            </span>
          </div>
        )}
      </div>
      <div className="border-t border-border px-4 py-3">
        <div className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">Ask about your brand…</div>
      </div>
    </div>
  );
}
