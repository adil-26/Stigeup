import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { getPostBySlug } from "@/lib/blog-store"
import { getSiteUrl } from "@/lib/site-url"
import { ChevronLeft } from "lucide-react"

export const dynamic = "force-dynamic"

function toAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }
  return `${getSiteUrl()}${url.startsWith("/") ? url : `/${url}`}`
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)
  if (!post || !post.published) {
    return { title: "Journal | STIGEUP" }
  }

  const url = `${getSiteUrl()}/blog/${post.slug}`
  const coverImage = post.coverImage ? toAbsoluteUrl(post.coverImage) : null
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: coverImage
        ? [{ url: coverImage, alt: post.coverImageAlt || post.title }]
        : undefined,
    },
    twitter: {
      card: coverImage ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      images: coverImage ? [coverImage] : undefined,
    },
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      
      {/* ── MASSIVE ARTICLE HERO ── */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[800px] w-full max-w-[1200px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10 opacity-70" />
        
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center pt-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.createdAt,
                dateModified: post.updatedAt,
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `${getSiteUrl()}/blog/${post.slug}`,
                },
                author: {
                  "@type": "Organization",
                  name: "STIGEUP",
                },
                publisher: {
                  "@type": "Organization",
                  name: "STIGEUP",
                },
                keywords: post.tags.join(", "),
                image: post.coverImage ? toAbsoluteUrl(post.coverImage) : undefined,
              }),
            }}
          />
          
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground transition-all hover:bg-white/[0.08] hover:text-white mb-16 shadow-lg backdrop-blur-md"
          >
            <ChevronLeft size={16} />
            Back to Journal
          </Link>

          <p className="font-mono text-sm tracking-widest text-primary mb-6 flex items-center justify-center gap-4">
             <span className="w-12 h-[1px] bg-primary/50 hidden sm:block" />
             {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
             <span className="w-12 h-[1px] bg-primary/50 hidden sm:block" />
          </p>
          
          <h1 className="font-heading text-4xl font-black text-white sm:text-6xl md:text-7xl leading-[1.1] tracking-tighter mb-8">
            {post.title}
          </h1>
          
          <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            {post.excerpt}
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-black/50 px-5 py-2.5 text-xs font-bold tracking-widest uppercase text-white shadow-inner backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLE CONTENT CONTAINER ── */}
      <section className="relative pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {post.coverImage ? (
            <div className="mb-[-100px] relative z-20 overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/50 shadow-2xl backdrop-blur-md">
              <img
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                className="h-auto w-full object-cover aspect-[21/9]"
              />
            </div>
          ) : null}

          <div className={`rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent shadow-2xl backdrop-blur-3xl relative z-10 
            ${post.coverImage ? 'pt-40' : 'pt-16'} pb-16 px-8 md:px-16 lg:px-24 mb-20`}>
            {/* The PROSE injected classes format the markdown string instantly! */}
            <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
                            prose-headings:font-heading prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight 
                            prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
                            prose-h3:text-2xl prose-h3:text-primary prose-h3:mt-12
                            prose-p:text-white/80 prose-p:leading-[1.8] prose-p:mb-8
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:transition-all
                            prose-strong:text-white prose-strong:font-bold
                            prose-ul:text-white/80 prose-li:marker:text-primary
                            prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/10 prose-pre:shadow-2xl prose-pre:rounded-2xl
                            prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl
                            prose-hr:border-white/10 prose-blockquote:border-primary prose-blockquote:bg-white/[0.02] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl
                            whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  )
}
