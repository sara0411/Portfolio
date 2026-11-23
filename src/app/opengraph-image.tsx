import { ImageResponse } from "next/og";

export const alt = "Sara Ferraa, Software Engineer";
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
          justifyContent: "center",
          padding: "0 96px",
          background: "#f4ede1",
          color: "#261f1a",
        }}
      >
        <div style={{ display: "flex", fontSize: 88, fontWeight: 600 }}>
          Sara Ferraa
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 36,
            color: "#6b5f54",
          }}
        >
          Software engineer in Casablanca. C#, C++, Java, Spring Boot.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 28,
            color: "#2f3fbf",
          }}
        >
          ferraasara.vercel.app
        </div>
      </div>
    ),
    size,
  );
}
