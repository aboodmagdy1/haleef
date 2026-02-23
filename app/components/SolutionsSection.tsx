"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Sparkles,
  Palette,
  Smartphone,
  ShoppingBag,
  Rocket,
  Code,
  Globe,
  Monitor,
  Layout,
  PenTool,
  Search,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Heart,
  Star,
  Settings,
  Database,
  Cloud,
  Lock,
  BarChart,
  Megaphone,
  Target,
} from "lucide-react";
import CreativeButton from "./CreativeButton";
import InfiniteMarquee from "./InfiniteMarquee";

gsap.registerPlugin(ScrollTrigger);

const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  smartphone: Smartphone,
  palette: Palette,
  sparkles: Sparkles,
  shoppingbag: ShoppingBag,
  code: Code,
  globe: Globe,
  monitor: Monitor,
  layout: Layout,
  pentool: PenTool,
  search: Search,
  trendingup: TrendingUp,
  shield: Shield,
  zap: Zap,
  rocket: Rocket,
  users: Users,
  heart: Heart,
  star: Star,
  settings: Settings,
  database: Database,
  cloud: Cloud,
  lock: Lock,
  barchart: BarChart,
  megaphone: Megaphone,
  target: Target,
};

const getIcon = (iconName: string, className: string) => {
  const IconComponent = iconComponents[iconName?.toLowerCase()] || Smartphone;
  return <IconComponent className={className} />;
};

export interface ServiceData {
  id: number;
  title: string;
  description: string;
  features: string[];
  iconName: string;
  bg: string;
  border: string;
  text: string;
  dot: string;
}

export interface SolutionsIntroData {
  sectionLabel?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  paragraphs?: string[];
  ctaText?: string;
  ctaLink?: string;
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
  // مواقع إلكترونية
  {
    id: 5,
    title: "مواقع إلكترونية",
    description:
      "موقعك على الويب هو النقطة الأولى للعميل ليطوعها. نصمم ونبرمج مواقع إلكترونية متطورة تميزك في السوق وتعكس احترافيتك من أول نظرة.",
    features: ["إبراز منتجاتك", "تسويق مباشر", "تحليل الأداء"],
    iconName: "globe",
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-900",
    dot: "bg-sky-500",
  },
];

const defaultIntro: SolutionsIntroData = {
  sectionLabel: "02 — الحل",
  title: "كيف نصنع",
  titleHighlight: "الفرق؟",
  subtitle: "الأمر بسيط.. نحن نهتم بالتفاصيل التي لا يراها غيرنا.",
  paragraphs: [
    "أنا أتولى الهيكل، التصميم، والتنفيذ، وأحرص في النهاية أن كل شيء يعمل تماماً كما تمنيت.",
    "نحول الأفكار المعقدة إلى حلول رقمية بسيطة، جذابة، وقابلة للنمو.",
  ],
  ctaText: "احجز استشارتك المجانية",
  ctaLink: "#contact",
};

interface SolutionsSectionProps {
  data?: ServiceData[];
  introData?: SolutionsIntroData | null;
}

