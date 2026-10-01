// Generado por scripts/build-static-package-pages.mjs — no editar a mano.
// Datos que el runtime de las fichas ported (src/pages/package-static/runtime.ts)
// necesita para la calculadora de precio, el lightbox y "compartir viaje".
// Volver a generar con: node scripts/build-static-package-pages.mjs

export type PackageStaticPhoto = { src: string; caption: string }

export type PackageStaticEntry = {
  slug: string
  title: string
  description: string
  price: number | null
  /** '$' (pesos, pegado al número) o 'USD ' (con espacio) — según formatCurrency() de la ficha original. */
  currencyPrefix: string
  initialQty: number
  waLabel: string
  shareText: string
  shareTitle: string
  photos: PackageStaticPhoto[]
}

export const packageStaticPages: Record<string, PackageStaticEntry> = {
  'africa-todo-incluido': {
    "slug": "africa-todo-incluido",
    "title": "África Todo Incluido — Safari en Tanzania y Zanzíbar | CheTour Viajes",
    "description": "África Todo Incluido: 16 días, salida 6 de julio. Safari por Tarangire, Serengeti y el Cráter de Ngorongoro, Santuario Serval y cierre All Inclusive en Zanzíbar. Todo incluido — aéreos, traslados, alojamiento, excursiones y pensión completa. USD 8.035 por persona en base doble.",
    "price": 8035,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "África Todo Incluido (Salida 6 de julio)",
    "shareText": "¡Mirá este viaje África Todo Incluido (safari + Zanzíbar) con CheTour Viajes!",
    "shareTitle": "África Todo Incluido — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/africa-1.jpg",
        "caption": "Safari en Tanzania: un león descansa junto al vehículo en plena sabana."
      },
      {
        "src": "/paquetes/img/africa-2.jpg",
        "caption": "Elefantes al paso del 4x4 en el Parque Nacional Tarangire."
      },
      {
        "src": "/paquetes/img/africa-3.jpg",
        "caption": "Zanzíbar: hotel All Inclusive frente a las playas de arena blanca del océano Índico."
      }
    ]
  },
  'bariloche-bus': {
    "slug": "bariloche-bus",
    "title": "Bariloche en Bus — 7 días, 4 fechas | CheTour Viajes",
    "description": "Bariloche en Bus: viaje en bus mix de 7 días, con alojamiento en hotel Cambria, desayuno y cena incluidos, y asistencia médica. 4 fechas fijas: 10 y 23 de marzo, 4 y 9 de abril. $429.000 por persona en base doble.",
    "price": 429000,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "Bariloche en Bus",
    "shareText": "¡Mirá este viaje a Bariloche en bus con CheTour Viajes!",
    "shareTitle": "Bariloche en Bus — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/bariloche-1.jpg",
        "caption": "El lago Nahuel Huapi y los cerros nevados, postal de San Carlos de Bariloche."
      },
      {
        "src": "/paquetes/img/bariloche-2.jpg",
        "caption": "Bahía de aguas turquesas y muelle entre el bosque andino patagónico."
      },
      {
        "src": "/paquetes/img/bariloche-3.jpg",
        "caption": "Vista aérea del laberinto de lagos y penínsulas boscosas de Bariloche."
      }
    ]
  },
  'bariloche-aereo': {
    "slug": "bariloche-aereo",
    "title": "Bariloche Aéreo — Escapada a la Patagonia desde Córdoba | CheTour Viajes",
    "description": "Bariloche Aéreo: escapada a San Carlos de Bariloche con vuelo desde Córdoba (Aerolíneas Argentinas), alojamiento con desayuno en hoteles Tierra Gaucha o Kenton, traslados in/out y asistencia médica. 6 salidas entre febrero y junio, 6 o 7 días. Desde $620.000 por persona en base doble.",
    "price": 620000,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "Bariloche Aéreo",
    "shareText": "¡Mirá esta escapada aérea a Bariloche con CheTour Viajes!",
    "shareTitle": "Bariloche Aéreo — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/bariloche-1.jpg",
        "caption": "El lago Nahuel Huapi y los cerros nevados, postal de San Carlos de Bariloche."
      },
      {
        "src": "/paquetes/img/bariloche-2.jpg",
        "caption": "Bahía de aguas turquesas y muelle entre el bosque andino patagónico."
      },
      {
        "src": "/paquetes/img/bariloche-3.jpg",
        "caption": "Vista aérea del laberinto de lagos y penínsulas boscosas de la región."
      }
    ]
  },
  'camboriu-bus': {
    "slug": "camboriu-bus",
    "title": "Camboriú en Bus — 10 días / 7 noches en el sur de Brasil | CheTour Viajes",
    "description": "Camboriú en Bus: 10 días y 7 noches en Balneário Camboriú, con salidas de diciembre de 2026 a abril de 2027. Bus semicama o cama, alojamiento en Hotel Sagres o Ilha da Madeira, desayuno y cena, coordinador en viaje y Assist Card. Desde USD 449 por persona en base doble.",
    "price": 449,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Camboriú en Bus",
    "shareText": "¡Mirá este viaje a Camboriú en bus con CheTour Viajes!",
    "shareTitle": "Camboriú en Bus — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/camboriu-1.jpg",
        "caption": "La Playa Central de Balneário Camboriú y su fila de rascacielos sobre el mar."
      },
      {
        "src": "/paquetes/img/camboriu-2.jpg",
        "caption": "La rueda gigante de Camboriú y el skyline iluminado al atardecer."
      },
      {
        "src": "/paquetes/img/camboriu-3.jpg",
        "caption": "Vista aérea de la bahía de Camboriú, entre el río y el Atlántico."
      }
    ]
  },
  'canasvieiras-aereo': {
    "slug": "canasvieiras-aereo",
    "title": "Canasvieiras Aéreo — 8 días / 7 noches en Florianópolis | CheTour Viajes",
    "description": "Canasvieiras Aéreo: 8 días y 7 noches en Canasvieiras, Florianópolis, con salidas de enero a marzo. Aéreo y traslados, alojamiento en el Hotel Canasvieiras Internacional, desayuno y cena, asistencia al viajero y coordinación. Precio a consultar según la fecha.",
    "price": null,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "Canasvieiras Aéreo",
    "shareText": "¡Mirá este viaje aéreo a Canasvieiras con CheTour Viajes!",
    "shareTitle": "Canasvieiras Aéreo — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/canasvieiras-1.jpg",
        "caption": "La playa de Canasvieiras, con sus sombrillas y el mar del norte de la isla."
      },
      {
        "src": "/paquetes/img/canasvieiras-2.jpg",
        "caption": "Vista aérea de una playa del norte de Florianópolis al atardecer."
      },
      {
        "src": "/paquetes/img/canasvieiras-3.jpg",
        "caption": "Playa de aguas turquesas entre rocas y vegetación en Florianópolis."
      }
    ]
  },
  'cataratas-del-iguazu-aereo': {
    "slug": "cataratas-del-iguazu-aereo",
    "title": "Cataratas del Iguazú Aéreo — Escapada a Puerto Iguazú | CheTour Viajes",
    "description": "Cataratas del Iguazú Aéreo: escapada de 4 o 5 días a Puerto Iguazú con vuelo de Aerolíneas Argentinas, alojamiento en Cadena Bagú o Complejo Americano, traslados in/out y excursiones a las Cataratas (sin entrada). 11 salidas entre enero y junio. $840.000 por persona en base doble.",
    "price": 840000,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "Cataratas del Iguazú Aéreo",
    "shareText": "¡Mirá esta escapada aérea a las Cataratas del Iguazú con CheTour Viajes!",
    "shareTitle": "Cataratas del Iguazú Aéreo — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/iguazu-1.jpg",
        "caption": "Panorámica de las Cataratas del Iguazú desde las pasarelas."
      },
      {
        "src": "/paquetes/img/iguazu-2.jpg",
        "caption": "Los saltos de agua entre la vegetación selvática de Iguazú."
      },
      {
        "src": "/paquetes/img/iguazu-3.jpg",
        "caption": "Las pasarelas sobre el río, frente a la cortina de agua."
      }
    ]
  },
  'crucero-fiordos-glaciares-chilenos': {
    "slug": "crucero-fiordos-glaciares-chilenos",
    "title": "Crucero por Fiordos y Glaciares Chilenos — Salida Grupal Aérea | CheTour Viajes",
    "description": "Crucero por los fiordos y glaciares chilenos: salida grupal 10 de abril, conectividad aérea. Travesía marítima de 4 noches entre glaciares (Amalia, El Brujo, Fiordo Calvo, Bernal y Herman) y navegación frente al Glaciar Perito Moreno en El Calafate. Todo incluido.",
    "price": 3790,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "el Crucero por Fiordos y Glaciares Chilenos (Salida 10 de abril)",
    "shareText": "¡Mirá este Crucero por Fiordos y Glaciares Chilenos con CheTour Viajes!",
    "shareTitle": "Crucero por Fiordos y Glaciares Chilenos — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/crucero-1.jpg",
        "caption": "Navegación entre los fiordos y canales patagónicos a bordo de un crucero de expedición."
      },
      {
        "src": "/paquetes/img/crucero-2.jpg",
        "caption": "Frente de glaciar y témpanos de hielo azul en los canales del sur."
      },
      {
        "src": "/paquetes/img/crucero-3.jpg",
        "caption": "Glaciar descendiendo entre montañas hacia los canales de la Patagonia chilena."
      }
    ]
  },
  'esencias-centroeuropeas': {
    "slug": "esencias-centroeuropeas",
    "title": "Esencias Centroeuropeas — Circuito de 14 noches | CheTour Viajes",
    "description": "Esencias Centroeuropeas: circuito de 14 noches por el corazón de Centroeuropa, salida 16 de junio. Vuelos por Air France / KLM vía Ámsterdam, hoteles turista / primera, guía acompañante de habla hispana, excursiones y entradas incluidas según programa y Assist Card 100K. USD 4.980 por persona en base doble.",
    "price": 4980,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Esencias Centroeuropeas (Salida 16 de junio)",
    "shareText": "¡Mirá este circuito Esencias Centroeuropeas con CheTour Viajes!",
    "shareTitle": "Esencias Centroeuropeas — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/centroeuropa-1.jpg",
        "caption": "Ámsterdam: los canales y las casas históricas al atardecer, puerta de entrada del circuito."
      },
      {
        "src": "/paquetes/img/centroeuropa-2.jpg",
        "caption": "Viena: la fachada curva de la Hofburg, el antiguo palacio imperial."
      },
      {
        "src": "/paquetes/img/centroeuropa-3.jpg",
        "caption": "Múnich: el casco antiguo y la torre de la Peterskirche desde las alturas."
      }
    ]
  },
  'estados-unidos-costa-a-costa': {
    "slug": "estados-unidos-costa-a-costa",
    "title": "Estados Unidos de Costa a Costa — 19 días con el Gran Cañón | CheTour Viajes",
    "description": "Estados Unidos de Costa a Costa: circuito todo incluido de 19 días, salida 29 de abril. San Francisco, Los Ángeles, Las Vegas, el Gran Cañón del Colorado (helicóptero, navegación y Skywalk), Washington D.C., Nueva York y Miami. Aéreos, alojamiento y pensión completa. USD 9.660 por persona en base doble.",
    "price": 9660,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Estados Unidos de Costa a Costa (Salida 29 de abril)",
    "shareText": "¡Mirá este circuito Estados Unidos de Costa a Costa con CheTour Viajes!",
    "shareTitle": "Estados Unidos de Costa a Costa — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/usa-1.jpg",
        "caption": "Gran Cañón del Colorado: sobrevuelo en helicóptero sobre los cañones."
      },
      {
        "src": "/paquetes/img/usa-2.jpg",
        "caption": "Nueva York: el Empire State y el skyline de Manhattan al atardecer."
      },
      {
        "src": "/paquetes/img/usa-3.jpg",
        "caption": "Skylines y rascacielos de las grandes ciudades de Estados Unidos."
      }
    ]
  },
  'europa-al-maximo-londres-madrid': {
    "slug": "europa-al-maximo-londres-madrid",
    "title": "Europa al Máximo, de Londres a Madrid — 21 días | CheTour Viajes",
    "description": "Europa al Máximo, de Londres a Madrid: circuito de 21 días y 19 noches por 11 ciudades — Londres, París, los Alpes, Roma, Florencia, Barcelona y Madrid. Salidas 16 de mayo y 19 de septiembre, aéreo desde Córdoba. Desde USD 5.112 por persona en base doble.",
    "price": 5112,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Europa al Máximo, de Londres a Madrid (21 días)",
    "shareText": "¡Mirá este circuito Europa al Máximo, de Londres a Madrid, con CheTour Viajes!",
    "shareTitle": "Europa al Máximo, de Londres a Madrid — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/europa-1.jpg",
        "caption": "Londres: el London Eye y el Támesis iluminados, punto de partida del circuito."
      },
      {
        "src": "/paquetes/img/europa-2.jpg",
        "caption": "París: los tejados de la ciudad y la Torre Eiffel al atardecer."
      },
      {
        "src": "/paquetes/img/europa-3.jpg",
        "caption": "Roma: el Coliseo iluminado, tres noches en la Ciudad Eterna."
      }
    ]
  },
  'europa-clasica-costa-amalfitana-toscana': {
    "slug": "europa-clasica-costa-amalfitana-toscana",
    "title": "Europa Clásica, con Costa Amalfitana y la Toscana — 20 días | CheTour Viajes",
    "description": "Europa Clásica, con Costa Amalfitana y la Toscana: circuito todo incluido de 20 días, salida 12 de octubre. Madrid, Toledo, Barcelona, Nápoles, Sorrento, Costa Amalfitana, Capri, Roma, la Toscana, Florencia, Venecia (góndola) y París (crucero por el Sena). Hoteles 4★, pensión completa. USD 9.525 por persona en base doble.",
    "price": 9525,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Europa Clásica, con Costa Amalfitana y la Toscana (Salida 12 de octubre)",
    "shareText": "¡Mirá este circuito Europa Clásica, con Costa Amalfitana y la Toscana, de CheTour Viajes!",
    "shareTitle": "Europa Clásica, con Costa Amalfitana y la Toscana — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/europaclasica-1.jpg",
        "caption": "La Costa Amalfitana: pueblos blancos sobre el mar turquesa, entre limoneros."
      },
      {
        "src": "/paquetes/img/europaclasica-2.jpg",
        "caption": "Positano, con sus casas de colores colgadas de la ladera sobre el mar."
      },
      {
        "src": "/paquetes/img/europaclasica-3.jpg",
        "caption": "Florencia: el Ponte Vecchio sobre el río Arno."
      }
    ]
  },
  'gramado-y-canela-con-torres-bus': {
    "slug": "gramado-y-canela-con-torres-bus",
    "title": "Gramado y Canela con Torres — Bus cama, 7 días | CheTour Viajes",
    "description": "Gramado y Canela con Torres: viaje en bus cama de última generación de 7 días, salida 30 de marzo. Alojamiento y media pensión en Gramado (Hotel Ski Gramado) y Torres (Hotel A Furninha), city tour de Gramado y Canela y visitas a la Fábrica de Chocolate, la Catedral de Pedra y el Parque Caracol. USD 670 por persona en base doble.",
    "price": 670,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Gramado y Canela con Torres (Salida 30 de marzo)",
    "shareText": "¡Mirá este viaje a Gramado y Canela con Torres, de CheTour Viajes!",
    "shareTitle": "Gramado y Canela con Torres — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/gramado-1.jpg",
        "caption": "La arquitectura alpina de Gramado, en la Serra Gaúcha."
      },
      {
        "src": "/paquetes/img/gramado-2.jpg",
        "caption": "La playa de Torres y sus formaciones rocosas sobre el mar."
      },
      {
        "src": "/paquetes/img/gramado-3.jpg",
        "caption": "Vista aérea de Torres, con la Torre Norte y el litoral de Río Grande do Sul."
      }
    ]
  },
  'neuquen-y-caviahue': {
    "slug": "neuquen-y-caviahue",
    "title": "Neuquén y Caviahue — Escapada Aérea con Termas de Copahue | CheTour Viajes",
    "description": "Neuquén y Caviahue: escapada aérea de 5 días / 4 noches, salida 1 de abril. Vuelo desde Córdoba con Flybondi, alojamiento con desayuno en Caviahue, traslados in/out y excursión con guía a las Termas de Copahue. Asistencia médica incluida. $990.000 por persona en base doble.",
    "price": 990000,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "Neuquén y Caviahue (Salida 1 de abril)",
    "shareText": "¡Mirá esta escapada a Neuquén y Caviahue con CheTour Viajes!",
    "shareTitle": "Neuquén y Caviahue — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/caviahue-1.jpg",
        "caption": "El lago Caviahue y el volcán Copahue nevado, con el pueblo de Caviahue a la orilla."
      },
      {
        "src": "/paquetes/img/caviahue-2.jpg",
        "caption": "El Salto del Agrio: cascada entre rocas rojizas, con un arcoíris al pie."
      },
      {
        "src": "/paquetes/img/caviahue-3.jpg",
        "caption": "Ríos de deshielo y bosque andino en los alrededores de Caviahue."
      }
    ]
  },
  'salta-humahuaca-cafayate': {
    "slug": "salta-humahuaca-cafayate",
    "title": "Salta, Humahuaca y Cafayate — Viaje Grupal Aéreo | CheTour Viajes",
    "description": "Salta, Humahuaca y Cafayate: 5 días, salida 3 de julio, conectividad aérea. Todo incluido — traslados IN/OUT, alojamiento, excursiones, pensión completa, asistencia al viajero y coordinación permanente.",
    "price": 1510000,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "el viaje a Salta, Humahuaca y Cafayate (Salida 3 de julio)",
    "shareText": "¡Mirá este viaje grupal a Salta, Humahuaca y Cafayate con CheTour Viajes!",
    "shareTitle": "Salta, Humahuaca y Cafayate — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/nqa-2.jpg",
        "caption": "Serranía del Hornocal: Cerro de los 14 colores en Humahuaca, Jujuy."
      },
      {
        "src": "/paquetes/img/nqa-3.jpg",
        "caption": "Formaciones de arenisca rojiza en la Quebrada de las Conchas, Cafayate."
      },
      {
        "src": "/paquetes/img/nqa-5.jpg",
        "caption": "Agujas minerales en la Quebrada de las Flechas sobre la mítica Ruta 40."
      },
      {
        "src": "/paquetes/img/nqa-6.jpg",
        "caption": "Los Castillos y cañones naturales camino a Cafayate."
      },
      {
        "src": "/paquetes/img/nqa-1.jpg",
        "caption": "Panorámica de los valles andinos y la arquitectura colonial."
      },
      {
        "src": "/paquetes/img/nqa-4.jpg",
        "caption": "Serranías y cielo despejado en el altiplano argentino."
      }
    ]
  },
  'san-juan-bajo-las-estrellas-bus': {
    "slug": "san-juan-bajo-las-estrellas-bus",
    "title": "San Juan Bajo las Estrellas — Astroturismo en Bus, 7 días | CheTour Viajes",
    "description": "San Juan Bajo las Estrellas: viaje en bus cama 5★ de 7 días, salida 16 de abril. Astroturismo en Pampa del Leoncito, Parque Nacional El Leoncito, Circuito del Sol (Rodeo y Pismanta), Ruta del Vino y Parque Nacional Sierra de las Quijadas. Todo incluido con pensión completa. $1.869.000 por persona en base doble.",
    "price": 1869000,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "San Juan Bajo las Estrellas (Salida 16 de abril)",
    "shareText": "¡Mirá este viaje San Juan Bajo las Estrellas con CheTour Viajes!",
    "shareTitle": "San Juan Bajo las Estrellas — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/sanjuan-1.jpg",
        "caption": "Trekking entre los cerros de colores de la precordillera de San Juan."
      },
      {
        "src": "/paquetes/img/sanjuan-2.jpg",
        "caption": "Panorámica del valle sanjuanino con la cordillera nevada al fondo."
      }
    ]
  },
  'san-juan-bajo-las-estrellas-aereo': {
    "slug": "san-juan-bajo-las-estrellas-aereo",
    "title": "San Juan Bajo las Estrellas Aéreo — Astroturismo, 6 días | CheTour Viajes",
    "description": "San Juan Bajo las Estrellas Aéreo: viaje con conectividad aérea de 6 días, salida 16 de abril. Astroturismo en Pampa del Leoncito, Parque Nacional El Leoncito, Circuito del Sol (Rodeo y Pismanta), Ruta del Vino y Parque Nacional Sierra de las Quijadas. Pensión completa incluida. $1.869.000 por persona en base doble + aéreos.",
    "price": 1869000,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "San Juan Bajo las Estrellas Aéreo (Salida 16 de abril)",
    "shareText": "¡Mirá este viaje San Juan Bajo las Estrellas Aéreo con CheTour Viajes!",
    "shareTitle": "San Juan Bajo las Estrellas Aéreo — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/sanjuan-1.jpg",
        "caption": "Trekking entre los cerros de colores de la precordillera de San Juan."
      },
      {
        "src": "/paquetes/img/sanjuan-2.jpg",
        "caption": "Panorámica del valle sanjuanino con la cordillera nevada al fondo."
      }
    ]
  },
  'talampaya-con-luna-llena-laguna-brava-y-valle-de-la-luna-bus': {
    "slug": "talampaya-con-luna-llena-laguna-brava-y-valle-de-la-luna-bus",
    "title": "Talampaya con Luna Llena, Laguna Brava y Valle de la Luna — Bus, 6 días | CheTour Viajes",
    "description": "Talampaya con Luna Llena, Laguna Brava y Valle de la Luna: viaje grupal en bus cama 5★ de 6 días, salida 29 de abril. Valle de la Luna, el Cañón de Talampaya bajo la luna llena y Laguna Brava en la cordillera de los Andes. Todo incluido con pensión completa. $1.625.000 por persona en base doble.",
    "price": 1625000,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "Talampaya con Luna Llena, Laguna Brava y Valle de la Luna (Salida 29 de abril)",
    "shareText": "¡Mirá este viaje a Talampaya con Luna Llena, Laguna Brava y Valle de la Luna, con CheTour Viajes!",
    "shareTitle": "Talampaya con Luna Llena, Laguna Brava y Valle de la Luna — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/talampaya-1.jpg",
        "caption": "Los grandes paredones rojizos del Cañón de Talampaya."
      },
      {
        "src": "/paquetes/img/talampaya-2.jpg",
        "caption": "Los cerros de arcilla de colores del Valle de la Luna."
      },
      {
        "src": "/paquetes/img/talampaya-3.jpg",
        "caption": "Laguna Brava, con flamencos y la cordillera de los Andes al fondo."
      }
    ]
  },
  'talampaya-con-luna-llena-laguna-brava-y-valle-de-la-luna-aereo': {
    "slug": "talampaya-con-luna-llena-laguna-brava-y-valle-de-la-luna-aereo",
    "title": "Talampaya con Luna Llena, Laguna Brava y Valle de la Luna Aéreo — 5 días | CheTour Viajes",
    "description": "Talampaya con Luna Llena, Laguna Brava y Valle de la Luna Aéreo: viaje grupal con conectividad aérea de 5 días, salida 29 de abril. Valle de la Luna, el Cañón de Talampaya bajo la luna llena y Laguna Brava en la cordillera de los Andes. Pensión completa incluida. $1.625.000 por persona en base doble + aéreos.",
    "price": 1625000,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "Talampaya con Luna Llena, Laguna Brava y Valle de la Luna Aéreo (Salida 29 de abril)",
    "shareText": "¡Mirá este viaje a Talampaya con Luna Llena, Laguna Brava y Valle de la Luna Aéreo, con CheTour Viajes!",
    "shareTitle": "Talampaya con Luna Llena, Laguna Brava y Valle de la Luna Aéreo — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/talampaya-1.jpg",
        "caption": "Los grandes paredones rojizos del Cañón de Talampaya."
      },
      {
        "src": "/paquetes/img/talampaya-2.jpg",
        "caption": "Los cerros de arcilla de colores del Valle de la Luna."
      },
      {
        "src": "/paquetes/img/talampaya-3.jpg",
        "caption": "Laguna Brava, con flamencos y la cordillera de los Andes al fondo."
      }
    ]
  },
  'ushuaia-y-calafate': {
    "slug": "ushuaia-y-calafate",
    "title": "Ushuaia y Calafate — Aéreo desde Córdoba, 7 u 8 días | CheTour Viajes",
    "description": "Ushuaia y Calafate: salida aérea desde Córdoba de 7 u 8 días, con fechas de enero a marzo. Vuelo con Aerolíneas Argentinas, alojamiento con desayuno, traslados in/out y excursiones al Parque Nacional Tierra del Fuego y al Parque Nacional Los Glaciares (sin entradas). Desde $1.375.000 por persona en base doble.",
    "price": 1375000,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "Ushuaia y Calafate",
    "shareText": "¡Mirá este viaje a Ushuaia y Calafate con CheTour Viajes!",
    "shareTitle": "Ushuaia y Calafate — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/ushuaia-1.jpg",
        "caption": "El frente del Glaciar Perito Moreno, en el Parque Nacional Los Glaciares."
      },
      {
        "src": "/paquetes/img/ushuaia-2.jpg",
        "caption": "El faro Les Éclaireurs en el Canal Beagle, cerca de Ushuaia."
      },
      {
        "src": "/paquetes/img/ushuaia-3.jpg",
        "caption": "Glaciares y témpanos entre las montañas de la Patagonia austral."
      }
    ]
  },
  'peru-aereo': {
    "slug": "peru-aereo",
    "title": "Perú — Cusco, Valle Sagrado y Machu Picchu | CheTour Viajes",
    "description": "Perú: 8 días / 7 noches con conectividad aérea, salida 13 de abril. Lima, Cusco, el Valle Sagrado de los Incas y Machu Picchu, con alojamiento, desayuno y media pensión según programa, traslados en destino, excursiones, asistencia médica y coordinación permanente. USD 1.391 por persona en base doble.",
    "price": 1391,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Perú (Salida 13 de abril)",
    "shareText": "¡Mirá este viaje a Perú con CheTour Viajes!",
    "shareTitle": "Perú — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/peru-1.webp",
        "caption": "La ciudadela inca de Machu Picchu, con una llama entre las terrazas."
      },
      {
        "src": "/paquetes/img/peru-5.webp",
        "caption": "La Plaza de Armas y la Catedral de Cusco, vistas desde los techos del centro histórico."
      },
      {
        "src": "/paquetes/img/peru-6.webp",
        "caption": "Los andenes circulares de Moray, en el Valle Sagrado de los Incas."
      },
      {
        "src": "/paquetes/img/peru-4.webp",
        "caption": "El Palacio de Gobierno, en la Plaza de Armas de Lima."
      },
      {
        "src": "/paquetes/img/peru-3.webp",
        "caption": "El pueblo y las terrazas incas de Ollantaytambo, en el Valle Sagrado."
      },
      {
        "src": "/paquetes/img/peru-2.webp",
        "caption": "Otra vista de la ciudadela de Machu Picchu, entre las montañas de los Andes."
      }
    ]
  },
  'peru-y-bolivia-bus': {
    "slug": "peru-y-bolivia-bus",
    "title": "Perú y Bolivia — Bus cama, 17 días | CheTour Viajes",
    "description": "Perú y Bolivia: circuito de 17 días en bus cama por el norte argentino, Bolivia y Perú, con 6 salidas entre abril y noviembre. Alojamiento, media pensión, excursiones (Purmamarca, Arequipa, el Lago Titicaca y Cusco con sus 4 Ruinas), asistencia al viajero y coordinación permanente. USD 1.699 por persona en base doble.",
    "price": 1699,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Perú y Bolivia",
    "shareText": "¡Mirá este viaje a Perú y Bolivia con CheTour Viajes!",
    "shareTitle": "Perú y Bolivia — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/peru-bolivia-3.jpg",
        "caption": "El Lago Titicaca, el lago navegable más alto del mundo, entre Bolivia y Perú."
      },
      {
        "src": "/paquetes/img/peru-bolivia-6.jpg",
        "caption": "La Plaza de Armas de Cusco, vista desde lo alto."
      },
      {
        "src": "/paquetes/img/peru-bolivia-5.jpg",
        "caption": "El Cerro de los Siete Colores, en Purmamarca."
      },
      {
        "src": "/paquetes/img/peru-bolivia-2.jpg",
        "caption": "Arequipa, la Ciudad Blanca, con el volcán Misti de fondo."
      },
      {
        "src": "/paquetes/img/peru-bolivia-4.jpg",
        "caption": "Sacsayhuamán, una de las 4 Ruinas incas cerca de Cusco."
      },
      {
        "src": "/paquetes/img/peru-bolivia-1.webp",
        "caption": "Los cerros multicolores del norte argentino, camino al circuito."
      }
    ]
  },
  'quatro-ilhas': {
    "slug": "quatro-ilhas",
    "title": "Quatro Ilhas — Bombinhas en Bus, 10 días | CheTour Viajes",
    "description": "Quatro Ilhas: 10 días y 7 noches en la zona de Quatro Ilhas, Bombinhas, con salidas todo el año. Bus mix última generación (semicama o cama), traslados in/out, desayuno, coordinador en viaje y asistencia al viajero. USD 299 por persona en base doble.",
    "price": 299,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Quatro Ilhas",
    "shareText": "¡Mirá este viaje a Quatro Ilhas con CheTour Viajes!",
    "shareTitle": "Quatro Ilhas — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/quatro-ilhas-1.jpg",
        "caption": "La Praia de Quatro Ilhas, con arena blanca y mar cristalino entre morros verdes."
      },
      {
        "src": "/paquetes/img/quatro-ilhas-2.jpg",
        "caption": "Vista aérea de Quatro Ilhas, en Bombinhas."
      },
      {
        "src": "/paquetes/img/quatro-ilhas-3.jpg",
        "caption": "Los morros verdes que enmarcan la playa de Quatro Ilhas."
      },
      {
        "src": "/paquetes/img/quatro-ilhas-4.jpg",
        "caption": "El mar transparente de Quatro Ilhas, ideal para esnórquel y buceo."
      },
      {
        "src": "/paquetes/img/quatro-ilhas-5.jpg",
        "caption": "Bombinhas, con sus playas escondidas entre la vegetación."
      },
      {
        "src": "/paquetes/img/quatro-ilhas-6.jpg",
        "caption": "Atardecer en una de las playas de Bombinhas."
      }
    ]
  },
  'disney-a-medida': {
    "slug": "disney-a-medida",
    "title": "Disney a Medida — Walt Disney World 100% personalizado | CheTour Viajes",
    "description": "Disney a Medida: tu viaje a Walt Disney World armado 100% a tu gusto — elegís fechas, duración, hotel (dentro o fuera del complejo Disney) y parques. Incluye traslados en destino, entradas a los parques, asistencia al viajero y coordinación con asesoramiento personalizado; los aéreos se suman de forma opcional. Cotización personalizada según fechas y servicios elegidos.",
    "price": null,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Disney a Medida",
    "shareText": "¡Mirá este viaje a Walt Disney World armado a tu medida, con CheTour Viajes!",
    "shareTitle": "Disney a Medida — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/disney-1.jpg",
        "caption": "El castillo de Cenicienta en Magic Kingdom, Walt Disney World."
      },
      {
        "src": "/paquetes/img/disney-2.jpg",
        "caption": "La esfera de Epcot en Walt Disney World."
      },
      {
        "src": "/paquetes/img/disney-3.jpg",
        "caption": "Fuegos artificiales sobre el castillo de Magic Kingdom."
      },
      {
        "src": "/paquetes/img/disney-4.jpg",
        "caption": "Hollywood Studios, uno de los cuatro parques de Walt Disney World."
      },
      {
        "src": "/paquetes/img/disney-5.jpg",
        "caption": "Animal Kingdom, el parque temático dedicado a la naturaleza y los animales."
      },
      {
        "src": "/paquetes/img/disney-6.jpg",
        "caption": "Uno de los resorts temáticos dentro del complejo Walt Disney World."
      }
    ]
  },
  'ingleses-aereo': {
    "slug": "ingleses-aereo",
    "title": "Ingleses Aéreo, 8 días | CheTour Viajes",
    "description": "Ingleses Aéreo: 8 días y 7 noches en Ingleses, una de las playas más extensas del norte de Florianópolis. Aéreo desde Córdoba, traslados in/out, desayuno, carry 12Kg, coordinador en viaje y asistencia al viajero. Salidas todo el año: enero USD 1.575, febrero USD 1.470, marzo USD 1.315, por persona en base doble.",
    "price": 1315,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Ingleses Aéreo",
    "shareText": "¡Mirá este viaje aéreo a Ingleses con CheTour Viajes!",
    "shareTitle": "Ingleses Aéreo — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/ingleses-1.jpg",
        "caption": "La Praia dos Ingleses, una de las playas más extensas del norte de Florianópolis."
      },
      {
        "src": "/paquetes/img/ingleses-2.jpg",
        "caption": "Vista aérea de la Praia dos Ingleses, en Florianópolis."
      },
      {
        "src": "/paquetes/img/ingleses-3.jpg",
        "caption": "Las dunas de arena junto a la Praia dos Ingleses."
      }
    ]
  },
  'bombinhas-aereo': {
    "slug": "bombinhas-aereo",
    "title": "Bombinhas Aéreo, 8 días | CheTour Viajes",
    "description": "Bombinhas Aéreo: 8 días y 7 noches en Bombinhas, Santa Catarina, con aguas cristalinas ideales para el buceo. Aéreo desde Córdoba, traslados in/out, desayuno, carry 12Kg, coordinador en viaje y asistencia al viajero. Salidas todo el año: enero USD 1.420, febrero USD 1.240, marzo USD 1.045, por persona en base doble.",
    "price": 1045,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Bombinhas Aéreo",
    "shareText": "¡Mirá este viaje aéreo a Bombinhas con CheTour Viajes!",
    "shareTitle": "Bombinhas Aéreo — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/bombinhas-1.jpg",
        "caption": "Aguas cristalinas de Bombinhas, ideales para el buceo en Santa Catarina."
      },
      {
        "src": "/paquetes/img/bombinhas-2.jpg",
        "caption": "Vista aérea de las playas de Bombinhas, en Santa Catarina."
      },
      {
        "src": "/paquetes/img/bombinhas-3.jpg",
        "caption": "Buceo entre las aguas transparentes de Bombinhas."
      }
    ]
  },
  'bombinhas-bus': {
    "slug": "bombinhas-bus",
    "title": "Bombinhas en Bus, 10 días | CheTour Viajes",
    "description": "Bombinhas: 10 días y 7 noches en Bombinhas, Santa Catarina, con aguas cristalinas ideales para el buceo. Bus mix última generación (semicama o cama), traslados in/out, desayuno, coordinador en viaje y asistencia al viajero. 4 fechas fijas en abril. USD 749 por persona en base doble.",
    "price": 749,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Bombinhas",
    "shareText": "¡Mirá este viaje a Bombinhas con CheTour Viajes!",
    "shareTitle": "Bombinhas — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/bombinhas-1.jpg",
        "caption": "Aguas cristalinas de Bombinhas, ideales para el buceo en Santa Catarina."
      },
      {
        "src": "/paquetes/img/bombinhas-2.jpg",
        "caption": "Vista aérea de las playas de Bombinhas, en Santa Catarina."
      },
      {
        "src": "/paquetes/img/bombinhas-3.jpg",
        "caption": "Buceo entre las aguas transparentes de Bombinhas."
      }
    ]
  },
  'bombas-bus': {
    "slug": "bombas-bus",
    "title": "Bombas — Bombinhas en Bus, 10 días | CheTour Viajes",
    "description": "Bombas: 10 días y 7 noches en la Praia de Bombas, junto a Bombinhas, con salidas todo el año. Bus mix última generación (semicama o cama), traslados in/out, desayuno, coordinador en viaje y asistencia al viajero. USD 699 por persona en base doble.",
    "price": 699,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Bombas",
    "shareText": "¡Mirá este viaje a Bombas con CheTour Viajes!",
    "shareTitle": "Bombas — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/bombas-1.jpg",
        "caption": "La Praia de Bombas, una playa tranquila junto a Bombinhas."
      },
      {
        "src": "/paquetes/img/bombas-2.jpg",
        "caption": "Vista aérea de la Praia de Bombas, en Santa Catarina."
      },
      {
        "src": "/paquetes/img/bombas-3.jpg",
        "caption": "El mar tranquilo de Bombas, junto a Bombinhas."
      },
      {
        "src": "/paquetes/img/bombas-4.jpg",
        "caption": "Atardecer en la Praia de Bombas."
      },
      {
        "src": "/paquetes/img/bombas-5.jpg",
        "caption": "La costa de Bombas, entre Bombinhas y Itajaí."
      },
      {
        "src": "/paquetes/img/bombas-6.jpg",
        "caption": "Una tarde tranquila en la Praia de Bombas."
      }
    ]
  },
  'camboriu-aereo': {
    "slug": "camboriu-aereo",
    "title": "Camboriú Aéreo — Balneário Camboriú, 8 días | CheTour Viajes",
    "description": "Camboriú Aéreo: 8 días y 7 noches en Balneário Camboriú, con salidas de enero a marzo. Aéreo y traslados, alojamiento en el Hotel Sagres, desayuno y cena, asistencia al viajero y coordinación. Precio a consultar según la fecha.",
    "price": null,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Camboriú Aéreo",
    "shareText": "¡Mirá este viaje aéreo a Camboriú con CheTour Viajes!",
    "shareTitle": "Camboriú Aéreo — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/camboriu-1.jpg",
        "caption": "La Playa Central de Balneário Camboriú y su fila de rascacielos sobre el mar."
      },
      {
        "src": "/paquetes/img/camboriu-2.jpg",
        "caption": "La rueda gigante de Camboriú y el skyline iluminado al atardecer."
      },
      {
        "src": "/paquetes/img/camboriu-3.jpg",
        "caption": "Vista aérea de la bahía de Camboriú, entre el río y el Atlántico."
      }
    ]
  },
  'canasvieiras-bus': {
    "slug": "canasvieiras-bus",
    "title": "Canasvieiras en Bus — Florianópolis, 10 días | CheTour Viajes",
    "description": "Canasvieiras en Bus: 10 días y 7 noches en Canasvieiras, Florianópolis, con salidas de diciembre de 2026 a abril de 2027. Bus semicama o cama, alojamiento en el Hotel Canasvieiras Internacional, desayuno y cena, coordinador en viaje y Assist Card. Desde USD 549 por persona en base doble.",
    "price": 549,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Canasvieiras en Bus",
    "shareText": "¡Mirá este viaje a Canasvieiras en bus con CheTour Viajes!",
    "shareTitle": "Canasvieiras en Bus — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/canasvieiras-1.jpg",
        "caption": "La playa de Canasvieiras, con sus sombrillas y el mar del norte de la isla."
      },
      {
        "src": "/paquetes/img/canasvieiras-2.jpg",
        "caption": "Vista aérea de una playa del norte de Florianópolis al atardecer."
      },
      {
        "src": "/paquetes/img/canasvieiras-3.jpg",
        "caption": "Playa de aguas turquesas entre rocas y vegetación en Florianópolis."
      }
    ]
  },
  'cataratas-del-iguazu-bus': {
    "slug": "cataratas-del-iguazu-bus",
    "title": "Cataratas del Iguazú en Bus — San Ignacio y Wanda, 7 días | CheTour Viajes",
    "description": "Cataratas del Iguazú en Bus: 7 días y 4 noches por Misiones, con 17 fechas entre marzo y junio. Bus mix, alojamiento con media pensión, excursiones a las Ruinas de San Ignacio, las Minas de Wanda y ambos lados de las Cataratas, asistencia médica y coordinación permanente. $399.900 por persona en base doble.",
    "price": 399900,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "Cataratas del Iguazú en Bus",
    "shareText": "¡Mirá este viaje a las Cataratas del Iguazú en bus con CheTour Viajes!",
    "shareTitle": "Cataratas del Iguazú en Bus — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/iguazu-1.jpg",
        "caption": "Panorámica de las Cataratas del Iguazú desde las pasarelas."
      },
      {
        "src": "/paquetes/img/iguazu-2.jpg",
        "caption": "Saltos de agua entre la vegetación selvática de Iguazú."
      },
      {
        "src": "/paquetes/img/iguazu-3.jpg",
        "caption": "Pasarelas sobre el río frente a la cortina de agua de las Cataratas."
      }
    ]
  },
  'nueva-york-y-miami': {
    "slug": "nueva-york-y-miami",
    "title": "Nueva York y Miami — 12 días de ciudad y playa | CheTour Viajes",
    "description": "Nueva York y Miami: 12 días, salida 21 de julio, con conectividad aérea. City tour por el Bajo y Alto Manhattan, Harlem, el Bronx, Queens y Brooklyn, y en Miami city tour, navegación por la Bahía de Biscayne y tiempo libre para playa y shopping. Aéreos, alojamiento y media pensión con una bebida. USD 4.988 por persona en base doble.",
    "price": 4988,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Nueva York y Miami (Salida 21 de julio)",
    "shareText": "¡Mirá este viaje a Nueva York y Miami con CheTour Viajes!",
    "shareTitle": "Nueva York y Miami — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/nyc-miami-1.jpg",
        "caption": "Times Square iluminada, en el corazón de Manhattan."
      },
      {
        "src": "/paquetes/img/nyc-miami-2.jpg",
        "caption": "El puente de Brooklyn y el skyline del Bajo Manhattan al atardecer."
      },
      {
        "src": "/paquetes/img/nyc-miami-3.jpg",
        "caption": "Una calle del Bajo Manhattan con vista a los rascacielos del Financial District."
      },
      {
        "src": "/paquetes/img/nyc-miami-4.jpg",
        "caption": "Vista aérea de South Beach y la costa de Miami."
      },
      {
        "src": "/paquetes/img/nyc-miami-5.jpg",
        "caption": "Rascacielos y avenidas de Brickell, el distrito financiero de Miami."
      },
      {
        "src": "/paquetes/img/nyc-miami-6.jpg",
        "caption": "Ocean Drive, la icónica avenida Art Déco de Miami Beach."
      }
    ]
  },
  'egipto-dubai-crucero-nilo': {
    "slug": "egipto-dubai-crucero-nilo",
    "title": "Egipto y Dubái con Crucero en el Nilo — Pirámides y desierto | CheTour Viajes",
    "description": "Egipto y Dubái con Crucero en el Nilo: El Cairo (pirámides de Guiza, la Esfinge, templos y el Bazar Khan El Khalili), un crucero por el río Nilo con parada en Abú Simbel, y un cierre en Dubái con safari por el desierto. Aéreos, traslados, alojamiento en hoteles 5 estrellas, excursiones, pensión completa, asistencia al viajero y coordinación permanente. Precio a consultar según la fecha de salida.",
    "price": null,
    "currencyPrefix": "$",
    "initialQty": 2,
    "waLabel": "Egipto y Dubái con Crucero en el Nilo",
    "shareText": "¡Mirá este viaje a Egipto y Dubái con Crucero en el Nilo, de CheTour Viajes!",
    "shareTitle": "Egipto y Dubái con Crucero en el Nilo — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/egipto-dubai-1.jpg",
        "caption": "Las pirámides de Guiza en El Cairo, Egipto."
      },
      {
        "src": "/paquetes/img/egipto-dubai-2.jpg",
        "caption": "La Ciudadela y la Mezquita de Muhammad Ali sobre la ciudad de El Cairo."
      },
      {
        "src": "/paquetes/img/egipto-dubai-3.jpg",
        "caption": "Callejón del Bazar Khan El Khalili en El Cairo."
      },
      {
        "src": "/paquetes/img/egipto-dubai-4.jpg",
        "caption": "Los templos de Abú Simbel, tallados en la roca junto al Nilo."
      },
      {
        "src": "/paquetes/img/egipto-dubai-5.jpg",
        "caption": "El Burj Khalifa y el skyline de Dubái."
      },
      {
        "src": "/paquetes/img/egipto-dubai-6.jpg",
        "caption": "Dunas del desierto de Dubái, con el skyline de la ciudad de fondo."
      }
    ]
  },
  'rio-de-janeiro': {
    "slug": "rio-de-janeiro",
    "title": "Río de Janeiro — Copacabana desde Córdoba | CheTour Viajes",
    "description": "Río de Janeiro: 8 días / 7 noches, salida 29 de marzo, con vuelo desde Córdoba (Aerolíneas Argentinas). Alojamiento con desayuno en el Océano Copacabana Hotel, equipaje de mano, traslados in/out y asistencia médica Master Plus con cobertura hasta 40K. USD 1.326 por persona en base doble.",
    "price": 1326,
    "currencyPrefix": "USD ",
    "initialQty": 2,
    "waLabel": "Río de Janeiro (Salida 29 de marzo)",
    "shareText": "¡Mirá esta escapada a Río de Janeiro con CheTour Viajes!",
    "shareTitle": "Río de Janeiro — CheTour Viajes",
    "photos": [
      {
        "src": "/paquetes/img/rio-1.jpg",
        "caption": "El Cristo Redentor y el Pan de Azúcar, con la Bahía de Guanabara de fondo."
      },
      {
        "src": "/paquetes/img/rio-2.jpg",
        "caption": "Vista aérea de la playa de Copacabana y su costanera."
      },
      {
        "src": "/paquetes/img/rio-3.jpg",
        "caption": "Fachada del Océano Copacabana Hotel, donde te alojás."
      },
      {
        "src": "/paquetes/img/rio-4.jpg",
        "caption": "Otra vista aérea de Copacabana, entre el mar y la ciudad."
      },
      {
        "src": "/paquetes/img/rio-5.jpg",
        "caption": "La playa de Ipanema, con el cerro Dois Irmãos de fondo."
      },
      {
        "src": "/paquetes/img/rio-6.jpg",
        "caption": "Atardecer en las playas de Río de Janeiro."
      }
    ]
  },
}
