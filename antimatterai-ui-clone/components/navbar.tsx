"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ArrowUpRight } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#case-studies" },
  { label: "FAQs", href: "#" },
  { label: "Reviews", href: "#" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-5 pt-4">
      <div className="mx-auto max-w-7xl rounded-full border border-border/70 bg-background/88 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,90,0,0.08),0_0_54px_rgba(255,90,0,0.16)] px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/stigeup-logo-main.png"
              alt="STIGEUP"
              width={214}
              height={52}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary pl-5 pr-1.5 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
            >
              Contact us
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform group-hover:rotate-12">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground text-center transition-colors hover:border-muted-foreground/50"
            >
              Start Your Project
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
