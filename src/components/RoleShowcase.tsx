import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NoticeBadge } from './NoticeBadge'
import { Tag } from './Tag'
import { donorProfile, beneficiaryProfile, matchResults, dailyStats } from '../data/mock'

type RoleKey = 'donor' | 'worker' | 'beneficiary'

const roles: { key: RoleKey; label: string; icon: string; desc: string }[] = [
  { key: 'donor', label: '후원자', icon: '🙋', desc: '자원을 나누는 개인·단체·소상공인' },
  { key: 'worker', label: '사회복지사', icon: '🧑‍💼', desc: '매칭을 확인하고 연계를 확정하는 담당자' },
  { key: 'beneficiary', label: '대상자', icon: '🧓', desc: '도움을 받는 이웃 (혹은 보호자)' },
]

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-line bg-bg p-3 shadow-card">
      <div className="rounded-[1.5rem] bg-surface p-5">{children}</div>
    </div>
  )
}

function DonorView() {
  return (
    <PhoneFrame>
      <p className="text-xs text-subtle">안녕하세요 👋</p>
      <h3 className="text-lg font-bold text-ink">{donorProfile.name}님</h3>

      <div className="mt-4 rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-4 text-white">
        <p className="text-xs text-mint">나의 나눔통장</p>
        <p className="mt-1 text-2xl font-bold">
          {donorProfile.totalPoints.toLocaleString()}
          <span className="ml-1 text-sm font-medium text-mint">감사 포인트</span>
        </p>
      </div>

      <div className="mt-4 rounded-2xl bg-bg p-4">
        <p className="text-xs font-medium text-subtle">최근 나눔</p>
        <p className="mt-1 text-sm font-semibold text-ink">
          {donorProfile.recentDonation} → {donorProfile.recentRecipient}
        </p>
        <Tag tone="mint">전달 완료</Tag>
      </div>

      <div className="mt-3 rounded-2xl border border-coral-soft bg-coral-soft/60 p-4">
        <p className="text-xs font-medium text-coral">받은 감사 인사 💌</p>
        <p className="mt-1 text-sm text-ink">"{donorProfile.thankYouMessage}"</p>
        <p className="mt-1 text-xs text-subtle">- {donorProfile.thankYouFrom}</p>
      </div>

      <Link
        to="/demo"
        className="mt-4 block rounded-xl bg-brand py-2.5 text-center text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        새 자원 등록하기
      </Link>
    </PhoneFrame>
  )
}

function WorkerView() {
  const top = matchResults[0]
  const waiting = dailyStats.find((s) => s.label === '매칭 대기')

  return (
    <PhoneFrame>
      <p className="text-xs text-subtle">담당 사례 현황</p>
      <h3 className="text-lg font-bold text-ink">정사회복지사님</h3>

      <div className="mt-4 flex gap-2">
        <div className="flex-1 rounded-2xl bg-bg p-3 text-center">
          <p className="text-xs text-subtle">매칭 대기</p>
          <p className="text-xl font-bold text-ink">{waiting?.value ?? 0}건</p>
        </div>
        <div className="flex-1 rounded-2xl bg-mint p-3 text-center">
          <p className="text-xs text-brand-dark">AI 추천 적합도</p>
          <p className="text-xl font-bold text-brand-dark">{top.matchScore}%</p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-bg p-4">
        <p className="text-xs text-subtle">{top.caseId}</p>
        <p className="mt-1 text-sm font-semibold text-ink">
          {top.applicantAlias} · {top.resourceTitle}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {top.checks.map((c) => (
            <Tag key={c} tone="coral">
              {c}
            </Tag>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <NoticeBadge />
      </div>

      <Link
        to="/connections"
        className="mt-4 block rounded-xl bg-brand py-2.5 text-center text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        연계관리 전체보기
      </Link>
    </PhoneFrame>
  )
}

function BeneficiaryView() {
  return (
    <PhoneFrame>
      <div className="rounded-2xl bg-mint p-4 text-center">
        <p className="text-base font-bold text-brand-dark">{beneficiaryProfile.alias}, 반가워요!</p>
        <p className="mt-1 text-sm text-brand-dark">새로운 도움이 도착했어요 🎁</p>
      </div>

      <div className="mt-4 rounded-2xl bg-bg p-4 text-center">
        <p className="text-2xl">💇</p>
        <p className="mt-2 text-base font-bold text-ink">{beneficiaryProfile.resourceTitle}</p>
        <p className="mt-1 text-sm text-subtle">{beneficiaryProfile.provider}님이 보내주셨어요</p>
        <p className="mt-3 rounded-xl bg-surface py-2 text-sm font-semibold text-brand-dark">
          📅 {beneficiaryProfile.schedule}
        </p>
      </div>

      <button className="mt-4 w-full rounded-xl bg-brand py-3 text-base font-semibold text-white transition hover:bg-brand-dark">
        감사 인사 보내기
      </button>
      <button className="mt-2 w-full rounded-xl border border-line py-3 text-base font-semibold text-ink transition hover:bg-bg">
        일정 다시 확인하기
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-subtle">
        이 서비스는 {beneficiaryProfile.worker}님이 직접 확인한 뒤에만 연결돼요.
      </p>
    </PhoneFrame>
  )
}

export function RoleShowcase() {
  const [active, setActive] = useState<RoleKey>('donor')
  const activeRole = roles.find((r) => r.key === active)!

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {roles.map((role) => (
          <button
            key={role.key}
            onClick={() => setActive(role.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              active === role.key
                ? 'bg-brand text-white'
                : 'border border-line bg-surface text-subtle hover:text-ink'
            }`}
          >
            {role.icon} {role.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-subtle">{activeRole.desc}</p>

      <div className="mt-5">
        {active === 'donor' && <DonorView />}
        {active === 'worker' && <WorkerView />}
        {active === 'beneficiary' && <BeneficiaryView />}
      </div>
    </div>
  )
}
