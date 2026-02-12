"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

const HandshakeTester = () => {
  const [controls, setControls] = useState({
    man: { y: 15, x: 4, rotation: 0 },
    robot: { y: -15, x: -8, rotation: 0 },
  });

  const updateControl = (char: "man" | "robot", prop: "x" | "y" | "rotation", val: number) => {
    setControls((prev) => ({
      ...prev,
      [char]: { ...prev[char], [prop]: val },
    }));
  };

  return (
    <div className="relative w-full h-screen bg-[#020617] overflow-hidden flex items-center justify-center border-y-4 border-yellow-500/30">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full font-bold text-sm z-[60]">
        Handshake Lab (Static Test)
      </div>

      {/* --- Characters Display Area --- */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Man */}
        <div
          style={{
            transform: `translate(${controls.man.x}%, ${controls.man.y}%) rotate(${controls.man.rotation}deg)`,
            transition: "none",
          }}
          className="absolute w-full h-[50vh] flex flex-col justify-end items-center z-20 will-change-transform"
        >
          <div className="relative w-80 md:w-96 lg:w-[500px] aspect-3/4">
            <Image
              src="/manupgoingdown.png"
              alt="Saudi Man"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Robot */}
        <div
          style={{
            transform: `translate(${controls.robot.x}%, ${controls.robot.y}%) rotate(${controls.robot.rotation}deg)`,
            transition: "none",
          }}
          className="absolute w-full h-[50vh] flex flex-col justify-start items-center z-20 will-change-transform"
        >
          <div className="relative w-80 md:w-96 lg:w-[500px] aspect-3/4">
            <Image
              src="/robotdowngoingup.png"
              alt="Robot"
              fill
              className="object-contain object-top drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* --- GUI CONTROL PANEL --- */}
      <div className="fixed bottom-4 right-4 z-[100] bg-black/90 backdrop-blur-xl p-5 rounded-2xl border border-white/20 text-white w-72 shadow-2xl space-y-5">
        <div className="border-b border-white/10 pb-2">
          <h3 className="font-bold text-base text-blue-400">Position Lab</h3>
          <p className="text-[10px] opacity-50 uppercase tracking-widest mt-1">Refine the touch values here</p>
        </div>

        {/* Man Controls */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-yellow-400 flex justify-between">
            <span>SAUDI MAN</span>
            <span className="opacity-50">TOP</span>
          </p>
          <div className="grid grid-cols-[20px_1fr_40px] gap-3 text-xs items-center">
            <span className="opacity-60">Y</span>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={controls.man.y}
              onChange={(e) => updateControl("man", "y", Number(e.target.value))}
              className="accent-yellow-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-right font-mono">{controls.man.y}%</span>
          </div>
          <div className="grid grid-cols-[20px_1fr_40px] gap-3 text-xs items-center">
            <span className="opacity-60">X</span>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={controls.man.x}
              onChange={(e) => updateControl("man", "x", Number(e.target.value))}
              className="accent-yellow-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-right font-mono">{controls.man.x}%</span>
          </div>
          <div className="grid grid-cols-[20px_1fr_40px] gap-3 text-xs items-center">
            <span className="opacity-60">R</span>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={controls.man.rotation}
              onChange={(e) => updateControl("man", "rotation", Number(e.target.value))}
              className="accent-yellow-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-right font-mono">{controls.man.rotation}°</span>
          </div>
        </div>

        {/* Robot Controls */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <p className="text-xs font-bold text-cyan-400 flex justify-between">
            <span>ROBOT</span>
            <span className="opacity-50">BOTTOM</span>
          </p>
          <div className="grid grid-cols-[20px_1fr_40px] gap-3 text-xs items-center">
            <span className="opacity-60">Y</span>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={controls.robot.y}
              onChange={(e) => updateControl("robot", "y", Number(e.target.value))}
              className="accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-right font-mono">{controls.robot.y}%</span>
          </div>
          <div className="grid grid-cols-[20px_1fr_40px] gap-3 text-xs items-center">
            <span className="opacity-60">X</span>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={controls.robot.x}
              onChange={(e) => updateControl("robot", "x", Number(e.target.value))}
              className="accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-right font-mono">{controls.robot.x}%</span>
          </div>
          <div className="grid grid-cols-[20px_1fr_40px] gap-3 text-xs items-center">
            <span className="opacity-60">R</span>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={controls.robot.rotation}
              onChange={(e) => updateControl("robot", "rotation", Number(e.target.value))}
              className="accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-right font-mono">{controls.robot.rotation}°</span>
          </div>
        </div>

        <div className="bg-white/5 p-3 rounded-lg border border-white/10 space-y-1">
          <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Values for code:</p>
          <code className="text-[10px] block text-green-400 font-mono leading-relaxed">
            man: {"{"} y: "{controls.man.y}%", x: "{controls.man.x}%", rotation: {controls.man.rotation} {"}"}
            <br />
            robot: {"{"} y: "{controls.robot.y}%", x: "{controls.robot.x}%", rotation: {controls.robot.rotation} {"}"}
          </code>
        </div>
      </div>
    </div>
  );
};

export default HandshakeTester;
