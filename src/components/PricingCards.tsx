"use client";

import { useState } from "react";

export type PlanView = {
  id: string;
  name: string;
  desc: string;
  featured: boolean;
  from: string | null;
  monthly: { price: string; note: string };
  yearly: { price: string; note: string };
  lines: string[];
  cta: { label: string; href: string };
};

type Labels = { period: string; monthly: string; yearly: string; perMonth: string; featured: string };

export function PricingCards({ plans, labels }: { plans: PlanView[]; labels: Labels }) {
  const [yearly, setYearly] = useState(false);

  const toggle = (on: boolean) =>
    `rounded-[9px] px-4 py-2.5 text-sm transition-colors ${on ? "bg-ink font-bold text-paper" : "font-semibold text-ink hover:bg-sand"}`;

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label={labels.period} className="inline-flex gap-1 self-start rounded-xl border border-line bg-paper p-1">
        <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)} className={toggle(!yearly)}>
          {labels.monthly}
        </button>
        <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)} className={toggle(yearly)}>
          {labels.yearly}
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] items-stretch gap-[18px]">
        {plans.map((p) => {
          const price = yearly ? p.yearly : p.monthly;
          const dark = p.featured;
          return (
            <article
              key={p.id}
              className={`relative flex flex-col gap-[18px] rounded-[20px] p-7 ${dark ? "border-2 border-ink bg-ink text-paper" : "border border-line bg-paper-raise"}`}
            >
              {dark && (
                <span className="absolute -top-3.5 left-6 rounded-lg bg-signal px-2.5 py-1.5 text-xs font-extrabold tracking-[0.06em] text-ink">
                  {labels.featured}
                </span>
              )}
              <div className="flex flex-col gap-1.5">
                <h3 className="m-0 text-[22px] font-bold">{p.name}</h3>
                <p className={`m-0 text-sm ${dark ? "text-mist" : "text-muted"}`}>{p.desc}</p>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-1.5">
                {p.from && <span className={`text-[15px] ${dark ? "text-mist" : "text-muted"}`}>{p.from}</span>}
                <span className="text-[40px] font-extrabold tracking-[-0.035em]">{price.price}</span>
                <span className={`whitespace-nowrap text-[15px] ${dark ? "text-mist" : "text-muted"}`}>{labels.perMonth}</span>
              </div>
              <div className={`min-h-[18px] text-[13px] ${dark ? "text-haze" : "text-faint"}`} aria-live="polite">
                {price.note}
              </div>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px]">
                {p.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <a
                href={p.cta.href}
                className={`mt-auto rounded-[11px] p-3.5 text-center text-[15px] font-bold no-underline ${dark ? "bg-signal text-ink hover:bg-signal-soft" : "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper"}`}
              >
                {p.cta.label}
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
