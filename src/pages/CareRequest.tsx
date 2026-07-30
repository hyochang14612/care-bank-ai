import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { useAppData } from '../context/AppDataContext'
import type { ApplicantType, UrgencyLevel } from '../data/types'

const applicantTypes: ApplicantType[] = ['본인', '가족', '이웃', '기타']
const needTypes = ['생활지원', '이동지원', '식생활', '정서지원', '주거지원', '기타']
const urgencyLevels: UrgencyLevel[] = ['일반', '도움이 필요함', '긴급']

function todayLabel() {
  const now = new Date()
  return `${now.getMonth() + 1}월 ${now.getDate()}일`
}

export function CareRequest() {
  const { residentName, addCareRequest } = useAppData()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    applicantType: '본인' as ApplicantType,
    customApplicantType: '',
    location: '효창동',
    needType: '식생활',
    customNeedType: '',
    detail: '',
    contactTime: '평일 오전',
    urgency: '일반' as UrgencyLevel,
  })

  const finalNeedType = form.needType === '기타' ? form.customNeedType.trim() || '기타' : form.needType

  const submit = () => {
    addCareRequest({
      id: `req-${Date.now()}`,
      name: residentName,
      applicantType: form.applicantType,
      location: form.location,
      needType: finalNeedType,
      detail: form.detail || '상세 내용을 입력하지 않았어요.',
      contactTime: form.contactTime,
      urgency: form.urgency,
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
        <div>
          <p className="mb-2 text-xs font-medium text-subtle">신청 대상</p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {applicantTypes.map((type) => (
              <button
                key={type}
                onClick={() => setForm({ ...form, applicantType: type })}
                className={`rounded-2xl border p-3 text-center text-sm font-medium transition ${
                  form.applicantType === type
                    ? 'border-brand bg-mint text-brand-dark'
                    : 'border-line bg-surface text-ink hover:bg-bg'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {form.applicantType === '기타' && (
            <input
              className="input mt-2.5"
              placeholder="신청 대상을 직접 입력해주세요"
              value={form.customApplicantType}
              onChange={(e) => setForm({ ...form, customApplicantType: e.target.value })}
            />
          )}
        </div>

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
          {form.needType === '기타' && (
            <Field label="도움 유형 직접 입력">
              <input
                className="input"
                placeholder="예: 반려동물 돌봄 지원"
                value={form.customNeedType}
                onChange={(e) => setForm({ ...form, customNeedType: e.target.value })}
              />
            </Field>
          )}
          <Field label="연락 가능 시간">
            <input
              className="input"
              value={form.contactTime}
              onChange={(e) => setForm({ ...form, contactTime: e.target.value })}
            />
          </Field>
        </div>

        <Field label="현재 상황">
          <textarea
            className="input min-h-24 resize-none"
            placeholder="어떤 도움이 필요하신지 편하게 적어주세요"
            value={form.detail}
            onChange={(e) => setForm({ ...form, detail: e.target.value })}
          />
        </Field>

        <div>
          <p className="mb-2 text-xs font-medium text-subtle">긴급도</p>
          <div className="grid grid-cols-3 gap-2.5">
            {urgencyLevels.map((level) => (
              <button
                key={level}
                onClick={() => setForm({ ...form, urgency: level })}
                className={`rounded-2xl border p-3 text-center text-sm font-medium transition ${
                  form.urgency === level
                    ? level === '긴급'
                      ? 'border-coral bg-coral-soft text-coral'
                      : 'border-brand bg-mint text-brand-dark'
                    : 'border-line bg-surface text-ink hover:bg-bg'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

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
