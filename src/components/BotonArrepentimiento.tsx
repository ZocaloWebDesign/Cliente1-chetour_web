// Botón de arrepentimiento (Disposición 954/2025): visible desde el primer acceso en todas
// las páginas y sin registro previo. A pedido del cliente es discreto (chico, sin color de
// alerta): un abogado debe validar si la norma exige que sea más destacado.
// Lleva a /arrepentimiento.html.
export function BotonArrepentimiento() {
  return (
    <a
      href="/arrepentimiento.html"
      className="fixed bottom-4 left-4 z-50 rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur outline-offset-4 transition-colors hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
    >
      Botón de arrepentimiento
    </a>
  )
}
