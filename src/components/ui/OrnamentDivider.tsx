import { Leaf, Heart } from "lucide-react"

export function OrnamentDivider({ icon }: { icon: "leaf" | "heart" | "none" }) {
  if (icon === "none") {
    return <span className="block h-px w-full bg-oliva/35" />
  }

  return (
    <div className="flex items-center gap-4">
      <span className="flex-1 h-px bg-oliva/35" />
      {icon === "leaf" ? (
        <Leaf className="size-4 text-oliva" strokeWidth={1.5} />
      ) : (
        <Heart className="size-4 text-borgona fill-borgona" strokeWidth={1.5} />
      )}
      <span className="flex-1 h-px bg-oliva/35" />
    </div>
  )
}
