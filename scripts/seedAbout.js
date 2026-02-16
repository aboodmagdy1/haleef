const { createClient } = require("@sanity/client");

// Use environment variables or hardcode your project ID and token for local seeding
const client = createClient({
  projectId: "h9r6y4y4", // Your actual project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN, // Make sure you have this in your .env
});

async function seedAboutPage() {
  const aboutPageData = {
    _type: "aboutPage",
    title: "عن حليف",
    heroTitle: "حليف: شريكك التقني الموثوق في رحلة النجاح",
    heroSubtitle: "نحن لسنا مجرد شركة برمجة، نحن حليفك الذي يفهم رؤيتك ويحولها إلى واقع تقني ملموس يبهر العالم.",
    content: [
      {
        _key: "block1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "span1",
            _type: "span",
            text: "بدأت حليف برؤية واحدة: كسر الحواجز بين الأفكار الطموحة والتنفيذ التقني الاحترافي. نحن نؤمن بأن كل مشروع هو قصة نجاح فريدة، ونحن هنا لنكتب فصولها معك.",
          },
        ],
      },
      {
        _key: "block2",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "span2",
            _type: "span",
            text: "فريقنا يجمع بين الخبرة العميقة والابتكار المستمر، مما يمكننا من تقديم حلول برمجية تتجاوز التوقعات وتدعم نمو أعمالك في العصر الرقمي.",
          },
        ],
      },
    ],
    vision: {
      title: "رؤيتنا",
      description:
        "أن نكون الحليف الأول والرائد عالمياً في تحويل الرؤى الطموحة إلى تجارب رقمية استثنائية تقود المستقبل.",
    },
    mission: {
      title: "رسالتنا",
      description:
        "تقديم حلول تقنية مبتكرة وعالية الجودة تمكّن شركاءنا من تحقيق أهدافهم وتفوقهم التنافسي، مع الالتزام التام بالشفافية والاحترافية.",
    },
  };

  try {
    const result = await client.createOrReplace({
      _id: "aboutPage-singleton", // Using a consistent ID to avoid duplicates
      ...aboutPageData,
    });
    console.log("About Page Seeded Successfully!", result._id);
  } catch (err) {
    console.error("Seeding failed:", err);
  }
}

seedAboutPage();
