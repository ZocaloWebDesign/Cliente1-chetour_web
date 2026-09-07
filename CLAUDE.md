# CheTour

Landing page de una agencia de viajes (paquetes a Bariloche, Camboriú, Cañasvieiras, Disney), estilo premium/editorial inspirado en apple.com: minimalismo, tipografía grande, mucho espacio en blanco, animaciones sutiles al scroll.

## Stack

- React 19 + TypeScript + Vite, routing con `react-router-dom` (rutas: `/` y `/paquetes/:slug`)
- Tailwind CSS v4 + shadcn (`style: base-nova`, base color `neutral`, ver `components.json`)
- `lenis` para smooth scroll (respeta `prefers-reduced-motion`), `framer-motion` para animaciones, `three` para el globo 3D (`GlobeSection.tsx`)
- Lint con `oxlint` (no ESLint). Comandos: `npm run dev`, `npm run build`, `npm run lint`

## Estructura

- `src/data.ts` — fuente única de los paquetes de viaje (tipo `TravelPackage`): destino, categoría, precio, galería, textos de la página de detalle, tema de color (`signature.theme`). Para agregar/editar un paquete, se edita acá.
- `src/components/` — secciones de la home (`Hero`, `Packages`, `Experiences`, `About`, `GlobeSection`, `Cta`, `Footer`, `Nav`) + `components/ui/` (shadcn)
- `src/pages/Home.tsx` y `src/pages/PackageDetail.tsx` — las dos páginas
- `src/assets/` — fotos reales por destino/paquete (`destinations/`, `packages/`, con subcarpetas `*-gallery/`)
- `docs/chats/` — exports en `.md` de conversaciones pasadas con Claude sobre este proyecto (contexto histórico, no código)

## Convenciones de diseño

- Paleta "de viaje" en `src/index.css` (`--color-sea-*`, `--color-turquoise-*`, `--color-gold-*`, `--color-twilight-*`, `--color-sand`, `--color-mist`), sacada de fotos reales de los destinos — no usar el gradiente índigo/violeta/cian genérico de shadcn.
- Tipografía: `--font-sans` es la pila nativa del sistema (San Francisco en Apple, Segoe UI en Windows, etc., no una fuente forzada); `--font-display` (Fraunces) solo para títulos puntuales en páginas de paquete.
- Cada paquete tiene una franja "signature" en su página de detalle: mismo layout (fichas con ícono sobre banda de color) para todos, solo cambia `theme`, textos e íconos.
- Comentarios en el código: en español, y solo donde el porqué no es obvio (ver ejemplos en `data.ts` e `index.css`).

## Estado actual

- No es un repo git todavía (no hay `.git`) — sin historial de commits ni control de versiones.
- `package.json` tiene `@playwright/test` como devDependency pero no hay `playwright.config` ni specs todavía — tests e2e sin configurar.
- Hay archivos sueltos en la raíz (`tmp-bus-*.png`, `tmp-bus.mjs`) que parecen scratch de un procesamiento de imágenes de paquetes en bus — revisar si siguen haciendo falta antes de borrarlos.
