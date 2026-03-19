import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of STIGEUP website and services.",
  alternates: {
    canonical: "/terms-of-service",
  },
}

export default function TermsOfServicePage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: March 19, 2026</p>

          <div className="mt-8 space-y-5">
            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Use of site</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                By using this site, you agree to use it lawfully and not attempt to disrupt or
                misuse any service, API, or form.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Intellectual property</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                All content, branding, and materials are owned by STIGEUP or its licensors unless
                otherwise stated.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Liability</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Website content is provided as-is. We are not liable for indirect damages resulting
                from use of this site.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Questions about these terms can be sent to{" "}
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
