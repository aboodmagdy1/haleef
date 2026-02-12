"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft } from "lucide-react";
import InfiniteMarquee from "./InfiniteMarquee";

export interface ProjectData {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  badges: string[];
  desktopMockup: string;
  phoneMockup: string;
  bgColor: string;
  accentColor: string;
  marqueeWords: string[];
  marqueeBg: string;
  stats: { label: string; value: string }[];
}

export const defaultProjects: ProjectData[] = [
  {
    id: 1,
    name: "IQ Academy",
    subtitle: "منصة تعليمية متكاملة",
    description: "منصة تعليمية تخدم طالبات جامعة الأميرة نورة. تجربة تعليمية سلسة تدعم آلاف الطلاب.",
    badges: ["تعليم", "تصميم", "برمجة"],
    desktopMockup: "/pr2desktop.png",
    phoneMockup: "/iphonepro2.png",
    bgColor: "bg-[#F5F0E8]",
    accentColor: "#1E3A5F",
    marqueeWords: ["+1000 طالبة", "10 كليات", "40 مادة", "4 أشهر"],
    marqueeBg: "bg-gradient-to-r from-[#1E3A5F] to-[#C8A951]",
    stats: [
      { label: "طالبة نشطة", value: "+1000" },
      { label: "مادة دراسية", value: "40" },
    ],
  },
  {
    id: 2,
    name: "Crawleo",
    subtitle: "محرك زحف ذكي",
    description: "عزّز تطبيقاتك بقدرات زحف الويب الرائدة. واجهة API بسيطة للبحث الفوري واستخراج البيانات.",
    badges: ["ذكاء اصطناعي", "API", "SAAS"],
    desktopMockup: "/pr1desktop.png",
    phoneMockup: "/iphonepro1.png",
    bgColor: "bg-[#0D0B1A]",
    accentColor: "#A855F7",
    marqueeWords: ["بحث فوري", "زحف عميق", "بيانات منظمة", "أداء خارق"],
    marqueeBg: "bg-gradient-to-r from-[#7C3AED] to-[#EC4899]",
    stats: [
      { label: "استجابة", value: "ms 50" },
      { label: "دقة بيانات", value: "99%" },
    ],
  },
];

interface ProjectsSectionProps {
  data?: ProjectData[];
}

