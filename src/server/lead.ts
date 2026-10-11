import nodemailer from "nodemailer";
import { z } from "zod";

/** A sample / pilot request from the landing page form. */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "name").max(120, "name"),
  email: z.email("email").max(200, "email"),
  website: z
    .string()
    .trim()
    .max(300, "website")
    .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`))
    .pipe(z.url({ protocol: /^https?$/, hostname: z.regexes.domain, error: "website" })),
  message: z.string().trim().max(2000).optional().default(""),
  locale: z.enum(["sl", "en"]).default("sl"),
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadField = "name" | "email" | "website";

export function parseLead(input: Record<string, unknown>):
  | { ok: true; lead: Lead }
  | { ok: false; fields: LeadField[] } {
  const r = leadSchema.safeParse(input);
  if (r.success) return { ok: true, lead: r.data };
  const fields = new Set<LeadField>();
  for (const issue of r.error.issues) {
    const f = issue.path[0];
    if (f === "name" || f === "email" || f === "website") fields.add(f);
  }
  return { ok: false, fields: [...fields] };
}

/** Plain-text body of the notification the owner receives. */
export function leadText(lead: Lead, ip: string | null): string {
  return [
    "Nova prošnja za vzorec s spletne strani Postaje",
    "",
    `Ime:      ${lead.name}`,
    `E-pošta:  ${lead.email}`,
    `Stran:    ${lead.website}`,
    `Jezik:    ${lead.locale}`,
    `Sporočilo: ${lead.message || "—"}`,
    "",
    "Naslednji korak: /admin/demos → Ustvari demo s to spletno stranjo.",
    ip ? `IP: ${ip}` : "",
  ].join("\n");
}

/**
 * SMTP settings, same variable names as the Postaja app (src/server/email/mailer.ts there).
 * LEAD_TO is where requests go. Missing settings are an error, never a silent skip.
 */
export function mailerFromEnv(env: Record<string, string | undefined> = process.env) {
  const missing = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "EMAIL_FROM", "LEAD_TO"].filter((k) => !env[k]);
  if (missing.length) throw new Error(`Lead mailer not configured, missing: ${missing.join(", ")}`);
  const port = Number(env.SMTP_PORT);
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
  });
  return {
    async send(lead: Lead, ip: string | null) {
      await transport.sendMail({
        from: env.EMAIL_FROM,
        to: env.LEAD_TO,
        replyTo: lead.email,
        subject: `Postaja vzorec: ${new URL(lead.website).hostname} (${lead.name})`,
        text: leadText(lead, ip),
      });
    },
  };
}

/** Five requests per IP per hour is plenty for a human; one container, so memory is enough. */
const hits = new Map<string, number[]>();
export function allowRequest(key: string, now = Date.now(), limit = 5, windowMs = 3_600_000): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