const SolutionsSection = ({ data, introData }: SolutionsSectionProps) => {
  const services = data && data.length > 0 ? data : defaultServices;
  const intro = introData || defaultIntro;
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!pinContainerRef.current || !cardsContainerRef.current) return;
      const cards = cardRefs.current.filter((el) => el !== null);
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();

      // ===========================
      // 🖥️ DESKTOP ANIMATION (Pinning & Stacking)
      // ===========================
      mm.add("(min-width: 1024px)", () => {
        // 1. Left Content Entrance
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

        // 2. Card Calculations
        const gap = 40;
        const positions: number[] = [];
        let currentY = 0;

        cards.forEach((card) => {
          positions.push(currentY);
          currentY += (card as HTMLElement).offsetHeight + gap;
        });

        const maxCardHeight = Math.max(...cards.map((c) => (c as HTMLElement).offsetHeight));
        gsap.set(cardsContainerRef.current, { height: maxCardHeight + gap });

        // Set initial state for stacking
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

        // 3. Marquee Entrance
        gsap.set(marqueeContainerRef.current, { y: 200, opacity: 0 });

        // 4. The Pinning Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top top",
            end: `+=${services.length * 60}%`,
            pin: true,
            scrub: 1,
          },
        });

        // Animate cards stacking up
        for (let i = 1; i < cards.length; i++) {
          tl.to(cards[i], { y: 0, duration: 1, ease: "none" }, i - 1);
          for (let j = i + 1; j < cards.length; j++) {
            tl.to(cards[j], { y: positions[j - i], duration: 1, ease: "none" }, i - 1);
          }
        }

        tl.to(marqueeContainerRef.current, { y: -10, opacity: 1, duration: 1, ease: "power2.out" }, ">");
      });

      // ===========================
      // 📱 MOBILE ANIMATION (Natural Scroll - No Pinning)
      // ===========================
      mm.add("(max-width: 1023px)", () => {
        // Ensure container has auto height for natural flow
        gsap.set(cardsContainerRef.current, { height: "auto" });
        gsap.set(leftContentRef.current, { opacity: 1, x: 0 });

        // Reset cards to natural layout (relative)
        cards.forEach((card) => {
          gsap.set(card, {
            position: "relative",
            top: "auto",
            left: "auto",
            y: 0,
            zIndex: 1,
            width: "100%",
          });
        });

        // Simple fade-up animation for each card as you scroll
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%", // Triggers when top of card hits 85% of viewport
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [services] },
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-white -mt-80 lg:-mt-32 text-slate-900 z-10 overflow-hidden pt-10 lg:pt-0"
    >
      <div className="">
        {/* On Mobile: auto height. On Desktop: h-screen for pinning */}
        <div
          ref={pinContainerRef}
          className="relative w-full h-auto lg:h-[calc(100dvh+30px)] flex flex-col justify-center lg:pb-[calc(max(3rem,12vh))]"
        >
          <div className="grid grid-cols-1 container mx-auto px-6 md:px-8 lg:grid-cols-2 w-full items-start lg:items-center grow gap-8 lg:gap-0">
            {/* Left Side: Text */}
            <div className="flex flex-col justify-center lg:py-0 order-1">
              <div ref={leftContentRef}>
                <div className="border-r-2 md:border-r-4 border-blue-600 pr-4 md:pr-6 mb-[calc(min(2rem,4vh))]">
                  <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold tracking-wider text-xs md:text-sm uppercase">
                    <span className="w-6 md:w-8 h-[2px] bg-blue-600"></span>
                    {intro.sectionLabel}
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-6xl font-black mb-3 md:mb-4 leading-tight">
                    {intro.title} <span className="text-blue-600">{intro.titleHighlight}</span>
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-slate-500 font-medium">{intro.subtitle}</p>
                </div>
                <div className="space-y-[calc(min(1.5rem,3vh))] text-base md:text-lg text-slate-600 leading-relaxed max-w-lg mb-[calc(min(2.5rem,5vh))]">
                  {intro.paragraphs?.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <div>
                  <CreativeButton
                    text="استكشف حلولنا الرقمية"
                    icon={<Rocket className="w-5 h-5" />}
                    variant="primary"
                    reverse={true}
                    size="lg"
                    href="/services"
                    className="w-full md:w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Cards */}
            <div className="flex items-center justify-center order-2 pb-10 lg:pb-0">
              <div ref={cardsContainerRef} className="relative w-full max-w-xl flex flex-col gap-6 lg:block">
                {services.map((service, index) => (
                  <div
                    key={service.id || index}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={`service-card w-full p-6 md:p-8 lg:p-10 rounded-3xl border-2 shadow-xl flex flex-col gap-4 lg:gap-5 ${service.bg} ${service.border}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                        {getIcon(service.iconName, `w-5 h-5 md:w-8 md:h-8 ${service.text}`)}
                      </div>
                      <h3 className={`text-lg md:text-2xl lg:text-3xl font-bold ${service.text}`}>{service.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm md:text-base lg:text-lg leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-slate-700 font-medium text-sm md:text-base"
                        >
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

          <div ref={marqueeContainerRef} className="relative w-full lg:absolute lg:bottom-0 lg:left-0">
            <div className="pb-10 lg:pb-0">
              <InfiniteMarquee
                textArr={["مشاريعنا", "أعمالنا", "إبداعنا", "إنجازاتنا"]}
                bg="bg-gradient-to-r from-[#3E92CC] to-[#0A2463]"
                textColor="text-white"
                speed={25}
                rotate={-2}
                separator="✦"
                fontSize="text-5xl md:text-7xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 
        Tailwind 4 Class Triggers: 
        Since these classes come from Sanity dynamically, we need to 'mention' them 
        here so the compiler includes them in the bundle.
      */}
      <div className="hidden bg-sky-50 border-sky-200 text-sky-900 bg-sky-500 bg-indigo-50 border-indigo-200 text-indigo-900 bg-indigo-500 bg-rose-50 border-rose-200 text-rose-900 bg-rose-500 bg-amber-50 border-amber-200 text-amber-900 bg-amber-500 bg-emerald-50 border-emerald-200 text-emerald-900 bg-emerald-500" />
    </section>
  );
};

export default SolutionsSection;
