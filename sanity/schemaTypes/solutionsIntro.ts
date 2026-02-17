import { defineField, defineType } from "sanity";

export default defineType({
  name: "solutionsIntro",
  title: "Solutions Section Intro",
  type: "document",
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "مثال: 02 — الحل",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "الجزء الأول من العنوان (مثال: كيف نصنع)",
    }),
    defineField({
      name: "titleHighlight",
      title: "Title Highlight",
      type: "string",
      description: "الكلمة المميزة باللون الأزرق (مثال: الفرق؟)",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),
    defineField({
      name: "paragraphs",
      title: "Description Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
    }),
  ],
});
