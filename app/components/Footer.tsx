import Link from "next/link";
import { Mail, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react";

export interface FooterData {
  slogan: string[];
  navLinks: { label: string; href: string }[];
  location: string;
  email: string;
  socialLinks: { platform: string; href: string }[];
  workingHours: { days: string; hours: string }[];
}

const defaultFooterData: FooterData = {
  slogan: ["تصميم.", "برمجة.", "محتوى."],
  navLinks: [
    { label: "عن حليف", href: "#" },
    { label: "خدماتنا", href: "#" },
    { label: "أعمالنا", href: "#" },
    { label: "تواصل معنا", href: "#" },
  ],
  location: "الرياض، المملكة العربية السعودية - متاح عن بعد",
  email: "hello@haleef.sa",
  socialLinks: [
    { platform: "Github", href: "#" },
    { platform: "Linkedin", href: "#" },
    { platform: "Twitter", href: "#" },
    { platform: "Instagram", href: "#" },
  ],
  workingHours: [
    { days: "الأحد - الخميس", hours: "09:00 صباحاً - 06:00 مساءً" },
    { days: "الجمعة", hours: "04:00 عصراً - 10:00 مساءً" },
    { days: "السبت", hours: "إجازة (للطوارئ فقط)" },
  ],
};

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <Github className="w-5 h-5" />;
    case "linkedin":
      return <Linkedin className="w-5 h-5" />;
    case "twitter":
      return <Twitter className="w-5 h-5" />;
    case "instagram":
      return <Instagram className="w-5 h-5" />;
    default:
      return null;
  }
};

interface FooterProps {
  data?: FooterData;
}

const Footer = ({ data }: FooterProps) => {
  const content = data || defaultFooterData;

  return (
    <footer className="relative bg-slate-100 py-10 overflow-hidden" dir="rtl">
      {/* Modern Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-slate-100 to-slate-200/80 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-200/40 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-slate-300/50 rounded-full blur-[60px] md:blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block group">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0A2463] group-hover:text-[#3E92CC] transition-colors duration-300">
                حليف
                <span className="text-[#3E92CC]">.</span>
              </h2>
            </Link>
            <div className="text-xl md:text-2xl font-bold text-slate-400 leading-tight space-y-1">
              {content.slogan.map((line, i) => (
                <p key={i} className="hover:text-[#0A2463] transition-colors cursor-default">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#0A2463] font-black text-lg mb-8 relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#3E92CC] rounded-full"></span>
            </h3>
            <nav className="flex flex-col gap-4 text-slate-500 font-bold">
              {content.navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="hover:text-[#3E92CC] transition-all hover:translate-x-[-4px] inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[#0A2463] font-black text-lg mb-8 relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#3E92CC] rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-6 text-slate-500 font-bold">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#3E92CC] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm md:text-base leading-relaxed">{content.location}</span>
              </li>
              <li>
                <a
                  href={`mailto:${content.email}`}
                  className="flex items-center gap-4 group hover:text-[#0A2463] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#3E92CC] group-hover:bg-[#3E92CC] group-hover:text-white transition-all shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm md:text-base">{content.email}</span>
                </a>
              </li>
              <li className="flex gap-4 mt-2">
                {content.socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#3E92CC] hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#0A2463] font-black text-lg mb-8 relative inline-block">
              ساعات العمل
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#3E92CC] rounded-full"></span>
            </h3>
            <div className="space-y-5 text-slate-500 font-bold">
              {content.workingHours.map((item, i) => (
                <div key={i} className="bg-white/50 p-3 rounded-2xl border border-white/50 shadow-sm">
                  <p className="text-[#0A2463] text-sm mb-1">{item.days}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">{item.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400 font-bold">
          <p>© {new Date().getFullYear()} حليف. بكل فخر من الرياض.</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-[#3E92CC] transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="#" className="hover:text-[#3E92CC] transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from "react";
export default Footer;
