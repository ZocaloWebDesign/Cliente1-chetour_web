import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { packages } from '@/data'
import { PackageCard } from '@/components/PackageCard'

// Selección a mano (no las primeras N del array) para mostrar de entrada la
// variedad del catálogo: 2 de Argentina, 2 de Brasil, 1 de EEUU y 1 de
// Europa. El catálogo completo vive en /paquetes (ver AllPackages.tsx).
const SUGGESTED_SLUGS = [
  'bariloche-aereo',
  'rio-de-janeiro',
  'ushuaia-y-calafate',
  'camboriu-bus',
  'estados-unidos-costa-a-costa',
  'europa-al-maximo-londres-madrid',
]

// Velocidad base del auto-scroll, en px/segundo.
const BASE_SPEED = 44
// Qué tan rápido la velocidad actual persigue a la velocidad objetivo (0 en
// hover/drag, BASE_SPEED en reposo): más alto = frenada/arranque más lento.
const EASE_PER_SECOND = 2.6
// Movimiento mínimo (px) para considerar que hubo arrastre y no un
// click/tap — mismo criterio que usa el globo para distinguir tap de drag.
const DRAG_CLICK_THRESHOLD = 6

export function Packages() {
  const suggested = SUGGESTED_SLUGS.map((slug) => packages.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => !!p,
  )
  const reduced = useReducedMotion()

  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const hoveredRef = useRef(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    hoveredRef.current = hovered
  }, [hovered])

  // Arrastrable con mouse y touch (Pointer Events cubre ambos). Con
  // prefers-reduced-motion no hay auto-scroll ni loop infinito: el track no
  // se duplica (ver el map más abajo) y el arrastre queda acotado entre las
  // puntas en vez de dar la vuelta.
  useEffect(() => {
    const track = trackRef.current
    const wrapEl = wrapRef.current
    if (!track || !wrapEl) return

    let raf = 0
    let last = performance.now()
    let offset = 0
    let speed = 0
    let dragging = false
    let pointerId: number | null = null
    let startX = 0
    let startOffset = 0
    let moved = 0
    let captured = false
    let suppressClick = false
    let suppressTimer = 0

    const maxOffset = () => Math.max(0, track.scrollWidth - wrapEl.clientWidth)

    const wrapOffset = (v: number) => {
      if (reduced) return Math.min(Math.max(v, 0), maxOffset())
      const half = track.scrollWidth / 2
      if (half <= 0) return 0
      v %= half
      if (v < 0) v += half
      return v
    }

    const applyTransform = () => {
      track.style.transform = `translateX(-${offset}px)`
    }

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (!dragging) {
        const target = hoveredRef.current ? 0 : BASE_SPEED
        // Suavizado exponencial: nunca un corte/arranque abrupto.
        speed += (target - speed) * Math.min(1, EASE_PER_SECOND * dt)
        offset = wrapOffset(offset + speed * dt)
        applyTransform()
      }

      raf = requestAnimationFrame(tick)
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      dragging = true
      moved = 0
      captured = false
      pointerId = e.pointerId
      startX = e.clientX
      startOffset = offset
      speed = 0
      // Ojo: NO se captura el puntero acá. Capturar en pointerdown redirige
      // el mouseup/click nativo al track aunque no haya habido arrastre, y
      // eso rompe el click de los <Link> de adentro (p. ej. "Ver más") aun
      // en un simple tap. Recién se captura más abajo, al confirmar drag.
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return
      const dx = startX - e.clientX
      moved = Math.max(moved, Math.abs(dx))
      if (!captured && moved > DRAG_CLICK_THRESHOLD) {
        captured = true
        track.setPointerCapture(e.pointerId)
      }
      offset = wrapOffset(startOffset + dx)
      applyTransform()
    }
    const endDrag = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return
      dragging = false
      pointerId = null
      if (moved > DRAG_CLICK_THRESHOLD) {
        // Fue un arrastre, no un tap: el click fantasma que dispara el
        // navegador al soltar no debe navegar (p. ej. si cae sobre "Ver
        // más"). Se limpia solo al consumir ese click, o a los 300ms si no
        // llega ninguno, para no tragarse un click futuro sin relación.
        suppressClick = true
        window.clearTimeout(suppressTimer)
        suppressTimer = window.setTimeout(() => {
          suppressClick = false
        }, 300)
      }
      if (captured) {
        try {
          track.releasePointerCapture(e.pointerId)
        } catch {
          // el pointer ya pudo soltarse solo (p. ej. pointercancel)
        }
      }
    }
    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return
      e.preventDefault()
      e.stopPropagation()
      suppressClick = false
    }

    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', endDrag)
    track.addEventListener('pointercancel', endDrag)
    track.addEventListener('click', onClickCapture, true)

    if (!reduced) raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(suppressTimer)
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', endDrag)
      track.removeEventListener('pointercancel', endDrag)
      track.removeEventListener('click', onClickCapture, true)
    }
  }, [reduced])

  return (
    <section id="paquetes" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="text-sm font-semibold text-sea-600 dark:text-turquoise-300">Sugeridos</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
            Tu próxima historia empieza acá
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Elegimos hoteles, traslados y coordinación para que solo tengas que
            disfrutar el viaje.
          </p>
        </motion.div>
      </div>

      <div
        ref={wrapRef}
        className="overflow-hidden py-12 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          ref={trackRef}
          className="flex w-max cursor-grab touch-pan-y gap-14 px-6 will-change-transform select-none active:cursor-grabbing"
        >
          {(reduced ? suggested : [...suggested, ...suggested]).map((pkg, i) => (
            <div key={`${pkg.slug}-${i}`} className="w-[260px] shrink-0 sm:w-[300px]">
              <PackageCard pkg={pkg} index={i} />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-12 flex justify-center"
      >
        <Link
          to="/paquetes"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 active:scale-95 dark:bg-white dark:text-neutral-950"
        >
          Ver todos los paquetes
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  )
}
