import React from "react";
import HeroSection from "./components/HeroSection";
import ConflictSection from "./components/ConflictSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] relative">
   
      <HeroSection />
      <ConflictSection />
    </main>
  );
}
