import type { MatchGrade } from '../data/types'
import { GradeBadge } from './GradeBadge'

interface Criterion {
  label: string
  matched: boolean
}

function PipelineNode({
  icon,
  label,
  active,
}: {
  icon: string
  label: string
  active?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition ${
          active ? 'animate-pulse bg-brand text-white' : 'bg-mint text-brand-dark'
        }`}
      >
        {icon}
      </div>
      <span className="whitespace-nowrap text-xs font-medium text-subtle">{label}</span>
    </div>
  )
}

export function AiMatchingVisual({
  criteria,
  grade,
  analyzing,
}: {
  criteria: Criterion[]
  grade: MatchGrade
  analyzing: boolean
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2">
        <PipelineNode icon="🙋" label="등록 자원" />
        <div className={`h-0.5 flex-1 rounded-full ${analyzing ? 'bg-line' : 'bg-brand'}`} />
        <PipelineNode icon="🤖" label="AI 매칭 엔진" active={analyzing} />
        <div className={`h-0.5 flex-1 rounded-full ${analyzing ? 'bg-line' : 'bg-brand'}`} />
        <PipelineNode icon="🧓" label="대상자 후보" />
      </div>

      <div className="space-y-2">
        {criteria.map((c) => (
          <div
            key={c.label}
            className="flex items-center justify-between rounded-xl bg-bg px-3.5 py-2.5 text-sm"
          >
            <span className="text-ink">{c.label}</span>
            {analyzing ? (
              <span className="text-xs text-subtle">확인 중...</span>
            ) : c.matched ? (
              <span className="text-xs font-semibold text-brand-dark">✅ 일치</span>
            ) : (
              <span className="text-xs font-semibold text-subtle">− 해당 없음</span>
            )}
          </div>
        ))}
      </div>

      {!analyzing && (
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-bg py-4 text-center">
          <p className="text-xs text-subtle">AI 추천 결과 (사회복지사 최종 확인 필요)</p>
          <GradeBadge grade={grade} />
        </div>
      )}
    </div>
  )
}
