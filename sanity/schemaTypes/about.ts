import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
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
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "icon", title: "Lucide Icon Name", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Bottom Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
