import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { servicesData } from "@/lib/services-content"
import { caseStudiesData } from "@/lib/case-studies-content"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle2, ArrowRight } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const service = servicesData.find((s) => s.slug === resolvedParams.slug)

  if (!service) {
    return { title: "Service Not Found" }
  }

  return {
    title: service.seoTitle,
    description: service.metaDescription,
  }
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params
  const service = servicesData.find((s) => s.slug === resolvedParams.slug)

  if (!service) {
    notFound()
  }

  const relatedCaseStudy = caseStudiesData.find(c => c.slug === service.relatedCaseStudySlug)

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      {/* SECTION 1: HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 border-b border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-8">
            <service.icon className="w-4 h-4" />
            Service {service.number}
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight tracking-tight max-w-5xl mx-auto text-white">
            {service.heroHeadline}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {service.heroSubheadline}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              {service.heroCTA}
              <AnimatedArrow size={16} />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICE OVERVIEW */}
      <section className="py-20 md:py-28 border-b border-white/5 bg-black/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {service.products.slice(0, 3).map((product, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  <span className="font-heading text-sm font-semibold text-primary">{`0${i + 1}`}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">{product.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{product.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCTS / DELIVERABLES SHOWCASE */}
      <section className="py-20 md:py-32 border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-semibold md:text-5xl">What's Included</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {service.products.map((product, i) => (
              <AccordionItem key={i} value={`product-${i}`} className="border border-white/10 rounded-2xl px-2 bg-white/[0.01]">
                <AccordionTrigger className="text-left py-6 px-4 hover:no-underline hover:text-white group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="font-mono text-sm text-primary tracking-wider">{product.number}</span>
                    <span className="font-heading text-xl font-semibold text-white group-hover:text-primary transition-colors">{product.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 pt-2">
                  <div className="space-y-6 lg:pr-12">
                    <p className="text-muted-foreground leading-relaxed text-base">{product.fullDescription}</p>
                    <div className="grid sm:grid-cols-2 gap-8 pt-4 border-t border-white/5">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Timeline</h4>
                        <p className="text-white font-medium">{product.timeline}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Deliverables</h4>
                        <ul className="space-y-2">
                          {product.deliverables.map(del => (
                            <li key={del} className="flex items-start gap-2 text-sm text-white/80">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              {del}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SECTION 4: TECHNOLOGY STACK */}
      <section className="py-20 md:py-28 border-b border-white/5 bg-black/40 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12 text-center">
          <h2 className="font-heading text-2xl font-semibold text-white uppercase tracking-widest">Our Technology Arsenal</h2>
        </div>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-6 py-4">
            {service.techStack.concat(service.techStack).concat(service.techStack).map((tech, i) => (
              <span key={`${tech}-${i}`} className="px-6 py-3 rounded-full border border-white/10 bg-card/50 text-white/80 font-medium text-lg mx-2">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR PROCESS */}
      <section className="py-20 md:py-28 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-semibold md:text-5xl">Our Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="relative">
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-[1px] bg-white/10" />
              <div className="relative z-10 w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <span className="text-primary font-medium">01</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2 text-center md:text-left">Discovery Phase</h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">Deep dive into your business model and technical requirements.</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-[1px] bg-white/10" />
              <div className="relative z-10 w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <span className="text-primary font-medium">02</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2 text-center md:text-left">Architecture & Strategy</h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">Mapping out the exact infrastructure to guarantee scale and performance.</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-[1px] bg-white/10" />
              <div className="relative z-10 w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <span className="text-primary font-medium">03</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2 text-center md:text-left">Design & Prototyping</h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">Building high-fidelity systems validated by real user testing.</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-[1px] bg-white/10" />
              <div className="relative z-10 w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <span className="text-primary font-medium">04</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2 text-center md:text-left">Engineering Sprints</h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">Iterative, transparent development with QA built into every step.</p>
            </div>
            <div className="relative">
              <div className="relative z-10 w-12 h-12 rounded-full bg-black border border-primary/40 flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-[0_0_15px_rgba(255,100,0,0.3)]">
                <span className="text-primary font-medium">05</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2 text-center md:text-left">Launch & Scale</h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">Rigorous performance auditing prior to seamless deployment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: RELATED CASE STUDY PREVIEW */}
      {relatedCaseStudy && (
        <section className="py-20 md:py-28 border-b border-white/5 bg-primary/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Relevant Case Study</h2>
            </div>
            <div className="p-8 md:p-12 rounded-[2rem] bg-black border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="font-heading text-3xl font-semibold text-white mb-4">{relatedCaseStudy.title}</h3>
                <p className="text-lg text-white/80 mb-8 max-w-2xl">{relatedCaseStudy.headline}</p>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {relatedCaseStudy.results.slice(0, 2).map((res, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-sm text-white/90 leading-relaxed font-medium">{res.replace("✦ ", "")}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/case-studies/${relatedCaseStudy.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-white transition-colors"
                >
                  Read Full Case Study
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: FAQ SECTION */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-20 md:py-28 border-b border-white/5">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-semibold md:text-5xl">Common Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {service.faq.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left font-medium text-white hover:text-white/80 py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pr-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* SECTION 8: CTA */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-semibold md:text-5xl mb-6">Ready to upgrade your infrastructure?</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Discuss your technical requirements with our engineering team today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              Start a Project
              <AnimatedArrow direction="right" size={18} />
            </Link>
            <a href="mailto:hello@stigeup.com" className="text-white hover:text-primary transition-colors text-sm font-medium">
              hello@stigeup.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
