import { ImageResponse } from "next/og";
import { company } from "@/content/site";

export const alt = `${company.name} — ${company.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** A typographic social preview in the brand colours. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0C2038",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 8 }}>COACTION</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
            <div style={{ width: 28, height: 2, background: "#B99242", marginRight: 14 }} />
            <div style={{ fontSize: 16, letterSpacing: 6, color: "#C9D1DA" }}>
              COMPANY LIMITED
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 4, background: "#B99242", marginBottom: 36 }} />
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>
            Building Capacity. Developing Competence. Driving Excellence.
          </div>
          <div style={{ fontSize: 28, marginTop: 32, color: "#D8BD80" }}>
            {company.positioning}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
