import { getLocale, getTranslations } from "next-intl/server";
import { formatEur, formatNumber } from "@/lib/format";
import { APP_URL, YEARLY_MONTHS, creditCosts, plans } from "@/site";
import { PricingCards, type PlanView } from "./PricingCards";

const ctaHref = { trial: `${APP_URL}/login`, pilot: "#pilot", call: "#vzorec" } as const;

export async function Pricing() {
  const t = await getTranslations("pricing");
  const locale = await getLocale();
  const addons = t.raw("addons") as { name: string; price: string }[];

  const views: PlanView[] = plans.map((p) => {
    const features = t.raw(`plans.${p.id}.features`) as string[];
    const counts =
      p.brands !== null && p.members !== null && p.credits !== null
        ? [
            `${t("brands", { count: p.brands })} · ${t("members", { count: p.members })}`,
            t("credits", { count: formatNumber(locale, p.credits) }),
          ]
        : [];
    const yearlyTotal = p.monthly * YEARLY_MONTHS;
    const isPartner = p.id === "partner";
    return {
      id: p.id,
      name: t(`plans.${p.id}.name`),
      desc: t(`plans.${p.id}.desc`),
      featured: !!p.featured,
      from: isPartner ? t("from") : null,
      monthly: { price: formatEur(locale, p.monthly), note: isPartner ? t("byAgreement") : t("billedMonthly") },
      yearly: isPartner
        ? { price: formatEur(locale, p.monthly), note: t("byAgreement") }
        : {
            price: formatEur(locale, yearlyTotal / 12),
            note: t(p.id === "solo" ? "billedYearly" : "billedYearlyBonus", { amount: formatEur(locale, yearlyTotal) }),
          },
      lines: [...counts, ...features],
      cta: { label: t(`cta.${p.cta}`), href: ctaHref[p.cta] },
    };
  });

  return (
    <section id="cene" className="border-t border-line bg-white px-6 py-24 md:pb-[104px] md:pt-28">
      <div className="wrap flex flex-col gap-11">
        <div className="flex max-w-[680px] flex-col gap-3.5">
          <div className="kicker text-signal-text">{t("kicker")}</div>
          <h2 className="display m-0 text-[clamp(34px,4.4vw,52px)]">{t("title")}</h2>
          <p className="m-0 text-lg leading-relaxed text-muted">{t("lead")}</p>
        </div>

        <PricingCards
          plans={views}
          labels={{ period: t("periodLabel"), monthly: t("monthly"), yearly: t("yearly"), perMonth: t("perMonth"), featured: t("featured") }}
        />

        <div className="flex flex-wrap gap-[18px]">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-3.5 rounded-[18px] bg-paper p-[26px]">
            <h3 className="m-0 text-lg font-bold">{t("creditsTitle")}</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px] border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th scope="col" className="border-b border-[#DDD4C4] py-2 text-left font-semibold text-muted">
                      {t("creditsAction")}
                    </th>
                    <th scope="col" className="border-b border-[#DDD4C4] py-2 text-right font-semibold text-muted">
                      {t("creditsCol")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {creditCosts.map((c, i) => (
                    <tr key={c.key}>
                      <td className={`py-2.5 ${i < creditCosts.length - 1 ? "border-b border-[#E6DECF]" : ""}`}>{t(`creditNames.${c.key}`)}</td>
                      <td className={`py-2.5 text-right font-mono ${i < creditCosts.length - 1 ? "border-b border-[#E6DECF]" : ""}`}>{c.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-3.5 rounded-[18px] bg-paper p-[26px]">
            <h3 className="m-0 text-lg font-bold">{t("addonsTitle")}</h3>
            <ul className="m-0 list-none p-0 text-[15px]">
              {addons.map((a, i) => (
                <li key={a.name} className={`flex flex-wrap justify-between gap-x-3 py-2.5 ${i < addons.length - 1 ? "border-b border-[#E6DECF]" : ""}`}>
                  <span>{a.name}</span>
                  <span className="font-semibold">{a.price}</span>
                </li>
              ))}
            </ul>
            <p className="m-0 text-[13px] text-faint">{t("addonsNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
