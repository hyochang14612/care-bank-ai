import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { ProblemSolution } from '../components/ProblemSolution'
import { RoleShowcase } from '../components/RoleShowcase'
import { AiMatchingVisual } from '../components/AiMatchingVisual'
import { PitchTimer } from '../components/PitchTimer'
import { pitchSchedule } from '../data/pitch'

const previewFactors = [
  { label: '지역 근접성', value: 95 },
  { label: '시간 일치도', value: 90 },
  { label: '욕구 일치도', value: 94 },
  { label: '자원 신뢰도', value: 88 },
]

export function Pitch() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionHeading
          title="3분 발표모드"
          description="문제 제기부터 라이브 데모까지, 심사위원 앞에서 순서대로 보여주세요"
        />
        <PitchTimer />
      </div>

      <div className="rounded-3xl bg-surface p-5 shadow-card">
        <p className="mb-3 text-sm font-semibold text-ink">추천 발표 순서 (총 3분)</p>
        <ol className="space-y-2">
          {pitchSchedule.map((item, index) => (
            <li
              key={item.label}
              className="flex items-center justify-between rounded-xl bg-bg px-4 py-2.5 text-sm"
            >
              <span className="text-ink">
                {index + 1}. {item.label}
              </span>
              <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-subtle shadow-card">
                {item.time}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <section>
        <p className="mb-3 text-xs font-semibold text-subtle">1-2. 문제 제기 · 솔루션 소개</p>
        <ProblemSolution />
      </section>

      <section>
        <p className="mb-3 text-xs font-semibold text-subtle">3. 세 가지 사용자 관점</p>
        <RoleShowcase />
      </section>

      <section>
        <p className="mb-3 text-xs font-semibold text-subtle">4. AI 매칭은 이렇게 작동해요</p>
        <div className="rounded-3xl bg-surface p-6 shadow-card">
          <AiMatchingVisual factors={previewFactors} score={92} analyzing={false} />
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-8 text-center text-white">
        <p className="text-xs font-medium text-mint">5. 라이브 데모</p>
        <p className="mt-2 text-lg font-bold">
          이제 후원자 등록부터 포인트 적립까지
          <br />
          직접 눌러보며 보여드릴게요
        </p>
        <Link
          to="/demo"
          className="mt-5 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-mint"
        >
          🎬 라이브 데모 시작하기
        </Link>
      </section>
    </div>
  )
}
