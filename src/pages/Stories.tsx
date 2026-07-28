import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { newsItems } from '../data/mock'
import type { NewsItem, StoryComment } from '../data/types'

const tagStyle: Record<string, { gradient: string; chip: string }> = {
  '참여 이야기': { gradient: 'from-brand to-brand-dark', chip: 'bg-mint text-brand-dark' },
  '자원 이야기': { gradient: 'from-blue to-brand', chip: 'bg-blue-soft text-blue' },
  '지역 변화': { gradient: 'from-coral to-brand-dark', chip: 'bg-coral-soft text-coral' },
}

export function Stories() {
  return (
    <div className="space-y-6">
      <SectionHeading title="돌봄 이야기" description="우리 동네 돌봄이 만든 따뜻한 변화를 전해드려요" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <StoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function StoryCard({ item }: { item: NewsItem }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(item.likes)
  const [comments, setComments] = useState<StoryComment[]>(item.comments)
  const [draft, setDraft] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [photoNotice, setPhotoNotice] = useState(false)

  const style = tagStyle[item.tag] ?? tagStyle['참여 이야기']

  const toggleLike = () => {
    setLiked((prev) => !prev)
    setLikes((prev) => (liked ? prev - 1 : prev + 1))
  }

  const submitComment = () => {
    if (!draft.trim()) return
    setComments((prev) => [...prev, { id: `c-${Date.now()}`, author: '이웃 주민', text: draft.trim() }])
    setDraft('')
  }

  const clickPhoto = () => {
    setPhotoNotice(true)
    setTimeout(() => setPhotoNotice(false), 2000)
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-surface shadow-card transition hover:shadow-card-hover">
      <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${style.gradient}`}>
        <span className="text-5xl drop-shadow">{item.icon}</span>
        {likes >= 20 && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-coral">
            🔥 인기 이야기
          </span>
        )}
        <button
          onClick={clickPhoto}
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm text-ink shadow transition hover:bg-white"
          aria-label="사진 추가"
        >
          📷
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.chip}`}>{item.tag}</span>
          <span className="text-xs text-subtle">{item.date}</span>
        </div>
        <h3 className="mt-2 font-semibold text-ink">{item.title}</h3>
        <p className="mt-1 flex-1 text-sm text-subtle">{item.summary}</p>
        <p className="mt-2 text-xs font-medium text-brand-dark">{item.org}</p>

        {photoNotice && (
          <p className="mt-2 rounded-lg bg-bg px-2.5 py-1.5 text-xs text-subtle">
            📷 사진 업로드 기능은 준비 중이에요
          </p>
        )}

        <div className="mt-4 flex items-center gap-4 border-t border-line pt-3">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 text-sm font-medium transition ${
              liked ? 'text-coral' : 'text-subtle hover:text-ink'
            }`}
          >
            <span>{liked ? '❤️' : '🤍'}</span>
            {likes}
          </button>
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="flex items-center gap-1.5 text-sm font-medium text-subtle transition hover:text-ink"
          >
            💬 댓글 {comments.length}
          </button>
        </div>

        {showComments && (
          <div className="mt-3 space-y-2.5 border-t border-line pt-3">
            {comments.map((c) => (
              <div key={c.id} className="rounded-xl bg-bg px-3.5 py-2.5 text-sm">
                <span className="font-semibold text-ink">{c.author}</span>
                <span className="ml-1.5 text-subtle">{c.text}</span>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                className="input"
                placeholder="따뜻한 댓글을 남겨보세요"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitComment()}
              />
              <button
                onClick={submitComment}
                className="shrink-0 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                등록
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
