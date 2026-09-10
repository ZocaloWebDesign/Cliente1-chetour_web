import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useHashScroll } from '@/hooks/use-hash-scroll'
import { ArrowRight, Bus, Plane as PlaneIcon } from 'lucide-react'
import { ShaderBackground } from '@/components/ui/shader-59f0538a'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ConicPolygonGeometry from 'three-conic-polygon-geometry'
import { availableCountries, globeCountryCards, type GlobeCardEntry } from '@/data'
import earthTextureUrl from '@/assets/globe/earth-texture.jpg'
import countriesGeoJson from '@/assets/globe/countries.geo.json'
import { buildStylizedEarthTexture, buildAtmosphereMaterial } from '@/lib/earth-texture'

const DEG2RAD = Math.PI / 180
const GLOBE_RADIUS = 1.7

// Relieve de los territorios marcados: "apenas elevado" sobre la superficie.
// El alto en ConicPolygonGeometry es directamente el radio desde el centro,
// así que 1.0 = superficie del globo.
const COUNTRY_BASE = GLOBE_RADIUS * 1.001
const COUNTRY_TOP = GLOBE_RADIUS * 1.022
const HOVER_SCALE = 1.035 // cuánto más se levanta el país al pasarle el mouse/dedo
const FLYTO_EASE = 0.14 // qué tan rápido el globo se gira hacia el país en hover

// Las tarjetas de un país quedan fijas (y el globo, frenado) después de dejar
// de apuntar al país; se desvanecen solas cuando el usuario se va o hace scroll.
const CARD_IDLE_MS = 3000 // sin cursor sobre la tarjeta ni el país
const CARD_SCROLL_MS = 1600 // margen tras hacer scroll antes de retomar el giro

// A partir de cuántos destinos la lista pasa a un tamaño de ítem más chico
// (para que todos entren siempre en la misma caja, sin cambiar su alto).
const LIST_COMPACT_AT = 7
const LIST_TIGHT_AT = 8

type ListDensity = 'normal' | 'compact' | 'tight'

function densityFor(count: number): ListDensity {
  if (count >= LIST_TIGHT_AT) return 'tight'
  if (count >= LIST_COMPACT_AT) return 'compact'
  return 'normal'
}

// ConicPolygonGeometry proyecta (lng,lat) con theta = 90-lng; la esfera con la
// textura equirectangular de este proyecto usa theta = lng+180. La diferencia es
// una rotación de +90° en Y: por eso el grupo de países va girado ese cuarto de
// vuelta para quedar alineado con los continentes de la textura.
const COUNTRY_LNG_OFFSET = Math.PI / 2

// Mismo mapeo (lng,lat)->xyz que usa ConicPolygonGeometry internamente, para
// dibujar el contorno del país exactamente sobre el borde de su relieve.
function geoToVector3(lng: number, lat: number, r: number) {
  const phi = (90 - lat) * DEG2RAD
  const theta = (90 - lng) * DEG2RAD
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

type CountryFeature = {
  properties: { code: string; name: string }
  geometry: { type: string; coordinates: number[][][][] }
}
const countryFeatures = (countriesGeoJson as { features: CountryFeature[] }).features
const countryMetaByCode = new Map(availableCountries.map((c) => [c.code, c]))

type CountryObject = {
  code: string
  name: string
  group: THREE.Group
  capMaterial: THREE.MeshBasicMaterial
  sideMaterial: THREE.MeshBasicMaterial
  outlineMaterial: THREE.LineBasicMaterial
  /** Dirección (mundo) del centro del país: hacia acá encara la cámara en hover. */
  centerDir: THREE.Vector3
  hover: number // 0..1, animado en el loop
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

// --- Datos: aplanar las tarjetas de un país en una única lista ordenada -----
// `globeCountryCards` sigue guardando sus columnas `left`/`right` (más fáciles
// de armar a mano, agrupadas por tema); acá se concatenan en un solo listado
// para alimentar tanto la lista de la izquierda como la card destacada.
function flattenCountryEntries(code: string | null): GlobeCardEntry[] {
  if (!code) return []
  const cards = globeCountryCards[code]
  if (!cards) return []
  return [...(cards.left ?? []), ...(cards.right ?? [])].flatMap((card) => card.entries)
}

// La modalidad se guarda como texto libre en `mode` (ver `data.ts`): a veces
// es realmente el medio de transporte ("Aéreo · Bus") y a veces una
// descripción del recorrido ("San Francisco · Los Ángeles · ..."). Solo en el
// primer caso se puede mostrar como íconos; si no matchea, `mode` se muestra
// tal cual, como texto.
function parseTransport(mode?: string): ('aereo' | 'bus')[] {
  if (!mode) return []
  const tags: ('aereo' | 'bus')[] = []
  if (/aéreo/i.test(mode)) tags.push('aereo')
  if (/\bbus\b/i.test(mode)) tags.push('bus')
  return tags
}

const TRANSPORT_LABEL: Record<'aereo' | 'bus', string> = { aereo: 'Aéreo', bus: 'Bus' }

// --- Animaciones de la lista y la card destacada ----------------------------
// Lista: la columna entera cruza con un fundido/leve deslizamiento al cambiar
// de país; cada item entra escalonado por índice. Card: fundido + zoom
// extremadamente sutil al cambiar de destino activo (cinematográfico, no un
// corte brusco).
function listColumnMotion(reduced: boolean) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.15 } },
      exit: { opacity: 0, transition: { duration: 0.12 } },
    }
  }
  return {
    initial: { opacity: 0, x: -18 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
    exit: { opacity: 0, x: -12, transition: { duration: 0.16, ease: 'easeIn' as const } },
  }
}

