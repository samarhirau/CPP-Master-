import { Badge } from "@/components/ui/badge"

type DifficultyProps = {
  difficulty: "Easy" | "Medium" | "Hard"
}

export function DifficultyBadge({ difficulty }: DifficultyProps) {
  const colorMap = {
    Easy: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    Medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
    Hard: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  }

  return (
    <Badge variant="outline" className={`${colorMap[difficulty]} border-none`}>
      {difficulty}
    </Badge>
  )
}
