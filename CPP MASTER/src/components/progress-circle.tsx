type ProgressCircleProps = {
  value: number
  size?: number
  strokeWidth?: number
}

export function ProgressCircle({ value, size = 24, strokeWidth = 3 }: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  const colorClass = value === 0 ? "stroke-muted-foreground" : value === 100 ? "stroke-green-500" : "stroke-primary"

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="stroke-muted opacity-20"
        />
        {value > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={colorClass}
            strokeLinecap="round"
          />
        )}
      </svg>
      {value > 0 && <span className="absolute text-[8px] font-medium">{value === 100 ? "✓" : `${value}%`}</span>}
    </div>
  )
}
