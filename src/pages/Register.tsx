import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { useAppData } from '../context/AppDataContext'
import type { ResourceType } from '../data/types'

const resourceTypes: { value: ResourceType; icon: string; title: string; desc: string }[] = [
  { value: '물품 나눔', icon: '🎁', title: '물품 나눔', desc: '생활용품, 식품, 의류 등 사용하지 않는 물품을 나눠요' },
  { value: '재능 나눔', icon: '✨', title: '재능 나눔', desc: '미용, 교육, 상담 등 내가 가진 재능을 나눠요' },
  { value: '시간 나눔', icon: '⏰', title: '시간 나눔', desc: '말벗, 이동지원, 봉사활동 등 나의 시간을 나눠요' },
  { value: '공간 나눔', icon: '🏠', title: '공간 나눔', desc: '공간대여, 프로그램 공간 등 사용 가능한 공간을 나눠요' },
]

const subcategories: Record<ResourceType, string[]> = {
  '물품 나눔': ['생활용품', '식품', '의류', '도서', '기타'],
  '재능 나눔': ['미용', '교육', '상담', '수리', '기타'],
  '시간 나눔': ['말벗', '이동지원', '봉사활동', '기타'],
  '공간 나눔': ['공간대여', '프로그램 공간', '기타'],
}

const completeText = '등록된 자원은 사회복지사가 확인 후 필요한 이웃에게 연결합니다.'

export function Register() {
  const { residentName, addResource, addPendingMatch } = useAppData()
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    resourceType: '물품 나눔' as ResourceType,
    category: '식품',
    customCategory: '',
    resourceTitle: '밑반찬 나눔 세트',
    location: '효창동',
    availableTime: '주말 오전',
  })

  const selectedType = resourceTypes.find((t) => t.value === form.resourceType) ?? resourceTypes[0]
  const finalCategory = form.category === '기타' ? form.customCategory.trim() || '기타' : form.category

  const selectType = (value: ResourceType) => {
    setForm({
      ...form,
      resourceType: value,
      category: subcategories[value][0],
      customCategory: '',
    })
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
      category: finalCategory,
      resourceType: form.resourceType,
      tags: [finalCategory],
      icon: selectedType.icon,
    })
    addPendingMatch({
      id,
      residentName,
      resourceTitle: form.resourceTitle,
      category: finalCategory,
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
          이웃님의 {selectedType.title} 나눔이 곧 필요한 이웃에게 전달될 거예요.
        </p>
        <p className="rounded-2xl bg-mint px-4 py-3 text-sm font-medium text-brand-dark">{completeText}</p>
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

      <section>
        <p className="mb-3 text-sm font-bold text-ink">어떤 나눔을 할 수 있을까요?</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {resourceTypes.map((type) => (
            <div key={type.value} className="rounded-2xl border border-line bg-surface p-4">
              <span className="text-xl">{type.icon}</span>
              <p className="mt-1.5 text-sm font-semibold text-ink">{type.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-subtle">{type.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-5 rounded-3xl bg-surface p-6 shadow-card">
        <div>
          <p className="mb-2 text-xs font-medium text-subtle">나눔 유형 선택</p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {resourceTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => selectType(type.value)}
                className={`rounded-2xl border p-3 text-left transition ${
                  form.resourceType === type.value
                    ? 'border-brand bg-mint'
                    : 'border-line bg-surface hover:bg-bg'
                }`}
              >
                <span className="text-xl">{type.icon}</span>
                <p className="mt-1.5 text-sm font-semibold text-ink">{type.title}</p>
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
            ⏱ <strong className="font-semibold">봉사시간 산정</strong> — 시간 나눔으로 등록하면 봉사시간으로
            산정돼요
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="상세 분류">
            <select
              className="input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {subcategories[form.resourceType].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          {form.category === '기타' && (
            <Field label="상세 분류 직접 입력">
              <input
                className="input"
                placeholder="예: 반려동물 돌봄"
                value={form.customCategory}
                onChange={(e) => setForm({ ...form, customCategory: e.target.value })}
              />
            </Field>
          )}
          <Field label="자원 이름">
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

        <p className="rounded-2xl bg-mint px-4 py-3 text-sm font-medium text-brand-dark">{completeText}</p>

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
