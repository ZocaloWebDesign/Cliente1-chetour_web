import { useEffect, useMemo } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ReactLenis, useLenis } from 'lenis/react'
import { Home } from '@/pages/Home'
import { AllPackages } from '@/pages/AllPackages'
import { PackageDetail } from '@/pages/PackageDetail'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'
import { NAV_OFFSET } from '@/hooks/use-hash-scroll'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      // espera al primer render de la página destino antes de buscar el ancla
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        const target = document.getElementById(id)
        if (target && lenis) {
          lenis.scrollTo(target, { offset: NAV_OFFSET })
        } else {
          target?.scrollIntoView({ behavior: 'smooth' })
        }
      })
      return
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash, lenis])

  return null
}

function App() {
  // respeta la preferencia de menos movimiento: sin inercia en la rueda/touch
  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  return (
    <ReactLenis root options={{ smoothWheel: !prefersReducedMotion, syncTouch: !prefersReducedMotion }}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paquetes" element={<AllPackages />} />
          <Route path="/paquetes/:slug" element={<PackageDetail />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  )
}

export default App