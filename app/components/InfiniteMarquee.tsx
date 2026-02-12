"use client";
import React from "react";

interface InfiniteMarqueeProps {
  textArr: string[];
  bg?: string; // Tailwind bg or gradient class, e.g. "bg-gradient-to-r from-cyan-400 to-emerald-400"
  textColor?: string; // Tailwind text color class
  speed?: number; // seconds for one loop
  rotate?: number; // rotation degrees
  separator?: string; // separator between items
  className?: string;
  fontSize?: string; // Tailwind font-size class
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  textArr,
  bg = "bg-gradient-to-r from-[#3E92CC] to-[#0A2463]",
  textColor = "text-white",
  speed = 20,
  rotate = -3,
  separator = "✦",
  className = "",
  fontSize = "text-5xl md:text-7xl",
}) => {
  // Repeat the text array enough times to fill the screen
  const repeatedItems = [...textArr, ...textArr, ...textArr, ...textArr];

  return (
    <div
      dir="ltr"
      className={`relative w-full overflow-hidden py-6 md:py-8 ${bg} ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, marginLeft: "-2%", marginRight: "-2%", width: "104%" }}
    >
      <div className="flex whitespace-nowrap animate-marquee" style={{ animationDuration: `${speed}s` }}>
        {repeatedItems.map((text, i) => (
          <span
            key={i}
            className={`${fontSize} font-black ${textColor} mx-6 md:mx-10 shrink-0 select-none`}
            style={{ fontStyle: "italic" }}
          >
            {text}
            <span className="mx-6 md:mx-10 opacity-60">{separator}</span>
          </span>
        ))}
      </div>

      {/* Inline keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default InfiniteMarquee;
