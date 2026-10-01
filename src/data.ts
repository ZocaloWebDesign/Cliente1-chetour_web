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
import cardAfricaTodoIncluido from '@/assets/globe/cards/africa-todo-incluido.jpg'
import cardEuropaClasicaEspana from '@/assets/globe/cards/europa-clasica-espana.jpg'
import cardEuropaClasicaItalia from '@/assets/globe/cards/europa-clasica-italia.jpg'
import cardEuropaClasicaFrancia from '@/assets/globe/cards/europa-clasica-francia.jpg'
import cardEuropaMaximoReinoUnido from '@/assets/globe/cards/europa-maximo-reino-unido.webp'
import cardEuropaMaximoFrancia from '@/assets/globe/cards/europa-maximo-francia.jpg'
import cardEuropaMaximoAlemania from '@/assets/globe/cards/europa-maximo-alemania.jpg'
import cardEuropaMaximoSuiza from '@/assets/globe/cards/europa-maximo-suiza.jpg'
import cardEuropaMaximoItalia from '@/assets/globe/cards/europa-maximo-italia.jpg'
import cardEuropaMaximoEspana from '@/assets/globe/cards/europa-maximo-espana.jpg'
import cardEgiptoDubaiEgipto from '@/assets/globe/cards/egipto-dubai-egipto.jpg'
import cardEgiptoDubaiDubai from '@/assets/globe/cards/egipto-dubai-dubai.webp'

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

