// Regenera src/assets/globe/countries.geo.json: recorta el dataset mundial de
// Natural Earth (110m, admin 0) a los países que marca el globo y le saca todas
// las properties menos el código, para que el archivo que entra al bundle sea
// chico.
//
// Uso:  node scripts/build-countries-geojson.mjs
//
// Para sumar un país: agregá su código ADM0_A3 a COUNTRY_CODES (abajo) y a
// `availableCountries` en src/data.ts, y volvé a correr este script.
//
// Fuente: el geojson viene con el paquete three-conic-polygon-geometry (su
// carpeta de ejemplos). Si algún día no está, se puede bajar de:
// https://github.com/vasturiano/three-conic-polygon-geometry/raw/master/example/geojson/ne_110m_admin_0_countries.geojson

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ADM0_A3 de Natural Earth (más confiable que ISO_A3, que viene -99 para
// algunos países como Francia). Mismo orden que `availableCountries` en data.ts.
const COUNTRY_CODES = [
  'ARG', // Argentina
  'BRA', // Brasil
  'USA', // Estados Unidos
  'PER', // Perú
  'CHL', // Chile
  'EGY', // Egipto
  'ARE', // Emiratos Árabes Unidos (Dubái)
  'GBR', // Reino Unido
  'FRA', // Francia
  'DEU', // Alemania
  'CHE', // Suiza
  'ITA', // Italia
  'ESP', // España
  'NLD', // Países Bajos
  'TZA', // Tanzania (incluye Zanzíbar)
]

const SOURCE = resolve(
  root,
  'node_modules/three-conic-polygon-geometry/example/geojson/ne_110m_admin_0_countries.geojson',
)

if (!existsSync(SOURCE)) {
  console.error(`No encuentro el geojson fuente en:\n  ${SOURCE}\n` + 'Instalá three-conic-polygon-geometry o bajá el archivo (ver comentario arriba).')
  process.exit(1)
}

const world = JSON.parse(readFileSync(SOURCE, 'utf8'))

/** Descarta anillos que cruzan el antimeridiano (span de longitud > 180°): en
 *  este dataset son solo slivers de las Aleutianas y evitan triángulos gigantes
 *  mal proyectados en el globo. */
function keepRing(ring) {
  const lngs = ring.map((c) => c[0])
  return Math.max(...lngs) - Math.min(...lngs) <= 180
}

function centroidLng(ring) {
  return ring.reduce((sum, c) => sum + c[0], 0) / ring.length
}

/** Recortes por país: dejamos solo el territorio que queremos mostrar en el
 *  globo, sin islas ni territorios de ultramar que descentran el foco. */
function trimPolygons(code, polygons) {
  if (code === 'FRA') {
    // solo Francia europea (continente + Córcega); fuera la Guayana Francesa,
    // cuyo centroide cae en Sudamérica.
    return polygons.filter((poly) => centroidLng(poly[0]) > -20)
  }
  if (code === 'USA') {
    // solo las dos masas continentales (los polígonos más grandes: EE.UU.
    // contiguo + Alaska); fuera Hawái y las islas del mar de Bering.
    return [...polygons].sort((a, b) => b[0].length - a[0].length).slice(0, 2)
  }
  if (code === 'CHL') {
    // fuera Isla de Pascua (Rapa Nui, ~-109° lng): descentra el foco en el Pacífico.
    return polygons.filter((poly) => centroidLng(poly[0]) > -100)
  }
  return polygons
}

function cleanGeometry(code, geometry) {
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
  const kept = trimPolygons(code, polygons).filter((poly) => keepRing(poly[0]))
  return { type: 'MultiPolygon', coordinates: kept }
}

const features = []
for (const code of COUNTRY_CODES) {
  const match = world.features.find((f) => f.properties.ADM0_A3 === code)
  if (!match) {
    console.warn(`⚠  país no encontrado en el dataset: ${code}`)
    continue
  }
  features.push({
    type: 'Feature',
    properties: { code, name: match.properties.NAME },
    geometry: cleanGeometry(code, match.geometry),
  })
}

const out = { type: 'FeatureCollection', features }
const dest = resolve(root, 'src/assets/globe/countries.geo.json')
writeFileSync(dest, JSON.stringify(out))
console.log(`✓ ${features.length} países → ${dest} (${(JSON.stringify(out).length / 1024).toFixed(1)} kB)`)
