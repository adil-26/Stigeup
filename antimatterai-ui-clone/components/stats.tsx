"use client"

import { useEffect, useRef, useState } from "react"

function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!startOnView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, startOnView])

  return { count, ref }
}

interface StatItemProps {
  value: number
  suffix: string
  label: string
  sublabel: string
}

function StatItem({ value, suffix, label, sublabel }: StatItemProps) {
  const { count, ref } = useCountUp(value)

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4 py-8">
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-5xl font-bold text-foreground md:text-6xl">
          {count}
        </span>
        <span className="font-heading text-3xl font-bold text-primary md:text-4xl">
          {suffix}
        </span>
      </div>
      <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
      <p className="text-sm text-muted-foreground">{sublabel}</p>
    </div>
  )
}

export function Stats() {
  return (
    <section className="relative border-y border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <StatItem value={20} suffix="+" label="Projects" sublabel="Delivered" />
          <StatItem
            value={100}
            suffix="%"
            label="Client"
            sublabel="Satisfaction"
          />
          <div className="flex flex-col items-center text-center px-4 py-8">
            <span className="font-heading text-5xl font-bold text-foreground md:text-6xl">
              24/7
            </span>
            <p className="mt-2 text-sm font-medium text-foreground">Support</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
        </div>
      </div>
    </section>
  )
}
