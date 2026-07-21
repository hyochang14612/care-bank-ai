interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'md'
}

export function ScoreBadge({ score, size = 'md' }: ScoreBadgeProps) {
  const padding = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-brand/10 font-semibold text-brand-dark ${padding}`}
    >
      ✨ AI 적합도 {score}%
    </span>
  )
}
