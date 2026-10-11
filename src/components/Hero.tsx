import { getLocale, getTranslations } from "next-intl/server";
import { formatEur } from "@/lib/format";
import { pilot } from "@/site";

type Row = { time: string; client: string; what: string; status: "ready" | "review" | "published" };

const statusColor: Record<Row["status"], string> = {
  ready: "text-signal-soft",
  review: "text-review",
  published: "text-published",
};

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const rows = t.raw("board.rows") as Row[];
  const trust = t.raw("trust") as string[];

  return (
    <section id="top" className="bg-ink px-6 pb-24 pt-16 text-paper md:pt-20">
      <div className="wrap flex flex-wrap items-center gap-14">
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-7">
          <div className="kicker inline-flex items-center gap-2.5 self-start rounded-full border border-[#3A4266] px-3.5 py-2 text-signal-pale">
            <span className="h-2 w-2 rounded-full bg-signal" />
            {t("badge")}
          </div>
          <h1 className="m-0 text-[clamp(42px,6vw,76px)] font-extrabold leading-none tracking-[-0.035em]">
            {t("title")}
            <span className="text-signal">.</span>
          </h1>
          <p className="m-0 max-w-[560px] text-xl leading-relaxed text-mist">{t("lead")}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#pilot" className="rounded-xl bg-signal px-6 py-4 text-[17px] font-bold text-ink no-underline hover:bg-signal-soft">
              {t("ctaPilot", { price: formatEur(locale, pilot.price), days: pilot.days })}
            </a>
            <a href="#vzorec" className="rounded-xl border-[1.5px] border-[#4A5378] px-[22px] py-[15px] text-[17px] font-semibold text-paper no-underline hover:border-paper">
              {t("ctaSample")}
            </a>
          </div>
          <ul className="m-0 flex list-none flex-col gap-x-5 gap-y-1.5 p-0 text-sm text-haze sm:flex-row sm:flex-wrap">
            {trust.map((item, i) => (
              <li key={item} className="flex gap-5">
                {i > 0 && <span aria-hidden="true" className="hidden sm:inline">·</span>}
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* The departure board: today's posts leaving for the networks. */}
        <figure className="m-0 min-w-0 flex-[1_1_520px]">
          <div className="rounded-[18px] border border-ink-line bg-ink-deep p-5 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#222A47] px-1.5 pb-4 pt-1 font-mono text-[13px]">
              <span className="tracking-[0.12em] text-signal-soft">{t("board.title")}</span>
              <span className="text-dim">{t("board.date")}</span>
            </div>
            <ul className="m-0 list-none p-0 font-mono text-sm">
              {rows.map((row, i) => (
                <li
                  key={row.time}
                  className={`grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3 px-1.5 py-[13px] sm:grid-cols-[58px_minmax(0,1fr)_128px] ${i < rows.length - 1 ? "border-b border-ink-row" : ""}`}
                >
                  <span className="font-bold text-paper">{row.time}</span>
                  <span className="min-w-0 truncate">
                    <span className="text-paper">{row.client}</span> <span className="text-[#7E849C]">· {row.what}</span>
                  </span>
                  <span className={`justify-self-end text-xs font-bold tracking-[0.06em] ${statusColor[row.status]}`}>
                    <span aria-hidden="true">● </span>
                    <span className="hidden sm:inline">{t(`board.status.${row.status}`)}</span>
                    <span className="sr-only sm:hidden">{t(`board.status.${row.status}`)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-ink-card p-3.5">
              <span className="text-sm text-mist">{t("board.summary")}</span>
              <span className="rounded-[9px] bg-signal px-3.5 py-2.5 text-sm font-bold text-ink">{t("board.button")}</span>
            </div>
          </div>
          <figcaption className="mt-3 text-[13px] text-dim">{t("board.caption")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
