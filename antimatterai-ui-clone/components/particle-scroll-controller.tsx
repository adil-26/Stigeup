"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import dynamic from "next/dynamic"

const ParticleGlobe = dynamic(
  () => import("./particle-globe").then((mod) => ({ default: mod.ParticleGlobe })),
  { ssr: false }
)

export function ParticleScrollController() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeService, setActiveService] = useState(0)
  const [servicesProgress, setServicesProgress] = useState(0)
  const [servicesVisible, setServicesVisible] = useState(false)
  const [servicesInView, setServicesInView] = useState(false)
  const [entryProgress, setEntryProgress] = useState(0)
  const rafRef = useRef<number>(0)
  const stickyTop = 64

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / docHeight, 1)
      setScrollProgress(progress)

      let isServicesVisible = false
      const servicesSection = document.getElementById("services")
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect()
        const inView = rect.bottom > 0 && rect.top < window.innerHeight
        setServicesInView(inView)
        const stickyActive = rect.top <= stickyTop && rect.bottom >= window.innerHeight
        isServicesVisible = stickyActive
        setServicesVisible(stickyActive)

        // Shift model left before services pins, so it does not sit in the middle.
        const entryStart = window.innerHeight * 0.82
        const entryEnd = stickyTop + window.innerHeight * 0.12
        const t = (entryStart - rect.top) / Math.max(entryStart - entryEnd, 1)
        setEntryProgress(Math.max(0, Math.min(t, 1)))

        if (stickyActive) {
          const stickyViewport = Math.max(window.innerHeight - stickyTop, 1)
          const total = Math.max(rect.height - stickyViewport, 1)
          const passed = Math.max(0, stickyTop - rect.top)
          setServicesProgress(Math.max(0, Math.min(passed / total, 1)))
        } else {
          setServicesProgress(0)
        }
      }

      // Prefer explicit active service from slider section.
      if (servicesSection) {
        const explicitIndex = parseInt(
          servicesSection.getAttribute("data-active-service") || "0"
        )
        if (!Number.isNaN(explicitIndex)) {
          setActiveService(isServicesVisible ? explicitIndex : 0)
          return
        }
      }

      // Fallback: determine which service card is most visible.
      const serviceCards = document.querySelectorAll("[data-service-index]")
      let closestIndex = 0
      let closestDistance = Infinity

      serviceCards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const viewCenter = window.innerHeight / 2
        const distance = Math.abs(center - viewCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = parseInt(
            card.getAttribute("data-service-index") || "0"
          )
        }
      })
      setActiveService(isServicesVisible ? closestIndex : 0)
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  // Calculate position styles based on scroll
  let containerStyle: React.CSSProperties
  if (entryProgress <= 0) {
    // Hero: centered, large
    containerStyle = {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "700px",
      height: "700px",
      zIndex: 1,
      transition: "all 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
    }
  } else if (entryProgress < 1) {
    // Transitioning to services
    const t = entryProgress
    containerStyle = {
      position: "fixed",
      top: `${50 - t * 5}%`,
      left: `${50 - t * 31}%`,
      transform: `translate(-50%, -50%) scale(${1 - t * 0.1})`,
      width: "760px",
      height: "760px",
      zIndex: 1,
      transition: "none",
    }
  } else {
    // Services: left side, larger and slightly lower to align with card block.
    containerStyle = {
      position: "fixed",
      top: "45%",
      left: "19%",
      transform: "translate(-50%, -50%) scale(0.9)",
      width: "760px",
      height: "760px",
      zIndex: 1,
      transition: "all 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
    }
  }

  // Hide particle globe past services section
  const opacity = servicesVisible || entryProgress < 1 ? 1 : 0

  return (
    <div
      style={{ ...containerStyle, opacity }}
      className="pointer-events-none"
    >
      {/* Brand glow behind particle model */}
      <div
        className="absolute inset-0 rounded-full animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 90, 0, 0.26) 0%, rgba(255, 90, 0, 0.14) 34%, rgba(255, 90, 0, 0.05) 56%, transparent 76%)",
          filter: "blur(44px)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 40% 54%, rgba(255, 130, 70, 0.22) 0%, rgba(255, 90, 0, 0.09) 36%, transparent 72%)",
          filter: "blur(58px)",
        }}
      />
      <ParticleGlobe
        scrollProgress={scrollProgress}
        activeService={activeService}
        servicesVisible={servicesVisible}
        servicesProgress={servicesProgress}
      />
    </div>
  )
}
