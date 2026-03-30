"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ChevronRight } from "lucide-react"

// Reuse our existing ServiceProduct interface from the central data file
// Assuming the parent passes it down
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

export function ServiceProcessSection({
  steps,
  products,
  toolPhases,
  timelineBars,
}: ServiceProcessSectionProps) {
  const [activeTab, setActiveTab] = useState<Tab>("process")
  const [activeStep, setActiveStep] = useState(0)

  // If data is missing for a service, we don't render the section to prevent breaking
  if (!steps?.length || !products?.length) return null

  return (
    <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto border-t border-white/5">
      {/* ── SECTION HEADING ── */}
      <div className="mb-10 text-center md:text-left">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
          How we work
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-semibold text-white leading-tight">
          From first conversation to final handoff.
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl md:mx-0 mx-auto">
          Every engagement follows the same rigorous methodology — because consistent process
          is what produces consistently great results.
        </p>
      </div>

      {/* ── TAB SWITCHER ── */}
      <div className="flex gap-1 p-1 bg-black border border-white/10 rounded-xl w-fit mb-10 mx-auto md:mx-0">
        {(["process", "deliverables", "timeline"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6 py-2 text-sm rounded-lg transition-all capitalize font-medium
              ${
                activeTab === tab
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ══════════════════════════════════════════════════
            TAB 1: PROCESS STEPPER
        ══════════════════════════════════════════════════ */}
        {activeTab === "process" && (
          <motion.div
            key="process"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Flow diagram — horizontal pill row */}
            <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-4 hide-scrollbar">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center shrink-0">
                  <button
                    onClick={() => setActiveStep(i)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                      border transition-all whitespace-nowrap
                      ${
                        activeStep === i
                          ? "bg-primary border-primary text-primary-foreground shadow-[0_0_15px_rgba(255,100,0,0.3)]"
                          : i < activeStep
                          ? "border-primary/40 text-primary bg-primary/10"
                          : "border-white/10 text-muted-foreground hover:border-white/30 hover:text-white bg-black"
                      }
                    `}
                  >
                    {i < activeStep ? (
                      <CheckCircle2 size={14} className="text-primary" />
                    ) : (
                      <span
                        className={`w-5 h-5 rounded-full border text-[10px] flex items-center justify-center font-heading
                        ${
                          activeStep === i
                            ? "border-primary-foreground text-primary-foreground"
                            : "border-current"
                        }`}
                      >
                        {step.number}
                      </span>
                    )}
                    {step.title.split(" ").slice(0, 3).join(" ")}
                  </button>
                  {i < steps.length - 1 && (
                    <ChevronRight
                      size={16}
                      className={`mx-2 shrink-0 ${
                        i < activeStep ? "text-primary/50" : "text-white/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Expanded step detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="border border-white/10 rounded-[2rem] p-8 md:p-10 bg-white/[0.02] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 md:gap-10">
                  <span className="text-primary font-heading text-5xl font-bold opacity-30 mt-1">
                    {steps[activeStep].number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl font-semibold text-white mb-4">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {steps[activeStep].description}
                    </p>

                    <div className="border-t border-white/10 pt-6">
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                        Key Deliverables
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {steps[activeStep].deliverables.map((d, i) => (
                          <motion.span
                            key={d}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="text-sm px-4 py-2 rounded-full border border-white/10 text-white/80 bg-black/50 backdrop-blur-sm"
                          >
                            {d}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next navigation */}
            <div className="flex justify-between items-center mt-6 px-2">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="text-sm font-medium text-muted-foreground hover:text-white disabled:opacity-30 transition-colors flex items-center gap-2"
              >
                <ChevronRight className="rotate-180" size={16} />
                Previous Phase
              </button>
              <button
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className="text-sm font-medium text-primary hover:text-primary/80 disabled:opacity-30 transition-colors flex items-center gap-2"
              >
                Next Phase
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 2: DELIVERABLES GRID
        ══════════════════════════════════════════════════ */}
        {activeTab === "deliverables" && (
          <motion.div
            key="deliverables"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-6">
              What you receive at the end of each phase
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((d, i) => (
                <motion.div
                  key={d.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:border-primary/50 transition-colors group relative overflow-hidden"
                >
                  <div className="text-xs font-semibold tracking-widest text-primary mb-3">
                    {d.number}
                  </div>
                  <h4 className="font-heading text-lg font-semibold text-white mb-2 leading-snug group-hover:text-primary transition-colors">
                    {d.title}
                  </h4>
                  <span className="inline-block text-xs font-medium text-muted-foreground border border-white/10 rounded-full px-3 py-1 mb-5 bg-black">
                    {d.timeline}
                  </span>
                  <ul className="space-y-2">
                    {d.deliverables.map((item) => (
                      <li key={item} className="text-sm text-white/70 flex gap-3 items-start">
                        <CheckCircle2 size={14} className="text-primary mt-1 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 3: TIMELINE
        ══════════════════════════════════════════════════ */}
        {activeTab === "timeline" && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* LEFT COLUMN: Gantt-style bars */}
            <div>
              <p className="text-sm font-medium tracking-widest uppercase text-primary mb-8">
                Typical project trajectory
              </p>
              <div className="space-y-6">
                {timelineBars.map((bar, i) => (
                  <motion.div
                    key={bar.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="grid items-center gap-4"
                    style={{ gridTemplateColumns: "140px 1fr 60px" }}
                  >
                    <span className="text-sm font-medium text-white/80">{bar.label}</span>
                    <div className="h-2 bg-white/5 rounded-full relative overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full absolute ${
                          bar.accent ? "bg-white" : "bg-primary"
                        }`}
                        style={{ left: bar.left, width: "0%" }}
                        animate={{ width: bar.width }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground text-right">{bar.weeks}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Tools per phase */}
            <div>
              <p className="text-sm font-medium tracking-widest uppercase text-primary mb-8">
                Tools utilized per phase
              </p>
              <div className="space-y-3">
                {toolPhases.map((tp, i) => (
                  <motion.div
                    key={tp.phase}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl"
                  >
                    <span className="text-sm font-semibold text-white/90 min-w-[140px]">
                      {tp.phase}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {tp.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs px-3 py-1 border border-white/10 rounded-full text-muted-foreground bg-black/50"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
