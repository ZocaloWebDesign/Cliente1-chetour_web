import canasvieirasAereo from '@/assets/packages/canasvieiras-aereo.jpg'
import camboriuSkylineHero from '@/assets/destinations/camboriu-skyline.jpg'
import barilocheLago from '@/assets/destinations/bariloche-lago.jpg'
import disneyCastle from '@/assets/destinations/disney-castle.jpg'
import cardSaltaHumahuacaCafayate from '@/assets/globe/cards/salta-humahuaca-cafayate.jpg'
import cardSanJuanEstrellas from '@/assets/globe/cards/san-juan-estrellas.webp'
import cardTalampaya from '@/assets/globe/cards/talampaya-laguna-brava-valle-luna.jpg'
import cardCataratasIguazu from '@/assets/globe/cards/cataratas-iguazu.jpg'
import cardBariloche from '@/assets/globe/cards/bariloche.jpg'
import cardNeuquenCaviahue from '@/assets/globe/cards/neuquen-caviahue.jpg'
import cardUshuaiaCalafate from '@/assets/globe/cards/ushuaia-calafate.jpg'
import cardCamboriu from '@/assets/globe/cards/camboriu.jpg'
import cardCanasvieiras from '@/assets/globe/cards/canasvieiras.jpg'
import cardBombinhas from '@/assets/globe/cards/bombinhas.jpg'
import cardBombas from '@/assets/globe/cards/bombas.jpg'
import cardIngleses from '@/assets/globe/cards/ingleses.jpg'
import cardQuatroIlhas from '@/assets/globe/cards/quatro-ilhas.jpg'
import cardGramadosCanelaTorres from '@/assets/globe/cards/gramados-canela-torres.jpg'
import cardRioDeJaneiro from '@/assets/globe/cards/rio-de-janeiro.jpg'
import cardUsaCostaACosta from '@/assets/globe/cards/estados-unidos-costa-a-costa.webp'
import cardDisneyMedida from '@/assets/globe/cards/disney-a-medida.jpg'
import cardNuevaYorkMiami from '@/assets/globe/cards/nueva-york-miami.jpg'
import cardPeruAereo from '@/assets/globe/cards/peru-aereo.jpg'
import cardPeruBoliviaBus from '@/assets/globe/cards/peru-bolivia-bus.jpg'
import cardChileFiordosGlaciares from '@/assets/globe/cards/chile-fiordos-glaciares.jpg'

// ---------------------------------------------------------------------------
// Paquetes
// ---------------------------------------------------------------------------

export type TravelPackage = {
  slug: string
  name: string
  destination: string
  category: 'Sur de Brasil' | 'Internacionales' | 'Nacionales'
  duration: string
  departure: string
  mode: string
  includes: string[]
  price: string
  priceNote?: string
  image: string
  link: string
  highlight?: boolean
  /** Galería de fotos reales del paquete para su página de detalle (opcional hasta que se cargue). */
  gallery?: string[]
  /** Párrafo "Destacado" de la página de detalle. */
  spotlight?: string
  /** Imagen grande para el hero de la página de detalle (alta resolución; si no hay, usa gallery[0]/image). */
  heroImage?: string
  /** Crédito de la foto del hero, si la licencia lo exige (ej. Wikimedia CC BY-SA). */
  heroCredit?: string
  /**
   * Franja destacada de la página de detalle: mismo formato en todos los
   * paquetes (fichas con ícono, sobre una banda de color), solo cambian el
   * tema de color, los textos y los íconos según el destino.
   */
  signature?: {
    eyebrow: string
    heading: string
    subheading: string
    theme: 'twilight' | 'cyan' | 'orange'
    chips: { icon: SignatureIconName; label: string; caption: string }[]
  }
}

export type SignatureIconName =
  | 'calendar'
  | 'clock'
  | 'hotel'
  | 'ticket'
  | 'sparkles'
  | 'waves'
  | 'umbrella'
  | 'users'
  | 'cablecar'
  | 'ferriswheel'

// Vacío a propósito: los paquetes actuales se van a rehacer desde cero.
// El tipo TravelPackage, la ruta /paquetes/:slug y PackageDetail.tsx quedan
// listos para cargar los paquetes nuevos apenas se definan.
export const packages: TravelPackage[] = []

export const siteInfo = {
  name: 'CheTour Viajes',
  tagline: 'El puente hacia tu próxima aventura',
  whatsapp: '543564651568',
  whatsappDisplay: '+54 3564 65-1568',
  email: 'chetour8@gmail.com',
  instagram: 'https://instagram.com/chetourviajes',
  tiktok: 'https://tiktok.com/@chetour_viajes',
  founders: 'Bruno Boetto y Máximo Levrino',
}

