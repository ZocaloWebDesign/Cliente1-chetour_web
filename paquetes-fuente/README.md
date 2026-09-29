# Fichas HTML fuente

Acá van los HTML sueltos de cada paquete (el diseño que se arma aparte,
fuera de la landing) antes de "portarlos" a la SPA con
`node scripts/build-static-package-pages.mjs`. Ese script los lee de acá y
genera `src/pages/package-static/` (fragmento HTML + datos), que es lo que
realmente se sirve en `/paquetes/<slug>`.

**Por qué esta carpeta no se llama `paquetes`:** un directorio `paquetes/`
en la raíz del proyecto choca con la ruta de la SPA `/paquetes/:slug` — el
dev server de Vite sirve cualquier archivo estático que matchee (ej.
`paquetes/bariloche-aereo.html`) ANTES de llegar al fallback de React
Router, así que `npm run dev` en `/paquetes/bariloche-aereo` mostraría el
HTML suelto en vez de la página React. Server ya construido (`dist/`) no
tiene este problema porque esta carpeta no se copia al build, pero en
desarrollo sí. De ahí el sufijo `-fuente`: para agregar una ficha nueva,
el archivo va acá (no en `/paquetes`), y el slug lo define el nombre del
archivo sin `.html` (ej. `disney-a-medida.html` → `/paquetes/disney-a-medida`).

Después de agregar o editar un HTML acá, agregar su slug a `SLUGS` en
`scripts/build-static-package-pages.mjs` y correr:

```
node scripts/build-static-package-pages.mjs
```
