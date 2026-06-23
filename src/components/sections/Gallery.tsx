import { useCallback, useEffect, useState, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder"
import { cn } from "@/lib/utils"

const slides = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  label: `Foto ${i + 1}`,
}))

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    containScroll: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const reducedMotion = useReducedMotion()

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <motion.h2
        className="font-display text-4xl md:text-5xl text-borgona text-center mb-12 px-6"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Galería
      </motion.h2>

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {/* Carousel viewport */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6 pl-6 md:pl-[calc((100%-720px)/2)]">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="flex-[0_0_260px] md:flex-[0_0_300px] min-w-0"
              >
                <PhotoPlaceholder
                  aspectRatio="4/5"
                  label={slide.label}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className={cn(
            "absolute top-1/2 left-3 md:left-6 -translate-y-1/2 z-10",
            "size-10 rounded-full bg-white/80 backdrop-blur-sm border border-oliva/20",
            "flex items-center justify-center",
            "transition-opacity hover:bg-white",
            "disabled:opacity-0 cursor-pointer disabled:cursor-default"
          )}
          aria-label="Anterior"
        >
          <ChevronLeft className="size-5 text-oliva" />
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className={cn(
            "absolute top-1/2 right-3 md:right-6 -translate-y-1/2 z-10",
            "size-10 rounded-full bg-white/80 backdrop-blur-sm border border-oliva/20",
            "flex items-center justify-center",
            "transition-opacity hover:bg-white",
            "disabled:opacity-0 cursor-pointer disabled:cursor-default"
          )}
          aria-label="Siguiente"
        >
          <ChevronRight className="size-5 text-oliva" />
        </button>
      </motion.div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => emblaApi?.scrollTo(slide.id)}
            className={cn(
              "size-2 rounded-full transition-all duration-300 cursor-pointer",
              selectedIndex === slide.id
                ? "bg-oliva scale-125"
                : "bg-oliva/25 hover:bg-oliva/40"
            )}
            aria-label={`Ir a foto ${slide.id + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
