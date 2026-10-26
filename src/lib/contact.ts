import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Contact form delivery: reCAPTCHA v3 check, then a plain-text email via Resend.
// The recipient lives only inside the server handler, so it never reaches the browser bundle.

export const RECAPTCHA_ACTION = "contact";

const ContactInput = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().min(1).max(200),
  orgType: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().max(5000).optional().default(""),
  website: z.string().max(200).optional().default(""), // honeypot, must stay empty
  token: z.string().max(4000).optional().default(""),
});

export type ContactResult = { ok: true } | { ok: false; error: "captcha" | "unavailable" };

declare global {
  // Cloudflare bindings, set per request by Nitro's module handler.
  var __env__: Record<string, string | undefined> | undefined;
}

const env = (key: string) => process.env[key] ?? globalThis.__env__?.[key];

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

export const sendContact = createServerFn({ method: "POST" })
  .inputValidator(ContactInput)
  .handler(async ({ data }): Promise<ContactResult> => {
    // Bots fill every field; pretend success so they learn nothing.
    if (data.website) return { ok: true };

    const recaptchaSecret = env("RECAPTCHA_SECRET_KEY");
    const resendKey = env("RESEND_API_KEY");
    const from = env("CONTACT_FROM") ?? "Convert Group Website <website@send.convertgroup.com>";
    const to = env("CONTACT_TO") ?? "bizdev@convertgroup.com";
    if (!recaptchaSecret || !resendKey) {
      console.error("Contact form: RECAPTCHA_SECRET_KEY or RESEND_API_KEY is not set");
      return { ok: false, error: "unavailable" };
    }

    const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: recaptchaSecret, response: data.token }),
    });
    const check = (await verify.json()) as { success: boolean; score?: number; action?: string };
    const minScore = Number(env("RECAPTCHA_MIN_SCORE") ?? 0.5);
    if (!check.success || check.action !== RECAPTCHA_ACTION || (check.score ?? 0) < minScore) {
      return { ok: false, error: "captcha" };
    }

    const text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company}`,
      `Organisation type: ${data.orgType || "—"}`,
      "",
      data.message || "(no message)",
    ].join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: data.email,
        subject: oneLine(`Website enquiry: ${data.name} (${data.company})`),
        text,
      }),
    });
    if (!res.ok) {
      console.error("Contact form: Resend responded", res.status, await res.text());
      return { ok: false, error: "unavailable" };
    }
    return { ok: true };
  });
