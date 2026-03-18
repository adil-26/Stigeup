"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowUpRight,
  Brain,
  Code2,
  Globe,
  MessageSquare,
  Palette,
  Search,
  Smartphone,
} from "lucide-react"
import { servicesSection } from "@/lib/homepage-content"

const services = [
  {
    number: "01",
    title: "UI / UX Design",
    icon: Palette,
    description:
      "End-to-end product design that dictates market standards. We craft flawless, high-converting interfaces, from deep user research to developer-ready UI systems that captivate and convert.",
    services: [
      "User Research & Strategy",
      "UX Flows & Wireframes",
      "High-Fidelity Prototypes",
      "Design Ops & Dev Handoff",
    ],
    tools: "Figma, Adobe XD, Spline (3D), Framer",
  },
  {
    number: "02",
    title: "Website Development",
    icon: Globe,
    description:
      "High-performance web architectures engineered for absolute digital dominance. We build lightning-fast, scalable platforms, custom e-commerce experiences, and specialized web applications that leave competitors behind.",
    services: [
      "Custom Web Platforms & Apps",
      "High-Converting Shopify Stores",
      "Headless CMS Architecture",
      "Performance & Security Audits",
    ],
    tools: "React, Next.js, Webflow, Shopify",
  },
  {
    number: "03",
    title: "Software Development",
    icon: Code2,
    description:
      "Bespoke enterprise ecosystems built to automate and overpower your industry. We architect custom CRMs, ERPs, and internal software that give your business an unfair operational advantage.",
    services: [
      "Custom CRM & ERP Systems",
      "SaaS Platform Architecture",
      "API Development & Integration",
      "Cloud Infrastructure Setup",
    ],
    tools: "Node.js, Python, PostgreSQL, AWS",
  },
  {
    number: "04",
    title: "Application Development",
    icon: Smartphone,
    description:
      "Elite mobile experiences designed to monopolize user attention. We engineer robust, cross-platform applications that scale effortlessly and deliver flawless performance across all devices.",
    services: [
      "iOS Native Engineering",
      "Android Native Engineering",
      "Cross-Platform Development",
      "App Scaling & Maintenance",
    ],
    tools: "Flutter, React Native, Swift, Kotlin",
  },
  {
    number: "05",
    title: "Voicebot / Chatbot",
    icon: MessageSquare,
    description:
      "Autonomous conversational agents that never sleep. We deploy intelligent, human-like AI calling and chat systems that qualify leads and automate customer interactions relentlessly.",
    services: [
      "AI Voice Calling Agents",
      "NLP Chatbot Integration",
      "Automated Lead Qualification",
      "Conversational UI/UX",
    ],
    tools: "OpenAI, Vapi, ElevenLabs, Dialogflow",
  },
  {
    number: "06",
    title: "AI / ML (Artificial Intelligence)",
    icon: Brain,
    description:
      "Cognitive logic and machine learning models that make your business untouchable. We integrate deep tech, automation, and precise data processing to transform complex bottlenecks into instant results.",
    services: [
      "Machine Learning Models",
      "AI Data Labeling & Processing",
      "Intelligent Workflow Automation",
      "Predictive Analytics",
    ],
    tools: "TensorFlow, PyTorch, Python, Hugging Face",
  },
  {
    number: "07",
    title: "SEO / GEO Optimization",
    icon: Search,
    description:
      "Total visibility across both traditional search and next-gen AI engines. We engineer your digital presence to dominate Google rankings and position your brand as the ultimate authority in AI-synthesized answers.",
    services: [
      "Generative Engine Optimization (GEO)",
      "Technical SEO Architecture",
      "Schema & Knowledge Graphing",
      "High-Authority Content Strategy",
    ],
    tools: "Ahrefs, Semrush, Perplexity AI, Google Search Console",
  },
]

