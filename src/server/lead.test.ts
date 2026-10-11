import { describe, expect, it } from "vitest";
import { allowRequest, leadText, mailerFromEnv, parseLead } from "./lead";

describe("parseLead", () => {
  const good = { name: "Maja", email: "maja@studio.si", website: "pekarna.si", message: "", locale: "sl" };

  it("accepts a valid request and adds https:// to a bare domain", () => {
    const r = parseLead(good);
    expect(r).toEqual({ ok: true, lead: { ...good, website: "https://pekarna.si" } });
  });

  it("keeps an explicit http(s) url", () => {
    const r = parseLead({ ...good, website: "http://www.pekarna.si/o-nas" });
    expect(r.ok && r.lead.website).toBe("http://www.pekarna.si/o-nas");
  });

  it("names every invalid field", () => {
    const r = parseLead({ name: "M", email: "nope", website: "not a site", locale: "sl" });
    expect(r).toEqual({ ok: false, fields: ["name", "email", "website"] });
  });

  it("rejects non-web protocols", () => {
    const r = parseLead({ ...good, website: "javascript:alert(1)" });
    expect(r.ok).toBe(false);
  });
});

describe("leadText", () => {
  it("contains the contact data and the next step", () => {
    const r = parseLead({ name: "Maja", email: "maja@studio.si", website: "https://pekarna.si" });
    if (!r.ok) throw new Error("invalid");
    const text = leadText(r.lead, "1.2.3.4");
    expect(text).toContain("maja@studio.si");
    expect(text).toContain("https://pekarna.si");
    expect(text).toContain("/admin/demos");
  });
});

describe("mailerFromEnv", () => {
  it("throws naming every missing variable (never silently skips)", () => {
    expect(() => mailerFromEnv({ SMTP_HOST: "h" })).toThrow("missing: SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM, LEAD_TO");
  });
});

describe("allowRequest", () => {
  it("allows five requests per hour per key, then refuses until the window passes", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 5; i++) expect(allowRequest(key, 1000 + i)).toBe(true);
    expect(allowRequest(key, 2000)).toBe(false);
    expect(allowRequest(key, 1000 + 3_600_001)).toBe(true);
  });
});
