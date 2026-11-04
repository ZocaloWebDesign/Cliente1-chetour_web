import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Packages } from '@/components/Packages'
import { Experiences } from '@/components/Experiences'
import { About } from '@/components/About'
import { Cta } from '@/components/Cta'
import { Footer } from '@/components/Footer'
import { useSiteOpen } from '@/hooks/use-site-open'

// three.js pesa varios cientos de KB: se separa en su propio chunk y se
// carga en paralelo al bundle principal en vez de bloquear el primer paint.
const loadGlobe = () => import('@/components/GlobeSection')
const GlobeSection = lazy(() => loadGlobe().then((m) => ({ default: m.GlobeSection })))

// Equipos justos de CPU/memoria o con "ahorro de datos": el globo no se arma
// por adelantado, solo cuando la persona interactúa.
const isLowEnd = () => {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  return (
    !!nav.connection?.saveData ||
    (nav.hardwareConcurrency ?? 4) < 4 ||
    (nav.deviceMemory ?? 8) < 4
  )
}

const whenIdle = (cb: () => void, timeout: number) =>
  typeof window.requestIdleCallback === 'function'
    ? window.requestIdleCallback(cb, { timeout })
    : window.setTimeout(cb, 200)

export function Home() {
  const reduced = useReducedMotion()

  // El globo (three.js: ~700 KB y ~1 s de CPU en un celular medio) queda tapado
  // por el Hero al cargar. Armarlo justo cuando la persona empieza a scrollear
  // trababa la transición Hero → globo (se descargaba, evaluaba y construía
  // mientras el Hero subía), así que se prepara por adelantado en dos pasos y
  // en momentos libres, ya con el sitio abierto:
  //   1. a los ~2 s se baja y evalúa el código (sin crear WebGL ni geometrías);
  //   2. en equipos con recursos, justo después se monta el globo, que sigue
  //      sin dibujar mientras el Hero lo tapa (ver hero-cover.ts).
  // En equipos justos el paso 2 espera a la primera interacción (scroll, toque
  // o tecla) o, si la persona no se mueve, a los 8 s.
  const siteOpen = useSiteOpen()
  const [globeOn, setGlobeOn] = useState(false)
  useEffect(() => {
    if (!siteOpen || globeOn) return
    const mount = () => {
      void loadGlobe()
      setGlobeOn(true)
    }
    const lowEnd = isLowEnd()
    let idle = 0
    const timer = window.setTimeout(() => {
      idle = whenIdle(() => {
        void loadGlobe().then(() => {
          if (!lowEnd) idle = whenIdle(mount, 3000)
        })
      }, 3000)
    }, 2000)
    const fallback = window.setTimeout(mount, 8000)
    const opts = { once: true, passive: true } as const
    const events = ['scroll', 'wheel', 'touchstart', 'keydown'] as const
    events.forEach((e) => window.addEventListener(e, mount, opts))
    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(fallback)
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle)
      window.clearTimeout(idle)
      events.forEach((e) => window.removeEventListener(e, mount))
    }
  }, [siteOpen, globeOn])

  // --- Transición "persiana" Hero → GlobeSection --------------------------------
  // La GlobeSection queda QUIETA en su lugar; el Hero —una capa superpuesta por
  // encima (position: absolute, z-index alto)— se desliza hacia arriba y sale por
  // el borde superior, destapándola.
  //
  // El contenedor .hero-reveal__pin es sticky top:0 y mantiene la GlobeSection
  // inmóvil. .hero-reveal__spacer (100svh, en el CSS) es el "runway": hace que el
  // sticky se suelte exactamente 1 viewport después de arrancar, sin importar el
  // alto de la GlobeSection ni si todavía está cargando (lazy). Ese mismo viewport
  // es lo que Home.tsx tarda en subir el Hero de translateY:0 a -100%, así que el
  // handoff es continuo (sticky no salta) y no queda scroll muerto ni hueco antes
  // de Packages. Total hasta Packages = altoGlobe + 100svh ≈ altoHero + altoGlobe
  // de antes → los stops en vh del degradé de body en index.css siguen válidos.
  const [viewport, setViewport] = useState(() =>
    typeof window === 'undefined' ? 0 : window.innerHeight,
  )
  useEffect(() => {
    const onResize = () => setViewport(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const { scrollY } = useScroll()
  // 0 → -100% (de la propia altura del Hero, = 100svh) a lo largo del primer
  // viewport de scroll; clamp por defecto deja el Hero en -100% pasado el tramo.
  const heroY = useTransform(scrollY, [0, viewport || 1], ['0%', '-100%'])

  return (
    <div className="min-h-screen text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Nav />
      <main id="contenido" className="relative">
        <div className="hero-reveal">
          <div className="hero-reveal__pin">
            <motion.div
              className="hero-reveal__hero"
              // con prefers-reduced-motion el CSS deja esta capa en flujo normal
              // y acá no se aplica la transformación.
              style={reduced ? undefined : { y: heroY }}
            >
              <Hero />
            </motion.div>
            <div className="hero-reveal__globe">
              {globeOn ? (
                <Suspense fallback={<div className="min-h-[70vh]" />}>
                  <GlobeSection />
                </Suspense>
              ) : (
                <div className="min-h-[70vh]" />
              )}
            </div>
          </div>
          <div className="hero-reveal__spacer" aria-hidden />
          {/* ancla de #destinos: en el punto donde la persiana termina de abrir
              (GlobeSection ya destapada), no arriba de todo tapada por el Hero */}
          <div id="destinos" aria-hidden className="hero-reveal__anchor" />
        </div>

        <Packages />
        <About />
        <Experiences />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
