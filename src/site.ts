/**
 * Everything on the site that is a business fact lives here, so a change (domain, price, a filled-in number) is one
 * edit. Copy lives in messages/<locale>.json.
 */

/** Public site address. Until the domain is bought this is the planned one; set SITE_URL in production. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://postaja.eu";

/** The Postaja app (portal). Login and signup links point here. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://postaja.inzenirji.si";

export const company = {
  name: "David Tacer s.p.",
  street: "Robindvor 39",
  city: "2370 Dravograd",
  country: "Slovenija",
  vatId: "SI36130800",
  registrationNo: "6560024000",
  /** TODO(owner): create this mailbox once the domain is bought. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@postaja.eu",
};

export type PlanId = "solo" | "studio" | "agency" | "partner";

export type Plan = {
  id: PlanId;
  /** Monthly price in EUR, VAT excluded. Partner is "from". */
  monthly: number;
  brands: number | null;
  members: number | null;
  credits: number | null;
  featured?: boolean;
  /** Where the plan's button leads. */
  cta: "trial" | "pilot" | "call";
};

/** Business plan §4 (confirmed 2026-10-08). Yearly = 10 × monthly. */
export const plans: Plan[] = [
  { id: "solo", monthly: 39, brands: 2, members: 1, credits: 400, cta: "trial" },
  { id: "studio", monthly: 99, brands: 6, members: 3, credits: 1500, cta: "pilot" },
  { id: "agency", monthly: 249, brands: 20, members: 10, credits: 5000, featured: true, cta: "pilot" },
  { id: "partner", monthly: 590, brands: null, members: null, credits: null, cta: "call" },
];

export const YEARLY_MONTHS = 10;

export const creditCosts = [
  { key: "text", credits: 1 },
  { key: "image", credits: 2 },
  { key: "animation", credits: 1 },
  { key: "personaImage", credits: 5 },
  { key: "video5", credits: 25 },
  { key: "video10", credits: 40 },
] as const;

export const pilot = { price: 99, days: 30, brands: 3 };

/**
 * Founding customers (first 20). Set `left` to show the counter on the pilot section; null hides it.
 * TODO(owner): fill in once the first pilots sign.
 */
export const founding = { total: 20, left: null as number | null };

/**
 * Case study "4 brands, 1 person". Each stat shows only when its value is filled in — no invented numbers.
 * TODO(owner): take these from the Postaja dashboard (costs, published posts).
 */
export const caseStudy = {
  brands: [
    { name: "davidtacer.com", channel: "LinkedIn" },
    { name: "inzenirji.si", channel: "Instagram" },
    { name: "aibuilders.si", channel: "Instagram" },
    { name: "cherr.io", channel: "X" },
  ],
  stats: {
    minutesPerDay: null as string | null,
    noEditPercent: null as string | null,
    postsPerMonth: null as string | null,
    costPerPost: null as string | null,
  },
};
