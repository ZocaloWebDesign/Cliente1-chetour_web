import { useState, type FormEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AtSign, Check, Clock, Globe, Mail, MessageCircle } from 'lucide-react'
import { siteInfo } from '@/data'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { WhatsappButton } from '@/components/WhatsappButton'

// Destinos agrupados para el <select>: reflejan el catálogo del globo 3D
// (globeCountryCards en data.ts), no el array `packages` — este último está
// vacío mientras se rehacen los paquetes, pero la agencia sigue ofreciendo
// estas salidas y el formulario no depende de esa tabla.
const DESTINOS: Record<string, string[]> = {
  Nacionales: [
    'Bariloche (aéreo)',
    'Cataratas del Iguazú (aéreo)',
    'Salta, Humahuaca y Cafayate',
    'Neuquén y Caviahue',
    'San Juan Bajo las Estrellas (bus)',
    'Talampaya, Laguna Brava y Valle de la Luna (bus)',
  ],
  Internacionales: [
    'Crucero por Fiordos y Glaciares Chilenos',
    'Europa al Máximo (Londres a Madrid)',
    'Europa Clásica (Costa Amalfitana y Toscana)',
    'Esencias Centroeuropeas',
    'Estados Unidos de Costa a Costa',
    'África Todo Incluido',
  ],
  'A medida': ['Sur de Brasil / Camboriú', 'Disney a medida', 'Otro destino', 'Todavía no lo sé'],
}

// Info durable por destino (duración + modalidad): a propósito sin precios,
// que se desactualizan rápido y ya se cotizan a medida por WhatsApp.
const DESTINO_INFO: Record<string, string> = {
  'Bariloche (aéreo)': '7 días / 6 noches · aéreo desde Córdoba · salidas todo el año',
  'Cataratas del Iguazú (aéreo)': '4 o 5 días · aéreo · varias salidas al mes',
  'Salta, Humahuaca y Cafayate': '5 días · aéreo · salida grupal con coordinación',
  'Neuquén y Caviahue': '5 días / 4 noches · aéreo desde Córdoba',
  'San Juan Bajo las Estrellas (bus)': '7 días · bus cama · turismo astronómico',
  'Talampaya, Laguna Brava y Valle de la Luna (bus)': '6 días · bus cama · La Rioja y San Juan',
  'Crucero por Fiordos y Glaciares Chilenos': 'travesía de 4 noches + El Calafate · aéreo',
  'Europa al Máximo (Londres a Madrid)': '21 días / 19 noches · circuito con guía',
  'Europa Clásica (Costa Amalfitana y Toscana)': '20 días · circuito con pensión completa',
  'Esencias Centroeuropeas': '14 noches · circuito con guía de habla hispana',
  'Estados Unidos de Costa a Costa': '19 días · San Francisco a Miami',
  'África Todo Incluido': '16 días · safari en Tanzania + Zanzíbar',
}

const CHANNELS = [
  {
    label: 'WhatsApp',
    big: null as string | null, // se resuelve con siteInfo más abajo
    note: 'El canal más rápido. Respondemos todos los días.',
    Icon: MessageCircle,
    accent: 'bg-[#25D366]',
  },
  {
    label: 'Email',
    big: null as string | null,
    note: 'Para propuestas detalladas y documentación. Respondemos dentro de las 24 h.',
    Icon: Mail,
    accent: 'bg-sea-600',
  },
  {
    label: 'Instagram',
    big: null as string | null,
    note: 'Salidas, promos y novedades cada semana.',
    Icon: AtSign,
    accent: 'bg-gradient-to-br from-turquoise-500 to-sea-600',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Contanos tu idea',
    copy: 'Destino, fechas aproximadas y con quién viajás. Si todavía no lo tenés claro, te ayudamos a elegir.',
  },
  {
    n: '02',
    title: 'Armamos tu propuesta',
    copy: 'Opciones a medida con precios, qué incluye cada una y planes de financiación en pesos o dólares.',
  },
  {
    n: '03',
    title: 'Reservás y viajás',
    copy: 'Coordinás la seña, recibís tu documentación y contás con acompañamiento antes y durante el viaje.',
  },
]

const FAQS = [
  {
    q: '¿Atienden de forma presencial?',
    a: 'No. La atención es 100% virtual: por WhatsApp, email e Instagram. Coordinamos todo el viaje a distancia, con la misma cercanía que en una oficina.',
  },
  {
    q: '¿Con qué agencias trabajan?',
    a: 'Operamos junto a Vedelago Viajes y otras agencias consolidadas del sector. Actuamos como tu intermediario de confianza para que viajes seguro y bien organizado.',
  },
  {
    q: '¿Qué medios de pago y financiación aceptan?',
    a: 'Depende de cada salida. Trabajamos con distintas opciones de financiación en pesos y en dólares; te las detallamos en la propuesta junto con el precio final.',
  },
  {
    q: '¿Puedo pedir un viaje que no está en la web?',
    a: 'Sí. Además de nuestras salidas grupales armamos viajes a medida —Camboriú, Disney, Caribe, Europa y más—. Escribinos con tu idea y lo diseñamos.',
  },
  {
    q: '¿Cómo reservo una salida grupal?',
    a: 'Escribinos por WhatsApp indicando la salida y la fecha elegida. Te confirmamos disponibilidad, el valor de la seña y los pasos para dejarla registrada.',
  },
]

