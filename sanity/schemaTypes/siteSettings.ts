import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "الشعار الرئيسي — يُستخدم في النافبار والفوتر وأي مكان آخر",
      options: {
        hotspot: true,
      },
    }),
  ],
});
