import { SectionHeading } from '../components/SectionHeading'
import { useAppData } from '../context/AppDataContext'

const usageItems = [
  { icon: '🏪', label: '협약 지역 서비스' },
  { icon: '🏢', label: '복지관 프로그램' },
  { icon: '🤲', label: '지역 나눔 활동' },
  { icon: '💚', label: '재기부' },
]

export function CarePointBank() {
  const { pointRecords } = useAppData()
  const totalPoints = pointRecords.reduce((sum, record) => sum + record.points, 0)

  return (
    <div className="space-y-6">
      <SectionHeading title="CARE POINT 통장" description="지금까지 쌓아온 참여와 나눔의 기록이에요" />

      <section className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark px-6 py-7 text-white sm:px-8">
        <p className="text-sm text-mint">이웃님의 CARE POINT 통장</p>
        <p className="mt-2 text-3xl font-bold">
          {totalPoints.toLocaleString()}
          <span className="ml-1 text-base font-medium text-mint">CARE POINT</span>
        </p>
        <p className="mt-2 text-sm text-white/80">
          현금처럼 사용할 수 없어요. 나눔에 참여한 마음을 기록하고 순환시키는 지표예요.
        </p>
      </section>

      <div>
        <h2 className="mb-3 text-base font-bold text-ink">이렇게 사용할 수 있어요</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {usageItems.map((item) => (
            <div key={item.label} className="rounded-2xl bg-surface p-4 text-center shadow-card">
              <span className="text-xl">{item.icon}</span>
              <p className="mt-1.5 text-xs font-medium text-ink">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-base font-bold text-ink">참여 기록</h2>
        <div className="space-y-3">
          {pointRecords.map((record) => (
            <div
              key={record.id}
              className="flex items-center gap-4 rounded-2xl bg-surface p-4 shadow-card"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint text-lg">
                {record.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-soft px-2 py-0.5 text-xs font-medium text-blue">
                    {record.type}
                  </span>
                  <span className="text-xs text-subtle">{record.date}</span>
                  {record.id.startsWith('demo-') && (
                    <span className="rounded-full bg-coral-soft px-2 py-0.5 text-[10px] font-semibold text-coral">
                      방금 적립됨
                    </span>
                  )}
                </div>
                <h3 className="mt-1 text-sm font-semibold text-ink">{record.title}</h3>
                <p className="text-xs text-subtle">{record.memo}</p>
              </div>
              <span className="shrink-0 text-sm font-bold text-brand-dark">+{record.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
