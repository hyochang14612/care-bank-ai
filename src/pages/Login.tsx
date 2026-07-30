import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    navigate('/worker/ai-matching')
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
          <h1 className="mt-3 text-lg font-bold text-ink">사회복지사 로그인</h1>
          <p className="mt-1 text-sm text-subtle">
            AI 기반 자원 분석 및 연결 지원을 위한 관리자 화면입니다.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-subtle">아이디</span>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-subtle">비밀번호</span>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </label>
        </div>

        <button
          onClick={submit}
          className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          로그인
        </button>

        <Link to="/" className="block text-center text-xs text-subtle hover:text-ink">
          주민이신가요? 주민 화면으로 이동
        </Link>
      </div>
    </div>
  )
}
