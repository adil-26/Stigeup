"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { caseStudiesSection, homepageCaseStudies } from "@/lib/homepage-content"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { AnimatedArrow } from "@/components/ui/animated-arrow"

export function CaseStudiesPreview() {
  const preview = homepageCaseStudies.slice(0, 4)

  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [isVisible, setIsVisible] = useState(false)

  if (preview.length === 0) return null

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
      { threshold: 0.18 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      data-visible={isVisible ? "true" : "false"}
      className="case-studies py-24 md:py-32 border-t border-border"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="case-studies-title font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
              {caseStudiesSection.heading}
            </h2>
            <p className="case-studies-desc mt-4 text-lg leading-relaxed text-muted-foreground">
              {caseStudiesSection.description}
            </p>
          </div>
          <Link
            href="/case-studies"
            className="case-studies-cta group inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-5 py-2 text-sm font-medium text-foreground transition-all hover:bg-card"
          >
            View Case Studies
            <AnimatedArrow size={16} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {preview.map((study, index) => (
            <article
              key={study.id}
              className="case-study-card group relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 transition-all hover:bg-card/60"
              style={{ ["--cs-delay" as string]: `${160 + index * 90}ms` }}
            >
              <div
                className={`absolute inset-0 pointer-events-none opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-br ${study.previewGradient}`}
              />
              <div className="relative flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-muted-foreground">{study.number}</p>
                  <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">
                    {study.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {study.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="case-study-tag rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {study.imageSrc ? (
                  <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-background/40">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
