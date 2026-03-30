import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { caseStudiesData } from "@/lib/case-studies-content"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const study = caseStudiesData.find((cs) => cs.slug === resolvedParams.slug)

  if (!study) {
    return {
      title: "Case Study Not Found",
    }
  }

  return {
    title: `${study.title} Case Study | STIGEUP`,
    description: study.headline,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const resolvedParams = await params
  const study = caseStudiesData.find((cs) => cs.slug === resolvedParams.slug)

  if (!study) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      
      {/* CASE STUDY HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowUpRight className="h-4 w-4 rotate-225" />
            Back to Case Studies
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-heading text-sm font-semibold tracking-[0.22em] text-primary">CASE STUDY {study.number}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              {study.tags.map((tag) => (
                <span key={tag} className="text-sm text-muted-foreground border border-white/10 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight max-w-4xl text-white">
            {study.headline}
          </h1>
        </div>
      </section>

      {/* CASE STUDY CONTENT (2 COLUMNS) */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-start">
            
            {/* LEFT COLUMN: MAIN CONTENT */}
            <div className="space-y-16">
              
              {/* THE CHALLENGE */}
              <div>
                <h2 className="font-heading text-2xl font-semibold text-white mb-6">The Challenge</h2>
                <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p>{study.challenge}</p>
                </div>
              </div>

              {/* WHAT WE BUILT */}
              <div>
                <h2 className="font-heading text-2xl font-semibold text-white mb-6">What We Built</h2>
                <ul className="space-y-4">
                  {study.whatWeBuilt.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-white/80 leading-relaxed text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
            
            {/* RIGHT COLUMN: STICKY SIDEBAR */}
            <div className="lg:sticky lg:top-32 space-y-10">
              
              {/* RESULTS */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                <h3 className="font-heading text-lg font-semibold text-white tracking-wider mb-6">THE RESULTS</h3>
                <ul className="space-y-4">
                  {study.results.map((result, i) => {
                    const cleanResult = result.replace("✦ ", "")
                    return (
                      <li key={i} className="text-sm md:text-base text-white/90 leading-relaxed border-b border-white/10 pb-4 last:border-0 last:pb-0">
                        <span className="text-primary font-bold mr-2">✦</span>
                        {cleanResult}
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* TECH STACK */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                <h3 className="font-heading text-lg font-semibold text-white tracking-wider mb-6">TECH STACK</h3>
                <div className="flex flex-wrap gap-2">
                  {study.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-full border border-white/10 bg-black/40 text-sm text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* STICKY CTA */}
              <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20">
                <h3 className="font-heading text-xl font-semibold text-white mb-3">Interested in similar results?</h3>
                <p className="text-sm text-white/70 mb-6">Let's discuss how we can engineer a custom solution for your business.</p>
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
                >
                  Start a Project
                  <AnimatedArrow size={16} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
