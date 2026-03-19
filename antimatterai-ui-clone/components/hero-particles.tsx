"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { usePageVisible } from "@/hooks/use-page-visible"

const ParticleGlobe = dynamic(
  () => import("@/components/particle-globe").then((mod) => ({ default: mod.ParticleGlobe })),
  { ssr: false }
)

export function HeroParticles() {
  const reducedMotion = usePrefersReducedMotion()
  const pageVisible = usePageVisible()
  const animate = pageVisible && !reducedMotion

  const props = useMemo(
    () => ({
      scrollProgress: 0,
      activeService: 0,
      servicesVisible: false,
      servicesProgress: 0,
      animate,
    }),
    [animate]
  )

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 [mask-image:radial-gradient(60%_55%_at_50%_45%,black,transparent)]" />
      <ParticleGlobe {...props} />
    </div>
  )
}

