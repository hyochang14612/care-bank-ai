interface Factor {
  label: string
  value: number
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
  factors,
  score,
  analyzing,
}: {
  factors: Factor[]
  score: number
  analyzing: boolean
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2">
        <PipelineNode icon="🙋" label="후원 자원" />
        <div className={`h-0.5 flex-1 rounded-full ${analyzing ? 'bg-line' : 'bg-brand'}`} />
        <PipelineNode icon="🤖" label="AI 매칭 엔진" active={analyzing} />
        <div className={`h-0.5 flex-1 rounded-full ${analyzing ? 'bg-line' : 'bg-brand'}`} />
        <PipelineNode icon="🧓" label="대상자 후보" />
      </div>

      <div className="space-y-2.5">
        {factors.map((factor) => (
          <div key={factor.label}>
            <div className="mb-1 flex items-center justify-between text-xs text-subtle">
              <span>{factor.label}</span>
              <span className="font-medium text-ink">{analyzing ? '분석 중' : `${factor.value}%`}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-bg">
              <div
                className="h-full rounded-full bg-brand transition-all duration-700 ease-out"
                style={{ width: analyzing ? '12%' : `${factor.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {!analyzing && (
        <div className="rounded-2xl bg-mint py-3 text-center">
          <p className="text-xs text-brand-dark">종합 적합도</p>
          <p className="text-2xl font-bold text-brand-dark">{score}%</p>
        </div>
      )}
    </div>
  )
}
