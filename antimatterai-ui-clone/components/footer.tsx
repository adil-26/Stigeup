"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const serviceLinks = [
  "Product Design",
  "Development",
  "GTM Strategy",
  "Healthcare Apps",
  "AI Development",
  "IoT Development",
]

const resourceLinks = [
  "Clinix AI",
  "Synergies4",
  "Curehire",
  "Feature",
  "OWASP",
  "Contact",
]

function LiveClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "America/New_York",
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="font-mono text-2xl font-bold text-foreground md:text-3xl">
      {time || "--:--:--"}
    </span>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-primary-foreground"
                >
                  <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                </svg>
              </div>
              <span className="font-heading text-lg font-bold text-foreground">
                Antimatter AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              atom@antimatterai.com
            </p>
            <p className="text-sm text-muted-foreground">
              Based in Atlanta, GA
              <br />
              Serving clients globally
            </p>
            <div className="mt-6">
              <LiveClock />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#case-studies"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Antimatter AI, &copy;2026. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
