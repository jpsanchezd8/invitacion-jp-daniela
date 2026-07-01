export interface WeddingConfig {
  couple: {
    groom: string
    bride: string
  }
  date: string
  location: {
    city: string
    region: string
    country: string
  }
  ceremony: {
    venueName: string
    address: string
    time: string
    googleMapsUrl: string
  }
  reception: {
    venueName: string
    address: string
    time: string
    description: string
    googleMapsUrl: string
    dressCode: string
  }
  musicUrl: string
  giftOptions: Array<{
    title: string
    description: string
    icon: string
    action: {
      type: "link" | "copy" | "modal"
      value: string
    }
  }>
  contacts: Array<{
    name: string
    role: string
    whatsapp: string
    phone: string
  }>
  accommodations: Array<{
    name: string
    description: string
    url: string
  }>
  story: {
    paragraphs: string[]
  }
}

export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    groom: "Juan Pablo",
    bride: "Daniela",
  },

  date: "2027-04-24T16:00:00-04:00",

  location: {
    city: "Aranjuez",
    region: "Tarija",
    country: "Bolivia",
  },

  ceremony: {
    venueName: "Capilla San Juan de la Loma",
    address: "Calle Bolívar & Ingavi, Tarija",
    time: "15:00",
    googleMapsUrl: "https://maps.app.goo.gl/zj6zzReiRJR3dGPZ7?g_st=aw",
  },

  reception: {
    venueName: "Finca El Origen",
    address: "La Nueva, Ruta del Vino Santa Ana, Tarija",
    time: "17:00",
    description: "Viñedo Bodega Aranjuez",
    googleMapsUrl: "https://maps.app.goo.gl/19Koov5STRy3dzDu7",
    dressCode: "Formal / Elegante",
  },

  musicUrl: "",

  giftOptions: [
    {
      title: "Cuenta bancaria",
      description: "[PLACEHOLDER - completar datos de la cuenta bancaria]",
      icon: "landmark",
      action: {
        type: "copy",
        value: "[PLACEHOLDER - completar número de cuenta]",
      },
    },
    {
      title: "Mesa de regalos",
      description: "[PLACEHOLDER - completar descripción de la mesa de regalos]",
      icon: "gift",
      action: {
        type: "link",
        value: "[PLACEHOLDER - completar URL de la mesa de regalos]",
      },
    },
  ],

  contacts: [
    {
      name: "[PLACEHOLDER - completar nombre del contacto 1]",
      role: "Organizador(a)",
      whatsapp: "[PLACEHOLDER - completar número WhatsApp con código de país]",
      phone: "[PLACEHOLDER - completar número de teléfono]",
    },
    {
      name: "[PLACEHOLDER - completar nombre del contacto 2]",
      role: "Padrino/Madrina",
      whatsapp: "[PLACEHOLDER - completar número WhatsApp con código de país]",
      phone: "[PLACEHOLDER - completar número de teléfono]",
    },
  ],

  accommodations: [
    {
      name: "[PLACEHOLDER - completar nombre del hotel 1]",
      description: "[PLACEHOLDER - completar descripción del hotel]",
      url: "[PLACEHOLDER - completar URL del hotel]",
    },
    {
      name: "[PLACEHOLDER - completar nombre del hotel 2]",
      description: "[PLACEHOLDER - completar descripción del hotel]",
      url: "[PLACEHOLDER - completar URL del hotel]",
    },
  ],

  story: {
    paragraphs: [
      "Hace nueve años, nuestros caminos se cruzaron de la manera más inesperada. Nos conocimos gracias a una plataforma ciudadana. Ninguno de los dos iba buscando el amor; simplemente asistimos a una reunión, sin imaginar que ese día cambiaría nuestras vidas.",
      "Con el tiempo empezamos a conocernos, a compartir conversaciones, risas y momentos que, casi sin darnos cuenta, se transformaron en cariño y luego en amor.",
      "Lo más curioso es que siempre habíamos estado muy cerca. Teníamos muchos amigos en común, frecuentábamos los mismos lugares y, aun así, nunca nos habíamos encontrado. Como si la vida hubiera esperado el instante perfecto para presentarnos.",
      "Desde aquel día comenzó nuestra historia. El 23 de abril de 2017 decidimos comenzar este hermoso camino juntos.",
    ],
  },
}
