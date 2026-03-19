import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { CaseStudiesGrid } from "@/components/case-studies-grid"

export default function CaseStudiesPage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <div className="pt-28" />
      <CaseStudiesGrid />
      <CTA />
      <Footer />
    </main>
  )
}

