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

export function clientMark(slug: string) {
  return MARKS[`/src/assets/logos/${slug}.asset.json`];
}

export function hasClientMark(slug: string) {
  return Boolean(clientMark(slug));
}

export function ClientLogo({ client, className }: { client: Client; className?: string }) {
  const mark = clientMark(client.slug);

  if (mark) {
    return (
      <img
        src={mark.url}
        alt={`${client.name} logo`}
        width={140}
        height={28}
        loading="lazy"
        className={cn("h-7 w-auto max-w-[9rem] object-contain", className)}
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