export const values = [
  { title: 'Mejora continua', desc: 'Nos especializamos constantemente para ofrecerte lo mejor.' },
  { title: 'Transparencia', desc: 'Sin letra chica: sabés exactamente qué incluye tu viaje.' },
  { title: 'Cercanía', desc: 'Te acompañamos desde la consulta hasta el regreso a casa.' },
  { title: 'Pasión por viajar', desc: 'Armamos cada propuesta pensando en experiencias reales.' },
]

// ---------------------------------------------------------------------------
// Globo 3D — países disponibles
// ---------------------------------------------------------------------------

export type AvailableCountry = {
  /** Nombre para mostrar (español). */
  name: string
  /**
   * Código ADM0_A3 de Natural Earth: se usa para casar este país con su
   * polígono en `src/assets/globe/countries.geo.json`. Es más confiable que
   * ISO_A3, que en ese dataset viene en -99 para varios países (Francia…).
   */
  code: string
  /**
   * Punto de referencia (centroide aproximado del país) al que el globo se
   * gira cuando se hace hover sobre el país o su chip. No hace falta que sea
   * exacto: solo define hacia dónde encara la cámara.
   */
  lat: number
  lng: number
}

// Territorios que el globo marca con un leve relieve. Para agregar un país:
// 1. sumá acá su nombre + código ADM0_A3 + lat/lng aproximados,
// 2. agregá el mismo código a COUNTRY_CODES en scripts/build-countries-geojson.mjs
// 3. corré `node scripts/build-countries-geojson.mjs` para regenerar el geojson.
export const availableCountries: AvailableCountry[] = [
  { name: 'Argentina', code: 'ARG', lat: -38, lng: -63 },
  { name: 'Brasil', code: 'BRA', lat: -10, lng: -52 },
  { name: 'Estados Unidos', code: 'USA', lat: 39, lng: -98 },
  { name: 'Perú', code: 'PER', lat: -9.5, lng: -75 },
  { name: 'Chile', code: 'CHL', lat: -35, lng: -71 },
  { name: 'Egipto', code: 'EGY', lat: 26.5, lng: 30 },
  { name: 'Emiratos Árabes Unidos', code: 'ARE', lat: 24, lng: 54 }, // Dubái
  { name: 'Reino Unido', code: 'GBR', lat: 54, lng: -2.5 },
  { name: 'Francia', code: 'FRA', lat: 46.5, lng: 2.5 },
  { name: 'Alemania', code: 'DEU', lat: 51, lng: 10.5 },
  { name: 'Suiza', code: 'CHE', lat: 46.8, lng: 8.2 },
  { name: 'Italia', code: 'ITA', lat: 42.8, lng: 12.5 },
  { name: 'España', code: 'ESP', lat: 40, lng: -3.7 },
  { name: 'Países Bajos', code: 'NLD', lat: 52.2, lng: 5.3 },
  { name: 'Tanzania', code: 'TZA', lat: -6.4, lng: 35 }, // incluye Zanzíbar
]

// ---------------------------------------------------------------------------
// Globo (marcadores del mapa 3D) — se usarán para las tarjetas de localidad
// que se van a mostrar al costado del globo, una por vez.
// ---------------------------------------------------------------------------

export type GlobeMarker = {
  name: string
  country: string
  lat: number
  lng: number
  image: string
  category: string
  /** Slug del paquete al que apunta la tarjeta (ver `packages` más arriba). Si no hay uno todavía, cae en la sección de paquetes. */
  packageSlug?: string
}

// Ordenados de este a oeste para que el globo gire siempre en el mismo sentido.
export const globeMarkers: GlobeMarker[] = [
  {
    name: 'Balneário Camboriú',
    country: 'Brasil',
    lat: -26.99,
    lng: -48.63,
    image: camboriuSkylineHero,
    category: 'Sur de Brasil',
    packageSlug: 'camboriu-aereo',
  },
  {
    name: 'Canasvieiras',
    country: 'Florianópolis, Brasil',
    lat: -27.43,
    lng: -48.45,
    image: canasvieirasAereo,
    category: 'Sur de Brasil',
    packageSlug: 'canasvieiras-aereo',
  },
  {
    name: 'Bariloche',
    country: 'Patagonia, Argentina',
    lat: -41.13,
    lng: -71.31,
    image: barilocheLago,
    category: 'Nacionales',
    // todavía no tiene paquete propio cargado
  },
  {
    name: 'Walt Disney World',
    country: 'Orlando, Estados Unidos',
    lat: 28.39,
    lng: -81.56,
    image: disneyCastle,
    category: 'Internacionales',
    packageSlug: 'disney-a-medida',
  },
]

