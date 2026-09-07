// Banderas circulares (circle-flags, MIT) de los países a los que viaja CheTour.
// Se usan en el footer, sueltas dentro de un círculo con hover — sin fondo propio
// ni nombre visible (ver Footer.tsx).
import type { ComponentType } from 'react'

function FlagAr() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="ar-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#ar-a)"><path fill="#338af3" d="M0 0h512v144.7L488 256l24 111.3V512H0V367.3L26 256 0 144.7z"/><path fill="#eee" d="M0 144.7h512v222.6H0z"/><path fill="#ffda44" d="m332.4 256-31.2 14.7 16.7 30.3-34-6.5-4.2 34.3-23.7-25.2-23.6 25.2-4.3-34.3-34 6.5 16.6-30.3-31.2-14.7 31.3-14.7L194 211l34 6.5 4.3-34.3 23.6 25.2 23.6-25.2 4.4 34.3 34-6.5-16.7 30.3z"/></g>
    </svg>
  )
}

function FlagBr() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="br-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#br-a)"><path fill="#6da544" d="M0 0h512v512H0z"/><path fill="#ffda44" d="M256 100.2 467.5 256 256 411.8 44.5 256z"/><path fill="#eee" d="M174.2 221a87 87 0 0 0-7.2 36.3l162 49.8a88.5 88.5 0 0 0 14.4-34c-40.6-65.3-119.7-80.3-169.1-52z"/><path fill="#0052b4" d="M255.7 167a89 89 0 0 0-41.9 10.6 89 89 0 0 0-39.6 43.4 181.7 181.7 0 0 1 169.1 52.2 89 89 0 0 0-9-59.4 89 89 0 0 0-78.6-46.8zM212 250.5a149 149 0 0 0-45 6.8 89 89 0 0 0 10.5 40.9 89 89 0 0 0 120.6 36.2 89 89 0 0 0 30.7-27.3A151 151 0 0 0 212 250.5z"/></g>
    </svg>
  )
}

function FlagCl() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="cl-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#cl-a)"><path fill="#d80027" d="m0 256 254.5-51.3L512 256v256H0z"/><path fill="#0052b4" d="M0 0h256l52.7 132.8L256 256H0z"/><path fill="#eee" d="M256 0h256v256H256zM152.4 89l16.6 51h53.6l-43.4 31.6 16.6 51-43.4-31.5-43.4 31.5 16.6-51L82.2 140h53.6z"/></g>
    </svg>
  )
}

function FlagPe() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="pe-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#pe-a)"><path fill="#d80027" d="M0 0h167l86 41.2L345 0h167v512H345l-87.9-41.4L167 512H0z"/><path fill="#eee" d="M167 0h178v512H167z"/></g>
    </svg>
  )
}

function FlagBo() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="bo-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#bo-a)"><path fill="#ffda44" d="m0 167 252.9-29.3L512 167v178l-255.7 25.7L0 345z"/><path fill="#d80027" d="M0 0h512v167H0z"/><path fill="#6da544" d="M0 345h512v167H0z"/></g>
    </svg>
  )
}

function FlagUs() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="us-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#us-a)"><path fill="#eee" d="M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z"/><path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"/><path fill="#0052b4" d="M0 0h256v256H0Z"/><path fill="#eee" d="m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z"/></g>
    </svg>
  )
}

function FlagEs() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="es-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#es-a)"><path fill="#ffda44" d="m0 128 256-32 256 32v256l-256 32L0 384Z"/><path fill="#eee" d="M196 168q-11 1-15 11l-5-1q-15 1-16 16c-1 15 7 16 16 16q11 0 15-11a16 16 0 0 0 17-4 16 16 0 0 0 17 4 16 16 0 1 0 10-20 16 16 0 0 0-27-5q-4-6-12-6m0 8q8 1 8 8 0 8-8 8-7 0-8-8 1-7 8-8m24 0q8 1 8 8 0 8-8 8-7 0-8-8 1-7 8-8m-44 10 4 1 4 8q-1 7-8 7-9 0-8-8 1-7 8-8m64 0q8 1 8 8 0 8-8 8-7 0-8-7l4-8zm-112 38v80h16v-80zm80 0v40c-26 0-48 14-48 32s22 32 48 32 48-14 48-32v-72zm64 0v80h16v-80z"/><path fill="#ff9811" d="M200 160h16v32h-16z"/><path fill="#d80027" d="M0 0v128h512V0zm208 184c-22 0-40 11-40 24l8 8h64l8-8c0-13-18-24-40-24m-72 8a8 8 0 0 0-8 8v8a8 8 0 1 0 16 0v-8a8 8 0 0 0-8-8m144 0a8 8 0 0 0-8 8v8a8 8 0 1 0 16 0v-8a8 8 0 0 0-8-8m-120 32v24h-38a4 4 0 0 0-4 4 4 4 0 0 0 4 4h38v40a24 24 0 0 0 24 24 24 24 0 0 0 24-24 24 24 0 0 0 24 24 24 24 0 0 0 24-24v-24h-48v-48zm72 8a10 10 0 0 0-10 10v12a10 10 0 1 0 20 0v-12a10 10 0 0 0-10-10m24 16v8h38a4 4 0 0 0 4-4 4 4 0 0 0-4-4zm-134 24a4 4 0 0 0-4 4 4 4 0 0 0 4 4h28a4 4 0 0 0 4-4 4 4 0 0 0-4-4zm144 0a4 4 0 0 0-4 4 4 4 0 0 0 4 4h28a4 4 0 0 0 4-4 4 4 0 0 0-4-4zM0 384v128h512V384z"/><path fill="#ffda44" d="M186 196a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6m22 0a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6m22 0a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6"/><path fill="#ff9811" d="M128 208a8 8 0 1 0 0 16h16a8 8 0 1 0 0-16zm144 0a8 8 0 1 0 0 16h16a8 8 0 1 0 0-16zm-96 8v8h64v-8zm-8 16v8h8v16h-8v8h32v-8h-8v-16h8v-8zm-8 40v24q1 12 9 19v-43zm19 0v47h10v-47zm20 0v43q9-7 9-19v-24zm-71 32a8 8 0 1 0 0 16h16a8 8 0 1 0 0-16zm144 0a8 8 0 1 0 0 16h16a8 8 0 1 0 0-16z"/><path fill="#338af3" d="M208 256a16 16 0 0 0-16 16 16 16 0 0 0 16 16 16 16 0 0 0 16-16 16 16 0 0 0-16-16m-80 64a8 8 0 1 0 0 16h16a8 8 0 1 0 0-16zm144 0a8 8 0 1 0 0 16h16a8 8 0 1 0 0-16z"/></g>
    </svg>
  )
}

