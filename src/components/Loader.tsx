import { useEffect, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useLenis } from 'lenis/react'
import camboriuSkyline from '@/assets/destinations/camboriu-skyline.jpg'

// Pantalla de carga: fondo claro con el logo "CheTour" y un avión que lo cruza
// de izquierda a derecha. La estela abre la pantalla en V detrás del avión:
// el overlay son dos mitades (arriba/abajo) recortadas con clip-path que se
// separan siguiendo al avión, y por la apertura se ve el Hero que ya está
// montado debajo. Ambas mitades dibujan el mismo logo centrado, así que
// el texto queda partido por la mitad y se abre junto con la pantalla.

/** Mínimo que se ve el logo antes de que salga el avión (ms). */
const MIN_HOLD = 1400
/** Tope de espera a la primera foto y al globo para no dejar la pantalla colgada. */
const MAX_WAIT = 5000
/** Duración del paso del avión (s). */
const FLIGHT = 2.4
/** Ancho de la estela en V, en % del ancho de pantalla. */
const WAKE = 38
/** Posición final de la punta de la estela: la V sale entera por la derecha. */
const END = 100 + WAKE + 4

type Phase = 'hold' | 'flying' | 'done'

// Mismo avión del isotipo oficial (trazo redondeado), en teal de marca.
const LOGO_PLANE =
  'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'

function Mark() {
  return (
    <div className="loader-mark">
      <div className="loader-logo">
        <svg
          className="loader-logo__icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={LOGO_PLANE} />
        </svg>
        <span className="loader-name">
          <span className="loader-name__che">Che</span>Tour
        </span>
      </div>
      <span className="loader-tag">El puente hacia tu próxima aventura</span>
    </div>
  )
}

const BLOCKED_KEYS = new Set([' ', 'PageDown', 'PageUp', 'Home', 'End', 'ArrowDown', 'ArrowUp'])

export function Loader({ onOpen }: { onOpen: () => void }) {
  const reduced = useReducedMotion()
  const lenis = useLenis()
  const [phase, setPhase] = useState<Phase>('hold')
  // posición de la punta de la estela / el avión, en % del ancho
  const x = useMotionValue(-10)

  // Sin scroll mientras la pantalla tapa la página. No se usa overflow:hidden
  // en <html>: al quitarlo aparecía la barra de scroll y todo el contenido se
  // corría de golpe justo al terminar el vuelo (parecía una recarga).
  useEffect(() => {
    if (phase === 'done') return
    lenis?.stop()
    const stop = (e: Event) => e.preventDefault()
    const stopKey = (e: KeyboardEvent) => {
      if (BLOCKED_KEYS.has(e.key)) e.preventDefault()
    }
    window.addEventListener('wheel', stop, { passive: false })
    window.addEventListener('touchmove', stop, { passive: false })
    window.addEventListener('keydown', stopKey)
    return () => {
      lenis?.start()
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchmove', stop)
      window.removeEventListener('keydown', stopKey)
    }
  }, [lenis, phase])

  // Espera el mínimo de marca, la primera foto del Hero ya decodificada y el
  // chunk de three.js (el globo) descargado, así ese trabajo pesado ocurre
  // mientras el logo está quieto y no en medio del vuelo.
  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.src = camboriuSkyline
    const photo = img.decode().catch(() => {})
    const globe = import('@/components/GlobeSection').catch(() => {})
    const hold = new Promise((r) => window.setTimeout(r, reduced ? 600 : MIN_HOLD))
    const cap = new Promise((r) => window.setTimeout(r, MAX_WAIT))
    Promise.all([hold, Promise.race([Promise.all([photo, globe]), cap])])
      // dos frames de margen para que el montaje del sitio termine de pintar
      .then(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
      .then(() => {
        if (!cancelled) setPhase('flying')
      })
    return () => {
      cancelled = true
    }
  }, [reduced])

  useEffect(() => {
    if (phase !== 'flying') return
    onOpen()
    if (reduced) {
      // sin movimiento: solo un fundido corto (.is-fading)
      const t = window.setTimeout(() => setPhase('done'), 400)
      return () => window.clearTimeout(t)
    }
    // Acelera hasta salir de pantalla (sin frenar al final): un cierre suave
    // dejaba la estela casi quieta en el borde derecho y se sentía como una traba.
    const controls = animate(x, END, {
      duration: FLIGHT,
      ease: [0.3, 0, 0.75, 0.55],
      onComplete: () => setPhase('done'),
    })
    return () => controls.stop()
  }, [phase, reduced, x, onOpen])

  // Cada mitad cubre su lado salvo la V abierta detrás del avión. El borde
  // va de (x, 50%) hasta (x - WAKE, 0%) / (x - WAKE, 100%); si la V todavía
  // no llegó al borde izquierdo, el borde corta en x = 0.
  const half = (side: 'top' | 'bottom') => (px: number) => {
    const p = Math.max(px, 0)
    const edge = p >= WAKE ? 0 : 50 * (1 - p / WAKE)
    const tipX = p >= WAKE ? p - WAKE : 0
    const tipY = side === 'top' ? edge : 100 - edge
    // las mitades se solapan 0,4% para que no asome una costura en el centro
    const mid = side === 'top' ? 50.2 : 49.8
    const far = side === 'top' ? 0 : 100
    const pts = [
      `0% ${far}%`,
      `100% ${far}%`,
      `100% ${mid}%`,
      `${p}% ${mid}%`,
      `${tipX}% ${tipY}%`,
    ]
    return `polygon(${pts.join(', ')})`
  }
  const clipTop = useTransform(x, half('top'))
  const clipBottom = useTransform(x, half('bottom'))
  const planeLeft = useTransform(x, (v) => `${v}%`)
  const trailWidth = useTransform(x, (v) => `${Math.max(v, 0)}%`)

  if (phase === 'done') return null

  return (
    <div
      className={`loader${phase === 'flying' && reduced ? ' is-fading' : ''}`}
      role="status"
      aria-label="Cargando CheTour"
    >
      <motion.div className="loader-half" style={{ clipPath: clipTop }}>
        <Mark />
      </motion.div>
      <motion.div
        className="loader-half"
        style={{ clipPath: clipBottom }}
        aria-hidden="true"
      >
        <Mark />
      </motion.div>

      {phase === 'flying' && !reduced && (
        <>
          <motion.span
            className="loader-trail"
            style={{ width: trailWidth }}
            aria-hidden="true"
          />
          <motion.span
            className="loader-plane"
            style={{ left: planeLeft }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 64 64" width="56" height="56">
              {/* avión visto desde arriba, apuntando a la derecha */}
              <path
                d="M60 32c0-2.2-6-3.6-12-3.6H37L22 10h-5l7 18.4H12l-4-6H4l3 9.6L4 41h4l4-6h12L17 53h5l15-18.4h11c6 0 12-1.4 12-3.6z"
                fill="#fff"
                stroke="#189ca8"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </>
      )}
    </div>
  )
}
