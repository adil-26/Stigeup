import Link from "next/link"
import { servicesSection } from "@/lib/homepage-content"
import { servicesData } from "@/lib/services-content"
import { AnimatedArrow } from "@/components/ui/animated-arrow"

export function ServicesPreview() {
  const preview = servicesData.slice(0, 3)

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
              {servicesSection.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {servicesSection.description}
            </p>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-5 py-2 text-sm font-medium text-foreground transition-all hover:bg-card"
          >
            Explore Services
            <AnimatedArrow size={16} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {preview.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.number}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 transition-all hover:bg-card/60"
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 100% 0%, rgba(255, 90, 0, 0.2) 0%, rgba(255, 90, 0, 0.06) 26%, transparent 62%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">{service.number}</p>
                      <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/40">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {service.heroSubheadline}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
