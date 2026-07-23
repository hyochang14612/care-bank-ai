import { Link } from 'react-router-dom'
import { StatCard } from '../components/StatCard'
import { ResourceCard } from '../components/ResourceCard'
import { NoticeBadge } from '../components/NoticeBadge'
import { SectionHeading } from '../components/SectionHeading'
import { dailyStats, resources, newsItems } from '../data/mock'

export function ResidentHome() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-dark px-6 py-8 text-white sm:px-10 sm:py-10">
        <p className="text-sm font-medium text-mint">안녕하세요, 이웃님 👋</p>
        <h1 className="mt-2 max-w-xl text-2xl font-bold leading-snug sm:text-3xl">
          오늘도 우리 동네 어딘가에서
          <br />
          작은 나눔이 이어지고 있어요.
        </h1>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/register"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-mint"
          >
            자원 등록하기
          </Link>
          <Link
            to="/request"
            className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            돌봄 신청하기
          </Link>
        </div>
      </section>

      <section>
        <SectionHeading title="이번 달 우리 동네 나눔" description="우리 동네 나눔이 쌓여가는 모습이에요" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {dailyStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      <NoticeBadge />

      <section>
        <SectionHeading
          title="우리동네 자원"
          description="지금 나눌 수 있는 동네 자원을 둘러보세요"
          action={{ label: '전체보기', to: '/resources' }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.slice(0, 3).map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title="나눔 이야기"
          description="우리 동네 나눔이 만든 변화예요"
          action={{ label: '더보기', to: '/stories' }}
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {newsItems.map((item) => (
            <div key={item.id} className="rounded-2xl bg-surface p-5 shadow-card">
              <span className="text-xl">{item.icon}</span>
              <h3 className="mt-2 text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-subtle">{item.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
