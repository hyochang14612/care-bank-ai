import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'

const needQuoteExample = '혼자 생활하면서 식사를 챙기기 어렵고 병원 방문도 힘듭니다.'
const hiddenNeeds = ['식생활 지원 욕구', '이동 지원 욕구', '정서적 지원 욕구']

const beforeSteps = ['사회복지사가 대상자의 욕구 확인', '지역 자원 검색', '적합한 서비스 탐색', '연계 결정']
const beforeProblems = [
  '지역 자원 정보가 흩어져 있음',
  '욕구와 자원 비교에 시간이 많이 필요함',
  '다양한 표현 속 숨은 욕구 발견이 어려움',
]
const aiRoles = ['대상자 욕구 분석', '자원 내용 분석 및 자동 분류', '적합한 자원 추천', '추천 이유 제시']

const processSteps = [
  {
    icon: '🧺',
    title: '지역주민 자원 등록',
    body: '주민이 가진 물품·재능·시간·공간을 등록합니다.',
  },
  {
    icon: '🧑‍💼',
    title: '사회복지사 확인',
    body: '등록된 자원은 사회복지사가 확인하고 지역 돌봄 자원으로 관리합니다.',
  },
  {
    icon: '✨',
    title: 'AI 기반 자원 분석 및 추천',
    body: 'AI가 등록된 자원 정보와 저장된 대상자의 돌봄 욕구 데이터를 분석하여 적합한 연결 후보를 추천합니다.',
  },
  {
    icon: '🤝',
    title: '사회복지사 최종 검토 및 연계',
    body: '사회복지사가 AI 추천 결과와 대상자의 상황을 확인하고 최종 연결합니다.',
  },
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

export function AiChallenge() {
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
          description="지역 주민이 가진 자원을 등록하고, AI 기반 분석을 통해 필요한 이웃과 연결되는 과정을 확인합니다."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <div key={step.title} className="relative rounded-3xl bg-surface p-5 shadow-card">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint text-sm font-bold text-brand-dark">
                {i + 1}
              </span>
              <span className="mt-3 block text-2xl">{step.icon}</span>
              <h3 className="mt-2 text-sm font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-subtle">{step.body}</p>
              {i !== processSteps.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-lg text-line lg:block">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 rounded-3xl bg-gradient-to-br from-brand to-brand-dark px-6 py-10 text-center text-white">
          <Link
            to="/register"
            className="rounded-full bg-white px-10 py-4 text-lg font-bold text-brand-dark shadow-lg transition hover:bg-mint"
          >
            자원 등록하기
          </Link>
          <p className="text-sm text-white/85">내가 가진 작은 자원이 필요한 이웃에게 연결됩니다.</p>
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
          AI는 지역의 자원과 돌봄 욕구를 더 빠르고 정확하게 연결하여, 사회복지사의 전문적인 판단을
          강화합니다.
        </p>
      </section>
    </div>
  )
}
