"use client"

import { useRef, useMemo, useEffect, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const PARTICLE_COUNT = 3000

// Shape generators -- each returns an array of [x, y, z] positions
function generateSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const r = radius * (0.85 + Math.random() * 0.15)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  return positions
}

function generateStigeupMark(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3)
  let i = 0
  const max = 500000
  let attempts = 0

  while (i < count && attempts < max) {
    attempts++
    const x = (Math.random() - 0.5) * size * 2.5
    const y = (Math.random() - 0.5) * size * 2.8

    const topY = size * 0.45
    const bottomY = -size * 0.7
    const halfW = size * 0.78

    // Top rounded diamond cap
    const nx = x / (halfW * 0.95)
    const ny = (y - topY) / (size * 0.78)
    const topBody = Math.pow(Math.abs(nx), 1.45) + Math.pow(Math.abs(ny), 1.45) <= 1

    // Lower V reflection
    const lowerY = y - bottomY
    const vHeight = size * 1.05
    const vWidth = size * 1.18
    const inLower = lowerY >= 0 && lowerY <= vHeight
    const widthAtY = (1 - lowerY / vHeight) * vWidth
    const lowerBody = inLower && Math.abs(x) <= widthAtY

    // Cut center hole
    const hx = x / (size * 0.16)
    const hy = (y - size * 0.08) / (size * 0.16)
    const hole = hx * hx + hy * hy < 1

    if ((topBody || lowerBody) && !hole) {
      if (lowerBody && Math.random() < 0.42) continue
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = (Math.random() - 0.5) * size * (topBody ? 0.16 : 0.32)
      i++
    }
  }

  // Fallback fill
  for (; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * size
    positions[i * 3 + 1] = (Math.random() - 0.5) * size
    positions[i * 3 + 2] = (Math.random() - 0.5) * size * 0.2
  }

  return positions
}

function generateRectangle(count: number, width: number, height: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const depth = width * 0.6
  const edgePortion = 0.7
  const edgeCount = Math.floor(count * edgePortion)

  for (let i = 0; i < edgeCount; i++) {
    const edge = Math.floor(Math.random() * 12)
    const t = Math.random()
    const hw = width / 2
    const hh = height / 2
    const hd = depth / 2
    const jitter = 0.15

    let x = 0, y = 0, z = 0
    switch (edge) {
      case 0: x = -hw + t * width; y = hh; z = hd; break
      case 1: x = -hw + t * width; y = -hh; z = hd; break
      case 2: x = -hw + t * width; y = hh; z = -hd; break
      case 3: x = -hw + t * width; y = -hh; z = -hd; break
      case 4: x = hw; y = -hh + t * height; z = hd; break
      case 5: x = -hw; y = -hh + t * height; z = hd; break
      case 6: x = hw; y = -hh + t * height; z = -hd; break
      case 7: x = -hw; y = -hh + t * height; z = -hd; break
      case 8: x = hw; y = hh; z = -hd + t * depth; break
      case 9: x = -hw; y = hh; z = -hd + t * depth; break
      case 10: x = hw; y = -hh; z = -hd + t * depth; break
      case 11: x = -hw; y = -hh; z = -hd + t * depth; break
    }
    positions[i * 3] = x + (Math.random() - 0.5) * jitter
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * jitter
    positions[i * 3 + 2] = z + (Math.random() - 0.5) * jitter
  }

  for (let i = edgeCount; i < count; i++) {
    const face = Math.floor(Math.random() * 6)
    const hw = width / 2
    const hh = height / 2
    const hd = depth / 2
    let x = 0, y = 0, z = 0
    switch (face) {
      case 0: x = hw; y = (Math.random() - 0.5) * height; z = (Math.random() - 0.5) * depth; break
      case 1: x = -hw; y = (Math.random() - 0.5) * height; z = (Math.random() - 0.5) * depth; break
      case 2: y = hh; x = (Math.random() - 0.5) * width; z = (Math.random() - 0.5) * depth; break
      case 3: y = -hh; x = (Math.random() - 0.5) * width; z = (Math.random() - 0.5) * depth; break
      case 4: z = hd; x = (Math.random() - 0.5) * width; y = (Math.random() - 0.5) * height; break
      case 5: z = -hd; x = (Math.random() - 0.5) * width; y = (Math.random() - 0.5) * height; break
    }
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }
  return positions
}

