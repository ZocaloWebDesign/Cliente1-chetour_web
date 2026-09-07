import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { siteInfo } from '@/data'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { WhatsappButton } from '@/components/WhatsappButton'
import planeWingSky from '@/assets/destinations/plane-wing-sky.jpg'

/** 404 genérica: cualquier ruta que no matchea nada en App.tsx cae acá. */
export function NotFound() {
  return (
    <div className="min-h-screen text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Nav />

      <main className="relative flex min-h-[calc(100vh-88px)] items-center justify-center overflow-hidden px-6 py-24">
        <img src={planeWingSky} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-twilight-950/50 via-twilight-950/40 to-twilight-950/85" />

        <div className="relative flex w-full max-w-2xl flex-col items-center gap-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-turquoise-300">Error 404</p>
          <h1 className="font-display text-6xl font-semibold tracking-tight text-white [text-shadow:0_4px_28px_rgb(0_0_0_/_0.35)] sm:text-7xl">
            404
          </h1>
          <h2 className="text-balance text-xl font-semibold text-white [text-shadow:0_2px_16px_rgb(0_0_0_/_0.3)] sm:text-2xl">
            Esta ruta no está en el mapa
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/85 [text-shadow:0_1px_10px_rgb(0_0_0_/_0.25)]">
            La página que buscás no existe o cambió de destino. Volvé al inicio y seguimos armando tu próximo viaje.
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-black/30 transition hover:bg-turquoise-300 hover:-translate-y-0.5"
            >
              Volver al inicio
            </Link>
            <a
              href={`https://wa.me/${siteInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/60 hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsappButton />
    </div>
  )
}
