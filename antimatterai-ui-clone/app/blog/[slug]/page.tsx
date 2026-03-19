import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import { getPostBySlug } from "@/lib/blog-store"
import { getSiteUrl } from "@/lib/site-url"

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
    return { title: "Blog" }
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
    <main className="overflow-x-clip">
      <Navbar />
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
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
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-card"
          >
            Back to Blog
          </Link>

          <p className="mt-8 font-mono text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {post.coverImage ? (
            <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card/20">
              <img
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          <div className="mt-10 rounded-3xl border border-border bg-card/20 p-6 md:p-8">
            <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed text-white/85">
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
