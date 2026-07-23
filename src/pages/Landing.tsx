import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroBanners, careLetters, problemPoints, problemNote, solutionPoints } from '../data/landing'
import { newsItems } from '../data/mock'

export function Landing() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % heroBanners.length), 5000)
    return () => clearInterval(id)
  }, [])

  const banner = heroBanners[active]

  return (
    <div className="min-h-svh bg-bg">
      <header className="border-b border-line bg-surface/90 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-lg text-white">
              🌿
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-tight text-ink sm:text-base">
                우리동네 통합돌봄 뱅크
              </p>
              <p className="truncate text-[11px] leading-tight text-subtle">Community Care Bank</p>
            </div>
          </div>
          <Link
            to="/worker"
            className="shrink-0 whitespace-nowrap rounded-full border border-line px-3 py-2 text-xs font-medium text-subtle transition hover:bg-bg hover:text-ink sm:px-4 sm:text-sm"
          >
            사회복지사 로그인
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-5 py-10 sm:px-8">
        <section>
          <p className="mx-auto max-w-md text-center text-sm font-medium text-subtle">
            AI로 지역 자원과 복지 욕구를 연결하는
            <br />
            우리동네 돌봄 연결 플랫폼
          </p>

          <div className="relative mt-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-dark px-6 py-12 text-white sm:px-14 sm:py-16">
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
            <Link
              to={banner.ctaTo}
              className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-mint"
            >
              {banner.ctaLabel}
            </Link>
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

        <section>
          <p className="text-xs font-semibold text-brand-dark">OUR VALUE</p>
          <h2 className="mt-1 text-xl font-bold text-ink">CARE BANK가 지키는 약속</h2>
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
          <h2 className="mt-1 text-xl font-bold text-ink">AI와 사회복지사가 만드는 새로운 연결</h2>
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
          <p className="text-xs font-semibold text-coral">STORY</p>
          <h2 className="mt-1 text-xl font-bold text-ink">나눔 이야기</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {newsItems.map((n) => (
              <div key={n.id} className="rounded-2xl bg-surface p-5 shadow-card">
                <span className="text-xl">{n.icon}</span>
                <h3 className="mt-2 text-sm font-semibold text-ink">{n.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-subtle">{n.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-surface p-10 text-center shadow-card">
          <h2 className="text-xl font-bold text-ink">우리 동네 주민이 함께 만드는 돌봄 플랫폼</h2>
          <p className="mt-2 text-sm text-subtle">지금 바로 시작해보세요</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/resident"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              주민으로 이용하기
            </Link>
            <Link
              to="/worker"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:bg-bg"
            >
              사회복지사 로그인
            </Link>
          </div>
        </section>
      </main>
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
