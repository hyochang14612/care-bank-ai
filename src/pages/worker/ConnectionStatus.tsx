import { SectionHeading } from '../../components/SectionHeading'
import { useAppData } from '../../context/AppDataContext'
import type { ConnectionStatus as ConnectionStatusType } from '../../data/types'

const statusStyle: Record<ConnectionStatusType, string> = {
  '연계 완료': 'bg-mint text-brand-dark',
  진행중: 'bg-blue-soft text-blue',
  '확인 필요': 'bg-coral-soft text-coral',
  보류: 'bg-bg text-subtle',
}

export function ConnectionStatus() {
  const { connections } = useAppData()

  return (
    <div className="space-y-6">
      <SectionHeading title="연계 현황" description="진행 중인 연계 사례를 한눈에 확인하세요" />

      <div className="space-y-3">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="flex flex-col gap-3 rounded-2xl bg-surface p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-sm font-semibold text-brand-dark">
                {connection.worker.slice(0, 1)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-subtle">{connection.caseId}</p>
                  {connection.id.startsWith('demo-') && (
                    <span className="rounded-full bg-coral-soft px-2 py-0.5 text-[10px] font-semibold text-coral">
                      방금 추가됨
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-ink">
                  {connection.applicantAlias} · {connection.resourceTitle}
                </h3>
                <p className="mt-0.5 text-sm text-subtle">{connection.note}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[connection.status]}`}
              >
                {connection.status}
              </span>
              <p className="text-xs text-subtle">
                {connection.updatedAt} · {connection.worker}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
