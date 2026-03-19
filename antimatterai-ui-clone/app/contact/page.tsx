import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <section className="relative min-h-[70vh] pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
                Let&apos;s Build Your Next Big Advantage
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Share your goals and we&apos;ll map out the best web, software, and AI architecture
                for your growth.
              </p>
              <div className="mt-8 rounded-3xl border border-border bg-card/20 p-6">
                <h2 className="font-heading text-lg font-semibold text-foreground">Response time</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  You typically hear back within 1 business day.
                </p>
                <div className="mt-5">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="mt-1 text-sm font-medium text-foreground">hello@stigeup.com</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
