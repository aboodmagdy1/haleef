import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import FloatingNav from "./components/FloatingNav";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

import { Toaster } from "sonner";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex",
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Haleef | High-End Tech",
  description: "Next-gen Arabic Tech Landing Page",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let logoUrl: string | null = null;
  try {
    const settings = await client.fetch(siteSettingsQuery);
    logoUrl = settings?.logoUrl || null;
  } catch (e) {
    console.error("Failed to fetch site settings:", e);
  }

  return (
    <html lang="ar" dir="rtl">
      <body className={`${ibmPlexArabic.className} antialiased bg-background text-text-main`}>
        <Toaster position="bottom-left" richColors />
        <FloatingNav logoUrl={logoUrl} />
        {children}
      </body>
    </html>
  );
}
