import type { MatchGrade } from '../data/types'

const gradeStyle: Record<MatchGrade, string> = {
  '매우 적합': 'bg-mint text-brand-dark',
  적합: 'bg-blue-soft text-blue',
  '검토 필요': 'bg-coral-soft text-coral',
}

export function GradeBadge({ grade, size = 'md' }: { grade: MatchGrade; size?: 'sm' | 'md' }) {
  const padding = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${gradeStyle[grade]} ${padding}`}
    >
      ✨ AI 추천 · {grade}
    </span>
  )
}
