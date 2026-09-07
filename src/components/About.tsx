import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import canasvieirasBus from '@/assets/packages/canasvieiras-bus.jpg'
import { siteInfo, values } from '@/data'

export function About() {
  return (
    <section id="nosotros" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <img
            src={canasvieirasBus}
            alt="Destino de viaje CheTour"
            className="aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
            className="absolute -bottom-6 -right-6 hidden max-w-[13rem] rounded-2xl bg-white p-4 shadow-xl sm:block dark:bg-neutral-900"
          >
            <div className="flex items-center gap-2 text-sea-600 dark:text-turquoise-300">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold">Agencia 100% virtual</span>
            </div>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Atención personalizada de punta a punta
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-sm font-semibold text-sea-600 dark:text-turquoise-300">
            ¿Quiénes somos?
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
            Una agencia joven, hecha por viajeros
          </h2>
          <p className="mt-5 text-neutral-600 dark:text-neutral-400">
            Somos una empresa de viajes joven y dinámica que opera de manera
            virtual, fundada por <strong className="text-neutral-900 dark:text-neutral-200">{siteInfo.founders}</strong>.
            Trabajamos en alianza con agencias consolidadas del sector,
            actuando como intermediarios de confianza para ofrecerte viajes
            seguros, accesibles y bien organizados.
          </p>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Creemos que viajar no es solo trasladarse a un destino, sino
            crear recuerdos, conocer personas y vivir experiencias que
            marcan para toda la vida.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
              >
                <p className="text-sm font-semibold text-neutral-950 dark:text-white">{v.title}</p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
