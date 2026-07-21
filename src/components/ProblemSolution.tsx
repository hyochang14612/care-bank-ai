import { problemPoints, solutionPoints } from '../data/pitch'

export function ProblemSolution() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-coral">지금 지역 복지 현장에서는</p>
        <h2 className="mt-1 text-lg font-bold text-ink">이런 문제가 반복되고 있어요</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {problemPoints.map((p) => (
            <div key={p.title} className="rounded-2xl bg-surface p-4 shadow-card">
              <span className="text-xl">{p.icon}</span>
              <h3 className="mt-2 text-sm font-semibold text-ink">{p.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-subtle">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-brand-dark">우리동네 통합돌봄 뱅크는</p>
        <h2 className="mt-1 text-lg font-bold text-ink">이렇게 해결해요</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {solutionPoints.map((s) => (
            <div key={s.title} className="rounded-2xl bg-mint p-4">
              <span className="text-xl">{s.icon}</span>
              <h3 className="mt-2 text-sm font-semibold text-brand-dark">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink/80">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
