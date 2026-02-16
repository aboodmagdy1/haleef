import { client } from "@/sanity/lib/client";
import { aboutPageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import FloatingNav from "@/app/components/FloatingNav";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import CreativeButton from "@/app/components/CreativeButton";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const data = await client.fetch(aboutPageQuery);
  const settings = await client.fetch(siteSettingsQuery);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <FloatingNav logoUrl={settings?.logoUrl} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#0A2463] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3E92CC,transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">{data.heroTitle}</h1>
          <p className="text-blue-100 text-lg md:text-2xl max-w-3xl mx-auto font-medium opacity-80">
            {data.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-4xl overflow-hidden shadow-2xl">
              {data.imageUrl ? (
                <Image src={data.imageUrl} alt={data.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                  No Image
                </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none text-[#0A2463]">
              <div className="text-xl leading-relaxed font-medium space-y-6">
                <PortableText value={data.content} />
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.vision && (
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-2xl font-black text-[#3E92CC] mb-4">{data.vision.title}</h3>
                    <p className="text-slate-600 font-medium">{data.vision.description}</p>
                  </div>
                )}
                {data.mission && (
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-2xl font-black text-[#3E92CC] mb-4">{data.mission.title}</h3>
                    <p className="text-slate-600 font-medium">{data.mission.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#0A2463] mb-8">هل أنت مستعد لبدء رحلتك التقنية معنا؟</h2>
          <CreativeButton text="تواصل معنا الآن" href="/#contact" variant="primary" size="lg" className="px-12" />
        </div>
      </section>

      <Footer logoUrl={settings?.logoUrl} />
    </main>
  );
}
