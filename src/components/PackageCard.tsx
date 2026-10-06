import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Calendar, Check, Plane } from 'lucide-react'
import type { TravelPackage } from '@/data'
import { Badge } from '@/components/ui'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const MotionCard = motion.create(Card)

export function PackageCard({ pkg, index }: { pkg: TravelPackage; index: number }) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
      whileHover={{
        scale: 1.06,
        zIndex: 10,
        transition: { type: 'spring', stiffness: 300, damping: 22 },
      }}
      className="group relative h-full gap-0 rounded-3xl p-0 shadow-sm transition-shadow duration-300 hover:shadow-[0_16px_32px_-14px_rgba(15,23,42,0.3)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.destination}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
        {pkg.highlight && (
          <Badge className="absolute top-4 left-4 rounded-full bg-white/90 text-neutral-900 hover:bg-white/90">
            A tu medida
          </Badge>
        )}
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-800 backdrop-blur">
          <Plane className="h-3 w-3" />
          {pkg.category}
        </span>
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-neutral-950 dark:text-white">{pkg.name}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{pkg.destination}</p>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          <Calendar className="h-3.5 w-3.5" />
          {pkg.duration} · {pkg.departure}
        </div>

        <ul className="mt-4 space-y-1.5">
          {pkg.includes.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex items-end justify-between gap-3 border-t border-neutral-100 bg-transparent px-5 py-4 dark:border-neutral-800">
        <div>
          <p className="text-base font-semibold text-neutral-950 dark:text-white">{pkg.price}</p>
          {pkg.priceNote && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{pkg.priceNote}</p>
          )}
        </div>
        <Link
          to={`/paquetes/${pkg.slug}`}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-neutral-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:scale-105 active:scale-95 dark:bg-white dark:text-neutral-950"
        >
          Ver más
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardFooter>
    </MotionCard>
  )
}