function listItemMotion(index: number, reduced: boolean) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.15, delay: index * 0.03 } },
    }
  }
  return {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const, delay: 0.04 + index * 0.045 },
    },
  }
}

function featuredCardMotion(reduced: boolean) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.18 } },
      exit: { opacity: 0, transition: { duration: 0.15 } },
    }
  }
  return {
    initial: { opacity: 0, scale: 1.03 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
    exit: { opacity: 0, scale: 0.99, transition: { duration: 0.22, ease: 'easeIn' as const } },
  }
}

// Tamaños por densidad: `normal` es el de siempre; `compact`/`tight` achican
// thumbnail, tipografía y paddings a medida que entran más destinos, para que
// la lista completa (sin flechita, sin recortar) siga entrando siempre en la
// misma caja — ver `densityFor` y el alto fijo de DestinationListPanel.
const ITEM_DENSITY = {
  normal: {
    gap: 'gap-1.5',
    button: 'gap-3 px-2.5 py-2.5',
    thumb: 'h-12 w-12',
    number: 'text-[11px]',
    name: 'text-[13px]',
    caption: 'text-[11px] mt-0.5',
    icon: 'h-3 w-3',
  },
  compact: {
    gap: 'gap-1',
    button: 'gap-2.5 px-2 py-2',
    thumb: 'h-10 w-10',
    number: 'text-[10px]',
    name: 'text-[12px]',
    caption: 'text-[10px] mt-0.5',
    icon: 'h-2.5 w-2.5',
  },
  tight: {
    gap: 'gap-0.5',
    button: 'gap-2 px-2 py-1.5',
    thumb: 'h-9 w-9',
    number: 'text-[10px]',
    name: 'text-[11px]',
    caption: 'text-[10px] mt-0',
    icon: 'h-2.5 w-2.5',
  },
} as const satisfies Record<ListDensity, Record<string, string>>

