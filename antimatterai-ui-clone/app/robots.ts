import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://stigeup.com" // Update domain later

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/private/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
