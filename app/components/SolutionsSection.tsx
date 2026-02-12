"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Palette, Smartphone, ShoppingBag, ArrowLeft, Code } from "lucide-react";
import CreativeButton from "./CreativeButton";
import InfiniteMarquee from "./InfiniteMarquee";

gsap.registerPlugin(ScrollTrigger);

// Helper to map icon names to components
const getIcon = (iconName: string, className: string) => {
  switch (iconName?.toLowerCase()) {
    case "smartphone":
      return <Smartphone className={className} />;
    case "palette":
      return <Palette className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "shoppingbag":
      return <ShoppingBag className={className} />;
    case "code":
      return <Code className={className} />;
    default:
      return <Smartphone className={className} />;
  }
};

export interface ServiceData {
  id: number;
  title: string;
  description: string;
  features: string[];
  iconName: string; // From Sanity
  bg: string;
  border: string;
  text: string;
  dot: string;
}

export const defaultServices: ServiceData[] = [
  {
    id: 1,
    title: "تطبيقات الجوال",
    description:
      "تطبيقك بجيب كل عميل. نصمم ونبرمج تطبيقات (iOS & Android) بأداء طيارة وتجربة استخدام ما توقف. فكرتك بنحولها لواقع ملموس يخدم بيزنسك صح.",
    features: ["React Native & Flutter", "أداء سريع ومستقر", "رفع على المتاجر"],
    iconName: "smartphone",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-900",
    dot: "bg-indigo-500",
  },
  {
    id: 2,
    title: "تصميم الواجهات (UI/UX)",
    description:
      "واجهة تفتح النفس وتخلي العميل يطول بموقعك. ندرس سلوك جمهورك ونصمم تجربة سهلة وسلسة تقوده للشراء بدون أي تشتيت.",
    features: ["تصميم عصري وجذاب", "تحليل رحلة العميل", "نماذج تفاعلية (Prototypes)"],
    iconName: "palette",
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-900",
    dot: "bg-rose-500",
  },
  {
    id: 3,
    title: "الهوية والجرافيك",
    description:
      "هويتك هي اللي بتعلم في راس العميل. بنسويلك شعار وهوية بصرية كاملة تميزك في السوق وتعكس احترافيتك من أول نظرة.",
    features: ["شعارات مبتكرة", "هوية بصرية كاملة", "تصاميم سوشيال ميديا"],
    iconName: "sparkles",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-900",
    dot: "bg-amber-500",
  },
  {
    id: 4,
    title: "متاجر سلة وزد",
    description:
      "تبي تبيع أونلاين بسرعة؟ نجهز لك متجرك على سلة أو زد بتصميم احترافي، ونربط لك الدفع والشحن، ونسلمك ياه جاهز تستقبل طلبات.",
    features: ["تجهيز كامل للمتجر", "تصميم بنرات وواجهات", "ربط الخدمات والتطبيقات"],
    iconName: "shoppingbag",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
    dot: "bg-emerald-500",
  },
];

interface SolutionsSectionProps {
  data?: ServiceData[];
}

