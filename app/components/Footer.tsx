import Link from "next/link";
import { Mail, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useLenis } from "lenis/react";

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
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#") && lenis) {
      e.preventDefault();
      lenis.scrollTo(href, { offset: -80 });
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
              <li className="flex gap-3 mt-1">
                {content.socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
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

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-xs text-slate-400 font-bold">
          <p>© {new Date().getFullYear()} حليف. بكل فخر من الرياض.</p>
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
