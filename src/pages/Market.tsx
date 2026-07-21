import { useMemo, useState } from 'react'
import { ResourceCard } from '../components/ResourceCard'
import { SectionHeading } from '../components/SectionHeading'
import { resources } from '../data/mock'
import type { ResourceCategory } from '../data/types'

const categories: (ResourceCategory | '전체')[] = [
  '전체',
  '위생관리',
  '식생활',
  '이동지원',
  '주거환경',
  '정서지원',
  '교육문화',
]

export function Market() {
  const [active, setActive] = useState<(ResourceCategory | '전체')>('전체')

  const filtered = useMemo(
    () => (active === '전체' ? resources : resources.filter((r) => r.category === active)),
    [active],
  )

  return (
    <div className="space-y-6">
      <SectionHeading
        title="자원마켓"
        description="지금 우리 동네에서 나눌 수 있는 자원을 둘러보세요"
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              active === category
                ? 'bg-brand text-white'
                : 'border border-line bg-surface text-subtle hover:text-ink'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-2xl bg-surface p-8 text-center text-sm text-subtle shadow-card">
          해당 분류의 자원이 아직 없어요.
        </p>
      )}
    </div>
  )
}
