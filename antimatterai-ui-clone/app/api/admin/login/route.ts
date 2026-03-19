import { NextResponse } from "next/server"
import { z } from "zod"
import { setAdminSession, verifyAdminKey } from "@/lib/admin-auth"

export const runtime = "nodejs"

const schema = z.object({
  key: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { key } = schema.parse(body)
    if (!verifyAdminKey(key)) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }
    await setAdminSession()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
