"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { Menu } from "lucide-react";
import CreativeButton from "./CreativeButton";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

/**
 * FloatingNav Component
 * A premium, glass-morphic capsule navigation bar.
 * Stays fixed at the top, floats gently with zero-gravity effect.
 */
export default function FloatingNav({ logoUrl }: { logoUrl?: string | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLElement> | React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsMenuOpen(false);
    if (!id.startsWith("#")) return;

    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(id, {
        offset: -50,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const targetId = id.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
    <div className="fixed top-0 left-0 w-full flex justify-center z-100 pointer-events-none pt-4 md:pt-6">
      <nav
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between gap-4 md:gap-12 px-4 py-2 md:px-8 md:py-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl shadow-slate-200/50"
        style={{ willChange: "transform" }}
      >
        {/* Mobile Sheet Trigger */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 rounded-full text-[#0A2463] bg-white/50 hover:bg-white transition-all duration-300">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white p-0 flex flex-col h-full border-l border-slate-100">
            <SheetHeader className="p-6 border-b border-slate-50">
              <SheetTitle className="flex items-center justify-between">
                {logoUrl ? (
                  <Image src={logoUrl} alt="HALEIF" width={100} height={36} className="h-8 w-auto object-contain" />
                ) : (
                  <span className="text-xl font-bold tracking-tighter text-[#0A2463]">HALEIF</span>
                )}
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col grow p-6 gap-6" dir="rtl">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-2xl font-bold text-[#0A2463] hover:text-[#3E92CC] transition-colors py-2 border-b border-slate-50 last:border-0 text-right"
                >
                  {item.label}
                </a>
              ))}
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

        {/* Logo */}
        <div className="shrink-0">
          <Link href="#home" onClick={(e) => handleScroll(e, "#home")} className="flex items-center">
            {logoUrl ? (
              <Image src={logoUrl} alt="HALEIF" width={100} height={36} className="h-6 md:h-8 w-auto object-contain" />
            ) : (
              <span className="text-xl md:text-2xl font-bold tracking-tighter text-[#0A2463]">HALEIF</span>
            )}
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
  );
}
