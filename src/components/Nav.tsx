import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteInfo } from '@/data'
import { useHashScroll } from '@/hooks/use-hash-scroll'

// Header portado del artefacto "CheTour Viajes": barra fija transparente
// sobre el hero que pasa a sólida al hacer scroll (.is-scrolled) y, en
// pantallas chicas, despliega el menú como panel (.is-open). Los estilos
// viven en index.css bajo .site-header*.

const links = [
  { href: '/#paquetes', label: 'Paquetes' },
  { href: '/#destinos', label: 'Destinos' },
  { href: '/#experiencias', label: 'Experiencias' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

/**
 * `forceSolid`: el header arranca transparente con texto claro, pensado
 * para flotar sobre un hero oscuro (así son todas las demás páginas). Las
 * páginas de paquete "ported" desde /paquetes no tienen ese hero — arrancan
 * con la ficha de producto sobre fondo claro — así que necesitan el header
 * ya "sólido" desde el primer frame, no recién al scrollear.
 */
export function Nav({ forceSolid = false }: { forceSolid?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(forceSolid)
  const [open, setOpen] = useState(false)
  const handleHashClick = useHashScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(forceSolid || window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [forceSolid])

  const headerClass = [
    'site-header',
    scrolled && 'is-scrolled',
    open && 'is-open',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
      <div className="site-header__inner">
        <a
          className="site-header__brand"
          href="/#top"
          aria-label="CheTour Viajes — inicio"
          onClick={(e) => handleHashClick(e, '/#top')}
        >
          <span className="site-header__mark" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          </span>
          <span>
            CheTour<span className="site-header__brand-accent">&nbsp;Viajes</span>
          </span>
        </a>

        <nav className="site-header__nav" aria-label="Principal">
          <ul id="site-header-nav">
            {links.map((l) =>
              l.href.includes('#') ? (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      setOpen(false)
                      handleHashClick(e, l.href)
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.href}>
                  <Link to={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-header-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span className="sr-only">Menú</span>
        </button>

        <a
          className="site-header__cta"
          href={`https://wa.me/${siteInfo.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Cotizar viaje
        </a>
      </div>
    </header>
  )
}
