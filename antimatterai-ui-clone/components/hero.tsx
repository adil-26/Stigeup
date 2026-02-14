"use client"

import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-24">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-28 -left-24 h-[700px] w-[260px] origin-top-left rotate-[24deg] animate-light-ray"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 133, 64, 0.58) 0%, rgba(255, 90, 0, 0.24) 38%, rgba(255, 90, 0, 0.03) 100%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[400px] animate-glow-pulse"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255, 90, 0, 0.16) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Watermark text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-heading text-[12vw] font-bold text-foreground/[0.03] tracking-[0.1em] whitespace-nowrap select-none"
          aria-hidden="true"
        >
          STIGEUP
        </span>
      </div>

      {/* Main heading */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 pt-20 md:pt-28 text-center">
        <h1 className="font-heading text-5xl font-medium leading-[1.18] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          <span className="text-primary font-semibold">Empowering</span> businesses with
          <br />
          results-driven web design that
          <br />
          outranks competitors
        </h1>
        <div className="mt-10">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            Start your project
          </Link>
        </div>
      </div>

      {/* Bottom section: CTA left, Stats right */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pb-12 md:pb-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Left: Description + CTA */}
          <div className="max-w-md">
            <p className="text-base leading-relaxed text-muted-foreground mb-6">
              We empower organizations with AI that turns complex challenges
              into real-world outcomes.
            </p>
            <div />
          </div>

          {/* Right: Stats inline */}
          <div className="flex items-end gap-8 md:gap-12">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-4xl font-bold text-foreground md:text-5xl">
                50+
              </span>
              <div className="ml-1">
                <p className="text-xs text-muted-foreground leading-tight">
                  Projects
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  Delivered
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-4xl font-bold text-foreground md:text-5xl">
                100%
              </span>
              <div className="ml-1">
                <p className="text-xs text-muted-foreground leading-tight">
                  Client
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  Satisfaction
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-4xl font-bold text-foreground md:text-5xl">
                24/7
              </span>
              <div className="ml-1">
                <p className="text-xs text-muted-foreground leading-tight">
                  Support
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
