import type { MatchResult } from '../data/types'
import { Tag } from './Tag'

const statusStyle: Record<MatchResult['status'], string> = {
  '확인 대기': 'bg-blue-soft text-blue',
  '연계 진행중': 'bg-mint text-brand-dark',
  보류: 'bg-bg text-subtle',
}

export function MatchCard({ result }: { result: MatchResult }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
            {result.rank}
          </span>
          <span className="text-xs font-medium text-subtle">{result.caseId}</span>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[result.status]}`}>
          {result.status}
        </span>
      </div>

      <div>
        <p className="text-sm text-subtle">{result.applicantAlias}</p>
        <h3 className="mt-0.5 font-semibold text-ink">{result.resourceTitle}</h3>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg">
          <div
            className="h-full rounded-full bg-brand"
            style={{ width: `${result.matchScore}%` }}
          />
        </div>
        <span className="text-sm font-bold text-brand-dark">{result.matchScore}%</span>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs font-medium text-subtle">추천 이유</p>
        <ul className="space-y-1 text-sm text-ink">
          {result.reasons.map((reason) => (
            <li key={reason} className="flex gap-1.5">
              <span className="text-brand">·</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {result.checks.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {result.checks.map((check) => (
            <Tag key={check} tone="coral">
              {check}
            </Tag>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button className="flex-1 rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark">
          연계 진행
        </button>
        <button className="flex-1 rounded-xl border border-line py-2.5 text-sm font-semibold text-ink transition hover:bg-bg">
          보류
        </button>
        <button className="flex-1 rounded-xl border border-line py-2.5 text-sm font-semibold text-ink transition hover:bg-bg">
          재추천
        </button>
      </div>
    </div>
  )
}
