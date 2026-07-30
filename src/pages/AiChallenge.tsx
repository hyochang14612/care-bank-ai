import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { Stepper } from '../components/Stepper'

const needQuoteExample = '혼자 생활하면서 식사를 챙기기 어렵고 병원 방문도 힘듭니다.'
const hiddenNeeds = ['식생활 지원 욕구', '이동 지원 욕구', '정서적 지원 욕구']

const beforeSteps = ['사회복지사가 대상자의 욕구 확인', '지역 자원 검색', '적합한 서비스 탐색', '연계 결정']
const beforeProblems = [
  '지역 자원 정보가 흩어져 있음',
  '욕구와 자원 비교에 시간이 많이 필요함',
  '다양한 표현 속 숨은 욕구 발견이 어려움',
]
const aiRoles = ['대상자 욕구 분석', '자원 내용 분석 및 자동 분류', '적합한 자원 추천', '추천 이유 제시']

const demoSteps = [
  { label: '욕구 등록', icon: '📝' },
  { label: 'AI 욕구 분석', icon: '🔍' },
  { label: '자원 분석·추천', icon: '🤝' },
  { label: '최종 연계', icon: '✅' },
]

const futurePlans = [
  {
    title: 'AI 기반 자원 자동 분류',
    body: '주민과 기관이 등록한 자원 내용을 분석하여 유형·대상·활용 분야를 자동 정리',
  },
  {
    title: 'AI 기반 욕구 분석 지원',
    body: '사회복지사가 기록한 상담 내용을 분석하여 복합적인 욕구 파악 지원',
  },
  {
    title: '사회복지 업무 지원',
    body: '연계 기록 정리, 서비스 결과 요약, 사례관리 업무 지원',
  },
]

const defaultNeedInput = '독거 상태이며 외출이 어렵고,\n식사를 챙기는 데 어려움이 있습니다.'

