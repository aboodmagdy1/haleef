"use client";
import { Phone, RotateCw } from "lucide-react";

/**
 * LandscapeGuard
 * A component that blocks the UI on mobile/tablet devices when in landscape mode.
 * Visible only on touch/mobile devices in landscape orientation.
 */
const LandscapeGuard = () => {
  return (
    <div className="fixed inset-0 z-9999 bg-[#020617] items-center justify-center flex-col gap-8 text-white hidden landscape:flex lg:landscape:hidden">
      <div className="relative">
        <Phone className="w-16 h-16 text-blue-500 animate-pulse" />
        <RotateCw className="w-8 h-8 absolute -top-2 -right-2 text-white animate-spin-slow" />
      </div>
      <div className="text-center px-6 max-w-sm">
        <h2 className="text-2xl font-bold mb-3">يرجى تدوير الجهاز</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          تم تصميم هذه التجربة لتكون أفضل في الوضع العمودي. استمتع بتصفح الموقع بشكل أمثل.
        </p>
      </div>
    </div>
  );
};

export default LandscapeGuard;
