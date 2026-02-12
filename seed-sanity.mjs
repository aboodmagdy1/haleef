import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

// --- CONFIGURATION ---
const token = process.env.SANITY_WRITE_TOKEN;
const projectId = "vq7fnyn2";
const dataset = "production";

if (!token) {
  console.error("❌ Error: Please set SANITY_WRITE_TOKEN environment variable.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-02-13",
});

// --- DATA TO SEED ---

const aboutData = {
  _type: "about",
  _id: "singleton-about",
  title: "كيف نحول فكرتك إلى واقع؟",
  subtitle: "03 — رحلة النجاح",
  description: "خطوات مدروسة تضمن لك النتائج. نحن لا نبني مجرد برمجيات، بل نبني حلولاً مستدامة.",
  steps: [
    {
      title: "فهم واستراتيجية",
      description: "نبدأ بفهم عميق لأهدافك وتحليل السوق لنبني خطة عمل واضحة.",
      icon: "search",
    },
    {
      title: "تنفيذ وتطوير",
      description: "نحول الخطط إلى واقع باستخدام أفضل التقنيات وأعلى معايير الجودة.",
      icon: "settings",
    },
    {
      title: "إطلاق ونمو",
      description: "نطلق مشروعك للعالم ونبقى بجانبك لضمان التطور والنجاح المستمر.",
      icon: "rocket",
    },
  ],
  imagePath: "public/abt.png",
};

const conflictData = {
  _type: "conflict",
  _id: "singleton-conflict",
  title: "فجوة التواصل",
  description: "لما الخيال بيصطدم بالواقع التقني، المشروع بيموت في النص.. إحنا هنا عشان نبني الجسر ده.",
  problems: [
    { title: "تأخير التسليم", description: "المشروع كان المفروض يخلص امبارح ولسه مخلصش، وكل يوم عذر جديد." },
    { title: "انقطاع الدعم", description: "المبرمج اختفى بعد التسليم ومحدش بيرد على التليفون ولا الإيميل." },
    { title: "سوء التواصل", description: "بنشرح في وادي والتنفيذ في وادي تاني خالص، النتيجة مش زي ما طلبنا." },
    { title: "جودة سيئة", description: "الكود مليان أخطاء، الموقع بطيء، وبيضرب مع أول ضغط حقيقي." },
  ],
  solutions: [
    { title: "التزام صارم بالمواعيد", description: "جدول زمني واضح وملزم. بنسلم في المعاد بالظبط، بدون أعذار." },
    { title: "دعم فني مستمر", description: "إحنا جنبك بعد التسليم. ضمان صيانة وتطوير دائم، مش مجرد تسليم وجري." },
    { title: "تواصل لحظي وفعال", description: "أنت معانا في الصورة خطوة بخطوة. بنفهم طلبك صح وبنفذ اللي في خيالك." },
    { title: "جودة عالمية (Code & UX)", description: "كود نضيف، أداء سريع، وتجربة مستخدم سلسة خالية من الأخطاء." },
  ],
};

const footerData = {
  _type: "footer",
  _id: "singleton-footer",
  slogan: ["تصميم.", "برمجة.", "محتوى."],
  navLinks: [
    { label: "عن حليف", href: "#" },
    { label: "خدماتنا", href: "#" },
    { label: "أعمالنا", href: "#" },
    { label: "تواصل معنا", href: "#" },
  ],
  location: "الرياض، المملكة العربية السعودية - متاح عن بعد",
  email: "hello@haleef.sa",
  socialLinks: [
    { platform: "Github", href: "#" },
    { platform: "Linkedin", href: "#" },
    { platform: "Twitter", href: "#" },
    { platform: "Instagram", href: "#" },
  ],
  workingHours: [
    { days: "الأحد - الخميس", hours: "09:00 صباحاً - 06:00 مساءً" },
    { days: "الجمعة", hours: "04:00 عصراً - 10:00 مساءً" },
    { days: "السبت", hours: "إجازة (للطوارئ فقط)" },
  ],
};

async function uploadImage(filePath) {
  try {
    const fileBuffer = readFileSync(join(process.cwd(), filePath));
    const asset = await client.assets.upload("image", fileBuffer, {
      filename: filePath.split("/").pop(),
    });
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

async function seed() {
  console.log("🚀 Starting Sanity Seed (About, Conflict, Footer)...");

  // 1. Seed About
  console.log("Creating About...");
  const { imagePath, ...aboutRest } = aboutData;
  const aboutAsset = await uploadImage(imagePath);
  await client.createOrReplace({
    ...aboutRest,
    image: aboutAsset,
  });

  // 2. Seed Conflict
  console.log("Creating Conflict...");
  await client.createOrReplace(conflictData);

  // 3. Seed Footer
  console.log("Creating Footer...");
  await client.createOrReplace(footerData);

  console.log("✅ Seed completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
});
