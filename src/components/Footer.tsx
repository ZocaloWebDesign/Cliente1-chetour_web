import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AtSign, Mail, MessageCircle, Music2, Plane } from 'lucide-react'
import { siteInfo } from '@/data'
import { useHashScroll } from '@/hooks/use-hash-scroll'
import { COUNTRY_FLAGS } from '@/components/flag-icons'

const nav = [
  { href: '/#paquetes', label: 'Paquetes' },
  { href: '/#destinos', label: 'Destinos' },
  { href: '/#experiencias', label: 'Experiencias' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

const socials = [
  { href: `https://wa.me/${siteInfo.whatsapp}`, label: 'WhatsApp', Icon: MessageCircle },
  { href: `mailto:${siteInfo.email}`, label: 'Email', Icon: Mail },
  { href: siteInfo.instagram, label: 'Instagram', Icon: AtSign },
  { href: siteInfo.tiktok, label: 'TikTok', Icon: Music2 },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}

export function Footer() {
  const handleHashClick = useHashScroll()

  return (
    <footer
      id="contacto"
      className="w-full overflow-hidden border-t border-black/5 bg-background py-12 text-foreground dark:border-white/10"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        variants={containerVariants}
        className="mx-auto mb-12 flex max-w-6xl flex-col items-center gap-8 px-6"
      >
        {/* Isotipo */}
        <motion.a
          variants={itemVariants}
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          {/* Mismo isotipo que public/favicon.svg: cuadrado redondeado con
              degradé #153a5b -> turquoise-500 (no el círculo que usan Nav y
              este mismo footer antes — ese no es el logo real de la página). */}
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#153a5b] to-turquoise-500 text-white">
            <Plane className="h-4 w-4" />
          </span>
          {siteInfo.name}
        </motion.a>

        <motion.p
          variants={itemVariants}
          className="max-w-md text-center text-sm text-muted-foreground"
        >
          {siteInfo.tagline}. Viajes nacionales e internacionales.
        </motion.p>

        {/* Navegación con píldora animada al hover */}
        <motion.nav
          variants={itemVariants}
          className="relative z-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-base font-medium"
        >
          {nav.map((item) => {
            const pill = (
              <>
                <span className="relative z-10 text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {item.label}
                </span>
                <motion.span
                  className="absolute inset-0 -z-0 origin-center rounded-md bg-accent"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </>
            )
            return item.href.includes('#') ? (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleHashClick(e, item.href)}
                className="group relative px-2 py-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {pill}
              </motion.a>
            ) : (
              <motion.div
                key={item.href}
                className="group relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={item.href} className="relative block px-2 py-1">
                  {pill}
                </Link>
              </motion.div>
            )
          })}
        </motion.nav>

        {/* Países a los que viajamos: solo el círculo con la bandera, sin
            fondo ni nombre — se levanta al pasar el mouse, como los íconos
            de redes de abajo. */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2.5">
          {COUNTRY_FLAGS.map(({ name, Icon }) => (
            <motion.span
              key={name}
              aria-label={name}
              role="img"
              className="block h-9 w-9 shrink-0 overflow-hidden rounded-full brightness-90 transition-[filter] duration-200 hover:brightness-100 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Icon />
            </motion.span>
          ))}
        </motion.div>

        {/* Redes */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => {
            const external = href.startsWith('http')
            return (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-accent dark:border-white/15"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            )
          })}
        </motion.div>
      </motion.div>

      <motion.div
        className="mx-auto max-w-6xl px-6 text-center text-sm text-muted-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
      >
        <p>
          © {new Date().getFullYear()} {siteInfo.name}. Todos los derechos reservados.
        </p>
      </motion.div>
    </footer>
  )
}
