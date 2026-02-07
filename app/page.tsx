import React from "react";
import HeroSection from "./components/HeroSection";
import FloatingNav from "./components/FloatingNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] relative">
      <FloatingNav />
      <HeroSection />

    </main>
  );
}
