import type { MetadataRoute } from "next"
import { getPublishedPosts } from "@/lib/blog-store"
import { getSiteUrl } from "@/lib/site-url"

export const runtime = "nodejs"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const now = new Date().toISOString()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/services`, lastModified: now },
    { url: `${base}/case-studies`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    { url: `${base}/blog`, lastModified: now },
    { url: `${base}/privacy-policy`, lastModified: now },
    { url: `${base}/terms-of-service`, lastModified: now },
    { url: `${base}/cookie-policy`, lastModified: now },
  ]

  const posts = await getPublishedPosts()
  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt || p.createdAt,
  }))

  return [...staticRoutes, ...blogRoutes]
}
