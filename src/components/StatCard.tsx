import type { DailyStat } from '../data/types'

const accentStyles: Record<DailyStat['accent'], string> = {
  brand: 'bg-mint text-brand-dark',
  blue: 'bg-blue-soft text-blue',
  coral: 'bg-coral-soft text-coral',
  ink: 'bg-bg text-ink',
}

export function StatCard({ stat }: { stat: DailyStat }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-card sm:flex-col sm:items-start sm:gap-2">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${accentStyles[stat.accent]}`}
      >
        {stat.icon}
      </div>
      <div>
        <p className="text-xs text-subtle">{stat.label}</p>
        <p className="mt-0.5 text-xl font-bold text-ink">
          {stat.value.toLocaleString()}
          <span className="ml-0.5 text-sm font-medium text-subtle">{stat.unit}</span>
        </p>
        <p className="mt-0.5 text-xs text-subtle">{stat.trend}</p>
      </div>
    </div>
  )
}
