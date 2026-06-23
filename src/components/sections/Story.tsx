import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { WEDDING_CONFIG } from "@/config/wedding"
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder"

function Milestone({
  year,
  title,
  description,
  isLast,
}: {
  year: string
  title: string
  description: string
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reducedMotion = useReducedMotion()

  return (
    <div ref={ref} className="relative">
      {/* ── Desktop: two-column layout ── */}
      <div className="hidden md:grid md:grid-cols-[120px_40px_1fr] md:gap-6">
        {/* Year */}
        <motion.div
          className="text-right pt-1"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="font-display text-3xl text-borgona">{year}</span>
        </motion.div>

        {/* Line + dot */}
        <div className="relative flex justify-center">
          <motion.div
            className="size-3 rounded-full bg-oliva ring-4 ring-marfil z-10 mt-3"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
          {!isLast && (
            <div className="absolute top-5 bottom-0 w-px bg-oliva/20 -mb-6" />
          )}
        </div>

        {/* Content card */}
        <motion.div
          className="pb-12"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h3 className="font-serif text-xl text-texto font-medium mb-1">
            {title}
          </h3>
          <p className="font-sans text-sm text-texto/70 leading-relaxed mb-4">
            {description}
          </p>
          <PhotoPlaceholder
            aspectRatio="4/5"
            label={title}
            className="w-48"
          />
        </motion.div>
      </div>

      {/* ── Mobile: stacked centered layout ── */}
      <motion.div
        className="md:hidden flex flex-col items-center text-center pb-10"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="font-display text-2xl text-borgona mb-2">{year}</span>
        <h3 className="font-serif text-lg text-texto font-medium mb-1">
          {title}
        </h3>
        <p className="font-sans text-sm text-texto/70 leading-relaxed mb-4 max-w-xs">
          {description}
        </p>
        <PhotoPlaceholder
          aspectRatio="4/5"
          label={title}
          className="w-40"
        />
      </motion.div>
    </div>
  )
}

export function Story() {
  const { timeline } = WEDDING_CONFIG

  return (
    <section className="py-20 px-6 bg-marfil">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-borgona text-center mb-16">
          Nuestra Historia
        </h2>

        <div>
          {timeline.map((item, i) => (
            <Milestone
              key={i}
              year={item.year}
              title={item.title}
              description={item.description}
              isLast={i === timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
