export type ResourceCategory = '위생관리' | '식생활' | '이동지원' | '주거환경' | '정서지원' | '교육문화'

export interface SharedResource {
  id: string
  title: string
  provider: string
  location: string
  targetGroup: string
  availability: string
  quantityLeft: number
  quantityTotal: number
  matchScore: number
  category: ResourceCategory
  tags: string[]
  urgent: boolean
  icon: string
}

export interface MatchResult {
  rank: number
  caseId: string
  applicantAlias: string
  resourceTitle: string
  matchScore: number
  reasons: string[]
  checks: string[]
  status: '확인 대기' | '연계 진행중' | '보류'
}

export interface DailyStat {
  label: string
  value: number
  unit: string
  trend: string
  icon: string
  accent: 'brand' | 'blue' | 'coral' | 'ink'
}

export type ConnectionStatus = '연계 완료' | '진행중' | '확인 필요' | '보류'

export interface Connection {
  id: string
  caseId: string
  applicantAlias: string
  resourceTitle: string
  worker: string
  status: ConnectionStatus
  updatedAt: string
  note: string
}

export interface PointRecord {
  id: string
  title: string
  type: '참여 기록' | '감사 포인트' | '나눔 실천'
  date: string
  points: number
  memo: string
  icon: string
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  date: string
  tag: string
  org: string
  icon: string
}
