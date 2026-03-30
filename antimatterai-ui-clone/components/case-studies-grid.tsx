"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { caseStudiesData } from "@/lib/case-studies-content"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import { AnimatedHeroText } from "@/components/ui/animated-hero-text"

export function CaseStudiesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true)
      return
    }

    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      data-visible={isVisible ? "true" : "false"}
      className="case-studies py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeroText 
            className="case-studies-title font-heading text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl"
            lines={[{ text: "Architected for Dominance" }]} 
          />
          <p className="case-studies-desc mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We don&apos;t just write code — we engineer market leaders. Every project below was built to solve a real business problem, dominate a specific market, and generate measurable results.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudiesData.map((study, index) => (
            <article
              key={study.slug}
              className="case-study-card group relative overflow-hidden rounded-3xl border border-white/10 bg-card/10 p-8 transition-all hover:bg-card/30 flex flex-col justify-between"
              style={{ ["--cs-delay" as string]: `${140 + index * 70}ms` }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-primary/5"
              />
              <div className="relative">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="min-w-0">
                    <p className="font-heading text-sm font-semibold tracking-[0.22em] text-white/55">
                      {study.number}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-semibold text-white">
                      {study.title}
                    </h2>
                  </div>
                  {study.image ? (
                    <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                      <Image
                        src={study.image}
                        alt={`${study.title} preview`}
                        fill
                        className="case-study-image object-cover"
                      />
                    </div>
                  ) : null}
                </div>

                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  {study.headline}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-wider text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-auto pt-6 border-t border-white/10">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group/link inline-flex w-full items-center justify-between gap-2 text-sm font-medium text-white transition-colors hover:text-primary"
                >
                  View full case study
                  <AnimatedArrow size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
