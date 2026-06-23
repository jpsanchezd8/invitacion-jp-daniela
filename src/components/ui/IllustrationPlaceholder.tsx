import { Palette } from "lucide-react"
import { cn } from "@/lib/utils"

interface IllustrationPlaceholderProps {
  type: "seal" | "pet" | "divider" | "vine"
  label?: string
  className?: string
}

const typeLabels: Record<IllustrationPlaceholderProps["type"], string> = {
  seal: "Sello de acuarela",
  pet: "Ilustración de mascota",
  divider: "Divisor decorativo",
  vine: "Enredadera / ramas",
}

export function IllustrationPlaceholder({
  type,
  label,
  className,
}: IllustrationPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg bg-marfil border-2 border-dashed border-oliva/30 p-6",
        className
      )}
    >
      <Palette className="size-8 text-oliva-claro/50" strokeWidth={1.5} />
      <span className="mt-2 text-xs font-sans text-oliva-claro/70 uppercase tracking-widest">
        {typeLabels[type]}
      </span>
      {label && (
        <span className="mt-1 text-sm font-serif text-oliva/60 italic">
          {label}
        </span>
      )}
    </div>
  )
}
