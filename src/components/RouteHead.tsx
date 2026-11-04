import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getRouteSeo, SITE_URL } from '@/seo'

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/**
 * Mantiene el <head> al día en cada ruta: título, descripción, canonical,
 * Open Graph y datos estructurados (JSON-LD). Es la misma fuente (src/seo.ts)
 * que usa scripts/prerender.mjs para el HTML estático que lee Google.
 */
export function RouteHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getRouteSeo(pathname)
    const url = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`

    document.title = seo.title
    setMeta('name', 'description', seo.description)
    setMeta('name', 'robots', seo.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large')

    let canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (seo.noindex) {
      canon?.remove()
    } else {
      if (!canon) {
        canon = document.createElement('link')
        canon.rel = 'canonical'
        document.head.appendChild(canon)
      }
      canon.href = url
    }

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:locale', 'es_AR')
    setMeta('property', 'og:site_name', 'CheTour Viajes')
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', seo.image)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', seo.image)

    document.head.querySelectorAll('script[data-route-ld]').forEach((n) => n.remove())
    seo.jsonLd.forEach((obj) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.routeLd = '1'
      s.textContent = JSON.stringify(obj)
      document.head.appendChild(s)
    })
  }, [pathname])

  return null
}
