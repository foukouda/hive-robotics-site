import { ImageResponse } from "next/og";

export const alt = "Hive Robotics — Robots de livraison autonomes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0A0F1E 0%, #1B3D2C 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "9999px",
              background: "#00E85C",
            }}
          />
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            Hive Robotics
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              color: "#FFFFFF",
              fontSize: "78px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            <span>Robots de livraison&nbsp;</span>
            <span style={{ color: "#00E85C" }}>autonomes.</span>
          </div>
          <div style={{ color: "#B9C4BE", fontSize: "34px" }}>
            Conçus et fabriqués en France · jusqu&apos;à 250 kg · 50 km d&apos;autonomie
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "#8CA096",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          hiverobotics.fr
        </div>
      </div>
    ),
    { ...size }
  );
}
