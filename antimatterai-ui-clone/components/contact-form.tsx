"use client"

import { useMemo, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().min(20, "Tell us a bit more (20+ characters)"),
})

type Values = z.infer<typeof schema>

const services = [
  "UI/UX Design",
  "Website Development",
  "Software Development",
  "Application Development",
  "Voicebot / Chatbot",
  "AI / ML Integration",
  "SEO / GEO Optimization",
  "Multiple / Not Sure"
]

const budgets = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
  "Let's discuss"
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const defaultValues = useMemo<Values>(
    () => ({ name: "", email: "", company: "", phone: "", service: "", budget: "", message: "" }),
    []
  )

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues })

  const onSubmit = async (values: Values) => {
    setSubmitError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        throw new Error("Failed")
      }

      setSubmitted(true)
      reset(defaultValues)
    } catch {
      const subject = encodeURIComponent("New project inquiry")
      const lines = [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.phone ? `Phone: ${values.phone}` : null,
        values.company ? `Company: ${values.company}` : null,
        `Service: ${values.service}`,
        values.budget ? `Budget: ${values.budget}` : null,
        "",
        values.message,
      ].filter(Boolean)

      const body = encodeURIComponent(lines.join("\n"))
      window.location.href = `mailto:hello@stigeup.com?subject=${subject}&body=${body}`
      setSubmitError("Save failed. Opened your email client instead.")
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card/30 p-6 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Full Name *</label>
            <input
              {...register("name")}
              className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
              placeholder="Your name"
            />
            {errors.name && <p className="mt-2 text-xs text-primary">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Work Email *</label>
            <input
              {...register("email")}
              className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
              placeholder="you@company.com"
            />
            {errors.email && <p className="mt-2 text-xs text-primary">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Company / Organization (optional)</label>
            <input
              {...register("company")}
              className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
              placeholder="Company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Phone Number (optional)</label>
            <input
              {...register("phone")}
              className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Service Interested In *</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="service"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 h-[46px] text-sm text-foreground outline-none transition-colors focus:ring-1 focus:ring-primary/50">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.service && <p className="mt-2 text-xs text-primary">{errors.service.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Budget Range (optional)</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="budget"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 h-[46px] text-sm text-foreground outline-none transition-colors focus:ring-1 focus:ring-primary/50">
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgets.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Project Description *</label>
          <textarea
            {...register("message")}
            rows={6}
            className="mt-2 w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
            placeholder="Tell us about your project, goals, timeline, and any technical details that are relevant..."
          />
          {errors.message && <p className="mt-2 text-xs text-primary">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform group-hover:translate-x-1">
            <AnimatedArrow direction="right" size={14} />
          </span>
        </button>

        {submitted && (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
            <Mail className="h-4 w-4" />
            Message received. We typically reply within 1 business day.
          </div>
        )}

        {submitError && (
          <div className="text-center text-xs text-primary mt-4">{submitError}</div>
        )}
      </form>
    </div>
  )
}
