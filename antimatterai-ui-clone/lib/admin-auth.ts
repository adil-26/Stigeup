import "server-only"

import crypto from "node:crypto"
import { cookies } from "next/headers"

const COOKIE_NAME = "admin_session"

function getAdminKey() {
  const key = process.env.ADMIN_KEY
  if (!key) {
    throw new Error("Missing ADMIN_KEY")
  }
  return key
}

function b64url(input: Buffer | string) {
  const buf = typeof input === "string" ? Buffer.from(input) : input
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function b64urlToBuffer(input: string) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/")
  const padLen = (4 - (padded.length % 4)) % 4
  const full = padded + "=".repeat(padLen)
  return Buffer.from(full, "base64")
}

function sign(payloadB64: string) {
  return b64url(crypto.createHmac("sha256", getAdminKey()).update(payloadB64).digest())
}

export async function setAdminSession() {
  const payload = {
    iat: Date.now(),
    nonce: crypto.randomUUID(),
  }
  const payloadB64 = b64url(JSON.stringify(payload))
  const token = `${payloadB64}.${sign(payloadB64)}`

  const jar = await cookies()
  jar.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearAdminSession() {
  const jar = await cookies()
  jar.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
}

export function isAdminSessionValidFromCookie(cookieValue?: string) {
  if (!cookieValue) return false
  const parts = cookieValue.split(".")
  if (parts.length !== 2) return false
  const [payloadB64, sig] = parts
  const expected = sign(payloadB64)
  try {
    const ok = crypto.timingSafeEqual(b64urlToBuffer(sig), b64urlToBuffer(expected))
    if (!ok) return false
  } catch {
    return false
  }

  try {
    const payload = JSON.parse(b64urlToBuffer(payloadB64).toString("utf8")) as { iat: number }
    if (!payload?.iat) return false
    const ageMs = Date.now() - payload.iat
    return ageMs >= 0 && ageMs < 1000 * 60 * 60 * 24 * 7
  } catch {
    return false
  }
}

export function requireAdminFromRequest(req: Request) {
  const cookieHeader = req.headers.get("cookie") || ""
  const match = cookieHeader
    .split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${COOKIE_NAME}=`))
  const value = match ? decodeURIComponent(match.slice(COOKIE_NAME.length + 1)) : undefined
  return isAdminSessionValidFromCookie(value)
}

export function verifyAdminKey(input: string) {
  return input === getAdminKey()
}
