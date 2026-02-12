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
        <div className="max-w-4xl text-center mb-12 md:mb-20 flex flex-col items-center">
          <div className="flex items-center gap-2 text-[#3E92CC] font-bold tracking-wider text-sm uppercase mb-6">
            <span className="w-8 h-[2px] bg-[#3E92CC]"></span>
            {content.subtitle}
            <span className="w-8 h-[2px] bg-[#3E92CC]"></span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4 text-[#0A2463]">
            {content.title.includes("فكرتك") ? (
              <>
                {content.title.split("فكرتك")[0]} <span className="text-[#3E92CC]">فكرتك</span>{" "}
                {content.title.split("فكرتك")[1]}
              </>
            ) : (
              content.title
            )}
          </h2>
          <p className="text-slate-500 text-base md:text-xl max-w-2xl">{content.description}</p>
        </div>

        <div className="relative w-full max-w-6xl">
          <div className="hidden lg:block absolute top-8 left-0 w-full h-[2px] bg-slate-200 z-0">
            <div ref={lineRef} className="absolute inset-0 bg-[#3E92CC] w-full h-full origin-right scale-x-0"></div>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {content.steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-2 md:border-4 border-[#3E92CC] flex items-center justify-center text-lg md:text-xl font-bold text-[#3E92CC] mb-6 md:mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative">
                  {idx + 1}
                </div>

                <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 md:p-8 hover:shadow-xl hover:border-[#3E92CC]/20 transition-all duration-300 transform hover:-translate-y-2 shadow-sm">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#3E92CC]/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#3E92CC] transition-all duration-300">
                    {getIcon(
                      step.icon,
                      "w-6 h-6 md:w-8 md:h-8 text-[#3E92CC] group-hover:text-white transition-colors duration-300",
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#0A2463]">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-6xl lg:h-130 lg:aspect-auto aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mt-10 border border-slate-200">
          <Image
            src={content.image}
            alt="About Haleef Team"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0A2463]/80 via-transparent to-transparent opacity-40"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
