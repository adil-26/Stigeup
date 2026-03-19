import Link from "next/link"
import { AnimatedArrow } from "@/components/ui/animated-arrow"

export function CTA() {
  return (
    <section
      className="relative overflow-hidden border-t border-border py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="cta-card relative overflow-hidden rounded-[28px] border border-white/10 bg-black px-8 py-12 md:px-12 md:py-14">
          <div className="cta-wave pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-black/60" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,520px)_1fr] lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
                <span className="block">We turn bold ideas into</span>
                <span className="block font-semibold">powerful digital realities.</span>
              </h2>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="cta-pill group inline-flex items-center gap-3 rounded-full px-7 py-3 text-sm font-medium text-white"
                >
                  Let&apos;s work together
                  <AnimatedArrow direction="right" size={18} />
                </Link>
                <a
                  href="mailto:hello@stigeup.com"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  hello@stigeup.com
                </a>
              </div>
            </div>
            <div className="hidden lg:block" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
