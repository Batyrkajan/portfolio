"use client";

import { useState } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ParticlesBackground />
      <h1>Hello World</h1>
    </main>
  );
}
