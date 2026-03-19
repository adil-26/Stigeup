import { NextResponse } from "next/server"
import { requireAdminFromRequest } from "@/lib/admin-auth"
import { deletePost } from "@/lib/blog-store"

export const runtime = "nodejs"

export async function DELETE(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  if (!requireAdminFromRequest(req)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const { slug } = await ctx.params
  await deletePost(slug)
  return NextResponse.json({ ok: true })
}

