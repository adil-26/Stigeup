import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How STIGEUP collects, uses, and protects your information.",
  alternates: {
    canonical: "/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: March 19, 2026</p>

          <div className="mt-8 space-y-5">
            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Information we collect</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We collect information you submit through our forms, including your name, email,
                company, and message content.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">How we use data</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We use your data to respond to inquiries, deliver services, improve website
                performance, and communicate service updates.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Data sharing</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We do not sell your personal data. We may share data with service providers that
                support hosting, analytics, or communication workflows.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                For privacy requests, contact us at{" "}
                <a className="text-primary underline underline-offset-4" href="mailto:hello@stigeup.com">
                  hello@stigeup.com
                </a>
                .
              </p>
            </article>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