function generateCodeBrackets(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const leftCount = Math.floor(count * 0.42)
  const rightCount = Math.floor(count * 0.42)
  const barStart = leftCount + rightCount
  const hs = size / 2

  // Left bracket: <
  for (let i = 0; i < leftCount; i++) {
    const t = Math.random()
    const jitter = 0.08
    let x: number, y: number
    if (t < 0.5) {
      const lt = t * 2
      x = -hs * 0.3 - lt * hs * 0.5
      y = hs - lt * hs
    } else {
      const lt = (t - 0.5) * 2
      x = -hs * 0.8 + lt * hs * 0.5
      y = -lt * hs
    }
    positions[i * 3] = x + (Math.random() - 0.5) * jitter - 0.3
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * jitter
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4
  }

  // Right bracket: >
  for (let i = leftCount; i < leftCount + rightCount; i++) {
    const t = Math.random()
    const jitter = 0.08
    let x: number, y: number
    if (t < 0.5) {
      const lt = t * 2
      x = hs * 0.3 + lt * hs * 0.5
      y = hs - lt * hs
    } else {
      const lt = (t - 0.5) * 2
      x = hs * 0.8 - lt * hs * 0.5
      y = -lt * hs
    }
    positions[i * 3] = x + (Math.random() - 0.5) * jitter + 0.3
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * jitter
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4
  }

  // Middle vertical bar: |
  for (let i = barStart; i < count; i++) {
    const t = Math.random()
    positions[i * 3] = (Math.random() - 0.5) * 0.12
    positions[i * 3 + 1] = (t - 0.5) * size * 1.45
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.25
  }
  return positions
}

function generatePalette(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const outer = Math.floor(count * 0.6)
  const inner = Math.floor(count * 0.25)
  const holeStart = outer + inner
  const rOuter = size * 0.9
  const rInner = size * 0.55

  for (let i = 0; i < outer; i++) {
    const theta = Math.random() * Math.PI * 1.8 + Math.PI * 0.1
    const r = rOuter * (0.9 + Math.random() * 0.1)
    positions[i * 3] = r * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(theta) * 0.85
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2
  }

  for (let i = outer; i < holeStart; i++) {
    const theta = Math.random() * Math.PI * 1.8 + Math.PI * 0.1
    const r = rInner * (0.9 + Math.random() * 0.1)
    positions[i * 3] = r * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(theta) * 0.8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.12
  }

  for (let i = holeStart; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const r = size * 0.2 * Math.sqrt(Math.random())
    positions[i * 3] = size * 0.35 + r * Math.cos(theta)
    positions[i * 3 + 1] = -size * 0.2 + r * Math.sin(theta)
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1
  }
  return positions
}

function generateBrain(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const r = size * 0.8
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    // Squash into an ellipsoid
    const sx = r * 1.1
    const sy = r * 0.85
    const sz = r * 0.9
    const rFactor = 0.8 + Math.random() * 0.2
    let x = sx * Math.sin(phi) * Math.cos(theta) * rFactor
    let y = sy * Math.sin(phi) * Math.sin(theta) * rFactor
    let z = sz * Math.cos(phi) * rFactor
    // Add groove effect
    const groove = Math.sin(y * 5) * 0.08
    x += groove
    // Split into hemispheres
    if (x > -0.02 && x < 0.02) {
      x += (Math.random() > 0.5 ? 1 : -1) * 0.08
    }
    positions[i * 3] = x
    positions[i * 3 + 1] = z
    positions[i * 3 + 2] = y
  }
  return positions
}

