import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { APP_URL } from "@/site";
import { Mark, Wordmark } from "./Logo";

const anchors = [
  ["how", "#kako"],
  ["features", "#funkcije"],
  ["pricing", "#cene"],
  ["pilot", "#pilot"],
  ["faq", "#faq"],
] as const;

export async function Header() {
  const t = await getTranslations("nav");
  const locale = await getLocale();
  const other = locale === "sl" ? "en" : "sl";

  const links = anchors.map(([key, href]) => (
    <a key={key} href={`/${locale === "sl" ? "" : "en"}${href}`} className="py-2.5 text-[15px] font-medium text-mist no-underline hover:text-paper">
      {t(key)}
    </a>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/95 text-paper backdrop-blur">
      <nav aria-label={t("label")} className="wrap flex items-center gap-8 px-6 py-3.5">
        <Link href="/" aria-label={t("home")} className="flex items-center gap-2.5 text-paper no-underline">
          <Mark />
          <Wordmark className="text-2xl" />
        </Link>

        <div className="hidden flex-1 gap-6 lg:flex">{links}</div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            href="/"
            locale={other}
            aria-label={t("languageLabel")}
            className="hidden rounded-lg px-2 py-3 text-sm font-medium text-haze no-underline hover:text-paper sm:block"
          >
            {other.toUpperCase()}
          </Link>
          <a href={`${APP_URL}/login`} className="hidden px-2 py-3 text-[15px] font-semibold text-paper no-underline hover:text-signal-pale sm:block">
            {t("login")}
          </a>
          <a href="#pilot" className="rounded-[10px] bg-signal px-4 py-3 text-[15px] font-bold text-ink no-underline hover:bg-signal-soft">
            {t("cta")}
          </a>

          {/* Phone menu: native disclosure, no JS. */}
          <details className="relative lg:hidden">
            <summary aria-label="Menu" className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink-line">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <div className="absolute right-0 top-14 flex w-64 flex-col rounded-xl border border-ink-line bg-ink px-5 py-3 shadow-2xl">
              {links}
              <a href={`${APP_URL}/login`} className="border-t border-ink-line py-3 text-[15px] font-semibold text-paper no-underline">
                {t("login")}
              </a>
              <Link href="/" locale={other} className="py-2 text-sm text-haze no-underline">
                {t("language")}
              </Link>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
