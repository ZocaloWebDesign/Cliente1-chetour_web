import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { siteInfo } from '@/data'

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-sea-950 px-8 py-16 text-center sm:px-16"
      >
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -top-24 left-1/4 h-72 w-72 animate-blob rounded-full bg-sea-600/40 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 h-72 w-72 animate-blob-slow rounded-full bg-turquoise-500/30 blur-3xl" />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-300">
            Contanos qué tenés en mente y armamos juntos la propuesta ideal
            para vos, a tu ritmo y a tu presupuesto.
          </p>
          <motion.a
            href={`https://wa.me/${siteInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-neutral-950"
          >
            <MessageCircle className="h-4 w-4" />
            Consultar por WhatsApp
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
