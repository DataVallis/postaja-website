import { getLocale, getTranslations } from "next-intl/server";
import { formatEur } from "@/lib/format";
import { founding, pilot } from "@/site";
import { ShieldCheck } from "./icons";

export async function Pilot() {
  const t = await getTranslations("pilot");
  const locale = await getLocale();
  const price = formatEur(locale, pilot.price);
  const taken = founding.left === null ? 0 : founding.total - founding.left;

  return (
    <section id="pilot" className="bg-ink px-6 py-24 text-paper md:py-28">
      <div className="wrap flex flex-wrap items-stretch gap-12">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[22px]">
          <div className="kicker text-signal-soft">{t("kicker")}</div>
          <h2 className="m-0 text-[clamp(36px,4.8vw,60px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            {t("title", { days: pilot.days, brands: pilot.brands, price })}
          </h2>
          <p className="m-0 text-[19px] leading-relaxed text-mist">{t("lead", { price })}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#vzorec" className="rounded-xl bg-signal px-6 py-4 text-[17px] font-bold text-ink no-underline hover:bg-signal-soft">
              {t("cta")}
            </a>
            <a href="#vzorec" className="rounded-xl border-[1.5px] border-[#4A5378] px-[22px] py-[15px] text-[17px] font-semibold text-paper no-underline hover:border-paper">
              {t("ctaDemo")}
            </a>
          </div>
          <div className="mt-2 flex flex-col gap-2.5 border-t border-ink-line pt-[22px]">
            <div className="flex flex-wrap justify-between gap-3 text-[15px]">
              <span className="font-bold">{t("foundingTitle")}</span>
              {founding.left !== null && (
                <span className="font-mono text-signal-soft">{t("seats", { left: founding.left, total: founding.total })}</span>
              )}
            </div>
            {founding.left !== null && (
              <div
                className="h-2 overflow-hidden rounded-full bg-ink-raise"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={founding.total}
                aria-valuenow={taken}
                aria-label={t("foundingTitle")}
              >
                <div className="h-full bg-signal" style={{ width: `${(taken / founding.total) * 100}%` }} />
              </div>
            )}
            <p className="m-0 text-[15px] leading-relaxed text-[#B8BCCB]">{t("foundingBody")}</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_380px] flex-col justify-center gap-[18px] self-center rounded-[22px] bg-paper p-8 text-ink">
          <ShieldCheck />
          <h3 className="m-0 text-[26px] font-extrabold tracking-[-0.02em]">{t("guaranteeTitle")}</h3>
          <p className="m-0 text-[17px] leading-relaxed">{t.rich("guaranteeBody", { b: (chunks) => <strong>{chunks}</strong> })}</p>
          <p className="m-0 text-sm text-muted">{t("guaranteeNote")}</p>
        </div>
      </div>
    </section>
  );
}
