"use client";

import React from "react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLenis } from "lenis/react";

// Utility for merging tailwind classes safely
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CreativeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  href?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  reverse?: boolean; // New Prop
}

const CreativeButton: React.FC<CreativeButtonProps> = ({
  text,
  href,
  onClick,
  className,
  icon,
  variant = "primary",
  size = "md",
  type = "button",
  reverse = false, // Default false
  ...props
}) => {
  const lenis = useLenis();

  // Size Variants
  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  // Color Variants (Border & Text & Base Background)
  const variantClasses = {
    primary: reverse ? "bg-[#3E92CC] border-[#3E92CC] text-white" : "border-[#3E92CC] text-[#3E92CC]",
    secondary: reverse ? "bg-[#0A2463] border-[#0A2463] text-white" : "border-[#0A2463] text-[#0A2463]",
  };

  // Overlay Styling (Background & Text Color)
  // This layer appears on hover.
  const overlayClasses = {
    primary: reverse
      ? "bg-white text-[#3E92CC]" // Reverse Hover: White BG, Blue Text
      : "bg-linear-to-r from-[#3E92CC] to-[#2563EB] text-white", // Normal Hover: Blue Gradient, White Text
    secondary: reverse ? "bg-white text-[#0A2463]" : "bg-linear-to-r from-[#0A2463] to-[#1e3a8a] text-white",
  };

  const handleSmoothScroll = (e: React.MouseEvent) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href, {
          offset: -80,
          duration: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    if (onClick) onClick(e as any);
  };

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border font-bold transition-all duration-300 ease-out",
    !reverse && "bg-transparent",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3E92CC]",
    sizeClasses[size],
    variantClasses[variant],
    className,
  );

  const renderContent = () => (
    <>
      <span className="tracking-wide">{text}</span>
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </>
  );

  const buttonContent = (
    <>
      {/* 1. Base Layer (Visible Initially) */}
      <span className="relative z-10 flex items-center gap-2">{renderContent()}</span>

      {/* 2. Overlay Layer (Revealed on Hover - The "Scanner") */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-20 flex items-center justify-center gap-2 overflow-hidden transition-[clip-path] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]",
          "[clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]", // Left-to-Right Scan
          overlayClasses[variant],
        )}
      >
        {/* We re-render content here. Since it's absolutely centered, it aligns perfectly with Base Layer */}
        {renderContent()}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={handleSmoothScroll} className={baseClasses} role="button" {...(props as any)}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={handleSmoothScroll} className={baseClasses} {...props}>
      {buttonContent}
    </button>
  );
};

export default CreativeButton;
