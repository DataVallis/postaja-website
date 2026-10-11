import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Mark } from "@/components/Logo";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center text-paper">
      <Mark size={72} />
      <h1 className="display m-0 text-[clamp(36px,5vw,56px)]">{t("title")}</h1>
      <p className="m-0 max-w-md text-lg text-mist">{t("body")}</p>
      <Link href="/" className="rounded-xl bg-signal px-6 py-4 font-bold text-ink no-underline">
        {t("cta")}
      </Link>
    </main>
  );
}
