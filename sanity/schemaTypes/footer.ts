import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer Content",
  type: "document",
  fields: [
    defineField({
      name: "slogan",
      title: "Slogan Lines",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Link (HREF)", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "location",
      title: "Location Text",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "crNumber",
      title: "Commercial Registration Number (رقم السجل التجاري)",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform (Github, Linkedin, etc.)", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "workingHours",
      title: "Working Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "days", title: "Days Range", type: "string" },
            { name: "hours", title: "Hours Range", type: "string" },
          ],
        },
      ],
    }),
  ],
});
