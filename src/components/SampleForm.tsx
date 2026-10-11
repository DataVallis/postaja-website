"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { requestSample, type SampleState } from "@/app/actions";
import { Link } from "@/i18n/navigation";

const input =
  "rounded-[10px] border border-[#3A4266] bg-ink-deep px-3.5 py-[13px] text-base text-paper placeholder:text-[#7A7F92] aria-[invalid=true]:border-signal";

export function SampleForm({ contactEmail }: { contactEmail: string }) {
  const t = useTranslations("sample");
  const locale = useLocale();
  const [state, action, pending] = useActionState<SampleState, FormData>(requestSample, { status: "idle" });
  const bad = (f: "name" | "email" | "website") => state.status === "invalid" && state.fields.includes(f);
  const v = state.status === "invalid" || state.status === "failed" ? state.values : undefined;

  if (state.status === "ok") {
    return (
      <div role="status" className="flex min-w-0 flex-[1_1_380px] flex-col gap-3 rounded-[20px] bg-ink p-7 text-paper">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.5l2.5 2.5 5-5.5" />
        </svg>
        <p className="m-0 text-lg font-semibold leading-relaxed">{t("success", { email: state.email })}</p>
      </div>
    );
  }

  return (
    <form key={JSON.stringify(v ?? {})} action={action} aria-label={t("formLabel")} className="flex min-w-0 flex-[1_1_380px] flex-col gap-3.5 rounded-[20px] bg-ink p-[26px] text-paper" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="f-company">Company website</label>
        <input id="f-company" name="company_site" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-name" className="text-sm font-semibold">{t("name")}</label>
        <input id="f-name" name="name" defaultValue={v?.name} type="text" required autoComplete="name" placeholder={t("namePh")} aria-invalid={bad("name")} aria-describedby={bad("name") ? "e-name" : undefined} className={input} />
        {bad("name") && <p id="e-name" className="m-0 text-sm text-signal-pale">{t("errors.name")}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-mail" className="text-sm font-semibold">{t("email")}</label>
        <input id="f-mail" name="email" defaultValue={v?.email} type="email" required autoComplete="email" placeholder={t("emailPh")} aria-invalid={bad("email")} aria-describedby={bad("email") ? "e-mail" : undefined} className={input} />
        {bad("email") && <p id="e-mail" className="m-0 text-sm text-signal-pale">{t("errors.email")}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-url" className="text-sm font-semibold">{t("website")}</label>
        <input id="f-url" name="website" defaultValue={v?.website} type="text" inputMode="url" required autoComplete="url" placeholder={t("websitePh")} aria-invalid={bad("website")} aria-describedby={bad("website") ? "e-url" : undefined} className={input} />
        {bad("website") && <p id="e-url" className="m-0 text-sm text-signal-pale">{t("errors.website")}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-msg" className="text-sm font-semibold">{t("message")}</label>
        <input id="f-msg" name="message" defaultValue={v?.message} type="text" placeholder={t("messagePh")} className={input} />
      </div>

      <button type="submit" disabled={pending} className="cursor-pointer rounded-[11px] bg-signal p-[15px] text-[17px] font-bold text-ink hover:bg-signal-soft disabled:cursor-wait disabled:opacity-70">
        {pending ? t("sending") : t("submit")}
      </button>
      {state.status === "failed" && (
        <p role="alert" className="m-0 text-sm text-signal-pale">
          {t("errors.failed", { email: contactEmail })}
        </p>
      )}
      <p className="m-0 text-xs text-haze">
        {t.rich("privacy", {
          link: (chunks) => (
            <Link href="/zasebnost" className="text-haze underline hover:text-paper">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </form>
  );
}
