import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type TouchEvent,
} from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLenis } from 'lenis/react'
import camboriuSkyline from '@/assets/destinations/camboriu-skyline.jpg'
import barilocheLago from '@/assets/destinations/bariloche-lago.jpg'
import disneyPanorama from '@/assets/destinations/disney-castle-panorama.jpg'
import canasvieirasPraia from '@/assets/destinations/canasvieiras-praia-hero.jpg'
import proximosAfrica from '@/assets/destinations/proximos/africa.jpg'
import proximosEeuu from '@/assets/destinations/proximos/estados-unidos.jpg'
import proximosEuropa from '@/assets/destinations/proximos/europa.jpg'
import proximosEgipto from '@/assets/destinations/proximos/egipto.jpg'
import { NAV_OFFSET } from '@/hooks/use-hash-scroll'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'

// El "hero" es un carrusel de destinos a pantalla completa (portado del
// artefacto "CheTour Viajes"): fondo con cross-fade + ken-burns, riel de
// puntos, contador, flechas, miniaturas, barra de progreso y un slide de
// cierre con grilla de 4 continentes. Las fotos son las reales de
// src/assets; los estilos y transiciones viven en index.css bajo .hero-*.

type DestinationSlide = {
  key: string
  /** Etiqueta corta para el riel, las miniaturas y el lector de pantalla. */
  label: string
  region: string
  titleTop: string
  titleEm: string
  blurb: string
  ctaLabel: string
  ctaHref: string
  image: string
  /** Bajada de la miniatura (lugar puntual dentro del destino). */
  previewCaption: string
}

const destinationSlides: DestinationSlide[] = [
  {
    key: 'camboriu',
    label: 'Camboriú',
    region: 'Sur de Brasil · Internacional',
    titleTop: 'Balneário',
    titleEm: 'Camboriú',
    blurb:
      'La «Dubái brasileña»: playa urbana, el teleférico del Parque Unipraias y la vida nocturna más famosa del sur de Brasil.',
    ctaLabel: 'Consultar',
    ctaHref: '#paquetes',
    image: camboriuSkyline,
    previewCaption: 'Praia Central, Brasil',
  },
  {
    key: 'bariloche',
    label: 'Bariloche',
    region: 'Patagonia · Argentina',
    titleTop: 'San Carlos de',
    titleEm: 'Bariloche',
    blurb:
      'Lagos glaciares, bosque andino-patagónico y montaña. El clásico argentino, a pocas horas en avión y con salidas todo el año.',
    ctaLabel: 'Consultar',
    ctaHref: '#contacto',
    image: barilocheLago,
    previewCaption: 'Lago Nahuel Huapi',
  },
  {
    key: 'disney',
    label: 'Disney',
    region: 'Orlando · Estados Unidos',
    titleTop: 'Walt Disney',
    titleEm: 'World',
    blurb:
      'El viaje soñado, armado día por día a tu presupuesto: días de parque, categoría de hotel, entradas y traslados a tu medida.',
    ctaLabel: 'Consultar',
    ctaHref: '#paquetes',
    image: disneyPanorama,
    previewCaption: 'Magic Kingdom, Florida',
  },
  {
    key: 'canasvieiras',
    label: 'Canasvieiras',
    region: 'Sur de Brasil · Internacional',
    titleTop: 'Isla de',
    titleEm: 'Florianópolis',
    blurb:
      'Aguas calmas y poca profundidad en la Isla de la Magia. La playa preferida por las familias para un primer viaje a Brasil.',
    ctaLabel: 'Consultar',
    ctaHref: '#paquetes',
    image: canasvieirasPraia,
    previewCaption: 'Ilha de Santa Catarina',
  },
]

// Slide de cierre: grilla de 4 continentes + CTA centrado (como .cs-multi).
const multiPanels = [
  { name: 'África', image: proximosAfrica },
  { name: 'Estados Unidos', image: proximosEeuu },
  { name: 'Europa', image: proximosEuropa },
  { name: 'Egipto', image: proximosEgipto },
]

const finalSlide = {
  label: 'Próximos destinos',
  previewImage: proximosEgipto,
  previewCaption: 'África · EE.UU. · Europa · Egipto',
  ctaLabel: 'Explorar',
  ctaHref: '#destinos',
}

// Items comunes a fondo / riel / contador / miniaturas (destinos + cierre).
// El slide de cierre no tiene foto de fondo (bg: null → banda de color plano);
// la imagen la ponen los 4 paneles.
const railItems = [
  ...destinationSlides.map((s) => ({
    label: s.label,
    bg: s.image as string | null,
    previewImage: s.image,
    caption: s.previewCaption,
  })),
  {
    label: finalSlide.label,
    bg: null,
    previewImage: finalSlide.previewImage,
    caption: finalSlide.previewCaption,
  },
]

const N = railItems.length
const LAST = N - 1
const INTERVAL = 4000

