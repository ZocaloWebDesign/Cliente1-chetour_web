import type { PackageStaticEntry } from './manifest'

/** Mismo offset que useHashScroll, para que el header fijo no tape el ancla. */
const NAV_OFFSET = -88

type LenisLike = { scrollTo: (target: HTMLElement, opts?: { offset?: number }) => void } | null | undefined

function formatCurrency(value: number, prefix: string) {
  return prefix + value.toLocaleString('es-AR')
}

/**
 * Reimplementación del <script> vanilla que traían las fichas HTML sueltas
 * (paquetes/*.html): calculadora de precio, lightbox de fotos, reveal al
 * scrollear, scrollspy del sub-nav, "compartir viaje" y el avión animado.
 * El markup es el mismo (ver fragments/*.html); lo que cambia acá es que las
 * búsquedas de elementos quedan acotadas al contenedor de la página en vez
 * de `document` global, y las anclas internas (#itinerario, etc.) usan Lenis
 * en vez del salto nativo del navegador, igual que el resto del sitio (ver
 * useHashScroll) — si no, el scroll suave global pelea con el salto seco.
 *
 * Algunas fichas (ej. Canasvieiras Aéreo) tienen una variante más simple del
 * cotizador, sin total en pesos ("precio a consultar"): de ahí que cada
 * elemento se busque con cuidado de que pueda no existir.
 */
