const ROWS = [
  { cat: "Personal care", orders: "12,400", sales: "€248,000" },
  { cat: "Household", orders: "8,100", sales: "€186,000" },
  { cat: "Pet care", orders: "6,200", sales: "€155,000" },
];

const OFFER = [
  { k: "Offer", v: "Category intelligence subscription" },
  { k: "Buyer", v: "Supplier brand teams" },
  { k: "Scope", v: "Aggregated category trends and agreed brand-level reporting" },
  { k: "Delivery and owner", v: "Monthly insight review · your commercial team" },
];

function Connector() {
  return (
    <svg aria-hidden width="12" height="24" viewBox="0 0 12 24" className="my-1 ml-[9px] block text-navy">
      <path d="M6 0v19" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 15 6 20.5 10.5 15" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Stage({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[30px_1fr] gap-x-3">
      <span className="data-label pt-0.5 font-medium text-navy">{n}</span>
      <div className="min-w-0">
        <h3 className="text-[1.0625rem] font-semibold tracking-normal text-navy">{title}</h3>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

/** Hero information graphic: retail signals → commercial offer → illustrative revenue. */
export function RetailValueFigure() {
  return (
    <figure className="w-full rounded-lg border-t-2 border-navy bg-surface p-5 sm:p-8 lg:max-w-[580px]" aria-labelledby="rvf-cap">
      <figcaption id="rvf-cap" className="data-label mb-6 flex items-center gap-2 font-medium uppercase tracking-[0.04em] text-ink">
        <span aria-hidden className="inline-block size-2 rounded-full border border-navy bg-cyan" />
        Illustrative data — not client results
      </figcaption>

      <Stage n="01" title="Retail signals">
        <p className="text-sm font-medium text-ink">Monthly category sales · example</p>
        <p className="data-label text-muted-foreground">September · illustrative month</p>
        {/* Table ≥480px */}
        <table className="mt-3 hidden w-full border-collapse text-sm min-[480px]:table">
          <caption className="sr-only">Illustrative monthly category sales, September</caption>
          <thead>
            <tr className="border-b border-navy/40 text-left text-muted-foreground">
              <th scope="col" className="py-2 font-medium">Category</th>
              <th scope="col" className="py-2 text-right font-medium">Orders</th>
              <th scope="col" className="py-2 text-right font-medium">Sales</th>
            </tr>
          </thead>
          <tbody className="data-label">
            {ROWS.map((r) => (
              <tr key={r.cat} className="border-b border-border">
                <th scope="row" className="py-2 text-left font-sans font-normal text-ink">{r.cat}</th>
                <td className="py-2 text-right">{r.orders}</td>
                <td className="py-2 text-right">{r.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* List <480px */}
        <dl className="mt-3 divide-y divide-border border-y border-border min-[480px]:hidden">
          {ROWS.map((r) => (
            <div key={r.cat} className="py-2">
              <dt className="text-sm font-medium text-ink">{r.cat}</dt>
              <dd className="data-label mt-1 grid grid-cols-2 gap-2">
                <span><span className="text-muted-foreground">Orders </span>{r.orders}</span>
                <span><span className="text-muted-foreground">Sales </span>{r.sales}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="data-label mt-2 text-muted-foreground">Example SKU: Everyday shampoo · 250ml</p>
      </Stage>

      <Connector />

      <Stage n="02" title="Commercial offer">
        <dl className="divide-y divide-border border-y border-border text-sm">
          {OFFER.map((o) => (
            <div key={o.k} className="grid gap-1 py-2 sm:grid-cols-[132px_1fr] sm:gap-3">
              <dt className="text-muted-foreground">{o.k}</dt>
              <dd className="text-ink">{o.v}</dd>
            </div>
          ))}
        </dl>
      </Stage>

      <Connector />

      <Stage n="03" title="Illustrative annual revenue">
        <p className="data-label flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-ink">
          <span>20 brands</span>
          <span aria-hidden>×</span>
          <span className="sr-only">times</span>
          <span>€12,000 / year</span>
          <span aria-hidden>=</span>
          <span className="sr-only">equals</span>
          <span className="rounded-sm bg-cyan px-2 py-0.5 font-medium text-ink">€240,000 / year</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Assumes 20 full-year subscriptions; before costs. Not a forecast.</p>
      </Stage>

      <div className="mt-6 border-t border-navy pt-4">
        <p className="text-sm font-semibold text-navy">Your offer · Your relationships · Your team</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          The revenue line is an independent commercial assumption, not derived from the category table. Scope, pricing, buyer demand and permitted data use need validation.
        </p>
      </div>
    </figure>
  );
}
