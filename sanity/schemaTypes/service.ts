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
      name: "description",
      title: "Description",
      type: "text",
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
