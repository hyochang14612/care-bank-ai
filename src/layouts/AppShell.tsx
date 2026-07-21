import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: '홈', icon: '🏠', end: true },
  { to: '/market', label: '자원마켓', icon: '🧺' },
  { to: '/matching', label: 'AI 매칭', icon: '✨' },
  { to: '/connections', label: '연계관리', icon: '🔗' },
  { to: '/points', label: '나눔통장', icon: '💚' },
  { to: '/news', label: '나눔뉴스', icon: '📰' },
]

export function AppShell() {
  return (
    <div className="min-h-svh bg-bg">
      <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-lg text-white">
                🌿
              </span>
              <div className="text-left">
                <p className="text-base font-bold leading-tight text-ink">
                  우리동네 통합돌봄 뱅크
                </p>
                <p className="text-xs leading-tight text-subtle">
                  지역 자원과 복지 욕구를 연결하는 AI 나눔마켓
                </p>
              </div>
            </NavLink>
            <button className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink shadow-card sm:flex">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-xs">
                🙂
              </span>
              정사회복지사
            </button>
          </div>

          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand text-white'
                      : 'text-subtle hover:bg-bg hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <span className="mx-1 h-5 w-px bg-line" />
            <NavLink
              to="/roles"
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue text-white'
                    : 'bg-blue-soft text-blue hover:bg-blue hover:text-white'
                }`
              }
            >
              🎭 역할별화면
            </NavLink>
            <NavLink
              to="/pitch"
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue text-white'
                    : 'bg-blue-soft text-blue hover:bg-blue hover:text-white'
                }`
              }
            >
              📽 발표모드
            </NavLink>
            <NavLink
              to="/demo"
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-coral text-white'
                    : 'bg-coral-soft text-coral hover:bg-coral hover:text-white'
                }`
              }
            >
              🎬 라이브 데모
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-6 sm:px-8 sm:pb-10">
        <Outlet />
      </main>

      <Link
        to="/demo"
        className="fixed bottom-20 right-4 z-40 flex items-center gap-1.5 rounded-full bg-coral px-4 py-2.5 text-sm font-semibold text-white shadow-card-hover sm:hidden"
      >
        🎬 데모
      </Link>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-line bg-surface/95 px-1 py-2 backdrop-blur sm:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-medium transition ${
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
