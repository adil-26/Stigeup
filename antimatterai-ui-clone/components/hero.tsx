"use client"

import Link from "next/link"
import type { CSSProperties } from "react"
import { heroContent } from "@/lib/homepage-content"
import { HeroParticles } from "@/components/hero-particles"

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
        <h1 className="font-heading text-4xl font-semibold leading-[1.18] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {words.map((word, wordIndex) => {
            const mid = Math.max(1, Math.floor(word.length / 2))

            return (
              <span
                key={`${word}-${wordIndex}`}
                className="mr-[0.28em] inline-flex whitespace-nowrap last:mr-0"
              >
                {Array.from(word).map((character, charIndex) => {
                  const isLeftHalf = charIndex < mid
                  const direction = isLeftHalf ? -1 : 1
                  const distanceFromSplit = Math.abs(charIndex - mid)
                  const fromX = Math.round(direction * (120 + distanceFromSplit * 10))
                  const fromY = Math.round(
                    (wordIndex % 2 === 0 ? -1 : 1) * (18 + (charIndex % 5) * 3)
                  )
                  const waveY = `${(charIndex + wordIndex) % 2 === 0 ? "-" : ""}${4 + ((charIndex + wordIndex) % 4)}px`
                  const charStyle = {
                    ["--from-x" as string]: `${fromX}px`,
                    ["--from-y" as string]: `${fromY}px`,
                    ["--char-delay" as string]: `${Math.round(wordIndex * 90 + distanceFromSplit * 55)}ms`,
                    ["--arrive-duration" as string]: `${980 + Math.round(distanceFromSplit * 40)}ms`,
                    ["--wave-y" as string]: waveY,
                  } as CSSProperties

                  return (
                    <span
                      key={`${wordIndex}-${charIndex}-${character}`}
                      aria-hidden="true"
                      className="hero-char inline-block"
                      style={charStyle}
                    >
                      {character}
                    </span>
                  )
                })}
              </span>
            )
          })}
          <span className="sr-only">{heroContent.heading}</span>
        </h1>
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