function generateStarCluster(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const stars = [
    { cx: -size * 0.38, cy: -size * 0.22, s: size * 0.72 },
    { cx: size * 0.38, cy: size * 0.22, s: size * 0.52 },
    { cx: size * 0.12, cy: -size * 0.62, s: size * 0.4 },
  ]

  for (let i = 0; i < count; i++) {
    const star = stars[Math.floor(Math.random() * stars.length)]
    const t = Math.random() * Math.PI * 2
    const base = star.s * (0.5 + Math.random() * 0.5)
    // 4-point sparkle: radius modulated by cos(2t)
    const r = base * (0.28 + 0.72 * Math.pow(Math.abs(Math.cos(2 * t)), 0.8))
    const jitter = star.s * 0.03
    positions[i * 3] = star.cx + r * Math.cos(t) + (Math.random() - 0.5) * jitter
    positions[i * 3 + 1] = star.cy + r * Math.sin(t) + (Math.random() - 0.5) * jitter
    positions[i * 3 + 2] = (Math.random() - 0.5) * star.s * 0.2
  }

  return positions
}

function generateChip(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const hs = size * 0.5
  const pinCount = Math.floor(count * 0.3)
  const bodyCount = count - pinCount

  // Main chip body (flat square)
  for (let i = 0; i < bodyCount; i++) {
    const face = Math.random()
    let x: number, y: number, z: number
    if (face < 0.8) {
      // top/bottom faces
      x = (Math.random() - 0.5) * size
      y = (Math.random() - 0.5) * size
      z = face < 0.4 ? hs * 0.15 : -hs * 0.15
    } else {
      // edges
      const edge = Math.floor(Math.random() * 4)
      const t = (Math.random() - 0.5) * size
      switch (edge) {
        case 0: x = hs; y = t; break
        case 1: x = -hs; y = t; break
        case 2: x = t; y = hs; break
        default: x = t; y = -hs; break
      }
      z = (Math.random() - 0.5) * hs * 0.3
    }
    positions[i * 3] = x as number
    positions[i * 3 + 1] = y as number
    positions[i * 3 + 2] = z as number
  }

  // Pins extending from edges
  for (let i = bodyCount; i < count; i++) {
    const side = Math.floor(Math.random() * 4)
    const pinPos = (Math.random() - 0.5) * size * 0.8
    const pinLen = hs + Math.random() * hs * 0.4
    let x = 0, y = 0
    switch (side) {
      case 0: x = pinLen; y = pinPos; break
      case 1: x = -pinLen; y = pinPos; break
      case 2: x = pinPos; y = pinLen; break
      case 3: x = pinPos; y = -pinLen; break
    }
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05
  }
  return positions
}

function generateHeart(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2
    const r = size * 0.5 * (0.7 + Math.random() * 0.3)
    // Heart curve parametric
    const x = r * 16 * Math.pow(Math.sin(t), 3) / 16
    const y = r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16
    const z = (Math.random() - 0.5) * size * 0.3
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }
  return positions
}

function generateDNA(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const strandsCount = Math.floor(count * 0.65)
  const bridgeStart = strandsCount
  const turns = 2.2
  const height = size * 2.3
  const radius = size * 0.48

  for (let i = 0; i < strandsCount; i++) {
    const t = Math.random()
    const angle = t * turns * Math.PI * 2
    const strand = i % 2
    const phase = strand === 0 ? 0 : Math.PI
    const jitter = 0.06
    const x = Math.cos(angle + phase) * radius + (Math.random() - 0.5) * jitter
    const y = (t - 0.5) * height + (Math.random() - 0.5) * jitter
    const z = Math.sin(angle + phase) * radius * 0.75 + (Math.random() - 0.5) * jitter
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }

  for (let i = bridgeStart; i < count; i++) {
    const t = Math.random()
    const angle = t * turns * Math.PI * 2
    const mix = Math.random()
    const x1 = Math.cos(angle) * radius
    const z1 = Math.sin(angle) * radius * 0.75
    const x2 = Math.cos(angle + Math.PI) * radius
    const z2 = Math.sin(angle + Math.PI) * radius * 0.75
    positions[i * 3] = x1 + (x2 - x1) * mix + (Math.random() - 0.5) * 0.04
    positions[i * 3 + 1] = (t - 0.5) * height + (Math.random() - 0.5) * 0.04
    positions[i * 3 + 2] = z1 + (z2 - z1) * mix + (Math.random() - 0.5) * 0.04
  }
  return positions
}