type FormState = {
  nombre: string
  tel: string
  email: string
  destino: string
  viajeros: string
  fecha: string
  mensaje: string
  novedades: boolean
}

const EMPTY_FORM: FormState = {
  nombre: '',
  tel: '',
  email: '',
  destino: '',
  viajeros: '2',
  fecha: '',
  mensaje: '',
  novedades: false,
}

const REQUIRED_MESSAGES: Partial<Record<keyof FormState, string>> = {
  nombre: 'Decinos tu nombre y apellido.',
  tel: 'Necesitamos un teléfono o WhatsApp para responderte.',
  email: 'Escribí un email válido (ej. nombre@correo.com).',
  destino: 'Elegí un destino, o "Todavía no lo sé".',
}

function buildMessage(form: FormState) {
  const lines = ['Hola CheTour! Quiero hacer una consulta.', '']
  lines.push(`Nombre: ${form.nombre}`)
  lines.push(`Email: ${form.email}`)
  lines.push(`Tel/WhatsApp: ${form.tel}`)
  lines.push(`Destino: ${form.destino || 'A definir'}`)
  if (form.viajeros) lines.push(`Viajeros: ${form.viajeros}`)
  if (form.fecha) lines.push(`Mes tentativo: ${form.fecha}`)
  if (form.mensaje) lines.push('', `Mensaje: ${form.mensaje}`)
  if (form.novedades) lines.push('(Quiere recibir novedades por email)')
  return lines.join('\n')
}

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [sentUrl, setSentUrl] = useState<string | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.nombre.trim()) next.nombre = REQUIRED_MESSAGES.nombre
    if (!form.tel.trim()) next.tel = REQUIRED_MESSAGES.tel
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = REQUIRED_MESSAGES.email
    if (!form.destino) next.destino = REQUIRED_MESSAGES.destino
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const url = `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(buildMessage(form))}`
    window.open(url, '_blank', 'noopener')
    setSentUrl(url)
  }

  function handleEmail() {
    if (!validate()) return
    const subject = `Consulta de viaje — ${form.destino || 'a definir'}`
    window.location.href = `mailto:${siteInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(form))}`
  }

  const destinoInfo = DESTINO_INFO[form.destino]

  return (
    <div className="min-h-screen text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Nav />

      <main>
        {/* hero */}
        <section className="bg-twilight-950 pt-40 pb-20 sm:pt-48 sm:pb-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              Hablemos de tu <span className="font-semibold text-turquoise-300">próximo viaje</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-4 max-w-xl text-white/70"
            >
              Contanos a dónde querés ir y con quién. Armamos una propuesta a medida —con fechas y financiación— y te
              acompañamos hasta que volvés a casa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap justify-center gap-2.5"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Atención 100% virtual
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
                <Clock className="h-3 w-3" /> Respuesta el mismo día
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
                <Globe className="h-3 w-3" /> Viajes por el país y el mundo
              </span>
            </motion.div>
          </div>
        </section>

        {/* formulario + otras vías */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-2xl font-medium sm:text-3xl">
              Escribinos y <span className="font-semibold text-sea-600 dark:text-turquoise-300">te respondemos</span>
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">
              Completá lo que sepas: el resto lo definimos juntos por WhatsApp. Te contestamos el mismo día.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            {sentUrl ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-neutral-200 p-10 text-center dark:border-neutral-800">
                <h3 className="font-display text-xl font-medium">¡Listo! Te abrimos WhatsApp</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Si no se abrió solo, tocá el botón de abajo para continuar la conversación.
                </p>
                <a
                  href={sentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
                >
                  <MessageCircle className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                  Abrir WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nombre y apellido" required error={errors.nombre}>
                    <input
                      type="text"
                      autoComplete="name"
                      value={form.nombre}
                      onChange={(e) => update('nombre', e.target.value)}
                      className={inputClass(!!errors.nombre)}
                    />
                  </Field>
                  <Field label="Teléfono / WhatsApp" required error={errors.tel}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Ej. 351 555 1234"
                      value={form.tel}
                      onChange={(e) => update('tel', e.target.value)}
                      className={inputClass(!!errors.tel)}
                    />
                  </Field>
                </div>

                <Field label="Email" required error={errors.email}>
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputClass(!!errors.email)}
                  />
                </Field>

                <Field label="Destino de interés" required error={errors.destino}>
                  <select
                    value={form.destino}
                    onChange={(e) => update('destino', e.target.value)}
                    className={inputClass(!!errors.destino)}
                  >
                    <option value="" disabled>
                      Elegí un viaje o "Todavía no lo sé"
                    </option>
                    {Object.entries(DESTINOS).map(([group, options]) => (
                      <optgroup key={group} label={group}>
                        {options.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {destinoInfo && (
                    <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                      <strong className="font-medium text-neutral-700 dark:text-neutral-300">{form.destino}: </strong>
                      {destinoInfo}
                    </p>
                  )}
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Cantidad de viajeros">
                    <input
                      type="number"
                      min={1}
                      max={40}
                      inputMode="numeric"
                      value={form.viajeros}
                      onChange={(e) => update('viajeros', e.target.value)}
                      className={inputClass(false)}
                    />
                  </Field>
                  <Field label="Mes tentativo">
                    <input
                      type="month"
                      value={form.fecha}
                      onChange={(e) => update('fecha', e.target.value)}
                      className={inputClass(false)}
                    />
                  </Field>
                </div>

                <Field label="Tu mensaje">
                  <textarea
                    rows={4}
                    placeholder="Contanos fechas, presupuesto aproximado, si viajan chicos, dudas puntuales…"
                    value={form.mensaje}
                    onChange={(e) => update('mensaje', e.target.value)}
                    className={inputClass(false)}
                  />
                </Field>

                <label className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
                  <input
                    type="checkbox"
                    checked={form.novedades}
                    onChange={(e) => update('novedades', e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-sea-600 dark:border-neutral-700"
                  />
                  Quiero recibir novedades y promos de CheTour por email.
                </label>

                <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-95 sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                    Enviar consulta por WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleEmail}
                    className="text-sm font-medium text-sea-600 underline-offset-4 hover:underline dark:text-turquoise-300"
                  >
                    Prefiero enviarlo por email
                  </button>
                </div>

                <p className="text-xs text-neutral-400 dark:text-neutral-600">
                  Al enviar aceptás que CheTour Viajes use tus datos para responder tu consulta.
                </p>
              </form>
            )}

            <aside>
              <h3 className="font-display text-lg font-medium">Otras vías de contacto</h3>
              <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                Toda la gestión es virtual: elegí el canal que te quede más cómodo.
              </p>

              <div className="mt-6 space-y-3">
                {CHANNELS.map(({ label, note, Icon, accent }) => {
                  const href =
                    label === 'WhatsApp'
                      ? `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent('Hola CheTour! Quiero hacer una consulta sobre un viaje.')}`
                      : label === 'Email'
                        ? `mailto:${siteInfo.email}`
                        : siteInfo.instagram
                  const big = label === 'WhatsApp' ? siteInfo.whatsappDisplay : label === 'Email' ? siteInfo.email : '@chetourviajes'
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3.5 rounded-2xl border border-neutral-200 p-5 transition hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${accent}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wide text-neutral-400">{label}</span>
                        <span className="block text-sm font-semibold">{big}</span>
                        <span className="mt-0.5 block text-xs text-neutral-500 dark:text-neutral-400">{note}</span>
                      </span>
                    </a>
                  )
                })}
              </div>
            </aside>
          </div>
        </section>

        {/* 3 pasos */}
        <section className="bg-neutral-50 py-20 sm:py-24 dark:bg-neutral-900/40">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center font-display text-2xl font-medium sm:text-3xl">
              De la idea al viaje, <span className="font-semibold text-sea-600 dark:text-turquoise-300">en tres pasos</span>
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {STEPS.map((step) => (
                <div key={step.n}>
                  <span className="font-display text-3xl text-neutral-300 dark:text-neutral-700">{step.n}</span>
                  <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <h2 className="text-center font-display text-2xl font-medium sm:text-3xl">
            Antes de escribir, <span className="font-semibold text-sea-600 dark:text-turquoise-300">quizás esto ayude</span>
          </h2>
          <div className="mt-10 divide-y divide-neutral-200 dark:divide-neutral-800">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold marker:content-none">
                  {q}
                  <Check className="h-4 w-4 shrink-0 text-neutral-400 transition group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* cta final */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-[2.5rem] bg-sea-950 px-8 py-16 text-center sm:px-16">
            <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
              ¿Ya sabés a dónde <span className="font-semibold text-turquoise-300">querés ir</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-neutral-300">
              Escribinos y empezamos a planificarlo hoy. Te respondemos el mismo día.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent('Hola CheTour! Quiero planificar un viaje.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950"
              >
                Escribir por WhatsApp
              </a>
              <a
                href="/#paquetes"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver todos los viajes
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappButton />
    </div>
  )
}

function inputClass(hasError: boolean) {
  return [
    'w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition',
    'focus:border-sea-600 focus:ring-2 focus:ring-sea-600/20',
    'dark:bg-neutral-900 dark:text-neutral-100',
    hasError ? 'border-red-400' : 'border-neutral-200 dark:border-neutral-800',
  ].join(' ')
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  )
}
