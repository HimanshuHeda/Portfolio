import { ImageResponse } from "next/og";
import { hero, metrics, personalInfo } from "@/data/portfolio-data";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${personalInfo.name}: ${hero.headlineLead} ${hero.headlineRest}`;

// Shared 1200x630 social card, rendered at build time.
export function renderOgImage() {
  // The default OG font has no arrow glyph, so spell the range out.
  const stats = metrics.slice(0, 4).map((m) => ({ ...m, value: m.value.replace("→", "to") }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #1e1e1f 0%, #121212 70%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#ffdb70", marginBottom: 18 }}>
            {personalInfo.name}
          </div>
          <div style={{ display: "flex", fontSize: 60, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>
            {hero.headlineLead}
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#d6d6d6", marginTop: 14 }}>
            {hero.headlineRest}
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {stats.map((m) => (
            <div
              key={m.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "18px 20px",
                borderRadius: 16,
                border: "1px solid #383838",
                background: "#1f1f20",
              }}
            >
              <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#ffdb70" }}>{m.value}</div>
              <div style={{ display: "flex", fontSize: 20, color: "#d6d6d6", marginTop: 6 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a8a8a8" }}>
          <div style={{ display: "flex" }}>Flutter · FastAPI · Python · AWS</div>
          <div style={{ display: "flex" }}>{personalInfo.location}</div>
        </div>
      </div>
    ),
    ogSize
  );
}
