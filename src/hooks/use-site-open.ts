import { createContext, useContext } from 'react'

/**
 * `false` mientras la pantalla de carga (Loader) todavía tapa el sitio. El sitio
 * se monta debajo desde el principio para que three.js y las fotos terminen de
 * inicializarse antes del vuelo; los elementos con temporizador (el carrusel del
 * Hero) esperan a que esto pase a `true` para arrancar justo al abrirse.
 */
export const SiteOpenContext = createContext(true)

export function useSiteOpen() {
  return useContext(SiteOpenContext)
}