export function initPackageStaticPage(
  container: HTMLElement,
  data: PackageStaticEntry,
  lenis: LenisLike,
) {
  const cleanups: Array<() => void> = []
  const on = <K extends keyof WindowEventMap | string>(
    target: EventTarget,
    type: K,
    handler: EventListenerOrEventListenerObject,
    opts?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type as string, handler, opts)
    cleanups.push(() => target.removeEventListener(type as string, handler, opts))
  }
  const q = <T extends Element = Element>(selector: string) => container.querySelector<T>(selector)
  const qa = <T extends Element = Element>(selector: string) => Array.from(container.querySelectorAll<T>(selector))

  // ---------- 0. Alto real del header de la landing ----------
  // La ficha trae su propio --header-h (74px) pensado para SU header, que ya
  // no se usa — el real (<Nav/>) mide distinto (~60px sólido) y encima cambia
  // con el ancho de pantalla. Si no se sincroniza, el sub-nav sticky (que usa
  // --header-h como offset) y el padding-top de la página quedan mal
  // calculados y se ve un hueco entre el header y el contenido.
  const siteHeader = document.querySelector<HTMLElement>('.site-header')
  const syncHeaderHeight = () => {
    if (siteHeader) container.style.setProperty('--header-h', `${siteHeader.offsetHeight}px`)
  }
  syncHeaderHeight()
  let headerObserver: ResizeObserver | null = null
  if (siteHeader && 'ResizeObserver' in window) {
    headerObserver = new ResizeObserver(syncHeaderHeight)
    headerObserver.observe(siteHeader)
  }

  // ---------- 1. Cotizador dinámico & link de WhatsApp ----------
  let currentQty = data.initialQty
  const qtyDisplay = q('#qty-val')
  const calcQtyTxt = q('#calc-qty-txt')
  const calcTotalVal = q('#calc-total-val')
  const btnMinus = q('#btn-minus')
  const btnPlus = q('#btn-plus')
  const btnWhatsapp = q<HTMLAnchorElement>('#btn-whatsapp-cta')
  const mobileWhatsapp = q<HTMLAnchorElement>('#mobile-cta-btn')

  function updatePricing() {
    if (qtyDisplay) qtyDisplay.textContent = String(currentQty)
    const label = currentQty === 1 ? 'pasajero' : 'pasajeros'
    if (calcQtyTxt) calcQtyTxt.textContent = `${currentQty} ${label}`
    if (calcTotalVal && data.price !== null) {
      calcTotalVal.textContent = formatCurrency(currentQty * data.price, data.currencyPrefix)
    }

    const msg = encodeURIComponent(`Hola CheTour! Quiero consultar por ${data.waLabel} para ${currentQty} ${label}.`)
    const url = `https://wa.me/543564651568?text=${msg}`
    if (btnWhatsapp) btnWhatsapp.href = url
    if (mobileWhatsapp) mobileWhatsapp.href = url
  }

  if (btnMinus) {
    on(btnMinus, 'click', () => {
      if (currentQty > 1) {
        currentQty--
        updatePricing()
      }
    })
  }
  if (btnPlus) {
    on(btnPlus, 'click', () => {
      if (currentQty < 20) {
        currentQty++
        updatePricing()
      }
    })
  }
  updatePricing()

  // ---------- 2. Lightbox de fotos ----------
  let currentPhotoIdx = 0
  const lightbox = q('#lightbox')
  const lbImg = q<HTMLImageElement>('#lb-img')
  const lbCaption = q('#lb-caption')
  const lbCount = q('#lb-count')
  const lbClose = q('#lb-close')
  const lbPrev = q('#lb-prev')
  const lbNext = q('#lb-next')

  function renderLightboxPhoto() {
    const photo = data.photos[currentPhotoIdx]
    if (!photo || !lbImg) return
    lbImg.src = photo.src
    lbImg.alt = photo.caption
    if (lbCaption) lbCaption.textContent = photo.caption
    if (lbCount) lbCount.textContent = `${currentPhotoIdx + 1} / ${data.photos.length}`
  }

  function openLightbox(index: number) {
    currentPhotoIdx = index
    renderLightboxPhoto()
    lightbox?.classList.add('is-open')
    document.body.style.overflow = 'hidden'
  }

  function closeLightbox() {
    lightbox?.classList.remove('is-open')
    document.body.style.overflow = ''
  }

  function nextPhoto() {
    currentPhotoIdx = (currentPhotoIdx + 1) % data.photos.length
    renderLightboxPhoto()
  }

  function prevPhoto() {
    currentPhotoIdx = (currentPhotoIdx - 1 + data.photos.length) % data.photos.length
    renderLightboxPhoto()
  }

  if (lbClose) on(lbClose, 'click', closeLightbox)
  if (lbNext) {
    on(lbNext, 'click', (e) => {
      e.stopPropagation()
      nextPhoto()
    })
  }
  if (lbPrev) {
    on(lbPrev, 'click', (e) => {
      e.stopPropagation()
      prevPhoto()
    })
  }
  if (lightbox) {
    on(lightbox, 'click', (e) => {
      const target = e.target as HTMLElement
      if (
        target === lightbox ||
        target.classList.contains('lightbox-container') ||
        target.classList.contains('lightbox-stage')
      ) {
        closeLightbox()
      }
    })
  }
  const onKeydown = (e: Event) => {
    const ev = e as KeyboardEvent
    if (!lightbox?.classList.contains('is-open')) return
    if (ev.key === 'Escape') closeLightbox()
    if (ev.key === 'ArrowRight') nextPhoto()
    if (ev.key === 'ArrowLeft') prevPhoto()
  }
  on(document, 'keydown', onKeydown)

  // Las fichas originales llaman a estas dos funciones desde onclick="..."
  // embebido en el propio HTML (ver fragments/*.html), así que tienen que
  // quedar colgadas de window mientras la página está montada — igual que
  // en el sitio estático original, solo que acotado al ciclo de vida del
  // componente en vez de vivir en un <script> global.
  const win = window as unknown as { openLightbox?: typeof openLightbox; shareTrip?: () => void }
  win.openLightbox = openLightbox

  // ---------- 3. Reveal al scrollear ----------
  const reveals = qa('.reveal')
  let observer: IntersectionObserver | null = null
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    reveals.forEach((el) => observer?.observe(el))
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'))
  }

  // ---------- 4. Scrollspy del sub-nav + anclas internas vía Lenis ----------
  const subnavLinks = qa<HTMLAnchorElement>('.subnav-link')
  const sectionIds = ['itinerario', 'incluye', 'como-viajamos', 'faq', 'recomendados']
  const sections = sectionIds
    .map((id) => q<HTMLElement>(`#${id}`))
    .filter((el): el is HTMLElement => el !== null)

  const onScroll = () => {
    let current = ''
    const scrollPos = window.scrollY + 140
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollPos) current = sec.id
    })
    subnavLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
    })
  }
  on(window, 'scroll', onScroll, { passive: true })

  const onAnchorClick = (e: Event) => {
    const link = (e.target as HTMLElement).closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href')!.slice(1)
    const target = q<HTMLElement>(`#${id}`)
    if (!target) return
    e.preventDefault()
    if (lenis) lenis.scrollTo(target, { offset: NAV_OFFSET })
    else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  on(container, 'click', onAnchorClick)

  // ---------- 5. Compartir viaje ----------
  function shareTrip() {
    const shareUrl = window.location.href
    if (navigator.share) {
      navigator.share({ title: data.shareTitle, text: data.shareText, url: shareUrl }).catch(() => {})
    } else {
      const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${data.shareText} ${shareUrl}`)}`
      window.open(waShareUrl, '_blank', 'noopener,noreferrer')
    }
  }
  win.shareTrip = shareTrip

  // ---------- 6. Avión scroll-driven ----------
  const plane = q<HTMLElement>('#scrollPlane')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let ticking = false
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop
  let planeDirection: 'down' | 'up' = 'down'

  function updatePlane() {
    if (!plane) return
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    // Umbral chico para no invertir el rumbo por ruido de sub-píxel del scroll.
    const delta = scrollTop - lastScrollTop
    if (Math.abs(delta) > 2) {
      planeDirection = delta > 0 ? 'down' : 'up'
      lastScrollTop = scrollTop
    }
    const docH = document.documentElement.scrollHeight - window.innerHeight
    const progress = docH > 0 ? Math.min(scrollTop / docH, 1) : 0
    const headerH = parseInt(getComputedStyle(container).getPropertyValue('--header-h')) || 74
    const trackH = window.innerHeight - headerH - 40
    plane.style.top = `${progress * trackH}px`
    // El ícono trae el morro apuntando hacia abajo en su orientación natural (0°).
    plane.style.transform = `translateX(-50%) rotate(${planeDirection === 'down' ? 0 : 180}deg)`
    ticking = false
  }

  if (plane && !reducedMotion) {
    on(
      window,
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updatePlane)
          ticking = true
        }
      },
      { passive: true },
    )
    updatePlane()
  }

  return () => {
    cleanups.forEach((fn) => fn())
    observer?.disconnect()
    headerObserver?.disconnect()
    document.body.style.overflow = ''
    if (win.openLightbox === openLightbox) delete win.openLightbox
    if (win.shareTrip === shareTrip) delete win.shareTrip
  }
}
