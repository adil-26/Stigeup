import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrustedBy } from "@/components/trusted-by"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { ServicesStory } from "@/components/services-story"
import { CaseStudiesPreview } from "@/components/case-studies-preview"

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <Hero />
      <ServicesStory />
      <CaseStudiesPreview />
      <TrustedBy />
      <CTA />
      <Footer />
    </main>
  )
}
