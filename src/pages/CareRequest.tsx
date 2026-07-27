import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { useAppData } from '../context/AppDataContext'

const needTypes = ['식생활 지원', '위생관리 지원', '이동 지원', '주거환경 지원', '정서 지원', '교육·문화 지원']

function todayLabel() {
  const now = new Date()
  return `${now.getMonth() + 1}월 ${now.getDate()}일`
}

export function CareRequest() {
  const { role, residentName, addCareRequest } = useAppData()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    location: '효창동',
    needType: '식생활 지원',
    detail: '',
    contactTime: '평일 오전',
  })

  if (role === 'guest') {
    return (
      <div className="mx-auto max-w-lg space-y-4 rounded-3xl bg-surface p-8 text-center shadow-card">
        <span className="text-3xl">🔒</span>
        <h2 className="text-lg font-bold text-ink">로그인이 필요해요</h2>
        <p className="text-sm text-subtle">돌봄 신청은 지역주민 로그인 후 이용할 수 있어요.</p>
        <Link
          to="/login"
          state={{ from: '/request' }}
          className="inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          로그인하러 가기
        </Link>
      </div>
    )
  }

  const submit = () => {
    addCareRequest({
      id: `req-${Date.now()}`,
      name: residentName,
      location: form.location,
      needType: form.needType,
      detail: form.detail || '상세 내용을 입력하지 않았어요.',
      contactTime: form.contactTime,
      status: '신규 접수',
      submittedAt: todayLabel(),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg space-y-5 rounded-3xl bg-surface p-8 text-center shadow-card">
        <span className="text-3xl">📨</span>
        <h2 className="text-lg font-bold text-ink">접수가 완료되었습니다.</h2>
        <p className="text-sm text-subtle">사회복지사가 확인 후 안내드립니다.</p>
        <p className="rounded-2xl bg-mint px-4 py-3 text-sm text-brand-dark">
          지원 필요, 돌봄 공백, 지역사회 서비스 연계 여부 등을 사회복지사가 종합적으로 판단해 최종
          지원 여부를 결정합니다.
        </p>
        <Link
          to="/"
          className="inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          홈으로
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="돌봄 신청하기"
        description="도움이 필요하신가요? 편하게 신청해주세요"
      />

      <div className="space-y-5 rounded-3xl bg-surface p-6 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="지역">
            <input
              className="input"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </Field>
          <Field label="필요한 도움 유형">
            <select
              className="input"
              value={form.needType}
              onChange={(e) => setForm({ ...form, needType: e.target.value })}
            >
              {needTypes.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
          <Field label="연락 가능 시간">
            <input
              className="input"
              value={form.contactTime}
              onChange={(e) => setForm({ ...form, contactTime: e.target.value })}
            />
          </Field>
        </div>

        <Field label="상세 내용">
          <textarea
            className="input min-h-24 resize-none"
            placeholder="어떤 도움이 필요하신지 편하게 적어주세요"
            value={form.detail}
            onChange={(e) => setForm({ ...form, detail: e.target.value })}
          />
        </Field>

        <p className="rounded-2xl bg-mint px-4 py-3 text-sm text-brand-dark">
          신청은 누구나 가능하지만, 사회복지사 판단 하에 지원 필요·돌봄 공백·지역사회 서비스 연계가
          필요한 경우에 한해 최종 지원이 확정됩니다.
        </p>

        <button
          onClick={submit}
          className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark sm:w-auto sm:px-6"
        >
          돌봄 신청하기
        </button>
      </div>
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
