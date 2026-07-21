import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { Stepper } from '../components/Stepper'
import { NoticeBadge } from '../components/NoticeBadge'
import { Tag } from '../components/Tag'
import { AiMatchingVisual } from '../components/AiMatchingVisual'
import { useAppData } from '../context/AppDataContext'
import type { ResourceCategory } from '../data/types'

const categories: { value: ResourceCategory; icon: string }[] = [
  { value: '위생관리', icon: '💇' },
  { value: '식생활', icon: '🍱' },
  { value: '이동지원', icon: '🚗' },
  { value: '주거환경', icon: '🔧' },
  { value: '정서지원', icon: '💬' },
  { value: '교육문화', icon: '📚' },
]

const demoCase = {
  caseId: 'CASE-2026-0501',
  alias: '이○○ 어르신 (79세)',
  need: '정서 지원 및 위생관리 필요, 독거 · 거동 다소 불편',
}

const steps = [
  { label: '후원자 등록', icon: '🙋' },
  { label: 'AI 매칭', icon: '✨' },
  { label: '대상자 연결', icon: '🤝' },
  { label: '포인트 적립', icon: '💚' },
]

function todayLabel() {
  const now = new Date()
  return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`
}

export function Demo() {
  const { addConnection, addPointRecord } = useAppData()
  const [step, setStep] = useState(1)
  const [runId, setRunId] = useState(() => `${Date.now()}`)

  const [donor, setDonor] = useState({
    name: '청년나눔단 이○○',
    category: '위생관리' as ResourceCategory,
    resourceTitle: '동행 목욕 봉사 3회',
    location: '효창동',
    quantity: 3,
    availableTime: '주말 오전',
  })

  const [matching, setMatching] = useState(false)
  const [checklist, setChecklist] = useState({ guardian: false, schedule: false })
  const [connected, setConnected] = useState(false)
  const [pointsAwarded, setPointsAwarded] = useState(false)

  const factors = [
    { label: '지역 근접성', value: donor.location.includes('효창') ? 95 : 82 },
    { label: '시간 일치도', value: /주말|오전/.test(donor.availableTime) ? 90 : 84 },
    { label: '욕구 일치도', value: ['위생관리', '정서지원'].includes(donor.category) ? 94 : 78 },
    { label: '자원 신뢰도', value: 88 },
  ]
  const matchScore = Math.round(factors.reduce((sum, f) => sum + f.value, 0) / factors.length)
  const points = Math.min(200, 80 + donor.quantity * 10)
  const categoryIcon = categories.find((c) => c.value === donor.category)?.icon ?? '💚'

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (step === 2 && !connected) {
      setMatching(true)
      timerRef.current = setTimeout(() => setMatching(false), 1300)
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }
  }, [step, connected])

  const startMatching = () => {
    setStep(2)
  }

  const confirmConnection = () => {
    addConnection({
      id: `demo-${runId}`,
      caseId: demoCase.caseId,
      applicantAlias: demoCase.alias,
      resourceTitle: donor.resourceTitle,
      worker: '정사회복지사',
      status: '연계 완료',
      updatedAt: '방금 전',
      note: `${donor.name}님이 등록한 '${donor.resourceTitle}' 자원과 AI 매칭 후 연계 완료`,
    })
    setConnected(true)
    setStep(4)
  }

  const awardPoints = () => {
    addPointRecord({
      id: `demo-${runId}`,
      title: `${donor.name}님의 나눔 - ${donor.resourceTitle}`,
      type: '나눔 실천',
      date: todayLabel(),
      points,
      memo: `이웃 1명에게 '${donor.resourceTitle}' 자원을 나눠주셨어요`,
      icon: categoryIcon,
    })
    setPointsAwarded(true)
  }

  const restart = () => {
    setRunId(`${Date.now()}`)
    setStep(1)
    setMatching(false)
    setChecklist({ guardian: false, schedule: false })
    setConnected(false)
    setPointsAwarded(false)
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="라이브 데모"
        description="후원자 등록부터 포인트 적립까지, 실제 서비스 흐름을 직접 체험해보세요"
      />

      <div className="rounded-3xl bg-surface p-5 shadow-card sm:p-6">
        <Stepper steps={steps} current={Math.min(step, 4)} />
      </div>

      {step === 1 && (
        <div className="space-y-5 rounded-3xl bg-surface p-6 shadow-card">
          <div>
            <h3 className="font-bold text-ink">1. 후원자 등록</h3>
            <p className="mt-1 text-sm text-subtle">
              나눔 가능한 자원을 등록해주세요. 값은 자유롭게 바꿔보실 수 있어요.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="후원자 / 단체명">
              <input
                className="input"
                value={donor.name}
                onChange={(e) => setDonor({ ...donor, name: e.target.value })}
              />
            </Field>
            <Field label="자원 분류">
              <select
                className="input"
                value={donor.category}
                onChange={(e) => setDonor({ ...donor, category: e.target.value as ResourceCategory })}
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.icon} {c.value}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="나눔 자원명">
              <input
                className="input"
                value={donor.resourceTitle}
                onChange={(e) => setDonor({ ...donor, resourceTitle: e.target.value })}
              />
            </Field>
            <Field label="지역">
              <input
                className="input"
                value={donor.location}
                onChange={(e) => setDonor({ ...donor, location: e.target.value })}
              />
            </Field>
            <Field label="나눔 가능 수량">
              <input
                type="number"
                min={1}
                max={20}
                className="input"
                value={donor.quantity}
                onChange={(e) => setDonor({ ...donor, quantity: Number(e.target.value) || 1 })}
              />
            </Field>
            <Field label="나눔 가능 시간">
              <input
                className="input"
                value={donor.availableTime}
                onChange={(e) => setDonor({ ...donor, availableTime: e.target.value })}
              />
            </Field>
          </div>

          <button
            onClick={startMatching}
            className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark sm:w-auto sm:px-6"
          >
            등록하고 AI 매칭 시작하기 →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 rounded-3xl bg-surface p-6 shadow-card">
          <div>
            <h3 className="font-bold text-ink">2. AI 매칭</h3>
            <p className="mt-1 text-sm text-subtle">
              {matching
                ? `등록하신 '${donor.resourceTitle}' 자원과 어울리는 이웃을 찾고 있어요...`
                : '사례와 자원을 분석해 가장 적합한 이웃을 찾았어요'}
            </p>
          </div>

          <AiMatchingVisual factors={factors} score={matchScore} analyzing={matching} />

          {!matching && (
            <>
              <div className="rounded-2xl bg-bg p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-subtle">{demoCase.caseId}</span>
                  <span className="rounded-full bg-blue-soft px-2.5 py-1 text-xs font-semibold text-blue">
                    확인 대기
                  </span>
                </div>
                <p className="mt-2 text-sm text-subtle">{demoCase.alias}</p>
                <h4 className="mt-0.5 font-semibold text-ink">{donor.resourceTitle}</h4>

                <div className="mt-4 space-y-1.5">
                  <p className="text-xs font-medium text-subtle">추천 이유</p>
                  <ul className="space-y-1 text-sm text-ink">
                    <li className="flex gap-1.5">
                      <span className="text-brand">·</span>
                      등록하신 '{donor.resourceTitle}' 자원이 {demoCase.alias}님의 욕구와 일치해요
                    </li>
                    <li className="flex gap-1.5">
                      <span className="text-brand">·</span>
                      {donor.location} 지역 자원이라 이동 부담이 적어요
                    </li>
                    <li className="flex gap-1.5">
                      <span className="text-brand">·</span>
                      나눔 가능 시간({donor.availableTime})과 방문 가능 시간이 맞아요
                    </li>
                  </ul>
                </div>

                <div className="mt-3">
                  <Tag tone="coral">보호자 동의 여부 확인 필요</Tag>
                </div>
              </div>

              <NoticeBadge />

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  대상자 확정하고 다음 단계로 →
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="rounded-xl border border-line px-4 text-sm font-semibold text-ink transition hover:bg-bg"
                >
                  이전으로
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5 rounded-3xl bg-surface p-6 shadow-card">
          <div>
            <h3 className="font-bold text-ink">3. 대상자 연결 (사회복지사 최종 확인)</h3>
            <p className="mt-1 text-sm text-subtle">
              AI는 추천만 합니다. 아래 확인 후 사회복지사가 직접 연계를 확정해요.
            </p>
          </div>

          <div className="rounded-2xl bg-bg p-5 text-sm">
            <p className="font-semibold text-ink">
              {demoCase.alias} · {donor.resourceTitle}
            </p>
            <p className="mt-1 text-subtle">{demoCase.need}</p>
            <p className="mt-1 text-brand-dark">AI 적합도 {matchScore}%</p>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 rounded-xl border border-line p-3 text-sm">
              <input
                type="checkbox"
                checked={checklist.guardian}
                onChange={(e) => setChecklist({ ...checklist, guardian: e.target.checked })}
                className="h-4 w-4 accent-brand"
              />
              보호자 동의를 확인했어요
            </label>
            <label className="flex items-center gap-2.5 rounded-xl border border-line p-3 text-sm">
              <input
                type="checkbox"
                checked={checklist.schedule}
                onChange={(e) => setChecklist({ ...checklist, schedule: e.target.checked })}
                className="h-4 w-4 accent-brand"
              />
              방문 일정을 조율했어요
            </label>
          </div>

          <NoticeBadge />

          <div className="flex gap-2">
            <button
              onClick={confirmConnection}
              disabled={!checklist.guardian}
              className="flex-1 rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-subtle"
            >
              연계 확정하기 →
            </button>
            <button
              onClick={() => setStep(2)}
              className="rounded-xl border border-line px-4 text-sm font-semibold text-ink transition hover:bg-bg"
            >
              이전으로
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5 rounded-3xl bg-surface p-6 shadow-card">
          {!pointsAwarded ? (
            <>
              <div className="flex flex-col items-center gap-2 py-4 text-center">
                <span className="text-3xl">🎉</span>
                <h3 className="font-bold text-ink">연계가 완료됐어요!</h3>
                <p className="text-sm text-subtle">
                  {demoCase.alias}님께 '{donor.resourceTitle}' 자원이 연결됐어요
                </p>
              </div>
              <button
                onClick={awardPoints}
                className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                나눔통장에 감사 포인트 적립하기 →
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-br from-brand to-brand-dark py-8 text-center text-white">
                <span className="text-3xl">💚</span>
                <p className="text-2xl font-bold">+{points} 감사 포인트</p>
                <p className="text-sm text-white/80">{donor.name}님의 나눔통장에 적립됐어요</p>
              </div>

              <div className="space-y-1.5 text-sm text-ink">
                <p className="font-medium text-subtle">전체 흐름 요약</p>
                <ul className="space-y-1">
                  <li>✅ 후원자 등록 · {donor.name}</li>
                  <li>✅ AI 매칭 · 적합도 {matchScore}%</li>
                  <li>✅ 대상자 연결 · {demoCase.alias}</li>
                  <li>✅ 포인트 적립 · +{points}</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  to="/connections"
                  className="flex-1 rounded-xl border border-line py-2.5 text-center text-sm font-semibold text-ink transition hover:bg-bg"
                >
                  연계관리에서 확인하기
                </Link>
                <Link
                  to="/points"
                  className="flex-1 rounded-xl border border-line py-2.5 text-center text-sm font-semibold text-ink transition hover:bg-bg"
                >
                  나눔통장에서 확인하기
                </Link>
                <button
                  onClick={restart}
                  className="flex-1 rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  처음부터 다시 보기
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-subtle">{label}</span>
      {children}
    </label>
  )
}
