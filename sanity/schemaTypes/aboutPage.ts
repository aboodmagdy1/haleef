import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page Content",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "العنوان الرئيسي في أعلى الصفحة",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      description: "النص التعريفي تحت العنوان",
    }),
    defineField({
      name: "content",
      title: "Main Content",
      description: "المحتوى الرئيسي للصفحة (النصوص التفصيلية)",
      type: "array",
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
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featuresTitle",
      title: "Features Section Title",
      type: "string",
      description: "مثال: لماذا يختارنا الطامحون؟",
    }),
    defineField({
      name: "features",
      title: "Features / Why Choose Us",
      description: "المميزات التي تظهر في قسم لماذا يختارنا",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "icon", title: "Icon (Lucide Name)", type: "string", description: "مثال: users, lightbulb, award, rocket, code" },
          ],
        },
      ],
    }),
    defineField({
      name: "valuesTitle",
      title: "Values Section Title",
      type: "string",
      description: "مثال: قيمنا التي تحركنا",
    }),
    defineField({
      name: "values",
      title: "Our Values",
      description: "القيم والمبادئ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "icon", title: "Icon (Lucide Name)", type: "string", description: "مثال: eye, shield, zap, heart, star" },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
    }),
    defineField({
      name: "ctaSubtitle",
      title: "CTA Subtitle",
      type: "text",
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
    }),
  ],
});
