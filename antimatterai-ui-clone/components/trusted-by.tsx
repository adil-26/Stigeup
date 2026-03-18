import Image from "next/image"
import { homepageTrustLogos, trustSection } from "@/lib/homepage-content"

export function TrustedBy() {
  if (homepageTrustLogos.length === 0) {
    return null
  }

  return (
    <section className="relative py-20 border-t border-border overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-primary/70 animate-sparkle"
            style={{
              left: `${6 + ((i * 17) % 88)}%`,
              top: `${10 + ((i * 23) % 70)}%`,
              animationDelay: `${(i % 7) * 0.35}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 mb-12 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-primary font-medium">
          {trustSection.kicker}
        </p>
        <h2 className="font-heading text-xl font-semibold text-muted-foreground sm:text-2xl">
          {trustSection.heading}
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee">
          {[...homepageTrustLogos, ...homepageTrustLogos].map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 mx-8 flex items-center"
            >
              <div className="relative flex h-12 items-center gap-3 rounded-lg border border-border bg-card/50 px-6">
                <span className="absolute right-2 top-2 h-1 w-1 rounded-full bg-primary/80 animate-sparkle" />
                <div className="h-6 w-6 rounded-md bg-primary/20 flex items-center justify-center overflow-hidden">
                  {logo.logoSrc ? (
                    <Image
                      src={logo.logoSrc}
                      alt={`${logo.name} logo`}
                      width={24}
                      height={24}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold text-primary">
                      {logo.name.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
