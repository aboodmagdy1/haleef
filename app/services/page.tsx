import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { allServicesWithSlugQuery } from "@/sanity/lib/queries";
import CreativeButton from "@/app/components/CreativeButton";
import Footer from "@/app/components/Footer";
import { footerQuery, siteSettingsQuery } from "@/sanity/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "خدماتنا — حلول رقمية متكاملة | حليف تقني",
  description:
    "اكتشف خدمات حليف تقني: تطوير تطبيقات الجوال، تصميم وبرمجة المواقع الإلكترونية، إنشاء متاجر سلة وزد، تصميم واجهات UI/UX، والهوية البصرية. حلول رقمية احترافية في السعودية.",
  alternates: {
    canonical: "https://www.haleeftech.com/services",
  },
  openGraph: {
    title: "خدماتنا — حلول رقمية متكاملة | حليف تقني — Haleef Tech",
    description:
      "تطوير تطبيقات، مواقع إلكترونية، متاجر سلة وزد، تصميم UI/UX وهوية بصرية. شركة برمجة سعودية من المدينة المنورة.",
    url: "https://www.haleeftech.com/services",
    type: "website",
  },
};

/* Service slugs fallback: if Sanity doesn't have slugs, generate from title */
const fallbackServices = [
  {
    title: "تطبيقات الجوال",
    slug: "mobile-apps",
    description:
      "تصميم وبرمجة تطبيقات iOS و Android بأداء عالي وتجربة مستخدم مميزة باستخدام React Native و Flutter.",
    features: ["React Native & Flutter", "أداء سريع ومستقر", "رفع على المتاجر"],
    icon: "smartphone",
  },
  {
    title: "مواقع إلكترونية",
    slug: "websites",
    description:
      "نبني لك موقعك التعريفي الذي يبرز هويتك ويظهر قوتك. رحلة عميل ممتعة تدعو للتعاون.",
    features: ["إبراز للهوية", "رحلة عميل سلسة وواضحة", "متجاوب مع الأجهزة", "تقنيات حديثة"],
    icon: "globe",
  },
  {
    title: "متاجر سلة وزد",
    slug: "salla-zid-stores",
    description:
      "نجهز لك متجرك على سلة أو زد بتصميم احترافي، ونربط لك الدفع والشحن، ونسلمك المتجر جاهز.",
    features: ["تجهيز كامل للمتجر", "تصميم بنرات وواجهات", "ربط الخدمات والتطبيقات"],
    icon: "shoppingCart",
  },
  {
    title: "تصميم الواجهات (UI/UX)",
    slug: "ui-ux-design",
    description:
      "ندرس سلوك جمهورك ونفهم احتياجه ونصمم تجربة سهلة وسلسة تخليه يوصل للي يبيه بوضوح.",
    features: ["تصميم عصري يشد العين", "دراسة رحلة العميل", "نماذج تفاعلية (Prototypes)"],
    icon: "palette",
  },
  {
    title: "الهوية والجرافيك",
    slug: "branding-graphic-design",
    description:
      "نسويلك شعار وهوية بصرية كاملة تفرقك عن غيرك في السوق وتعكس احترافيتك من أول طلة.",
    features: ["شعارات مبتكرة ومدروسة", "هوية بصرية متكاملة", "تصاميم سوشيال ميديا"],
    icon: "sparkles",
  },
];

export default async function ServicesPage() {
  let services = [];
  let footerData = null;
  let settings = null;

  try {
    const [servicesData, footer, siteSettings] = await Promise.all([
      client.fetch(allServicesWithSlugQuery),
      client.fetch(footerQuery),
      client.fetch(siteSettingsQuery),
    ]);
    services = servicesData?.length > 0 ? servicesData : fallbackServices;
    footerData = footer;
    settings = siteSettings;
  } catch {
    services = fallbackServices;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://www.haleeftech.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "خدماتنا",
        item: "https://www.haleeftech.com/services",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-gradient-to-br from-[#0A2463] via-[#0e2d6e] to-[#2a1055]">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3E90C8]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#8B11AF]/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            خدماتنا
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3E90C8] to-[#8B11AF] rounded-full mx-auto mb-6" />
          <p className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            حلول رقمية متكاملة تغطي كل احتياجاتك التقنية — من الفكرة إلى الإطلاق والنمو
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(
              (
                service: {
                  title: string;
                  slug: string;
                  description: string;
                  features?: string[];
                },
                i: number
              ) => (
                <Link
                  key={i}
                  href={`/services/${service.slug}`}
                  className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3E90C8] to-[#8B11AF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl font-black text-[#3E90C8]/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-[#0A2463] mb-3 group-hover:text-[#3E90C8] transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed text-[15px] mb-4">
                    {service.description}
                  </p>
                  {service.features && (
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((f: string, fi: number) => (
                        <li key={fi} className="flex items-center gap-2 text-sm text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B11AF]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-6 text-[#3E90C8] font-bold text-sm group-hover:translate-x-[-4px] transition-transform">
                    اكتشف المزيد ←
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#0A2463] via-[#0e2d6e] to-[#2a1055] relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#3E90C8]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#8B11AF]/20 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight">
            جاهز تبدأ مشروعك؟
          </h2>
          <p className="text-blue-100/60 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك
          </p>
          <CreativeButton
            text="احجز استشارتك المجانية"
            href="/#contact"
            variant="primary"
            reverse={true}
            size="lg"
            className="px-12"
          />
        </div>
      </section>

      <Footer data={footerData} logoUrl={settings?.logoUrl} />
    </main>
  );
}
