"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const COOKIE_NAME = "cookie_consent"

function getCookie(name: string) {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length < 2) return null
  return parts.pop()!.split(";").shift() || null
}

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = getCookie(COOKIE_NAME)
    setVisible(!existing)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/90 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.6)] backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/75">
            We use cookies to improve your experience. You can accept or continue with
            necessary cookies only. Read our{" "}
            <Link href="/cookie-policy" className="text-white underline underline-offset-4">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex gap-2 sm:shrink-0">
            <button
              type="button"
              className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/[0.07]"
              onClick={() => {
                setCookie(COOKIE_NAME, "necessary", 180)
                setVisible(false)
              }}
            >
              Necessary only
            </button>
            <button
              type="button"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110"
              onClick={() => {
                setCookie(COOKIE_NAME, "all", 180)
                setVisible(false)
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
