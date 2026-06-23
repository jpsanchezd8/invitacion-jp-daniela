import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Shirt,
  Sun,
  Hotel,
  Phone,
  ExternalLink,
  MessageCircle,
  type LucideIcon,
} from "lucide-react"
import { WEDDING_CONFIG } from "@/config/wedding"

function Card({
  icon: Icon,
  title,
  children,
  delay,
  isInView,
  reducedMotion,
}: {
  icon: LucideIcon
  title: string
  children: React.ReactNode
  delay: number
  isInView: boolean
  reducedMotion: boolean | null
}) {
  return (
    <motion.div
      className="rounded-lg border border-oliva/15 bg-white p-6 text-center"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <Icon className="mx-auto size-7 text-oliva mb-4" strokeWidth={1.5} />
      <h3 className="font-display text-xl text-borgona mb-3">{title}</h3>
      <div className="font-serif text-sm text-texto/80 leading-relaxed">
        {children}
      </div>
    </motion.div>
  )
}

export function UsefulInfo() {
  const { accommodations, contacts, reception } = WEDDING_CONFIG
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reducedMotion = useReducedMotion()

  return (
    <section ref={ref} id="info" className="py-20 px-6 bg-marfil">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-borgona text-center mb-14"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Información útil
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Dress code */}
          <Card
            icon={Shirt}
            title="Código de vestimenta"
            delay={0.05}
            isInView={isInView}
            reducedMotion={reducedMotion}
          >
            <p className="font-medium text-texto mb-2">{reception.dressCode}</p>
            <p>
              Sugerimos colores cálidos y neutros que armonicen con el entorno
              de viñedos. Evitar blanco, por favor.
            </p>
          </Card>

          {/* Weather */}
          <Card
            icon={Sun}
            title="Clima estimado"
            delay={0.1}
            isInView={isInView}
            reducedMotion={reducedMotion}
          >
            <p className="font-medium text-texto mb-2">18 – 24 °C</p>
            <p>
              Abril en Tarija es templado con noches frescas. Recomendamos
              llevar un abrigo ligero para la velada.
            </p>
          </Card>

          {/* Accommodations */}
          <Card
            icon={Hotel}
            title="Hospedajes"
            delay={0.15}
            isInView={isInView}
            reducedMotion={reducedMotion}
          >
            <ul className="space-y-3 text-left">
              {accommodations.map((acc, i) => (
                <li key={i}>
                  <a
                    href={acc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-borgona hover:underline"
                  >
                    {acc.name}
                    <ExternalLink className="size-3" />
                  </a>
                  <p className="text-xs text-texto/60 mt-0.5">
                    {acc.description}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Contacts */}
          <Card
            icon={Phone}
            title="Contactos"
            delay={0.2}
            isInView={isInView}
            reducedMotion={reducedMotion}
          >
            <ul className="space-y-3 text-left">
              {contacts.map((contact, i) => (
                <li key={i}>
                  <p className="font-medium text-texto">{contact.name}</p>
                  <p className="text-xs text-texto/60 mb-1">{contact.role}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-oliva hover:underline"
                    >
                      <MessageCircle className="size-3" />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${contact.phone}`}
                      className="inline-flex items-center gap-1 text-oliva hover:underline"
                    >
                      <Phone className="size-3" />
                      Llamar
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
