#!/usr/bin/env node
// Migra las fichas HTML sueltas de /paquetes a páginas React dentro de la
// landing (src/pages/package-static/), reutilizando <Nav/> y <Footer/> de la
// SPA en vez del header/footer propios de cada HTML.
//
// Qué hace:
// 1. Extrae el <style> compartido (es idéntico, byte a byte, en las 16
//    fichas) y lo "escopa" bajo la clase `.pkg-page` con postcss, para que
//    sus reglas :root/html/body no se filtren al resto de la SPA.
// 2. Por cada ficha: separa el contenido de <main> + la barra flotante móvil
//    + el modal de lightbox (todo lo que NO es el header/footer propios),
//    reescribe los links internos para que apunten a rutas reales de la SPA
//    y las imágenes a /paquetes/img/, y lo guarda como fragmento .html.
// 3. Extrae del <script> de cada ficha los únicos datos que varían entre
//    fichas (precio, mensajes de WhatsApp, fotos del lightbox) a un
//    manifest.ts — la lógica del script en sí (calculadora, lightbox,
//    scrollspy, compartir, avión animado) se reimplementó una sola vez,
//    a mano, en src/pages/package-static/runtime.ts.
//
// Volver a correr este script (`node scripts/build-static-package-pages.mjs`)
// si se edita alguno de los HTML fuente en /paquetes.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// OJO: la carpeta fuente se llama "paquetes-fuente", no "paquetes" — un
// directorio "paquetes" en la raíz del proyecto choca con la ruta de la SPA
// /paquetes/:slug: el dev server de Vite sirve cualquier archivo estático
// que matchee antes de llegar al fallback de React Router, así que
// /paquetes/bariloche-aereo serviría el HTML suelto en vez de la página
// React. Ver README de esta carpeta si hace falta más contexto.
const SRC_DIR = path.join(ROOT, 'paquetes-fuente')
const OUT_DIR = path.join(ROOT, 'src/pages/package-static')
const FRAGMENTS_DIR = path.join(OUT_DIR, 'fragments')
const PUBLIC_IMG_DIR = path.join(ROOT, 'public/paquetes/img')

// Las 16 fichas "canónicas": se excluyen salta-humahuaca-cafayate-v2.html
// (una exploración de diseño distinta, con otra paleta de CSS) y
// salta-humahuaca-cafayate.backup-antes-v2.html (borrador viejo, 808 líneas).
// La versión canónica de Salta es salta-humahuaca-cafayate.html: usa el
// mismo CSS/JS compartido que las otras 15 fichas.
const SLUGS = [
  'africa-todo-incluido',
  'bariloche-aereo',
  'camboriu-bus',
  'canasvieiras-aereo',
  'cataratas-del-iguazu-aereo',
  'crucero-fiordos-glaciares-chilenos',
  'esencias-centroeuropeas',
  'estados-unidos-costa-a-costa',
  'europa-al-maximo-londres-madrid',
  'europa-clasica-costa-amalfitana-toscana',
  'gramado-y-canela-con-torres-bus',
  'neuquen-y-caviahue',
  'salta-humahuaca-cafayate',
  'san-juan-bajo-las-estrellas-bus',
  'talampaya-con-luna-llena-laguna-brava-y-valle-de-la-luna-bus',
  'ushuaia-y-calafate',
  'nueva-york-y-miami',
  'egipto-dubai-crucero-nilo',
  'rio-de-janeiro',
]

mkdirSync(FRAGMENTS_DIR, { recursive: true })
mkdirSync(PUBLIC_IMG_DIR, { recursive: true })

// ---------------------------------------------------------------------------
// 1. CSS compartido → escopado bajo `.pkg-page`
// ---------------------------------------------------------------------------

