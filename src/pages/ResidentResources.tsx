import { useMemo, useState } from 'react'
import { ResourceCard } from '../components/ResourceCard'
import { SectionHeading } from '../components/SectionHeading'
import { useAppData } from '../context/AppDataContext'
import type { ResourceType } from '../data/types'

const categories: (ResourceType | '전체')[] = ['전체', '물품 나눔', '재능 나눔', '시간 나눔', '공간 나눔']

export function ResidentResources() {
  const { resources } = useAppData()
  const [active, setActive] = useState<ResourceType | '전체'>('전체')

  const filtered = useMemo(
    () => (active === '전체' ? resources : resources.filter((r) => r.resourceType === active)),
    [active, resources],
  )

  return (
    <div className="space-y-6">
      <SectionHeading
        title="우리동네 자원"
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
