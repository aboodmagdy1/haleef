import { client } from "@/sanity/lib/client";
import { aboutPageQuery, siteSettingsQuery, footerQuery } from "@/sanity/lib/queries";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import CreativeButton from "@/app/components/CreativeButton";
import { urlForImage } from "@/sanity/lib/image";
import {
  Heart,
  Shield,
  Zap,
  Star,
  Target,
  Eye,
  Users,
  Lightbulb,
  Rocket,
  Award,
  CheckCircle,
  Globe,
  Code,
  Palette,
  Sparkles,
  Handshake,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export const dynamic = "force-dynamic";

/* ── Icon map ── */
const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
  eye: <Eye className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  lightbulb: <Lightbulb className="w-6 h-6" />,
  rocket: <Rocket className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
  checkcircle: <CheckCircle className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  code: <Code className="w-6 h-6" />,
  palette: <Palette className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  handshake: <Handshake className="w-6 h-6" />,
  bookopen: <BookOpen className="w-6 h-6" />,
  trendingup: <TrendingUp className="w-6 h-6" />,
};

function getIcon(iconName?: string) {
  if (!iconName) return <Star className="w-6 h-6" />;
  return iconMap[iconName.toLowerCase()] || <Star className="w-6 h-6" />;
}

/* ── Placeholder defaults (used until Sanity content is added) ── */
const defaults = {
  heroTitle: "من نحن",
  heroSubtitle:
    "في عالم رقمي مليء بالتعقيدات تبرز الحاجة ليس فقط لمزود خدمة بل لشريك يفهم تطلعاتك. نحن في حليف تقني نسعى لنقل خبراتنا التقنية العميقة إلى عملائنا متجاوزين المفهوم التقليدي للبرمجة والتنفيذ.",
  contentParagraphs: [
    "في حليف تقني نحن لا نبني أنظمة فقط.. نحن نبني مستقبلاً تقنياً يمكنك الوثوق به.",
    "لقد تأسسنا لنكون الركيزة التي تستند إليها في رحلة تحولك الرقمي حيث نؤمن أن التقنية هي وسيلة لتمكين الإنسان وتطوير الأعمال وليست مجرد أكواد برمجية. رؤيتنا تقوم على الشفافية والابتكار ولنكون حليفك الحقيقي في النجاح نضع بين يديك عصارة تجاربنا لنحول تحدياتك التقنية إلى فرص استثمارية ملموسة.",
    "لا نكتفي بتقديم حلول برمجية جاهزة بل نشاركك المعرفة ونبني معك بنية تحتية تقنية متينة تمكنك من القيادة والابتكار.",
  ],
  featuresTitle: "لماذا يختارنا الطامحون؟",
  features: [
    {
      title: "عقلية الشريك",
      description:
        "لا نعمل كطرف خارجي بل نغوص في تفاصيل عملك لفهم تحدياتك الحقيقية ونقدم حلولًا تقنية مصمّمة خصيصًا لتناسب احتياجاتك.",
      icon: "handshake",
    },
    {
      title: "نقل المعرفة أولويتنا",
      description:
        "نلتزم بتبسيط التعقيد التقني وتحويله إلى فهم واضح يمكّن فريقك من مواصلة النمو بثقة واستدامة.",
      icon: "bookopen",
    },
    {
      title: "الجودة والابتكار",
      description:
        "نمزج بين أحدث التقنيات العالمية وفهم عميق لمتطلبات السوق المحلي لنقدم حلولًا عملية وفعّالة.",
      icon: "award",
    },
  ],
  valuesTitle: "قيمنا التي تحركنا",
  values: [
    {
      title: "الشفافية",
      description: "وضوح كامل في كل مرحلة من مراحل التنفيذ.",
      icon: "eye",
    },
    {
      title: "المرونة",
      description: "قدرتنا على التكيّف مع تغيرات السوق واحتياجاتك المتجددة.",
      icon: "trendingup",
    },
    {
      title: "التمكين",
      description: "هدفنا النهائي أن تصبح تقنياتك مصدر قوتك الأكبر.",
      icon: "zap",
    },
  ],
  ctaTitle: "في حليف تقني نحن لا نبني أنظمة فقط…\nنحن نبني مستقبلًا تقنيًا يمكنك الوثوق به",
  ctaSubtitle:
    "لا ننتهي بتسليم المشروع فقط بل نبدأ من هناك.. لنكون حليفك الذي يمهد لك طريق النجاح في العالم الرقمي.",
  ctaButtonText: "ابدأ رحلتك معنا",
};

