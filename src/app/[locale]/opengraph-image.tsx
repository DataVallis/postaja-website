import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Postaja";

/** The link preview people see when the page is shared (LinkedIn, Slack, WhatsApp …). */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const rows = (t.raw("board.rows") as { time: string; client: string }[]).slice(0, 4);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#12172B", color: "#F4EFE6", padding: 72, gap: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="64" height="64" viewBox="0 0 32 32">
              <rect x="6" y="5" width="4.5" height="23" rx="2.25" fill="#F4EFE6" />
              <circle cx="16.5" cy="12" r="7.5" fill="#FF5A1F" />
              <circle cx="16.5" cy="12" r="3" fill="#12172B" />
              <circle cx="20" cy="25" r="2" fill="#F4EFE6" />
              <circle cx="25" cy="25" r="2" fill="#F4EFE6" opacity="0.55" />
              <circle cx="30" cy="25" r="2" fill="#F4EFE6" opacity="0.25" />
            </svg>
            <div style={{ display: "flex", fontSize: 52, fontWeight: 800, letterSpacing: -2 }}>
              postaja<span style={{ color: "#FF5A1F" }}>.</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2.5 }}>{t("title")}</div>
          <div style={{ display: "flex", fontSize: 26, color: "#FF8A5C" }}>{t("badge")}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: 330, background: "#0B0F1E", borderRadius: 24, padding: 28, gap: 18, alignSelf: "center" }}>
          <div style={{ display: "flex", fontSize: 18, color: "#FF8A5C", letterSpacing: 3 }}>{t("board.title")}</div>
          {rows.map((r) => (
            <div key={r.time} style={{ display: "flex", gap: 16, fontSize: 22, borderTop: "1px solid #1A2140", paddingTop: 16 }}>
              <span style={{ fontWeight: 700 }}>{r.time}</span>
              <span style={{ color: "#C9CDDA" }}>{r.client}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", background: "#FF5A1F", color: "#12172B", fontWeight: 700, fontSize: 20, borderRadius: 12, padding: "14px 0" }}>
            ●●●
          </div>
        </div>
      </div>
    ),
    size,
  );
}
