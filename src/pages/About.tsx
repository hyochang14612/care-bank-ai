import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { careIntro, careCycle, careLetters, problemPoints, problemNote, solutionPoints } from '../data/landing'

export function About() {
  return (
    <div className="space-y-12">
      <SectionHeading
        title="우리동네 통합돌봄 뱅크란?"
        description="지역 자원과 복지 욕구를 연결하는 우리 동네 돌봄 플랫폼을 소개합니다"
      />

      <section>
        <p className="rounded-2xl bg-surface p-5 text-sm leading-relaxed text-ink shadow-card">
          {careIntro}
        </p>
        <p className="mt-3 rounded-2xl bg-mint/60 p-5 text-sm leading-relaxed text-brand-dark">
          {careCycle}
        </p>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-6 text-white">
        <p className="text-xs font-semibold text-mint">CARE POINT</p>
        <h2 className="mt-1 text-lg font-bold">나눔이 다시 나에게 돌아와요</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          내가 등록한 자원이 연계되고 결과가 나오면 CARE POINT를 받을 수 있어요. 협약 지역 서비스
          이용, 복지관 프로그램 참여, 나눔 마켓 교환, 재기부까지 — 포인트로 다시 나눔을 이어갈 수
          있어요.
        </p>
        <Link
          to="/care-point"
          className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-mint"
        >
          CARE POINT 통장 보기 →
        </Link>
      </section>

      <section>
        <p className="text-xs font-semibold text-brand-dark">OUR VALUE</p>
        <h2 className="mt-1 text-xl font-bold text-ink">CARE BANK가 지키는 약속</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
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
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {problemPoints.map((p) => (
            <div key={p.title} className="rounded-2xl bg-surface p-5 shadow-card">
              <span className="text-xl">{p.icon}</span>
              <h3 className="mt-2 text-sm font-semibold text-ink">{p.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-subtle">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs font-semibold text-coral">LIMITATION</p>
        <h2 className="mt-1 text-xl font-bold text-ink">기존 지역 자원 연결의 한계</h2>
        <p className="mt-4 rounded-2xl bg-coral-soft px-5 py-4 text-sm leading-relaxed text-coral">
          {problemNote} 자원이 있어도 누구에게 필요한지 알기 어렵고, 연결까지 여러 단계를 거치며
          시간이 지체돼요.
        </p>
      </section>

      <section>
        <p className="text-xs font-semibold text-brand-dark">SOLVE</p>
        <h2 className="mt-1 text-xl font-bold text-ink">우리동네 통합돌봄 뱅크가 해결하는 방식</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <InfoCard icon="🏛️" title="용산구 복지관" body="지역 복지관 프로그램 안내" />
          <InfoCard icon="🚑" title="긴급돌봄 지원" body="위기가구 긴급 지원 제도" />
          <InfoCard icon="📋" title="복지 신청 절차" body="기초생활수급 등 신청 안내" />
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
