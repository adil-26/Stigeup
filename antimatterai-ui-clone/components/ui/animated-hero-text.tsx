import type { CSSProperties } from "react"
import React from "react"

interface AnimatedHeroLine {
  text: string
  className?: string
}

interface AnimatedHeroTextProps {
  lines: AnimatedHeroLine[]
  className?: string
}

export function AnimatedHeroText({ lines, className = "" }: AnimatedHeroTextProps) {
  return (
    <h1 className={className}>
      {lines.map((lineObj, lineIndex) => {
        const words = lineObj.text.split(" ")
        return (
          <span key={lineIndex} className={`block ${lineObj.className || ""}`}>
            {words.map((word, wordIndex) => {
              const mid = Math.max(1, Math.floor(word.length / 2))
              
              // Handle empty strings gracefully to avoid rendering empty spans with weird margins
              if (!word) return null;

              return (
                <span
                  key={`${word}-${wordIndex}`}
                  className="mr-[0.28em] inline-flex whitespace-nowrap last:mr-0 align-bottom"
                >
                  {Array.from(word).map((character, charIndex) => {
                    const isLeftHalf = charIndex < mid
                    const direction = isLeftHalf ? -1 : 1
                    const distanceFromSplit = Math.abs(charIndex - mid)
                    const fromX = Math.round(direction * (120 + distanceFromSplit * 10))
                    // Increase delays and variables slightly for global smoothing
                    const fromY = Math.round(
                      (lineIndex % 2 === 0 ? -1 : 1) * (18 + (charIndex % 5) * 3)
                    )
                    const waveY = `${(charIndex + wordIndex) % 2 === 0 ? "-" : ""}${4 + ((charIndex + wordIndex) % 4)}px`
                    
                    const charStyle = {
                      "--from-x": `${fromX}px`,
                      "--from-y": `${fromY}px`,
                      "--char-delay": `${Math.round((lineIndex * 200) + (wordIndex * 90) + (distanceFromSplit * 55))}ms`,
                      "--arrive-duration": `${980 + Math.round(distanceFromSplit * 40)}ms`,
                      "--wave-y": waveY,
                    } as CSSProperties

                    return (
                      <span
                        key={`${lineIndex}-${wordIndex}-${charIndex}-${character}`}
                        aria-hidden="true"
                        className="hero-char inline-block"
                        style={charStyle}
                      >
                        {character}
                      </span>
                    )
                  })}
                </span>
              )
            })}
          </span>
        )
      })}
      {/* Screen-reader accessible full text */}
      <span className="sr-only">{lines.map(l => l.text).join(" ")}</span>
    </h1>
  )
}