// ---------------------------------------------------------------------------
// Globo 3D — tarjetas de destinos por país
// ---------------------------------------------------------------------------
// Al hacer hover sobre un país (o su chip) el globo frena su giro y aparecen
// estas tarjetas a los costados. Solo los países listados acá muestran
// tarjetas; el resto sólo frena el giro mientras dura el hover.
// Se cargan país por país: para sumar uno, agregá una entrada con su código
// ADM0_A3 (el mismo de `availableCountries`) y sus columnas `left` / `right`.

export type GlobeCardEntry = {
  /** Nombre del destino tal cual se muestra en la tarjeta. */
  name: string
  /** Miniatura del destino (foto real, va debajo del nombre). */
  image: string
  /** Modalidad, cuando el destino se ofrece de varias formas. Se muestra como etiqueta. */
  mode?: string
  /** Categoría corta para el chip de la card destacada (ej. "Naturaleza", "Aventura"). */
  category?: string
  /** Frase evocadora breve para la card destacada del destino. */
  shortDescription?: string
  /** Slug del paquete al que apunta el CTA de la card destacada (ver `packages`). Si todavía no tiene uno cargado, el CTA cae en la sección de paquetes. */
  packageSlug?: string
}

export type GlobeCard = {
  entries: GlobeCardEntry[]
}

export type GlobeCountryCards = {
  /** Tarjetas ancladas a la izquierda del globo, de arriba hacia abajo. */
  left?: GlobeCard[]
  /** Tarjetas ancladas a la derecha del globo, de arriba hacia abajo. */
  right?: GlobeCard[]
}

