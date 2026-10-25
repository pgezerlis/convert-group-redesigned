import { useEffect, useRef } from "react";

import type { Client } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Client marks are the clients' own official files — we never draw a client's
 * identity ourselves. Drop a CDN pointer at src/assets/logos/<slug>.asset.json
 * (e.g. src/assets/logos/skroutz.asset.json) and it renders here automatically.
 * Until then the client's name is shown as a clearly labelled stand-in.
 */
const MARKS = import.meta.glob<{ url: string }>("/src/assets/logos/*.asset.json", {
  eager: true,
  import: "default",
});

/** Marks arrive at very different shapes; sizing them to a similar optical area
 *  keeps the strip even instead of letting a wide wordmark dwarf a compact one. */
const TARGET_AREA = 2400;

export function clientMark(slug: string) {
  return MARKS[`/src/assets/logos/${slug}.asset.json`];
}

export function hasClientMark(slug: string) {
  return Boolean(clientMark(slug));
}

export function ClientLogo({ client, className }: { client: Client; className?: string }) {
  const mark = clientMark(client.slug);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const size = () => {
      const ratio = el.naturalWidth / el.naturalHeight;
      if (!ratio) return;
      const h = Math.min(40, Math.max(22, Math.sqrt(TARGET_AREA / ratio)));
      el.style.height = `${Math.round(h)}px`;
      el.style.width = `${Math.round(h * ratio)}px`;
    };

    // A cached mark is already complete by the time this runs, so its load event never fires.
    if (el.complete && el.naturalWidth) size();
    else el.addEventListener("load", size);
    return () => el.removeEventListener("load", size);
  }, [mark?.url]);

  if (mark) {
    return (
      <img
        ref={ref}
        src={mark.url}
        alt={`${client.name} logo`}
        loading="lazy"
        className={cn("client-mark h-7 w-auto max-w-[9rem] object-contain", className)}
      />
    );
  }

  return (
    <span
      title={`${client.name} — official mark pending`}
      className={cn("text-lg font-bold tracking-tight text-navy", className)}
    >
      {client.name}
    </span>
  );
}
