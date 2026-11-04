import { packages, siteInfo } from '@/data'
import { packageStaticPages } from '@/pages/package-static/manifest'

/**
 * SEO del sitio: una sola fuente para el <head> de cada ruta (título,
 * descripción, canonical, Open Graph y datos estructurados). Lo usa
 * <RouteHead/> al navegar y scripts/prerender.mjs al generar el HTML estático.
 *
 * Al pasar a un dominio propio, cambiar SITE_URL acá (y en public/robots.txt
 * y public/sitemap.xml, que scripts/prerender.mjs regenera con este valor).
 */
export const SITE_URL = 'https://chetour-web.vercel.app'
export const PROVINCIA = 'Córdoba'
export const OG_IMAGE = `${SITE_URL}/og.jpg`

export type RouteSeo = {
  title: string
  description: string
  path: string
  image: string
  noindex?: boolean
  jsonLd: object[]
}

const abs = (p: string) => `${SITE_URL}${p === '/' ? '/' : p}`

const telefono = `+${siteInfo.whatsapp}`

const agencia = {
  '@type': 'TravelAgency',
  '@id': `${SITE_URL}/#agencia`,
  name: siteInfo.name,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  image: OG_IMAGE,
  description:
    'Agencia de viajes con paquetes nacionales e internacionales: Sur de Brasil, Bariloche, Disney, Europa y más destinos.',
  telephone: telefono,
  email: siteInfo.email,
  areaServed: [
    { '@type': 'AdministrativeArea', name: PROVINCIA },
    { '@type': 'Country', name: 'Argentina' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: [siteInfo.instagram, siteInfo.tiktok],
  founder: siteInfo.founders.split(' y ').map((name) => ({ '@type': 'Person', name })),
}

const sitio = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#sitio`,
  name: siteInfo.name,
  url: `${SITE_URL}/`,
  inLanguage: 'es-AR',
  publisher: { '@id': `${SITE_URL}/#agencia` },
}

const migas = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
})

const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes })

export function getRouteSeo(pathname: string): RouteSeo {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/') {
    return {
      path,
      title: `${siteInfo.name} | Agencia de viajes con salidas desde ${PROVINCIA}`,
      description: `Agencia de viajes online con salidas desde ${PROVINCIA}. Paquetes nacionales e internacionales: Camboriú, Bariloche, Disney, Europa y más. Consultanos por WhatsApp.`,
      image: OG_IMAGE,
      jsonLd: [graph(agencia, sitio)],
    }
  }

  if (path === '/paquetes') {
    return {
      path,
      title: `Paquetes de viaje desde Córdoba | ${siteInfo.name}`,
      description: `Catálogo de paquetes de viaje: Sur de Brasil, destinos nacionales e internacionales, con salidas desde Córdoba. Elegí tu viaje y consultanos por WhatsApp.`,
      image: OG_IMAGE,
      jsonLd: [
        graph(
          agencia,
          migas([
            { name: 'Inicio', path: '/' },
            { name: 'Paquetes', path: '/paquetes' },
          ]),
          {
            '@type': 'ItemList',
            name: 'Paquetes de viaje',
            itemListElement: packages.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.name,
              url: abs(`/paquetes/${p.slug}`),
            })),
          },
        ),
      ],
    }
  }

  if (path === '/contacto') {
    return {
      path,
      title: `Contacto | ${siteInfo.name}`,
      description: `Contanos tu idea de viaje y armamos tu propuesta. Escribinos por WhatsApp o email: ${siteInfo.titular.horario}.`,
      image: OG_IMAGE,
      jsonLd: [
        graph(
          agencia,
          migas([
            { name: 'Inicio', path: '/' },
            { name: 'Contacto', path: '/contacto' },
          ]),
        ),
      ],
    }
  }

  const slug = path.startsWith('/paquetes/') ? path.slice('/paquetes/'.length) : null
  const pkg = slug ? packages.find((p) => p.slug === slug) : undefined
  const meta = slug ? packageStaticPages[slug] : undefined
  if (slug && (pkg || meta)) {
    const title = meta?.title ?? `${pkg!.name} | ${siteInfo.name}`
    const description = meta?.description ?? `${pkg!.name}: ${pkg!.destination}. ${pkg!.duration}.`
    const image = pkg ? abs(pkg.image) : OG_IMAGE
    return {
      path,
      title,
      description,
      image,
      jsonLd: [
        graph(
          agencia,
          migas([
            { name: 'Inicio', path: '/' },
            { name: 'Paquetes', path: '/paquetes' },
            { name: pkg?.name ?? title, path },
          ]),
          {
            '@type': 'TouristTrip',
            name: pkg?.name ?? title,
            description,
            url: abs(path),
            image,
            provider: { '@id': `${SITE_URL}/#agencia` },
            touristType: pkg?.category,
          },
        ),
      ],
    }
  }

  return {
    path,
    title: `Página no encontrada | ${siteInfo.name}`,
    description: 'La página que buscás no existe. Volvé al inicio o mirá los paquetes de viaje.',
    image: OG_IMAGE,
    noindex: true,
    jsonLd: [],
  }
}

/** Rutas que se generan como HTML estático (además de la 404). */
export const staticPaths = ['/', '/paquetes', '/contacto', ...packages.map((p) => `/paquetes/${p.slug}`)]
