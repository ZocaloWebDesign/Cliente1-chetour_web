import { motion } from 'framer-motion'
import { packages } from '@/data'
import { PackageCard } from '@/components/PackageCard'

export function Packages() {
  return (
    <section id="paquetes" className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="text-sm font-semibold text-sea-600 dark:text-turquoise-300">
          Salidas destacadas
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
          Tu próxima historia empieza acá
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Elegimos hoteles, traslados y coordinación para que solo tengas que
          disfrutar el viaje.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, i) => (
          <PackageCard key={pkg.slug} pkg={pkg} index={i} />
        ))}
      </div>
    </section>
  )
}
