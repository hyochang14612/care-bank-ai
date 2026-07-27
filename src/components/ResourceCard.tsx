import type { SharedResource } from '../data/types'
import { Tag } from './Tag'

export function ResourceCard({ resource }: { resource: SharedResource }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-surface p-5 shadow-card transition hover:shadow-card-hover">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint text-xl">
          {resource.icon}
        </div>
        <div>
          <h3 className="font-semibold text-ink">{resource.title}</h3>
          <p className="text-xs text-subtle">
            {resource.location} · {resource.targetGroup} · {resource.availability}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-bg px-3 py-2 text-sm">
        <span className="text-subtle">남은 수량</span>
        <span className="font-semibold text-ink">
          {resource.quantityLeft}
          <span className="text-subtle"> / {resource.quantityTotal}</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Tag tone="blue">{resource.resourceType}</Tag>
        {resource.tags.map((tag) => (
          <Tag key={tag} tone="mint">
            {tag}
          </Tag>
        ))}
      </div>

      <button className="mt-1 w-full rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark">
        자세히 보기
      </button>
    </div>
  )
}
