import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'

const navItems = [
  { to: '/', label: '홈', icon: '🏠', end: true },
  { to: '/register', label: '자원 등록하기', icon: '🧺' },
  { to: '/request', label: '돌봄 신청하기', icon: '🙋' },
  { to: '/resources', label: '우리동네 자원', icon: '📦' },
  { to: '/stories', label: '나눔 이야기', icon: '📰' },
  { to: '/care-point', label: 'CARE POINT', icon: '💚' },
]

export function ResidentShell() {
  const { role, residentName, logout } = useAppData()

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
                <p className="truncate text-[11px] leading-tight text-subtle sm:text-xs">
                  주민 화면 · Community Care Bank
                </p>
              </div>
            </Link>

            {role === 'resident' ? (
              <button
                onClick={logout}
                className="shrink-0 whitespace-nowrap rounded-full border border-line px-3 py-2 text-xs font-medium text-subtle transition hover:bg-bg hover:text-ink sm:px-4 sm:text-sm"
              >
                {residentName}님 · 로그아웃
              </button>
            ) : (
              <Link
                to="/login"
                className="shrink-0 whitespace-nowrap rounded-full border border-line px-3 py-2 text-xs font-medium text-subtle transition hover:bg-bg hover:text-ink sm:px-4 sm:text-sm"
              >
                로그인하기
              </Link>
            )}
          </div>

          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
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
            end={item.end}
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
