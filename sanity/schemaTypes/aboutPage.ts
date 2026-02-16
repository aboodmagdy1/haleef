import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page Content",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "منحن",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
    }),
    defineField({
      name: "content",
      title: "Main Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "vision",
      title: "Our Vision",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "description", title: "Description", type: "text" },
      ],
    }),
    defineField({
      name: "mission",
      title: "Our Mission",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "description", title: "Description", type: "text" },
      ],
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
