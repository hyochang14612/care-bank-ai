import { StatCard } from '../../components/StatCard'
import { SectionHeading } from '../../components/SectionHeading'
import { useAppData } from '../../context/AppDataContext'
import { dailyStats } from '../../data/mock'
import type { ResourceType } from '../../data/types'

const resourceTypes: ResourceType[] = ['물품 나눔', '재능 나눔', '시간 나눔', '공간 나눔']

export function Stats() {
  const { connections, resources } = useAppData()

  const typeCounts = resourceTypes.map((type) => ({
    type,
    count: resources.filter((r) => r.resourceType === type).length,
  }))
  const maxTypeCount = Math.max(...typeCounts.map((t) => t.count), 1)

  const statusCounts = ['연계 완료', '진행중', '확인 필요', '보류'].map((status) => ({
    status,
    count: connections.filter((c) => c.status === status).length,
  }))
  const maxStatusCount = Math.max(...statusCounts.map((s) => s.count), 1)

  return (
    <div className="space-y-8">
      <SectionHeading title="통계" description="우리 지역 나눔 현황을 한눈에 확인하세요" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {dailyStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <section className="rounded-3xl bg-surface p-6 shadow-card">
        <h3 className="mb-4 text-sm font-bold text-ink">자원 유형별 등록 현황</h3>
        <div className="space-y-3">
          {typeCounts.map((t) => (
            <div key={t.type}>
              <div className="mb-1 flex justify-between text-xs text-subtle">
                <span>{t.type}</span>
                <span className="font-medium text-ink">{t.count}건</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-bg">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${(t.count / maxTypeCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-surface p-6 shadow-card">
        <h3 className="mb-4 text-sm font-bold text-ink">연계 진행 상태</h3>
        <div className="space-y-3">
          {statusCounts.map((s) => (
            <div key={s.status}>
              <div className="mb-1 flex justify-between text-xs text-subtle">
                <span>{s.status}</span>
                <span className="font-medium text-ink">{s.count}건</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-bg">
                <div
                  className="h-full rounded-full bg-blue"
                  style={{ width: `${(s.count / maxStatusCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
