import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  BedDouble,
  CableCar,
  Calendar,
  CalendarDays,
  Check,
  Clock,
  FerrisWheel,
  MapPin,
  MessageCircle,
  Plane,
  Sparkles,
  Ticket,
  Umbrella,
  Users,
  Waves,
} from 'lucide-react'
import { packages, siteInfo, type SignatureIconName, type TravelPackage } from '@/data'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { WhatsappButton } from '@/components/WhatsappButton'
import { Badge } from '@/components/ui'

const SIGNATURE_ICONS: Record<SignatureIconName, typeof Calendar> = {
  calendar: CalendarDays,
  clock: Clock,
  hotel: BedDouble,
  ticket: Ticket,
  sparkles: Sparkles,
  waves: Waves,
  umbrella: Umbrella,
  users: Users,
  cablecar: CableCar,
  ferriswheel: FerrisWheel,
}

const SIGNATURE_THEMES = {
  twilight: {
    band: 'bg-twilight-950',
    chip: 'bg-twilight-800/80',
    border: 'border-amber-300/40',
    icon: 'text-amber-300',
    eyebrow: 'text-amber-300',
  },
  cyan: {
    band: 'bg-cyan-950',
    chip: 'bg-cyan-900/70',
    border: 'border-cyan-300/40',
    icon: 'text-cyan-300',
    eyebrow: 'text-cyan-300',
  },
  orange: {
    band: 'bg-orange-950',
    chip: 'bg-orange-900/70',
    border: 'border-orange-300/40',
    icon: 'text-orange-300',
    eyebrow: 'text-orange-300',
  },
} as const

const STUB_ROTATIONS = [-4, 2, -3, 3, -2]

/** "Disney a Medida" → { base: "Disney", accent: "a Medida" }, para resaltar la promesa de personalización en el título. */
function splitAccent(name: string) {
  const marker = ' a Medida'
  const idx = name.indexOf(marker)
  if (idx === -1) return { base: name, accent: null as string | null }
  return { base: name.slice(0, idx), accent: name.slice(idx + 1) }
}

