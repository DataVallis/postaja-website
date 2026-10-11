import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { APP_URL, company } from "@/site";
import { Wordmark } from "./Logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const locale = await getLocale();
  const home = locale === "sl" ? "/" : "/en";
  const link = "text-[#B8BCCB] no-underline hover:text-paper";

  return (
    <footer className="bg-ink px-6 pb-10 pt-14 text-[#B8BCCB]">
      <div className="wrap flex flex-col gap-10">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex max-w-[360px] flex-col gap-3">
            <Wordmark className="text-[26px] text-paper" />
            <p className="m-0 text-[15px] leading-relaxed">{t("tagline")}</p>
          </div>
          <nav aria-label={t("product")} className="flex flex-wrap gap-x-16 gap-y-8 text-[15px]">
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-paper">{t("product")}</span>
              <a href={`${home}#kako`} className={link}>{nav("how")}</a>
              <a href={`${home}#cene`} className={link}>{nav("pricing")}</a>
              <a href={`${home}#pilot`} className={link}>{nav("pilot")}</a>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-paper">{t("account")}</span>
              <a href={`${APP_URL}/login`} className={link}>{nav("login")}</a>
              <a href={`${home}#pilot`} className={link}>{nav("cta")}</a>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-paper">{t("legal")}</span>
              <Link href="/pogoji" className={link}>{t("terms")}</Link>
              <Link href="/zasebnost" className={link}>{t("privacy")}</Link>
            </div>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2.5 border-t border-ink-line pt-[22px] text-[13px] text-dim">
          <span>
            © {new Date().getFullYear()} {company.name}, {company.street}, {company.city} · {t("vat")} {company.vatId} · {t("regNo")} {company.registrationNo}
          </span>
          <a href={`mailto:${company.email}`} className="text-dim no-underline hover:text-paper">
            {company.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
