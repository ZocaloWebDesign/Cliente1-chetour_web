// Con el scroll en 0 el Hero (capa superpuesta, ver .hero-reveal__hero) tapa
// por completo la GlobeSection pinneada detrás. IntersectionObserver la sigue
// dando por "visible", así que el globo y el shader seguían renderizando a
// 60 fps sin que se vean, compitiendo por la GPU con las transiciones del hero.
export const heroCoversGlobe = () => window.scrollY < 2

// Mientras el Hero sube (el primer viewport de scroll) el globo y el shader se
// van destapando de a poco y compiten con la animación del Hero por la GPU.
// En ese tramo se dibuja a la mitad de cuadros: no se nota bajo el Hero y la
// transición queda fluida; pasado el tramo vuelven a 60 fps.
export const heroIsLifting = () => window.scrollY < window.innerHeight
