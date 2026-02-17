"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { Menu } from "lucide-react";
import CreativeButton from "./CreativeButton";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

/**
 * FloatingNav Component
 * A premium, glass-morphic capsule navigation bar.
 * Stays fixed at the top, floats gently with zero-gravity effect.
 */
export default function FloatingNav({ logoUrl }: { logoUrl?: string | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const lenis = useLenis();

  useLenis(({ scroll }) => {
    // Hide on scroll down, show on scroll up
    // threshold of 10-20px to prevent flickering
    const delta = scroll - lastScrollY.current;

    if (scroll < 100) {
      setIsVisible(true);
    } else if (delta > 10) {
      setIsVisible(false);
    } else if (delta < -10) {
      setIsVisible(true);
    }

    lastScrollY.current = scroll;
  });

  const handleScroll = (e: React.MouseEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement>, id: string) => {
    setIsMenuOpen(false);
    if (!id || id === "#" || !id.startsWith("#")) return;

    const targetId = id.replace("#", "");
    const element = document.getElementById(targetId);

    // If section not found on current page, redirect to home with hash
    if (!element) {
      window.location.href = `/${id}`;
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (lenis) {
      lenis.scrollTo(id, {
        offset: -80,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  useGSAP(
    () => {
      // Idle "Floating" Animation (Continuous Bobbing)
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

  const navItems = [
    { label: "الرئيسية", href: "#home" },
    { label: "الخدمات", href: "#services" },
    { label: "أعمالنا", href: "#projects" },
    { label: "كيف نعمل", href: "#about" },
    { label: "من نحن", href: "/about" },
    { label: "تواصل معنا", href: "#contact" },
  ];

  return (
    <div
      className="fixed top-0 left-0 w-full flex justify-center z-100 pointer-events-none pt-4 md:pt-6 transition-transform duration-400 ease-in-out"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-150%)",
      }}
    >
      <nav
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between gap-4 md:gap-12 px-4 py-2 md:px-8 md:py-4 rounded-full bg-transparent md:bg-white/40 md:backdrop-blur-xl md:border md:border-white/40 md:shadow-2xl md:shadow-slate-200/50 w-full md:w-auto mx-4 md:mx-0"
        style={{ willChange: "transform" }}
      >
        {/* Logo (Logo on Right in RTL) */}
        <div className="shrink-0">
          <Link
            href="#home"
            onClick={(e: any) => handleScroll(e, "#home")}
            className=" relative block w-32 md:w-32  h-14"
          >
            {logoUrl ? (
              <Image src={logoUrl} alt="HALEIF" fill className="object-cover object-right" priority />
            ) : (
              <span className="text-xl md:text-2xl font-bold tracking-tighter text-[#0A2463]">HALEIF</span>
            )}
          </Link>
        </div>

        {/* Mobile Sheet Trigger (Menu on Left in RTL) */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 rounded-full text-[#0A2463] bg-white/80 shadow-sm border border-slate-100 transition-all duration-300 hover:bg-white active:scale-95">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white p-0 flex flex-col h-full border-l border-slate-100">
            <SheetHeader className="p-6 border-b border-slate-50">
              <SheetTitle className="flex items-center justify-between">
                {logoUrl ? (
                  <div className="relative h-10 w-32">
                    <Image src={logoUrl} alt="HALEIF" fill className="object-contain object-right" />
                  </div>
                ) : (
                  <span className="text-xl font-bold tracking-tighter text-[#0A2463]">HALEIF</span>
                )}
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col grow p-6 gap-6" dir="rtl">
              {navItems.map((item, i) => {
                const isHash = item.href.startsWith("#");
                if (isHash) {
                  return (
                    <button
                      key={i}
                      onClick={(e) => handleScroll(e, item.href)}
                      className="text-2xl font-bold text-[#0A2463] hover:text-[#3E92CC] transition-colors py-2 border-b border-slate-50 last:border-0 text-right bg-transparent border-none p-0"
                    >
                      {item.label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold text-[#0A2463] hover:text-[#3E92CC] transition-colors py-2 border-b border-slate-50 last:border-0 text-right"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="p-6 mt-auto border-t border-slate-50 flex flex-col gap-4">
              <CreativeButton
                text="ابدأ الآن"
                size="lg"
                variant="primary"
                className="w-full"
                href="#contact"
                onClick={(e: any) => handleScroll(e, "#contact")}
              />
              <p className="text-center text-slate-400 text-xs font-medium">نحول طموحك إلى واقع تقني</p>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-[#0A2463]/80 font-medium">
          {navItems.map((item, i) => {
            const isHash = item.href.startsWith("#");
            if (isHash) {
              return (
                <button
                  key={i}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="relative transition-colors hover:text-[#3E92CC] text-sm lg:text-base group bg-transparent border-none p-0 font-inherit"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3E92CC] transition-all duration-300 group-hover:w-full" />
                </button>
              );
            }
            return (
              <Link
                key={i}
                href={item.href}
                className="relative transition-colors hover:text-[#3E92CC] text-sm lg:text-base group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3E92CC] transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block shrink-0">
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
  );
}
