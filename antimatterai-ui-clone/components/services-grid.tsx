"use client"

import Link from "next/link"
import { servicesData } from "@/lib/services-content"
import { servicesSection } from "@/lib/homepage-content"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import { ArrowRight } from "lucide-react"

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
            {servicesSection.heading}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {servicesSection.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {servicesData.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.number}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card/30 p-8 transition-all hover:bg-card/60"
              >
                <div>
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-muted-foreground tracking-widest">{service.number}</p>
                      <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {service.heroSubheadline.split(". ")[0] + "."}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background/40">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {service.products.slice(0, 4).map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl border border-border/70 bg-background/30 px-4 py-3 text-xs sm:text-sm text-foreground/90 font-medium"
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                   <div className="flex -space-x-2 mr-4">
                     {/* Decorative stack element indicating expertise */}
                     <div className="w-8 h-8 rounded-full border-2 border-background bg-card/80 flex items-center justify-center text-[10px] text-muted-foreground font-mono">
                       01
                     </div>
                     <div className="w-8 h-8 rounded-full border-2 border-background bg-card/80 flex items-center justify-center text-[10px] text-muted-foreground font-mono">
                       {service.products.length}+
                     </div>
                   </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group/link inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-6 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    View Details
                    <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