// Item compacto de la lista de destinos: thumbnail + nombre + transporte.
// El activo (hover propio o el primero por default) queda más luminoso, con
// un glow sutil — nada exagerado.
function DestinationListItem({
  index,
  entry,
  active,
  reduced,
  density,
  onActivate,
}: {
  index: number
  entry: GlobeCardEntry
  active: boolean
  reduced: boolean
  density: ListDensity
  onActivate: () => void
}) {
  const transport = parseTransport(entry.mode)
  const d = ITEM_DENSITY[density]
  return (
    <motion.li {...listItemMotion(index, reduced)}>
      <button
        type="button"
        onMouseEnter={onActivate}
        onFocus={onActivate}
        className={cx(
          'group flex w-full items-center rounded-2xl border text-left transition-all duration-300 ease-out',
          d.button,
          active
            ? 'border-white/35 bg-white/15 shadow-[0_0_20px_rgba(255,255,255,0.14)]'
            : 'border-transparent bg-white/[0.04] hover:border-white/15 hover:bg-white/10',
        )}
      >
        <span className={cx('relative shrink-0 overflow-hidden rounded-xl', d.thumb)}>
          <img
            src={entry.image}
            alt=""
            loading="lazy"
            className={cx(
              'h-full w-full object-cover transition-[filter,transform] duration-300',
              active ? 'brightness-100' : 'brightness-90 group-hover:brightness-100',
            )}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className={cx('font-semibold tabular-nums text-white/45', d.number)}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={cx(
                'truncate leading-snug font-medium transition-colors duration-300',
                d.name,
                active ? 'text-white' : 'text-white/80',
              )}
            >
              {entry.name}
            </span>
          </span>
          <span className={cx('flex items-center gap-2 pl-[22px] text-white/55', d.caption)}>
            {transport.length > 0 ? (
              transport.map((tag) =>
                tag === 'aereo' ? (
                  <span key={tag} className="inline-flex items-center gap-1">
                    <PlaneIcon className={d.icon} /> {TRANSPORT_LABEL[tag]}
                  </span>
                ) : (
                  <span key={tag} className="inline-flex items-center gap-1">
                    <Bus className={d.icon} /> {TRANSPORT_LABEL[tag]}
                  </span>
                ),
              )
            ) : entry.category ? (
              <span className="truncate">{entry.category}</span>
            ) : null}
          </span>
        </span>
      </button>
    </motion.li>
  )
}

