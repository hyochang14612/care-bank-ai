import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { useAppData } from '../context/AppDataContext'
import type { ResourceCategory, ResourceType } from '../data/types'

const resourceTypes: { value: ResourceType; icon: string; desc: string }[] = [
  { value: '물품 나눔', icon: '📦', desc: '생활용품, 식료품 등' },
  { value: '재능 나눔', icon: '🎁', desc: '기술, 재능, 전문성' },
  { value: '시간 나눔', icon: '⏰', desc: '봉사, 동행, 방문' },
  { value: '공간 나눔', icon: '🏠', desc: '모임 공간, 대관' },
]

const categories: ResourceCategory[] = ['위생관리', '식생활', '이동지원', '주거환경', '정서지원', '교육문화']

export function Register() {
  const { role, residentName, addResource, addPendingMatch } = useAppData()
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    resourceType: '시간 나눔' as ResourceType,
    category: '식생활' as ResourceCategory,
    resourceTitle: '도시락 봉사',
    location: '효창동',
    availableTime: '주말 오전',
  })

  const typeIcon = resourceTypes.find((t) => t.value === form.resourceType)?.icon ?? '💚'

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
      icon: typeIcon,
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
        <p className="rounded-2xl bg-mint px-4 py-3 text-sm text-brand-dark">
          등록된 자원은 사회복지사가 최종 확인 후 연계하여 안내드립니다.
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

        <p className="rounded-2xl bg-mint px-4 py-3 text-sm text-brand-dark">
          등록된 자원은 사회복지사가 최종 확인 후 연계하여 안내드립니다.
        </p>

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
