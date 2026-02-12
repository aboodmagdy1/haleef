"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageCircle, Calendar, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

// 1. Define Zod Schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: "الاسم الأول مطلوب" }),
  lastName: z.string().min(2, { message: "الاسم الأخير مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "الرسالة يجب أن تكون 10 أحرف على الأقل" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const formRef = React.useRef<HTMLDivElement>(null);
  const infoRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("تم إرسال رسالتك بنجاح!");
    form.reset();
  };

  useGSAP(
    () => {
      // Entrance Animations
      gsap.fromTo(
        infoRef.current?.children || [],
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-10 bg-white text-slate-900 overflow-hidden"
      dir="rtl"
    >
      {/* Background Ambience - Premium Gradients */}
      <div className="absolute top-1/2 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-50/60 rounded-full blur-[80px] md:blur-[150px] pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-100/40 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-5 ">
          <div className="flex items-center justify-center gap-2 mb-6 text-[#3E92CC] font-bold tracking-wider text-sm uppercase">
            <span className="w-8 h-[2px] bg-[#3E92CC]"></span>
            04 — تواصل
            <span className="w-8 h-[2px] bg-[#3E92CC]"></span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0A2463] mb-6 leading-tight">
            دعنا نتحدث عن <span className="text-[#3E92CC]">مشروعك</span>
          </h2>
          <p className="text-slate-500 text-base md:text-xl max-w-2xl mx-auto font-medium">
            سواء كان لديك مشروع جاهز للتنفيذ أو مجرد فكرة تود مناقشتها، خبراء حليف مستعدون لمساعدتك.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Column: Info Cards */}
          <div ref={infoRef} className="w-full lg:w-1/3 flex flex-col gap-6">
            {/* Profile/Intro Card */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col gap-4 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-[#3E92CC] flex items-center justify-center text-2xl font-bold text-white mb-2 shadow-lg shadow-[#3E92CC]/30">
                ح
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0A2463] mb-1">فريق حليف</h3>
                <p className="text-[#3E92CC] font-medium tracking-wide">النمو يبدأ هنا</p>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                جاهزون لتحويل فكرتك إلى واقع. تواصل معنا لنناقش مشروعك ونبحث أفضل الحلول التقنية المناسبة لك.
              </p>
            </div>

            {/* Email Action */}
            <a
              href="mailto:hello@haleef.sa"
              className="group bg-slate-50/80 border border-slate-100 p-6 rounded-3xl flex items-center gap-4 hover:border-[#3E92CC]/30 hover:bg-white transition-all cursor-pointer shadow-md hover:shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#3E92CC] group-hover:bg-[#3E92CC] group-hover:text-white transition-all shadow-sm group-hover:shadow-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#0A2463] mb-1 group-hover:text-[#3E92CC] transition-colors">
                  راسلنا عبر البريد
                </h4>
                <p className="text-slate-500 text-sm font-medium">hello@haleef.sa</p>
              </div>
            </a>

            {/* Availability Info */}
            <div className="bg-slate-50/80 border border-slate-100 p-6 rounded-3xl flex items-center gap-4 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#3E92CC] shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#0A2463] mb-1">الحالة الحالية</h4>
                <p className="text-emerald-600 text-sm font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]"></span>
                  متاحين لمشاريع جديدة
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div ref={formRef} className="w-full lg:w-2/3">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-slate-200/60 relative overflow-hidden group">
              {/* Internal Accent Blob */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold mb-2 block">الاسم الأول</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="محمد"
                              {...field}
                              className="bg-slate-50/50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#3E92CC] focus-visible:bg-white h-14 rounded-2xl transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold mb-2 block">الاسم الأخير</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="العمري"
                              {...field}
                              className="bg-slate-50/50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#3E92CC] focus-visible:bg-white h-14 rounded-2xl transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold mb-2 block">البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="name@example.com"
                              {...field}
                              className="bg-slate-50/50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#3E92CC] focus-visible:bg-white h-14 rounded-2xl transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold mb-2 block">الشركة (اختياري)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="شركتك التقنية"
                              {...field}
                              className="bg-slate-50/50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#3E92CC] focus-visible:bg-white h-14 rounded-2xl transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold mb-2 block">الرسالة</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            className={cn(
                              "flex min-h-[160px] w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-4 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3E92CC] focus-visible:bg-white resize-none transition-all",
                            )}
                            placeholder="أخبرنا المزيد عن مشروعك..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full h-14 md:h-16 bg-[#3E92CC] hover:bg-[#0A2463] text-white font-black rounded-2xl transition-all shadow-xl hover:shadow-[#3E92CC]/40 gap-3 text-xl hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {form.formState.isSubmitting ? "جاري الإرسال..." : "ابدأ الآن"}
                    {!form.formState.isSubmitting && (
                      <Send className="w-6 h-6 group-hover:-translate-x-1 group-hover:translate-y-[-2px] transition-transform" />
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
