"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter, Instagram, MessageCircle } from "lucide-react";
import { useLenis } from "lenis/react";

export interface FooterData {
  slogan: string[];
  navLinks: { label: string; href: string }[];
  location: string;
  email: string;
  phone: string;
  crNumber: string;
  socialLinks: { platform: string; href: string }[];
}

const defaultFooterData: FooterData = {
  slogan: ["تصميم.", "برمجة.", "محتوى."],
  navLinks: [
    { label: "من نحن", href: "/about" },
    { label: "خدماتنا", href: "#services" },
    { label: "أعمالنا", href: "#projects" },
    { label: "تواصل معنا", href: "#contact" },
  ],
  location: "المدينة المنورة ، المملكة العربية السعودية - متاح عن بعد",
  email: "haleeftech.cs@gmail.com",
  phone: "0559250966",
  crNumber: "7053578816",
  socialLinks: [
    { platform: "Instagram", href: "https://www.instagram.com/haleeftech?igsh=MTlnZTZuMm1ndTNuaQ%3D%3D&utm_source=qr" },
    { platform: "Linkedin", href: "#" },
    { platform: "X", href: "#" },
    { platform: "WhatsApp", href: "#" },
    { platform: "snapchat", href: "https://s.com/t/UWKY3obj" },
    { platform: "TikTok", href: "https://www.tiktok.com/@haleeftech?_r=1&_t=ZS-93pvPRaB4uj" },
  ],
};

const getSocialIcon = (platform: string) => {
  switch (platform.trim().toLowerCase()) {
    case "github":
      return <Github className="w-5 h-5" />;
    case "linkedin":
      return <Linkedin className="w-5 h-5" />;
    case "twitter":
      return <Twitter className="w-5 h-5" />;
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return <Instagram className="w-5 h-5" />;
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      );
    case "snapchat":
      return (
        <svg
          viewBox="0 0 48 48"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m24.0116,42.2697c3.8272-.0024,4.9669-1.6066,7.486-2.7237,2.2497-.9976,5.4694.5087,6.1373-2.1616h0c.0865-1.3801,2.513-1.1579,3.8742-2.0996,1.2418-.8591,1.3659-2.2361.0902-2.778-2.8877-1.2269-5.9232-3.9144-6.6578-6.7964-.4582-1.7978,5.2788-2.3506,4.0841-5.7402-.7049-2.0001-3.2379-1.2958-4.616-.8478.9182-7.1086-2.542-13.3923-10.4098-13.3923s-11.328,6.2837-10.4098,13.3923c-1.378-.448-3.911-1.1523-4.616.8478-1.1947,3.3896,4.5424,3.9424,4.0841,5.7402-.7346,2.882-3.77,5.5695-6.6578,6.7964-1.2757.542-1.1516,1.9189.0902,2.778,1.3612.9417,3.7878.7195,3.8742,2.0996h0c.6679,2.6703,3.8876,1.164,6.1373,2.1616,2.5191,1.1171,3.6588,2.7213,7.486,2.7237.0058,0,.0173,0,.0231,0Z" />
        </svg>
      );
    case "snapshat":
      return (
        <svg
          viewBox="0 0 48 48"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m24.0116,42.2697c3.8272-.0024,4.9669-1.6066,7.486-2.7237,2.2497-.9976,5.4694.5087,6.1373-2.1616h0c.0865-1.3801,2.513-1.1579,3.8742-2.0996,1.2418-.8591,1.3659-2.2361.0902-2.778-2.8877-1.2269-5.9232-3.9144-6.6578-6.7964-.4582-1.7978,5.2788-2.3506,4.0841-5.7402-.7049-2.0001-3.2379-1.2958-4.616-.8478.9182-7.1086-2.542-13.3923-10.4098-13.3923s-11.328,6.2837-10.4098,13.3923c-1.378-.448-3.911-1.1523-4.616.8478-1.1947,3.3896,4.5424,3.9424,4.0841,5.7402-.7346,2.882-3.77,5.5695-6.6578,6.7964-1.2757.542-1.1516,1.9189.0902,2.778,1.3612.9417,3.7878.7195,3.8742,2.0996h0c.6679,2.6703,3.8876,1.164,6.1373,2.1616,2.5191,1.1171,3.6588,2.7213,7.486,2.7237.0058,0,.0173,0,.0231,0Z" />
        </svg>
      );

    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.641a2.892 2.892 0 0 1-5.201 1.743 2.897 2.897 0 0 1 3.183-4.498v-3.479a6.329 6.329 0 0 0-6.388 6.338 6.33 6.33 0 0 0 10.143 5.115 6.313 6.313 0 0 0 1.714-4.498V9.013a8.188 8.188 0 0 0 5.286 1.889V7.425a4.756 4.756 0 0 1-1.522-.739z" />
        </svg>
      );
    default:
      return null;
  }
};

interface FooterProps {
  data?: FooterData;
  logoUrl?: string | null;
}

const ensuredPlatforms = [
  { platform: "Linkedin", href: "#" },
  { platform: "X", href: "#" },
  { platform: "WhatsApp", href: "#" },
];

const Footer = ({ data, logoUrl }: FooterProps) => {
  const content = data || defaultFooterData;

  const baseSocials = content.socialLinks || [];
  const socialLinks = [
    ...baseSocials,
    ...ensuredPlatforms.filter(
      (ep) => !baseSocials.some((s) => s.platform.toLowerCase() === ep.platform.toLowerCase())
    ),
  ];

  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(id);
    if (!id || id === "#" || !id.startsWith("#")) return;

    const targetId = id.replace("#", "");
    const element = document.getElementById(targetId);

    // If section not found on current page, redirect to home with hash
    if (!element) {
      window.location.href = `/${id}`;
      return;
    }

    if (lenis) {
      lenis.scrollTo(id, {
        offset: -80,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Clean native fallback for mobile/disabled lenis
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative bg-[#FAFAFA] py-16 overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="inline-block relative w-32 md:w-32  h-14 group">
              {logoUrl ? (
                <Image src={logoUrl} alt="حليف" fill className="object-cover object-right" />
              ) : (
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#0A2463] transition-colors duration-300">
                  حليف<span className="text-[#3E92CC]">.</span>
                </h2>
              )}
            </Link>
          </div>

          {/* Nav Menu */}
          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-slate-500 font-black text-sm md:text-base">
            {defaultFooterData.navLinks.map((link, i) => {
              const isHash = link.href.startsWith("#");

              if (isHash) {
                return (
                  <button
                    key={i}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="hover:text-[#3E92CC] transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit"
                    type="button"
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <Link key={i} href={link.href} className="hover:text-[#3E92CC] transition-colors cursor-pointer">
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-slate-200/60 my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[12px] md:text-xs text-slate-400 font-bold">
            © {new Date().getFullYear()} حليف. بكل فخر من المدينة المنورة.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#3E92CC] transition-all border border-slate-100"
                aria-label={social.platform}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
