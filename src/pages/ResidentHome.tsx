import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ResourceCard } from '../components/ResourceCard'
import { SectionHeading } from '../components/SectionHeading'
import { useAppData } from '../context/AppDataContext'
import {
  heroBanners,
  careIntro,
  careLetters,
  problemPoints,
  problemNote,
  solutionPoints,
} from '../data/landing'
import { newsItems } from '../data/mock'

export function ResidentHome() {
  const { resources } = useAppData()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % heroBanners.length), 5000)
    return () => clearInterval(id)
  }, [])

  const banner = heroBanners[active]

  return (
    <div className="space-y-16">
      <section>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-dark px-6 py-12 text-white sm:px-14 sm:py-16">
          <p className="text-sm font-medium text-mint">{banner.eyebrow}</p>
          <h1 className="mt-3 max-w-xl whitespace-pre-line text-3xl font-bold leading-snug sm:text-4xl">
            {banner.message}
          </h1>
          <div className="mt-6 flex gap-3 text-2xl">
            {banner.icons.map((icon) => (
              <span
                key={icon}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15"
              >
                {icon}
              </span>
            ))}
          </div>

          <div className="relative mt-8 inline-flex items-center">
            <Link
              to={banner.ctaTo}
              className="relative inline-block rounded-full bg-white px-7 py-3.5 text-base font-bold text-brand-dark shadow-lg transition hover:bg-mint"
            >
              {banner.ctaLabel}
            </Link>
            <span className="absolute -right-2 -top-2 flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-75" />
              <span className="relative inline-flex h-5 w-5 rounded-full bg-coral" />
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {heroBanners.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setActive(i)}
              aria-label={`배너 ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-8 bg-brand' : 'w-2 bg-line'
              }`}
            />
          ))}
        </div>
      </section>

      <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-coral bg-coral-soft px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-lg font-bold text-ink">🌱 지금 등록하면 바로 이웃과 연결될 수 있어요!</p>
          <p className="mt-1 text-sm text-ink/70">1분이면 충분해요. 돈·재능·물품·시간·공간, 무엇이든 좋아요.</p>
        </div>
        <Link
          to="/register"
          className="shrink-0 rounded-full bg-coral px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-95"
        >
          1분만에 등록하기 →
        </Link>
      </div>

      <p className="flex items-center gap-2 rounded-2xl border border-mint bg-mint/60 px-4 py-3 text-sm text-brand-dark">
        <span className="text-base">🤝</span>
        등록된 자원은 사회복지사가 최종 확인 후 연계하여 안내드립니다.
      </p>

      <section>
        <SectionHeading
          title="우리동네 자원"
          description="지금 이웃들이 나누고 있는 동네 자원이에요"
          action={{ label: '전체보기', to: '/resources' }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.slice(0, 6).map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs font-semibold text-brand-dark">OUR VALUE</p>
        <h2 className="mt-1 text-xl font-bold text-ink">CARE BANK가 지키는 약속</h2>
        <p className="mt-3 max-w-3xl rounded-2xl bg-surface p-5 text-sm leading-relaxed text-ink shadow-card">
          {careIntro}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {careLetters.map((c) => (
            <div key={c.letter} className="rounded-2xl bg-surface p-5 text-center shadow-card">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-mint text-lg font-bold text-brand-dark">
                {c.letter}
              </span>
              <p className="mt-3 text-sm font-semibold text-ink">{c.word}</p>
              <p className="mt-1 text-xs text-subtle">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs font-semibold text-coral">PROBLEM</p>
        <h2 className="mt-1 text-xl font-bold text-ink">지역 돌봄 현장의 문제</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {problemPoints.map((p) => (
            <div key={p.title} className="rounded-2xl bg-surface p-5 shadow-card">
              <span className="text-xl">{p.icon}</span>
              <h3 className="mt-2 text-sm font-semibold text-ink">{p.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-subtle">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-coral-soft px-4 py-3 text-sm text-coral">{problemNote}</p>
      </section>

      <section>
        <p className="text-xs font-semibold text-brand-dark">SOLVE</p>
        <h2 className="mt-1 text-xl font-bold text-ink">사회복지사와 함께 만드는 새로운 연결</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {solutionPoints.map((s) => (
            <div key={s.title} className="rounded-2xl bg-mint p-5">
              <span className="text-xl">{s.icon}</span>
              <h3 className="mt-2 text-sm font-semibold text-brand-dark">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink/80">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs font-semibold text-blue">LOCAL INFO</p>
        <h2 className="mt-1 text-xl font-bold text-ink">우리지역 복지정보</h2>
        <p className="mt-1 text-sm text-subtle">
          공공데이터와 연계해 지역 복지 정보를 더 폭넓게 안내할 예정이에요 (준비 중)
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <InfoCard icon="🏛️" title="용산구 복지관" body="지역 복지관 프로그램 안내" />
          <InfoCard icon="🚑" title="긴급돌봄 지원" body="위기가구 긴급 지원 제도" />
          <InfoCard icon="📋" title="복지 신청 절차" body="기초생활수급 등 신청 안내" />
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

      <section className="rounded-[2rem] bg-surface p-10 text-center shadow-card">
        <h2 className="text-xl font-bold text-ink">우리 동네 주민이 함께 만드는 돌봄 플랫폼</h2>
        <p className="mt-2 text-sm text-subtle">지금 바로 나눔을 시작해보세요</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/register"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            자원 등록하기
          </Link>
          <Link
            to="/request"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:bg-bg"
          >
            돌봄 신청하기
          </Link>
        </div>
      </section>
    </div>
  )
}

function InfoCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface p-5">
      <span className="text-xl">{icon}</span>
      <h3 className="mt-2 text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-xs text-subtle">{body}</p>
    </div>
  )
}
