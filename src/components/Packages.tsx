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
// hover, BASE_SPEED fuera de hover): más alto = frenada/arranque más lento.
const EASE_PER_SECOND = 2.6

export function Packages() {
  const suggested = SUGGESTED_SLUGS.map((slug) => packages.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => !!p,
  )
  const reduced = useReducedMotion()

  const trackRef = useRef<HTMLDivElement>(null)
  const hoveredRef = useRef(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    hoveredRef.current = hovered
  }, [hovered])

  useEffect(() => {
    const track = trackRef.current
    if (!track || reduced) return

    let raf = 0
    let last = performance.now()
    let offset = 0
    let speed = 0

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      const target = hoveredRef.current ? 0 : BASE_SPEED
      // Suavizado exponencial: nunca un corte/arranque abrupto.
      speed += (target - speed) * Math.min(1, EASE_PER_SECOND * dt)
      offset += speed * dt

      // El track renderiza los paquetes dos veces seguidas: al pasar la
      // mitad del ancho, restamos esa mitad y el loop queda sin costuras.
      const half = track.scrollWidth / 2
      if (half > 0 && offset >= half) offset -= half

      track.style.transform = `translateX(-${offset}px)`
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
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
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          ref={trackRef}
          className="flex w-max gap-10 px-6 will-change-transform"
        >
          {(reduced ? suggested : [...suggested, ...suggested]).map((pkg, i) => (
            <div key={`${pkg.slug}-${i}`} className="w-[320px] shrink-0 sm:w-[360px]">
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
