import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 border-t border-border overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] animate-glow-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl text-balance">
          We turn bold ideas into{" "}
          <span className="text-primary">powerful digital</span> realities.
        </h2>
        <div className="mt-10">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
          >
            {"Let's work together"}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          hello@stigeup.com
        </p>
      </div>
    </section>
  )
}
