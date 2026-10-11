import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Date of the last content change of the legal texts. */
const UPDATED = new Date("2026-10-11");

export async function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const t = await getTranslations("legal");
  const locale = await getLocale();
  const sections = t.raw(`${kind}.sections`) as { h: string; p: string }[];
  const vars: Record<string, string> = {
    company: company.name,
    street: company.street,
    city: company.city,
    regNo: company.registrationNo,
    vatId: company.vatId,
    email: company.email,
  };
  const fill = (s: string) => s.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);

  return (
    <>
      <Header />
      <main className="px-6 pb-24 pt-16">
        <article className="mx-auto flex max-w-[760px] flex-col gap-8">
          <Link href="/" className="text-sm font-semibold text-signal-text no-underline hover:underline">
            ← {t("back")}
          </Link>
          <header className="flex flex-col gap-3">
            <h1 className="display m-0 text-[clamp(36px,5vw,56px)]">{t(`${kind}.title`)}</h1>
            <p className="m-0 text-sm text-faint">
              {t("updated", { date: UPDATED.toLocaleDateString(locale === "sl" ? "sl-SI" : "en-GB", { dateStyle: "long" }) })}
            </p>
          </header>
          {sections.map((s) => (
            <section key={s.h} className="flex flex-col gap-2.5">
              <h2 className="m-0 text-xl font-bold tracking-[-0.015em]">{s.h}</h2>
              <p className="m-0 text-[17px] leading-relaxed text-muted">{fill(s.p)}</p>
            </section>
          ))}
          {kind === "privacy" && (
            <section className="flex flex-col gap-4">
              <div>
                {/* CookieYes reopens its preference centre on any element with this class. */}
                <button type="button" className="cky-banner-element cursor-pointer rounded-[11px] border-[1.5px] border-ink bg-transparent px-4 py-3 text-[15px] font-bold text-ink hover:bg-ink hover:text-paper">
                  {t("cookieSettings")}
                </button>
              </div>
              <h2 className="m-0 text-xl font-bold tracking-[-0.015em]">{t("cookieTable")}</h2>
              {/* CookieYes fills this element with the live cookie list from its last scan. */}
              <div className="cky-audit-table-element overflow-x-auto text-[15px]" />
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
