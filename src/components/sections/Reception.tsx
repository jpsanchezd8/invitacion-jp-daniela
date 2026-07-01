import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { MapPin, Clock, Shirt } from "lucide-react"
import { WEDDING_CONFIG } from "@/config/wedding"
import { Button } from "@/components/ui/button"

export function Reception() {
  const { reception } = WEDDING_CONFIG
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const reducedMotion = useReducedMotion()

  const fade = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay },
  })

  const textShadow = "0 1px 6px rgba(251,248,242,0.85), 0 0 18px rgba(251,248,242,0.6)"

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden">
      <img
        src="/bodega-aranjuez.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-marfil/60" />

      <div className="relative max-w-lg mx-auto text-center">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-borgona mb-10"
          style={{ textShadow }}
          {...fade(0)}
        >
          Recepción
        </motion.h2>

        <motion.p
          className="font-serif text-2xl text-texto mb-3"
          style={{ textShadow }}
          {...fade(0.1)}
        >
          {reception.venueName}
        </motion.p>

        <motion.p
          className="font-serif text-base text-texto/70 italic mb-6 max-w-md mx-auto"
          style={{ textShadow }}
          {...fade(0.12)}
        >
          {reception.description}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-3 mb-6 text-texto/70"
          style={{ textShadow }}
          {...fade(0.15)}
        >
          <span className="inline-flex items-center gap-2 font-sans text-sm">
            <Clock className="size-4 text-oliva" />
            {reception.time} hrs
          </span>
          <span className="inline-flex items-center gap-2 font-sans text-sm">
            <MapPin className="size-4 text-oliva" />
            {reception.address}
          </span>
        </motion.div>

        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-beige/50 border border-oliva/15"
          {...fade(0.18)}
        >
          <Shirt className="size-4 text-oliva" />
          <span className="font-sans text-sm text-texto/80">
            Código de vestimenta:{" "}
            <a
              href="#info"
              className="font-medium text-borgona hover:underline"
            >
              {reception.dressCode}
            </a>
          </span>
        </motion.div>

        <motion.div className="block" {...fade(0.22)}>
          <Button
            asChild
            className="bg-borgona hover:bg-borgona/90 text-white font-sans shadow-md"
            size="lg"
          >
            <a href={reception.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin className="size-4" />
              Cómo llegar
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
