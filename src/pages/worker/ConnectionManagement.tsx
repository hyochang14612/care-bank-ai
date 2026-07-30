import { SectionHeading } from '../../components/SectionHeading'
import { useAppData } from '../../context/AppDataContext'
import type { CareRequestStatus, ConnectionStatus } from '../../data/types'

const requestStatusStyle: Record<CareRequestStatus, string> = {
  '신규 접수': 'bg-coral-soft text-coral',
  검토중: 'bg-blue-soft text-blue',
  '지원 확정': 'bg-mint text-brand-dark',
}

const connectionStatusStyle: Record<ConnectionStatus, string> = {
  '연계 완료': 'bg-mint text-brand-dark',
  진행중: 'bg-blue-soft text-blue',
  '확인 필요': 'bg-coral-soft text-coral',
  보류: 'bg-bg text-subtle',
}

export function ConnectionManagement() {
  const { careRequests, connections } = useAppData()

  return (
    <div className="space-y-10">
      <SectionHeading title="연계관리" description="돌봄 신청을 검토하고 연계 현황을 확인하세요" />

      <section>
        <h3 className="mb-1 text-sm font-bold text-ink">돌봄 신청 검토</h3>
        <p className="mb-3 text-xs text-subtle">
          심사 기준: 사회복지사 판단 · 지원 필요 · 돌봄 공백 · 지역사회 서비스 연계 여부
        </p>
        <div className="space-y-3">
          {careRequests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col gap-3 rounded-2xl bg-surface p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-subtle">{request.submittedAt} 접수</p>
                  {request.id.startsWith('req-') && (
                    <span className="rounded-full bg-coral-soft px-2 py-0.5 text-[10px] font-semibold text-coral">
                      방금 접수됨
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-ink">
                  {request.name} · {request.needType}
                </h3>
                <p className="mt-0.5 text-sm text-subtle">{request.detail}</p>
                <p className="mt-1 text-xs text-subtle">
                  {request.location} · 연락 가능 시간 {request.contactTime}
                </p>
              </div>

              <span
                className={`shrink-0 self-start rounded-full px-3 py-1 text-xs font-semibold sm:self-center ${requestStatusStyle[request.status]}`}
              >
                {request.status}
              </span>
            </div>
          ))}

          {careRequests.length === 0 && (
            <p className="rounded-2xl bg-surface p-8 text-center text-sm text-subtle shadow-card">
              아직 접수된 돌봄 신청이 없어요.
            </p>
          )}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-bold text-ink">연계 현황</h3>
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
                    {(connection.id.startsWith('demo-') || connection.id.startsWith('pm-')) && (
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
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${connectionStatusStyle[connection.status]}`}
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
      </section>
    </div>
  )
}
