import { useState, useRef, useCallback, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { WEDDING_CONFIG } from "@/config/wedding"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const FADE_DURATION = 600
const FADE_STEPS = 30
const MAX_VOLUME = 0.5

export function BackgroundMusic() {
  const { musicUrl } = WEDDING_CONFIG
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<number | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current)
    }
  }, [])

  const fadeVolume = useCallback(
    (from: number, to: number, then: () => void) => {
      const audio = audioRef.current
      if (!audio) return then()

      let step = 0
      const interval = FADE_DURATION / FADE_STEPS
      const delta = (to - from) / FADE_STEPS

      function tick() {
        step++
        if (!audio) return
        audio.volume = Math.min(1, Math.max(0, from + delta * step))
        if (step < FADE_STEPS) {
          fadeRef.current = requestAnimationFrame(() =>
            setTimeout(tick, interval)
          )
        } else {
          then()
        }
      }
      tick()
    },
    []
  )

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      fadeVolume(audio.volume, 0, () => {
        audio.pause()
        setPlaying(false)
      })
    } else {
      audio.volume = 0
      audio.play().then(() => {
        setPlaying(true)
        fadeVolume(0, MAX_VOLUME, () => {})
      })
    }
  }, [playing, fadeVolume])

  if (!musicUrl) return null

  return (
    <TooltipProvider delayDuration={400}>
      <audio ref={audioRef} src={musicUrl} loop preload="none" />
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggle}
            className="fixed bottom-6 right-6 z-50 size-12 rounded-full bg-oliva/90 text-white shadow-lg backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-oliva cursor-pointer"
            aria-label={playing ? "Pausar música" : "Reproducir música"}
          >
            {playing ? (
              <Volume2 className="size-5" strokeWidth={1.5} />
            ) : (
              <VolumeX className="size-5" strokeWidth={1.5} />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-texto text-white font-sans">
          {playing ? "Pausar música" : "Reproducir música"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
