import { SectionHeading } from '../../components/SectionHeading'
import { useAppData } from '../../context/AppDataContext'
import type { CareRequestStatus } from '../../data/types'

const statusStyle: Record<CareRequestStatus, string> = {
  '신규 접수': 'bg-coral-soft text-coral',
  검토중: 'bg-blue-soft text-blue',
  '지원 확정': 'bg-mint text-brand-dark',
}

export function CaseManagement() {
  const { careRequests } = useAppData()

  return (
    <div className="space-y-6">
      <SectionHeading title="대상자 관리" description="주민이 신청한 돌봄 요청을 확인하고 검토하세요" />

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
              className={`shrink-0 self-start rounded-full px-3 py-1 text-xs font-semibold sm:self-center ${statusStyle[request.status]}`}
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
    </div>
  )
}
