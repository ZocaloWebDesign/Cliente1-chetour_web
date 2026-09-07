import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Packages } from '@/components/Packages'
import { Experiences } from '@/components/Experiences'
import { About } from '@/components/About'
import { Cta } from '@/components/Cta'
import { Footer } from '@/components/Footer'

// three.js pesa varios cientos de KB: se separa en su propio chunk y se
// carga en paralelo al bundle principal en vez de bloquear el primer paint.
const GlobeSection = lazy(() =>
  import('@/components/GlobeSection').then((m) => ({ default: m.GlobeSection }))
)

export function Home() {
  const reduced = useReducedMotion()

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
      <main className="relative">
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
              <Suspense fallback={<div className="min-h-[70vh]" />}>
                <GlobeSection />
              </Suspense>
            </div>
          </div>
          <div className="hero-reveal__spacer" aria-hidden />
          {/* ancla de #destinos: en el punto donde la persiana termina de abrir
              (GlobeSection ya destapada), no arriba de todo tapada por el Hero */}
          <div id="destinos" aria-hidden className="hero-reveal__anchor" />
        </div>

        <Packages />
        <Experiences />
        <About />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
