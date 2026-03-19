import { NextResponse } from "next/server"
import { requireAdminFromRequest } from "@/lib/admin-auth"
import { getContactSubmissions } from "@/lib/blog-store"

export const runtime = "nodejs"

export async function GET(req: Request) {
  if (!requireAdminFromRequest(req)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const submissions = await getContactSubmissions()
  return NextResponse.json({ ok: true, submissions })
}

