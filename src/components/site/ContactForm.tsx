import { useRef, useState, type FormEvent } from "react";
import { btn } from "./ui";

type Errors = Partial<Record<"name" | "email" | "company", string>>;

const input =
  "mt-2 block min-h-12 w-full rounded-md border border-control bg-background px-3 text-base text-ink aria-[invalid=true]:border-error";

/**
 * No submission service is connected yet, so the form validates input but never
 * pretends to send. Wire `submit` to a real endpoint before launch.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState(false);
  const summary = useRef<HTMLDivElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(fd.get("name") ?? "").trim()) next.name = "Enter your name.";
    const email = String(fd.get("email") ?? "").trim();
    if (!email) next.email = "Enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address, like name@company.com.";
    if (!String(fd.get("company") ?? "").trim()) next.company = "Enter your company.";
    setErrors(next);
    if (Object.keys(next).length) {
      setNotice(false);
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setNotice(true);
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 text-sm text-error">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-md border border-warning/50 bg-surface p-4 text-sm text-ink">
        <strong className="font-semibold">Preview:</strong> this form is not yet connected to a delivery service, so messages cannot be sent from this page.
      </div>

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
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="font-medium text-navy">What would you like to explore? <span className="text-muted-foreground font-normal">(optional)</span></label>
        <textarea id="message" name="message" rows={5} className={`${input} py-3`} />
      </div>

      <button type="submit" className={btn.primary}>Send message</button>

      <div aria-live="polite">
        {notice && (
          <p className="rounded-md border border-border bg-surface p-4 text-sm text-ink">
            Your details look complete, but nothing was sent — this preview has no delivery service connected yet.
          </p>
        )}
      </div>
    </form>
  );
}
