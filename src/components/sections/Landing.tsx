import { useState, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { WEDDING_CONFIG } from "@/config/wedding"

export function Landing() {
  const [isOpen, setIsOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const { couple, date } = WEDDING_CONFIG

  const openEnvelope = useCallback(() => {
    if (!isOpen) setIsOpen(true)
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        openEnvelope()
      }
    },
    [openEnvelope],
  )

  const weddingDate = new Date(date)
  const formattedDate = weddingDate.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-marfil overflow-hidden">
      {/* Vineyard background — visible while envelope is closed, fades out on open */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeOut" }}
      >
        <img
          src="/vinedo-bg.jpg"
          alt=""
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-marfil/[0.45]" />
      </motion.div>

      {/* Couple photo background — fades in when envelope opens */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 1, ease: "easeOut" }}
      >
        <img
          src="/foto-landing.jpg"
          alt=""
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "grayscale(1) sepia(0.2) hue-rotate(70deg) saturate(0.9) brightness(1.1) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-marfil/[0.65]" />
      </motion.div>

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
        style={{ minHeight: "340px" }}
      >
        {/* ── Letter content (behind envelope) ── */}
        <motion.div
          className="text-center px-8 max-w-lg"
          style={{ textShadow: "0 1px 5px rgba(251,248,242,0.7), 0 0 14px rgba(251,248,242,0.45)" }}
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
          <h1
            className="font-script text-borgona antialiased text-center"
            style={{ fontSize: "clamp(2.75rem, 10vw, 6rem)", lineHeight: "1.6" }}
          >
            <span className="whitespace-nowrap">{couple.groom}</span>
            {" "}
            <span className="whitespace-nowrap">
              <span
                className="font-script text-borgona"
                style={{
                  fontSize: "clamp(1.5125rem, 5.5vw, 3.3rem)",
                  display: "inline-block",
                  verticalAlign: "middle",
                  lineHeight: 1,
                  position: "relative",
                  top: "-1.55em",
                }}
              >
                {"& "}
              </span>
              {couple.bride}
            </span>
          </h1>

          <p className="mt-8 font-serif text-base md:text-lg text-texto font-medium leading-relaxed italic">
            El amor nos ha traído hasta este momento y queremos celebrarlo junto
            a las personas que más queremos. Será un honor contar con su
            presencia en nuestro matrimonio y compartir juntos el inicio de
            esta nueva etapa.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-oliva/30" />
            <span className="text-oliva/50 text-xs">✦</span>
            <span className="flex-1 h-px bg-oliva/30" />
          </div>

          <div className="mt-4 flex flex-col items-center gap-1">
            <p className="font-sans text-xs text-borgona tracking-[0.2em] uppercase">
              24 DE ABRIL DE 2027
            </p>
            <p className="font-sans text-xs text-borgona tracking-[0.2em] uppercase">
              FINCA EL ORIGEN
            </p>
            <p className="font-sans text-xs text-borgona tracking-[0.15em]">
              Aranjuez, Tarija
            </p>
          </div>

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
            style={{ width: "clamp(250px, 65vw, 400px)" }}
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
                  height: "clamp(82px, 22vw, 136px)",
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
              <motion.div
                className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 focus-visible:ring-offset-marfil rounded-full"
                role="button"
                tabIndex={0}
                aria-label="Sello de lacre con monograma J&D — Toca para abrir la invitación"
                onClick={openEnvelope}
                onKeyDown={handleKeyDown}
                initial={false}
                animate={
                  isOpen
                    ? reducedMotion
                      ? { opacity: 0 }
                      : { rotate: 15, scale: 1.3, opacity: 0 }
                    : { rotate: 0, scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.3 }}
                whileHover={!isOpen && !reducedMotion ? { scale: 1.05, transition: { duration: 0.2 } } : undefined}
                whileTap={!isOpen ? { scale: 0.95 } : undefined}
              >
                <img
                  src="/sello-jd.png"
                  alt="Sello de lacre con monograma J&D - Toca para abrir la invitación"
                  loading="eager"
                  draggable={false}
                  className="w-[82px] sm:w-[115px] h-auto drop-shadow-[0_4px_12px_rgba(91,107,58,0.35)] select-none pointer-events-none"
                />
              </motion.div>

              {/* Pulse hint */}
              {!isOpen && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-oliva/30 pointer-events-none"
                  animate={reducedMotion ? {} : { scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
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
        className="mt-5 font-sans text-sm text-oliva/70 tracking-wide"
        initial={false}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        Toca el sello para abrir
      </motion.p>
    </section>
  )
}
