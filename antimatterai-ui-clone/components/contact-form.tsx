"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { AnimatedArrow } from "@/components/ui/animated-arrow"

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more (10+ characters)"),
})

type Values = z.infer<typeof schema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const defaultValues = useMemo<Values>(
    () => ({ name: "", email: "", company: "", message: "" }),
    []
  )

  const {
    register,
    handleSubmit,
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
        values.company ? `Company: ${values.company}` : null,
        "",
        values.message,
      ].filter(Boolean)

      const body = encodeURIComponent(lines.join("\n"))
      window.location.href = `mailto:hello@stigeup.com?subject=${subject}&body=${body}`
      setSubmitError("Saved failed. Opened your email client instead.")
    }
  }


  return (
    <div className="rounded-3xl border border-border bg-card/30 p-6 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Name</label>
            <input
              {...register("name")}
              className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
              placeholder="Your name"
            />
            {errors.name ? (
              <p className="mt-2 text-xs text-primary">{errors.name.message}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Email</label>
            <input
              {...register("email")}
              className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
              placeholder="you@company.com"
            />
            {errors.email ? (
              <p className="mt-2 text-xs text-primary">{errors.email.message}</p>
            ) : null}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Company (optional)</label>
          <input
            {...register("company")}
            className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Message</label>
          <textarea
            {...register("message")}
            rows={6}
            className="mt-2 w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
            placeholder="What are you building? What timeline are you aiming for?"
          />
          {errors.message ? (
            <p className="mt-2 text-xs text-primary">{errors.message.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send message"}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-primary">
            <AnimatedArrow size={14} />
          </span>
        </button>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-4 w-4" />
            Message received. We typically reply within 1 business day.
          </div>
        ) : null}

        {submitError ? (
          <div className="text-center text-xs text-primary">{submitError}</div>
        ) : null}
      </form>
    </div>
  )
}