function scopeCss(css) {
  const transformSelector = selectorParser((selectors) => {
    selectors.each((selector) => {
      const raw = selector.toString().trim()
      if (raw === ':root' || raw === 'html' || raw === 'body') {
        selector.removeAll()
        selector.append(selectorParser.className({ value: 'pkg-page' }))
      } else {
        selector.prepend(selectorParser.combinator({ value: ' ' }))
        selector.prepend(selectorParser.className({ value: 'pkg-page' }))
      }
    })
  })

  const result = postcss([
    {
      postcssPlugin: 'scope-pkg-page',
      Once(root) {
        root.walkRules((rule) => {
          rule.selector = transformSelector.processSync(rule.selector)
        })

        // Los nombres de @keyframes son globales al documento: se renombran
        // para no pisar utilidades de Tailwind que ya definen sus propias
        // animaciones con el mismo nombre (ej. animate-pulse → @keyframes pulse).
        const renames = { pulse: 'pkgPulse', fadeIn: 'pkgFadeIn' }
        root.walkAtRules('keyframes', (atRule) => {
          if (renames[atRule.params]) atRule.params = renames[atRule.params]
        })
        root.walkDecls(/^animation/, (decl) => {
          for (const [from, to] of Object.entries(renames)) {
            decl.value = decl.value.replace(new RegExp(`\\b${from}\\b`, 'g'), to)
          }
        })
      },
    },
  ]).process(css, { from: undefined })

  return result.css
}

function extractStyleBlock(src) {
  const start = src.indexOf('<style>') + '<style>'.length
  const end = src.indexOf('</style>')
  return src.slice(start, end)
}

// ---------------------------------------------------------------------------
// 2. Fragmento HTML (main + barra móvil + lightbox + avión) por ficha
// ---------------------------------------------------------------------------

const PLANE_WRAP_HTML = `<div class="scroll-plane-wrap" aria-hidden="true">
    <div class="scroll-plane" id="scrollPlane">
      <img src="/paquetes/img/avion-scroll.png" alt="">
    </div>
  </div>`

