import { Link } from 'react-router-dom'
import { ResourceCard } from '../components/ResourceCard'
import { SectionHeading } from '../components/SectionHeading'
import { useAppData } from '../context/AppDataContext'
import { heroContent, heroResourceIcons, homeValueSteps } from '../data/landing'

export function ResidentHome() {
  const { resources } = useAppData()

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-dark px-6 py-14 text-center text-white sm:px-14 sm:py-20">
        <h1 className="mx-auto max-w-2xl whitespace-pre-line text-4xl font-extrabold leading-snug sm:text-5xl">
          {heroContent.message}
        </h1>
        <p className="mx-auto mt-5 max-w-xl whitespace-pre-line text-base leading-relaxed text-white/90 sm:text-lg">
          {heroContent.subtitle}
        </p>

        <div className="mx-auto mt-8 flex max-w-md justify-center gap-3 text-2xl">
          {heroResourceIcons.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-1.5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                {r.icon}
              </span>
              <span className="text-[11px] font-medium text-white/80">{r.label}</span>
            </div>
          ))}
        </div>

        <div className="relative mt-10 inline-flex items-center">
          <Link
            to={heroContent.ctaTo}
            className="relative inline-block rounded-full bg-white px-10 py-4 text-lg font-bold text-brand-dark shadow-lg transition hover:bg-mint"
          >
            {heroContent.ctaLabel}
          </Link>
          <span className="absolute -right-2 -top-2 flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-75" />
            <span className="relative inline-flex h-5 w-5 rounded-full bg-coral" />
          </span>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-surface p-5 shadow-card sm:gap-4">
        {homeValueSteps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center gap-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-lg">
                {step.icon}
              </span>
              <span className="text-xs font-medium text-ink">{step.label}</span>
            </div>
            {i !== homeValueSteps.length - 1 && <span className="text-line">→</span>}
          </div>
        ))}
      </section>

      <section>
        <SectionHeading
          title="우리동네 자원"
          description="지금 이웃들이 나누고 있는 동네 자원이에요"
          action={{ label: '전체보기', to: '/resources' }}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {resources.slice(0, 3).map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold text-ink">도움이 필요하신가요?</p>
          <p className="mt-1 text-sm text-subtle">주민이라면 누구나 돌봄을 신청할 수 있어요.</p>
        </div>
        <Link
          to="/request"
          className="shrink-0 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          돌봄 신청하기 →
        </Link>
      </section>

      <Link
        to="/about"
        className="block rounded-2xl border border-dashed border-line bg-surface px-5 py-4 text-center text-sm font-medium text-subtle transition hover:bg-bg hover:text-ink"
      >
        우리동네 통합돌봄 뱅크는 어떻게 운영되나요? 더 알아보기 →
      </Link>
    </div>
  )
}