export function Hero() {
  const reduced = useReducedMotion()
  const lenis = useLenis()

  // Los CTA del hero apuntan a anclas de la home (#paquetes, #contacto,
  // #destinos). Scroll suave con Lenis; si todavía no está listo, cae al
  // scroll nativo.
  const scrollToHash = useCallback(
    (href: string) => {
      const el = document.getElementById(href.slice(href.indexOf('#') + 1))
      if (!el) return
      history.pushState(null, '', href)
      if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET })
      else el.scrollIntoView({ behavior: 'smooth' })
    },
    [lenis],
  )

  const [cur, setCur] = useState(0)
  const [tabHidden, setTabHidden] = useState(false)
  const [focusPause, setFocusPause] = useState(false)
  const touchX = useRef<number | null>(null)

  // El auto-avance solo se detiene con la pestaña oculta, con foco de teclado
  // dentro del carrusel o con prefers-reduced-motion. NO se pausa con hover:
  // el hero ocupa toda la pantalla y cualquier movimiento del mouse lo dejaría
  // congelado.
  const paused = tabHidden || focusPause

  const go = useCallback((i: number) => setCur(((i % N) + N) % N), [])

  // Con animación visible, el cambio de slide lo dispara el final de la barra
  // de progreso (onAnimationEnd más abajo): así la barra y el cambio quedan
  // sincronizados exactamente, sin desfase. El temporizador solo se usa cuando
  // NO hay barra (prefers-reduced-motion).
  useEffect(() => {
    if (!reduced || paused) return
    const t = window.setTimeout(() => setCur((c) => (c + 1) % N), INTERVAL)
    return () => window.clearTimeout(t)
  }, [cur, paused, reduced])

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(cur + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(cur - 1)
    }
  }

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 45) go(cur + (dx < 0 ? 1 : -1))
    touchX.current = null
  }

  // Miniaturas: los próximos 3 destinos (se ocultan en el slide de cierre).
  const previewOrder = Array.from(
    { length: Math.min(3, N - 1) },
    (_, k) => (cur + k + 1) % N,
  )

  return (
    <section
      id="top"
      className="hero-carousel"
      aria-roledescription="carrusel"
      aria-label="Destinos de CheTour"
      onKeyDown={onKeyDown}
      onFocus={() => setFocusPause(true)}
      onBlur={() => setFocusPause(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero-bgs" aria-hidden="true">
        {railItems.map((it, i) => (
          <div
            key={it.label}
            className={`hero-bg${it.bg ? '' : ' hero-bg--solid'}${cur === i ? ' is-active' : ''}`}
            style={it.bg ? { backgroundImage: `url(${it.bg})` } : undefined}
          />
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <nav
        className={`hero-rail${cur === LAST ? ' is-hidden' : ''}`}
        aria-label="Elegir destino"
        aria-hidden={cur === LAST}
        style={{ '--rail-progress': cur / (N - 1) } as CSSProperties}
      >
        <span className="hero-rail-line" aria-hidden="true" />
        <span className="hero-rail-fill" aria-hidden="true" />
        {railItems.map((it, i) => (
          <button
            key={it.label}
            type="button"
            className={`hero-dot${cur === i ? ' is-active' : ''}`}
            aria-label={`Ir a ${it.label}`}
            aria-current={cur === i}
            tabIndex={cur === LAST ? -1 : 0}
            onClick={() => go(i)}
          />
        ))}
      </nav>

      <div className="hero-main">
        {destinationSlides.map((s, i) => {
          const active = cur === i
          return (
            <div
              key={s.key}
              className={`hero-copy${active ? ' is-active' : ''}`}
              aria-hidden={!active}
            >
              <p className="hero-region">{s.region}</p>
              {active ? (
                <h1 className="hero-title">
                  {s.titleTop}
                  <br />
                  <em>{s.titleEm}</em>
                </h1>
              ) : (
                <p className="hero-title" aria-hidden="true">
                  {s.titleTop}
                  <br />
                  <em>{s.titleEm}</em>
                </p>
              )}
              <p className="hero-blurb">{s.blurb}</p>
              <InteractiveHoverButton
                type="button"
                className="hero-cta-btn"
                text={s.ctaLabel}
                onClick={() => scrollToHash(s.ctaHref)}
                tabIndex={active ? 0 : -1}
              />
            </div>
          )
        })}
      </div>

      <div
        className={`hero-multi${cur === LAST ? ' is-active' : ''}`}
        aria-hidden={cur !== LAST}
      >
        <div className="hero-multi-grid" aria-hidden="true">
          {multiPanels.map((p) => (
            <div key={p.name} className="hero-multi-panel">
              <div
                className="hero-multi-panel-bg"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <span className="hero-multi-name">{p.name}</span>
            </div>
          ))}
        </div>
        <div className="hero-multi-cta">
          <h2 className="hero-multi-title">
            Tu próxima historia empieza con un <em>viaje</em>
          </h2>
          <InteractiveHoverButton
            type="button"
            className="hero-cta-btn"
            text={finalSlide.ctaLabel}
            onClick={() => scrollToHash(finalSlide.ctaHref)}
            tabIndex={cur === LAST ? 0 : -1}
          />
        </div>
      </div>

      <ul className="hero-previews" aria-hidden="true">
        {previewOrder.map((idx) => (
          <li key={railItems[idx].label}>
            <button
              type="button"
              className="hero-preview"
              onClick={() => go(idx)}
              tabIndex={-1}
            >
              <span
                className="hero-preview-img"
                style={{ backgroundImage: `url(${railItems[idx].previewImage})` }}
              />
              <span className="hero-preview-cap">
                <small>{railItems[idx].caption}</small>
                <strong>{railItems[idx].label}</strong>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="hero-arrows">
        <button
          type="button"
          className="hero-arrow"
          aria-label="Destino anterior"
          onClick={() => go(cur - 1)}
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={1.25} />
        </button>
        <button
          type="button"
          className="hero-arrow"
          aria-label="Destino siguiente"
          onClick={() => go(cur + 1)}
        >
          <ChevronRight className="h-7 w-7" strokeWidth={1.25} />
        </button>
      </div>

      {!reduced && (
        <span
          key={cur}
          className="hero-progress"
          aria-hidden="true"
          style={{
            animationDuration: `${INTERVAL}ms`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
          onAnimationEnd={() => {
            if (!paused) setCur((c) => (c + 1) % N)
          }}
        />
      )}
    </section>
  )
}
