"use client";

import Link from "next/link";
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
    { platform: "Snapchat", href: "https://snapchat.com/t/UWKY3obj" },
    { platform: "TikTok", href: "https://www.tiktok.com/@haleeftech?_r=1&_t=ZS-93pvPRaB4uj" },
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
    case "snapchat":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-snapchat w-5 h-5"
          viewBox="0 0 16 16"
        >
          <path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1 1 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.4 3.4 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.3.3 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.4 1.4 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.8 1.8 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.3 4.3 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0s-1.76.216-2.505.641c-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.8 1.8 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.4 1.4 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.4.4 0 0 1 .109.11c.026.053.027.11-.012.217a3.4 3.4 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075q.18.189.409.31a4.4 4.4 0 0 0 1 .4.7.7 0 0 1 .202.09c.118.104.102.26.259.488q.12.178.296.3c.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.6.6 0 0 1 .19-.087 4.5 4.5 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047m-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082s-2.045-.801-2.904-1.084c-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a1 1 0 0 1 .197.022c.396.086.78.285 1.002.338q.04.01.082.011c.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.4.4 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a1 1 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464" />
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
}

const Footer = ({ data }: FooterProps) => {
  const content = data || defaultFooterData;
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        if (lenis) {
          lenis.scrollTo(href, { offset: -80 });
        } else {
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
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#0A2463] group-hover:text-[#3E92CC] transition-colors duration-300">
                حليف
                <span className="text-[#3E92CC]">.</span>
              </h2>
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

        <div className="pt-8 border-t bord<p>© {new Date().getFullYear()} حليف. بكل فخر من المدينة المنورة.</p>er-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-xs text-slate-400 font-bold">
          
          {/* <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-[#3E92CC] transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="#" className="hover:text-[#3E92CC] transition-colors">
              الشروط والأحكام
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
