import { ImageResponse } from "next/og";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const revalidate = 86400; // revalidate once per day

export default async function Icon() {
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
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt=""
            width={32}
            height={32}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </div>
      ),
      { ...size }
    );
  }

  // Fallback: simple "H" icon if logo not available
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
          borderRadius: "6px",
          color: "white",
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        H
      </div>
    ),
    { ...size }
  );
}