function generateRocket(count: number, size: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const bodyCount = Math.floor(count * 0.6)
  const noseCount = Math.floor(count * 0.2)

  // Body cylinder
  for (let i = 0; i < bodyCount; i++) {
    const theta = Math.random() * Math.PI * 2
    const y = (Math.random() - 0.3) * size * 1.2
    const r = size * 0.25 * (0.9 + Math.random() * 0.1)
    positions[i * 3] = r * Math.cos(theta)
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = r * Math.sin(theta)
  }

  // Nose cone
  for (let i = bodyCount; i < bodyCount + noseCount; i++) {
    const theta = Math.random() * Math.PI * 2
    const t = Math.random()
    const y = size * 0.6 + t * size * 0.5
    const r = size * 0.25 * (1 - t) * (0.9 + Math.random() * 0.1)
    positions[i * 3] = r * Math.cos(theta)
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = r * Math.sin(theta)
  }

  // Fins
  for (let i = bodyCount + noseCount; i < count; i++) {
    const fin = Math.floor(Math.random() * 3)
    const angle = (fin / 3) * Math.PI * 2
    const t = Math.random()
    const y = -size * 0.6 + t * size * 0.4
    const r = size * 0.25 + (1 - t) * size * 0.3
    positions[i * 3] = r * Math.cos(angle)
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = r * Math.sin(angle)
  }
  return positions
}

// Shape definitions keyed by index
const SHAPES = [
  { name: "stigeup-mark", generate: () => generateStigeupMark(PARTICLE_COUNT, 1.45) },
  { name: "rectangle", generate: () => generateRectangle(PARTICLE_COUNT, 3, 2.5) },
  { name: "palette", generate: () => generatePalette(PARTICLE_COUNT, 1.5) }, // Product Design
  { name: "code", generate: () => generateCodeBrackets(PARTICLE_COUNT, 2.5) }, // Development
  { name: "rocket", generate: () => generateRocket(PARTICLE_COUNT, 1.8) }, // GTM Strategy
  { name: "dna", generate: () => generateDNA(PARTICLE_COUNT, 1.9) }, // Healthcare
  { name: "star-cluster", generate: () => generateStarCluster(PARTICLE_COUNT, 1.9) }, // AI Development
  { name: "chip", generate: () => generateChip(PARTICLE_COUNT, 2) }, // IoT Development
]

interface ParticleFieldProps {
  scrollProgress: number
  activeService: number
  servicesVisible: boolean
  servicesProgress: number
}

