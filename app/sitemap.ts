import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import {
  sitemapServiceSlugsQuery,
  sitemapBlogSlugsQuery,
  sitemapProjectSlugsQuery,
} from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.haleeftech.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Fallback service slugs (always included even without Sanity data)
  const fallbackServiceSlugs = [
    "mobile-apps",
    "websites",
    "salla-zid-stores",
    "ui-ux-design",
    "branding-graphic-design",
  ];

  let serviceSlugs: { slug: string; _updatedAt?: string }[] = [];
  let blogSlugs: { slug: string; publishedAt?: string; _updatedAt?: string }[] = [];

  try {
    const [services, blogs] = await Promise.all([
      client.fetch(sitemapServiceSlugsQuery),
      client.fetch(sitemapBlogSlugsQuery),
    ]);
    serviceSlugs = services || [];
    blogSlugs = blogs || [];
  } catch {
    // Use fallbacks on error
  }

  // Service pages
  const allServiceSlugs = new Set(serviceSlugs.map((s) => s.slug));
  for (const slug of fallbackServiceSlugs) {
    allServiceSlugs.add(slug);
  }

  const servicePages: MetadataRoute.Sitemap = Array.from(allServiceSlugs).map((slug) => {
    const match = serviceSlugs.find((s) => s.slug === slug);
    return {
      url: `${baseUrl}/services/${slug}`,
      lastModified: match?._updatedAt ? new Date(match._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt
      ? new Date(post._updatedAt)
      : post.publishedAt
        ? new Date(post.publishedAt)
        : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}

