"use client"

import Link from "next/link"
import type { CSSProperties } from "react"
import { heroContent } from "@/lib/homepage-content"
import { HeroParticles } from "@/components/hero-particles"
import { AnimatedHeroText } from "@/components/ui/animated-hero-text"

export function Hero() {
  const words = heroContent.heading.split(" ")

  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <HeroParticles />
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-28 -left-24 h-[700px] w-[260px] origin-top-left rotate-[24deg] animate-light-ray"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 133, 64, 0.58) 0%, rgba(255, 90, 0, 0.24) 38%, rgba(255, 90, 0, 0.03) 100%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[400px] animate-glow-pulse"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255, 90, 0, 0.16) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Watermark text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-heading text-[12vw] font-bold text-foreground/[0.03] tracking-[0.1em] whitespace-nowrap select-none"
          aria-hidden="true"
        >
          STIGEUP
        </span>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col items-center justify-center px-6 text-center lg:px-8">
        <AnimatedHeroText 
          lines={[{ text: heroContent.heading }]} 
          className="font-heading text-4xl font-semibold leading-[1.18] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        />
        <p className="mt-8 max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {heroContent.description}
        </p>
        <div className="mt-10">
          <Link
            href={heroContent.ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            {heroContent.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
