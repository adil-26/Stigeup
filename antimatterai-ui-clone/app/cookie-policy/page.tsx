import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Details about cookies used on STIGEUP website.",
  alternates: {
    canonical: "/cookie-policy",
  },
}

export default function CookiePolicyPage() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: March 19, 2026</p>

          <div className="mt-8 space-y-5">
            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">What are cookies?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Cookies are small text files stored on your browser that help websites remember
                preferences and measure usage.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">How we use cookies</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We use a consent cookie to remember your choice and may use analytics cookies to
                understand traffic and improve user experience.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Your choices</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You can accept all cookies, choose necessary-only cookies, or clear cookies from
                your browser at any time.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-card/20 p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                For cookie-related questions, contact{" "}
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