function FlagIt() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="it-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#it-a)"><path fill="#eee" d="M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z"/><path fill="#6da544" d="M0 0h167v512H0z"/><path fill="#d80027" d="M345 0h167v512H345z"/></g>
    </svg>
  )
}

function FlagGb() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="gb-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#gb-a)"><path fill="#eee" d="m0 0 8 22-8 23v23l32 54-32 54v32l32 48-32 48v32l32 54-32 54v68l22-8 23 8h23l54-32 54 32h32l48-32 48 32h32l54-32 54 32h68l-8-22 8-23v-23l-32-54 32-54v-32l-32-48 32-48v-32l-32-54 32-54V0l-22 8-23-8h-23l-54 32-54-32h-32l-48 32-48-32h-32l-54 32L68 0H0z"/><path fill="#0052b4" d="M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z"/><path fill="#d80027" d="M0 0v45l131 131h45L0 0zm208 0v208H0v96h208v208h96V304h208v-96H304V0h-96zm259 0L336 131v45L512 0h-45zM176 336 0 512h45l131-131v-45zm160 0 176 176v-45L381 336h-45z"/></g>
    </svg>
  )
}

function FlagEg() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="eg-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#eg-a)"><path fill="#eee" d="m0 144 256-32 256 32v224l-256 32L0 368Z"/><path fill="#d80027" d="M0 0h512v144H0Z"/><path fill="#333" d="M0 368h512v144H0Z"/><path fill="#ff9811" d="M250 191c-8 0-17 4-22 14 5-3 16-1 16 13 0 4-2 8-5 10-8 0-14-14-29-14-10 0-19 7-19 17v69l46-7-14 27h66l-14-27 46 7v-69c0-10-9-17-19-17-15 0-21 14-29 14 8-23-7-37-23-37z"/></g>
    </svg>
  )
}

function FlagAe() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="ae-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#ae-a)"><path fill="#a2001d" d="M0 0h167l52.3 252L167 512H0z"/><path fill="#eee" d="m167 167 170.8-44.6L512 167v178l-173.2 36.9L167 345z"/><path fill="#6da544" d="M167 0h345v167H167z"/><path fill="#333" d="M167 345h345v167H167z"/></g>
    </svg>
  )
}

function FlagZa() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <mask id="za-a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#za-a)"><path fill="#eee" d="m0 0 192 256L0 512h47l465-189v-34l-32-33 32-33v-34L47 0Z"/><path fill="#333" d="M0 142v228l140-114z"/><path fill="#ffda44" d="M192 256 0 95v47l114 114L0 370v47z"/><path fill="#6da544" d="M512 223H223L0 0v94l161 162L0 418v94l223-223h289z"/><path fill="#d80027" d="M512 0H47l189 189h276z"/><path fill="#0052b4" d="M512 512H47l189-189h276z"/></g>
    </svg>
  )
}

export const COUNTRY_FLAGS: { name: string; Icon: ComponentType }[] = [
  { name: 'Argentina', Icon: FlagAr },
  { name: 'Brasil', Icon: FlagBr },
  { name: 'Chile', Icon: FlagCl },
  { name: 'Perú', Icon: FlagPe },
  { name: 'Bolivia', Icon: FlagBo },
  { name: 'Estados Unidos', Icon: FlagUs },
  { name: 'España', Icon: FlagEs },
  { name: 'Italia', Icon: FlagIt },
  { name: 'Reino Unido', Icon: FlagGb },
  { name: 'Egipto', Icon: FlagEg },
  { name: 'Emiratos Árabes', Icon: FlagAe },
  { name: 'Sudáfrica', Icon: FlagZa },
]
