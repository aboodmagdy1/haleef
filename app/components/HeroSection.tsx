"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "@/components/SplitText";
import CreativeButton from "./CreativeButton";

gsap.registerPlugin(ScrollTrigger);

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const defaultHeroData: HeroData = {
  title: "حليف تقني",
  subtitle: "نبتكر حلولاً رقمية تتجاوز التوقعات، لنبني معك مستقبلاً تقنياً يخدم طموحك.",
  ctaText: "ابدأ رحلتك معنا",
  ctaLink: "#contact",
};

interface HeroSectionProps {
  data?: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const content = data || defaultHeroData;
  const containerRef = useRef<HTMLElement>(null);
  const leftArmRef = useRef<HTMLDivElement>(null);
  const rightArmRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const waveLeftRef = useRef<HTMLDivElement>(null);
  const waveRightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 0. Entrance Animation (Arms pop in after text)
      gsap.from(leftArmRef.current, {
        x: -150,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "back.out(1.7)",
      });

      gsap.from(rightArmRef.current, {
        x: 150,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "back.out(1.7)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500",
          scrub: 1,
        },
      });

      // 1. Handshake Animation
      tl.to(
        leftArmRef.current,
        {
          xPercent: 12,
          ease: "power1.out",
        },
        0,
      );

      tl.to(
        rightArmRef.current,
        {
          xPercent: -12,
          ease: "power1.out",
        },
        0,
      );

      // Waves Animation
      if (waveLeftRef.current) {
        tl.to(
          waveLeftRef.current,
          {
            ease: "none",
            width: "50vw",
          },
          0,
        );
      }
      if (waveRightRef.current) {
        tl.to(
          waveRightRef.current,
          {
            width: "50vw",
            ease: "none",
          },
          0,
        );
      }
    },
    { scope: containerRef, dependencies: [content] },
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[400px] flex flex-col items-center justify-center bg-[#F8FAFC]"
    >
      <style jsx global>{`
        .split-word {
          padding-bottom: 2.1rem !important;
          display: inline-block;
          will-change: transform, opacity;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[40dvh] bg-linear-to-b from-blue-100/40 via-blue-50/90 to-transparent" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        {/* Left Arm (Robot) */}
        <div
          ref={leftArmRef}
          className="absolute left-[-12%] md:left-[-7vw] w-[65vw] md:w-[55vw] h-[35dvh] flex items-center justify-end z-20"
          style={{ top: "35%", transform: "translateY(-35%)" }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/robotleft.png"
              alt="Robot Hand"
              fill
              className="object-contain object-right drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Right Arm (Man) */}
        <div
          ref={rightArmRef}
          className="absolute right-[-12%] md:right-[-7vw] w-[65vw] md:w-[55vw] h-[35dvh] flex items-center justify-start z-10"
          style={{ top: "35%", transform: "translateY(-35%)" }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/manright.png"
              alt="Man Hand"
              fill
              className="object-contain object-left drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div
        ref={titleRef}
        className="absolute bottom-[10%] md:bottom-[4%] w-full text-center z-20 flex flex-col items-center px-4"
      >
        <div className="overflow-hidden">
          <SplitText
            text={content.title}
            className="text-4xl sm:text-6xl md:text-8xl font-bold text-[#0A2463] tracking-tight inline-block drop-shadow-sm pb-2"
            delay={0}
            duration={1.3}
            splitType="words"
            spanclassname="!pb-6"
            from={{ y: 120 }}
            to={{ y: 0 }}
          />
        </div>

        <div className="max-w-2xl mx-auto overflow-hidden" style={{ direction: "rtl" }}>
          <SplitText
            text={content.subtitle}
            className="text-[#0A2463]  mt-2 text-sm sm:text-lg md:text-2xl font-semibold leading-relaxed inline-block"
            delay={100}
            duration={0.5}
            splitType="words"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.8s", opacity: 0, animationFillMode: "forwards" }}
        >
          <CreativeButton
            text={content.ctaText}
            href={content.ctaLink}
            variant="primary"
            size="lg"
            reverse={true}
            className="text-lg px-12 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Waves Decorations */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div ref={waveLeftRef} className="absolute top-0 left-0 w-[40vw] md:w-[40vw] h-auto will-change-transform">
          <Image
            src="/wavetopleft.svg"
            alt="Wave Top Left"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>

        <div ref={waveRightRef} className="absolute bottom-0 right-0 w-[40vw] md:w-[40vw] h-auto will-change-transform">
          <Image
            src="/wavebottomright.svg"
            alt="Wave Bottom Right"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
