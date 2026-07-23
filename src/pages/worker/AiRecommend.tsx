import { Link } from 'react-router-dom'
import { StatCard } from '../../components/StatCard'
import { GradeBadge } from '../../components/GradeBadge'
import { NoticeBadge } from '../../components/NoticeBadge'
import { SectionHeading } from '../../components/SectionHeading'
import { dailyStats, matchResults } from '../../data/mock'

export function AiRecommend() {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeading title="AI 추천" description="AI가 오늘 분석한 지역 자원-대상자 매칭 현황이에요" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {dailyStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      <NoticeBadge />

      <section>
        <SectionHeading
          title="최근 AI 추천 결과"
          description="적합도 순으로 정리했어요. 최종 승인은 매칭 승인 화면에서 진행하세요"
          action={{ label: '매칭 승인으로 이동', to: '/worker/approve' }}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {matchResults.map((result) => (
            <div key={result.caseId} className="rounded-2xl bg-surface p-5 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-subtle">{result.caseId}</span>
                <GradeBadge grade={result.grade} size="sm" />
              </div>
              <p className="mt-2 text-sm text-subtle">{result.applicantAlias}</p>
              <h3 className="font-semibold text-ink">{result.resourceTitle}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-surface p-6 text-center shadow-card">
        <p className="text-sm text-subtle">신규 돌봄 신청도 확인해보세요</p>
        <Link
          to="/worker/cases"
          className="mt-3 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          대상자 관리로 이동
        </Link>
      </section>
    </div>
  )
}
