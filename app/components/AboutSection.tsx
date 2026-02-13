"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Search, Settings, Rocket, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const getIcon = (iconName: string, className?: string) => {
  const iconProps = { className: className || "w-8 h-8 text-[#3E92CC]" };
  switch (iconName?.toLowerCase()) {
    case "search":
      return <Search {...iconProps} />;
    case "settings":
      return <Settings {...iconProps} />;
    case "rocket":
      return <Rocket {...iconProps} />;
    default:
      return <HelpCircle {...iconProps} />;
  }
};

export interface AboutStep {
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  steps: AboutStep[];
  image: string;
}

const defaultSteps = [
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
];

interface AboutSectionProps {
  data?: AboutData;
}

const AboutSection = ({ data }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const content = {
    title: data?.title || "كيف نحول فكرتك إلى واقع؟",
    subtitle: data?.subtitle || "03 — رحلة النجاح",
    description: data?.description || "خطوات مدروسة تضمن لك النتائج. نحن لا نبني مجرد برمجيات، بل نبني حلولاً مستدامة.",
    steps: data?.steps || defaultSteps,
    image: data?.image || "/abt.png",
  };

  useGSAP(
    () => {
      // Animate Line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "right" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      );

      // Animate Cards Staggered
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [content] },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-16 bg-slate-50/50 text-slate-900 overflow-hidden"
      dir="rtl"
    >
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-100/40 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-50/40 rounded-full blur-[80px] md:blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="flex items-center gap-3 text-[#3E92CC] font-bold tracking-widest text-xs md:text-sm uppercase mb-6 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
            <span className="w-6 h-[2px] bg-[#3E92CC]"></span>
            {content.subtitle}
            <span className="w-6 h-[2px] bg-[#3E92CC]"></span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-[#0A2463] text-balance">
            {content.title.includes("فكرتك") ? (
              <div className="flex flex-wrap justify-center gap-x-3">
                <span>{content.title.split("فكرتك")[0]}</span>
                <span className="text-[#3E92CC] relative inline-block">
                  فكرتك
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#3E92CC]/20 rounded-full"></span>
                </span>
                <span>{content.title.split("فكرتك")[1]}</span>
              </div>
            ) : (
              content.title
            )}
          </h2>
          <p className="text-slate-500 text-lg md:text-2xl max-w-2xl leading-relaxed">{content.description}</p>
        </div>

        <div className="relative w-full max-w-6xl">
          <div className="hidden lg:block absolute top-8 left-0 w-full h-[2px] bg-slate-200 z-0">
            <div ref={lineRef} className="absolute inset-0 bg-[#3E92CC] w-full h-full origin-right scale-x-0"></div>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 relative z-10">
            {content.steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group relative">
                {/* Connecting Line for Mobile */}
                {idx < content.steps.length - 1 && (
                  <div className="lg:hidden absolute top-20 -bottom-16 left-1/2 -translate-x-1/2 w-[2px] bg-linear-to-b from-[#3E92CC] to-transparent z-0 opacity-20"></div>
                )}

                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-2 border-[#3E92CC] flex items-center justify-center text-xl md:text-2xl font-black text-[#3E92CC] mb-8 shadow-[0_10px_30px_rgba(62,146,204,0.15)] group-hover:bg-[#3E92CC] group-hover:text-white transition-all duration-500 z-10 relative rotate-45 group-hover:rotate-0">
                  <span className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">{idx + 1}</span>
                </div>

                <div className="w-full bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 hover:shadow-2xl hover:border-[#3E92CC]/20 transition-all duration-500 transform hover:-translate-y-3 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-[#3E92CC]/5 rounded-br-full -translate-x-12 -translate-y-12"></div>

                  <div className="w-16 h-16 rounded-2xl bg-[#3E92CC]/10 flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-500">
                    {getIcon(step.icon, "w-8 h-8 text-[#3E92CC] transition-colors duration-300")}
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-[#0A2463]">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-6xl h-[350px] md:h-[500px] rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl mt-20 border border-white/20 group">
          <Image
            src={content.image}
            alt="About Haleef Team"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0A2463]/60 via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl">
              <p className="text-white font-bold text-lg md:text-xl">فريق حليف - نصنع الفرق</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
