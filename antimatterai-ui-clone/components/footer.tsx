"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { useEffect, useState } from "react"
import { servicesData } from "@/lib/services-content"

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Contact us", href: "/contact" },
  { label: "Insights / Blog", href: "/blog" },
  { label: "Careers", href: "#" },
]

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "YouTube", href: "#", icon: Youtube },
]

function LiveClock() {
  const [time, setTime] = useState("")
  const [timezone, setTimezone] = useState("")

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const update = () => {
      setTime(
        new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground/80">
        Local Time
      </p>
      <span className="font-mono text-2xl font-bold text-foreground md:text-3xl">
        {time || "--:--:--"}
      </span>
      {timezone ? (
        <p className="mt-1 text-xs text-muted-foreground">{timezone}</p>
      ) : null}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-5">
              <Image
                src="/stigeup-logo-main.png"
                alt="StigeUp"
                width={214}
                height={52}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Based in India, engineered for global dominance.
            </p>
            <div className="mt-6">
              <LiveClock />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Expertise
            </h3>
            <ul className="space-y-3">
              {servicesData.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 inline-flex transition-all"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 inline-flex transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground transition-all hover:text-foreground hover:border-muted-foreground/50 hover:scale-110"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} StigeUp. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
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
