import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "32px",
          height: "32px",
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontWeight: 900,
          fontSize: "18px",
          color: "#ffffff",
          letterSpacing: "-1px",
        }}
      >
        A<span style={{ color: "#6366f1" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