const SolutionsSection = ({ data }: SolutionsSectionProps) => {
  const services = data && data.length > 0 ? data : defaultServices;
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Entrance Animation
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
          },
        },
      );

      const mm = gsap.matchMedia();

      // Desktop: Apply stacking and pinning
      mm.add("(min-width: 1024px)", () => {
        if (!pinContainerRef.current || !cardsContainerRef.current) return;
        const cards = cardRefs.current.filter((el) => el !== null);
        if (cards.length === 0) return;

        const gap = 40;
        const positions: number[] = [];
        let currentY = 0;

        cards.forEach((card) => {
          positions.push(currentY);
          currentY += (card as HTMLElement).offsetHeight + gap;
        });

        const maxCardHeight = Math.max(...cards.map((c) => (c as HTMLElement).offsetHeight));
        gsap.set(cardsContainerRef.current, { height: maxCardHeight + gap });

        cards.forEach((card, i) => {
          gsap.set(card, {
            y: positions[i],
            zIndex: i + 1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          });
        });

        gsap.set(marqueeContainerRef.current, { y: 200, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top top",
            end: `+=${services.length * 60}%`,
            pin: true,
            scrub: 1,
          },
        });

        for (let i = 1; i < cards.length; i++) {
          tl.to(cards[i], { y: 0, duration: 1, ease: "none" }, i - 1);
          for (let j = i + 1; j < cards.length; j++) {
            tl.to(cards[j], { y: positions[j - i], duration: 1, ease: "none" }, i - 1);
          }
        }

        tl.to(marqueeContainerRef.current, { y: -100, opacity: 1, duration: 1, ease: "power2.out" }, ">");
      });

      // Mobile: No GSAP manipulation needed - let CSS handle it
      // Cards are already in normal flow by default

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [services] },
  );

  return (
    <section id="services" ref={sectionRef} className="relative bg-white text-slate-900 lg:-mt-32 z-10 overflow-hidden">
      <div className="">
        <div ref={pinContainerRef} className="relative w-full min-h-screen lg:h-screen flex flex-col justify-center">
          <div className="grid grid-cols-1 container mx-auto px-6 md:px-8 lg:grid-cols-2 w-full items-center grow gap-4 lg:gap-0">
            <div className="flex flex-col justify-center pt-24 pb-12 lg:py-0 order-1">
              <div ref={leftContentRef}>
                <div className="border-r-2 md:border-r-4 border-blue-600 pr-4 md:pr-6 mb-6 md:mb-8">
                  <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold tracking-wider text-xs md:text-sm uppercase">
                    <span className="w-6 md:w-8 h-[2px] bg-blue-600"></span>
                    02 — الحل
                  </div>
                  <h2 className="text-3xl md:text-6xl font-black mb-3 md:mb-4 leading-tight">
                    كيف نصنع <span className="text-blue-600">الفرق؟</span>
                  </h2>
                  <p className="text-lg md:text-xl text-slate-500 font-medium">
                    الأمر بسيط.. نحن نهتم بالتفاصيل التي لا يراها غيرنا.
                  </p>
                </div>
                <div className="space-y-4 md:space-y-6 text-base md:text-lg text-slate-600 leading-relaxed max-w-lg mb-8 md:mb-10">
                  <p>أنا أتولى الهيكل، التصميم، والتنفيذ، وأحرص في النهاية أن كل شيء يعمل تماماً كما تمنيت.</p>
                  <p>نحول الأفكار المعقدة إلى حلول رقمية بسيطة، جذابة، وقابلة للنمو.</p>
                </div>
                <div>
                  <CreativeButton
                    text="احجز استشارتك المجانية"
                    icon={<ArrowLeft className="w-5 h-5" />}
                    variant="secondary"
                    reverse={true}
                    size="lg"
                    className="w-full md:w-auto"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center order-2">
              <div ref={cardsContainerRef} className="relative w-full max-w-xl">
                {services.map((service, index) => (
                  <div
                    key={service.id || index}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={`service-card lg:my-0 my-5 w-full p-8 md:p-10 rounded-3xl border-2 shadow-2xl flex flex-col gap-5 ${service.bg} ${service.border}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                        {getIcon(service.iconName, `w-8 h-8 ${service.text.replace("text-", "text-")}`)}
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-bold ${service.text}`}>{service.title}</h3>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed">{service.description}</p>
                    <ul className="flex flex-col gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                          <span className={`w-2 h-2 rounded-full ${service.dot} shrink-0`}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={marqueeContainerRef} className="relative w-full mt-auto">
            <div className="pb-10">
              <InfiniteMarquee
                textArr={["مشاريعنا", "أعمالنا", "إبداعنا", "إنجازاتنا"]}
                bg="bg-gradient-to-r from-[#3E92CC] to-[#0A2463]"
                textColor="text-white"
                speed={25}
                rotate={-2}
                separator="✦"
                fontSize="text-5xl md:text-7xl"
                className="shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
