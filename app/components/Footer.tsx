"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Github, Linkedin, Twitter, Instagram, Phone, FileText } from "lucide-react";
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
    { label: "عن حليف", href: "#about" },
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
    case "instagram":
      return <Instagram className="w-5 h-5" />;

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

const Footer = ({ data, logoUrl }: FooterProps) => {
  const content = data || defaultFooterData;
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href, {
          offset: -50,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <footer className="relative bg-slate-100 py-10 overflow-hidden" dir="rtl">
      {/* Modern Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-slate-100 to-slate-200/80 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-200/40 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-slate-300/50 rounded-full blur-[60px] md:blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Logo & Slogan */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block group">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="حليف"
                  width={120}
                  height={48}
                  className="h-10 md:h-14 w-auto object-contain"
                />
              ) : (
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#0A2463] group-hover:text-[#3E92CC] transition-colors duration-300">
                  حليف
                  <span className="text-[#3E92CC]">.</span>
                </h2>
              )}
            </Link>
            <div className="text-lg md:text-2xl font-bold text-slate-400 leading-tight flex flex-wrap gap-x-4 gap-y-1">
              {content.slogan.map((line, i) => (
                <p key={i} className="hover:text-[#0A2463] transition-colors cursor-default whitespace-nowrap">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1">
            <h3 className="text-[#0A2463] font-black text-base md:text-lg mb-6 relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-1.5 right-0 w-6 h-1 bg-[#3E92CC] rounded-full"></span>
            </h3>
            <nav className="flex flex-col gap-3 text-slate-500 font-bold text-sm md:text-base">
              {content.navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="hover:text-[#3E92CC] transition-all hover:translate-x-[-4px] inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-1">
            <h3 className="text-[#0A2463] font-black text-base md:text-lg mb-6 relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-1.5 right-0 w-6 h-1 bg-[#3E92CC] rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-4 text-slate-500 font-bold">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#3E92CC] shrink-0 border border-slate-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs md:text-base leading-relaxed">{content.location}</span>
              </li>
              <li>
                <a
                  href={`mailto:${content.email}`}
                  className="flex items-center gap-3 group hover:text-[#0A2463] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#3E92CC] group-hover:bg-[#3E92CC] group-hover:text-white transition-all shrink-0 border border-slate-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs md:text-base">{content.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${content.phone}`}
                  className="flex items-center gap-3 group hover:text-[#0A2463] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#3E92CC] group-hover:bg-[#3E92CC] group-hover:text-white transition-all shrink-0 border border-slate-200">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs md:text-base" dir="ltr">
                    {content.phone}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#3E92CC] shrink-0 border border-slate-200">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">رقم السجل التجاري</span>
                  <span className="text-xs md:text-base">{content.crNumber}</span>
                </div>
              </li>
              <li className="flex gap-3 mt-1">
                {content.socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#3E92CC] hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-1 border border-slate-200"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div className=" border-t border-slate-200 flex text-center flex-col md:flex-row items-center justify-center gap-6 text-[12px] md:text-xs text-slate-400 font-bold">
          <p>© {new Date().getFullYear()} حليف. بكل فخر من المدينة المنورة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