function rewriteLinks(html) {
  return (
    html
      // migas de pan (Inicio / Salidas / Categoría / Ficha): el usuario las
      // sacó a pedido — no aportaban navegación real (Salidas/Categoría
      // caían igual en #paquetes) y sumaban ruido arriba del todo.
      .replace(/\s*<!-- Migas de pan -->\s*<nav class="breadcrumbs"[\s\S]*?<\/nav>\n?/, '')
      // imágenes: img/foo.jpg → /paquetes/img/foo.jpg (se sirven desde public/)
      .replace(/(src|href)="img\//g, '$1="/paquetes/img/')
      // links relativos entre fichas: salta-humahuaca-cafayate.html → /paquetes/salta-humahuaca-cafayate
      .replace(/href="([\w-]+)\.html"/g, 'href="/paquetes/$1"')
      // links absolutos a otra ficha con slash final (formato usado en salta): /paquetes/disney-a-medida/ → /paquetes/disney-a-medida
      .replace(/href="\/paquetes\/([\w-]+)\/"/g, 'href="/paquetes/$1"')
      // breadcrumbs "Salidas" / categoría: no existe una página de listado — caen en la sección #paquetes de Home
      .replace(/href="\/salidas\/[^"]*"/g, 'href="/#paquetes"')
      .replace(/href="\/paquetes\/"/g, 'href="/#paquetes"')
      // resto de rutas del header/footer originales que puedan colarse en el contenido
      .replace(/href="\/contacto\/"/g, 'href="/contacto"')
      .replace(/href="\/destinos\/"/g, 'href="/#destinos"')
      .replace(/href="\/experiencias\/"/g, 'href="/#experiencias"')
      .replace(/href="\/sobre-nosotros\/"/g, 'href="/#nosotros"')
  )
}

function extractFragment(src) {
  const mainStart = src.indexOf('<main>')
  const mainEnd = src.indexOf('</main>') + '</main>'.length
  const mainHtml = src.slice(mainStart, mainEnd)

  const barraStart = src.indexOf('<!-- ==================== BARRA FLOTANTE MÓVIL')
  const footerCommentStart = src.indexOf('<!-- ==================== FOOTER')
  const barraAndLightbox = src.slice(barraStart, footerCommentStart).trim()

  const fragment = `${mainHtml}\n\n  ${barraAndLightbox}\n\n  ${PLANE_WRAP_HTML}\n`
  return rewriteLinks(fragment)
}

// ---------------------------------------------------------------------------
// 3. Datos que varían por ficha (precio, mensajes de WhatsApp, fotos)
// ---------------------------------------------------------------------------

function matchOne(src, re, { required = true } = {}) {
  const m = re.exec(src)
  if (!m && required) throw new Error(`No matcheó ${re} en la ficha`)
  return m
}

function extractData(src, slug) {
  const title = matchOne(src, /<title>([^<]*)<\/title>/)[1]
  const description = matchOne(src, /<meta name="description" content="([^"]*)">/)[1]
  const name = matchOne(src, /<span class="current">([^<]*)<\/span>/)[1]
  const categoryLabel = matchOne(src, /<a href="\/salidas\/[^"]*">([^<]*)<\/a>\s*<span class="sep">\/<\/span>\s*<span class="current">/)[1]

  const priceMatch = matchOne(src, /const PRICE_PER_PERSON = (\d+);/, { required: false })
  const price = priceMatch ? Number(priceMatch[1]) : null

  // Las fichas en pesos usan '$' pegado al número ("$620.000"); las que
  // cotizan en dólares usan 'USD ' con espacio ("USD 9.660") — dos formatos
  // reales, no uno solo con "moneda" fija, así que se toma tal cual del
  // propio formatCurrency() de cada ficha en vez de asumirlo.
  const currencyMatch = matchOne(src, /function formatCurrency\(val\) \{\s*return '([^']*)' \+/, { required: false })
  const currencyPrefix = currencyMatch ? currencyMatch[1] : '$'

  const qtyMatch = matchOne(src, /let currentQty = (\d+);/)
  const initialQty = Number(qtyMatch[1])

  const waLabel = matchOne(src, /Quiero consultar por (.*?) para \$\{currentQty\}/)[1]
  const shareText = matchOne(src, /const shareText = '([^']*)';/)[1]
  const shareTitle = matchOne(src, /title:\s*'([^']*)',\s*text: shareText/)[1]

  const photosBlock = matchOne(src, /const photos = \[([\s\S]*?)\];/)[1]
  const photoRe = /\{\s*src:\s*'([^']*)',\s*caption:\s*'([^']*)'\s*\}/g
  const photos = [...photosBlock.matchAll(photoRe)].map((m) => ({
    src: m[1].replace(/^img\//, '/paquetes/img/'),
    caption: m[2],
  }))

  // Badges del encabezado (duración, fechas, transporte, ...) — se usan para
  // completar la tarjeta de la home (#paquetes), además de quedar ya
  // visibles tal cual dentro del fragmento HTML.
  const badgesBlock = matchOne(src, /<div class="product-badges">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<!--/)[1]
  const badges = [...badgesBlock.matchAll(/<\/svg>\s*\n\s*([^\n<]+?)\s*\n/g)].map((m) => m[1].trim())

  const priceTag = matchOne(src, /<div class="mobile-bar-price">\s*<span class="label">[^<]*<\/span>\s*<span class="val">([^<]*)<\/span>/)[1]

  return {
    slug,
    title,
    description,
    name,
    categoryLabel,
    price,
    currencyPrefix,
    initialQty,
    waLabel,
    shareText,
    shareTitle,
    photos,
    badges,
    priceTag,
  }
}

// ---------------------------------------------------------------------------
// Ejecutar
// ---------------------------------------------------------------------------

const cssSrc = readFileSync(path.join(SRC_DIR, `${SLUGS[0]}.html`), 'utf8')
const scopedCss = scopeCss(extractStyleBlock(cssSrc))
// Pequeño ajuste manual sobre lo generado: el ícono real del avión
// (public/paquetes/img/avion-scroll.png) es un PNG vertical (420×594), no
// cuadrado como asumía el diseño original — sin object-fit se estira y
// deforma dentro del cuadro de 46×46.
const MANUAL_CSS_FIXUPS = `
/* --- Ajustes manuales (no generados) --- */
.pkg-page .scroll-plane img {
  object-fit: contain;
}
/* Avión un poco más grande y con más contraste (menos "difuminado" a 46px);
   el rumbo (arriba/abajo) lo decide runtime.ts según la dirección del scroll,
   por eso el transform ya no fija una rotación estática. */
.pkg-page .scroll-plane {
  width: 60px;
  height: 60px;
  filter: drop-shadow(0 4px 10px rgba(0, 81, 135, 0.55)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
  transition: top 0.05s linear, transform 0.3s ease;
}
`

writeFileSync(
  path.join(OUT_DIR, 'package-static.css'),
  `/* Generado por scripts/build-static-package-pages.mjs — no editar a mano.\n   CSS de las fichas HTML de /paquetes, escopado bajo .pkg-page. */\n${scopedCss}${MANUAL_CSS_FIXUPS}`,
)

const manifestEntries = []
const cardEntries = []

for (const slug of SLUGS) {
  const src = readFileSync(path.join(SRC_DIR, `${slug}.html`), 'utf8')
  const fragment = extractFragment(src)
  writeFileSync(path.join(FRAGMENTS_DIR, `${slug}.html`), fragment)

  const data = extractData(src, slug)
  manifestEntries.push(data)

  const includes = data.badges.slice(2, 5)
  cardEntries.push({
    slug,
    name: data.name,
    destination: data.title.split('—')[1]?.split('|')[0]?.trim() ?? data.name,
    category: data.categoryLabel,
    duration: data.badges[0] ?? '',
    departure: data.badges[1] ?? '',
    mode: data.badges[2] ?? '',
    includes,
    price: data.priceTag,
    image: data.photos[0]?.src ?? '',
  })
}

const manifestTs = `// Generado por scripts/build-static-package-pages.mjs — no editar a mano.
// Datos que el runtime de las fichas ported (src/pages/package-static/runtime.ts)
// necesita para la calculadora de precio, el lightbox y "compartir viaje".
// Volver a generar con: node scripts/build-static-package-pages.mjs

export type PackageStaticPhoto = { src: string; caption: string }

export type PackageStaticEntry = {
  slug: string
  title: string
  description: string
  price: number | null
  /** '$' (pesos, pegado al número) o 'USD ' (con espacio) — según formatCurrency() de la ficha original. */
  currencyPrefix: string
  initialQty: number
  waLabel: string
  shareText: string
  shareTitle: string
  photos: PackageStaticPhoto[]
}

export const packageStaticPages: Record<string, PackageStaticEntry> = {
${manifestEntries
  .map(
    (e) => `  '${e.slug}': ${JSON.stringify(
      {
        slug: e.slug,
        title: e.title,
        description: e.description,
        price: e.price,
        currencyPrefix: e.currencyPrefix,
        initialQty: e.initialQty,
        waLabel: e.waLabel,
        shareText: e.shareText,
        shareTitle: e.shareTitle,
        photos: e.photos,
      },
      null,
      2,
    ).replace(/\n/g, '\n  ')},`,
  )
  .join('\n')}
}
`
writeFileSync(path.join(OUT_DIR, 'manifest.ts'), manifestTs)

// Reporte para pegar a mano en src/data.ts (packages[] + packageSlug del globo)
writeFileSync(
  path.join(OUT_DIR, 'cards-report.json'),
  JSON.stringify(cardEntries, null, 2),
)

// README con la lista exacta de imágenes que espera cada ficha (nombre de
// archivo + a qué foto corresponde), para pegar en public/paquetes/img/
// cuando lleguen las fotos reales.
let imgReadme = '# Imágenes de paquetes (public/paquetes/img/)\n\n'
imgReadme +=
  'Cada paquete espera estos archivos en `public/paquetes/img/`, con estos nombres exactos (son los que ya están escritos en el HTML/JS ported — con poner el archivo alcanza, no hay que tocar código). El primer archivo de cada lista es la foto principal del mosaico de portada.\n\n'
imgReadme += 'También hace falta `avion-scroll.png` (el ícono del avión animado, compartido por las 16 fichas).\n\n'
for (const e of manifestEntries) {
  imgReadme += `## ${e.slug}\n_${e.title}_\n\n`
  for (const p of e.photos) {
    imgReadme += `- \`${p.src.replace('/paquetes/img/', '')}\` — ${p.caption}\n`
  }
  imgReadme += '\n'
}
writeFileSync(path.join(PUBLIC_IMG_DIR, 'README.md'), imgReadme)

console.log(`OK: ${SLUGS.length} fichas migradas a ${path.relative(ROOT, OUT_DIR)}`)
console.log(`Reporte de tarjetas para data.ts: ${path.relative(ROOT, path.join(OUT_DIR, 'cards-report.json'))}`)
console.log(`Lista de imágenes esperadas: ${path.relative(ROOT, path.join(PUBLIC_IMG_DIR, 'README.md'))}`)
