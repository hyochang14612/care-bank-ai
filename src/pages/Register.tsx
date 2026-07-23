import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { Stepper } from '../components/Stepper'
import { NoticeBadge } from '../components/NoticeBadge'
import { AiMatchingVisual } from '../components/AiMatchingVisual'
import { useAppData } from '../context/AppDataContext'
import type { MatchGrade, ResourceCategory, ResourceType } from '../data/types'

const resourceTypes: { value: ResourceType; icon: string; desc: string }[] = [
  { value: '물품 나눔', icon: '📦', desc: '생활용품, 식료품 등' },
  { value: '재능 나눔', icon: '🎁', desc: '기술, 재능, 전문성' },
  { value: '시간 나눔', icon: '⏰', desc: '봉사, 동행, 방문' },
  { value: '공간 나눔', icon: '🏠', desc: '모임 공간, 대관' },
]

const categories: ResourceCategory[] = ['위생관리', '식생활', '이동지원', '주거환경', '정서지원', '교육문화']

const demoCase = {
  caseId: 'CASE-2026-0501',
  alias: '김○○ 어르신',
  need: '식생활 지원 욕구 등록 · 효창동 거주',
}

const steps = [
  { label: '자원 등록', icon: '🧺' },
  { label: 'AI 매칭', icon: '✨' },
  { label: '사회복지사 확인', icon: '🧑‍💼' },
  { label: '연계 완료', icon: '💚' },
]

