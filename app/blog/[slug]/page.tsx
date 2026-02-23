import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import {
  blogPostBySlugQuery,
  allBlogSlugsQuery,
  footerQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import Footer from "@/app/components/Footer";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  let post = null;
  try {
    post = await client.fetch(blogPostBySlugQuery, { slug });
  } catch {}

  if (!post) {
    return { title: "مقال غير موجود | حليف تقني" };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || "";

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.haleeftech.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.haleeftech.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author || "فريق حليف تقني"],
      images: post.coverImageUrl
        ? [
            {
              url: post.coverImageUrl,
              width: 1200,
              height: 630,
              alt: post.coverImageAlt || post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(allBlogSlugsQuery);
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

const categoryLabels: Record<string, string> = {
  "mobile-development": "تطوير التطبيقات",
  "web-development": "تطوير المواقع",
  "e-commerce": "المتاجر الإلكترونية",
  design: "التصميم والهوية",
  technology: "التقنية والابتكار",
  "business-tips": "نصائح ريادية",
  "company-news": "أخبار حليف",
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post = null;
  let footerData = null;
  let settings = null;

  try {
    const [postData, footer, siteSettings] = await Promise.all([
      client.fetch(blogPostBySlugQuery, { slug }),
      client.fetch(footerQuery),
      client.fetch(siteSettingsQuery),
    ]);
    post = postData;
    footerData = footer;
    settings = siteSettings;
  } catch {}

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author || "فريق حليف تقني",
    },
    publisher: {
      "@type": "Organization",
      name: "حليف تقني — Haleef Tech",
      url: "https://www.haleeftech.com",
    },
    mainEntityOfPage: `https://www.haleeftech.com/blog/${slug}`,
    image: post.coverImageUrl || undefined,
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.haleeftech.com/blog/${slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-gradient-to-br from-[#0A2463] via-[#0e2d6e] to-[#2a1055]">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3E90C8]/15 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
          <nav className="text-blue-200/50 text-sm mb-8 font-medium">
            <a href="/" className="hover:text-white transition-colors">
              الرئيسية
            </a>
            <span className="mx-2">/</span>
            <a href="/blog" className="hover:text-white transition-colors">
              المدونة
            </a>
            <span className="mx-2">/</span>
            <span className="text-white/80">{post.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            {post.category && (
              <span className="text-xs font-bold text-[#3E90C8] bg-white/10 px-3 py-1 rounded-full">
                {categoryLabels[post.category] || post.category}
              </span>
            )}
            {post.publishedAt && (
              <span className="text-xs text-blue-200/50">
                {new Date(post.publishedAt).toLocaleDateString("ar-SA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-blue-100/60 text-lg max-w-3xl font-medium leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Cover Image */}
      {post.coverImageUrl && (
        <div className="container mx-auto px-4 md:px-8 max-w-4xl -mt-8 relative z-10 mb-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="prose prose-lg prose-slate max-w-none text-lg leading-[2] font-medium text-slate-600">
            {post.content && (
              <PortableText
                value={post.content}
                components={{
                  types: {
                    image: ({ value }: any) => {
                      if (!value?.asset?._ref) return null;
                      return (
                        <figure className="my-8">
                          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                            <Image
                              src={urlForImage(value).url() || ""}
                              alt={value.alt || ""}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {value.caption && (
                            <figcaption className="text-center text-sm text-slate-400 mt-3">
                              {value.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    },
                  },
                  block: {
                    h2: ({ children }) => (
                      <h2 className="text-2xl md:text-3xl font-black text-[#0A2463] mt-12 mb-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl md:text-2xl font-black text-[#3E90C8] mt-10 mb-3">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg md:text-xl font-black text-[#0A2463] mt-8 mb-2">
                        {children}
                      </h4>
                    ),
                    normal: ({ children }) => (
                      <p className="mb-5 text-slate-600 leading-[2]">{children}</p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-r-4 border-[#8B11AF] pr-5 my-8 text-[#0A2463] font-bold italic">
                        {children}
                      </blockquote>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-none space-y-3 mb-6">{children}</ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-3 mb-6">{children}</ol>
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
                    link: ({ value, children }) => (
                      <a
                        href={value?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3E90C8] underline hover:text-[#8B11AF] transition-colors"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-sm font-medium text-slate-500 bg-slate-50 px-4 py-2 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author */}
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0A2463] rounded-full flex items-center justify-center text-white font-black text-lg">
              {(post.author || "ح")[0]}
            </div>
            <div>
              <div className="font-black text-[#0A2463]">{post.author || "فريق حليف تقني"}</div>
              <div className="text-sm text-slate-400">حليف تقني — Haleef Tech</div>
            </div>
          </div>
        </div>
      </article>

      <Footer data={footerData} logoUrl={settings?.logoUrl} />
    </main>
  );
}
