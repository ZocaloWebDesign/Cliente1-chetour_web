// Genera el HTML estático de cada ruta a partir del build (dist/): abre cada
// página en un Chrome sin pantalla, espera a que React la dibuje y guarda el
// resultado. Así Google recibe el texto, el título y los datos estructurados en
// el HTML inicial, sin esperar a que corra JavaScript. También escribe
// sitemap.xml y robots.txt con la URL del sitio (src/seo.ts) y 404.html.
//
// Uso: se corre solo con `npm run build`. Si no encuentra Chrome, avisa y deja
// el build como estaba (el sitio sigue funcionando, solo sin la parte estática).
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain', '.woff2': 'font/woff2', '.woff': 'font/woff' }

// Rutas y SEO: se leen del código fuente compilado con esbuild (viene con vite).
const { build } = await import('vite').then((v) => ({ build: v.build }))
const tmp = path.join(ROOT, 'node_modules/.cache/prerender-seo.mjs')
await build({
  root: ROOT, logLevel: 'silent', configFile: false,
  resolve: { alias: { '@': path.join(ROOT, 'src') } },
  build: { write: true, outDir: path.dirname(tmp), emptyOutDir: false, minify: false, ssr: path.join(ROOT, 'src/seo.ts'), rollupOptions: { output: { entryFileNames: path.basename(tmp), format: 'es' } } },
  ssr: { noExternal: true },
})
const { getRouteSeo, staticPaths, SITE_URL } = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`)

async function chromePath() {
  const candidatos = [process.env.CHROME_PATH, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean)
  for (const c of candidatos) if (fs.existsSync(c)) return { executablePath: c, args: ['--no-sandbox'] }
  try { const chromium = (await import('@sparticuz/chromium')).default; return { executablePath: await chromium.executablePath(), args: chromium.args } } catch { return null }
}

const chrome = await chromePath()
if (!chrome) {
  // En el hosting (Vercel/CI) esto tiene que cortar el build: sin las páginas estáticas
  // y sin el rewrite, las rutas darían 404 y se publicaría una web rota.
  if (process.env.VERCEL || process.env.CI) { console.error('[prerender] No hay Chrome disponible en el build: se cancela.'); process.exit(1) }
  console.warn('[prerender] No hay Chrome disponible: se omite el HTML estático.'); process.exit(0)
}
const puppeteer = require('puppeteer-core')

// Servidor local con "fallback a index.html" solo para este paso.
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  let file = path.join(DIST, url)
  if (!file.startsWith(DIST)) { res.writeHead(403); return res.end() }
  const candidatos = [file, path.join(file, 'index.html')]
  let real = candidatos.find((p) => { try { return fs.statSync(p).isFile() } catch { return false } })
  if (!real || (path.basename(real) === 'index.html' && url !== '/' && fs.existsSync(path.join(DIST, '.spa-shell.html')) && !path.extname(url))) real = path.join(DIST, '.spa-shell.html')
  res.writeHead(200, { 'content-type': TIPOS[path.extname(real)] || 'application/octet-stream' })
  fs.createReadStream(real).pipe(res)
})
// El index.html del build es el "cascarón" que sirve de base para todas las rutas.
const shell = path.join(DIST, '.spa-shell.html')
fs.copyFileSync(path.join(DIST, 'index.html'), shell)
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const base = `http://127.0.0.1:${server.address().port}`

const browser = await puppeteer.launch({ headless: true, ...chrome })
const rutas = [...staticPaths, '/__404__']
let hechas = 0
for (const ruta of rutas) {
  const es404 = ruta === '/__404__'
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  // Sin pantalla de carga: ya la vio quien la vio; en el HTML estático no corresponde.
  await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem('ct-loader', '1') } catch {} })
  await page.goto(base + (es404 ? '/esta-pagina-no-existe' : ruta), { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('main h1, main h2', { timeout: 30000 }).catch(() => {})
  await new Promise((r) => setTimeout(r, 1500))
  const seo = getRouteSeo(es404 ? '/esta-pagina-no-existe' : ruta)
  const titulo = await page.title()
  if (titulo !== seo.title) console.warn(`[prerender] ${ruta}: título "${titulo}" no coincide con "${seo.title}"`)
  let html = await page.content()
  html = '<!DOCTYPE html>' + html.replace(/^<!DOCTYPE html>/i, '')
  const destino = es404 ? path.join(DIST, '404.html') : ruta === '/' ? path.join(DIST, 'index.html') : path.join(DIST, ruta, 'index.html')
  fs.mkdirSync(path.dirname(destino), { recursive: true })
  fs.writeFileSync(destino, html)
  hechas++
  await page.close()
}
await browser.close()
server.close()
fs.rmSync(shell, { force: true })

const hoy = new Date().toISOString().slice(0, 10)
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticPaths.map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${hoy}</lastmod></url>`).join('\n')}\n</urlset>\n`)
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log(`[prerender] ${hechas} páginas estáticas + sitemap.xml + robots.txt`)
