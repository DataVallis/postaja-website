"use server";

import { headers } from "next/headers";
import { allowRequest, mailerFromEnv, parseLead, type LeadField } from "@/server/lead";

export type SampleState =
  | { status: "idle" }
  | { status: "ok"; email: string }
  | { status: "invalid"; fields: LeadField[]; values: Values }
  | { status: "failed"; values: Values };

/** What the person typed, so the form can show it again after an error (React resets forms after an action). */
export type Values = { name: string; email: string; website: string; message: string };

export async function requestSample(_prev: SampleState, form: FormData): Promise<SampleState> {
  const values: Values = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    website: String(form.get("website") ?? ""),
    message: String(form.get("message") ?? ""),
  };
  // Honeypot: people never see this field, bots fill it. Pretend success.
  if (String(form.get("company_site") ?? "")) return { status: "ok", email: String(form.get("email") ?? "") };

  const parsed = parseLead({ ...values, locale: form.get("locale") ?? "sl" });
  if (!parsed.ok) return { status: "invalid", fields: parsed.fields, values };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip");
  if (!allowRequest(ip ?? "unknown")) return { status: "failed", values };

  try {
    await mailerFromEnv().send(parsed.lead, ip);
    return { status: "ok", email: parsed.lead.email };
  } catch (e) {
    console.error("[lead] sending failed", e);
    return { status: "failed", values };
  }
}
