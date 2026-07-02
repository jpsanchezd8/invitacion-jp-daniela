import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { MapPin, Clock } from "lucide-react"
import { WEDDING_CONFIG } from "@/config/wedding"
import { Button } from "@/components/ui/button"
import { OrnamentDivider } from "@/components/ui/OrnamentDivider"

export function Ceremony() {
  const { ceremony } = WEDDING_CONFIG
  const imageRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const isImageInView = useInView(imageRef, { once: true, margin: "-80px" })
  const isInfoInView = useInView(infoRef, { once: true, margin: "-80px" })
  const reducedMotion = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section className="py-20 px-6 bg-marfil">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16">

          {/* ── Left column: image (40-45%) ── */}
          <motion.div
            ref={imageRef}
            className="md:w-2/5 flex justify-center"
            {...fadeUp(0)}
            animate={isImageInView ? { opacity: 1, y: 0 } : {}}
          >
            <div
              className="w-full max-w-sm md:max-w-none flex items-center justify-center"
              style={{ height: "480px" }}
            >
              <img
                src="/capilla-ceremonia.png"
                alt="Ilustración de la capilla donde se celebrará la ceremonia"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>

          {/* ── Right column: ceremony info (55-60%) ── */}
          <motion.div
            ref={infoRef}
            className="md:w-3/5 md:pl-[84px]"
            {...fadeUp(0.2)}
            animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="font-display text-4xl md:text-5xl text-borgona text-center md:text-left">
              Ceremonia
            </h2>

            <div className="mt-5 mb-8 w-40 mx-auto md:mx-0">
              <OrnamentDivider icon="none" />
            </div>

            <p className="font-serif text-2xl text-texto mb-6 text-center md:text-left">
              {ceremony.venueName}
            </p>

            <div className="flex flex-col items-center md:items-start gap-3 mb-8 text-texto/80">
              <span className="inline-flex items-center gap-2 font-sans text-sm">
                <Clock className="size-4 text-oliva" />
                {ceremony.time} hrs
              </span>
              <span className="inline-flex items-center gap-2 font-sans text-sm">
                <MapPin className="size-4 text-oliva" />
                {ceremony.address}
              </span>
            </div>

            <div className="flex justify-center md:justify-start">
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
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
