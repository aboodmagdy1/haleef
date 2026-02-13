import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
    }),
    defineField({
      name: "receivingEmail",
      title: "Receiving Email Address",
      description: "The email where contact form notifications should be sent",
      type: "string",
    }),
    defineField({
      name: "displayEmail",
      title: "Display Email Address",
      description: "The email shown to users in the info cards",
      type: "string",
    }),
  ],
});
