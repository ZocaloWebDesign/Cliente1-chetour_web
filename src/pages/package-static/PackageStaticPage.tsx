import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { packageStaticPages } from './manifest'
import { initPackageStaticPage } from './runtime'
import './package-static.css'

// Fragmentos HTML de cada ficha (ver scripts/build-static-package-pages.mjs):
// se cargan de a uno, en su propio chunk, para no sumarle ~50KB×16 al bundle
// de una página que probablemente el visitante nunca abra.
const fragmentLoaders = import.meta.glob('./fragments/*.html', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

function loadFragment(slug: string) {
  const loader = fragmentLoaders[`./fragments/${slug}.html`]
  return loader ? loader() : Promise.resolve(null)
}

const FONT_LINKS = [
  'https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
]

/**
 * Página de detalle "ported" desde las fichas HTML sueltas de /paquetes:
 * mismo diseño y comportamiento (mosaico, itinerario, cotizador, lightbox,
 * avión animado) tal cual se armaron ahí, pero con el <Nav/> y el <Footer/>
 * de la landing en vez de los propios del HTML — ver package-static.css
 * (CSS escopado bajo .pkg-page) y runtime.ts (la lógica del <script>
 * original, adaptada a este contenedor).
 */
export function PackageStaticPage({ slug }: { slug: string }) {
  const data = packageStaticPages[slug]
  const containerRef = useRef<HTMLDivElement>(null)
  const [html, setHtml] = useState<string | null>(null)
  const lenis = useLenis()

  // El padre (PackageDetail) monta esta página con `key={slug}`, así que un
  // cambio de paquete la remonta entera en vez de reusar este estado.
  useEffect(() => {
    let cancelled = false
    loadFragment(slug).then((loaded) => {
      if (!cancelled) setHtml(loaded)
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  // Título/descripción + tipografías propias de la ficha (General Sans +
  // Inter): se inyectan solo mientras esta página está montada, para no
  // forzarle esas fuentes al resto del sitio (ver CLAUDE.md).
  useEffect(() => {
    if (!data) return
    const prevTitle = document.title
    document.title = data.title

    let meta = document.querySelector('meta[name="description"]')
    const prevDescription = meta?.getAttribute('content') ?? null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', data.description)

    const links = FONT_LINKS.map((href) => {
      let link = document.head.querySelector<HTMLLinkElement>(`link[data-pkg-font="${href}"]`)
      if (!link) {
        link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        link.dataset.pkgFont = href
        document.head.appendChild(link)
      }
      return link
    })

    return () => {
      document.title = prevTitle
      if (prevDescription !== null) meta.setAttribute('content', prevDescription)
      links.forEach((link) => link.remove())
    }
  }, [data])

  // useLayoutEffect (no useEffect): sincroniza --header-h con el alto real
  // del <Nav/> antes del primer pintado, para que no se vea un frame con el
  // hueco entre el header y el sub-nav mientras corrige el valor.
  useLayoutEffect(() => {
    if (!html || !data || !containerRef.current) return
    return initPackageStaticPage(containerRef.current, data, lenis)
  }, [html, data, lenis])

  if (!data) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Sin hero oscuro debajo (a diferencia del resto de las páginas): el
          nav fijo transparente arranca "sólido" para que su texto no quede
          ilegible sobre el fondo claro de la ficha. */}
      <Nav forceSolid />
      {html && (
        <div className="pkg-page" ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
      )}
      <Footer />
    </div>
  )
}
