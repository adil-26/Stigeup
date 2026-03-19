"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { caseStudies, caseStudiesSection } from "@/lib/homepage-content"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { AnimatedArrow } from "@/components/ui/animated-arrow"

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
          <h1 className="case-studies-title font-heading text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
            {caseStudiesSection.heading}
          </h1>
          <p className="case-studies-desc mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {caseStudiesSection.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <article
              key={study.id}
              className="case-study-card group relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 transition-all hover:bg-card/60"
              style={{ ["--cs-delay" as string]: `${140 + index * 70}ms` }}
            >
              <div
                className={`absolute inset-0 pointer-events-none opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-br ${study.previewGradient}`}
              />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted-foreground">{study.number}</p>
                    <h2 className="mt-2 font-heading text-xl font-semibold text-foreground">
                      {study.title}
                    </h2>
                  </div>
                  {study.imageSrc ? (
                    <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-background/40">
                      <Image
                        src={study.imageSrc}
                        alt={study.imageAlt}
                        fill
                        className="case-study-image object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
                    </div>
                  ) : null}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="case-study-tag rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-card"
                  >
                    Contact
                    <AnimatedArrow size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
