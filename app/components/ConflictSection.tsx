"use client";
import React from "react";
import LogoLoop, { LogoItem } from "@/components/LogoLoop";
import SplitText from "@/components/SplitText";
import CreativeButton from "./CreativeButton";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

const ConflictSection: React.FC = () => {
  // 1. طلبات العميل
  const clientPainPoints: LogoItem[] = [
    { node: <PainPointChip text="عايزينه زي أبل" type="client" /> },
    { node: <PainPointChip text="ممكن نغير اللون ده؟" type="client" /> },
    { node: <PainPointChip text="الميزانية محدودة شوية" type="client" /> },
    { node: <PainPointChip text="خليه يفرقع (Make it Pop)" type="client" /> },
    { node: <PainPointChip text="تعديل أخير بجد" type="client" /> },
    { node: <PainPointChip text="الـ Deadline كان إمبارح" type="client" /> },
    { node: <PainPointChip text="اللوجو محتاج يكبر" type="client" /> },
    { node: <PainPointChip text="مش عاجبني الأزرق ده" type="client" /> },
  ];

  // 2. مشاكل المبرمج
  const devPainPoints: LogoItem[] = [
    { node: <PainPointChip text="الـ API واقع" type="dev" /> },
    { node: <PainPointChip text="سباجيتي كود" type="dev" /> },
    { node: <PainPointChip text="مفيش Documentation" type="dev" /> },
    { node: <PainPointChip text="Merge Conflict رخم" type="dev" /> },
    { node: <PainPointChip text="ضرب في الـ Production" type="dev" /> },
    { node: <PainPointChip text="Memory Leak غريب" type="dev" /> },
    { node: <PainPointChip text="الـ CSS بايظ في سفاري" type="dev" /> },
    { node: <PainPointChip text="مش شغال عندي!" type="dev" /> },
  ];

  return (
    <section className="relative w-full  bg-slate-50 text-[#0A2463] overflow-hidden  -mt-px">
      {/* Top Gradient Fade */}
      {/* Top Gradient Fade */}
      <div
        className="absolute top-0 left-0 w-full h-40 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, #ffffff 0%, transparent 70%)" }}
      ></div>

      {/* Wave Divider placed at the very top of ConflictSection to eat into Hero */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] z-20 pointer-events-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-slate-50"
          ></path>
        </svg>
      </div>

      {/* GoogleGeminiEffect at the bottom */}
      <div className="absolute -bottom-16 left-0 w-full h-[500px] pointer-events-none ">
        <GoogleGeminiEffect className="w-full h-full">
          <div className="pointer-events-auto mt-15 z-10">
            <CreativeButton
              text="ابحث عن حل"
              variant="primary"
              size="lg"
              className="shadow-xl shadow-blue-500/20 mt-6 hover:scale-105 transition-transform"
            />
          </div>
        </GoogleGeminiEffect>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-24 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 h-[600px] items-center">
          {/* العمود الأيمن: طلبات العميل */}
          <div className="hidden md:block col-span-1 opacity-80 hover:opacity-100 transition-opacity duration-500 h-[600px] relative overflow-hidden mask-gradient-vertical pointer-events-auto">
            {/* أيقونة Anchor بصرية لبداية الجسر */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-100 rounded-full blur-md animate-pulse z-20"></div>
            <LogoLoop
              logos={clientPainPoints}
              speed={70}
              direction="up"
              logoHeight={60}
              gap={16}
              fadeOut={true}
              fadeOutColor="#f8fafc"
            />
          </div>

          {/* المنتصف: المحتوى الأساسي */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center space-y-2 z-20 relative h-full">
            {/* Glow Effect only - Text is now handled by GoogleGeminiEffect in background layer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/60 blur-3xl -z-10 rounded-full"></div>

            <div className="overflow-hidden relative">
              <SplitText
                text="فجوة التواصل"
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#3e92cc] leading-tight inline-block pb-2 drop-shadow-sm"
                delay={0}
                duration={1.2}
                splitType="words"
                from={{ y: 80, opacity: 0 }}
                to={{ y: 0, opacity: 1 }}
              />
            </div>

            <div className="max-w-xl mx-auto overflow-hidden">
              <SplitText
                text="لما الخيال بيصطدم بالواقع التقني، المشروع بيموت في النص.. إحنا هنا عشان نبني الجسر ده."
                className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed inline-block"
                delay={100}
                duration={0.8}
                splitType="words"
                from={{ y: 40, opacity: 0 }}
                to={{ y: 0, opacity: 1 }}
              />
            </div>
          </div>

          {/* العمود الأيسر: واقع المبرمج */}
          <div className="hidden md:block col-span-1 opacity-80 hover:opacity-100 transition-opacity duration-500 h-[600px] relative overflow-hidden mask-gradient-vertical">
            {/* أيقونة Anchor بصرية لنهاية الجسر */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-8 h-8 bg-cyan-100 rounded-full blur-md animate-pulse z-20"></div>
            <LogoLoop
              logos={devPainPoints}
              speed={85}
              direction="down"
              logoHeight={60}
              gap={16}
              fadeOut={true}
              fadeOutColor="#f8fafc"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// الـ Chip Component
const PainPointChip: React.FC<{ text: string; type: "client" | "dev" }> = ({ text, type }) => {
  const isClient = type === "client";

  return (
    <div
      className={`
        px-6 py-3 rounded-lg border backdrop-blur-sm whitespace-nowrap text-base font-semibold shadow-sm transform transition-all hover:scale-105
        ${
          isClient
            ? "bg-white/80 border-blue-100 text-blue-600 hover:border-blue-300 hover:shadow-blue-200"
            : "bg-white/80 border-red-100 text-red-600 hover:border-red-300 hover:shadow-red-200"
        }
      `}
    >
      {text}
    </div>
  );
};

export default ConflictSection;
