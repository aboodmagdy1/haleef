import { ImageResponse } from "next/og";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const revalidate = 86400; // revalidate once per day

export default async function AppleIcon() {
  let logoUrl: string | null = null;

  try {
    const settings = await client.fetch(siteSettingsQuery);
    logoUrl = settings?.logoUrl || null;
  } catch {}

  if (logoUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt=""
            width={180}
            height={180}
            style={{ objectFit: "contain", width: "85%", height: "85%" }}
          />
        </div>
      ),
      { ...size }
    );
  }

  // Fallback
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A2463",
          borderRadius: "32px",
          color: "white",
          fontSize: 100,
          fontWeight: 700,
        }}
      >
        H
      </div>
    ),
    { ...size }
  );
}
