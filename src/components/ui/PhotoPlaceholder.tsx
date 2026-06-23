import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhotoPlaceholderProps {
  aspectRatio?: "4/5" | "16/9" | "1/1"
  label?: string
  className?: string
}

export function PhotoPlaceholder({
  aspectRatio = "4/5",
  label,
  className,
}: PhotoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg bg-beige/50 border border-oliva/20 overflow-hidden",
        className
      )}
      style={{ aspectRatio }}
    >
      <ImageIcon className="size-10 text-oliva/50" strokeWidth={1.5} />
      {label && (
        <span className="mt-2 text-sm font-sans text-oliva/60">{label}</span>
      )}
    </div>
  )
}
