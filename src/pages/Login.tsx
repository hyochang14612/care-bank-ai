import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'

type Mode = 'select' | 'resident' | 'signup'

export function Login() {
  const [mode, setMode] = useState<Mode>('select')
  const [name, setName] = useState('이웃 주민')
  const { loginResident } = useAppData()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const submitResident = () => {
    loginResident(name)
    navigate(from)
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-bg px-5">
      <div className="w-full max-w-sm space-y-5 rounded-3xl bg-surface p-8 shadow-card">
        <div className="text-center">
          <Link
            to="/"
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-2xl text-white"
          >
            🌿
          </Link>
          <h1 className="mt-3 text-lg font-bold text-ink">로그인하기</h1>
          <p className="mt-1 text-sm text-subtle">우리동네 통합돌봄 뱅크</p>
        </div>

        {mode === 'select' && (
          <div className="space-y-2.5">
            <button
              onClick={() => setMode('resident')}
              className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              지역주민 로그인
            </button>
            <Link
              to="/worker"
              className="block w-full rounded-xl border border-line py-3 text-center text-sm font-semibold text-ink transition hover:bg-bg"
            >
              사회복지사 로그인
            </Link>
            <button
              onClick={() => setMode('signup')}
              className="w-full rounded-xl border border-dashed border-line py-3 text-sm font-medium text-subtle transition hover:bg-bg"
            >
              회원가입
            </button>
          </div>
        )}

        {mode === 'resident' && (
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-subtle">표시 이름</span>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <button
              onClick={submitResident}
              className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              로그인하기
            </button>
            <button onClick={() => setMode('select')} className="w-full text-xs text-subtle hover:text-ink">
              뒤로가기
            </button>
          </div>
        )}

        {mode === 'signup' && (
          <div className="space-y-4 text-center">
            <p className="rounded-2xl bg-mint px-4 py-3 text-sm text-brand-dark">
              회원가입 기능은 준비 중이에요. 지금은 지역주민으로 바로 체험해보실 수 있어요.
            </p>
            <button
              onClick={() => setMode('resident')}
              className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              지역주민으로 체험하기
            </button>
            <button onClick={() => setMode('select')} className="w-full text-xs text-subtle hover:text-ink">
              뒤로가기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
