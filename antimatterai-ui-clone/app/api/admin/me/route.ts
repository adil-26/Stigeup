import { NextResponse } from "next/server"
import { requireAdminFromRequest } from "@/lib/admin-auth"

export const runtime = "nodejs"

export async function GET(req: Request) {
  if (!requireAdminFromRequest(req)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}

