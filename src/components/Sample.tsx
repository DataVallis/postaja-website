import { getTranslations } from "next-intl/server";
import { company } from "@/site";
import { SampleForm } from "./SampleForm";

export async function Sample() {
  const t = await getTranslations("sample");
  return (
    <section id="vzorec" className="px-6 pb-24 md:pb-28">
      <div className="wrap flex flex-wrap items-center gap-x-14 gap-y-10 rounded-[28px] bg-signal p-[clamp(28px,5vw,64px)] text-ink">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-4">
          <h2 className="m-0 text-[clamp(34px,4.6vw,58px)] font-extrabold leading-[1.02] tracking-[-0.035em]">{t("title")}</h2>
          <p className="m-0 text-[19px] font-medium leading-relaxed">{t("lead")}</p>
        </div>
        <SampleForm contactEmail={company.email} />
      </div>
    </section>
  );
}
