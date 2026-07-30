interface TagProps {
  children: React.ReactNode
  tone?: 'mint' | 'coral' | 'blue' | 'neutral'
}

const toneStyles: Record<NonNullable<TagProps['tone']>, string> = {
  mint: 'bg-mint text-brand-dark',
  coral: 'bg-coral-soft text-coral',
  blue: 'bg-blue-soft text-blue',
  neutral: 'bg-bg text-subtle border border-line',
}

export function Tag({ children, tone = 'mint' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneStyles[tone]}`}
    >
      #{children}
    </span>
  )
}
