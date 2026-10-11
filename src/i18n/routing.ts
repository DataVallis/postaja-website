import { defineRouting } from "next-intl/routing";

/** Slovenian is the default and lives at "/", English at "/en". */
export const routing = defineRouting({
  locales: ["sl", "en"],
  defaultLocale: "sl",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
