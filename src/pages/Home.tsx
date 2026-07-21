import { Link } from 'react-router-dom'
import { StatCard } from '../components/StatCard'
import { ResourceCard } from '../components/ResourceCard'
import { MatchCard } from '../components/MatchCard'
import { NoticeBadge } from '../components/NoticeBadge'
import { SectionHeading } from '../components/SectionHeading'
import { dailyStats, resources, matchResults } from '../data/mock'

export function Home() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-dark px-6 py-8 text-white sm:px-10 sm:py-10">
        <p className="text-sm font-medium text-mint">우리동네 통합돌봄 뱅크</p>
        <h1 className="mt-2 max-w-xl text-2xl font-bold leading-snug sm:text-3xl">
          동네의 나눔자원을 필요한 이웃에게
          <br />더 빠르고 따뜻하게 연결합니다.
        </h1>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/market"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-mint"
          >
            자원마켓 둘러보기
          </Link>
          <Link
            to="/matching"
            className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            AI 매칭 결과 보기
          </Link>
          <Link
            to="/demo"
            className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          >
            🎬 라이브 데모 체험하기
          </Link>
        </div>
      </section>

      <Link
        to="/demo"
        className="flex items-center justify-between gap-4 rounded-3xl border border-coral-soft bg-coral-soft/60 px-5 py-4 transition hover:bg-coral-soft sm:px-6"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-coral text-lg text-white">
            🎬
          </span>
          <div>
            <p className="font-semibold text-ink">후원자 등록 → AI 매칭 → 대상자 연결 → 포인트 적립</p>
            <p className="text-sm text-subtle">전체 나눔 흐름을 직접 눌러보며 체험해보세요</p>
          </div>
        </div>
        <span className="shrink-0 text-sm font-semibold text-coral">시작하기 →</span>
      </Link>

      <section>
        <SectionHeading title="오늘의 나눔 현황" description="실시간으로 업데이트되는 우리 지역 나눔 지표예요" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {dailyStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      <NoticeBadge />

      <section>
        <SectionHeading
          title="추천 자원"
          description="AI가 오늘 이웃에게 소개하면 좋을 지역 자원을 골라봤어요"
          action={{ label: '자원마켓 전체보기', to: '/market' }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.slice(0, 3).map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title="AI 매칭 결과"
          description="사례와 자원을 분석해 적합도 순으로 추천했어요"
          action={{ label: 'AI 매칭 전체보기', to: '/matching' }}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {matchResults.map((result) => (
            <MatchCard key={result.caseId} result={result} />
          ))}
        </div>
      </section>
    </div>
  )
}
