import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { packages, type TravelPackage } from '@/data'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { WhatsappButton } from '@/components/WhatsappButton'
import { PackageCard } from '@/components/PackageCard'

const FILTERS: { label: string; match: (pkg: TravelPackage) => boolean }[] = [
  { label: 'Todos', match: () => true },
  { label: 'Nacionales', match: (pkg) => pkg.category === 'Nacionales' },
  { label: 'Internacionales', match: (pkg) => pkg.category === 'Internacionales' },
  { label: 'Sur de Brasil', match: (pkg) => pkg.category === 'Sur de Brasil' },
]

/** Catálogo completo: todas las salidas, con filtro por categoría. A diferencia
 * de la grilla de la home (que solo muestra unos pocos "Sugeridos"), acá está
 * el listado entero — es donde apuntan el header, el footer y todos los "ver
 * todos los paquetes" del sitio. */
export function AllPackages() {
  const [filter, setFilter] = useState(0)
  const visible = useMemo(() => packages.filter(FILTERS[filter].match), [filter])

  return (
    <div className="min-h-screen text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Nav />

      <main>
        <section className="bg-twilight-950 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-semibold text-turquoise-300"
            >
              Catálogo completo
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              Todos nuestros <span className="font-semibold text-turquoise-300">paquetes</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-neutral-300"
            >
              {packages.length} salidas nacionales e internacionales. Elegimos hoteles, traslados y
              coordinación para que solo tengas que disfrutar el viaje.
            </motion.p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            {FILTERS.map((f, i) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setFilter(i)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  filter === i
                    ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950'
                    : 'border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
            {visible.length} {visible.length === 1 ? 'paquete' : 'paquetes'}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((pkg, i) => (
              <PackageCard key={pkg.slug} pkg={pkg} index={i} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappButton />
    </div>
  )
}