export function AiChallenge() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [needInput, setNeedInput] = useState(defaultNeedInput)

  const advance = (next: number, delay = 1200) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(next)
    }, delay)
  }

  const reset = () => {
    setStep(1)
    setLoading(false)
  }

  return (
    <div className="space-y-16">
      <section className="space-y-3">
        <p className="text-xs font-bold tracking-wide text-coral">AI CHALLENGE PROTOTYPE</p>
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">AI 기반 통합돌봄 연결 프로토타입</h1>
        <p className="max-w-2xl text-base leading-relaxed text-subtle">
          지역 안에 존재하는 다양한 자원과 주민의 돌봄 욕구를 AI가 분석하고, 사회복지사가 최종
          판단하여 연결하는 통합돌봄 지원 플랫폼입니다.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="whitespace-pre-line text-2xl font-extrabold leading-snug text-ink sm:text-3xl">
          {'통합돌봄 시대,\n지역 안의 연결이 필요합니다.'}
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-ink">
          <p className="rounded-2xl bg-surface p-5 shadow-card">
            2026년 돌봄통합지원법 시행으로 주민이 시설이 아닌 살던 지역에서 계속 살아갈 수 있도록
            지역 중심 통합돌봄 체계의 중요성이 높아지고 있습니다.
          </p>
          <p className="rounded-2xl bg-surface p-5 shadow-card">
            하지만 지역 곳곳에는 활용 가능한 다양한 자원(물품·재능·시간·공간)이 존재함에도, 필요한
            주민에게 적시에 연결되는 과정은 여전히 사회복지사의 경험과 수작업에 의존하고 있습니다.
          </p>
          <p className="rounded-2xl bg-surface p-5 shadow-card">
            특히 주민의 돌봄 욕구는 단순한 키워드만으로 파악하기 어렵습니다.
          </p>
        </div>

        <div className="rounded-3xl bg-coral-soft p-6">
          <p className="text-sm text-subtle">예시 상담 문장</p>
          <p className="mt-2 text-lg font-semibold leading-relaxed text-coral">
            &ldquo;{needQuoteExample}&rdquo;
          </p>
          <p className="mt-4 text-sm text-ink">이 한 문장 안에는 아래와 같은 복합적인 욕구가 포함될 수 있습니다.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {hiddenNeeds.map((need) => (
              <span
                key={need}
                className="rounded-full bg-surface px-4 py-2 text-sm font-semibold text-coral shadow-card"
              >
                {need}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          AI는 복잡한 돌봄 연결 과정을 지원합니다.
        </h2>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl bg-surface p-6 shadow-card">
            <p className="text-xs font-bold text-subtle">기존 과정</p>
            <div className="mt-3 space-y-2">
              {beforeSteps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg text-xs font-semibold text-subtle">
                    {i + 1}
                  </span>
                  <span className="text-sm text-ink">{s}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-bold text-coral">문제</p>
            <ul className="mt-2 space-y-1.5 text-sm text-subtle">
              {beforeProblems.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-coral">·</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-mint p-6">
            <p className="text-xs font-bold text-brand-dark">AI 활용 후</p>
            <p className="mt-3 text-sm leading-relaxed text-ink">
              사회복지사가 등록한 대상자의 욕구 정보와 지역 내 등록된 자원 정보를 AI가 분석합니다.
            </p>
            <p className="mt-4 text-xs font-bold text-brand-dark">AI 역할</p>
            <div className="mt-2 space-y-2">
              {aiRoles.map((role, i) => (
                <div key={role} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-ink">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-sm font-semibold text-ink">
            AI가 대상자를 판단하거나 서비스를 결정하지 않습니다.
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-subtle">
            AI는 사회복지사의 연결 판단을 지원하는 보조 도구이며, 최종 연계 여부는 사회복지사가
            결정합니다.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          title="자원등록 및 연계 프로토타입 진행하기"
          description="아래 버튼을 눌러 사회복지사 욕구 등록부터 최종 연계까지 직접 진행해보세요"
        />

        <div className="rounded-3xl bg-surface p-6 shadow-card">
          <Stepper steps={demoSteps} current={step} />

          <div className="mt-8">
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm font-bold text-ink">Step 1. 대상자 욕구 등록</p>
                <p className="text-xs text-subtle">사회복지사 입력 화면 · 대상자 상황을 기록해주세요</p>
                <textarea
                  className="input min-h-24 resize-none"
                  value={needInput}
                  onChange={(e) => setNeedInput(e.target.value)}
                />
                <button
                  onClick={() => advance(2)}
                  disabled={loading}
                  className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60 sm:w-auto sm:px-6"
                >
                  {loading ? 'AI가 욕구를 분석하고 있어요…' : 'AI 욕구 분석하기'}
                </button>
              </div>
            )}

            {step === 2 && !loading && (
              <div className="space-y-4">
                <p className="text-sm font-bold text-ink">Step 2. AI 욕구 분석 결과</p>
                <div className="rounded-2xl bg-mint p-5">
                  <p className="text-xs font-bold text-brand-dark">주요 욕구</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['식생활 지원', '이동 지원', '정서 지원 가능성'].map((n) => (
                      <span
                        key={n}
                        className="rounded-full bg-surface px-3.5 py-1.5 text-sm font-semibold text-brand-dark shadow-card"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 rounded-xl bg-surface p-4 text-sm leading-relaxed text-ink">
                    &ldquo;대상자의 상황에서 식생활 지원과 생활 지원 서비스 연결 가능성이
                    높습니다.&rdquo;
                  </p>
                </div>
                <button
                  onClick={() => advance(3)}
                  disabled={loading}
                  className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60 sm:w-auto sm:px-6"
                >
                  등록 자원 분석하기 →
                </button>
              </div>
            )}

            {step === 3 && !loading && (
              <div className="space-y-4">
                <p className="text-sm font-bold text-ink">Step 3. 등록 자원 분석 및 추천</p>
                <div className="rounded-2xl bg-bg p-5">
                  <p className="text-xs font-bold text-subtle">등록된 자원</p>
                  <p className="mt-1.5 text-sm font-medium text-ink">
                    &ldquo;월 2회 어르신 무료 이미용 서비스를 제공합니다.&rdquo;
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-surface p-4">
                      <p className="text-xs font-bold text-blue">AI 분석</p>
                      <p className="mt-1.5 text-sm text-ink">자원 유형: <strong>재능 나눔</strong></p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {['#이미용지원', '#어르신돌봄', '#생활지원'].map((tag) => (
                          <span key={tag} className="rounded-full bg-blue-soft px-2.5 py-1 text-xs font-medium text-blue">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl bg-surface p-4">
                      <p className="text-xs font-bold text-brand-dark">AI 추천 결과</p>
                      <p className="mt-1.5 text-sm font-semibold text-ink">추천 자원: 이미용 재능 나눔</p>
                      <ul className="mt-2 space-y-1 text-xs text-subtle">
                        <li>✅ 대상 적합성</li>
                        <li>✅ 지역 적합성</li>
                        <li>✅ 서비스 유형 적합성</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => advance(4)}
                  disabled={loading}
                  className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60 sm:w-auto sm:px-6"
                >
                  사회복지사에게 연계 요청하기 →
                </button>
              </div>
            )}

            {step === 4 && !loading && (
              <div className="space-y-5">
                <p className="text-sm font-bold text-ink">Step 4. 사회복지사 최종 연계</p>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-bg p-6">
                  {['AI 추천', '사회복지사 검토', '서비스 연계 완료'].map((label, i, arr) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold ${
                            i === arr.length - 1 ? 'bg-brand text-white' : 'bg-mint text-brand-dark'
                          }`}
                        >
                          {i === arr.length - 1 ? '✓' : i + 1}
                        </div>
                        <span className="whitespace-nowrap text-xs font-medium text-ink">{label}</span>
                      </div>
                      {i !== arr.length - 1 && <span className="text-line">→</span>}
                    </div>
                  ))}
                </div>
                <p className="rounded-2xl bg-mint px-5 py-4 text-center text-sm font-medium text-brand-dark">
                  AI는 연결 가능성을 분석하고, 최종 판단과 책임은 사회복지사가 수행합니다.
                </p>
                <button
                  onClick={reset}
                  className="w-full rounded-xl border border-line py-3 text-sm font-semibold text-ink transition hover:bg-bg sm:w-auto sm:px-6"
                >
                  처음부터 다시 보기
                </button>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <span className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-mint text-2xl">
                  🔍
                </span>
                <p className="text-sm font-medium text-subtle">AI가 데이터를 분석하고 있어요…</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-3xl bg-surface p-6 shadow-card sm:p-8">
        <div>
          <p className="text-xs font-bold text-blue">향후 발전 방향</p>
          <h2 className="mt-1 text-xl font-bold text-ink">AI 활용 확장 계획</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {futurePlans.map((plan, i) => (
            <div key={plan.title} className="rounded-2xl bg-bg p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-soft text-sm font-bold text-blue">
                {i + 1}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-ink">{plan.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-subtle">{plan.body}</p>
            </div>
          ))}
        </div>
        <p className="rounded-2xl bg-mint px-5 py-4 text-sm font-medium text-brand-dark">
          AI는 사회복지사를 대체하는 것이 아니라, 현장의 판단과 연결을 지원하는 기술입니다.
        </p>
      </section>
    </div>
  )
}