// Los 16 paquetes "ported" desde las fichas HTML sueltas de /paquetes (ver
// src/pages/package-static/ y scripts/build-static-package-pages.mjs): estos
// datos solo alimentan la tarjeta de la grilla de #paquetes (imagen, precio,
// duración, "qué incluye") — el contenido real de cada página de detalle sale
// del fragmento HTML ported, no de acá. `image` apunta a public/paquetes/img/,
// donde todavía faltan cargar las fotos reales de cada paquete.
export const packages: TravelPackage[] = [
  {
    slug: 'africa-todo-incluido',
    name: 'África Todo Incluido',
    destination: 'Safari en Tanzania y Zanzíbar',
    category: 'Internacionales',
    duration: '16 días',
    departure: 'Salida: 6 de julio',
    mode: 'Conectividad aérea',
    includes: ['Conectividad aérea', 'Safari + Zanzíbar', 'Todo incluido'],
    price: 'USD 8.035',
    image: '/paquetes/img/africa-1.jpg',
    link: '/paquetes/africa-todo-incluido',
  },
  {
    slug: 'bariloche-bus',
    name: 'Bariloche en Bus',
    destination: 'El clásico de la Patagonia, en bus mix',
    category: 'Nacionales',
    duration: '7 días / 5 noches',
    departure: '4 fechas: marzo y abril',
    mode: 'Bus mix',
    includes: ['Bus mix', 'Media pensión', 'Asistencia médica'],
    price: '$429.000',
    image: '/paquetes/img/bariloche-1.jpg',
    link: '/paquetes/bariloche-bus',
  },
  {
    slug: 'bariloche-aereo',
    name: 'Bariloche Aéreo',
    destination: 'Escapada a la Patagonia desde Córdoba',
    category: 'Nacionales',
    duration: '6 o 7 días',
    departure: '6 fechas: feb a jun',
    mode: 'Aéreo desde Córdoba',
    includes: ['Aéreo desde Córdoba', 'Desayuno incluido', 'Asistencia médica'],
    price: '$620.000',
    image: '/paquetes/img/bariloche-1.jpg',
    link: '/paquetes/bariloche-aereo',
  },
  {
    slug: 'camboriu-bus',
    name: 'Camboriú en Bus',
    destination: '10 días / 7 noches en el sur de Brasil',
    category: 'Sur de Brasil',
    duration: '10 días / 7 noches',
    departure: 'Temporada 2026 / 2027',
    mode: 'Bus semicama o cama',
    includes: ['Bus semicama o cama', 'Desayuno y cena', 'Assist Card'],
    price: 'USD 449',
    image: '/paquetes/img/camboriu-1.jpg',
    link: '/paquetes/camboriu-bus',
  },
  {
    slug: 'canasvieiras-aereo',
    name: 'Canasvieiras Aéreo',
    destination: '8 días / 7 noches en Florianópolis',
    category: 'Sur de Brasil',
    duration: '8 días / 7 noches',
    departure: 'Salidas: enero a marzo',
    mode: 'Aéreo y traslados',
    includes: ['Aéreo y traslados', 'Desayuno y cena', 'Coordinación'],
    price: 'Consultar',
    image: '/paquetes/img/canasvieiras-1.jpg',
    link: '/paquetes/canasvieiras-aereo',
  },
  {
    slug: 'cataratas-del-iguazu-aereo',
    name: 'Cataratas del Iguazú Aéreo',
    destination: 'Escapada a Puerto Iguazú',
    category: 'Nacionales',
    duration: '4 o 5 días',
    departure: '11 fechas: enero a junio',
    mode: 'Aéreo (Aerolíneas Argentinas)',
    includes: ['Aéreo (Aerolíneas Argentinas)', 'Excursiones a las Cataratas', 'Asistencia médica'],
    price: '$840.000',
    image: '/paquetes/img/iguazu-1.jpg',
    link: '/paquetes/cataratas-del-iguazu-aereo',
  },
  {
    slug: 'crucero-fiordos-glaciares-chilenos',
    name: 'Crucero por Fiordos y Glaciares Chilenos',
    destination: 'Navegación por los fiordos patagónicos entre glaciares y témpanos, con extensión a El Calafate.',
    category: 'Internacionales',
    duration: 'Travesía de 4 noches',
    departure: 'Salida: 10 de abril',
    mode: 'Conectividad aérea',
    includes: ['Conectividad aérea', 'Pensión completa', 'Coordinación permanente'],
    price: 'USD 3.790',
    image: '/paquetes/img/crucero-1.jpg',
    link: '/paquetes/crucero-fiordos-glaciares-chilenos',
  },
  {
    slug: 'esencias-centroeuropeas',
    name: 'Esencias Centroeuropeas',
    destination: 'Circuito por el corazón de Centroeuropa vía Ámsterdam, con guía de habla hispana.',
    category: 'Internacionales',
    duration: '14 noches',
    departure: 'Salida: 16 de junio',
    mode: 'Aéreo vía Ámsterdam (Air France / KLM)',
    includes: ['Aéreo vía Ámsterdam (Air France / KLM)', 'Guía de habla hispana', 'Assist Card 100K'],
    price: 'USD 4.980',
    image: '/paquetes/img/centroeuropa-1.jpg',
    link: '/paquetes/esencias-centroeuropeas',
  },
  {
    slug: 'estados-unidos-costa-a-costa',
    name: 'Estados Unidos de Costa a Costa',
    destination: '19 días con el Gran Cañón',
    category: 'Internacionales',
    duration: '19 días',
    departure: 'Salida: 29 de abril',
    mode: 'Conectividad aérea',
    includes: ['Conectividad aérea', 'Costa a costa', 'Pensión completa'],
    price: 'USD 9.660',
    image: '/paquetes/img/usa-1.jpg',
    link: '/paquetes/estados-unidos-costa-a-costa',
  },
  {
    slug: 'europa-al-maximo-londres-madrid',
    name: 'Europa al Máximo, de Londres a Madrid',
    destination: 'Circuito por 11 ciudades: Londres, París, los Alpes, Italia, Barcelona y Madrid.',
    category: 'Internacionales',
    duration: '21 días / 19 noches',
    departure: 'Salidas: 16 may y 19 sep',
    mode: 'Aéreo desde Córdoba (COR)',
    includes: ['Aéreo desde Córdoba (COR)', '11 ciudades', 'Desayuno diario'],
    price: 'USD 5.112',
    image: '/paquetes/img/europa-1.jpg',
    link: '/paquetes/europa-al-maximo-londres-madrid',
  },
  {
    slug: 'europa-clasica-costa-amalfitana-toscana',
    name: 'Europa Clásica, con Costa Amalfitana y la Toscana',
    destination: 'España e Italia con la Costa Amalfitana, Capri, la Toscana y cierre en París.',
    category: 'Internacionales',
    duration: '20 días',
    departure: 'Salida: 12 de octubre',
    mode: 'Conectividad aérea',
    includes: ['Conectividad aérea', 'Hoteles 4★', 'Pensión completa'],
    price: 'USD 9.525',
    image: '/paquetes/img/europaclasica-1.jpg',
    link: '/paquetes/europa-clasica-costa-amalfitana-toscana',
  },
  {
    slug: 'gramado-y-canela-con-torres-bus',
    name: 'Gramado y Canela con Torres',
    destination: 'Salida Internacional en Bus',
    category: 'Internacionales',
    duration: '7 días / 4 noches',
    departure: 'Salida: 30 de marzo',
    mode: 'Bus cama última generación',
    includes: ['Bus cama última generación', 'Media pensión', 'Gramado + Torres'],
    price: 'USD 670',
    image: '/paquetes/img/gramado-1.jpg',
    link: '/paquetes/gramado-y-canela-con-torres-bus',
  },
  {
    slug: 'neuquen-y-caviahue',
    name: 'Neuquén y Caviahue',
    destination: 'Escapada Aérea con Termas de Copahue',
    category: 'Nacionales',
    duration: '5 días / 4 noches',
    departure: 'Salida: 1 de abril',
    mode: 'Aéreo desde Córdoba (Flybondi)',
    includes: ['Aéreo desde Córdoba (Flybondi)', 'Desayuno incluido', 'Excursión a Termas de Copahue'],
    price: '$990.000',
    image: '/paquetes/img/caviahue-1.jpg',
    link: '/paquetes/neuquen-y-caviahue',
  },
  {
    slug: 'salta-humahuaca-cafayate',
    name: 'Salta, Humahuaca y Cafayate',
    destination: 'Cerro de colores, castillos de arena roja y peña salteña, con todo incluido.',
    category: 'Nacionales',
    duration: '5 días',
    departure: 'Salida: 3 de julio',
    mode: 'Conectividad aérea',
    includes: ['Conectividad aérea', 'Pensión completa', 'Coordinación permanente'],
    price: '$1.510.000',
    image: '/paquetes/img/nqa-2.jpg',
    link: '/paquetes/salta-humahuaca-cafayate',
  },
  {
    slug: 'san-juan-bajo-las-estrellas-bus',
    name: 'San Juan Bajo las Estrellas',
    destination: 'Astroturismo en Bus, 7 días',
    category: 'Nacionales',
    duration: '7 días',
    departure: 'Salida: 16 de abril',
    mode: 'Bus cama 5★',
    includes: ['Bus cama 5★', 'Pensión completa', 'Astroturismo'],
    price: '$1.869.000',
    image: '/paquetes/img/sanjuan-1.jpg',
    link: '/paquetes/san-juan-bajo-las-estrellas-bus',
  },
  {
    slug: 'san-juan-bajo-las-estrellas-aereo',
    name: 'San Juan Bajo las Estrellas Aéreo',
    destination: 'Astroturismo con conectividad aérea, 6 días',
    category: 'Nacionales',
    duration: '6 días',
    departure: 'Salida: 16 de abril',
    mode: 'Conectividad aérea',
    includes: ['Conectividad aérea', 'Pensión completa', 'Astroturismo'],
    price: '$1.869.000',
    image: '/paquetes/img/sanjuan-1.jpg',
    link: '/paquetes/san-juan-bajo-las-estrellas-aereo',
  },
  {
    slug: 'talampaya-con-luna-llena-laguna-brava-y-valle-de-la-luna-bus',
    name: 'Talampaya con Luna Llena, Laguna Brava y Valle de la Luna',
    destination: 'Salida Nacional en Bus',
    category: 'Nacionales',
    duration: '6 días',
    departure: 'Salida: 29 de abril',
    mode: 'Bus cama 5★',
    includes: ['Bus cama 5★', 'Pensión completa', 'Con luna llena'],
    price: '$1.625.000',
    image: '/paquetes/img/talampaya-1.jpg',
    link: '/paquetes/talampaya-con-luna-llena-laguna-brava-y-valle-de-la-luna-bus',
  },
  {
    slug: 'talampaya-con-luna-llena-laguna-brava-y-valle-de-la-luna-aereo',
    name: 'Talampaya con Luna Llena, Laguna Brava y Valle de la Luna Aéreo',
    destination: 'Salida Nacional Aérea',
    category: 'Nacionales',
    duration: '5 días',
    departure: 'Salida: 29 de abril',
    mode: 'Conectividad aérea',
    includes: ['Conectividad aérea', 'Pensión completa', 'Con luna llena'],
    price: '$1.625.000',
    image: '/paquetes/img/talampaya-1.jpg',
    link: '/paquetes/talampaya-con-luna-llena-laguna-brava-y-valle-de-la-luna-aereo',
  },
  {
    slug: 'ushuaia-y-calafate',
    name: 'Ushuaia y Calafate',
    destination: 'Aéreo desde Córdoba, 7 u 8 días',
    category: 'Nacionales',
    duration: '7 u 8 días',
    departure: '5 fechas: enero a marzo',
    mode: 'Aéreo desde Córdoba',
    includes: ['Aéreo desde Córdoba', 'Desayuno incluido', '2 Parques Nacionales'],
    price: '$1.375.000',
    image: '/paquetes/img/ushuaia-1.jpg',
    link: '/paquetes/ushuaia-y-calafate',
  },
  {
    slug: 'nueva-york-y-miami',
    name: 'Nueva York y Miami',
    destination: '12 días de ciudad y playa',
    category: 'Internacionales',
    duration: '12 días',
    departure: 'Salida: 21 de julio',
    mode: 'Conectividad aérea',
    includes: ['Conectividad aérea', 'Nueva York + Miami', 'Media pensión'],
    price: 'USD 4.988',
    image: '/paquetes/img/nyc-miami-1.jpg',
    link: '/paquetes/nueva-york-y-miami',
  },
  {
    slug: 'egipto-dubai-crucero-nilo',
    name: 'Egipto y Dubái con Crucero en el Nilo',
    destination: 'Pirámides y desierto',
    category: 'Internacionales',
    duration: 'Duración a confirmar',
    departure: 'Salida a confirmar',
    mode: 'Conectividad aérea',
    includes: ['Conectividad aérea', 'Egipto + Dubái', 'Pensión completa'],
    price: 'Consultar',
    image: '/paquetes/img/egipto-dubai-1.jpg',
    link: '/paquetes/egipto-dubai-crucero-nilo',
  },
  {
    slug: 'rio-de-janeiro',
    name: 'Río de Janeiro',
    destination: 'Copacabana desde Córdoba',
    category: 'Internacionales',
    duration: '8 días / 7 noches',
    departure: 'Salida: 29 de marzo',
    mode: 'Aéreo desde Córdoba',
    includes: ['Aéreo desde Córdoba', 'Desayuno incluido', 'Asistencia médica'],
    price: 'USD 1.326',
    image: '/paquetes/img/rio-1.jpg',
    link: '/paquetes/rio-de-janeiro',
  },
  {
    slug: 'peru-aereo',
    name: 'Perú',
    destination: 'Cusco, Valle Sagrado y Machu Picchu',
    category: 'Internacionales',
    duration: '8 días / 7 noches',
    departure: 'Salida: 13 de abril',
    mode: 'Conectividad aérea',
    includes: ['Conectividad aérea', 'Desayuno y media pensión', 'Asistencia médica'],
    price: 'USD 1.391',
    image: '/paquetes/img/peru-1.webp',
    link: '/paquetes/peru-aereo',
  },
  {
    slug: 'peru-y-bolivia-bus',
    name: 'Perú y Bolivia',
    destination: 'Circuito en bus por el norte argentino, Bolivia y Perú',
    category: 'Internacionales',
    duration: '17 días',
    departure: '6 fechas: abril a noviembre',
    mode: 'Bus cama',
    includes: ['Bus cama', 'Media pensión', 'Excursiones incluidas'],
    price: 'USD 1.699',
    image: '/paquetes/img/peru-bolivia-3.jpg',
    link: '/paquetes/peru-y-bolivia-bus',
  },
  {
    slug: 'quatro-ilhas',
    name: 'Quatro Ilhas',
    destination: 'Playas en Bombinhas, Santa Catarina',
    category: 'Sur de Brasil',
    duration: '10 días / 7 noches',
    departure: 'Salidas todo el año',
    mode: 'Bus mix última generación',
    includes: ['Bus mix última generación', 'Traslados in/out', 'Desayuno incluido'],
    price: 'USD 299',
    image: '/paquetes/img/quatro-ilhas-1.jpg',
    link: '/paquetes/quatro-ilhas',
  },
  {
    slug: 'disney-a-medida',
    name: 'Disney a Medida',
    destination: 'Walt Disney World, Orlando — 100% personalizado',
    category: 'Internacionales',
    duration: 'A elección',
    departure: 'Fecha a elección',
    mode: 'Conectividad aérea',
    includes: ['Hotelería a elección', 'Entradas a los parques', 'Asesoramiento personalizado'],
    price: 'Consultar',
    priceNote: 'Cotización a medida',
    image: '/paquetes/img/disney-1.jpg',
    link: '/paquetes/disney-a-medida',
    highlight: true,
  },
  {
    slug: 'ingleses-aereo',
    name: 'Ingleses Aéreo',
    destination: 'Una de las playas más extensas del norte de Florianópolis',
    category: 'Sur de Brasil',
    duration: '8 días / 7 noches',
    departure: 'Salidas todo el año',
    mode: 'Aéreo desde Córdoba',
    includes: ['Aéreo desde Córdoba', 'Traslados in/out', 'Desayuno incluido'],
    price: 'Desde USD 1.315',
    image: '/paquetes/img/ingleses-1.jpg',
    link: '/paquetes/ingleses-aereo',
  },
  {
    slug: 'bombinhas-aereo',
    name: 'Bombinhas Aéreo',
    destination: 'Aguas cristalinas en Santa Catarina, con vuelo desde Córdoba',
    category: 'Sur de Brasil',
    duration: '8 días / 7 noches',
    departure: 'Salidas todo el año',
    mode: 'Aéreo desde Córdoba',
    includes: ['Aéreo desde Córdoba', 'Traslados in/out', 'Desayuno incluido'],
    price: 'Desde USD 1.045',
    image: '/paquetes/img/bombinhas-1.jpg',
    link: '/paquetes/bombinhas-aereo',
  },
  {
    slug: 'bombinhas-bus',
    name: 'Bombinhas',
    destination: 'Aguas cristalinas en Santa Catarina',
    category: 'Sur de Brasil',
    duration: '10 días / 7 noches',
    departure: '4 fechas en abril',
    mode: 'Bus mix última generación',
    includes: ['Bus mix última generación', 'Traslados in/out', 'Desayuno incluido'],
    price: 'USD 749',
    image: '/paquetes/img/bombinhas-1.jpg',
    link: '/paquetes/bombinhas-bus',
  },
  {
    slug: 'bombas-bus',
    name: 'Bombas',
    destination: 'Praia de Bombas, junto a Bombinhas',
    category: 'Sur de Brasil',
    duration: '10 días / 7 noches',
    departure: 'Salidas todo el año',
    mode: 'Bus mix última generación',
    includes: ['Bus mix última generación', 'Traslados in/out', 'Desayuno incluido'],
    price: 'USD 699',
    image: '/paquetes/img/bombas-1.jpg',
    link: '/paquetes/bombas-bus',
  },
  {
    slug: 'camboriu-aereo',
    name: 'Camboriú Aéreo',
    destination: 'Balneário Camboriú, con vuelo incluido',
    category: 'Sur de Brasil',
    duration: '8 días / 7 noches',
    departure: 'Salidas: enero a marzo',
    mode: 'Aéreo y traslados',
    includes: ['Aéreo y traslados', 'Desayuno y cena', 'Coordinación'],
    price: 'Consultar',
    image: '/paquetes/img/camboriu-1.jpg',
    link: '/paquetes/camboriu-aereo',
  },
  {
    slug: 'canasvieiras-bus',
    name: 'Canasvieiras en Bus',
    destination: 'Florianópolis, con bus semicama o cama',
    category: 'Sur de Brasil',
    duration: '10 días / 7 noches',
    departure: 'Temporada 2026 / 2027',
    mode: 'Bus semicama o cama',
    includes: ['Bus semicama o cama', 'Desayuno y cena', 'Assist Card'],
    price: 'Desde USD 549',
    image: '/paquetes/img/canasvieiras-1.jpg',
    link: '/paquetes/canasvieiras-bus',
  },
  {
    slug: 'cataratas-del-iguazu-bus',
    name: 'Cataratas del Iguazú en Bus',
    destination: 'San Ignacio, Wanda y las Cataratas, por Misiones',
    category: 'Nacionales',
    duration: '7 días / 4 noches',
    departure: '17 fechas: marzo a junio',
    mode: 'Bus mix',
    includes: ['Bus mix', 'Media pensión', 'Asistencia médica'],
    price: '$399.900',
    image: '/paquetes/img/iguazu-1.jpg',
    link: '/paquetes/cataratas-del-iguazu-bus',
  },
]

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
    packageSlug: 'camboriu-bus',
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
  /** Crédito de la foto, si la licencia lo exige (ej. Wikimedia CC BY-SA) — mismo criterio que `TravelPackage.heroCredit`. */
  credit?: string
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
            packageSlug: 'salta-humahuaca-cafayate',
          },
          {
            name: 'San Juan bajo las estrellas',
            image: cardSanJuanEstrellas,
            mode: 'Aéreo · Bus',
            category: 'Aventura',
            shortDescription: 'Cielos despejados, dunas y noches enteras de observación de estrellas.',
            packageSlug: 'san-juan-bajo-las-estrellas-bus',
          },
          {
            name: 'Talampaya con luna llena, Laguna Brava y Valle de la Luna',
            image: cardTalampaya,
            mode: 'Aéreo · Bus',
            category: 'Naturaleza',
            shortDescription: 'Cañones milenarios y paisajes lunares iluminados por la luna llena.',
            packageSlug: 'talampaya-con-luna-llena-laguna-brava-y-valle-de-la-luna-bus',
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
            packageSlug: 'cataratas-del-iguazu-aereo',
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
            packageSlug: 'bariloche-aereo',
          },
          {
            name: 'Neuquén y Caviahue',
            image: cardNeuquenCaviahue,
            category: 'Montañas',
            shortDescription: 'Volcanes, termas y paisajes de montaña en la Patagonia norte.',
            packageSlug: 'neuquen-y-caviahue',
          },
          {
            name: 'Ushuaia y Calafate',
            image: cardUshuaiaCalafate,
            category: 'El fin del mundo',
            shortDescription: 'Glaciares imponentes y el confín austral de América.',
            packageSlug: 'ushuaia-y-calafate',
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
            packageSlug: 'camboriu-bus',
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
            packageSlug: 'bombinhas-bus',
          },
          {
            name: 'Bombas',
            image: cardBombas,
            mode: 'Bus',
            category: 'Playas',
            shortDescription: 'Una playa tranquila junto a Bombinhas, ideal para relajarse.',
            packageSlug: 'bombas-bus',
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
            packageSlug: 'ingleses-aereo',
          },
          {
            name: 'Quatro Ilhas',
            image: cardQuatroIlhas,
            category: 'Naturaleza y playas',
            shortDescription: 'Arena blanca y mar cristalino entre morros verdes.',
            packageSlug: 'quatro-ilhas',
          },
          {
            name: 'Gramados y Canela con Torres',
            image: cardGramadosCanelaTorres,
            mode: 'Bus',
            category: 'Montañas y cultura',
            shortDescription: 'Clima de montaña, arquitectura europea y cañones en Torres.',
            packageSlug: 'gramado-y-canela-con-torres-bus',
          },
          {
            name: 'Río de Janeiro',
            image: cardRioDeJaneiro,
            category: 'Cultura y playas',
            shortDescription: 'Playas icónicas, el Cristo Redentor y el espíritu carioca.',
            packageSlug: 'rio-de-janeiro',
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
            packageSlug: 'estados-unidos-costa-a-costa',
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
            packageSlug: 'nueva-york-y-miami',
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
            packageSlug: 'peru-aereo',
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
            shortDescription: 'La Paz, el Lago Titicaca y Cusco, en un circuito en bus por Bolivia y Perú.',
            packageSlug: 'peru-y-bolivia-bus',
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
            packageSlug: 'crucero-fiordos-glaciares-chilenos',
          },
        ],
      },
    ],
  },
  // Tanzania: solo una tarjeta a la izquierda (un único viaje por ahora),
  // igual que Chile. Datos sacados de "África Todo Incluido"
  // (chetour.empretienda.com.ar/salidas/internacionales/africa-todo-incluido):
  // safari por Tarangire, Serengeti y Ngorongoro + cierre de playa en Zanzíbar.
  TZA: {
    left: [
      {
        entries: [
          {
            name: 'Tanzania',
            image: cardAfricaTodoIncluido,
            mode: 'Safari y playas de Zanzíbar',
            category: 'Safari y playas',
            shortDescription: 'Elefantes, leones y sabana en el Serengeti, con un final de playa en Zanzíbar.',
            packageSlug: 'africa-todo-incluido',
          },
        ],
      },
    ],
  },
  // "Europa Clásica, con Costa Amalfitana y La Toscana" pasa por tres países
  // (España, Italia, Francia): el mismo paquete aparece en los tres, cada uno
  // con la foto y la bajada de SU tramo del circuito. Datos sacados de
  // chetour.empretienda.com.ar/salidas/internacionales/europa-clasica-con-costa-amalfitana-y-la-toscana
  // "Europa al Máximo, de Londres a Madrid" pasa por SEIS países (Reino
  // Unido, Francia, Alemania, Suiza, Italia, España) — un circuito distinto
  // al de arriba, así que en España/Italia/Francia se suma como un segundo
  // destino en la misma lista, y Reino Unido/Alemania/Suiza son países
  // nuevos. Datos sacados de
  // chetour.empretienda.com.ar/salidas/internacionales/europa-al-maximo-de-londres-a-madrid
  ESP: {
    left: [
      {
        entries: [
          {
            name: 'Europa Clásica, Costa Amalfitana y Toscana',
            image: cardEuropaClasicaEspana,
            mode: 'Aéreo',
            category: 'Ciudades imperiales',
            shortDescription: 'Madrid, Toledo y Barcelona, la puerta de entrada a lo mejor de Europa.',
            credit: 'Foto: Carlos Delgado / Wikimedia Commons (CC BY-SA)',
            packageSlug: 'europa-clasica-costa-amalfitana-toscana',
          },
          {
            name: 'Europa al Máximo, de Londres a Madrid',
            image: cardEuropaMaximoEspana,
            mode: 'Aéreo · Bus',
            category: 'Barcelona y Madrid',
            shortDescription: 'Barcelona y Madrid, el cierre de un recorrido de punta a punta por Europa.',
            packageSlug: 'europa-al-maximo-londres-madrid',
          },
        ],
      },
    ],
  },
  ITA: {
    left: [
      {
        entries: [
          {
            name: 'Europa Clásica, Costa Amalfitana y Toscana',
            image: cardEuropaClasicaItalia,
            mode: 'Aéreo',
            category: 'Amalfi y Toscana',
            shortDescription: 'Nápoles, la Costa Amalfitana, Capri, Roma, la Toscana y Venecia en un mismo circuito.',
            packageSlug: 'europa-clasica-costa-amalfitana-toscana',
          },
          {
            name: 'Europa al Máximo, de Londres a Madrid',
            image: cardEuropaMaximoItalia,
            mode: 'Aéreo · Bus',
            category: 'Roma, Florencia y Venecia',
            shortDescription: 'Venecia, Roma y Florencia, el corazón italiano de un gran circuito europeo.',
            packageSlug: 'europa-al-maximo-londres-madrid',
          },
        ],
      },
    ],
  },
  FRA: {
    left: [
      {
        entries: [
          {
            name: 'Europa Clásica, Costa Amalfitana y Toscana',
            image: cardEuropaClasicaFrancia,
            mode: 'Aéreo',
            category: 'París y el Sena',
            shortDescription: 'París y un crucero por el Sena, el cierre de un recorrido por lo mejor de Europa.',
            packageSlug: 'europa-clasica-costa-amalfitana-toscana',
          },
          {
            name: 'Europa al Máximo, de Londres a Madrid',
            image: cardEuropaMaximoFrancia,
            mode: 'Aéreo · Bus',
            category: 'Costa Azul y Riviera',
            shortDescription: 'París y la Costa Azul, dos caras bien distintas de Francia en un mismo viaje.',
            credit: 'Foto: Rafael Puerto / Wikimedia Commons (CC BY-SA)',
            packageSlug: 'europa-al-maximo-londres-madrid',
          },
        ],
      },
    ],
  },
  GBR: {
    left: [
      {
        entries: [
          {
            name: 'Europa al Máximo, de Londres a Madrid',
            image: cardEuropaMaximoReinoUnido,
            mode: 'Aéreo · Bus',
            category: 'Londres icónico',
            shortDescription: 'Londres, punto de partida de un gran circuito de 21 días por Europa.',
            packageSlug: 'europa-al-maximo-londres-madrid',
          },
        ],
      },
    ],
  },
  DEU: {
    left: [
      {
        entries: [
          {
            name: 'Europa al Máximo, de Londres a Madrid',
            image: cardEuropaMaximoAlemania,
            mode: 'Aéreo · Bus',
            category: 'Frankfurt y Múnich',
            shortDescription: 'Frankfurt y Múnich, la escala centroeuropea de un gran circuito por el continente.',
            credit: 'Foto: Saptarshi Pal / Wikimedia Commons (CC BY-SA)',
            packageSlug: 'europa-al-maximo-londres-madrid',
          },
        ],
      },
    ],
  },
  CHE: {
    left: [
      {
        entries: [
          {
            name: 'Europa al Máximo, de Londres a Madrid',
            image: cardEuropaMaximoSuiza,
            mode: 'Aéreo · Bus',
            category: 'Lagos y Alpes suizos',
            shortDescription: 'Zúrich, entre Múnich y Venecia, en un recorrido a fondo por Europa.',
            credit: 'Foto: Chensiyuan / Wikimedia Commons (CC BY-SA)',
            packageSlug: 'europa-al-maximo-londres-madrid',
          },
        ],
      },
    ],
  },
  // "Egipto y Dubái con crucero en el Río Nilo" pasa por dos países: cada uno
  // suma su primer destino (ninguno tenía tarjetas todavía). Datos sacados de
  // chetour.empretienda.com.ar/salidas/internacionales/egipto-y-dubai-con-crucero-en-el-rio-nilo
  EGY: {
    left: [
      {
        entries: [
          {
            name: 'Egipto y Dubái con crucero en el Nilo',
            image: cardEgiptoDubaiEgipto,
            mode: 'Aéreo',
            category: 'Pirámides y crucero por el Nilo',
            shortDescription: 'El Cairo, Abú Simbel y un crucero por el Nilo, entre pirámides y templos milenarios.',
            packageSlug: 'egipto-dubai-crucero-nilo',
          },
        ],
      },
    ],
  },
  ARE: {
    left: [
      {
        entries: [
          {
            name: 'Egipto y Dubái con crucero en el Nilo',
            image: cardEgiptoDubaiDubai,
            mode: 'Aéreo',
            category: 'Rascacielos y desierto',
            shortDescription: 'Dubái y su safari en el desierto, el cierre moderno de un viaje entre faraones.',
            packageSlug: 'egipto-dubai-crucero-nilo',
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
