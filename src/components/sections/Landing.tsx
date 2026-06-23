import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { WEDDING_CONFIG } from "@/config/wedding"

export function Landing() {
  const [isOpen, setIsOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const { couple, date } = WEDDING_CONFIG

  const weddingDate = new Date(date)
  const formattedDate = weddingDate.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-marfil overflow-hidden">
      {/* Paper noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <filter id="paper-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-noise)" />
        </svg>
      </div>

      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: "420px" }}
      >
        {/* ── Letter content (behind envelope) ── */}
        <motion.div
          className="text-center px-8 max-w-lg"
          initial={false}
          animate={
            isOpen
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 30, scale: 0.97 }
          }
          transition={{
            delay: reducedMotion ? 0.3 : 0.9,
            duration: reducedMotion ? 0.4 : 0.8,
            ease: "easeOut",
          }}
        >
          <h1 className="font-display text-borgona leading-tight text-5xl md:text-6xl">
            {couple.groom}
            <span className="block font-serif text-oliva text-2xl md:text-3xl my-2">
              &
            </span>
            {couple.bride}
          </h1>

          <p className="mt-8 font-serif text-base md:text-lg text-texto/80 leading-relaxed italic">
            Con inmensa alegría queremos compartir uno de los momentos más
            importantes de nuestras vidas. Te invitamos a acompañarnos en la
            celebración de nuestro matrimonio y a brindar con nosotros entre los
            viñedos que han sido testigos de nuestra historia.
          </p>

          <p className="mt-6 font-sans text-sm text-oliva tracking-[0.2em] uppercase">
            {formattedDate}
          </p>

          <motion.div
            className="mt-10"
            animate={reducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="mx-auto size-5 text-oliva/60" />
          </motion.div>
        </motion.div>

        {/* ── Envelope overlay ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={false}
          animate={
            isOpen
              ? reducedMotion
                ? { opacity: 0 }
                : { y: 120, opacity: 0 }
              : { y: 0, opacity: 1 }
          }
          transition={{
            delay: reducedMotion ? 0.4 : 1.2,
            duration: reducedMotion ? 0.4 : 0.6,
            ease: "easeIn",
          }}
          style={{ pointerEvents: isOpen ? "none" : "auto" }}
        >
          <div
            className="relative"
            style={{ width: "clamp(300px, 80vw, 480px)" }}
          >
            {/* Envelope body */}
            <div
              className="relative rounded-sm shadow-xl overflow-hidden"
              style={{
                aspectRatio: "3/2",
                backgroundColor: "#F0E8DA",
                border: "1px solid rgba(91, 107, 58, 0.2)",
              }}
            >
              {/* Diagonal fold lines */}
              <div
                className="absolute w-[141%] border-t border-oliva/[0.08]"
                style={{
                  bottom: 0,
                  left: 0,
                  transformOrigin: "bottom left",
                  transform: "rotate(-35deg)",
                }}
              />
              <div
                className="absolute w-[141%] border-t border-oliva/[0.08]"
                style={{
                  bottom: 0,
                  right: 0,
                  transformOrigin: "bottom right",
                  transform: "rotate(35deg)",
                }}
              />
            </div>

            {/* Flap */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{ perspective: "800px" }}
            >
              <motion.div
                className="w-full"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  height: "clamp(100px, 27vw, 165px)",
                  transformOrigin: "top center",
                  backgroundColor: "#EBE3D5",
                  border: "1px solid rgba(91, 107, 58, 0.15)",
                }}
                initial={false}
                animate={
                  isOpen
                    ? reducedMotion
                      ? { opacity: 0 }
                      : { rotateX: -180 }
                    : { rotateX: 0 }
                }
                transition={{
                  delay: reducedMotion ? 0.1 : 0.3,
                  duration: reducedMotion ? 0.3 : 0.6,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Wax seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.button
                className="size-[clamp(64px,18vw,80px)] rounded-full bg-borgona flex items-center justify-center cursor-pointer"
                style={{
                  boxShadow:
                    "0 4px 14px rgba(107, 39, 55, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.15)",
                }}
                onClick={() => !isOpen && setIsOpen(true)}
                initial={false}
                animate={
                  isOpen
                    ? reducedMotion
                      ? { opacity: 0 }
                      : { rotate: 15, scale: 1.3, opacity: 0 }
                    : { rotate: 0, scale: 1, opacity: 1 }
                }
                transition={{ duration: reducedMotion ? 0.3 : 0.3 }}
                whileHover={!isOpen ? { scale: 1.08 } : undefined}
                whileTap={!isOpen ? { scale: 0.95 } : undefined}
                aria-label="Abrir invitación"
              >
                {/* Seal inner ring */}
                <span className="flex items-center justify-center size-[85%] rounded-full border border-white/20">
                  <span className="font-display text-white text-lg md:text-xl tracking-wider">
                    J & D
                  </span>
                </span>
              </motion.button>

              {/* Pulse hint */}
              {!isOpen && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-borgona/30 pointer-events-none"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Microcopy */}
      <motion.p
        className="mt-8 font-sans text-sm text-oliva/70 tracking-wide"
        initial={false}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        Toca el sello para abrir
      </motion.p>
    </section>
  )
}
