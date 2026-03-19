import { NextResponse } from "next/server"
import { z } from "zod"
import { requireAdminFromRequest } from "@/lib/admin-auth"
import { getAllPosts, upsertPost } from "@/lib/blog-store"

export const runtime = "nodejs"

const postSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  coverImage: z.string().optional(),
  coverImageAlt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export async function GET(req: Request) {
  if (!requireAdminFromRequest(req)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const posts = await getAllPosts()
  return NextResponse.json({ ok: true, posts })
}

export async function POST(req: Request) {
  if (!requireAdminFromRequest(req)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  try {
    const body = await req.json()
    const post = postSchema.parse(body)
    const slug = await upsertPost({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage?.trim() || undefined,
      coverImageAlt: post.coverImageAlt?.trim() || undefined,
      tags: post.tags,
      published: post.published,
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString(),
    })
    return NextResponse.json({ ok: true, slug })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
