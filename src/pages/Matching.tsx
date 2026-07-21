import { MatchCard } from '../components/MatchCard'
import { NoticeBadge } from '../components/NoticeBadge'
import { SectionHeading } from '../components/SectionHeading'
import { matchResults } from '../data/mock'

export function Matching() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="AI 매칭"
        description="사례와 자원을 분석해 적합도 순으로 추천 결과를 정리했어요"
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
