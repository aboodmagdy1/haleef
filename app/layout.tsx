import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import FloatingNav from "./components/FloatingNav";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${ibmPlexArabic.className} antialiased bg-background text-text-main`}>
        <Toaster position="bottom-left" richColors />
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
