import { useState, useRef, useEffect } from "react"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import {
  Landmark,
  Gift,
  CreditCard,
  Heart,
  Copy,
  ExternalLink,
  Eye,
  Check,
  type LucideIcon,
} from "lucide-react"
import { WEDDING_CONFIG } from "@/config/wedding"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const iconMap: Record<string, LucideIcon> = {
  landmark: Landmark,
  gift: Gift,
  "credit-card": CreditCard,
  heart: Heart,
}

function GiftCard({
  title,
  description,
  icon,
  action,
  delay,
  isInView,
  reducedMotion,
}: {
  title: string
  description: string
  icon: string
  action: { type: "link" | "copy" | "modal"; value: string }
  delay: number
  isInView: boolean
  reducedMotion: boolean | null
}) {
  const [copied, setCopied] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const Icon = iconMap[icon] || Gift

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2500)
    return () => clearTimeout(t)
  }, [copied])

  async function handleAction() {
    if (action.type === "copy") {
      await navigator.clipboard.writeText(action.value)
      setCopied(true)
    } else if (action.type === "link") {
      window.open(action.value, "_blank", "noopener,noreferrer")
    } else if (action.type === "modal") {
      setModalOpen(true)
    }
  }

  const buttonLabel = {
    copy: copied ? "¡Copiado!" : "Copiar datos",
    link: "Ver opciones",
    modal: "Ver detalles",
  }[action.type]

  const ButtonIcon = {
    copy: copied ? Check : Copy,
    link: ExternalLink,
    modal: Eye,
  }[action.type]

  return (
    <>
      <motion.div
        className="rounded-lg border border-oliva/15 bg-white p-8 text-center flex flex-col items-center"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
      >
        <Icon className="size-9 text-oliva mb-5" strokeWidth={1.5} />

        <h3 className="font-display text-2xl text-borgona mb-2">{title}</h3>

        <p className="font-serif text-sm text-texto/70 leading-relaxed mb-6 max-w-xs">
          {description}
        </p>

        <div className="relative mt-auto">
          <Button
            onClick={handleAction}
            variant="outline"
            className="border-oliva/30 text-oliva hover:bg-oliva/10 hover:text-oliva font-sans cursor-pointer"
          >
            <ButtonIcon className="size-4" />
            {buttonLabel}
          </Button>

          {/* Copy toast */}
          <AnimatePresence>
            {copied && (
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-oliva px-4 py-1.5 text-xs text-white font-sans shadow-lg"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                Copiado al portapapeles
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modal for "modal" action type */}
      {action.type === "modal" && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-marfil border-oliva/20">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-borgona">
                {title}
              </DialogTitle>
              <DialogDescription className="font-serif text-texto/70 pt-2">
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 rounded-md bg-white p-4 border border-oliva/10">
              <p className="font-sans text-sm text-texto whitespace-pre-wrap break-all">
                {action.value}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export function Gifts() {
  const { giftOptions } = WEDDING_CONFIG
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reducedMotion = useReducedMotion()

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-borgona text-center mb-6"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Regalos
        </motion.h2>

        <motion.p
          className="font-serif text-base md:text-lg text-texto/70 text-center leading-relaxed mb-14 max-w-xl mx-auto italic"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Tu compañía es nuestro mejor regalo. Si además quieres acompañarnos
          con un detalle, te dejamos dos opciones:
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {giftOptions.map((option, i) => (
            <GiftCard
              key={i}
              title={option.title}
              description={option.description}
              icon={option.icon}
              action={option.action}
              delay={0.1 + i * 0.08}
              isInView={isInView}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
