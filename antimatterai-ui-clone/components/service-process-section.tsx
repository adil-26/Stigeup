"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { CheckCircle2, ChevronRight } from "lucide-react"

import type { ServiceProduct } from "@/lib/services-content"

export interface ProcessStep {
  number: string
  title: string
  description: string
  deliverables: string[]
}

export interface ToolPhase {
  phase: string
  tools: string[]
}

export interface TimelineBar {
  label: string
  weeks: string
  left: string
  width: string
  accent?: boolean
}

interface ServiceProcessSectionProps {
  steps: ProcessStep[]
  products: ServiceProduct[]
  toolPhases: ToolPhase[]
  timelineBars: TimelineBar[]
}

type Tab = "process" | "deliverables" | "timeline"

// ─── 3D TILT CARD EFFECT ──────────────────────────────────────────────────────────

function TiltReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative z-10 hover:z-40 transition-shadow duration-300 ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────────

export function ServiceProcessSection({
  steps,
  products,
  toolPhases,
  timelineBars,
}: ServiceProcessSectionProps) {
  const [activeTab, setActiveTab] = useState<Tab>("process")
  const [activeStep, setActiveStep] = useState(0)

  if (!steps?.length || !products?.length) return null

  return (
    <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Background ambient glow matching STIGEUP's particle aesthetic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-[100%] pointer-events-none -z-10 opacity-30" />

      {/* ── SECTION HEADING ── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center md:text-left"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
          How we scale
        </p>
        <h2 className="font-heading text-4xl md:text-6xl font-semibold text-white leading-[1.1]">
          From first interaction <br className="hidden md:block"/>
          <span className="text-white/40">to final execution.</span>
        </h2>
        <p className="text-muted-foreground mt-6 text-xl max-w-3xl md:mx-0 mx-auto leading-relaxed">
          Every engagement follows identical physics. Rigorous structure is what separates random outputs from guaranteed performance.
        </p>
      </motion.div>

      {/* ── ANIMATED TAB SWITCHER ── */}
      <div className="flex gap-2 p-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl w-fit mb-12 mx-auto md:mx-0 relative shadow-2xl">
        {(["process", "deliverables", "timeline"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-8 py-3.5 text-sm rounded-xl transition-colors capitalize font-semibold tracking-wide z-10 ${
              activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-white"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="active-tab-glow"
                className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl -z-10 shadow-[0_0_20px_rgba(255,100,0,0.15)] bg-gradient-to-b from-primary/20 to-transparent"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ══════════════════════════════════════════════════
            TAB 1: 3D PROCESS STEPPER
        ══════════════════════════════════════════════════ */}
        {activeTab === "process" && (
          <motion.div
            key="process"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
          >
            {/* Vertical Flow Graph */}
            <div className="relative py-10 max-w-5xl mx-auto">
              {/* Central Glowing Spline/Edge */}
              <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[2px] bg-gradient-to-b from-primary/50 via-primary/10 to-transparent md:-translate-x-1/2" />
              
              {steps.map((step, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 mb-20 last:mb-0 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                  
                  {/* Central Node */}
                  <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-black border-2 border-primary shadow-[0_0_20px_rgba(255,100,0,0.4)] z-10">
                    <span className="text-primary font-heading font-black text-lg">{step.number}</span>
                  </div>

                  {/* Spacer for empty side on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card via TiltReveal */}
                  <TiltReveal className="w-full pl-20 md:pl-0 md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-tr from-white/[0.04] to-transparent border border-white/10 backdrop-blur-xl relative overflow-hidden group shadow-2xl"
                    >
                      {/* Subtle hover sweep */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative z-10">
                        <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-5 group-hover:text-primary transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                          {step.description}
                        </p>
                        
                        <div className="border-t border-white/10 pt-6 mt-auto">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Deliverables
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {step.deliverables.map((d, di) => (
                              <span
                                key={di}
                                className="text-xs font-semibold tracking-wide px-4 py-2 rounded-full border border-white/10 text-white/80 bg-black/60 shadow-lg backdrop-blur-md"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TiltReveal>

                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 2: 3D DELIVERABLES GRID
        ══════════════════════════════════════════════════ */}
        {activeTab === "deliverables" && (
          <motion.div
            key="deliverables"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary" />
              Tangible Outputs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 perspective-[2000px]">
              {products.map((d, i) => (
                <TiltReveal key={d.number} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, z: -50 }}
                    animate={{ opacity: 1, z: 0 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                    className="h-full rounded-3xl p-8 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-primary/40 hover:bg-white/[0.05] transition-all duration-300 group relative overflow-hidden backdrop-blur-md"
                  >
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/40 transition-colors duration-500" />
                    
                    <div className="text-xs font-black tracking-widest text-primary mb-4">
                      {d.number}
                    </div>
                    <h4 className="font-heading text-xl font-bold text-white mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                      {d.title}
                    </h4>
                    <span className="inline-block text-xs font-semibold tracking-wide text-white/50 border border-white/10 rounded-full px-4 py-1.5 mb-6 bg-black/50">
                      {d.timeline}
                    </span>
                    <ul className="space-y-3">
                      {d.deliverables.map((item) => (
                        <li key={item} className="text-sm text-white/70 flex gap-3 items-start">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                          <span className="leading-relaxed font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </TiltReveal>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 3: TIMELINE METRICS
        ══════════════════════════════════════════════════ */}
        {activeTab === "timeline" && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-[1.5fr_1fr] gap-16"
          >
            {/* LEFT COLUMN: Animated Gantt bars */}
            <div className="bg-black/30 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-[2.5rem]">
              <p className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-10 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary" />
                Velocity Metrics
              </p>
              <div className="space-y-8">
                {timelineBars.map((bar, i) => (
                  <motion.div
                    key={bar.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                    className="grid items-center gap-6 group"
                    style={{ gridTemplateColumns: "160px 1fr 60px" }}
                  >
                    <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{bar.label}</span>
                    <div className="h-3 bg-white/5 rounded-full relative overflow-hidden shadow-inner">
                      <motion.div
                        className={`h-full rounded-full absolute shadow-[0_0_15px_rgba(255,100,0,0.5)] ${
                          bar.accent ? "bg-white" : "bg-primary"
                        }`}
                        style={{ left: bar.left, width: "0%" }}
                        animate={{ width: bar.width }}
                        transition={{ delay: 0.3 + i * 0.15, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                      />
                    </div>
                    <span className="text-sm font-bold text-muted-foreground text-right">{bar.weeks}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Tool Stack */}
            <div>
              <p className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-10 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary" />
                Engineering Stack
              </p>
              <div className="space-y-4">
                {toolPhases.map((tp, i) => (
                  <TiltReveal key={tp.phase}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="flex flex-col sm:flex-row sm:items-center gap-5 p-6 bg-gradient-to-r from-white/[0.04] to-transparent border border-white/10 rounded-3xl hover:border-primary/30 transition-colors"
                    >
                      <span className="text-sm font-bold tracking-wide text-white min-w-[140px]">
                        {tp.phase}
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {tp.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-xs font-semibold tracking-wide px-4 py-1.5 border border-white/10 rounded-full text-white/70 bg-black/60 shadow-lg"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </TiltReveal>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
