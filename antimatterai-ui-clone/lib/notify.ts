import "server-only"

import { getSiteUrl } from "@/lib/site-url"

type NotifyEvent =
  | {
      type: "blog_published"
      slug: string
      title: string
      excerpt?: string
      tags?: string[]
    }
  | {
      type: "contact_submitted"
      name: string
      email: string
      company?: string
      message: string
    }

function getWebhookConfig() {
  const url = process.env.NOTIFY_WEBHOOK_URL
  if (!url) return null
  return {
    url,
    secret: process.env.NOTIFY_WEBHOOK_SECRET || null,
  }
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFY_EMAIL_TO
  if (!apiKey || !to) return null
  return {
    apiKey,
    to,
    from: process.env.NOTIFY_EMAIL_FROM || "Stigeup <no-reply@stigeup.com>",
  }
}

async function sendWebhook(event: NotifyEvent) {
  const cfg = getWebhookConfig()
  if (!cfg) return

  await fetch(cfg.url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(cfg.secret ? { "x-notify-secret": cfg.secret } : {}),
    },
    body: JSON.stringify({ event, sentAt: new Date().toISOString() }),
  })
}

async function sendResendEmail(subject: string, text: string) {
  const cfg = getResendConfig()
  if (!cfg) return

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: cfg.from,
      to: cfg.to,
      subject,
      text,
    }),
  })
}

export async function notify(event: NotifyEvent) {
  try {
    await sendWebhook(event)
  } catch {
    // ignore
  }

  try {
    if (event.type === "blog_published") {
      const url = `${getSiteUrl()}/blog/${event.slug}`
      const subject = `New blog post published: ${event.title}`
      const text = [
        `Title: ${event.title}`,
        `URL: ${url}`,
        event.excerpt ? `Excerpt: ${event.excerpt}` : null,
        event.tags?.length ? `Tags: ${event.tags.join(", ")}` : null,
      ]
        .filter(Boolean)
        .join("\n")
      await sendResendEmail(subject, text)
    }

    if (event.type === "contact_submitted") {
      const subject = `New contact submission: ${event.email}`
      const text = [
        `Name: ${event.name}`,
        `Email: ${event.email}`,
        event.company ? `Company: ${event.company}` : null,
        "",
        event.message,
      ]
        .filter(Boolean)
        .join("\n")
      await sendResendEmail(subject, text)
    }
  } catch {
    // ignore
  }
}

