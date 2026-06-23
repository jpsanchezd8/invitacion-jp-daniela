import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { MapPin, Clock } from "lucide-react"
import { WEDDING_CONFIG } from "@/config/wedding"
import { Button } from "@/components/ui/button"

export function Ceremony() {
  const { ceremony } = WEDDING_CONFIG
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const reducedMotion = useReducedMotion()

  const fade = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay },
  })

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-borgona mb-10"
          {...fade(0)}
        >
          Ceremonia
        </motion.h2>

        <motion.p
          className="font-serif text-2xl text-texto mb-6"
          {...fade(0.1)}
        >
          {ceremony.venueName}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-3 mb-8 text-texto/70"
          {...fade(0.15)}
        >
          <span className="inline-flex items-center gap-2 font-sans text-sm">
            <Clock className="size-4 text-oliva" />
            {ceremony.time} hrs
          </span>
          <span className="inline-flex items-center gap-2 font-sans text-sm">
            <MapPin className="size-4 text-oliva" />
            {ceremony.address}
          </span>
        </motion.div>

        <motion.div {...fade(0.2)}>
          <Button
            asChild
            className="bg-borgona hover:bg-borgona/90 text-white font-sans"
            size="lg"
          >
            <a href={ceremony.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin className="size-4" />
              Ver ubicación en Google Maps
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
