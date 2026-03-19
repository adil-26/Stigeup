import Link from "next/link"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { getPublishedPosts } from "@/lib/blog-store"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description: "Shipping insights, launches, and behind-the-scenes architecture notes.",
  alternates: {
    canonical: "/blog",
  },
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <main className="overflow-x-clip">
      <Navbar />
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
              Blog
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Shipping insights, launches, and behind-the-scenes architecture notes.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {posts.length === 0 ? (
              <div className="rounded-3xl border border-border bg-card/20 p-8 text-sm text-muted-foreground">
                No posts yet.
              </div>
            ) : (
              posts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/30 transition-all hover:bg-card/60"
                >
                  {post.coverImage ? (
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-card/40">
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}

                  <div className="p-6">
                    <div className="relative">
                      <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0">
                          <p className="font-mono text-xs text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                          <h2 className="mt-2 font-heading text-xl font-semibold text-foreground">
                            {post.title}
                          </h2>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-card"
                        >
                          Read
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </main>
  )
}
