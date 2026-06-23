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
  timeline: Array<{
    year: string
    title: string
    description: string
  }>
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
    venueName: "[PLACEHOLDER - completar nombre de la iglesia/lugar de ceremonia]",
    address: "[PLACEHOLDER - completar dirección de la ceremonia]",
    time: "16:00",
    googleMapsUrl: "[PLACEHOLDER - completar URL de Google Maps de la ceremonia]",
  },

  reception: {
    venueName: "[PLACEHOLDER - completar nombre del salón de recepción]",
    address: "[PLACEHOLDER - completar dirección de la recepción]",
    time: "19:00",
    description: "[PLACEHOLDER - completar descripción del lugar de recepción]",
    googleMapsUrl: "[PLACEHOLDER - completar URL de Google Maps de la recepción]",
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

  timeline: [
    {
      year: "[PLACEHOLDER - año]",
      title: "Nos conocimos",
      description: "[PLACEHOLDER - completar descripción de cómo se conocieron]",
    },
    {
      year: "[PLACEHOLDER - año]",
      title: "Primera cita",
      description: "[PLACEHOLDER - completar descripción de la primera cita]",
    },
    {
      year: "[PLACEHOLDER - año]",
      title: "Primer viaje juntos",
      description: "[PLACEHOLDER - completar descripción del primer viaje]",
    },
    {
      year: "[PLACEHOLDER - año]",
      title: "La propuesta",
      description: "[PLACEHOLDER - completar descripción de la propuesta de matrimonio]",
    },
    {
      year: "2027",
      title: "Nos casamos",
      description: "El día que unimos nuestras vidas para siempre.",
    },
  ],
}
