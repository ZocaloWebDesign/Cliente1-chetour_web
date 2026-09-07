import { motion } from 'framer-motion'
import { Camera, Quote, Send } from 'lucide-react'
import { experiences, siteInfo } from '@/data'

export function Experiences() {
  return (
    <section id="experiencias" className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="text-sm font-semibold text-sea-600 dark:text-turquoise-300">
          Experiencias
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
          Lo que viven nuestros viajeros
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Fotos reales que nos comparten los clientes de CheTour en sus
          viajes. Esta sección se va a ir llenando con cada nueva aventura.
        </p>
      </motion.div>

      {experiences.length === 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-300 dark:border-neutral-800 dark:text-neutral-700"
            >
              <Camera className="h-6 w-6" />
              <span className="text-[11px] font-medium">Próximamente</span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {experiences.map((e, i) => (
            <motion.div
              key={e.travelerName + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img
                src={e.image}
                alt={`${e.travelerName} en ${e.destination}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/0" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                {e.quote && (
                  <p className="mb-1 flex items-start gap-1 text-xs leading-snug opacity-90">
                    <Quote className="h-3 w-3 shrink-0" />
                    {e.quote}
                  </p>
                )}
                <p className="text-xs font-semibold">
                  {e.travelerName} · {e.destination}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        href={`https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent('¡Hola! Quiero compartirles una foto de mi viaje 📸')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:scale-105 hover:bg-neutral-50 active:scale-95 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-900"
      >
        <Send className="h-4 w-4" />
        ¿Viajaste con nosotros? Mandanos tu foto
      </motion.a>
    </section>
  )
}
