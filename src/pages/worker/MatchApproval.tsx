import { MatchCard } from '../../components/MatchCard'
import { NoticeBadge } from '../../components/NoticeBadge'
import { SectionHeading } from '../../components/SectionHeading'
import { matchResults } from '../../data/mock'

export function MatchApproval() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="매칭 승인"
        description="AI 추천을 검토하고 승인·보류·재추천을 결정하세요"
      />

      <NoticeBadge />

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {matchResults.map((result) => (
          <MatchCard key={result.caseId} result={result} />
        ))}
      </div>
    </div>
  )
}
