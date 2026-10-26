import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Contact form delivery: reCAPTCHA v3 check, then a plain-text email sent through the
// Google Workspace Gmail API by a service account with domain-wide delegation.
// Sender, recipient and keys live only inside the server handler, so they never reach the browser bundle.

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

// Header values must never carry line breaks, or a visitor could inject extra headers.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

const base64 = (bytes: Uint8Array) =>
  btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join(""));
const utf8 = (s: string) => new TextEncoder().encode(s);
const base64url = (bytes: Uint8Array) =>
  base64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const encodedWord = (s: string) => `=?UTF-8?B?${base64(utf8(oneLine(s)))}?=`;

/** Exchanges a signed service-account JWT for a Gmail send token, acting as `sender`. */
async function gmailToken(clientEmail: string, privateKeyPem: string, sender: string) {
  const der = Uint8Array.from(
    atob(privateKeyPem.replace(/\\n/g, "\n").replace(/-----[^-]+-----|\s/g, "")),
    (c) => c.charCodeAt(0),
  );
  const key = await crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const now = Math.floor(Date.now() / 1000);
  const part = (o: object) => base64url(utf8(JSON.stringify(o)));
  const unsigned = `${part({ alg: "RS256", typ: "JWT" })}.${part({
    iss: clientEmail,
    sub: sender,
    scope: "https://www.googleapis.com/auth/gmail.send",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, utf8(unsigned)));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${base64url(sig)}`,
    }),
  });
  if (!res.ok) throw new Error(`Google token request failed: ${res.status} ${await res.text()}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

export const sendContact = createServerFn({ method: "POST" })
  .inputValidator(ContactInput)
  .handler(async ({ data }): Promise<ContactResult> => {
    // Bots fill every field; pretend success so they learn nothing.
    if (data.website) return { ok: true };

    const recaptchaSecret = env("RECAPTCHA_SECRET_KEY");
    const clientEmail = env("GOOGLE_SERVICE_ACCOUNT_EMAIL");
    const privateKey = env("GOOGLE_SERVICE_ACCOUNT_KEY");
    const sender = env("CONTACT_SENDER") ?? "itservices@convertgroup.com";
    const to = env("CONTACT_TO") ?? "bizdev@convertgroup.com";
    if (!recaptchaSecret || !clientEmail || !privateKey) {
      console.error(
        "Contact form: RECAPTCHA_SECRET_KEY, GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_KEY is not set",
      );
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
    ].join("\r\n");

    const mime = [
      `From: ${encodedWord("Convert Group Website")} <${oneLine(sender)}>`,
      `To: ${oneLine(to)}`,
      `Reply-To: ${oneLine(data.email)}`,
      `Subject: ${encodedWord(`Website enquiry: ${data.name} (${data.company})`)}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      base64(utf8(text)).replace(/.{76}/g, "$&\r\n"),
    ].join("\r\n");

    try {
      const token = await gmailToken(clientEmail, privateKey, sender);
      const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ raw: base64url(utf8(mime)) }),
      });
      if (!res.ok) throw new Error(`Gmail send failed: ${res.status} ${await res.text()}`);
    } catch (error) {
      console.error("Contact form:", error);
      return { ok: false, error: "unavailable" };
    }
    return { ok: true };
  });
