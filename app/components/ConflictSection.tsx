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

const HeaderContent = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center text-center px-4">
    <div className="flex items-center gap-2 mb-1 text-[#3E92CC] font-bold tracking-wider text-sm uppercase">
      <span className="w-8 h-[2px] bg-[#3E92CC]"></span>
      01 — التحدي
    </div>

    <div className="overflow-hidden relative mb-1">
      <SplitText
        text={title}
        className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[#3e92cc] leading-tight inline-block drop-shadow-sm"
        delay={0}
        duration={1.2}
        splitType="words"
        from={{ y: 80, opacity: 0 }}
        to={{ y: 0, opacity: 1 }}
      />
    </div>

    <div className="max-w-xl mx-auto overflow-hidden">
      <SplitText
        text={description}
        className="text-lg md:text-2xl text-slate-600 font-light leading-relaxed inline-block"
        delay={100}
        duration={0.8}
        splitType="words"
        from={{ y: 40, opacity: 0 }}
        to={{ y: 0, opacity: 1 }}
      />
    </div>
  </div>
);

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
    <section
      id="challenge"
      className="relative w-full lg:min-h-fit min-h-[100dvh] bg-slate-50 text-[#0A2463] overflow-hidden -mt-px"
    >
      <style jsx global>{`
        .split-word {
          padding-bottom: 0.5rem !important;
          display: inline-block;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Bottom Gemini Effect & Button */}
      <div className="absolute bottom-[-24dvh] left-0 w-full  h-[95dvh] pointer-events-none ">
        <GoogleGeminiEffect className="w-full h-full">
          <div className="pointer-events-auto mt-15 z-10">
            <CreativeButton
              text="ابحث عن حل"
              variant="primary"
              size="lg"
              href="#contact"
              className="shadow-xl shadow-blue-500/20 mt-6 hover:scale-105 transition-transform"
            />
          </div>
        </GoogleGeminiEffect>
      </div>

      <div className="container mx-auto px-4 relative z-10  pointer-events-none">
        {/* ================= DESKTOP LAYOUT (Grid) ================= */}
        <div className="hidden md:grid grid-cols-4 gap-8 h-[70dvh] items-center">
          {/* Left: Problems Vertical Loop */}
          <div className="col-span-1 opacity-100 hover:opacity-100 transition-opacity duration-500 h-[70dvh] relative overflow-hidden pointer-events-auto flex justify-center">
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

          {/* Center: Text */}
          <div className="col-span-2 flex flex-col items-center justify-center text-center z-20 relative h-full pointer-events-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/60 blur-3xl -z-10 rounded-full"></div>
            <HeaderContent title={content.title} description={content.description} />
          </div>

          {/* Right: Solutions Vertical Loop */}
          <div className="col-span-1 opacity-100 hover:opacity-100 transition-opacity duration-500 h-[70dvh] relative overflow-hidden pointer-events-auto flex justify-center">
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

        {/* ================= MOBILE LAYOUT (Stack) ================= */}
        <div className="flex md:hidden flex-col items-center justify-center min-h-[70dvh] w-full pb-20 relative ">
          {/* 1. Problems Loop - Red */}
          <div dir="ltr" className="w-full relative py-2 pointer-events-auto">
            <LogoLoop logos={problems} speed={30} direction="left" gap={16} className="py-2" />
          </div>

          {/* Vertical Line Connection (Between Problems and Gap) */}
          <div className="flex flex-col items-center opacity-40 shrink-0">
            <div className="w-2 h-2 bg-red-400 rounded-full mb-1"></div>
            <div className="w-[2px] h-10 bg-linear-to-b from-red-400 to-[#3E92CC]"></div>
          </div>

          {/* 2. Header Text - The Gap (The Bridge) */}
          <div className="relative z-20 pointer-events-auto py-2 shrink-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-white/40 blur-3xl -z-10 rounded-full"></div>
            <HeaderContent title={content.title} description={content.description} />
          </div>

          {/* Vertical Line Connection (Between Gap and Solutions) */}
          <div className="flex flex-col items-center opacity-40 shrink-0">
            <div className="w-[2px] h-10 bg-linear-to-b from-[#3E92CC] to-blue-400"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-1"></div>
          </div>

          {/* 3. Solutions Loop - Blue */}
          <div dir="ltr" className="w-full relative py-2 pointer-events-auto">
            <LogoLoop logos={solutions} speed={35} direction="right" gap={16} className="py-2" />
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
        w-[260px] md:w-64 p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg
        flex flex-col gap-2 text-right h-full justify-center
        ${
          isProblem
            ? "bg-red-50/80 border-red-100 hover:border-red-200 hover:bg-red-100"
            : "bg-blue-50/80 border-blue-100 hover:border-blue-200 hover:bg-blue-100"
        }
      `}
    >
      <h4 className={`text-lg font-bold ${isProblem ? "text-red-700" : "text-blue-700"}`}>{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed font-medium">{description}</p>
    </div>
  );
};

export default ConflictSection;
