import type { MouseEvent } from 'react'
import { useLenis } from 'lenis/react'

/** Deja libre el header fijo al aterrizar en un ancla. */
export const NAV_OFFSET = -88

/**
 * Maneja clicks en anclas tipo "/#seccion" o "#seccion": si ya estás en esa
 * página, hace scroll suave con Lenis en vez del salto seco por defecto del
 * navegador. Si la ancla apunta a otra página, no hace nada y deja navegar
 * normalmente.
 */
export function useHashScroll() {
  const lenis = useLenis()

  return (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf('#')
    if (hashIndex === -1 || !lenis) return

    const path = href.slice(0, hashIndex) || '/'
    if (path !== window.location.pathname) return

    const id = href.slice(hashIndex + 1)
    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    history.pushState(null, '', href)
    lenis.scrollTo(target, { offset: NAV_OFFSET })
  }
}
