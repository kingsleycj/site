import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { homeStatCount, site, stats } from "@/content/site";

export const alt = site.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function font(name: string) {
  return readFile(join(process.cwd(), "public/fonts/og", name));
}

/** The share card: the reference's near-black, one green chip, the name, two numbers, the portrait. */
export default async function OpenGraphImage() {
  const [inter, serif] = await Promise.all([font("Inter-SemiBold.ttf"), font("InstrumentSerif-Italic.ttf")]);
  const photo = await readFile(join(process.cwd(), "public/images/kingsley-dark.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#161616", color: "#f2f2f2", fontFamily: "Inter", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 860 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#9a9a9a" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#00e155", display: "flex" }} />
            <span>{site.availability} · {site.location}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 68, letterSpacing: -2.5, lineHeight: 1 }}>{site.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, lineHeight: 1.1 }}>
              <span>Software engineer,</span>
              <span style={{ display: "flex", alignItems: "center", background: "#0ebf4d", color: "#ffffff", borderRadius: 999, padding: "6px 22px 10px", fontSize: 32 }}>building HumStage</span>
            </div>
            <div style={{ fontFamily: "Instrument Serif", fontSize: 36, color: "#9a9a9a" }}>software that holds up.</div>
          </div>
          <div style={{ display: "flex", gap: 56 }}>
            {stats.slice(0, homeStatCount).map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", fontSize: 44, letterSpacing: -1.5, lineHeight: 1 }}>{s.prefix}{s.value}{s.suffix}</div>
                <div style={{ fontSize: 17, color: "#9a9a9a" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", right: -10, bottom: 0, width: 330, height: 442, display: "flex", alignItems: "flex-end" }}>
          <img src={photoSrc} alt="" width={330} height={442} style={{ objectFit: "contain", objectPosition: "bottom" }} />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Inter", data: inter, weight: 600, style: "normal" }, { name: "Instrument Serif", data: serif, weight: 400, style: "italic" }] },
  );
}
