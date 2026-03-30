"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import { servicesData } from "@/lib/services-content"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()

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
              className="h-8 w-auto object-contain rounded-xl overflow-hidden shadow-sm"
              priority
            />
          </Link>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm transition-colors ${pathname === "/" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm transition-colors ${pathname.startsWith("/about") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              About
            </Link>
            
            {/* Services Dropdown (Hover) */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`text-sm transition-colors flex items-center gap-1 py-4 ${pathname.startsWith("/services") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Services
                <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </Link>
              
              {/* Dropdown Panel */}
              <div 
                className={`absolute top-[48px] -left-8 w-64 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-3 shadow-xl transition-all duration-200 origin-top ${servicesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
              >
                {servicesData.map((service) => {
                  const Icon = service.icon
                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground">{service.title}</span>
                    </Link>
                  )
                })}
                <div className="mt-2 pt-2 border-t border-white/5">
                  <Link href="/services" className="flex items-center justify-center w-full p-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                    View All Services
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/case-studies"
              className={`text-sm transition-colors ${pathname.startsWith("/case-studies") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Case Studies
            </Link>
            <Link
              href="/contact"
              className={`text-sm transition-colors ${pathname.startsWith("/contact") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Contact
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary pl-5 pr-1.5 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
            >
              Start Project
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-primary">
                <AnimatedArrow size={14} />
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl mt-4 mx-4 rounded-3xl overflow-hidden shadow-xl border border-border/50">
          <div className="flex flex-col p-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="p-4 text-base font-medium text-foreground hover:bg-white/5 rounded-2xl transition-colors">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="p-4 text-base font-medium text-foreground hover:bg-white/5 rounded-2xl transition-colors">About</Link>
            
            <div className="flex flex-col">
              <Link href="/services" onClick={() => setIsOpen(false)} className="p-4 text-base font-medium text-primary hover:bg-white/5 rounded-2xl transition-colors">Services Overview</Link>
              <div className="pl-6 border-l border-white/10 ml-6 flex flex-col gap-1 py-2">
                {servicesData.map(service => (
                  <Link key={service.slug} href={`/services/${service.slug}`} onClick={() => setIsOpen(false)} className="py-2.5 text-sm text-muted-foreground hover:text-foreground">
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/case-studies" onClick={() => setIsOpen(false)} className="p-4 text-base font-medium text-foreground hover:bg-white/5 rounded-2xl transition-colors">Case Studies</Link>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-medium text-primary-foreground text-center transition-colors hover:brightness-110"
              >
                Start Your Project
                <AnimatedArrow size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
