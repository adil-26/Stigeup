import Link from "next/link"
import { services } from "@/lib/services-content"
import { servicesSection } from "@/lib/homepage-content"
import { AnimatedArrow } from "@/components/ui/animated-arrow"

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
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.number}
                className="relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 transition-all hover:bg-card/60"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted-foreground">{service.number}</p>
                    <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background/40">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {service.services.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border/70 bg-background/30 px-4 py-3 text-sm text-foreground/90"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/90">Tools:</span> {service.tools}
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-card"
                  >
                    Talk to us
                    <AnimatedArrow size={16} />
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
