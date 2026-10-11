import { getLocale, getTranslations } from "next-intl/server";
import { SITE_URL, company, plans } from "@/site";

/** schema.org SoftwareApplication + Organization, so search results can show the offer. */
export async function StructuredData() {
  const locale = await getLocale();
  const t = await getTranslations("meta");
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: company.name,
        url: SITE_URL,
        email: company.email,
        vatID: company.vatId,
        address: { "@type": "PostalAddress", streetAddress: company.street, addressLocality: "Dravograd", postalCode: "2370", addressCountry: "SI" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Postaja",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: locale,
        description: t("description"),
        url: locale === "sl" ? SITE_URL : `${SITE_URL}/en`,
        offers: plans
          .filter((p) => p.id !== "partner")
          .map((p) => ({ "@type": "Offer", name: p.id, price: p.monthly, priceCurrency: "EUR" })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
