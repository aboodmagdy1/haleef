import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
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
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "desktopMockup",
      title: "Desktop Mockup",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mobileMockup",
      title: "Mobile Mockup",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bgColor",
      title: "Background Color (Tailwind Class)",
      type: "string",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color (Hex)",
      type: "string",
    }),
    defineField({
      // Array of strings for badges
      name: "badges",
      title: "Badges",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "marqueeWords",
      title: "Marquee Words",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "marqueeBg",
      title: "Marquee Background (Tailwind Class)",
      type: "string",
    }),
    defineField({
      name: "stats",
      title: "Project Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    }),
  ],
});
