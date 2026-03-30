import { Metadata } from "next"
import Link from "next/link"
import { TrustedBy } from "@/components/trusted-by"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowUpRight } from "lucide-react"
import { AnimatedHeroText } from "@/components/ui/animated-hero-text"
export const metadata: Metadata = {
  title: "About STIGEUP | Elite Web, App & AI Engineering Agency",
  description: "STIGEUP is a high-performance digital engineering agency building custom websites, mobile apps, AI systems, and automation workflows for businesses that refuse to be average.",
}

const stats = [
  { label: "Projects Shipped", value: "50+" },
  { label: "Enterprise Clients", value: "12+" },
  { label: "Countries Served", value: "8+" },
  { label: "Average Client NPS", value: "94" },
  { label: "Team Members", value: "15+" },
  { label: "Years Operating", value: "5+" },
]

const values = [
  {
    num: "01",
    title: "PRECISION OVER SPEED",
    desc: "We'd rather ship something perfect a week late than release mediocrity on time. Every line of code, every UI interaction, every data schema is deliberate.",
  },
  {
    num: "02",
    title: "OUTCOMES, NOT OUTPUTS",
    desc: "We measure success by what changes in your business \u2014 not by how many features we shipped. Revenue growth, operational efficiency, market capture. That's the scoreboard.",
  },
  {
    num: "03",
    title: "RADICAL TRANSPARENCY",
    desc: "No hidden timelines. No inflated estimates. You always know exactly where your project stands, what it costs, and why we made every decision.",
  },
  {
    num: "04",
    title: "BUILT TO LAST",
    desc: "We build with maintainability and scale in mind from day one. Our work should outlast the engagement. No vendor lock-in. No black-box code.",
  },
  {
    num: "05",
    title: "OBSESSED WITH PERFORMANCE",
    desc: "Page load speed, API response time, model inference latency \u2014 we track it all. Fast isn't a nice-to-have; it's a core product requirement.",
  },
]

const process = [
  {
    step: "01",
    title: "DISCOVERY & ARCHITECTURE",
    desc: "We start every engagement with a deep-dive into your business model, technical landscape, and competitive environment. No templates. No assumptions. We map out the exact architecture before a single line of code is written.",
  },
  {
    step: "02",
    title: "DESIGN SYSTEM",
    desc: "Our UI/UX team creates a design language that is native to your brand and optimized for conversion. Interactive prototypes are tested against real user feedback before handoff to engineering.",
  },
  {
    step: "03",
    title: "ENGINEERING SPRINT",
    desc: "Our engineers build in iterative, transparent sprints with weekly demos. You see progress constantly. QA is embedded in every sprint \u2014 not bolted on at the end.",
  },
  {
    step: "04",
    title: "LAUNCH & PERFORMANCE AUDIT",
    desc: "Every deployment goes through our performance checklist: Core Web Vitals, security scan, SEO technical audit, load test. We don't go live until the numbers are right.",
  },
  {
    step: "05",
    title: "GROWTH PARTNERSHIP",
    desc: "We're available post-launch for iteration, scaling, and new feature development. Most of our clients stay with us well beyond the initial engagement.",
  },
]

