import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { CaseStudies } from "@/components/case-studies"
import { TrustedBy } from "@/components/trusted-by"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { ParticleScrollController } from "@/components/particle-scroll-controller"

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <ParticleScrollController />
      <Navbar />
      <Hero />
      <Services />
      <CaseStudies />
      <TrustedBy />
      <CTA />
      <Footer />
    </main>
  )
}
