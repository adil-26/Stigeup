"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

const caseStudies = [
  {
    number: "01",
    title: "Clinix AI",
    tags: ["Web Design", "App Design", "AI Development", "GTM"],
    color: "from-primary/20 to-primary/5",
  },
  {
    number: "02",
    title: "Synergies4",
    tags: ["App Design", "AI Development"],
    color: "from-primary/15 to-primary/5",
  },
  {
    number: "03",
    title: "Curehire",
    tags: ["Web Design", "Development"],
    color: "from-primary/20 to-primary/5",
  },
  {
    number: "04",
    title: "OWASP Foundation",
    tags: ["Web Design", "Development"],
    color: "from-primary/15 to-primary/5",
  },
  {
    number: "05",
    title: "Feature",
    tags: ["App Design", "GTM"],
    color: "from-primary/20 to-primary/5",
  },
]

export function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="case-studies" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-primary font-medium">
            Case Studies
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
            Proven results, measurable impact.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Explore the transformations we have delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Case study list */}
          <div className="flex flex-col gap-2">
            {caseStudies.map((study, index) => (
              <button
                key={study.number}
                onClick={() => setActiveIndex(index)}
                className={`group flex items-start gap-4 rounded-xl border p-5 text-left transition-all duration-300 ${
                  activeIndex === index
                    ? "border-primary/40 bg-card"
                    : "border-transparent hover:border-border hover:bg-card/50"
                }`}
              >
                <span
                  className={`font-mono text-xs mt-1 ${
                    activeIndex === index
                      ? "text-primary"
                      : "text-muted-foreground"
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

          {/* Right: Case study preview */}
          <div className="relative hidden lg:block">
            <div
              className={`h-full min-h-[400px] rounded-2xl border border-border bg-gradient-to-br ${caseStudies[activeIndex].color} flex items-center justify-center transition-all duration-500`}
            >
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
                  <span className="font-heading text-2xl font-bold text-primary">
                    {caseStudies[activeIndex].title.charAt(0)}
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {caseStudies[activeIndex].title}
                </h3>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {caseStudies[activeIndex].tags.map((tag) => (
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
          </div>
        </div>
      </div>
    </section>
  )
}