function ParticleField({
  scrollProgress,
  activeService,
  servicesVisible,
  servicesProgress,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const wasHeroLogoRef = useRef(false)

  // Pre-generate all shapes
  const allShapes = useMemo(() => SHAPES.map((s) => s.generate()), [])
  const sphereShape = allShapes[0]

  // Current and target positions
  const currentPositions = useRef<Float32Array>(new Float32Array(sphereShape))
  const velocities = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT * 3))

  // Ensure first paint and top-of-page refresh always stay spherical.
  useEffect(() => {
    if (scrollProgress > 0.02 || servicesVisible) return
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      currentPositions.current[i] = sphereShape[i]
      velocities.current[i] = 0
    }
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      positions.set(sphereShape)
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  }, [scrollProgress, servicesVisible, sphereShape])

  const isHeroLogo = !servicesVisible && scrollProgress < 0.3

  // Whenever we re-enter hero, hard-reset to STIGEUP mark so it always appears immediately.
  useEffect(() => {
    if (isHeroLogo && !wasHeroLogoRef.current) {
      for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        currentPositions.current[i] = sphereShape[i]
        velocities.current[i] = 0
      }
      if (pointsRef.current) {
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
        positions.set(sphereShape)
        pointsRef.current.geometry.attributes.position.needsUpdate = true
      }
    }
    wasHeroLogoRef.current = isHeroLogo
  }, [isHeroLogo, sphereShape])

  // Determine target shape based on scroll
  const getTargetShape = useCallback(
    (scroll: number, service: number, isServicesVisible: boolean, sectionProgress: number): Float32Array => {
      if (!isServicesVisible || scroll < 0.16 || sectionProgress < 0.12) {
        // Hero only: keep sphere
        return allShapes[0]
      } else if (sectionProgress < 0.06 && service === 0) {
        // Very short entry phase for services intro.
        return allShapes[1]
      } else {
        // In services section -- strictly follow active service card.
        const shapeIndex = Math.min(service + 2, allShapes.length - 1)
        return allShapes[shapeIndex]
      }
    },
    [allShapes]
  )

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array
    const target = getTargetShape(
      scrollProgress,
      activeService,
      servicesVisible,
      servicesProgress
    )
    const isOpeningHero = isHeroLogo

    const inRectanglePhase = servicesVisible && servicesProgress < 0.06 && activeService === 0
    const lerpSpeed = (inRectanglePhase ? 1.5 : 3.2) * delta
    const time = state.clock.elapsedTime

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Lerp toward target with spring-like motion
      const dx = target[i3] - currentPositions.current[i3]
      const dy = target[i3 + 1] - currentPositions.current[i3 + 1]
      const dz = target[i3 + 2] - currentPositions.current[i3 + 2]

      velocities.current[i3] += dx * lerpSpeed * 0.5
      velocities.current[i3 + 1] += dy * lerpSpeed * 0.5
      velocities.current[i3 + 2] += dz * lerpSpeed * 0.5

      // Damping
      velocities.current[i3] *= 0.92
      velocities.current[i3 + 1] *= 0.92
      velocities.current[i3 + 2] *= 0.92

      currentPositions.current[i3] += velocities.current[i3]
      currentPositions.current[i3 + 1] += velocities.current[i3 + 1]
      currentPositions.current[i3 + 2] += velocities.current[i3 + 2]

      // Add subtle floating motion
      const floatX = isOpeningHero
        ? Math.sin(time * 2.25 + i * 0.27) * 0.0039
        : Math.sin(time * 0.3 + i * 0.01) * 0.015
      const floatY = isOpeningHero
        ? Math.cos(time * 2.05 + i * 0.31) * 0.0039
        : Math.cos(time * 0.4 + i * 0.015) * 0.015

      positions[i3] = currentPositions.current[i3] + floatX
      positions[i3 + 1] = currentPositions.current[i3 + 1] + floatY
      positions[i3 + 2] = currentPositions.current[i3 + 2]
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Keep model front-facing with subtle motion instead of full 360 rotation.
    if (isOpeningHero) {
      pointsRef.current.rotation.y = 0
      pointsRef.current.rotation.x = 0
      if (materialRef.current) {
        materialRef.current.opacity = 0.72 + Math.sin(time * 2.5) * 0.05
      }
    } else {
      pointsRef.current.rotation.y = Math.sin(time * 0.22) * 0.08
      pointsRef.current.rotation.x = Math.sin(time * 0.16) * 0.035
      if (materialRef.current) {
        materialRef.current.opacity = 0.78
      }
    }
  })

  const initialPositions = useMemo(() => {
    return sphereShape
  }, [sphereShape])

  const sizes = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      s[i] = 0.8 + Math.random() * 1.5
    }
    return s
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.013}
        color="#ff5a00"
        transparent
        opacity={0.78}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

interface ParticleGlobeProps {
  scrollProgress: number
  activeService: number
  servicesVisible: boolean
  servicesProgress: number
}

export function ParticleGlobe({
  scrollProgress,
  activeService,
  servicesVisible,
  servicesProgress,
}: ParticleGlobeProps) {
  return (
    <div
      className="w-full h-full transition-none"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <group
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
        >
          <ParticleField
            scrollProgress={scrollProgress}
            activeService={activeService}
            servicesVisible={servicesVisible}
            servicesProgress={servicesProgress}
          />
        </group>
      </Canvas>
    </div>
  )
}
