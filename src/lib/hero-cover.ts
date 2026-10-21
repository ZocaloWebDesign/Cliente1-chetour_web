// Con el scroll en 0 el Hero (capa superpuesta, ver .hero-reveal__hero) tapa
// por completo la GlobeSection pinneada detrás. IntersectionObserver la sigue
// dando por "visible", así que el globo y el shader seguían renderizando a
// 60 fps sin que se vean, compitiendo por la GPU con las transiciones del hero.
export const heroCoversGlobe = () => window.scrollY < 2
