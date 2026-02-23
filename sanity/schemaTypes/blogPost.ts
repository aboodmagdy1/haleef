import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "ملخص قصير للمقال يظهر في صفحة القائمة ونتائج البحث",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "وصف الصورة لمحركات البحث وقراء الشاشة",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
        {
          type: "code",
          title: "Code Block",
        },
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "تطوير التطبيقات", value: "mobile-development" },
          { title: "تطوير المواقع", value: "web-development" },
          { title: "المتاجر الإلكترونية", value: "e-commerce" },
          { title: "التصميم والهوية", value: "design" },
          { title: "التقنية والابتكار", value: "technology" },
          { title: "نصائح ريادية", value: "business-tips" },
          { title: "أخبار حليف", value: "company-news" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "فريق حليف تقني",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "عرض المقال في الأعلى",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "عنوان مخصص لمحركات البحث (إن ترك فارغاً سيستخدم عنوان المقال)",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      description: "وصف مخصص لمحركات البحث (إن ترك فارغاً سيستخدم الملخص)",
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "excerpt",
    },
  },
});
