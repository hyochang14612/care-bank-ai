import { Link, useNavigate } from 'react-router-dom'

export function WorkerLogin() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-svh items-center justify-center bg-bg px-5">
      <div className="w-full max-w-sm space-y-5 rounded-3xl bg-surface p-8 text-center shadow-card">
        <Link to="/" className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-2xl text-white">
          🌿
        </Link>
        <div>
          <h1 className="text-lg font-bold text-ink">사회복지사 로그인</h1>
          <p className="mt-1 text-sm text-subtle">우리동네 통합돌봄 뱅크 사회복지사 화면</p>
        </div>

        <div className="space-y-3 text-left">
          <div>
            <p className="mb-1.5 text-xs font-medium text-subtle">소속 기관</p>
            <div className="input bg-bg text-subtle">용산구 통합돌봄센터</div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-subtle">이름</p>
            <div className="input bg-bg text-subtle">정사회복지사</div>
          </div>
        </div>

        <button
          onClick={() => navigate('/worker/dashboard')}
          className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          로그인하기
        </button>

        <Link to="/resident" className="block text-xs text-subtle hover:text-ink">
          주민이신가요? 주민 화면으로 이동
        </Link>
      </div>
    </div>
  )
}
