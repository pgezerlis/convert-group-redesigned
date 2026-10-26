import { useEffect, useRef, useState, type FormEvent } from "react";
import { btn } from "./ui";
import { RECAPTCHA_ACTION, sendContact, type ContactResult } from "@/lib/contact";

type Errors = Partial<Record<"name" | "email" | "company", string>>;

const input =
  "mt-2 block min-h-12 w-full rounded-md border border-control bg-background px-3 text-base text-ink aria-[invalid=true]:border-error";

type Status = "idle" | "sending" | "sent" | Exclude<ContactResult, { ok: true }>["error"];

const SITE_KEY = import.meta.env["VITE_RECAPTCHA_SITE_KEY"] as string | undefined;

declare global {
  interface Window {
    grecaptcha?: { ready: (cb: () => void) => void; execute: (key: string, o: { action: string }) => Promise<string> };
  }
}

function recaptchaToken(): Promise<string> {
  const g = window.grecaptcha;
  if (!SITE_KEY || !g) return Promise.resolve("");
  return new Promise((resolve, reject) => g.ready(() => g.execute(SITE_KEY, { action: RECAPTCHA_ACTION }).then(resolve, reject)));
}

const STATUS_COPY: Partial<Record<Status, string>> = {
  sent: "Thank you — your message has been sent. A member of our team will be in touch.",
  captcha: "We could not confirm this submission came from a person. Please try again.",
  unavailable: "Your message could not be sent right now. Please try again later.",
};

/** Sends via the `sendContact` server function, protected by reCAPTCHA v3 and a honeypot field. */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const summary = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SITE_KEY || document.getElementById("recaptcha-v3")) return;
    const s = document.createElement("script");
    s.id = "recaptcha-v3";
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const next: Errors = {};
    if (!String(fd.get("name") ?? "").trim()) next.name = "Enter your name.";
    const email = String(fd.get("email") ?? "").trim();
    if (!email) next.email = "Enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address, like name@company.com.";
    if (!String(fd.get("company") ?? "").trim()) next.company = "Enter your company.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("idle");
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const field = (k: string) => String(fd.get(k) ?? "");
      const res = await sendContact({
        data: {
          name: field("name"),
          email,
          company: field("company"),
          orgType: field("orgType"),
          message: field("message"),
          website: field("website"),
          token: await recaptchaToken(),
        },
      });
      if (res.ok) form.reset();
      setStatus(res.ok ? "sent" : res.error);
    } catch {
      setStatus("unavailable");
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 text-sm text-error">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="rounded-md border border-error p-4 text-sm">
          <p className="font-semibold text-error">Please check the following:</p>
          <ul className="mt-2 list-disc pl-5">
            {Object.entries(errors).map(([k, v]) => (
              <li key={k}>
                <a href={`#${k}`} className="text-link">{v}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="name" className="font-medium text-navy">Name <span className="text-muted-foreground font-normal">(required)</span></label>
        <input id="name" name="name" autoComplete="name" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className="font-medium text-navy">Work email <span className="text-muted-foreground font-normal">(required)</span></label>
        <input id="email" name="email" type="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="company" className="font-medium text-navy">Company <span className="text-muted-foreground font-normal">(required)</span></label>
        <input id="company" name="company" autoComplete="organization" className={input} aria-invalid={!!errors.company} aria-describedby={errors.company ? "company-err" : undefined} />
        {err("company")}
      </div>
      <div>
        <label htmlFor="orgType" className="font-medium text-navy">Organisation type <span className="text-muted-foreground font-normal">(optional)</span></label>
        <select id="orgType" name="orgType" className={input} defaultValue="">
          <option value="">Select…</option>
          <option>Retailer</option>
          <option>Marketplace</option>
          <option>Delivery app</option>
          <option>Brand</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="font-medium text-navy">What would you like to explore? <span className="text-muted-foreground font-normal">(optional)</span></label>
        <textarea id="message" name="message" rows={5} className={`${input} py-3`} />
      </div>

      {/* Honeypot: hidden from people and assistive tech, filled only by bots. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className={btn.primary} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p className="text-xs text-muted-foreground">
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="https://policies.google.com/privacy" className="text-link" target="_blank" rel="noreferrer">Privacy Policy</a> and{" "}
        <a href="https://policies.google.com/terms" className="text-link" target="_blank" rel="noreferrer">Terms of Service</a> apply.
      </p>

      <div aria-live="polite">
        {STATUS_COPY[status] && (
          <p className={`rounded-md border bg-surface p-4 text-sm text-ink ${status === "sent" ? "border-border" : "border-error"}`}>
            {STATUS_COPY[status]}
          </p>
        )}
      </div>
    </form>
  );
}
