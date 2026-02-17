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
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "رقم الواتساب مع كود الدولة (مثال: +966559250966)",
    }),
  ],
});
