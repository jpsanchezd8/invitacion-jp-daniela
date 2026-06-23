import { useState, useEffect } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { WEDDING_CONFIG } from "@/config/wedding"
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder"

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

function getTimeLeft(targetDate: string) {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const units: { key: keyof ReturnType<typeof getTimeLeft>; label: string }[] = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
]

export function SaveTheDate() {
  const { date, location } = WEDDING_CONFIG
  const countdown = useCountdown(date)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const reducedMotion = useReducedMotion()

  const fade = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay },
  })

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Background photo placeholder */}
      <PhotoPlaceholder
        aspectRatio="16/9"
        label="Foto panorámica de viñedos"
        className="w-full min-h-[500px] rounded-none"
      />

      {/* Overlay + content */}
      <div className="absolute inset-0 bg-marfil/75 flex flex-col items-center justify-center px-6">
        <motion.p
          className="font-sans text-sm tracking-[0.3em] uppercase text-oliva mb-4"
          {...fade(0)}
        >
          Reserva la fecha
        </motion.p>

        <motion.h2
          className="font-display text-5xl md:text-7xl text-borgona tracking-wide"
          {...fade(0.1)}
        >
          24 · 04 · 2027
        </motion.h2>

        {/* Countdown */}
        <motion.div
          className="mt-8 flex gap-4 md:gap-8"
          {...fade(0.2)}
        >
          {units.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center min-w-[60px]">
              <span className="font-display text-3xl md:text-4xl text-texto tabular-nums">
                {String(countdown[key]).padStart(2, "0")}
              </span>
              <span className="font-sans text-xs text-oliva/70 uppercase tracking-widest mt-1">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 font-serif text-lg md:text-xl text-oliva italic"
          {...fade(0.3)}
        >
          {location.city}, {location.region}
        </motion.p>
      </div>
    </section>
  )
}