function todayLabel() {
  const now = new Date()
  return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`
}

export function Register() {
  const { addConnection, addPointRecord } = useAppData()
  const [step, setStep] = useState(1)
  const [runId, setRunId] = useState(() => `${Date.now()}`)

  const [form, setForm] = useState({
    name: '이웃 주민',
    resourceType: '시간 나눔' as ResourceType,
    category: '식생활' as ResourceCategory,
    resourceTitle: '도시락 봉사',
    location: '효창동',
    availableTime: '주말 오전',
  })

  const [matching, setMatching] = useState(false)
  const [checklist, setChecklist] = useState({ identity: false, history: false })
  const [connected, setConnected] = useState(false)
  const [pointsAwarded, setPointsAwarded] = useState(false)

  const criteria = [
    { label: '욕구 유형 일치', matched: form.category === '식생활' },
    { label: '거리 가까움', matched: form.location.includes('효창') },
    { label: '가능 시간 일치', matched: /주말|오전/.test(form.availableTime) },
    { label: '자원 유형 적합', matched: true },
    { label: '기존 지원 여부', matched: true },
  ]
  const matchedCount = criteria.filter((c) => c.matched).length
  const grade: MatchGrade = matchedCount >= 5 ? '매우 적합' : matchedCount >= 3 ? '적합' : '검토 필요'
  const points = 100
  const typeIcon = resourceTypes.find((t) => t.value === form.resourceType)?.icon ?? '💚'

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

  const confirmConnection = () => {
    addConnection({
      id: `demo-${runId}`,
      caseId: demoCase.caseId,
      applicantAlias: demoCase.alias,
      resourceTitle: form.resourceTitle,
      worker: '정사회복지사',
      status: '연계 완료',
      updatedAt: '방금 전',
      note: `${form.name}님이 등록한 '${form.resourceTitle}' 자원과 AI 매칭 후 연계 완료 (AI 추천 · ${grade})`,
    })
    setConnected(true)
    setStep(4)
  }

  const awardPoints = () => {
    addPointRecord({
      id: `demo-${runId}`,
      title: `${form.name}님의 나눔 - ${form.resourceTitle}`,
      type: '나눔 실천',
      date: todayLabel(),
      points,
      memo: `이웃 1명에게 '${form.resourceTitle}' 자원을 나눠주셨어요`,
      icon: typeIcon,
    })
    setPointsAwarded(true)
  }

  const restart = () => {
    setRunId(`${Date.now()}`)
    setStep(1)
    setMatching(false)
    setChecklist({ identity: false, history: false })
    setConnected(false)
    setPointsAwarded(false)
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="자원 등록하기"
        description="가진 자원을 등록하면 AI가 필요한 이웃을 찾아드려요"
      />

      <div className="rounded-3xl bg-surface p-5 shadow-card sm:p-6">
        <Stepper steps={steps} current={Math.min(step, 4)} />
      </div>

      {step === 1 && (
        <div className="space-y-5 rounded-3xl bg-surface p-6 shadow-card">
          <div>
            <h3 className="font-bold text-ink">1. 자원 등록</h3>
            <p className="mt-1 text-sm text-subtle">
              나눌 수 있는 자원의 유형을 고르고 정보를 입력해주세요. 값은 자유롭게 바꿔보실 수 있어요.
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-subtle">자원 유형</p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {resourceTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setForm({ ...form, resourceType: type.value })}
                  className={`rounded-2xl border p-3 text-left transition ${
                    form.resourceType === type.value
                      ? 'border-brand bg-mint'
                      : 'border-line bg-surface hover:bg-bg'
                  }`}
                >
                  <span className="text-xl">{type.icon}</span>
                  <p className="mt-1.5 text-sm font-semibold text-ink">{type.value}</p>
                  <p className="text-[11px] text-subtle">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="이름 / 단체명">
              <input
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="자원 분류">
              <select
                className="input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ResourceCategory })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="자원">
              <input
                className="input"
                value={form.resourceTitle}
                onChange={(e) => setForm({ ...form, resourceTitle: e.target.value })}
              />
            </Field>
            <Field label="지역">
              <input
                className="input"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </Field>
            <Field label="가능 시간">
              <input
                className="input"
                value={form.availableTime}
                onChange={(e) => setForm({ ...form, availableTime: e.target.value })}
              />
            </Field>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark sm:w-auto sm:px-6"
          >
            등록하고 AI 매칭 실행하기 →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 rounded-3xl bg-surface p-6 shadow-card">
          <div>
            <h3 className="font-bold text-ink">2. AI 매칭 실행</h3>
            <p className="mt-1 text-sm text-subtle">
              {matching
                ? `등록하신 '${form.resourceTitle}' 자원과 어울리는 이웃을 찾고 있어요...`
                : '3. 추천 결과가 나왔어요'}
            </p>
          </div>

          <AiMatchingVisual criteria={criteria} grade={grade} analyzing={matching} />

          {!matching && (
            <>
              <div className="rounded-2xl bg-bg p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-subtle">{demoCase.caseId}</span>
                  <span className="rounded-full bg-blue-soft px-2.5 py-1 text-xs font-semibold text-blue">
                    확인 대기
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">추천 대상: {demoCase.alias}</p>
                <p className="mt-0.5 text-sm text-subtle">{form.resourceTitle}</p>

                <div className="mt-4 space-y-1.5">
                  <p className="text-xs font-medium text-subtle">추천 이유</p>
                  <ul className="space-y-1 text-sm text-ink">
                    {criteria
                      .filter((c) => c.matched)
                      .map((c) => (
                        <li key={c.label} className="flex gap-1.5">
                          <span className="text-brand">·</span>
                          {c.label === '욕구 유형 일치' && '식생활 지원 욕구가 있는 이웃이에요'}
                          {c.label === '거리 가까움' && '동일 생활권이라 이동 부담이 적어요'}
                          {c.label === '가능 시간 일치' && '나눔 가능 시간과 방문 가능 시간이 맞아요'}
                          {c.label === '자원 유형 적합' && '등록하신 자원 유형이 상황에 적합해요'}
                          {c.label === '기존 지원 여부' && '최근 3개월 내 유사 지원 이력이 없어요'}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <NoticeBadge />

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                >
                  사회복지사 확인 단계로 →
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
            <h3 className="font-bold text-ink">4. 사회복지사 확인</h3>
            <p className="mt-1 text-sm text-subtle">
              AI는 추천만 합니다. 아래 확인 후 사회복지사가 직접 연계를 확정해요.
            </p>
          </div>

          <div className="rounded-2xl bg-bg p-5 text-sm">
            <p className="font-semibold text-ink">
              {demoCase.alias} · {form.resourceTitle}
            </p>
            <p className="mt-1 text-subtle">{demoCase.need}</p>
            <div className="mt-2">
              <span className="rounded-full bg-mint px-2.5 py-1 text-xs font-semibold text-brand-dark">
                AI 추천 · {grade}
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 rounded-xl border border-line p-3 text-sm">
              <input
                type="checkbox"
                checked={checklist.identity}
                onChange={(e) => setChecklist({ ...checklist, identity: e.target.checked })}
                className="h-4 w-4 accent-brand"
              />
              신청자 본인 확인을 완료했어요
            </label>
            <label className="flex items-center gap-2.5 rounded-xl border border-line p-3 text-sm">
              <input
                type="checkbox"
                checked={checklist.history}
                onChange={(e) => setChecklist({ ...checklist, history: e.target.checked })}
                className="h-4 w-4 accent-brand"
              />
              기존 지원 이력을 확인했어요
            </label>
          </div>

          <NoticeBadge />

          <div className="flex gap-2">
            <button
              onClick={confirmConnection}
              disabled={!checklist.identity}
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
                <h3 className="font-bold text-ink">연계가 완료되었습니다.</h3>
                <p className="text-sm text-subtle">나눔 참여에 감사합니다.</p>
              </div>
              <button
                onClick={awardPoints}
                className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                CARE POINT 적립하기 →
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-br from-brand to-brand-dark py-8 text-center text-white">
                <span className="text-3xl">💚</span>
                <p className="text-2xl font-bold">+{points} CARE POINT</p>
                <p className="text-sm text-white/80">{form.name}님의 CARE POINT 통장에 적립됐어요</p>
              </div>

              <div className="space-y-1.5 text-sm text-ink">
                <p className="font-medium text-subtle">전체 흐름 요약</p>
                <ul className="space-y-1">
                  <li>✅ 자원 등록 · {form.resourceTitle}</li>
                  <li>✅ AI 매칭 · {grade}</li>
                  <li>✅ 사회복지사 확인 · {demoCase.alias}</li>
                  <li>✅ CARE POINT 적립 · +{points}</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  to="/care-point"
                  className="flex-1 rounded-xl border border-line py-2.5 text-center text-sm font-semibold text-ink transition hover:bg-bg"
                >
                  CARE POINT 통장에서 확인하기
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
