import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { useAppData } from '../context/AppDataContext'
import type { ResourceBenefit, ResourceCategory, ResourceType } from '../data/types'

const resourceTypes: { value: ResourceType; icon: string; desc: string; benefit: ResourceBenefit }[] = [
  { value: '돈', icon: '💰', desc: '후원금, 기부금', benefit: '후원금영수증 발급' },
  { value: '재능', icon: '🎁', desc: '기술, 재능, 전문성', benefit: 'CARE POINT 적립' },
  { value: '물품 나눔', icon: '📦', desc: '생활용품, 식료품 등', benefit: 'CARE POINT 적립' },
  { value: '시간봉사', icon: '⏰', desc: '봉사, 동행, 방문', benefit: '봉사시간 산정' },
  { value: '공간 제공', icon: '🏠', desc: '모임 공간, 대관', benefit: 'CARE POINT 적립' },
]

const benefitTone: Record<ResourceBenefit, string> = {
  '후원금영수증 발급': 'bg-blue-soft text-blue',
  'CARE POINT 적립': 'bg-mint text-brand-dark',
  '봉사시간 산정': 'bg-coral-soft text-coral',
}

const categories: ResourceCategory[] = ['위생관리', '식생활', '이동지원', '주거환경', '정서지원', '교육문화']

const noticeText =
  '등록한 자원은 사회복지사가 확인 후 연계되며, 자원 유형에 따라 후원영수증, CARE POINT, 봉사시간 등으로 산정됩니다.'

export function Register() {
  const { role, residentName, addResource, addPendingMatch } = useAppData()
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    resourceType: '시간봉사' as ResourceType,
    category: '식생활' as ResourceCategory,
    resourceTitle: '도시락 봉사',
    location: '효창동',
    availableTime: '주말 오전',
  })

  const selectedType = resourceTypes.find((t) => t.value === form.resourceType) ?? resourceTypes[0]

  if (role === 'guest') {
    return (
      <div className="mx-auto max-w-lg space-y-4 rounded-3xl bg-surface p-8 text-center shadow-card">
        <span className="text-3xl">🔒</span>
        <h2 className="text-lg font-bold text-ink">로그인이 필요해요</h2>
        <p className="text-sm text-subtle">자원 등록은 지역주민 로그인 후 이용할 수 있어요.</p>
        <Link
          to="/login"
          state={{ from: '/register' }}
          className="inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          로그인하러 가기
        </Link>
      </div>
    )
  }

  const submit = () => {
    const id = `res-${Date.now()}`
    addResource({
      id,
      title: form.resourceTitle,
      provider: residentName,
      location: form.location,
      targetGroup: '우리 동네 이웃',
      availability: form.availableTime,
      quantityLeft: 1,
      quantityTotal: 1,
      category: form.category,
      resourceType: form.resourceType,
      tags: [form.category],
      icon: selectedType.icon,
    })
    addPendingMatch({
      id,
      residentName,
      resourceTitle: form.resourceTitle,
      category: form.category,
      location: form.location,
      availableTime: form.availableTime,
      status: 'AI 매칭 대기',
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg space-y-5 rounded-3xl bg-surface p-8 text-center shadow-card">
        <span className="text-3xl">🎉</span>
        <h2 className="text-lg font-bold text-ink">등록이 완료되었습니다.</h2>
        <p className="rounded-2xl bg-mint px-4 py-3 text-sm text-brand-dark">{noticeText}</p>
        <p className="text-sm text-subtle">
          이번 등록({selectedType.value})은{' '}
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${benefitTone[selectedType.benefit]}`}>
            {selectedType.benefit}
          </span>
          {' '}으로 산정될 예정이에요.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            to="/resources"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            우리동네 자원에서 확인하기
          </Link>
          <Link
            to="/"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-bg"
          >
            홈으로
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="자원 등록하기"
        description="가진 자원을 등록하면 사회복지사가 확인 후 필요한 이웃에게 연결해드려요"
      />

      <div className="space-y-5 rounded-3xl bg-surface p-6 shadow-card">
        <div>
          <p className="mb-2 text-xs font-medium text-subtle">자원 유형</p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
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
                <span
                  className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${benefitTone[type.benefit]}`}
                >
                  {type.benefit}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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

        <p className="rounded-2xl bg-mint px-4 py-3 text-sm text-brand-dark">{noticeText}</p>

        <button
          onClick={submit}
          className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark sm:w-auto sm:px-6"
        >
          등록하기
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
