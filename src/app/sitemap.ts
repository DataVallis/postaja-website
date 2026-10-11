import type { MetadataRoute } from "next";
import { SITE_URL } from "@/site";

const paths = ["", "/pogoji", "/zasebnost"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${SITE_URL}${p || "/"}`,
    changeFrequency: p ? "yearly" : "weekly",
    priority: p ? 0.3 : 1,
    alternates: { languages: { sl: `${SITE_URL}${p || "/"}`, en: `${SITE_URL}/en${p}` } },
  }));
}
