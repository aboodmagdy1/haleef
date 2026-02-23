import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { blogPostsQuery, footerQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import Footer from "@/app/components/Footer";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "المدونة — مقالات تقنية وريادية | حليف تقني",
  description:
    "اقرأ أحدث المقالات التقنية والريادية من فريق حليف تقني. نصائح في تطوير التطبيقات، تصميم المواقع، التجارة الإلكترونية، والتحول الرقمي في السعودية.",
  alternates: {
    canonical: "https://www.haleeftech.com/blog",
  },
  openGraph: {
    title: "المدونة — مقالات تقنية وريادية | حليف تقني — Haleef Tech",
    description:
      "مقالات تقنية وريادية من فريق حليف تقني. تعلّم وتطوّر مع أحدث المعلومات في عالم التقنية والأعمال.",
    url: "https://www.haleeftech.com/blog",
    type: "website",
  },
};

const categoryLabels: Record<string, string> = {
  "mobile-development": "تطوير التطبيقات",
  "web-development": "تطوير المواقع",
  "e-commerce": "المتاجر الإلكترونية",
  design: "التصميم والهوية",
  technology: "التقنية والابتكار",
  "business-tips": "نصائح ريادية",
  "company-news": "أخبار حليف",
};

export default async function BlogPage() {
  let posts: any[] = [];
  let footerData = null;
  let settings = null;

  try {
    const [postsData, footer, siteSettings] = await Promise.all([
      client.fetch(blogPostsQuery),
      client.fetch(footerQuery),
      client.fetch(siteSettingsQuery),
    ]);
    posts = postsData || [];
    footerData = footer;
    settings = siteSettings;
  } catch {}

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "مدونة حليف تقني",
    description: "مقالات تقنية وريادية من فريق حليف تقني",
    url: "https://www.haleeftech.com/blog",
    publisher: {
      "@type": "Organization",
      name: "حليف تقني — Haleef Tech",
      url: "https://www.haleeftech.com",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://www.haleeftech.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "المدونة",
        item: "https://www.haleeftech.com/blog",
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            المدونة
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3E90C8] to-[#8B11AF] rounded-full mx-auto mb-6" />
          <p className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            مقالات تقنية وريادية نشارك فيها خبراتنا ومعرفتنا لمساعدتك في رحلة التحول الرقمي
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-black text-[#0A2463] mb-4">
                قريباً — مقالات تقنية وريادية
              </h2>
              <p className="text-slate-500 text-lg max-w-md mx-auto">
                نعمل على إعداد محتوى قيّم لمساعدتك في رحلتك الرقمية. تابعنا للبقاء على اطلاع!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {post.coverImageUrl && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.coverImageAlt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span className="text-xs font-bold text-[#3E90C8] bg-[#3E90C8]/10 px-3 py-1 rounded-full">
                          {categoryLabels[post.category] || post.category}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="text-xs text-slate-400">
                          {new Date(post.publishedAt).toLocaleDateString("ar-SA", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-black text-[#0A2463] mb-2 group-hover:text-[#3E90C8] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 text-[#3E90C8] font-bold text-sm group-hover:translate-x-[-4px] transition-transform">
                      اقرأ المزيد ←
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer data={footerData} logoUrl={settings?.logoUrl} />
    </main>
  );
}