// Clave = código ADM0_A3 del país (ver `availableCountries`).
export const globeCountryCards: Record<string, GlobeCountryCards> = {
  // Argentina: una tarjeta a la izquierda (concentra más destinos) y dos a la
  // derecha (arriba Iguazú, abajo la Patagonia).
  ARG: {
    left: [
      {
        entries: [
          {
            name: 'Salta, Humahuaca y Cafayate',
            image: cardSaltaHumahuacaCafayate,
            category: 'Cultura y paisajes',
            shortDescription: 'Paisajes andinos, quebradas de colores y pueblos con historia.',
          },
          {
            name: 'San Juan bajo las estrellas',
            image: cardSanJuanEstrellas,
            mode: 'Aéreo · Bus',
            category: 'Aventura',
            shortDescription: 'Cielos despejados, dunas y noches enteras de observación de estrellas.',
          },
          {
            name: 'Talampaya con luna llena, Laguna Brava y Valle de la Luna',
            image: cardTalampaya,
            mode: 'Aéreo · Bus',
            category: 'Naturaleza',
            shortDescription: 'Cañones milenarios y paisajes lunares iluminados por la luna llena.',
          },
        ],
      },
    ],
    right: [
      {
        entries: [
          {
            name: 'Cataratas del Iguazú',
            image: cardCataratasIguazu,
            mode: 'Aéreo · Bus',
            category: 'Naturaleza',
            shortDescription: 'Una de las maravillas naturales más impresionantes de Sudamérica.',
          },
        ],
      },
      {
        entries: [
          {
            name: 'Bariloche',
            image: cardBariloche,
            mode: 'Aéreo · Bus',
            category: 'Lagos y montañas',
            shortDescription: 'Bosques andinos, lagos turquesa y chocolate patagónico.',
          },
          {
            name: 'Neuquén y Caviahue',
            image: cardNeuquenCaviahue,
            category: 'Montañas',
            shortDescription: 'Volcanes, termas y paisajes de montaña en la Patagonia norte.',
          },
          {
            name: 'Ushuaia y Calafate',
            image: cardUshuaiaCalafate,
            category: 'El fin del mundo',
            shortDescription: 'Glaciares imponentes y el confín austral de América.',
          },
        ],
      },
    ],
  },
  // Brasil: una tarjeta a la izquierda (playas del sur) y una a la derecha.
  BRA: {
    left: [
      {
        entries: [
          {
            name: 'Camboriú',
            image: cardCamboriu,
            mode: 'Aéreo · Bus',
            category: 'Playas y vida nocturna',
            shortDescription: 'Rascacielos frente al mar y playas urbanas en el sur de Brasil.',
            packageSlug: 'camboriu-aereo',
          },
          {
            name: 'Canasvieiras',
            image: cardCanasvieiras,
            mode: 'Aéreo · Bus',
            category: 'Playas familiares',
            shortDescription: 'Playas tranquilas en la isla de Florianópolis.',
            packageSlug: 'canasvieiras-aereo',
          },
          {
            name: 'Bombinhas',
            image: cardBombinhas,
            mode: 'Aéreo · Bus',
            category: 'Playas y buceo',
            shortDescription: 'Aguas cristalinas ideales para el buceo en Santa Catarina.',
          },
          {
            name: 'Bombas',
            image: cardBombas,
            mode: 'Bus',
            category: 'Playas',
            shortDescription: 'Una playa tranquila junto a Bombinhas, ideal para relajarse.',
          },
        ],
      },
    ],
    right: [
      {
        entries: [
          {
            name: 'Ingleses',
            image: cardIngleses,
            mode: 'Aéreo',
            category: 'Playas',
            shortDescription: 'Una de las playas más extensas del norte de Florianópolis.',
          },
          {
            name: 'Quatro Ilhas',
            image: cardQuatroIlhas,
            category: 'Naturaleza y playas',
            shortDescription: 'Arena blanca y mar cristalino entre morros verdes.',
          },
          {
            name: 'Gramados y Canela con Torres',
            image: cardGramadosCanelaTorres,
            mode: 'Bus',
            category: 'Montañas y cultura',
            shortDescription: 'Clima de montaña, arquitectura europea y cañones en Torres.',
          },
          {
            name: 'Río de Janeiro',
            image: cardRioDeJaneiro,
            category: 'Cultura y playas',
            shortDescription: 'Playas icónicas, el Cristo Redentor y el espíritu carioca.',
          },
        ],
      },
    ],
  },
  // Estados Unidos: a la derecha los viajes puntuales (Disney, Nueva York y
  // Miami); a la izquierda el circuito largo, con las ciudades del recorrido
  // como subtítulo (se muestra atenuado, igual que la modalidad).
  USA: {
    left: [
      {
        entries: [
          {
            name: 'Estados Unidos de costa a costa',
            image: cardUsaCostaACosta,
            mode: 'San Francisco · Los Ángeles · Las Vegas · Washington D.C. · Nueva York · Miami',
            category: 'Gran circuito',
            shortDescription: 'Un recorrido por las ciudades más icónicas de Estados Unidos.',
          },
        ],
      },
    ],
    right: [
      {
        entries: [
          {
            name: 'Disney a Medida',
            image: cardDisneyMedida,
            category: 'Magia y diversión',
            shortDescription: 'Los parques de Orlando, armados a tu manera.',
            packageSlug: 'disney-a-medida',
          },
          {
            name: 'Nueva York y Miami',
            image: cardNuevaYorkMiami,
            category: 'Ciudad y playa',
            shortDescription: 'Rascacielos, compras y playas en un mismo viaje.',
          },
        ],
      },
    ],
  },
  // Perú: viaje aéreo a la izquierda, circuito Perú + Bolivia en bus a la derecha.
  PER: {
    left: [
      {
        entries: [
          {
            name: 'Perú',
            image: cardPeruAereo,
            mode: 'Aéreo',
            category: 'Cultura e historia',
            shortDescription: 'Machu Picchu, Cusco y los Andes peruanos.',
          },
        ],
      },
    ],
    right: [
      {
        entries: [
          {
            name: 'Perú y Bolivia',
            image: cardPeruBoliviaBus,
            mode: 'Bus',
            category: 'Aventura y altura',
            shortDescription: 'El Salar de Uyuni y los paisajes andinos en un mismo recorrido.',
          },
        ],
      },
    ],
  },
  // Chile: solo una tarjeta a la izquierda (un único viaje por ahora).
  CHL: {
    left: [
      {
        entries: [
          {
            name: 'Chile',
            image: cardChileFiordosGlaciares,
            mode: 'Crucero por fiordos y glaciares',
            category: 'Naturaleza extrema',
            shortDescription: 'Fiordos y glaciares patagónicos navegando por Chile.',
          },
        ],
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// Experiencias (fotos que comparten los viajeros)
// ---------------------------------------------------------------------------

export type Experience = {
  image: string
  travelerName: string
  destination: string
  quote?: string
}

/**
 * Fotos reales que los viajeros le compartieron a CheTour. Vacío por ahora.
 *
 * Para agregar una:
 * 1. Poné el archivo en src/assets/experiences/ (ej: maria-camboriu.jpg)
 * 2. Importalo arriba y agregá un objeto al array:
 *    { image: mariaCamboriu, travelerName: 'María', destination: 'Camboriú', quote: 'Un viaje increíble!' }
 */
export const experiences: Experience[] = []
