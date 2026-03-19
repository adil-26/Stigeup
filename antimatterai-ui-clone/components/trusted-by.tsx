"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { homepageTrustLogos, trustSection } from "@/lib/homepage-content"

const arcPositions = [
  { left: "6%", top: "68%", rotate: -12 },
  { left: "19%", top: "57%", rotate: -9 },
  { left: "33%", top: "49%", rotate: -5 },
  { left: "50%", top: "44%", rotate: 0 },
  { left: "66%", top: "49%", rotate: 5 },
  { left: "80%", top: "57%", rotate: 9 },
  { left: "93%", top: "68%", rotate: 12 },
]

export function TrustedBy() {
  if (homepageTrustLogos.length === 0) {
    return null
  }

  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const logos = homepageTrustLogos.slice(0, arcPositions.length)

  return (
    <section
      ref={sectionRef}
      data-visible={isVisible ? "true" : "false"}
      className="trustedby relative overflow-hidden border-t border-border py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl rounded-[34px] border border-white/10 bg-black px-5 py-12 md:px-10 md:py-16">
          <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_50%_18%,rgba(255,90,0,0.14),transparent_48%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04040A] to-transparent" />
          <div className="trustedby-sun pointer-events-none absolute left-1/2 bottom-[-160px] h-[520px] w-[520px] -translate-x-1/2 rounded-full" />
          <div className="trustedby-globe pointer-events-none absolute inset-x-[6%] bottom-0 h-[240px]" aria-hidden="true" />

          <div className="relative z-10 text-center">
            <h2 className="trustedby-title font-heading text-3xl font-semibold text-white sm:text-4xl">
              {trustSection.kicker}
            </h2>
            <p className="trustedby-subtitle mt-2 text-sm text-white/70">
              {trustSection.heading}
            </p>
          </div>

          <div className="relative z-10 mt-12 hidden h-[210px] md:block">
            {logos.map((logo, index) => {
              const position = arcPositions[index]
              return (
                <div
                  key={logo.id}
                  className="trustedby-logo absolute -translate-x-1/2"
                  style={{
                    left: position.left,
                    top: position.top,
                    transform: `translateX(-50%) rotate(${position.rotate}deg)`,
                    animationDelay: `${180 + index * 90}ms`,
                    ["--logo-rot" as string]: `${position.rotate}deg`,
                    ["--logo-delay" as string]: `${index * 120}ms`,
                  }}
                >
                  <div className="flex items-center justify-center gap-2 text-white/85">
                    {logo.logoSrc ? (
                      <Image
                        src={logo.logoSrc}
                        alt={`${logo.name} logo`}
                        width={34}
                        height={34}
                        className="h-7 w-7 object-contain opacity-85"
                      />
                    ) : null}
                    <span className="whitespace-nowrap font-heading text-2xl font-semibold tracking-tight">
                      {logo.name}
                    </span>
                  </div>
                </div>
              )
            })}

            <div className="trustedby-arc pointer-events-none absolute inset-x-[6%] bottom-7 h-[54px] rounded-[100%] border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(255,90,0,0.34)_0%,rgba(255,90,0,0.15)_46%,rgba(0,0,0,0.06)_78%,transparent_100%)]" />
            <div className="trustedby-arc-glow pointer-events-none absolute inset-x-[3%] bottom-[14px] h-[76px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,90,0,0.34)_0%,rgba(255,90,0,0.12)_58%,transparent_85%)] blur-[12px]" />
            <svg
              className="trustedby-arc-line pointer-events-none absolute inset-x-[2.5%] bottom-8 h-[92px] w-[95%]"
              viewBox="0 0 1000 240"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="trustedbyArc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="rgba(255,90,0,0)" />
                  <stop offset="0.18" stopColor="rgba(255,90,0,0.46)" />
                  <stop offset="0.5" stopColor="rgba(255,120,55,0.92)" />
                  <stop offset="0.82" stopColor="rgba(255,90,0,0.46)" />
                  <stop offset="1" stopColor="rgba(255,90,0,0)" />
                </linearGradient>
              </defs>
              <path
                d="M 36 186 Q 500 36 964 186"
                fill="none"
                stroke="url(#trustedbyArc)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                className="trustedby-arc-sweep"
                d="M 36 186 Q 500 36 964 186"
                fill="none"
                stroke="rgba(255,160,90,0.95)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 62 198 Q 500 70 938 198"
                fill="none"
                stroke="rgba(255,90,0,0.16)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 92 212 Q 500 110 908 212"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative z-10 mt-10 grid grid-cols-2 gap-3 md:hidden">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-center"
              >
                <span className="font-heading text-sm font-medium text-white/85">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
