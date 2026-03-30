import Link from "next/link"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { getPublishedPosts } from "@/lib/blog-store"
import { AnimatedArrow } from "@/components/ui/animated-arrow"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Engineering Journal | STIGEUP",
  description: "Advanced engineering insights, architectural deep-dives, and technical post-mortems.",
  alternates: {
    canonical: "/blog",
  },
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      
      {/* ── MASSIVE HERO SECTION ── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 border-b border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-6">
            Engineering Journal
          </p>
          <h1 className="font-heading text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter">
            Insights &<br className="hidden md:block" />
            <span className="text-white/30"> Architecture.</span>
          </h1>
          <p className="mt-8 text-lg md:text-2xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            Deep technical dives into how we design, build, and scale high-performance systems for the world&apos;s most demanding environments.
          </p>
        </div>
      </section>

      {/* ── BLOG GRID SECTION ── */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center text-lg text-muted-foreground font-medium backdrop-blur-md">
                No logs published yet. Check back soon for architectural insights.
              </div>
            ) : (
              posts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_rgba(255,100,0,0.1)]"
                >
                  {/* Subtle hover internal glow */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {post.coverImage ? (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-black/50">
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-black flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                      <span className="font-heading text-4xl font-bold text-white/5 tracking-tighter mix-blend-plus-lighter">STIGEUP</span>
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-8 md:p-10 z-10">
                    <div className="flex items-center justify-between mb-6">
                      <p className="font-mono text-xs font-medium tracking-widest text-primary uppercase">
                        {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>

                    <h2 className="font-heading text-2xl font-bold text-white mb-4 leading-snug group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-base leading-relaxed text-muted-foreground mb-8 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/70 shadow-inner"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between text-sm font-bold tracking-wide text-white group-hover:text-primary transition-colors">
                      Read Blueprint
                      <AnimatedArrow size={16} />
                    </div>
                  </div>
                </Link>
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