const SLIDE_WIDTH = 620
const ACTIVE_WIDTH = 620
const PREVIEW_WIDTH = 360
const CARD_GAP = 24
const STICKY_TOP = 64

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const stickyViewport = Math.max(window.innerHeight - STICKY_TOP, 1)
      const scrollable = Math.max(section.offsetHeight - stickyViewport, 1)
      const passed = Math.max(0, STICKY_TOP - rect.top)
      const p = Math.max(0, Math.min(passed / scrollable, 1))
      setProgress(p)
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)
    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  const slidePosition = progress * (services.length - 1)
  const activeIndex = useMemo(() => {
    return Math.max(0, Math.min(services.length - 1, Math.round(slidePosition)))
  }, [slidePosition])
  const trackX = -activeIndex * (SLIDE_WIDTH + CARD_GAP)

  return (
    <>
      <section
        id="services"
        ref={sectionRef}
        data-active-service={activeIndex}
        className="relative hidden lg:block"
        style={{ height: `${services.length * 72}vh` }}
      >
        <div className="sticky top-16 h-[calc(100vh-64px)] flex items-center">
          <div className="mx-auto w-full max-w-[1500px] px-6">
            <div className="grid grid-cols-[380px_1fr] gap-8 items-start">
              <div className="h-[560px]" />

              <div>
                <div className="flex items-start gap-10 mb-10">
                  <h2 className="font-heading text-5xl font-bold text-foreground">
                    {servicesSection.heading}
                  </h2>
                  <p className="max-w-[360px] text-sm leading-relaxed text-muted-foreground">
                    {servicesSection.description}
                  </p>
                </div>

                <div className="overflow-hidden">
                  <div
                    className="flex items-stretch gap-6 will-change-transform"
                    style={{
                      transform: `translate3d(${trackX}px, 0, 0)`,
                      transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {services.map((service, index) => {
                      const Icon = service.icon
                      const isActive = index === activeIndex
                      return (
                        <div
                          key={service.number}
                          className="shrink-0 flex"
                          style={{ width: `${SLIDE_WIDTH}px` }}
                        >
                          <article
                            data-service-index={index}
                            className={`relative rounded-3xl border p-8 transition-all duration-300 overflow-hidden ${
                              isActive
                                ? "bg-[rgba(17,14,12,0.95)] border-[rgba(255,90,0,0.55)]"
                                : "bg-[rgba(4,5,10,0.92)] border-[rgba(255,255,255,0.14)]"
                            }`}
                            style={{
                              width: `${isActive ? ACTIVE_WIDTH : PREVIEW_WIDTH}px`,
                              height: "min(560px, calc(100vh - 180px))",
                            }}
                          >
                            {!isActive && (
                              <>
                                <div
                                  className="absolute inset-0 pointer-events-none"
                                  style={{
                                    background:
                                      "radial-gradient(120% 90% at 100% 100%, rgba(255, 90, 0, 0.2) 0%, rgba(255, 90, 0, 0.05) 28%, transparent 58%)",
                                  }}
                                />
                                <div
                                  className="absolute right-0 bottom-0 w-[170px] h-[170px] pointer-events-none opacity-60"
                                  style={{
                                    backgroundImage:
                                      "radial-gradient(circle, rgba(244, 236, 230, 0.5) 1.4px, transparent 1.8px)",
                                    backgroundSize: "16px 16px",
                                  }}
                                />
                              </>
                            )}
                            <div className="h-full flex flex-col">
                              <div className="flex items-start justify-between">
                                {isActive ? (
                                  <h3 className="font-heading text-3xl/none font-semibold text-foreground md:text-4xl/none">
                                    {service.title}
                                  </h3>
                                ) : (
                                  <span className="font-heading text-5xl/none font-bold text-foreground">
                                    {service.number}
                                  </span>
                                )}
                                <ArrowUpRight className="h-8 w-8 text-foreground/90 shrink-0" />
                              </div>

                              {isActive ? (
                                <>
                                  <p className="mt-7 text-base leading-relaxed text-foreground/90">
                                    {service.description}
                                  </p>
                                  <div className="mt-auto pt-6">
                                    <div className="mb-3">
                                      <Icon className="h-7 w-7 text-primary" />
                                    </div>
                                    <p className="text-sm uppercase tracking-[0.08em] text-foreground/60 mb-2">
                                      Services
                                    </p>
                                    {service.services.map((item) => (
                                      <p
                                        key={item}
                                        className="text-[15px] leading-relaxed text-foreground/85"
                                      >
                                        {item}
                                      </p>
                                    ))}
                                    <p className="mt-4 text-xs leading-relaxed text-foreground/70">
                                      <span className="font-semibold text-foreground/90">
                                        Tools:
                                      </span>{" "}
                                      {service.tools}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <div className="mt-auto">
                                  <h4 className="font-heading text-3xl font-semibold text-foreground/95">
                                    {service.title}
                                  </h4>
                                </div>
                              )}
                            </div>
                          </article>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative lg:hidden py-24 md:py-32" aria-label="Our Services">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            {servicesSection.heading}
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            {servicesSection.description}
          </p>
          <div className="space-y-3">
            {services.map((service, index) => (
              <article
                key={service.number}
                data-service-index={index}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-xl font-semibold">{service.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 space-y-1">
                  {service.services.map((item) => (
                    <p key={item} className="text-sm text-foreground/90">
                      {item}
                    </p>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground/90">Tools:</span>{" "}
                  {service.tools}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
