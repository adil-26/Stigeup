import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { TrustedBy } from "@/components/trusted-by"
import { ServicesGrid } from "@/components/services-grid"

export default function ServicesPage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <div className="pt-28" />
      <ServicesGrid />
      <TrustedBy />
      <CTA />
      <Footer />
    </main>
  )
}