const ProjectsSection = ({ data }: ProjectsSectionProps) => {
  console.log(data);
  const projects = data && data.length > 0 ? data : defaultProjects;
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getBadgeStyle = (badge: string) => {
    const b = badge.toLowerCase();
    if (b.includes("branding") || b.includes("هوية")) return "border-yellow-400 bg-yellow-50 text-yellow-700";
    if (b.includes("design") || b.includes("تصميم") || b.includes("واجهات"))
      return "border-orange-400 bg-orange-50 text-orange-700";
    if (b.includes("dev") || b.includes("برمجة") || b.includes("تكنولوجيا"))
      return "border-purple-400 bg-purple-50 text-purple-700";
    if (b.includes("content") || b.includes("محتوى") || b.includes("تسويق"))
      return "border-cyan-400 bg-cyan-50 text-cyan-700";
    return "border-slate-300 bg-slate-50 text-slate-600";
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!pinContainerRef.current) return;
        const cards = cardRefs.current.filter(Boolean);
        if (cards.length === 0) return;

        // Initial Setup: Stack cards
        cards.forEach((card, i) => {
          gsap.set(card, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: i + 1,
            y: i === 0 ? 0 : "100%",
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top top",
            end: `+=${projects.length * 45}%`,
            pin: true,
            scrub: 1,
          },
        });

        for (let i = 1; i < cards.length; i++) {
          tl.to(cards[i], { y: 0, duration: 1, ease: "none" }, i - 1);
        }

        desktopRefs.current.forEach((desktop) => {
          if (!desktop) return;
          gsap.fromTo(
            desktop,
            { x: -100, scale: 0.95 },
            {
              x: -30,
              scale: 1.25,
              ease: "none",
              scrollTrigger: {
                trigger: desktop.closest(".project-card"),
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });

        phoneRefs.current.forEach((phone) => {
          if (!phone) return;
          gsap.fromTo(
            phone,
            { x: 100, scale: 0.95 },
            {
              x: -30,
              scale: 1.25,
              ease: "none",
              scrollTrigger: {
                trigger: phone.closest(".project-card"),
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
      });

      mm.add("(max-width: 1023px)", () => {
        const cards = cardRefs.current.filter(Boolean);
        cards.forEach((card) => {
          gsap.set(card, {
            position: "relative",
            top: "auto",
            left: "auto",
            width: "100%",
            height: "auto",
            y: 0,
            zIndex: 1,
            clearProps: "all",
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [projects] },
  );

  return (
    <section id="projects" ref={sectionRef} className="relative bg-white" dir="rtl">
      {/* Section Header */}
      <div className="py-12 md:py-20 -mt-20 container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-6 text-blue-600 font-bold tracking-wider text-sm uppercase">
          <span className="w-8 h-[2px] bg-blue-600"></span>
          03 — أعمالنا
          <span className="w-8 h-[2px] bg-blue-600"></span>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#0A2463] leading-tight">
            مشاريع تتحدث عن <span className="text-blue-600">نفسها.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            نحول التحديات لقصص نجاح رقمية. كل مشروع هو رحلة شراكة بدأت بفكرة وانتهت بمنتج يغير قواعد اللعبة في مجاله.
          </p>
        </div>
      </div>

      {/* Pinned Container */}
      <div ref={pinContainerRef} className="relative w-full h-auto lg:h-screen overflow-visible lg:overflow-hidden">
        {projects.map((project, index) => {
          const isDark =
            project.bgColor.includes("0D0B1A") ||
            project.bgColor.includes("000000") ||
            project.bgColor.includes("0A0A") ||
            project.bgColor.includes("0505") ||
            project.bgColor.includes("dark") ||
            project.bgColor.includes("black");

          return (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`project-card relative lg:absolute inset-0 w-full h-auto lg:h-full ${project.bgColor} flex flex-col justify-start lg:justify-between overflow-hidden py-12 lg:py-0`}
            >
              {/* Top Marquee */}
              <div className="w-full z-20 relative pt-4 mb-8 lg:mb-0">
                <InfiniteMarquee
                  textArr={project.marqueeWords}
                  bg={project.marqueeBg}
                  textColor="text-white"
                  speed={20}
                  rotate={-1}
                  separator="✦"
                  fontSize="text-2xl md:text-4xl"
                  className="py-3"
                />
              </div>

              {/* Main Content Area */}
              <div className="flex-1 w-full flex flex-col lg:flex-row items-center justify-center relative z-10 px-4 gap-8 lg:gap-0">
                {/* Mockups Container (Mobile: Top, Desktop: Sides) */}
                <div className="relative w-full h-[310px] md:h-[550px] lg:absolute lg:inset-0 lg:h-full order-1 lg:order-0 pointer-events-none">
                  {/* Desktop Mockup */}
                  <div
                    ref={(el) => {
                      desktopRefs.current[index] = el;
                    }}
                    className="absolute top-1/2 -translate-y-1/2 -left-[29%] md:left-[8%] lg:-left-[10%] w-[120vw] md:w-[65vw] lg:w-[65vw] aspect-video z-10 drop-shadow-2xl"
                  >
                    <Image
                      src={project.desktopMockup}
                      alt={`${project.name} Desktop`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>

                  {/* Phone Mockup */}
                  <div
                    ref={(el) => {
                      phoneRefs.current[index] = el;
                    }}
                    className="absolute top-1/2 -translate-y-1/2 -right-[23%] md:right-[12%] lg:right-[-5%] w-[70vw] md:w-[35vw] lg:w-[35vw] aspect-9/19 z-20 drop-shadow-2xl"
                  >
                    <Image
                      src={project.phoneMockup}
                      alt={`${project.name} Mobile`}
                      fill
                      className="object-contain lg:rotate-[-5deg]"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Content Center */}
                <div className="relative z-30 flex flex-col items-center text-center max-w-xl mx-auto order-2 lg:order-0">
                  {/* Badges */}
                  <div className="flex gap-2 mb-6 justify-center flex-wrap">
                    {project.badges.map((b, i) => (
                      <span
                        key={i}
                        className={`text-sm font-bold px-5 py-1.5 rounded-full border-2 shadow-sm transition-all hover:scale-105 ${getBadgeStyle(b)}`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <h2
                    className={`text-4xl md:text-7xl font-black mb-3 tracking-tighter ${isDark ? "text-white" : "text-[#0A2463]"}`}
                  >
                    {project.name}
                  </h2>
                  <p className={`text-xl md:text-2xl font-bold mb-4 ${isDark ? "text-white/80" : "text-slate-600"}`}>
                    {project.subtitle}
                  </p>
                  <p
                    className={`text-base md:text-lg leading-relaxed mb-8 max-w-lg ${isDark ? "text-white/60" : "text-slate-500"}`}
                  >
                    {project.description}
                  </p>

                  {/* CTA Button */}
                  <div className="mb-10">
                    <button
                      className={`group flex items-center gap-3 px-8 py-4 rounded-full border-2 font-bold transition-all duration-300 ${isDark ? "border-white text-white hover:bg-white hover:text-black" : "border-[#0A2463] text-[#0A2463] hover:bg-[#0A2463] hover:text-white"}`}
                    >
                      مشاهدة المشروع
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-8 md:gap-16 pt-8 border-t border-black/5 dark:border-white/5 w-full justify-center">
                    {(project.stats || []).map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-3xl md:text-4xl font-black ${isDark ? "text-white" : "text-[#0A2463]"}`}>
                          {stat.value}
                        </div>
                        <div
                          className={`text-xs md:text-sm font-bold uppercase tracking-wider mt-1 ${isDark ? "text-white/40" : "text-slate-400"}`}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
