import { SectionHeading } from '../components/SectionHeading'
import { newsItems } from '../data/mock'

export function Stories() {
  return (
    <div className="space-y-6">
      <SectionHeading title="나눔 이야기" description="우리 동네 나눔이 만든 따뜻한 변화를 전해드려요" />

      <div className="space-y-3">
        {newsItems.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-2xl bg-surface p-5 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint text-lg">
              {item.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-soft px-2 py-0.5 text-xs font-medium text-blue">
                  {item.tag}
                </span>
                <span className="text-xs text-subtle">{item.date}</span>
              </div>
              <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-subtle">{item.summary}</p>
              <p className="mt-2 text-xs font-medium text-brand-dark">{item.org}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
