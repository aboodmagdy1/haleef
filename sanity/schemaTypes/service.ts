import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      description: "Used for the service page URL (e.g., /services/mobile-apps)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "longDescription",
      title: "Long Description (for Service Page)",
      type: "array",
      description: "المحتوى التفصيلي لصفحة الخدمة المنفردة",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "عنوان الصفحة في محركات البحث (سيتم استخدام العنوان الرئيسي إذا ترك فارغاً)",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      description: "وصف الصفحة في محركات البحث",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "صورة رئيسية لصفحة الخدمة",
    }),
    defineField({
      // Will store Lucide icon name string for now or SVG
      name: "icon",
      title: "Icon (Lucide Name)",
      type: "string",
    }),
    defineField({
      // Features list
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
    defineField({
      // Colors
      name: "bgColor",
      title: "Background Color (Tailwind Class)",
      type: "string",
    }),
    defineField({
      name: "borderColor",
      title: "Border Color (Tailwind Class)",
      type: "string",
    }),
    defineField({
      name: "textColor",
      title: "Text Color (Tailwind Class)",
      type: "string",
    }),
    defineField({
      name: "dotColor",
      title: "Dot Color (Tailwind Class)",
      type: "string",
    }),
  ],
});
