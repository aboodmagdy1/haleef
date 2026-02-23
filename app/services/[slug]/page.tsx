import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import {
  serviceBySlugQuery,
  allServiceSlugsQuery,
  footerQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import CreativeButton from "@/app/components/CreativeButton";
import Footer from "@/app/components/Footer";

export const revalidate = 3600;

/* ── Static fallback content for services without Sanity long description ── */
const serviceDefaults: Record<
  string,
  {
    title: string;
    seoTitle: string;
    seoDescription: string;
    description: string;
    features: string[];
    paragraphs: string[];
  }
> = {
  "mobile-apps": {
    title: "تطوير تطبيقات الجوال",
    seoTitle: "تطوير تطبيقات الجوال — iOS & Android | حليف تقني",
    seoDescription:
      "نصمم ونطوّر تطبيقات جوال احترافية لأنظمة iOS و Android بأداء استثنائي وتجربة مستخدم لا تُنسى. من الفكرة إلى النشر — حليف تقني شريكك الرقمي في المدينة المنورة.",
    description:
      "تطبيقك في جيب عميلك. نصمم ونطوّر تطبيقات احترافية بأداء استثنائي وتجربة مستخدم سلسة لا تُنسى.",
    features: [
      "تطبيقات iOS و Android",
      "أداء سريع ومستقر",
      "نشر على متاجر التطبيقات الرسمية",
      "إشعارات فورية ذكية",
      "ربط مع أنظمة خارجية",
      "دعم فني مستمر بعد الإطلاق",
    ],
    paragraphs: [
      "في حليف تقني نؤمن أن تطبيق الجوال هو أقرب نقطة اتصال بين عميلك وعلامتك التجارية. لذلك نحرص على تقديم تطبيقات تجمع بين الأداء الاستثنائي والتصميم الجذاب.",
      "نبني تطبيقات تعمل بكفاءة على جميع الأجهزة، مع التركيز على تجربة مستخدم مدروسة تحوّل الزائر إلى عميل دائم. كل مشروع يمر بمراحل دقيقة من التخطيط والتصميم والتطوير والاختبار.",
      "من التخطيط والتصميم إلى الاختبار والنشر على المتاجر — نرافقك في كل خطوة ونضمن لك تطبيقاً يتفوق على توقعاتك.",
    ],
  },
  websites: {
    title: "تصميم وبرمجة المواقع الإلكترونية",
    seoTitle: "تصميم وبرمجة مواقع إلكترونية احترافية | حليف تقني",
    seoDescription:
      "نصمم مواقع إلكترونية احترافية تعكس هويتك وتُعزّز حضورك الرقمي. مواقع سريعة، متجاوبة، ومُحسّنة لمحركات البحث. حليف تقني — المدينة المنورة.",
    description:
      "نبني لك موقعاً إلكترونياً يعكس هويتك ويُحقق أهدافك التجارية بتصميم عصري وأداء استثنائي.",
    features: [
      "تصميم يعكس هوية علامتك",
      "رحلة تصفّح سلسة وبديهية",
      "متجاوب مع جميع الأجهزة",
      "سرعة تحميل فائقة",
      "متوافق مع محركات البحث SEO",
      "بنية قابلة للتوسع والنمو",
    ],
    paragraphs: [
      "موقعك الإلكتروني هو واجهتك الرقمية وأول انطباع يأخذه عميلك عنك. في حليف تقني نبني مواقع لا تكتفي بالجمال — بل تُحقق أهدافك التجارية وتُحوّل الزوار إلى عملاء.",
      "كل موقع نبنيه يبدأ بدراسة معمّقة لنشاطك وجمهورك. نهتم بسرعة التحميل وتحسين محركات البحث لضمان ظهورك في النتائج الأولى، مع بنية تقنية متينة تنمو مع عملك.",
      "سواء كنت تحتاج موقعاً تعريفياً أو خدمياً أو منصة متكاملة — فريقنا جاهز لتحويل فكرتك إلى تجربة رقمية احترافية.",
    ],
  },
  "salla-zid-stores": {
    title: "متاجر سلة وزد",
    seoTitle: "تجهيز متاجر سلة وزد الإلكترونية باحترافية | حليف تقني",
    seoDescription:
      "نُنشئ ونُجهّز متجرك الإلكتروني على سلة أو زد بتصميم احترافي وتجربة شراء مميزة. ربط أنظمة الدفع والشحن — جاهز للبيع فوراً. حليف تقني.",
    description:
      "نُجهّز متجرك الإلكتروني على سلة أو زد بتصميم مخصص وتجربة شراء تُضاعف مبيعاتك.",
    features: [
      "تجهيز وتصميم كامل للمتجر",
      "واجهات بيع مُحسّنة للتحويل",
      "ربط بوابات الدفع والشحن",
      "تكاملات التسويق والتحليلات",
      "تحسين تجربة الشراء",
      "دعم وتدريب على إدارة المتجر",
    ],
    paragraphs: [
      "التجارة الإلكترونية في السعودية تشهد نمواً غير مسبوق. سواء اخترت سلة أو زد — نحن نتولّى كل شيء من التصميم إلى ربط أنظمة الدفع والشحن.",
      "لا نستخدم القوالب الجاهزة كما هي — بل نُخصّص تصميم متجرك ليعكس هوية علامتك التجارية ويتميز عن المنافسين. نصمم واجهات بيع مُحسّنة لرفع معدلات التحويل.",
      "بعد التسليم نبقى معك بالدعم والتدريب لتدير متجرك بثقة واستقلالية كاملة.",
    ],
  },
  "ui-ux-design": {
    title: "تصميم واجهات المستخدم UI/UX",
    seoTitle: "تصميم واجهات مستخدم UI/UX احترافية | حليف تقني",
    seoDescription:
      "نصمم واجهات مستخدم جذابة وتجارب استخدام سلسة مبنية على دراسة سلوك جمهورك. نماذج تفاعلية واختبارات قابلية استخدام. حليف تقني — المدينة المنورة.",
    description:
      "نصمم واجهات تجعل تجربة المستخدم ممتعة وفعّالة — مبنية على دراسة سلوك جمهورك الحقيقي.",
    features: [
      "تصميم عصري وجذاب",
      "دراسة وتحليل رحلة العميل",
      "نماذج تفاعلية (Prototypes)",
      "اختبارات قابلية الاستخدام",
      "تصميم متجاوب لجميع الشاشات",
      "نظام تصميم موحد (Design System)",
    ],
    paragraphs: [
      "التصميم الجيد لا يُلاحظه المستخدم — يشعر به. في حليف تقني نصمم واجهات تجعل تجربة المستخدم ممتعة وفعّالة في آنٍ واحد.",
      "نبدأ بتحليل جمهورك وفهم احتياجاته، ثم نبني نماذج أولية تفاعلية نختبرها مع مستخدمين حقيقيين. هذا يضمن أن كل عنصر تصميمي له وظيفة واضحة.",
      "النتيجة: معدلات تحويل أعلى، وقت بقاء أطول، ورضا عملاء يتحول لولاء طويل الأمد.",
    ],
  },
  "branding-graphic-design": {
    title: "الهوية البصرية والتصميم الجرافيكي",
    seoTitle: "تصميم هوية بصرية وجرافيك احترافي | حليف تقني",
    seoDescription:
      "نصمم هويات بصرية متكاملة وشعارات مبتكرة تُميّز علامتك التجارية في السوق السعودي. من الشعار إلى كتيب الهوية — حليف تقني في المدينة المنورة.",
    description:
      "نصمم هوية بصرية متكاملة تنطق بالاحترافية وتترك بصمة لا تُنسى في ذهن عميلك.",
    features: [
      "شعارات مبتكرة ومدروسة",
      "هوية بصرية متكاملة",
      "تصاميم سوشيال ميديا",
      "كتيب الهوية (Brand Book)",
      "تصاميم مطبوعات",
      "قوالب عروض تقديمية",
    ],
    paragraphs: [
      "قبل أن يقرأ عميلك كلمة عن منتجك — عيناه تحكم على علامتك التجارية. الألوان، الشعار، طريقة العرض… كلها رسائل صامتة تبني الثقة أو تُضعفها.",
      "نبدأ كل مشروع هوية بورشة عمل لفهم رؤيتك وقيمك وجمهورك. ثم نطوّر اتجاهات تصميمية متعددة ونعمل معك على اختيار الأنسب — كل قرار مدروس ومبني على استراتيجية.",
      "النتيجة: هوية بصرية تنبض بالحياة وتجعل علامتك التجارية لا تُنسى في سوق تنافسي متسارع.",
    ],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  let service = null;
  try {
    service = await client.fetch(serviceBySlugQuery, { slug });
  } catch {}

  const fallback = serviceDefaults[slug];
  const title = service?.seoTitle || service?.title || fallback?.seoTitle || "خدماتنا | حليف تقني";
  const description =
    service?.seoDescription || service?.description || fallback?.seoDescription || "";

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.haleeftech.com/services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.haleeftech.com/services/${slug}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(allServiceSlugsQuery);
    const staticSlugs = slugs.map((s: { slug: string }) => ({ slug: s.slug }));

    // Also add fallback slugs
    const fallbackSlugs = Object.keys(serviceDefaults).map((slug) => ({ slug }));
    const allSlugs = [...staticSlugs];
    for (const fs of fallbackSlugs) {
      if (!allSlugs.find((s) => s.slug === fs.slug)) {
        allSlugs.push(fs);
      }
    }
    return allSlugs;
  } catch {
    return Object.keys(serviceDefaults).map((slug) => ({ slug }));
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  let service = null;
  let footerData = null;
  let settings = null;

  try {
    const [serviceData, footer, siteSettings] = await Promise.all([
      client.fetch(serviceBySlugQuery, { slug }),
      client.fetch(footerQuery),
      client.fetch(siteSettingsQuery),
    ]);
    service = serviceData;
    footerData = footer;
    settings = siteSettings;
  } catch {}

  const fallback = serviceDefaults[slug];

  // If neither Sanity nor fallback has this slug, 404
  if (!service && !fallback) {
    notFound();
  }

  const title = service?.title || fallback?.title || "";
  const description = service?.description || fallback?.description || "";
  const features = service?.features?.length > 0 ? service.features : fallback?.features || [];
  const hasLongDescription = service?.longDescription && service.longDescription.length > 0;
  const paragraphs = fallback?.paragraphs || [];
  const heroImageUrl = service?.heroImageUrl || null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: {
      "@type": "Organization",
      name: "حليف تقني — Haleef Tech",
      url: "https://www.haleeftech.com",
    },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    url: `https://www.haleeftech.com/services/${slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://www.haleeftech.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "خدماتنا",
        item: "https://www.haleeftech.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://www.haleeftech.com/services/${slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-gradient-to-br from-[#0A2463] via-[#0e2d6e] to-[#2a1055]">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3E90C8]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#8B11AF]/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <nav className="text-blue-200/50 text-sm mb-8 font-medium">
            <a href="/" className="hover:text-white transition-colors">
              الرئيسية
            </a>
            <span className="mx-2">/</span>
            <a href="/services" className="hover:text-white transition-colors">
              خدماتنا
            </a>
            <span className="mx-2">/</span>
            <span className="text-white/80">{title}</span>
          </nav>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            {title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3E90C8] to-[#8B11AF] rounded-full mx-auto mb-6" />
          <p className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            {description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div
            className={`grid grid-cols-1 ${heroImageUrl ? "lg:grid-cols-2 gap-12 lg:gap-16 items-center" : ""}`}
          >
            {heroImageUrl && (
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                  <Image src={heroImageUrl} alt={title} fill className="object-cover" />
                </div>
              </div>
            )}

            <div className={heroImageUrl ? "" : "max-w-3xl mx-auto"}>
              {hasLongDescription ? (
                <div className="text-lg leading-[1.9] font-medium text-slate-600">
                  <PortableText
                    value={service.longDescription}
                    components={{
                      types: {
                        image: ({ value }: any) => {
                          if (!value?.asset?._ref) return null;
                          return (
                            <div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden shadow-lg">
                              <Image
                                src={urlForImage(value).url() || ""}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                          );
                        },
                      },
                      block: {
                        h2: ({ children }) => (
                          <h2 className="text-2xl md:text-3xl font-black text-[#0A2463] mt-10 mb-4">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl md:text-2xl font-black text-[#3E90C8] mt-8 mb-3">
                            {children}
                          </h3>
                        ),
                        normal: ({ children }) => (
                          <p className="mb-5 text-slate-600 leading-[1.9]">{children}</p>
                        ),
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-5 text-lg leading-[1.9] font-medium">
                  {paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? "text-xl md:text-2xl font-black text-[#0A2463] border-r-4 border-[#8B11AF] pr-5"
                          : "text-slate-600"
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-black text-[#0A2463] text-center mb-12">
              ماذا نقدم لك؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-slate-100"
                >
                  <div className="w-10 h-10 bg-[#3E90C8]/10 rounded-lg flex items-center justify-center text-[#3E90C8] font-black text-sm shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="text-[#0A2463] font-bold">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#0A2463] via-[#0e2d6e] to-[#2a1055] relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#3E90C8]/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-6">
            جاهز تبدأ مشروعك؟
          </h2>
          <p className="text-blue-100/60 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium">
            تواصل معنا اليوم لنناقش فكرتك ونقدم لك أفضل الحلول
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
