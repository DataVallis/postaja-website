import { getTranslations } from "next-intl/server";
import { caseStudy } from "@/site";
import { featureIcons } from "./icons";

type Card = { tag: string; title: string; body: string };
type Item = { title: string; body: string };

export async function Strip() {
  const t = await getTranslations("strip");
  const items = t.raw("items") as string[];
  return (
    <section aria-label={t("label")} className="bg-signal px-6 py-[18px] text-ink">
      <ul className="wrap m-0 flex list-none flex-wrap justify-between gap-x-7 gap-y-2.5 p-0 text-[15px] font-bold">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export async function Problem() {
  const t = await getTranslations("problem");
  const cards = t.raw("cards") as Card[];
  return (
    <section className="px-6 pb-24 pt-24 md:pt-28">
      <div className="wrap flex flex-col gap-12">
        <div className="flex flex-wrap items-end gap-x-16 gap-y-6">
          <h2 className="display m-0 flex-[1_1_520px] text-[clamp(34px,4.4vw,56px)]">
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className="m-0 flex-[1_1_380px] text-[19px] leading-relaxed text-muted">{t("lead")}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {cards.map((c) => (
            <article key={c.tag} className="flex flex-col gap-3 rounded-[18px] border border-line bg-white p-7">
              <div className="kicker text-signal-text">{c.tag}</div>
              <h3 className="m-0 text-[22px] font-bold tracking-[-0.02em]">{c.title}</h3>
              <p className="m-0 leading-relaxed text-muted">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function How() {
  const t = await getTranslations("how");
  const steps = t.raw("steps") as Item[];
  return (
    <section id="kako" className="border-y border-line bg-white px-6 py-24 md:py-[104px]">
      <div className="wrap flex flex-col gap-14">
        <div className="flex max-w-[720px] flex-col gap-3.5">
          <div className="kicker text-signal-text">{t("kicker")}</div>
          <h2 className="display m-0 text-[clamp(34px,4.4vw,52px)]">{t("title")}</h2>
          <p className="m-0 text-[19px] leading-relaxed text-muted">{t("lead")}</p>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[27px] hidden h-1 opacity-20 md:block"
            style={{ background: "repeating-linear-gradient(90deg, #12172B 0 14px, transparent 14px 24px)" }}
          />
          <ol className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 p-0">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3.5">
                <div
                  className={`flex h-[58px] w-[58px] items-center justify-center rounded-full border-[5px] border-white text-[22px] font-extrabold ${i === 2 ? "bg-signal text-ink" : "bg-ink text-paper"}`}
                >
                  {i + 1}
                </div>
                <h3 className="m-0 text-[21px] font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="m-0 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export async function Quality() {
  const t = await getTranslations("quality");
  const genericTags = t.raw("genericTags") as string[];
  const postajaTags = t.raw("postajaTags") as string[];
  return (
    <section className="px-6 py-24 md:py-[104px]">
      <div className="wrap flex flex-col gap-12">
        <div className="flex max-w-[760px] flex-col gap-3.5">
          <div className="kicker text-signal-text">{t("kicker")}</div>
          <h2 className="display m-0 text-[clamp(34px,4.4vw,52px)]">{t("title")}</h2>
          <p className="m-0 text-[19px] leading-relaxed text-muted">{t("lead")}</p>
        </div>
        <div className="flex flex-wrap items-stretch gap-6">
          <figure className="m-0 flex min-w-0 flex-[1_1_400px] flex-col gap-[18px] rounded-[18px] bg-sand p-7">
            <figcaption className="flex flex-wrap justify-between gap-3">
              <span className="text-[15px] font-bold">{t("genericLabel")}</span>
              <span className="font-mono text-[13px] text-faint">{t("context")}</span>
            </figcaption>
            <p className="m-0 text-lg leading-relaxed text-[#5A5E70]">{t("genericText")}</p>
            <ul className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0">
              {genericTags.map((tag) => (
                <li key={tag} className="rounded-full bg-paper px-2.5 py-1.5 text-[13px] font-semibold text-[#8A2B0A]">
                  {tag}
                </li>
              ))}
            </ul>
          </figure>
          <figure className="m-0 flex min-w-0 flex-[1_1_400px] flex-col gap-[18px] rounded-[18px] bg-ink p-7 text-paper">
            <figcaption className="flex flex-wrap justify-between gap-3">
              <span className="text-[15px] font-bold">
                postaja<span className="text-signal">.</span>
              </span>
              <span className="font-mono text-[13px] text-haze">{t("context")}</span>
            </figcaption>
            <p className="m-0 text-lg leading-relaxed">{t("postajaText")}</p>
            <ul className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0">
              {postajaTags.map((tag, i) => (
                <li
                  key={tag}
                  className={`rounded-full bg-ink-raise px-2.5 py-1.5 text-[13px] font-semibold ${i === postajaTags.length - 1 ? "text-[#8EE0BC]" : "text-signal-pale"}`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </figure>
        </div>
        <p className="m-0 text-sm text-faint">{t("note")}</p>
      </div>
    </section>
  );
}

export async function Features() {
  const t = await getTranslations("features");
  const items = t.raw("items") as Item[];
  return (
    <section id="funkcije" className="bg-ink px-6 py-24 text-paper md:py-28">
      <div className="wrap flex flex-col gap-14">
        <div className="flex flex-wrap items-end gap-x-16 gap-y-6">
          <div className="flex flex-[1_1_520px] flex-col gap-3.5">
            <div className="kicker text-signal-soft">{t("kicker")}</div>
            <h2 className="display m-0 text-[clamp(34px,4.4vw,52px)]">{t("title")}</h2>
          </div>
          <p className="m-0 flex-[1_1_360px] text-lg leading-relaxed text-mist">{t("lead")}</p>
        </div>
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-[20px] border border-ink-line bg-ink-line">
          {items.map((item, i) => (
            <article key={item.title} className="flex flex-col gap-3 bg-ink p-[30px]">
              <span className="text-signal">{featureIcons[i]}</span>
              <h3 className="m-0 text-xl font-bold tracking-[-0.015em]">{item.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-[#B8BCCB]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type Format = { client: string; headline: string; extra: string; label: string };

/** Each mock tile carries its own made-up client's look, to show that no two clients share a template. */
const formatTiles = [
  { box: "aspect-[4/5] bg-[#3B2A1E] text-[#F6E7D3]", clientCls: "", flex: "flex-[0_1_190px]", headlineCls: "text-xl", layout: "justify-between" },
  { box: "aspect-[9/16] bg-[#0E3B2E] text-[#D9F5E6]", clientCls: "", flex: "flex-[0_1_150px]", headlineCls: "text-[17px]", layout: "justify-end gap-1.5" },
  { box: "aspect-square bg-[#E9E4F7] text-[#2B2160]", clientCls: "", flex: "flex-[0_1_190px]", headlineCls: "text-lg", layout: "justify-between" },
  {
    box: "aspect-[4/5] border border-line-strong bg-white text-ink shadow-[6px_6px_0_#E2DACB,12px_12px_0_#EDE6D9]",
    clientCls: "text-[#7A4B22]",
    flex: "flex-[0_1_190px]",
    headlineCls: "text-lg",
    layout: "justify-between",
  },
  { box: "aspect-[1.91/1] bg-[#1B2A4A] text-white", clientCls: "text-[#9FB8E8]", flex: "flex-[1_1_280px]", headlineCls: "text-xl", layout: "justify-between" },
];

export async function Formats() {
  const t = await getTranslations("formats");
  const items = t.raw("items") as Format[];
  return (
    <section className="px-6 pb-24 pt-24 md:pt-[104px]">
      <div className="wrap flex flex-col gap-11">
        <div className="flex flex-wrap items-end gap-x-16 gap-y-5">
          <h2 className="display m-0 flex-[1_1_520px] text-[clamp(32px,4vw,48px)]">{t("title")}</h2>
          <p className="m-0 flex-[1_1_340px] text-[17px] leading-relaxed text-muted">{t("lead")}</p>
        </div>
        <div className="flex flex-wrap items-end gap-5">
          {items.map((f, i) => {
            const tile = formatTiles[i];
            return (
              <figure key={f.label} className={`m-0 flex min-w-[140px] flex-col gap-2.5 ${tile.flex}`}>
                <div className={`box-border flex flex-col rounded-xl p-4 ${tile.box} ${tile.layout}`} aria-hidden="true">
                  <span className={`text-[11px] font-bold tracking-[0.08em] ${tile.clientCls}`}>{f.client}</span>
                  <span className={`font-extrabold leading-[1.08] ${tile.headlineCls}`}>{f.headline}</span>
                  {f.extra &&
                    (i === 4 ? (
                      <span className="self-start rounded-md bg-white px-2 py-1 text-[11px] font-bold text-[#1B2A4A]">{f.extra}</span>
                    ) : (
                      <span className="text-[11px] opacity-80">{f.extra}</span>
                    ))}
                </div>
                <figcaption className="font-mono text-xs text-muted">{f.label}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export async function Proof() {
  const t = await getTranslations("proof");
  const stats = (Object.entries(caseStudy.stats) as [keyof typeof caseStudy.stats, string | null][]).filter(
    ([, v]) => v !== null,
  );
  return (
    <section className="px-6 pb-24 md:pb-[104px]">
      <div className="wrap flex flex-col gap-10 rounded-3xl border border-line bg-white p-[clamp(28px,4vw,56px)]">
        <div className="flex flex-wrap gap-x-14 gap-y-10">
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-[18px]">
            <div className="kicker text-signal-text">{t("kicker")}</div>
            <h2 className="display m-0 text-[clamp(30px,3.6vw,44px)] leading-[1.08]">{t("title")}</h2>
            <p className="m-0 text-[17px] leading-relaxed text-muted">{t("lead")}</p>
          </div>
          {/* Real profiles: visitors check the posts themselves. */}
          <ul className="m-0 grid min-w-0 flex-[1_1_460px] list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] content-center gap-3 p-0">
            {caseStudy.brands.map((b) => (
              <li key={b.name}>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-1 rounded-2xl border border-line bg-paper-raise p-4 text-ink no-underline transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <span className="kicker text-[11px] text-signal-text group-hover:text-signal-soft">{b.channel}</span>
                  <span className="text-[17px] font-bold">{b.name}</span>
                  <span className="mt-1 flex items-center justify-between gap-2 text-sm text-muted group-hover:text-mist">
                    <span className="truncate">{b.handle}</span>
                    <span className="whitespace-nowrap font-semibold">
                      {t("see")} <span aria-hidden="true">↗</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {stats.length > 0 && (
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            {stats.map(([key, value]) => (
              <div key={key} className="flex flex-col-reverse gap-1.5 rounded-2xl bg-ink p-[22px] text-paper">
                <dt className="text-sm text-mist">{t(`stats.${key}`)}</dt>
                <dd className="m-0 text-[40px] font-extrabold tracking-[-0.03em] text-signal-soft">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
