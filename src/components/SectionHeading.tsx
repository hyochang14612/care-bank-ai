import { Link } from 'react-router-dom'

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: { label: string; to: string }
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-ink">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-subtle">{description}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className="shrink-0 text-sm font-medium text-brand-dark hover:underline"
        >
          {action.label} →
        </Link>
      )}
    </div>
  )
}
