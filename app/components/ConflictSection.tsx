"use client";
import React from "react";
import LogoLoop, { LogoItem } from "@/components/LogoLoop";
import SplitText from "@/components/SplitText";
import CreativeButton from "./CreativeButton";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export interface ConflictCardData {
  title: string;
  description: string;
}

export interface ConflictData {
  title: string;
  description: string;
  problems: ConflictCardData[];
  solutions: ConflictCardData[];
}

const defaultProblems: ConflictCardData[] = [
  { title: "تأخير التسليم", description: "المشروع كان المفروض يخلص امبارح ولسه مخلصش، وكل يوم عذر جديد." },
  { title: "انقطاع الدعم", description: "المبرمج اختفى بعد التسليم ومحدش بيرد على التليفون ولا الإيميل." },
  { title: "سوء التواصل", description: "بنشرح في وادي والتنفيذ في وادي تاني خالص، النتيجة مش زي ما طلبنا." },
];

const defaultSolutions: ConflictCardData[] = [
  { title: "التزام صارم بالمواعيد", description: "جدول زمني واضح وملزم. بنسلم في المعاد بالظبط، بدون أعذار." },
  { title: "دعم فني مستمر", description: "إحنا جنبك بعد التسليم. ضمان صيانة وتطوير دائم، مش مجرد تسليم وجري." },
  { title: "تواصل لحظي وفعال", description: "أنت معانا في الصورة خطوة بخطوة. بنفهم طلبك صح وبنفذ اللي في خيالك." },
];

interface ConflictSectionProps {
  data?: ConflictData;
}

const ConflictSection: React.FC<ConflictSectionProps> = ({ data }) => {
  const content = {
    title: data?.title || "فجوة التواصل",
    description:
      data?.description || "لما الخيال بيصطدم بالواقع التقني، المشروع بيموت في النص.. إحنا هنا عشان نبني الجسر ده.",
    problems: data?.problems || defaultProblems,
    solutions: data?.solutions || defaultSolutions,
  };

  const problems: LogoItem[] = (content.problems || []).map((p) => ({
    node: <DetailCard title={p.title} description={p.description} type="problem" />,
  }));

  const solutions: LogoItem[] = (content.solutions || []).map((s) => ({
    node: <DetailCard title={s.title} description={s.description} type="solution" />,
  }));

  return (
    <section id="challenge" className="relative w-full bg-slate-50 text-[#0A2463] overflow-hidden -mt-px" dir="rtl">
      <style jsx global>{`
        .split-word {
          padding-bottom: 0.5rem !important;
          display: inline-block;
          will-change: transform, opacity;
        }
      `}</style>
      <div
        className="absolute top-0 left-0 w-full h-40 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, #ffffff 0%, transparent 70%)",
        }}
      ></div>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 h-[700px] items-center">
          <div className="hidden md:block col-span-1 opacity-100 hover:opacity-100 transition-opacity duration-500 h-[700px] relative overflow-hidden mask-gradient-vertical pointer-events-auto">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-100 rounded-full blur-md animate-pulse z-20"></div>
            <LogoLoop
              logos={problems}
              speed={50}
              direction="up"
              logoHeight={40}
              gap={12}
              fadeOut={true}
              fadeOutColor="#f8fafc"
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center z-20 relative h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/60 blur-3xl -z-10 rounded-full"></div>

            <div className="flex items-center gap-2 mb-4 text-[#3E92CC] font-bold tracking-wider text-sm uppercase">
              <span className="w-8 h-[2px] bg-[#3E92CC]"></span>
              01 — التحدي
            </div>

            <div className="overflow-hidden relative mb-2">
              <SplitText
                text={content.title}
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#3e92cc] leading-tight inline-block drop-shadow-sm"
                delay={0}
                duration={1.2}
                splitType="words"
                from={{ y: 80, opacity: 0 }}
                to={{ y: 0, opacity: 1 }}
              />
            </div>

            <div className="max-w-xl mx-auto overflow-hidden">
              <SplitText
                text={content.description}
                className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed inline-block"
                delay={100}
                duration={0.8}
                splitType="words"
                from={{ y: 40, opacity: 0 }}
                to={{ y: 0, opacity: 1 }}
              />
            </div>
          </div>

          <div className="hidden md:block col-span-1 opacity-100 hover:opacity-100 transition-opacity duration-500 h-[700px] relative overflow-hidden mask-gradient-vertical pointer-events-auto">
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-8 h-8 bg-blue-100 rounded-full blur-md animate-pulse z-20"></div>
            <LogoLoop
              logos={solutions}
              speed={60}
              direction="down"
              logoHeight={40}
              gap={12}
              fadeOut={true}
              fadeOutColor="#f8fafc"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const DetailCard: React.FC<{ title: string; description: string; type: "problem" | "solution" }> = ({
  title,
  description,
  type,
}) => {
  const isProblem = type === "problem";

  return (
    <div
      className={`
        w-64 p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg
        flex flex-col gap-2 text-right text-base
        ${
          isProblem
            ? "bg-red-50 border-red-100 hover:border-red-200 hover:bg-red-100"
            : "bg-blue-50 border-blue-100 hover:border-blue-200 hover:bg-blue-100"
        }
      `}
    >
      <h4 className={`text-lg font-bold ${isProblem ? "text-red-700" : "text-blue-700"}`}>{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default ConflictSection;
