import { describe, expect, it } from "vitest";
import en from "../messages/en.json";
import sl from "../messages/sl.json";
import { formatEur } from "./lib/format";

function shape(v: unknown, prefix = ""): string[] {
  if (Array.isArray(v)) return [`${prefix}[${v.length}]`, ...v.flatMap((x, i) => shape(x, `${prefix}[${i}].`))];
  if (v && typeof v === "object") return Object.entries(v).flatMap(([k, x]) => shape(x, `${prefix}${k}.`));
  return [prefix];
}

describe("messages", () => {
  it("sl and en have exactly the same keys and list lengths", () => {
    expect(shape(en).sort()).toEqual(shape(sl).sort());
  });
});

describe("formatEur", () => {
  it("formats Slovenian and English prices", () => {
    expect(formatEur("sl", 39).replace(/\s/g, " ")).toBe("39 €");
    expect(formatEur("sl", 32.5).replace(/\s/g, " ")).toBe("32,50 €");
    expect(formatEur("en", 207.5)).toBe("€207.50");
    expect(formatEur("sl", 2490).replace(/\s/g, " ")).toBe("2.490 €");
  });
});
