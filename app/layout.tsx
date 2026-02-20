import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import FloatingNav from "./components/FloatingNav";
import WhatsAppButton from "./components/WhatsAppButton";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

import { Toaster } from "sonner";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex",
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const siteUrl = "https://www.haleeftech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "حليف تقني | Haleef Tech — شريكك التقني لتطوير البرمجيات والحلول الرقمية",
    template: "%s | حليف تقني — Haleef Tech",
  },
  description:
    "حليف تقني — شركة تطوير برمجيات سعودية متخصصة في تصميم وبرمجة تطبيقات الجوال، المواقع الإلكترونية، المتاجر الإلكترونية، متاجر سلة وزد، والتصميم الجرافيكي. نبتكر حلولاً رقمية تتجاوز التوقعات للشركات الناشئة والمؤسسات في السعودية.",
  keywords: [
    "حليف تقني",
    "Haleef Tech",
    "تطوير برمجيات",
    "شركة برمجة سعودية",
    "تصميم مواقع",
    "تطبيقات جوال",
    "تطوير تطبيقات",
    "متاجر إلكترونية",
    "متجر سلة",
    "متجر زد",
    "تصميم جرافيك",
    "تصميم واجهات",
    "UI/UX",
    "تصميم هوية بصرية",
    "حلول رقمية",
    "التحول الرقمي",
    "software development Saudi Arabia",
    "mobile app development",
    "web development",
    "e-commerce",
    "Salla store",
    "Zid store",
    "graphic design",
    "UI UX design",
    "digital solutions",
    "المدينة المنورة",
  ],
  authors: [{ name: "حليف تقني — Haleef Tech", url: siteUrl }],
  creator: "حليف تقني — Haleef Tech",
  publisher: "حليف تقني — Haleef Tech",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: "حليف تقني — Haleef Tech",
    title: "حليف تقني | Haleef Tech — شريكك التقني لتطوير البرمجيات والحلول الرقمية",
    description:
      "شركة تطوير برمجيات سعودية متخصصة في تصميم وبرمجة تطبيقات الجوال، المواقع الإلكترونية، المتاجر الإلكترونية، متاجر سلة وزد، والتصميم الجرافيكي.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "حليف تقني — Haleef Tech | حلول رقمية مبتكرة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "حليف تقني | Haleef Tech — شريكك التقني لتطوير البرمجيات",
    description:
      "شركة تطوير برمجيات سعودية متخصصة في تطبيقات الجوال، المواقع الإلكترونية، المتاجر الإلكترونية، والتصميم الجرافيكي.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

import LenisProvider from "@/components/LenisProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let logoUrl: string | null = null;
  let whatsappNumber = "+966559250966";
  try {
    const settings = await client.fetch(siteSettingsQuery);
    logoUrl = settings?.logoUrl || null;
    if (settings?.whatsappNumber) {
      whatsappNumber = settings.whatsappNumber;
    }
  } catch (e) {
    console.error("Failed to fetch site settings:", e);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "حليف تقني — Haleef Tech",
    url: siteUrl,
    logo: logoUrl || `${siteUrl}/og-image.png`,
    description:
      "شركة تطوير برمجيات سعودية متخصصة في تصميم وبرمجة تطبيقات الجوال، المواقع الإلكترونية، المتاجر الإلكترونية، متاجر سلة وزد، والتصميم الجرافيكي.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "المدينة المنورة",
      addressCountry: "SA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966559250966",
      contactType: "customer service",
      email: "haleeftech.cs@gmail.com",
      availableLanguage: ["Arabic", "English"],
    },
    sameAs: [
      "https://www.instagram.com/haleeftech",
      "https://www.tiktok.com/@haleeftech",
    ],
    foundingLocation: {
      "@type": "Place",
      name: "المدينة المنورة، المملكة العربية السعودية",
    },
    knowsAbout: [
      "Mobile App Development",
      "Web Development",
      "E-commerce Solutions",
      "Salla Store Development",
      "Zid Store Development",
      "Graphic Design",
      "UI/UX Design",
      "تطوير تطبيقات الجوال",
      "تطوير المواقع الإلكترونية",
      "المتاجر الإلكترونية",
      "التصميم الجرافيكي",
    ],
  };

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "خدمات حليف تقني — Haleef Tech Services",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "تطبيقات الجوال — Mobile App Development",
          description:
            "تصميم وبرمجة تطبيقات iOS و Android بأداء عالي وتجربة مستخدم مميزة باستخدام React Native و Flutter.",
          provider: { "@type": "Organization", name: "حليف تقني — Haleef Tech" },
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "مواقع إلكترونية — Website Development",
          description:
            "تصميم وبرمجة مواقع إلكترونية احترافية ومتجاوبة تعكس هويتك وتعزز تواجدك الرقمي.",
          provider: { "@type": "Organization", name: "حليف تقني — Haleef Tech" },
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "المتاجر الإلكترونية — E-commerce Solutions",
          description:
            "إنشاء متاجر إلكترونية متكاملة على منصات سلة وزد مع تصميم احترافي وربط أنظمة الدفع والشحن.",
          provider: { "@type": "Organization", name: "حليف تقني — Haleef Tech" },
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "تصميم الواجهات — UI/UX Design",
          description:
            "تصميم واجهات مستخدم جذابة وتجربة استخدام سلسة مبنية على دراسة سلوك المستخدمين.",
          provider: { "@type": "Organization", name: "حليف تقني — Haleef Tech" },
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: "التصميم الجرافيكي والهوية البصرية — Graphic Design & Branding",
          description:
            "تصميم شعارات وهوية بصرية كاملة وتصاميم سوشيال ميديا تميزك في السوق وتعكس احترافيتك.",
          provider: { "@type": "Organization", name: "حليف تقني — Haleef Tech" },
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
        },
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="canonical" href={siteUrl} />
        <meta name="geo.region" content="SA" />
        <meta name="geo.placename" content="المدينة المنورة" />
        <meta name="theme-color" content="#0A2463" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
      </head>
      <body className={`${ibmPlexArabic.className} antialiased bg-background text-text-main`}>
        <LenisProvider>
          <Toaster position="bottom-left" richColors />
          <FloatingNav logoUrl={logoUrl} />
          {children}
          <WhatsAppButton phoneNumber={whatsappNumber} />
        </LenisProvider>
      </body>
    </html>
  );
}
