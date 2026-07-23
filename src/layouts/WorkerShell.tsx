import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/worker/dashboard', label: 'AI 추천', icon: '✨' },
  { to: '/worker/cases', label: '대상자 관리', icon: '🗂️' },
  { to: '/worker/approve', label: '매칭 승인', icon: '✅' },
  { to: '/worker/connections', label: '연계 현황', icon: '🔗' },
  { to: '/worker/stats', label: '통계', icon: '📊' },
]

export function WorkerShell() {
  return (
    <div className="min-h-svh bg-bg">
      <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-2">
            <Link to="/" className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-lg text-white">
                🌿
              </span>
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-bold leading-tight text-ink sm:text-base">
                  우리동네 통합돌봄 뱅크
                </p>
                <p className="truncate text-xs leading-tight text-subtle">
                  사회복지사 화면 · Community Care Bank
                </p>
              </div>
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to="/resident"
                className="hidden items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-subtle shadow-card transition hover:bg-bg hover:text-ink sm:flex"
              >
                ← 주민 화면으로
              </Link>
              <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink shadow-card">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint text-xs">
                  🙂
                </span>
                <span className="hidden sm:inline">정사회복지사</span>
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-brand text-white' : 'text-subtle hover:bg-bg hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-6 sm:px-8 sm:pb-10">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-line bg-surface/95 px-1 py-2 backdrop-blur sm:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition ${
                isActive ? 'text-brand-dark' : 'text-subtle'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
