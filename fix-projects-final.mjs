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

// --- DATA TO ADD ---

const projectsToReplace = [
  {
    _id: "project-digitalizeup",
    title: "ديجيتال زاي اب | Digitalizeup",
    slug: { _type: "slug", current: "digitalizeup" },
    subtitle: "وكالة تسويق رقمي فنانة",
    description:
      "ديجيتال زاي اب مهي بس وكالة تسويق، إحنا شريكك اللي يدف بيزنسك فوق. نضبط لك خطط تسويقية تمزمز على أهدافك، ونخلي براندك يلق في السوق ويجذب الزبائن صح، والأهم من كذا نضمن لك نمو حقيقي وأرباح تبيض الوجه.",
    badges: ["تسويق رقمي", "إعلانات", "نمو"],
    bgColor: "bg-[#0D0B1A]", // Dark Navy to trigger white text
    accentColor: "#3E92CC",
    marqueeWords: ["أرباح متزايدة", "إبداع تسويقي", "نتائج حقيقية", "براند قوي"],
    marqueeBg: "bg-linear-to-r from-[#3E92CC] to-[#0A2463]",
    stats: [
      { label: "زيادة أرباح", value: "300%" },
      { label: "حملة ناجحة", value: "+50" },
    ],
    desktopImage: "public/digitmac.png",
    mobileImage: "public/digitiphone.png",
  },
  {
    _id: "project-cvmaster",
    title: "سي في ماستر | CV Master",
    slug: { _type: "slug", current: "cv-master" },
    subtitle: "صانع السير الذاتية الاحترافية",
    description:
      "تبي وظيفة أحلامك؟ سي في ماستر يضبطك بأطلق سيرة ذاتية تخلي أي مسؤول توظيف يوقف عندها. جمعنا لك أحدث التقنيات مع خبرة ناس فاهمة في السوق عشان نعطيك تجربة سهلة وسلسة، وتطلع بمنتج احترافي يعكس قدراتك الحقيقية بكل ثقة.",
    badges: ["توظيف", "سيرة ذاتية", "تكنولوجيا"],
    bgColor: "bg-[#FFFFFF]", // Clean White
    accentColor: "#0A2463",
    marqueeWords: ["وظف نفسك", "سيرة احترافية", "ذكاء اصطناعي", "تصميم عصري"],
    marqueeBg: "bg-linear-to-r from-[#0A2463] to-[#3E92CC]",
    stats: [
      { label: "مستخدم", value: "+10k" },
      { label: "قالب جاهز", value: "25" },
    ],
    desktopImage: "public/cvmac.png",
    mobileImage: "public/cviphone.png",
  },
  {
    _id: "project-fawareq",
    title: "فوارق | Fawareq",
    slug: { _type: "slug", current: "fawareq" },
    subtitle: "صفحة هبوط تفتح النفس",
    description:
      "مشروع فوارق هو صفحة هبوط صممناها عشان تكون الواجهة اللي تليق بمقامك. ركزنا فيها على البساطة والجمال، مع لمسة تفاعلية تخلي العميل ما يمل وهو يتصفح. سوينا كل شي فيها بـ إتقان عشان نحقق أعلى نسبة تحويل ونخلي مشروعك يفرق عن الكل.",
    badges: ["Landing Page", "UX/UI", "تفاعل"],
    bgColor: "bg-[#000000]", // Pitch Black to trigger white text
    accentColor: "#3E92CC",
    marqueeWords: ["تصميم واجهات", "تحويل زوار", "إبداع بصري", "سرعة أداء"],
    marqueeBg: "bg-linear-to-r from-[#111111] to-[#333333]",
    stats: [
      { label: "نسبة تحويل", value: "15%" },
      { label: "سرعة تحميل", value: "1.2s" },
    ],
    desktopImage: "public/fawareqmac.png",
    mobileImage: "public/fawareqphone.png",
  },
];

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
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

async function cleanupAndReseed() {
  console.log("🧹 Cleaning up existing projects...");

  // Delete all project documents to avoid overlaps
  const query = '*[_type == "project"]';
  const projects = await client.fetch(query);

  for (const p of projects) {
    await client.delete(p._id);
    console.log(`🗑️ Deleted: ${p.title || p._id}`);
  }

  console.log("\n🚀 Seeding corrected projects...");

  for (const project of projectsToReplace) {
    console.log(`\n📦 Processing: ${project.title}`);

    const desktopAsset = await uploadImage(project.desktopImage);
    const mobileAsset = await uploadImage(project.mobileImage);

    if (!desktopAsset || !mobileAsset) {
      console.warn(`⚠️ Skipping ${project.title} due to image upload failure.`);
      continue;
    }

    const { desktopImage, mobileImage, ...projectData } = project;

    await client.createOrReplace({
      _type: "project",
      ...projectData,
      desktopMockup: desktopAsset,
      mobileMockup: mobileAsset,
    });

    console.log(`✅ Fixed & Added: ${project.title}`);
  }

  console.log("\n✨ Cleanup and Reseed completed!");
}

cleanupAndReseed().catch((err) => {
  console.error("❌ Operation failed:", err);
});