export function PackageDetail() {
  const { slug } = useParams<{ slug: string }>()
  const pkg = packages.find((p) => p.slug === slug)

  if (!pkg) {
    return (
      <div className="min-h-screen text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <Nav />
        <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-40 text-center">
          <h1 className="text-2xl font-semibold">No encontramos ese paquete</h1>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400">
            Puede que el link esté mal escrito o el paquete ya no esté disponible.
          </p>
          <Link
            to="/#paquetes"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-neutral-950"
          >
            <ArrowLeft className="h-4 w-4" /> Ver todos los paquetes
          </Link>
        </main>
        <Footer />
        <WhatsappButton />
      </div>
    )
  }

  const gallery = pkg.gallery ?? [pkg.image]
  const hero = pkg.heroImage ?? gallery[0]
  const thumbs = pkg.gallery ? (pkg.heroImage ? pkg.gallery : pkg.gallery.slice(1)) : []
  const { base, accent } = splitAccent(pkg.name)
  const whatsappHref = `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(
    `Hola! Quiero más información sobre ${pkg.name} (${pkg.destination}).`,
  )}`

  return (
    <div className="min-h-screen text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Nav />

      <main>
        {/* hero */}
        <section className="relative">
          <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-twilight-950 sm:h-[78vh]">
            <img src={hero} alt={pkg.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-twilight-950/80 via-twilight-950/20 to-transparent" />

            {pkg.heroCredit && (
              <span className="absolute right-3 bottom-3 text-[10px] text-white/40">{pkg.heroCredit}</span>
            )}

            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-6xl px-6 pb-14 sm:pb-16">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-turquoise-300">
                  {pkg.highlight ? 'Un viaje, a tu manera' : pkg.category}
                </p>

                <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  {accent ? (
                    <>
                      {base} <em className="font-accent font-normal italic text-turquoise-300">{accent}</em>
                    </>
                  ) : (
                    pkg.name
                  )}
                </h1>

                <p className="mt-4 flex items-center gap-1.5 text-base text-white/85">
                  <MapPin className="h-4 w-4" /> {pkg.destination}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {pkg.highlight && (
                    <Badge className="rounded-full bg-white/90 text-neutral-900 hover:bg-white/90">
                      A tu medida
                    </Badge>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    <Plane className="h-3 w-3" />
                    {pkg.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {pkg.signature && <SignatureStrip signature={pkg.signature} />}

        {/* contenido */}
        <section className="mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:py-28 lg:grid-cols-[1fr_23rem] lg:gap-20">
          <div className="space-y-14">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
                <p className="flex items-center gap-1.5 text-xs font-medium text-sea-600 dark:text-turquoise-300">
                  <Calendar className="h-3.5 w-3.5" /> Duración
                </p>
                <p className="mt-2 text-base font-semibold">{pkg.duration}</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
                <p className="flex items-center gap-1.5 text-xs font-medium text-sea-600 dark:text-turquoise-300">
                  <Calendar className="h-3.5 w-3.5" /> Salida
                </p>
                <p className="mt-2 text-base font-semibold">{pkg.departure}</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
                <p className="flex items-center gap-1.5 text-xs font-medium text-sea-600 dark:text-turquoise-300">
                  <Plane className="h-3.5 w-3.5" /> Modalidad
                </p>
                <p className="mt-2 text-base font-semibold">{pkg.mode}</p>
              </div>
            </div>

            {pkg.spotlight && (
              <div className="flex gap-4 rounded-2xl bg-turquoise-300/15 p-7 dark:bg-turquoise-500/10">
                <Sparkles className="h-5 w-5 shrink-0 text-sea-600 dark:text-turquoise-300" />
                <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {pkg.spotlight}
                </p>
              </div>
            )}

            <div>
              <h2 className="font-display text-2xl font-medium">Qué incluye</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {!pkg.gallery && (
              <p className="text-sm text-neutral-400 dark:text-neutral-600">
                Muy pronto vamos a sumar más fotos y detalles de este paquete.
              </p>
            )}
          </div>

          {/* card de consulta */}
          <aside className="h-fit rounded-3xl border border-neutral-200 p-8 shadow-sm dark:border-neutral-800 lg:sticky lg:top-24">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Precio</p>
            <p className="mt-2 font-display text-3xl font-medium text-neutral-950 dark:text-white">{pkg.price}</p>
            {pkg.priceNote && (
              <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">{pkg.priceNote}</p>
            )}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              Consultar por WhatsApp
            </a>

            <a
              href={`mailto:${siteInfo.email}?subject=${encodeURIComponent(`Consulta: ${pkg.name}`)}`}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 px-5 py-3.5 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              Escribir por email
            </a>
          </aside>
        </section>

        {thumbs.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-28">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {thumbs.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-200 shadow-sm dark:border-neutral-800"
                >
                  <img src={src} alt={`${pkg.name} ${i + 1}`} className="h-full w-full object-cover" />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsappButton />
    </div>
  )
}

/**
 * Franja "firma": misma estructura (fichas con ícono, en abanico, sobre una
 * banda de color) en las tres páginas de paquete — solo cambian el tema de
 * color, los íconos y los textos según el destino.
 */
function SignatureStrip({ signature }: { signature: NonNullable<TravelPackage['signature']> }) {
  const prefersReducedMotion = useReducedMotion()
  const theme = SIGNATURE_THEMES[signature.theme]

  return (
    <div className={`${theme.band} py-16 sm:py-20`}>
      <div className="mx-auto max-w-6xl px-6">
        <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${theme.eyebrow}`}>
          {signature.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-2xl font-medium text-white sm:text-3xl">{signature.heading}</h2>
        <p className="mt-2 max-w-xl text-sm text-white/60">{signature.subheading}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-5 sm:justify-start">
          {signature.chips.map((chip, i) => {
            const Icon = SIGNATURE_ICONS[chip.icon]
            const rotate = prefersReducedMotion ? 0 : STUB_ROTATIONS[i % STUB_ROTATIONS.length]
            return (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate }}
                whileHover={prefersReducedMotion ? undefined : { rotate: 0, y: -6 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, type: 'spring', stiffness: 220, damping: 20 }}
                className={`w-[8.5rem] shrink-0 rounded-2xl border border-dashed px-4 py-6 text-center shadow-lg shadow-black/25 sm:w-40 ${theme.border} ${theme.chip}`}
              >
                <Icon className={`mx-auto h-5 w-5 ${theme.icon}`} strokeWidth={1.75} />
                <p className="mt-3 font-display text-base text-white">{chip.label}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                  {chip.caption}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
