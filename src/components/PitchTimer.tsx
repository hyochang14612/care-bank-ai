import { useEffect, useState } from 'react'

export function PitchTimer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  const over = seconds > 180

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
        over ? 'bg-coral-soft text-coral' : 'bg-mint text-brand-dark'
      }`}
    >
      ⏱ 발표 경과 {mm}:{ss}
      {over && ' · 3분 초과!'}
    </div>
  )
}