export default async function AboutPage() {
  const [data, settings, footerData] = await Promise.all([
    client.fetch(aboutPageQuery),
    client.fetch(siteSettingsQuery),
    client.fetch(footerQuery),
  ]);

  const heroTitle = data?.heroTitle || defaults.heroTitle;
  const heroSubtitle = data?.heroSubtitle || defaults.heroSubtitle;
  const imageUrl = data?.imageUrl || null;
  const hasRichContent = data?.content && data.content.length > 0;
  const featuresTitle = data?.featuresTitle || defaults.featuresTitle;
  const features = data?.features?.length > 0 ? data.features : defaults.features;
  const valuesTitle = data?.valuesTitle || defaults.valuesTitle;
  const values = data?.values?.length > 0 ? data.values : defaults.values;
  const ctaTitle = data?.ctaTitle || defaults.ctaTitle;
  const ctaSubtitle = data?.ctaSubtitle || defaults.ctaSubtitle;
  const ctaButtonText = data?.ctaButtonText || defaults.ctaButtonText;

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-gradient-to-br from-[#0A2463] via-[#0e2d6e] to-[#2a1055]">
        <div className="absolute inset-0 opacity-[0.04]">
          <Image src="/pattern.svg" alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3E90C8]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#8B11AF]/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            {heroTitle}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3E90C8] to-[#8B11AF] rounded-full mx-auto mb-6" />
          <p className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            {heroSubtitle}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Story / Content ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className={`grid grid-cols-1 ${imageUrl ? "lg:grid-cols-2 gap-12 lg:gap-16 items-center" : ""}`}>
            {imageUrl && (
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                  <Image src={imageUrl} alt={heroTitle} fill className="object-cover" />
                </div>
                <div className="absolute -bottom-3 -left-3 w-full h-full rounded-3xl border-2 border-[#3E90C8]/15 -z-10" />
              </div>
            )}

            <div className={imageUrl ? "" : "max-w-3xl mx-auto"}>
              <div className="text-lg leading-[1.9] font-medium text-slate-600">
                {hasRichContent ? (
                  <PortableText
                    value={data.content}
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
                          <h2 className="text-2xl md:text-3xl font-black text-[#0A2463] mt-10 mb-4">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl md:text-2xl font-black text-[#3E90C8] mt-8 mb-3">{children}</h3>
                        ),
                        normal: ({ children }) => (
                          <p className="mb-5 text-slate-600 leading-[1.9]">{children}</p>
                        ),
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="list-none space-y-3 mb-6">{children}</ul>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }) => (
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 rounded-full bg-[#3E90C8] mt-2.5 shrink-0" />
                            <span>{children}</span>
                          </li>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-black text-[#0A2463]">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="text-[#3E90C8] not-italic font-bold">{children}</em>
                        ),
                      },
                    }}
                  />
                ) : (
                  <div className="space-y-5">
                    {defaults.contentParagraphs.map((p, i) => (
                      <p
                        key={i}
                        className={`leading-[1.9] ${
                          i === 0
                            ? "text-xl md:text-2xl font-black text-[#0A2463] border-r-4 border-[#8B11AF] pr-5"
                            : "text-slate-600"
                        }`}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features / Why Choose Us ── */}
      <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <Image src="/pattern.svg" alt="" fill className="object-cover" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#0A2463]">
              {featuresTitle}
            </h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 ${features.length >= 3 ? "lg:grid-cols-3" : ""} gap-6 md:gap-8`}>
            {features.map((item: { title: string; description: string; icon?: string }, i: number) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3E90C8] to-[#8B11AF]" />
                <div className="w-12 h-12 bg-[#3E90C8]/10 rounded-xl flex items-center justify-center mb-5 text-[#3E90C8]">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-lg font-black text-[#0A2463] mb-2">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-[15px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#0A2463]">
              {valuesTitle}
            </h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 ${values.length >= 3 ? "lg:grid-cols-3" : ""} gap-6 md:gap-8 max-w-5xl mx-auto`}>
            {values.map((item: { title: string; description: string; icon?: string }, i: number) => (
              <div
                key={i}
                className="text-center p-8 rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/50"
              >
                <div className="w-12 h-12 bg-[#8B11AF]/10 rounded-xl flex items-center justify-center mb-5 mx-auto text-[#8B11AF]">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-lg font-black text-[#0A2463] mb-2">{item.title}</h3>
                <div className="w-8 h-0.5 bg-[#8B11AF]/30 rounded-full mx-auto mb-3" />
                <p className="text-slate-500 font-medium leading-relaxed text-[15px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#0A2463] via-[#0e2d6e] to-[#2a1055] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <Image src="/pattern.svg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#3E90C8]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#8B11AF]/20 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight whitespace-pre-line">
            {ctaTitle}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3E90C8] to-[#8B11AF] rounded-full mx-auto mb-6" />
          <p className="text-blue-100/60 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {ctaSubtitle}
          </p>
          <CreativeButton
            text={ctaButtonText}
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