export default function AboutPage() {
  return (
    <main className="overflow-x-clip bg-background">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <AnimatedHeroText 
              className="font-heading text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight tracking-tight text-foreground"
              lines={[
                { text: "We Don't Build Websites." },
                { text: "We Build Competitive Advantages.", className: "text-white/60" }
              ]} 
            />
            <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              STIGEUP is a full-spectrum digital engineering agency. We turn complex business problems into custom software, high-performance web platforms, and autonomous AI systems — engineered to make your competitors irrelevant.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
              >
                Start a Project
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-white/10"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE SECTION */}
      <section className="py-24 md:py-32 border-b border-white/5 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-semibold md:text-5xl">The Studio Behind the Machine</h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
              <p>
                STIGEUP was born out of a simple frustration: too many businesses were settling for digital experiences that were average, slow, and forgettable. We decided to build something different — a studio where engineering precision meets design obsession, and where &quot;good enough&quot; is never on the table.
              </p>
              <p>
                We are a team of engineers, designers, and AI architects who operate at the intersection of technology and business strategy. We don&apos;t sell templates. We don&apos;t resell SaaS tools. Every system we build is crafted from scratch — designed to fit your exact business model, your users, and your growth trajectory.
              </p>
              <p className="font-medium text-white">Based in India. Building for the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS BAR */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-wrap justify-between py-12 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="font-heading text-4xl md:text-5xl font-semibold text-white">{stat.value}</span>
              <span className="text-xs tracking-wider uppercase text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VALUES SECTION */}
      <section className="py-24 md:py-32 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-heading text-3xl font-semibold md:text-5xl">Our Operating Principles</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((val, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-primary font-mono text-sm mb-4 block">{val.num}</span>
                <h3 className="font-heading text-xl font-semibold text-white mb-4">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section className="py-24 md:py-32 border-b border-white/5 relative bg-black/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-heading text-3xl font-semibold md:text-5xl">The STIGEUP Method</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-5 md:grid-cols-2">
            {process.map((step, i) => (
              <div key={i} className="relative">
                <span className="text-white/20 font-heading text-6xl md:text-8xl font-black absolute -top-6 -left-4 z-0 pointer-events-none">{step.step}</span>
                <div className="relative z-10 pt-8">
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXPERTISE SECTION */}
      <section className="py-24 md:py-32 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold md:text-5xl">The Full Stack of Digital Dominance</h2>
            <p className="mt-4 text-muted-foreground">From the pixel to the pipeline — we cover every layer of your digital infrastructure:</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5 group transition-colors hover:bg-white/[0.05]">
              <ArrowUpRight className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">UX Research & Interface Design</h3>
                <p className="text-sm text-muted-foreground mt-1">Figma, Spline, Framer</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5 group transition-colors hover:bg-white/[0.05]">
              <ArrowUpRight className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">High-Performance Web Platforms</h3>
                <p className="text-sm text-muted-foreground mt-1">Next.js, React, Shopify, Webflow</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5 group transition-colors hover:bg-white/[0.05]">
              <ArrowUpRight className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">Custom Enterprise Software</h3>
                <p className="text-sm text-muted-foreground mt-1">CRM, ERP, SaaS (Node.js, Python, PostgreSQL)</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5 group transition-colors hover:bg-white/[0.05]">
              <ArrowUpRight className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">Cross-Platform Mobile Applications</h3>
                <p className="text-sm text-muted-foreground mt-1">Flutter, React Native, Swift, Kotlin</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5 group transition-colors hover:bg-white/[0.05]">
              <ArrowUpRight className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">AI Voice & Chat Agents</h3>
                <p className="text-sm text-muted-foreground mt-1">OpenAI, Vapi, ElevenLabs, Dialogflow</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5 group transition-colors hover:bg-white/[0.05]">
              <ArrowUpRight className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">Machine Learning & Intelligent Automation</h3>
                <p className="text-sm text-muted-foreground mt-1">TensorFlow, PyTorch, Hugging Face</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5 group transition-colors hover:bg-white/[0.05]">
              <ArrowUpRight className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium">Technical SEO & Generative Engine Optimization</h3>
                <p className="text-sm text-muted-foreground mt-1">GEO, Core Web Vitals, Structured Data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUSTED BY SECTION */}
      <TrustedBy />

      {/* 8. CTA SECTION */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-semibold md:text-5xl mb-6">Ready to Build Something That Dominates?</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Whether you&apos;re launching a new product, rebuilding legacy infrastructure, or deploying your first AI system — we want to hear about it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            Start a Conversation
            <AnimatedArrow direction="right" size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
