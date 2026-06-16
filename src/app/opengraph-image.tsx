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
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.5,
          }}
        />

        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            inset: "32px",
            border: "3px solid #0f172a",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "40px",
            border: "1px solid #0f172a",
            display: "flex",
          }}
        />

        {/* Corner dots */}
        {[
          { top: "24px", left: "24px" },
          { top: "24px", right: "24px" },
          { bottom: "24px", left: "24px" },
          { bottom: "24px", right: "24px" },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "16px",
              height: "16px",
              background: "#6366f1",
              ...pos,
            }}
          />
        ))}

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logotype */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: "160px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-4px",
              color: "#0f172a",
              fontFamily: "sans-serif",
            }}
          >
            AIRU
            <span style={{ color: "#6366f1" }}>.</span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "120px",
              height: "3px",
              background: "#0f172a",
              margin: "24px 0",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: 600,
              color: "#475569",
              letterSpacing: "6px",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            Software Engineer
          </div>
        </div>

        {/* URL badge bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#0f172a",
            color: "#ffffff",
            padding: "8px 20px",
            fontSize: "18px",
            fontFamily: "sans-serif",
            letterSpacing: "1px",
          }}
        >
          dev.byairu.com
        </div>
      </div>
    ),
    { ...size }
  );
}
