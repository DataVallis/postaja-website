import { getTranslations } from "next-intl/server";

export async function Faq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  return (
    <section id="faq" className="px-6 pb-24 pt-24 md:pt-28">
      <div className="wrap flex flex-wrap gap-x-[72px] gap-y-10">
        <div className="flex flex-[1_1_320px] flex-col gap-3.5">
          <div className="kicker text-signal-text">{t("kicker")}</div>
          <h2 className="display m-0 text-[clamp(32px,4vw,48px)]">{t("title")}</h2>
        </div>
        <div className="flex min-w-0 flex-[999_1_560px] flex-col border-t border-line-strong">
          {items.map((item, i) => (
            <details key={item.q} open={i === 0} className="border-b border-line-strong">
              <summary className="flex items-center justify-between gap-4 py-[22px] text-[19px] font-bold">
                {item.q}
                <span className="faq-plus text-[26px] font-normal transition-transform" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="m-0 mb-[22px] max-w-[680px] leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
