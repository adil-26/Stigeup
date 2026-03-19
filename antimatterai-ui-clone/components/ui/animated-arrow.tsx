import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type AnimatedArrowProps = {
  direction?: "right" | "up-right"
  size?: number
  className?: string
}

export function AnimatedArrow({ direction = "up-right", size = 16, className }: AnimatedArrowProps) {
  const Icon = direction === "right" ? ArrowRight : ArrowUpRight

  return (
    <span
      aria-hidden="true"
      className={cn(
        "arrow-swap",
        direction === "right" ? "arrow-swap--right" : "arrow-swap--up-right",
        className
      )}
    >
      <Icon className="arrow-swap__icon arrow-swap__icon--current" size={size} />
      <Icon className="arrow-swap__icon arrow-swap__icon--next" size={size} />
    </span>
  )
}
