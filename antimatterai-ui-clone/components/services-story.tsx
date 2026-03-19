"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import type { ParticleGlobeInputs } from "@/components/particle-globe"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import { servicesSection } from "@/lib/homepage-content"
import { services } from "@/lib/services-content"
import { usePageVisible } from "@/hooks/use-page-visible"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

const ParticleGlobe = dynamic(
  () => import("@/components/particle-globe").then((mod) => ({ default: mod.ParticleGlobe })),
  { ssr: false }
)

const STICKY_TOP = 64

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max))
}

export function ServicesStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const pageVisible = usePageVisible()
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null)
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1)
  const [isInView, setIsInView] = useState(false)

  const inputsRef = useRef<ParticleGlobeInputs>({
    scrollProgress: 1,
    activeService: 0,
    activeServiceFloat: 0,
    servicesVisible: true,
    servicesProgress: 0,
    animate: true,
  })

  const animate = pageVisible && !reducedMotion && isInView

  useEffect(() => {
    inputsRef.current.animate = animate
  }, [animate])

  useEffect(() => {
    let rafId = 0
    let lastActive = -1
    let lastInView: boolean | null = null
    let currentFloat = 0

    const tick = () => {
      const section = sectionRef.current
      if (!section) {
        rafId = requestAnimationFrame(tick)
        return
      }

      const rect = section.getBoundingClientRect()
      const inView = rect.bottom > STICKY_TOP && rect.top < window.innerHeight
      if (lastInView !== inView) {
        lastInView = inView
        setIsInView(inView)
      }

      if (!inView) {
        inputsRef.current.servicesProgress = 0
        inputsRef.current.activeService = 0
        if (lastActive !== 0) {
          lastActive = 0
          setActiveIndex(0)
        }
        rafId = requestAnimationFrame(tick)
        return
      }

      const stickyViewport = Math.max(window.innerHeight - STICKY_TOP, 1)
      const scrollable = Math.max(section.offsetHeight - stickyViewport, 1)
      const passed = Math.max(0, STICKY_TOP - rect.top)
      const progress = clamp(passed / scrollable, 0, 1)

      const targetFloat = progress * (services.length - 1)
      currentFloat += (targetFloat - currentFloat) * 0.14
      const nextIndex = clamp(Math.round(currentFloat), 0, services.length - 1)
      inputsRef.current.servicesProgress = progress
      inputsRef.current.activeService = nextIndex
      inputsRef.current.activeServiceFloat = currentFloat

      if (nextIndex !== lastActive) {
        lastActive = nextIndex
        setActiveIndex(nextIndex)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    if (activeIndex === displayIndex) return
    const direction: 1 | -1 = activeIndex > displayIndex ? 1 : -1
    setSlideDirection(direction)
    setLeavingIndex(displayIndex)
    setDisplayIndex(activeIndex)
    const timeout = window.setTimeout(() => {
      setLeavingIndex(null)
    }, 260)
    return () => window.clearTimeout(timeout)
  }, [activeIndex, displayIndex])

  const service = services[displayIndex]
  const leavingService = leavingIndex === null ? null : services[leavingIndex]
  const Icon = service.icon
  const LeavingIcon = leavingService?.icon

  const particleProps = useMemo(
    () => ({
      scrollProgress: 1,
      activeService: 0,
      servicesVisible: true,
      servicesProgress: 0,
      animate,
      inputsRef,
    }),
    [animate]
  )

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ height: `${services.length * 72}vh` }}
      aria-label="Our Services"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {servicesSection.heading}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {servicesSection.description}
            </p>
          </div>
          <div className="hidden lg:block">
            <p className="text-sm text-muted-foreground">
              Scroll to explore each service.
            </p>
          </div>
        </div>
      </div>

      <div className="sticky top-16 hidden h-[calc(100vh-64px)] lg:flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-[minmax(0,1fr)_520px] gap-10 items-center">
            <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(4,5,10,0.92)] p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,90,0,0.20)_0%,rgba(255,90,0,0.07)_26%,transparent_58%)]" />
              <div className="relative min-h-[420px]">
                {leavingService ? (
                  <div
                    className="services-story-layer"
                    data-state="exit"
                    style={{
                      ["--fromY" as string]: "0px",
                      ["--toY" as string]: `${slideDirection * -16}px`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="font-heading text-sm font-semibold tracking-[0.22em] text-white/55">
                          {leavingService.number}
                        </p>
                        <h3 className="mt-2 font-heading text-3xl font-semibold text-white">
                          {leavingService.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="h-7 w-7 text-white/80" />
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-white/75">
                      {leavingService.description}
                    </p>

                    <div className="mt-7">
                      <div className="mb-4 flex items-center gap-3">
                        {LeavingIcon ? (
                          <LeavingIcon className="h-6 w-6 text-primary" />
                        ) : null}
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                          Highlights
                        </p>
                      </div>
                      <div className="space-y-2">
                        {leavingService.services.map((item) => (
                          <p key={item} className="text-sm text-white/85">
                            {item}
                          </p>
                        ))}
                      </div>
                      <p className="mt-5 text-xs leading-relaxed text-white/60">
                        <span className="font-semibold text-white/80">Tools:</span> {leavingService.tools}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="/services"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/[0.07]"
                      >
                        View all services
                        <AnimatedArrow size={16} />
                      </Link>
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                      >
                        Start a project
                        <AnimatedArrow size={16} />
                      </Link>
                    </div>
                  </div>
                ) : null}

                <div
                  key={service.number}
                  className="services-story-layer"
                  data-state="enter"
                  style={{
                    ["--fromY" as string]: `${slideDirection * 16}px`,
                    ["--toY" as string]: "0px",
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-heading text-sm font-semibold tracking-[0.22em] text-white/55">
                        {service.number}
                      </p>
                      <h3 className="mt-2 font-heading text-3xl font-semibold text-white">
                        {service.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="h-7 w-7 text-white/80" />
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-white/75">
                    {service.description}
                  </p>

                  <div className="mt-7">
                    <div className="mb-4 flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                        Highlights
                      </p>
                    </div>
                    <div className="space-y-2">
                      {service.services.map((item) => (
                        <p key={item} className="text-sm text-white/85">
                          {item}
                        </p>
                      ))}
                    </div>
                    <p className="mt-5 text-xs leading-relaxed text-white/60">
                      <span className="font-semibold text-white/80">Tools:</span> {service.tools}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/services"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/[0.07]"
                    >
                      View all services
                      <AnimatedArrow size={16} />
                    </Link>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                    >
                      Start a project
                      <AnimatedArrow size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <div className="relative h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-black">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,90,0,0.14),transparent_62%)]" />
              <div className="absolute inset-0 [mask-image:radial-gradient(60%_58%_at_50%_44%,black,transparent)]" />
              <ParticleGlobe {...particleProps} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:hidden">
        <div className="space-y-3">
          {services.map((serviceItem) => (
            <article
              key={serviceItem.number}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-xl font-semibold">{serviceItem.title}</h3>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {serviceItem.description}
              </p>
              <div className="mt-4 space-y-1">
                {serviceItem.services.map((item) => (
                  <p key={item} className="text-sm text-foreground/90">
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground/90">Tools:</span> {serviceItem.tools}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
