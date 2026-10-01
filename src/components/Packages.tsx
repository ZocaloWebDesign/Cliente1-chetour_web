import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { packages } from '@/data'
import { PackageCard } from '@/components/PackageCard'

// Preview corta de la home: una selección a mano (no las primeras N del
// array) para mostrar de entrada la variedad del catálogo — en vez de que
// la muestra dependa del orden en que se fueron cargando los paquetes en
// data.ts. El catálogo completo vive en /paquetes (ver AllPackages.tsx).
const SUGGESTED_SLUGS = ['ushuaia-y-calafate', 'nueva-york-y-miami', 'rio-de-janeiro']

export function Packages() {
  const suggested = SUGGESTED_SLUGS.map((slug) => packages.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => !!p,
  )

  return (
    <section id="paquetes" className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="text-sm font-semibold text-sea-600 dark:text-turquoise-300">Sugeridos</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
          Tu próxima historia empieza acá
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Elegimos hoteles, traslados y coordinación para que solo tengas que
          disfrutar el viaje.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {suggested.map((pkg, i) => (
          <PackageCard key={pkg.slug} pkg={pkg} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-12 flex justify-center"
      >
        <Link
          to="/paquetes"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 active:scale-95 dark:bg-white dark:text-neutral-950"
        >
          Ver todos los paquetes
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  )
}
