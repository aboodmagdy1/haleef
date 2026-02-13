"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import CreativeButton from "./CreativeButton";

/**
 * FloatingNav Component
 * A premium, glass-morphic capsule navigation bar.
 * Stays fixed at the top, floats gently with zero-gravity effect.
 */
export default function FloatingNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLElement> | React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(id, {
        offset: -50,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  useGSAP(
    () => {
      // 1. Intro Animation (Drop down from off-screen)
      gsap.fromTo(
        navRef.current,
        { y: -150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 0.5,
        },
      );

      // 2. Idle "Floating" Animation (Continuous Bobbing)
      gsap.to(navRef.current, {
        y: "+=10",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.7,
      });
    },
    { scope: navRef },
  );

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(menuOverlayRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        y: -100,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isMenuOpen]);

  const navItems = [
    { label: "الرئيسية", href: "#home" },
    { label: "الخدمات", href: "#services" },
    { label: "أعمالنا", href: "#projects" },
    { label: "من نحن", href: "#about" },
    { label: "تواصل معنا", href: "#contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none pt-4 md:pt-6">
        <nav
          ref={navRef}
          className="pointer-events-auto flex items-center justify-between gap-4 md:gap-12 px-4 py-2 md:px-8 md:py-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl shadow-slate-200/50"
          style={{ willChange: "transform" }}
        >
          {/* Burger Toggle (Mobile Only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#0A2463] p-1.5 bg-white/50 rounded-full hover:bg-white transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="#home"
              onClick={(e) => handleScroll(e, "#home")}
              className="text-xl md:text-2xl font-bold tracking-tighter text-[#0A2463]"
            >
              HALEIF
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-[#0A2463]/80 font-medium">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="relative transition-colors hover:text-[#3E92CC] text-sm lg:text-base group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3E92CC] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="shrink-0">
            <CreativeButton
              text="ابدأ الآن"
              size="sm"
              variant="primary"
              className="py-1.5! px-4! md:py-2! md:px-6! text-xs md:text-sm"
              href="#contact"
              onClick={(e: any) => handleScroll(e, "#contact")}
            />
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 bg-[#0A2463]/95 backdrop-blur-2xl md:hidden opacity-0 pointer-events-none -translate-y-[100px] flex flex-col items-center justify-center p-8 space-y-12"
        dir="rtl"
      >
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-3xl font-black text-white hover:text-blue-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <CreativeButton
          text="ابدأ الآن"
          size="lg"
          variant="secondary"
          className="w-full max-w-xs"
          href="#contact"
          onClick={(e: any) => handleScroll(e, "#contact")}
        />

        <div className="mt-8 text-white/40 font-bold tracking-widest text-xl">HALEIF</div>
      </div>
    </>
  );
}
