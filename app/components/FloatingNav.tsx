"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CreativeButton from "./CreativeButton";

/**
 * FloatingNav Component
 * A premium, glass-morphic capsule navigation bar.
 * Stays fixed at the top, floats gently with zero-gravity effect.
 */
export default function FloatingNav() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Intro Animation (Drop down from off-screen)
      // Starts invisible and slightly above (-150px)
      gsap.fromTo(
        navRef.current,
        { y: -150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 0.5, // Wait for page load slightly
        },
      );

      // 2. Idle "Floating" Animation (Continuous Bobbing)
      // Starts after intro completes
      gsap.to(navRef.current, {
        y: "+=10", // Move down 10px
        duration: 3,
        repeat: -1, // Infinite
        yoyo: true, // Go back and forth
        ease: "sine.inOut",
        delay: 1.7, // delay = intro delay + duration
      });
    },
    { scope: navRef },
  );

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none pt-6">
      <nav
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between gap-8 md:gap-12 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl shadow-slate-200/50"
        style={{ willChange: "transform" }}
      >
        {/* Logo (Right in RTL, Visual Start) */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-[#0A2463]">
            HALEIF
          </Link>
        </div>

        {/* Navigation Links (Center) */}
        <div className="hidden md:flex items-center gap-6 text-[#0A2463]/80 font-medium">
          {["الرئيسية", "الحلول", "عنا", "تواصل معنا"].map((item, i) => (
            <Link
              key={i}
              href="#"
              className="relative transition-colors hover:text-[#3E92CC] text-sm lg:text-base group"
            >
              {item}
              {/* Subtle underline hover effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3E92CC] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA Button (Left in RTL, Visual End) */}
        <div className="flex-shrink-0">
          <CreativeButton
            text="ابدأ الآن"
            size="sm"
            variant="primary"
            className="!py-2 !px-6 text-sm"
            reverse={false}
          />
        </div>
      </nav>
    </div>
  );
}
