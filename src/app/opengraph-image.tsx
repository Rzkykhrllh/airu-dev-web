import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Logotype */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: "240px",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-6px",
            color: "#ffffff",
          }}
        >
          A<span style={{ color: "#6366f1" }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
