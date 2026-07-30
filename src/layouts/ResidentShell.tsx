import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'

const navItems = [
  { to: '/ai-challenge', label: 'AI 챌린지 해 프로토타입', mobileLabel: 'AI 챌린지', icon: '', highlight: true },
  { to: '/', label: '홈', mobileLabel: '홈', icon: '🏠', end: true },
  { to: '/about', label: '우리동네 통합돌봄 뱅크란?', mobileLabel: '소개', icon: 'ℹ️' },
  { to: '/register', label: '자원 등록하기', mobileLabel: '자원등록', icon: '🧺' },
  { to: '/request', label: '돌봄 신청하기', mobileLabel: '돌봄신청', icon: '🙋' },
  { to: '/resources', label: '우리동네 자원', mobileLabel: '동네자원', icon: '📦' },
  { to: '/stories', label: '돌봄 이야기', mobileLabel: '이야기', icon: '📰' },
  { to: '/care-point', label: 'CARE POINT', mobileLabel: 'POINT', icon: '💚' },
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
                  Community Care Bank
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

          <nav className="hidden flex-wrap items-center gap-1 sm:flex">
            {navItems.map((item) =>
              item.highlight ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ring-1 transition ${
                      isActive
                        ? 'bg-coral text-white ring-coral'
                        : 'bg-coral-soft text-coral ring-coral/30 hover:bg-coral-soft/70'
                    }`
                  }
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
                  </span>
                  {item.label}
                </NavLink>
              ) : (
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
              ),
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-6 sm:px-8 sm:pb-10">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around overflow-x-auto border-t border-line bg-surface/95 px-1 py-2 backdrop-blur sm:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition ${
                item.highlight
                  ? isActive
                    ? 'bg-coral text-white'
                    : 'bg-coral-soft text-coral'
                  : isActive
                    ? 'text-brand-dark'
                    : 'text-subtle'
              }`
            }
          >
            {item.highlight ? (
              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-coral text-[9px] font-bold text-white">
                AI
              </span>
            ) : (
              <span className="text-lg">{item.icon}</span>
            )}
            {item.mobileLabel}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
