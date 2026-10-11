import { getLocale, getTranslations } from "next-intl/server";
import { formatEur } from "@/lib/format";
import { APP_URL, plans, type PlanId } from "@/site";

type Item = { plan: PlanId; who: string; title: string; body: string; cta: string };

/** Who Postaja is for: one card per segment, each tied to its plan and price from src/site.ts. */
export async function Audience() {
  const t = await getTranslations("audience");
  const tp = await getTranslations("pricing");
  const locale = await getLocale();
  const items = t.raw("items") as Item[];

  return (
    <section className="px-6 pb-24 md:pb-28">
      <div className="wrap flex flex-col gap-12">
        <div className="flex max-w-[760px] flex-col gap-3.5">
          <div className="kicker text-signal-text">{t("kicker")}</div>
          <h2 className="display m-0 text-[clamp(34px,4.4vw,52px)]">{t("title")}</h2>
          <p className="m-0 text-[19px] leading-relaxed text-muted">{t("lead")}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {items.map((item, i) => {
            const plan = plans.find((p) => p.id === item.plan);
            const first = i === 0;
            return (
              <article
                key={item.plan}
                className={`flex flex-col gap-4 rounded-[20px] p-7 ${first ? "bg-signal text-ink" : "border border-line bg-white"}`}
              >
                <div className={`kicker ${first ? "text-ink" : "text-signal-text"}`}>{item.who}</div>
                <h3 className="m-0 text-[24px] font-extrabold leading-tight tracking-[-0.02em]">{item.title}</h3>
                <p className={`m-0 leading-relaxed ${first ? "text-ink" : "text-muted"}`}>{item.body}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                  {plan && (
                    <span className="font-mono text-sm font-bold">
                      {tp(`plans.${plan.id}.name`)} · {t("perMonth", { price: formatEur(locale, plan.monthly) })}
                    </span>
                  )}
                  <a
                    href={item.plan === "solo" ? `${APP_URL}/login` : "#pilot"}
                    className={`rounded-[11px] px-4 py-3 text-[15px] font-bold no-underline ${first ? "bg-ink text-paper hover:bg-ink-raise" : "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper"}`}
                  >
                    {item.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
