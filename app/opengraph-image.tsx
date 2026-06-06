import { ImageResponse } from "next/og";

export const alt = "How to Read an Insurer's P&L — An Interactive Field Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const ink = "#0C1B2A";
  const paper = "#FAF8F3";
  const gold = "#C29A4C";
  const profit = "#1AA17F";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ink,
          backgroundImage:
            "radial-gradient(900px 500px at 80% -10%, rgba(194,154,76,0.22), rgba(12,27,42,0) 60%), radial-gradient(700px 500px at 0% 120%, rgba(26,161,127,0.16), rgba(12,27,42,0) 55%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 34,
              height: 34,
              borderRadius: 999,
              border: `2px solid ${gold}`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, background: gold }} />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              color: gold,
              fontWeight: 700,
            }}
          >
            BUCKEYE MUTUAL · FIELD GUIDE
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 84,
              fontWeight: 800,
              color: paper,
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
          >
            How to read an insurer&rsquo;s&nbsp;<span style={{ color: gold }}>P&amp;L</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(250,248,243,0.72)", maxWidth: 900 }}>
            The combined ratio, the float, and the two engines of insurance profit.
          </div>
        </div>

        {/* combined-ratio motif */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              position: "relative",
              width: "100%",
              height: 46,
              borderRadius: 12,
              background: "#15293D",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", width: "51.7%", height: "100%", background: profit }} />
            <div style={{ display: "flex", width: "28.6%", height: "100%", background: "#15876A" }} />
            <div
              style={{
                display: "flex",
                position: "absolute",
                left: "83.3%",
                top: 0,
                bottom: 0,
                width: 3,
                background: paper,
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "rgba(250,248,243,0.7)" }}>
            <div style={{ display: "flex", color: profit, fontWeight: 700 }}>
              Combined ratio 96.3% — underwriting profit
            </div>
            <div style={{ display: "flex" }}>100% = break-even</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
