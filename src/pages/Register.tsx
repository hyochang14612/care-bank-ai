import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { useAppData } from '../context/AppDataContext'
import type { ResourceCategory, ResourceType } from '../data/types'

const resourceTypes: { value: ResourceType; icon: string; desc: string }[] = [
  { value: '돈', icon: '💰', desc: '후원금, 기부금' },
  { value: '재능', icon: '🎁', desc: '기술, 재능, 전문성' },
  { value: '물품 나눔', icon: '📦', desc: '생활용품, 식료품 등' },
  { value: '시간봉사', icon: '⏰', desc: '봉사, 동행, 방문' },
  { value: '공간 제공', icon: '🏠', desc: '모임 공간, 대관' },
]

const categories: ResourceCategory[] = ['위생관리', '식생활', '이동지원', '주거환경', '정서지원', '교육문화']

const noticeText =
  '등록한 자원은 사회복지사가 확인 후 연계되며, 자원 유형에 따라 CARE POINT와 후원영수증이 발급됩니다.'

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
        <p className="text-sm text-subtle">
          이웃님의 {selectedType.value} 나눔이 곧 필요한 이웃에게 전달될 거예요.
        </p>
        <p className="rounded-2xl bg-mint px-4 py-3 text-sm text-brand-dark">{noticeText}</p>
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
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 rounded-2xl bg-blue-soft p-4 text-sm text-ink">
          <p>
            💚 <strong className="font-semibold">CARE POINT 적립</strong> — 모든 자원 유형에 적립돼요
          </p>
          <p>
            🧾 <strong className="font-semibold">후원영수증 발급</strong> — 재능기부·물품 등 법적 기준에
            따라 발급될 수 있어요
          </p>
          <p>
            ⏱ <strong className="font-semibold">봉사시간 산정</strong> — 시간봉사로 등록하면 봉사시간으로
            산정돼요
          </p>
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
