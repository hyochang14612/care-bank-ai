import { useState } from 'react'
import { MatchCard } from '../../components/MatchCard'
import { NoticeBadge } from '../../components/NoticeBadge'
import { AiMatchingVisual } from '../../components/AiMatchingVisual'
import { SectionHeading } from '../../components/SectionHeading'
import { useAppData } from '../../context/AppDataContext'
import { matchResults } from '../../data/mock'
import type { MatchGrade, PendingMatch } from '../../data/types'

const demoCase = {
  caseId: 'CASE-2026-0501',
  alias: '김○○ 어르신',
  need: '식생활 지원 욕구 등록 · 효창동 거주',
}

function computeMatch(pm: PendingMatch) {
  const criteria = [
    { label: '욕구 유형 일치', matched: pm.category === '식품' },
    { label: '거리 가까움', matched: pm.location.includes('효창') },
    { label: '가능 시간 일치', matched: /주말|오전/.test(pm.availableTime) },
    { label: '자원 유형 적합', matched: true },
    { label: '기존 지원 여부', matched: true },
  ]
  const matchedCount = criteria.filter((c) => c.matched).length
  const grade: MatchGrade = matchedCount >= 5 ? '매우 적합' : matchedCount >= 3 ? '적합' : '검토 필요'
  return { criteria, grade }
}

function todayLabel() {
  const now = new Date()
  return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`
}

export function AiMatching() {
  const { pendingMatches, updatePendingMatch, removePendingMatch, addConnection, addPointRecord } =
    useAppData()
  const [analyzingId, setAnalyzingId] = useState<string | null>(null)
  const [doneId, setDoneId] = useState<string | null>(null)

  const runMatch = (pm: PendingMatch) => {
    setAnalyzingId(pm.id)
    setTimeout(() => {
      const { grade } = computeMatch(pm)
      updatePendingMatch(pm.id, { status: '매칭 완료', grade })
      setAnalyzingId(null)
    }, 1300)
  }

  const approve = (pm: PendingMatch) => {
    addConnection({
      id: `pm-${pm.id}`,
      caseId: demoCase.caseId,
      applicantAlias: demoCase.alias,
      resourceTitle: pm.resourceTitle,
      worker: '정사회복지사',
      status: '연계 완료',
      updatedAt: '방금 전',
      note: `${pm.residentName}님이 등록한 '${pm.resourceTitle}' 자원과 매칭 후 연계 완료 (AI 추천 · ${pm.grade})`,
    })
    addPointRecord({
      id: `pm-${pm.id}`,
      title: `${pm.residentName}님의 나눔 - ${pm.resourceTitle}`,
      type: '나눔 실천',
      date: todayLabel(),
      points: 100,
      memo: `이웃 1명에게 '${pm.resourceTitle}' 자원을 나눠주셨어요`,
      icon: '💚',
    })
    removePendingMatch(pm.id)
    setDoneId(pm.id)
    setTimeout(() => setDoneId(null), 3000)
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        title="AI 기반 자원 분석 및 연결 지원"
        description="등록된 자원과 돌봄 요청 데이터를 분석하여 사회복지사의 효율적인 연결과 우선 확인을 지원합니다."
      />

      <NoticeBadge />

      {doneId && (
        <p className="rounded-2xl bg-mint px-4 py-3 text-center text-sm font-semibold text-brand-dark">
          연계가 완료되었습니다. 나눔 참여에 감사합니다.
        </p>
      )}

      <section>
        <h3 className="mb-3 text-sm font-bold text-ink">신규 등록 자원 매칭</h3>
        {pendingMatches.length === 0 ? (
          <p className="rounded-2xl bg-surface p-6 text-center text-sm text-subtle shadow-card">
            아직 매칭을 기다리는 신규 자원이 없어요. 주민 화면에서 자원을 등록하면 여기에 나타나요.
          </p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {pendingMatches.map((pm) => {
              const { criteria } = computeMatch(pm)
              const analyzing = analyzingId === pm.id

              return (
                <div key={pm.id} className="space-y-4 rounded-3xl bg-surface p-5 shadow-card">
                  <div>
                    <p className="text-xs font-medium text-subtle">{pm.residentName}님이 등록</p>
                    <h4 className="font-semibold text-ink">{pm.resourceTitle}</h4>
                    <p className="text-xs text-subtle">
                      {pm.location} · {pm.availableTime} · {pm.category}
                    </p>
                  </div>

                  {pm.status === 'AI 매칭 대기' && !analyzing && (
                    <button
                      onClick={() => runMatch(pm)}
                      className="w-full rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
                    >
                      AI 매칭 실행 →
                    </button>
                  )}

                  {analyzing && (
                    <AiMatchingVisual criteria={criteria} grade="적합" analyzing />
                  )}

                  {pm.status === '매칭 완료' && pm.grade && !analyzing && (
                    <>
                      <AiMatchingVisual criteria={criteria} grade={pm.grade} analyzing={false} />
                      <div className="rounded-2xl bg-bg p-4 text-sm">
                        <p className="font-semibold text-ink">추천 대상: {demoCase.alias}</p>
                        <p className="mt-0.5 text-subtle">{demoCase.need}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approve(pm)}
                          className="flex-1 rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
                        >
                          승인 (연계 확정)
                        </button>
                        <button
                          onClick={() => removePendingMatch(pm.id)}
                          className="flex-1 rounded-xl border border-line py-2.5 text-sm font-semibold text-ink transition hover:bg-bg"
                        >
                          보류
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section>
        <h3 className="mb-3 text-sm font-bold text-ink">진행 중인 AI 매칭 결과</h3>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {matchResults.map((result) => (
            <MatchCard key={result.caseId} result={result} />
          ))}
        </div>
      </section>
    </div>
  )
}
