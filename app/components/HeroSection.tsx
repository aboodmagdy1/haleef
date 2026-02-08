"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "@/components/SplitText";
import CreativeButton from "./CreativeButton";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftArmRef = useRef<HTMLDivElement>(null);
  const rightArmRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const waveLeftRef = useRef<HTMLDivElement>(null);
  const waveRightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 0. Entrance Animation (Arms pop in after text)
      gsap.from(leftArmRef.current, {
        x: -150,
        opacity: 0,
        duration: 1,
        delay: 0.6, // Wait for text
        ease: "back.out(1.7)",
      });

      gsap.from(rightArmRef.current, {
        x: 150,
        opacity: 0,
        duration: 1,
        delay: 0.6, // Wait for text
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

      // Waves Animation (Parallax)
      // Top Left moves slightly Down+Right (IN)
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
      // Bottom Right moves slightly Up+Left (IN)
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

      // 2. Parallax Icons
      if (iconsRef.current) {
        Array.from(iconsRef.current.children).forEach((icon, i) => {
          gsap.to(icon, {
            y: (i + 1) * -40,
            rotation: (i % 2 === 0 ? 1 : -1) * 20,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[#F8FAFC]"
    >

      {/* 0. Global Style for SplitText fixes */}
      <style jsx global>{`
        .split-word {
          padding-bottom: 1.5rem !important; /* pb-3 equivalent */
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

      {/* 2. The Horizontal Handshake */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Gradient for Navbar Glass Effect */}
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-blue-100/40 via-blue-50/90 to-transparent" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        {/* Left Arm Container (Robot) - Higher Z-Index */}
        <div
          ref={leftArmRef}
          className="absolute left-[-12%] md:left-[5%] w-[65vw] md:w-[45vw] h-[35vh] flex items-center justify-end z-20"
          style={{ top: "40%", transform: "translateY(-40%)" }}
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

        {/* Right Arm Container (Man) - Lower Z-Index */}
        <div
          ref={rightArmRef}
          className="absolute right-[-12%] md:right-[0%] w-[65vw] md:w-[45vw] h-[35vh] flex items-center justify-start z-10"
          style={{ top: "40%", transform: "translateY(-40%)" }}
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

      {/* 3. Text Content (Faster Animations) */}
      <div
        ref={titleRef}
        className="absolute bottom-[10%] md:bottom-[4%] w-full text-center z-20 flex flex-col items-center  px-4"
      >
        {/* Main Title */}
        <div className="overflow-hidden">
          <SplitText
            text="حليف تقني"
            className="text-4xl sm:text-6xl md:text-8xl font-bold text-[#0A2463] tracking-tight inline-block drop-shadow-sm pb-2"
            delay={0} // Immediate start
            duration={1.3} // Faster
            splitType="words"
            from={{ y: 120 }}
            to={{ y: 0 }}
          />
        </div>

        {/* Subtitle - Enhanced Contrast */}
        <div className="max-w-2xl mx-auto overflow-hidden " style={{ direction: "rtl" }}>
          <SplitText
            text="نبتكر حلولاً رقمية تتجاوز التوقعات، لنبني معك مستقبلاً تقنياً يخدم طموحك."
            className="text-[#0A2463] mt-2 text-sm sm:text-lg md:text-2xl font-semibold leading-relaxed inline-block"
            delay={100} // Minimal delay
            duration={0.5} // Faster
            splitType="words"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        {/* CTA Button */}
        <div
          className=" animate-fade-in-up"
          style={{ animationDelay: "0.8s", opacity: 0, animationFillMode: "forwards" }}
        >
          <CreativeButton
            text="ابدأ رحلتك معنا"
            href="#contact"
            variant="primary"
            size="lg"
            reverse={true} // Inverted: Solid Blue -> White
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

      {/* 4. New Wave Decoration Images (Animated) */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Top Left Wave */}
        <div ref={waveLeftRef} className="absolute top-0 left-0 w-[40vw] md:w-[40vw] h-auto will-change-transform">
          <Image
            src="/wavetopleft.svg"
            alt="Wave Top Left"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Bottom Right Wave */}
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
