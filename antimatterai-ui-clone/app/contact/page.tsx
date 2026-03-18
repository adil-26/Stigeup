import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function ContactPage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <section className="relative min-h-[70vh] pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
            Let&apos;s Build Your Next Big Advantage
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Share your goals and we&apos;ll map out the best web, software, and AI
            architecture for your growth.
          </p>
          <div className="mt-10">
            <Link
              href="mailto:hello@stigeup.com"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
            >
              hello@stigeup.com
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
