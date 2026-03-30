import { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ContactForm } from "@/components/contact-form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimatedHeroText } from "@/components/ui/animated-hero-text"

export const metadata: Metadata = {
  title: "Contact STIGEUP | Start Your Web, App or AI Project",
  description: "Get in touch with STIGEUP to discuss your web development, mobile app, AI automation, or SEO project. We respond within 1 business day.",
}

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Website projects: 3-8 weeks. Custom software/SaaS: 8-20 weeks. AI integrations: 4-12 weeks. Timelines depend on scope and complexity — we'll give you an honest estimate in the discovery call.",
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer: "Both. We work with funded startups, growing SMEs, and enterprise teams. Our minimum engagement is typically $3,000 for smaller projects.",
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes. We offer retainer-based maintenance and growth packages after every launch.",
  },
  {
    question: "Where are you based? Can we meet in person?",
    answer: "We're based in India and operate as a remote-first studio. We serve clients globally and communicate via video calls, Slack, and structured project management tools.",
  },
]

export default function ContactPage() {
  return (
    <main className="overflow-x-clip bg-background">
      <Navbar />
      <section className="relative min-h-[70vh] pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <AnimatedHeroText 
                className="font-heading text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl leading-[1.15]"
                lines={[
                  { text: "Let's Build Your Next" },
                  { text: "Big Advantage." }
                ]} 
              />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg max-w-md">
                Tell us what you&apos;re building. We&apos;ll map out the fastest path from idea to a system that dominates your market.
              </p>
              
              <div className="mt-10 space-y-6">
                <div className="rounded-3xl border border-border bg-card/20 p-6">
                  <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                    Response time
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Within 1 business day
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                      <a href="mailto:hello@stigeup.com" className="mt-1 text-sm font-medium text-foreground hover:text-primary transition-colors block">hello@stigeup.com</a>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                      <p className="mt-1 text-sm font-medium text-foreground">India (Remote-first)</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Project Minimum</p>
                      <p className="mt-1 text-sm font-medium text-foreground">Custom Quote</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Available For</p>
                      <p className="mt-1 text-sm font-medium text-foreground">Web, App, Software, AI, SEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L16.41 14.59C16.59 14.07 16.53 13.51 16.27 13.06C16.02 12.61 15.58 12.33 15.08 12.3H11V8C11 6.34 12.34 5 14 5V3C11.24 3 9 5.24 9 8V14C9 14.55 9.45 15 10 15H13.6L11.58 20.3L14.017 21ZM5.017 21L7.41 14.59C7.59 14.07 7.53 13.51 7.27 13.06C7.02 12.61 6.58 12.33 6.08 12.3H2V8C2 6.34 3.34 5 5 5V3C2.24 3 0 5.24 0 8V14C0 14.55 0.45 15 1 15H4.6L2.58 20.3L5.017 21Z" />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed relative z-10 italic">
                &quot;STIGEUP rebuilt our entire web platform in 6 weeks. Load times dropped 70%, and our conversion rate jumped almost immediately.&quot;
              </p>
              <div className="mt-6">
                <p className="text-white text-sm font-semibold">Product Lead</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Clinix AI</p>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L16.41 14.59C16.59 14.07 16.53 13.51 16.27 13.06C16.02 12.61 15.58 12.33 15.08 12.3H11V8C11 6.34 12.34 5 14 5V3C11.24 3 9 5.24 9 8V14C9 14.55 9.45 15 10 15H13.6L11.58 20.3L14.017 21ZM5.017 21L7.41 14.59C7.59 14.07 7.53 13.51 7.27 13.06C7.02 12.61 6.58 12.33 6.08 12.3H2V8C2 6.34 3.34 5 5 5V3C2.24 3 0 5.24 0 8V14C0 14.55 0.45 15 1 15H4.6L2.58 20.3L5.017 21Z" />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed relative z-10 italic">
                &quot;Their AI voice agent handled 3,000+ inbound calls in the first month. Zero downtime, human-like conversations.&quot;
              </p>
              <div className="mt-6">
                <p className="text-white text-sm font-semibold">Operations Director</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">NeuralOps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold md:text-4xl">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left font-medium text-white hover:text-white/80 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6 pr-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  )
}
