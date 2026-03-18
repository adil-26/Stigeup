"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { caseStudiesSection, homepageCaseStudies } from "@/lib/homepage-content"

export function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0)

  if (homepageCaseStudies.length === 0) {
    return null
  }

  const activeStudy = homepageCaseStudies[activeIndex] ?? homepageCaseStudies[0]

  return (
    <section id="case-studies" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
            {caseStudiesSection.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {caseStudiesSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            {homepageCaseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setActiveIndex(index)}
                className={`group flex items-start gap-4 rounded-xl border p-5 text-left transition-all duration-300 ${
                  activeIndex === index
                    ? "border-primary/40 bg-card"
                    : "border-transparent hover:border-border hover:bg-card/50"
                }`}
              >
                <span
                  className={`font-mono text-xs mt-1 ${
                    activeIndex === index ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {study.number}
                </span>
                <div className="flex-1">
                  <h3
                    className={`font-heading text-lg font-semibold transition-colors ${
                      activeIndex === index
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {study.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className={`mt-1 transition-all ${
                    activeIndex === index
                      ? "text-primary opacity-100"
                      : "text-muted-foreground opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="relative hidden lg:block">
            <div
              className={`relative h-full min-h-[400px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${activeStudy.previewGradient} transition-all duration-500`}
            >
              {activeStudy.imageSrc ? (
                <>
                  <Image
                    src={activeStudy.imageSrc}
                    alt={activeStudy.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-2xl font-bold text-foreground">
                      {activeStudy.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
                      <span className="font-heading text-2xl font-bold text-primary">
                        {activeStudy.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground">
                      {activeStudy.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {activeStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
