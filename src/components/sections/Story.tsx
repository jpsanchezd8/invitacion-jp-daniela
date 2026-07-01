import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { WEDDING_CONFIG } from "@/config/wedding"
import { OrnamentDivider } from "@/components/ui/OrnamentDivider"

export function Story() {
  const { story } = WEDDING_CONFIG
  const textRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const isTextInView = useInView(textRef, { once: true, margin: "-80px" })
  const isPhotoInView = useInView(photoRef, { once: true, margin: "-80px" })
  const reducedMotion = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="py-20 px-6 bg-marfil">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-12 md:gap-16">

          {/* ── Left column: text (60%) ── */}
          <motion.div
            ref={textRef}
            className="md:w-3/5"
            {...fadeUp(0)}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="font-display text-4xl md:text-5xl text-borgona md:text-left text-center">
              Nuestra Historia
            </h2>

            <div className="mt-5 mb-8">
              <OrnamentDivider icon="leaf" />
            </div>

            <div className="space-y-5">
              {story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-serif text-base md:text-lg text-texto leading-relaxed text-center md:text-left"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <OrnamentDivider icon="heart" />
            </div>
          </motion.div>

          {/* ── Right column: photo (40%) ── */}
          <motion.div
            ref={photoRef}
            className="md:w-2/5 flex justify-center"
            {...fadeUp(0.2)}
            animate={isPhotoInView ? { opacity: 1, y: 0 } : {}}
          >
            <img
              src="/historia-pareja.jpg"
              alt="Juan Pablo y Daniela"
              className="w-full max-w-sm md:max-w-none rounded-2xl object-cover shadow-md"
              style={{ maxHeight: "640px" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
