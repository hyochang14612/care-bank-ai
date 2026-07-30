export function NoticeBadge() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-mint bg-mint/60 px-4 py-3 text-sm text-brand-dark">
      <span className="mt-0.5 text-base">🛡️</span>
      <p className="leading-relaxed">
        <strong className="font-semibold">AI는 자동 배정하지 않습니다.</strong>{' '}
        사회복지사가 최종 확인 후 연계합니다.
      </p>
    </div>
  )
}
