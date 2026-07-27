import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { newsItems } from '../data/mock'
import type { NewsItem, StoryComment } from '../data/types'

export function Stories() {
  return (
    <div className="space-y-6">
      <SectionHeading title="나눔 이야기" description="우리 동네 나눔이 만든 따뜻한 변화를 전해드려요" />

      <div className="space-y-3">
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

  const toggleLike = () => {
    setLiked((prev) => !prev)
    setLikes((prev) => (liked ? prev - 1 : prev + 1))
  }

  const submitComment = () => {
    if (!draft.trim()) return
    setComments((prev) => [...prev, { id: `c-${Date.now()}`, author: '이웃 주민', text: draft.trim() }])
    setDraft('')
  }

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-card">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint text-lg">
          {item.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-soft px-2 py-0.5 text-xs font-medium text-blue">
              {item.tag}
            </span>
            <span className="text-xs text-subtle">{item.date}</span>
          </div>
          <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
          <p className="mt-1 text-sm text-subtle">{item.summary}</p>
          <p className="mt-2 text-xs font-medium text-brand-dark">{item.org}</p>
        </div>
      </div>

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
  )
}
