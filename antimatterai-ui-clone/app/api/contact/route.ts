import { NextResponse } from "next/server"
import { z } from "zod"
import { createContactSubmission } from "@/lib/blog-store"

export const runtime = "nodejs"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const values = schema.parse(body)
    await createContactSubmission(values)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

