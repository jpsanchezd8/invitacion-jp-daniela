import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { WEDDING_CONFIG } from "@/config/wedding"

export function Closing() {
  const { couple } = WEDDING_CONFIG
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reducedMotion = useReducedMotion()

  const fade = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay },
  })

  return (
    <section ref={ref} className="py-28 px-6 bg-marfil">
      <div className="max-w-xl mx-auto text-center">
        <motion.p
          className="font-serif text-lg md:text-xl text-texto/80 leading-relaxed italic"
          {...fade(0)}
        >
          Gracias por formar parte de nuestra historia. Esperamos compartir
          contigo este día tan especial rodeados de amor, familia y los paisajes
          de Aranjuez.
        </motion.p>

        <motion.p
          className="mt-10 font-script text-7xl md:text-8xl text-borgona leading-loose antialiased"
          {...fade(0.15)}
        >
          {couple.groom} & {couple.bride}
        </motion.p>
      </div>
    </section>
  )
}