// Lista de destinos del país fijado: un solo bloque (mismo para mobile y
// desktop, `order-*` los reordena en el grid del return), SIEMPRE con todos
// los destinos — sin flechita ni recorte. La caja se ajusta a su contenido
// (sin alto forzado ni relleno para centrarlo): así nunca queda espacio
// muerto arriba/abajo, tenga 1 destino u 8. Cuando el país tiene más destinos
// de la cuenta, los ítems se achican (ver `densityFor`/`ITEM_DENSITY`) para
// que la caja no crezca desmedidamente igual.
function DestinationListPanel({
  activeCardCode,
  entries,
  activeIndex,
  reduced,
  onActivate,
  onEnter,
  onLeave,
}: {
  activeCardCode: string | null
  entries: GlobeCardEntry[]
  activeIndex: number
  reduced: boolean
  onActivate: (index: number) => void
  onEnter: () => void
  onLeave: () => void
}) {
  const density = densityFor(entries.length)

  return (
    <AnimatePresence mode="wait">
      {entries.length > 0 ? (
        <motion.div
          key={activeCardCode}
          {...listColumnMotion(reduced)}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="flex w-full flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-2.5 shadow-xl shadow-sea-950/20 backdrop-blur-md"
        >
          <ul className={cx('flex flex-col', ITEM_DENSITY[density].gap)}>
            {entries.map((entry, i) => (
              <DestinationListItem
                key={entry.name}
                index={i}
                entry={entry}
                active={i === activeIndex}
                reduced={reduced}
                density={density}
                onActivate={() => onActivate(i)}
              />
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function FeaturedCard({
  activeCardCode,
  entry,
  countryName,
  href,
  reduced,
  onEnter,
  onLeave,
  onHashClick,
}: {
  activeCardCode: string | null
  entry: GlobeCardEntry | undefined
  countryName: string
  href: string
  reduced: boolean
  onEnter: () => void
  onLeave: () => void
  onHashClick: ReturnType<typeof useHashScroll>
}) {
  return (
    <AnimatePresence mode="wait">
      {entry ? (
        <motion.div
          key={`${activeCardCode}-${entry.name}`}
          {...featuredCardMotion(reduced)}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="group relative flex h-72 w-full flex-col justify-end overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-sea-950/30 sm:h-80 lg:h-[26rem]"
        >
          <img
            src={entry.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sea-950/95 via-sea-950/45 to-transparent" />
          {entry.credit && (
            <span className="absolute top-3 right-3 text-[10px] text-white/50">{entry.credit}</span>
          )}
          <div className="relative flex flex-col gap-2 p-5 sm:p-6">
            {countryName && (
              <span className="text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase">
                {countryName}
              </span>
            )}
            <h3 className="text-xl leading-tight font-semibold text-white sm:text-2xl">{entry.name}</h3>
            {entry.shortDescription && <p className="text-sm text-white/80">{entry.shortDescription}</p>}
            <div className="mt-2 flex items-center justify-between gap-3">
              {entry.category ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-turquoise-200">
                  ✦ {entry.category}
                </span>
              ) : (
                <span />
              )}
              {entry.packageSlug ? (
                <Link
                  to={href}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-sea-950 transition-transform duration-300 hover:scale-105"
                >
                  Ver paquete <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <a
                  href={href}
                  onClick={(e) => onHashClick(e, href)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-sea-950 transition-transform duration-300 hover:scale-105"
                >
                  Explorar destino <ArrowRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

// Globo terráqueo interactivo: gira solo, lento, y el usuario lo puede agarrar
// y rotar libremente (mouse o dedo) como un objeto 3D. Los países a los que
// viaja CheTour quedan marcados con un leve relieve; al hacer hover sobre uno
// (o sobre su chip) el globo frena y se gira para mostrarlo de frente.
export function GlobeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredCode, setHoveredCode] = useState<string | null>(null)
  // espejo del estado para que el loop de animación lo lea sin re-suscribirse
  const hoveredCodeRef = useRef<string | null>(null)
  // de dónde vino el hover actual: 'canvas' (raycast sobre el globo) o 'list'
  // (chip de abajo). Sirve para decidir qué lo limpia.
  const hoverSourceRef = useRef<'canvas' | 'list' | null>(null)

  const reduceMotion = useReducedMotion()
  const handleHashClick = useHashScroll()

  // País cuyas tarjetas están a la vista. A diferencia de `hoveredCode` no se
  // limpia al salir del país: queda fijo (y mantiene el globo frenado) hasta que
  // el usuario se aleja de la tarjeta o hace scroll. Solo lo activan los países
  // con tarjetas cargadas en `globeCountryCards`.
  const [activeCardCode, setActiveCardCode] = useState<string | null>(null)
  const activeCardCodeRef = useRef<string | null>(null)
  // cursor sobre alguna de las tarjetas: mientras sea true, no se desvanecen.
  const [cardHovered, setCardHovered] = useState(false)
  const cardHoveredRef = useRef(false)

  // Destino activo dentro de la lista del país fijado: índice sobre la lista
  // aplanada de `activeCardCode` (ver `flattenCountryEntries`). Alimenta tanto
  // el resaltado de la lista como la card destacada de la derecha.
  const [activeEntryIndex, setActiveEntryIndex] = useState(0)

  useEffect(() => {
    hoveredCodeRef.current = hoveredCode
  }, [hoveredCode])

  useEffect(() => {
    activeCardCodeRef.current = activeCardCode
  }, [activeCardCode])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0.3, 5.2)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    // --- Tierra ---------------------------------------------------------------
    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x1c3a5e, shininess: 12 })
    const earth = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS, 96, 96), earthMaterial)
    globeGroup.add(earth)

    const img = new Image()
    img.onload = () => {
      const texture = buildStylizedEarthTexture(img)
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
      earthMaterial.map = texture
      earthMaterial.color.set(0xffffff)
      earthMaterial.needsUpdate = true
    }
    img.src = earthTextureUrl

    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.05)
    sunLight.position.set(4, 2, 5)
    scene.add(sunLight)

    const atmosphereMaterial = buildAtmosphereMaterial()
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.025, 64, 64),
      atmosphereMaterial,
    )
    globeGroup.add(atmosphere)

    // --- Países marcados ----------------------------------------------------
    const countriesGroup = new THREE.Group()
    countriesGroup.rotation.y = COUNTRY_LNG_OFFSET
    globeGroup.add(countriesGroup)

    const yAxis = new THREE.Vector3(0, 1, 0)
    const countryObjects: CountryObject[] = []
    const countryByCode = new Map<string, CountryObject>()
    const pickTargets: THREE.Mesh[] = [] // mallas contra las que se hace raycast

    for (const feature of countryFeatures) {
      const code = feature.properties.code
      const meta = countryMetaByCode.get(code)
      const name = meta?.name ?? feature.properties.name

      const capMaterial = new THREE.MeshBasicMaterial({
        color: 0x2e9cb8,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
      const sideMaterial = new THREE.MeshBasicMaterial({
        color: 0x1b6e96,
        transparent: true,
        opacity: 0.32,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
      const outlineMaterial = new THREE.LineBasicMaterial({
        color: 0x8fd0de,
        transparent: true,
        opacity: 0.55,
      })

      const group = new THREE.Group()
      const polygons = feature.geometry.coordinates // MultiPolygon

      for (const rings of polygons) {
        // closedBottom=false: la cara de abajo queda contra el globo y no se ve.
        // Grupos de material resultantes: [0]=paredes, [1]=cara de arriba.
        const geometry = new ConicPolygonGeometry(rings, COUNTRY_BASE, COUNTRY_TOP, false, true, true, 3)
        const mesh = new THREE.Mesh(geometry, [sideMaterial, capMaterial])
        mesh.userData.code = code
        group.add(mesh)
        pickTargets.push(mesh)

        // Contorno sobre el borde superior del relieve (solo el anillo exterior).
        const outerRing = rings[0]
        const points = outerRing.map(([lng, lat]) => geoToVector3(lng, lat, COUNTRY_TOP))
        const outline = new THREE.LineLoop(
          new THREE.BufferGeometry().setFromPoints(points),
          outlineMaterial,
        )
        group.add(outline)
      }

      // centro del país en coordenadas de mundo (aplica el offset del grupo)
      const centerDir = geoToVector3(meta?.lng ?? 0, meta?.lat ?? 0, 1)
        .applyAxisAngle(yAxis, COUNTRY_LNG_OFFSET)
        .normalize()

      countriesGroup.add(group)
      const countryObject: CountryObject = {
        code,
        name,
        group,
        capMaterial,
        sideMaterial,
        outlineMaterial,
        centerDir,
        hover: 0,
      }
      countryObjects.push(countryObject)
      countryByCode.set(code, countryObject)
    }

    // --- Controles ---------------------------------------------------------
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    // sin damping: así el "girar hacia el país" es un lerp explícito y
    // predecible por frame (ver más abajo), sin inercia peleándole.
    controls.enableDamping = false
    controls.rotateSpeed = 0.42
    controls.minPolarAngle = 0.2
    controls.maxPolarAngle = Math.PI - 0.2
    controls.autoRotateSpeed = 0.35 // giro lento de fondo

    let isUserDragging = false
    let dragResumeAt = 0 // timestamp hasta el cual no se reanuda el giro tras soltar
    controls.addEventListener('start', () => {
      isUserDragging = true
    })
    controls.addEventListener('end', () => {
      isUserDragging = false
      dragResumeAt = performance.now() + 2000
    })

    // --- Hover / pick -----------------------------------------------------
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    let pointerInside = false
    let pointerDirty = false // el puntero se movió desde el último raycast

    const updatePointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      pointerInside = true
      pointerDirty = true
    }
    const onPointerMove = (event: PointerEvent) => updatePointer(event)
    const onPointerDown = (event: PointerEvent) => updatePointer(event)
    const onPointerLeave = () => {
      pointerInside = false
      // si el hover lo puso el globo (no un chip), al salir del canvas se limpia
      if (hoverSourceRef.current === 'canvas') {
        hoverSourceRef.current = null
        hoveredCodeRef.current = null
        setHoveredCode(null)
      }
    }
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointerleave', onPointerLeave)

    function pickHoveredCode(): string | null {
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects([earth, ...pickTargets], false)
      if (!hits.length) return null
      // si lo primero que toca el rayo es el globo, el país está en la cara de
      // atrás: no cuenta como hover.
      const first = hits[0]
      if (first.object === earth) return null
      return (first.object.userData.code as string) ?? null
    }

    // --- Resize ----------------------------------------------------------
    const resize = () => {
      const size = container.clientWidth
      renderer.setSize(size, size, false)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    // --- Loop ----------------------------------------------------------
    let frame = requestAnimationFrame(function loop() {
      // el raycast corre solo cuando el puntero realmente se movió: así, cuando
      // el globo gira hacia un país en hover, el país no "se escapa" del cursor
      // quieto ni se apaga el hover a mitad de camino.
      if (pointerInside && pointerDirty) {
        pointerDirty = false
        const code = pickHoveredCode()
        if (code !== hoveredCodeRef.current) {
          hoverSourceRef.current = code ? 'canvas' : null
          hoveredCodeRef.current = code
          setHoveredCode(code)
          // apuntar a un país con tarjetas las fija hasta que el usuario se
          // aleje o haga scroll; salir del país no las cierra. El destino
          // activo vuelve a ser el primero de la lista del país nuevo.
          if (code && code in globeCountryCards) {
            setActiveCardCode(code)
            setActiveEntryIndex(0)
          }
        }
      }

      const targetCode = hoveredCodeRef.current
      const targetCountry = targetCode ? countryByCode.get(targetCode) : undefined

      // El globo se gira para encarar el país SOLO cuando el hover viene de los
      // chips de abajo (sirven de referencia/índice). Si el hover nace del
      // propio globo —el cursor encima mientras se explora o se arrastra— el
      // país se levanta y el giro se frena, pero la cámara no se mueve sola.
      const flyToCountry =
        targetCountry && hoverSourceRef.current === 'list' && !isUserDragging ? targetCountry : undefined

      if (flyToCountry) {
        const dir = flyToCountry.centerDir
        const desiredAz = Math.atan2(dir.x, dir.z)
        const desiredPolar = THREE.MathUtils.clamp(
          Math.acos(THREE.MathUtils.clamp(dir.y, -1, 1)),
          controls.minPolarAngle,
          controls.maxPolarAngle,
        )
        let dAz = desiredAz - controls.getAzimuthalAngle()
        dAz = Math.atan2(Math.sin(dAz), Math.cos(dAz)) // camino angular más corto
        const dPolar = desiredPolar - controls.getPolarAngle()
        // rotateLeft(x) hace theta-=x y rotateUp(x) hace phi-=x; queremos
        // acercarnos una fracción FLYTO_EASE al ángulo deseado cada frame.
        controls.rotateLeft(-dAz * FLYTO_EASE)
        controls.rotateUp(-dPolar * FLYTO_EASE)
      }

      // gira solo cuando: no hay país en hover, no hay tarjetas fijas, no se
      // está arrastrando, ya pasó el margen tras soltar y el usuario no pidió
      // menos movimiento.
      controls.autoRotate =
        !prefersReducedMotion &&
        !targetCode &&
        !activeCardCodeRef.current &&
        !isUserDragging &&
        performance.now() > dragResumeAt
      controls.update()

      for (const country of countryObjects) {
        // el país queda levantado mientras se lo apunta o mientras sus tarjetas
        // siguen a la vista.
        const target =
          country.code === targetCode || country.code === activeCardCodeRef.current ? 1 : 0
        country.hover = lerp(country.hover, target, 0.15)
        const scale = 1 + (HOVER_SCALE - 1) * country.hover
        country.group.scale.setScalar(scale)
        country.capMaterial.opacity = lerp(0.2, 0.42, country.hover)
        country.sideMaterial.opacity = lerp(0.32, 0.55, country.hover)
        country.outlineMaterial.opacity = lerp(0.55, 0.95, country.hover)
      }

      renderer.render(scene, camera)
      frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave)
      controls.dispose()
      renderer.dispose()
      earth.geometry.dispose()
      earthMaterial.map?.dispose()
      earthMaterial.dispose()
      atmosphere.geometry.dispose()
      atmosphereMaterial.dispose()
      for (const country of countryObjects) {
        country.capMaterial.dispose()
        country.sideMaterial.dispose()
        country.outlineMaterial.dispose()
        country.group.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.LineLoop) obj.geometry.dispose()
        })
      }
    }
  }, [])

  // Rótulo sobre el globo: mientras las tarjetas de un país estén fijas queda su
  // nombre aunque el cursor ya no apunte al país; sólo entonces cae al hover.
  const labelCode = hoveredCode ?? activeCardCode
  const hoveredName = labelCode ? (countryMetaByCode.get(labelCode)?.name ?? null) : null

  // Desvanecer las tarjetas cuando el usuario no las está mirando: ni el cursor
  // sobre ellas ni sobre el país que las abrió.
  useEffect(() => {
    if (!activeCardCode) return
    const engaged = cardHovered || hoveredCode === activeCardCode
    if (engaged) return
    const id = window.setTimeout(() => setActiveCardCode(null), CARD_IDLE_MS)
    return () => window.clearTimeout(id)
  }, [activeCardCode, cardHovered, hoveredCode])

  // Al hacer scroll, las tarjetas se van (y el globo retoma el giro) salvo que
  // el cursor esté sobre una tarjeta.
  useEffect(() => {
    if (!activeCardCode) return
    let id = 0
    const onScroll = () => {
      // si el cursor sigue sobre la tarjeta o sobre el país que la abrió, el
      // scroll no la cierra: el usuario todavía la está mirando.
      if (cardHoveredRef.current || hoveredCodeRef.current === activeCardCodeRef.current) return
      window.clearTimeout(id)
      id = window.setTimeout(() => setActiveCardCode(null), CARD_SCROLL_MS)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(id)
    }
  }, [activeCardCode])

  const onCardEnter = () => {
    cardHoveredRef.current = true
    setCardHovered(true)
  }
  const onCardLeave = () => {
    cardHoveredRef.current = false
    setCardHovered(false)
  }

  const selectFromList = (code: string) => {
    hoverSourceRef.current = 'list'
    hoveredCodeRef.current = code
    setHoveredCode(code)
    if (code in globeCountryCards) {
      setActiveCardCode(code)
      setActiveEntryIndex(0)
    }
  }
  const clearFromList = () => {
    if (hoverSourceRef.current !== 'list') return
    hoverSourceRef.current = null
    hoveredCodeRef.current = null
    setHoveredCode(null)
  }
  const toggleFromList = (code: string) => {
    if (hoveredCode === code) {
      clearFromList()
      if (activeCardCode === code) setActiveCardCode(null)
    } else {
      selectFromList(code)
    }
  }

  // Lista aplanada del país fijado (memoizada: cambia solo cuando cambia el
  // país, no en cada render) + el destino activo que consumen la lista y la
  // card destacada — mismos datos, sin lógica duplicada.
  const activeEntries = useMemo(() => flattenCountryEntries(activeCardCode), [activeCardCode])
  const activeEntry = activeEntries[activeEntryIndex] ?? activeEntries[0]
  const activeCountryName = activeCardCode ? (countryMetaByCode.get(activeCardCode)?.name ?? '') : ''
  const activeEntryHref = activeEntry?.packageSlug ? `/paquetes/${activeEntry.packageSlug}` : '/#paquetes'

  return (
    // El ancla #destinos vive en Home.tsx (.hero-reveal__anchor), ubicada donde
    // la persiana del Hero termina de abrir; acá sólo queda el layout.
    <section className="relative isolate overflow-hidden pt-20 pb-52 sm:pt-28 sm:pb-72">
      {/* Fondo "olas" (shader WebGL del 21st.dev Shader Builder): cubre toda la
          GlobeSection — el globo (canvas transparente) y los chips quedan
          flotando encima. Se recorta con overflow-hidden; Packages
          y el resto de la home siguen con el degradé global de index.css.
          Con prefers-reduced-motion se cae a un degradé estático con la misma
          paleta (el shader anima sin parar).
          Salida sin costura: en vez de pintar un degradé encima (se notaba la
          banda), el propio shader se desvanece con un mask-image en el tercio
          inferior y deja ver el degradé global del body debajo — así el borde
          con la sección de abajo cae exactamente sobre el color de página, sin
          salto. Por eso hace falta el pb grande: da aire para que el fundido
          sea largo y quede por debajo de los chips. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            'linear-gradient(to bottom, #000 0%, #000 79%, rgba(0,0,0,0.88) 84%, rgba(0,0,0,0.6) 89%, rgba(0,0,0,0.3) 94%, rgba(0,0,0,0.1) 97.5%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 0%, #000 79%, rgba(0,0,0,0.88) 84%, rgba(0,0,0,0.6) 89%, rgba(0,0,0,0.3) 94%, rgba(0,0,0,0.1) 97.5%, transparent 100%)',
        }}
      >
        {reduceMotion ? (
          <div className="h-full w-full bg-[linear-gradient(180deg,#184557_0%,#007fad_38%,#57b2cb_62%,#eaf9ff_82%,#007fad_100%)]" />
        ) : (
          <ShaderBackground className="h-full w-full" />
        )}
      </div>

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <span className="text-sm font-semibold text-sea-600 dark:text-turquoise-300">Destinos en el mapa</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
          Girá el globo y explorá
        </h2>
      </div>

      {/* Grid de 3 columnas — lista / globo / card — en flujo normal (no hay
          overlay absoluto). `lg:items-start` para que el globo/card (alto
          fijo) no dependan de la lista. La lista, en cambio, se ajusta a su
          contenido y queda centrada contra esa fila (`lg:self-center`): sin
          espacio muerto propio, tenga 1 destino o los 8 de un país cargado
          (que además se achican para no crecer demasiado, ver `densityFor`).
          En mobile/tablet, `order-*` apila: globo primero (protagonista),
          card, lista. */}
      <div className="relative mx-auto mt-10 w-full max-w-[34rem] px-6 lg:max-w-[78rem] xl:max-w-[86rem]">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,34rem)_minmax(0,20rem)] lg:gap-6 xl:grid-cols-[minmax(0,22rem)_minmax(0,34rem)_minmax(0,22rem)] xl:gap-10">
          {/* Columna izquierda: lista de destinos del país fijado. La caja
              se ajusta a su contenido (sin alto forzado ni relleno para
              centrarlo) — así nunca queda espacio muerto arriba/abajo, tenga
              1 destino u 8. `lg:self-center` la centra contra el alto de la
              fila (que define el globo) en vez de forzarla ella misma. */}
          <div className="order-3 w-full lg:order-1 lg:self-center">
            <DestinationListPanel
              activeCardCode={activeCardCode}
              entries={activeEntries}
              activeIndex={activeEntryIndex}
              reduced={!!reduceMotion}
              onActivate={setActiveEntryIndex}
              onEnter={onCardEnter}
              onLeave={onCardLeave}
            />
          </div>

          {/* Centro: el globo — sin cambios de tamaño/comportamiento. */}
          <div className="order-1 lg:order-2">
            <div
              ref={containerRef}
              className="relative mx-auto aspect-square w-full max-w-[34rem] cursor-grab touch-none select-none active:cursor-grabbing"
            >
              <canvas ref={canvasRef} className="h-full w-full" />
              {hoveredName && (
                <div className="pointer-events-none absolute inset-x-0 -top-6 flex justify-center">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-neutral-900 shadow-lg backdrop-blur dark:bg-neutral-900/90 dark:text-white">
                    {hoveredName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha: card destacada del destino activo. Alto fijo
              igual al del globo (no al de la fila, que puede crecer si la
              lista está expandida) y centrada adentro — así se mantiene a la
              altura del globo pase lo que pase con la lista. */}
          <div className="order-2 w-full lg:order-3 lg:flex lg:h-[34rem] lg:items-center">
            <FeaturedCard
              activeCardCode={activeCardCode}
              entry={activeEntry}
              countryName={activeCountryName}
              href={activeEntryHref}
              reduced={!!reduceMotion}
              onEnter={onCardEnter}
              onLeave={onCardLeave}
              onHashClick={handleHashClick}
            />
          </div>
        </div>
      </div>

      {/* Este bloque va siempre sobre el shader (teal), en cualquier tema: por
          eso el tratamiento es fijo claro-sobre-oscuro (como .hero-cta-btn en
          index.css), sin variantes dark:. Chips = pastillas de vidrio; el país
          apuntado se invierte a pastilla blanca sólida. */}
      <div className="relative mx-auto mt-10 max-w-3xl px-6">
        <p className="mb-4 text-center text-xs font-semibold tracking-[0.2em] text-white/75 uppercase [text-shadow:0_1px_10px_rgba(8,47,63,0.55)]">
          Países disponibles
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {availableCountries.map((country) => {
            const active = hoveredCode === country.code
            return (
              <button
                key={country.code}
                type="button"
                onMouseEnter={() => selectFromList(country.code)}
                onMouseLeave={clearFromList}
                onFocus={() => selectFromList(country.code)}
                onBlur={clearFromList}
                onClick={() => toggleFromList(country.code)}
                className={cx(
                  'group inline-flex items-center gap-3 rounded-full border px-3.5 py-1.5 text-sm font-medium backdrop-blur-md transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none',
                  active
                    ? '-translate-y-0.5 border-white bg-white text-sea-950 shadow-lg shadow-sea-950/25'
                    : 'border-white/25 bg-white/10 text-white/80 shadow-sm shadow-sea-950/10 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20 hover:text-white hover:shadow-md hover:shadow-sea-950/20',
                )}
              >
                <span
                  className={cx(
                    'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                    active
                      ? 'bg-turquoise-500'
                      : 'bg-white/45 group-hover:bg-white',
                  )}
                />
                {country.name}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
